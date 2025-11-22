// Test direct Ollama response completeness
console.log('Testing Ollama response completeness...');

async function testOllamaComplete() {
  const startTime = Date.now();
  
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi3:mini',
        prompt: 'Explain React hooks in detail with examples',
        stream: true,
        system: 'You are a React expert. Give detailed, comprehensive answers.',
        options: {
          temperature: 0.3,
          top_p: 0.8,
          num_predict: 1500,  // Allow longer responses
          num_ctx: 2048,
          repeat_penalty: 1.1
        }
      })
    });

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    let buffer = '';
    let chunkCount = 0;
    let fullResponse = '';
    let isComplete = false;

    console.log('Starting to read chunks...');

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('Stream ended (done=true)');
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines.filter(l => l.trim())) {
        try {
          const data = JSON.parse(line);
          
          if (data.response) {
            chunkCount++;
            fullResponse += data.response;
            Deno.stdout.writeSync(new TextEncoder().encode(data.response));
          }
          
          if (data.done === true) {
            isComplete = true;
            console.log('\n[COMPLETION FLAG RECEIVED]');
            break;
          }
          
        } catch (e) {
          console.log('Parse error for line:', line.substring(0, 50));
        }
      }
      
      if (isComplete) break;
    }

    console.log(`\n\n=== SUMMARY ===`);
    console.log(`Total time: ${Date.now() - startTime}ms`);
    console.log(`Chunks received: ${chunkCount}`);
    console.log(`Response length: ${fullResponse.length} chars`);
    console.log(`Complete flag: ${isComplete}`);
    console.log(`Response preview: "${fullResponse.substring(0, 100)}..."`);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

await testOllamaComplete();