import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";
import process from "node:process";

console.log("🧪 Testing Zypher streaming...\n");

// Initialize agent
const zypherContext = await createZypherContext(Deno.cwd());
const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed',
    baseUrl: 'http://localhost:11434/v1',
    openaiClientOptions: {
      maxRetries: 1,
      timeout: 30000,
    }
  })
);

const prompt = "Count from 1 to 10";
console.log(`📝 Prompt: "${prompt}"\n`);
console.log("⏱️  Streaming response:\n");

const startTime = Date.now();
let chunkCount = 0;
let firstChunkTime: number | null = null;

try {
  const taskEvents = agent.runTask(prompt, "llama3.2:1b");
  const { eachValueFrom } = await import("rxjs-for-await");
  
  for await (const event of eachValueFrom(taskEvents)) {
    const elapsed = Date.now() - startTime;
    
    if (event.type === 'text' && 'content' in event && event.content) {
      if (firstChunkTime === null) {
        firstChunkTime = elapsed;
        console.log(`\n✅ First chunk received at ${firstChunkTime}ms\n`);
      }
      
      chunkCount++;
      process.stdout.write(event.content); // Print without newline to see streaming
    } else if (event.type === 'message') {
      console.log(`\n\n📨 Message event at ${elapsed}ms`);
    } else {
      console.log(`\n\n🔔 Event: ${event.type} at ${elapsed}ms`);
    }
  }
  
  const totalTime = Date.now() - startTime;
  
  console.log("\n\n" + "=".repeat(50));
  console.log(`✅ Streaming completed!`);
  console.log(`📊 Stats:`);
  console.log(`   - First chunk: ${firstChunkTime}ms`);
  console.log(`   - Total chunks: ${chunkCount}`);
  console.log(`   - Total time: ${totalTime}ms`);
  console.log(`   - Avg time per chunk: ${(totalTime / chunkCount).toFixed(2)}ms`);
  
  if (chunkCount === 0) {
    console.log("\n❌ NO STREAMING! No text events received.");
    console.log("   This means streaming is NOT working.");
  } else if (chunkCount === 1) {
    console.log("\n⚠️  WARNING: Only 1 chunk received.");
    console.log("   Streaming might not be working properly.");
  } else {
    console.log("\n✅ Streaming is working! Multiple chunks received.");
  }
  
} catch (error) {
  console.error("\n❌ Error:", error);
}
