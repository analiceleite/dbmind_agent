// Test the corrected Zypher configuration
import { ZypherProvider } from './adapters/providers/ZypherProvider.ts';
import {
  createZypherContext,
  OpenAIModelProvider,
  ZypherAgent,
} from "@corespeed/zypher";

console.log('Testing corrected Zypher configuration...');

// Initialize same as corrected server
const zypherContext = await createZypherContext(Deno.cwd());

const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: 'not-needed',
    baseUrl: 'http://localhost:11434/v1',
    openaiClientOptions: {
      maxRetries: 2,
      timeout: 60000,
    }
  }),
);

const provider = new ZypherProvider(agent);

console.log('Testing with simple question...');

try {
  let response = '';
  let chunks = 0;
  const startTime = Date.now();
  
  for await (const chunk of provider.streamResponse('What is useState in React? Be concise.', 'phi3:mini')) {
    chunks++;
    response += chunk;
    Deno.stdout.writeSync(new TextEncoder().encode(chunk));
  }
  
  console.log(`\n\n=== CORRECTED ZYPHER TEST ===`);
  console.log(`Total time: ${Date.now() - startTime}ms`);
  console.log(`Chunks: ${chunks}`);
  console.log(`Response length: ${response.length} chars`);
  console.log(`Response preview: "${response.substring(0, 150)}..."`);
  
} catch (error) {
  console.error('Test failed:', error);
}