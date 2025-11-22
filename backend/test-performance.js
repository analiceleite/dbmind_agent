// Performance test for Ollama direct call
console.log('Testing Ollama performance...');

const startTime = Date.now();

try {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'phi3:mini',
      prompt: 'What is React?',
      stream: true,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        num_predict: 100  // Short response for testing
      }
    })
  });

  console.log(`Ollama responded in: ${Date.now() - startTime}ms`);

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No reader');

  const decoder = new TextDecoder();
  let buffer = '';
  let firstChunkTime = 0;
  let chunkCount = 0;

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
          if (firstChunkTime === 0) {
            firstChunkTime = Date.now() - startTime;
            console.log(`First chunk in: ${firstChunkTime}ms`);
          }
          Deno.stdout.writeSync(new TextEncoder().encode(data.response));
        }
      } catch (_e) {
        // Ignore parse errors
      }
    }
  }

  console.log(`\n\nTotal time: ${Date.now() - startTime}ms, Chunks: ${chunkCount}`);
  
} catch (error) {
  console.error('Test failed:', error);
}