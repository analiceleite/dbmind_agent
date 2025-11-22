// Test Phi-3 Mini performance
console.log('Testing Phi-3 Mini performance...');

const startTime = Date.now();

try {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3:mini',
      prompt: 'What is useState in React?',
      stream: true,
      system: 'You are a React expert. Answer concisely.',
      options: {
        temperature: 0.3,
        top_p: 0.8,
        num_predict: 200,  // Very short for quick test
        num_ctx: 2048,
        repeat_penalty: 1.1
      }
    })
  });

  console.log(`Phi-3 responded in: ${Date.now() - startTime}ms`);

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No reader');

  const decoder = new TextDecoder();
  let buffer = '';
  let firstChunkTime = 0;
  let chunkCount = 0;
  let fullResponse = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines.filter(l => l.trim())) {
      try {
        const data = JSON.parse(line);
        if (data.response) {
          chunkCount++;
          fullResponse += data.response;
          if (firstChunkTime === 0) {
            firstChunkTime = Date.now() - startTime;
            console.log(`First chunk in: ${firstChunkTime}ms`);
          }
        }
        if (data.done) {
          console.log(`\n\nResponse: "${fullResponse}"`);
          break;
        }
      } catch (_e) {
        // Ignore parse errors
      }
    }
  }

  console.log(`Total time: ${Date.now() - startTime}ms, Chunks: ${chunkCount}`);
  
} catch (error) {
  console.error('Test failed:', error);
}