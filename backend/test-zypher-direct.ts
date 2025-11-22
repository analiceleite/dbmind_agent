// Test Zypher direct streaming behavior
import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

console.log('Testing Zypher streaming behavior...');

// Initialize same as server
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed', 
    baseUrl: 'http://localhost:11434/v1',
  }),
);

console.log('Zypher agent initialized, testing task...');

const startTime = Date.now();

try {
  const event$ = agent.runTask('What is React?', 'phi3:mini');
  const { eachValueFrom } = await import("rxjs-for-await");
  
  let chunkCount = 0;
  let fullResponse = '';
  
  console.log('Starting to process events...');
  
  for await (const agentEvent of eachValueFrom(event$)) {
    console.log(`Event type: ${agentEvent.type}, Time: ${Date.now() - startTime}ms`);
    
    if ('type' in agentEvent && agentEvent.type === 'message') {
      const msgEvent = agentEvent as { type: string; message?: { content: string | Array<{ text: string }> } };
      if (msgEvent.message?.content) {
        const content = Array.isArray(msgEvent.message.content)
          ? msgEvent.message.content.map((c: { text: string }) => c.text).join('')
          : msgEvent.message.content;
        
        if (content.trim()) {
          chunkCount++;
          fullResponse += content;
          console.log(`Chunk ${chunkCount}: "${content.substring(0, 50)}..."`);
        }
      }
    }
  }
  
  console.log(`\n=== ZYPHER TEST SUMMARY ===`);
  console.log(`Total time: ${Date.now() - startTime}ms`);
  console.log(`Chunks: ${chunkCount}`);
  console.log(`Response length: ${fullResponse.length} chars`);
  console.log(`Full response: "${fullResponse.substring(0, 200)}..."`);

} catch (error) {
  console.error('Zypher test failed:', error);
}