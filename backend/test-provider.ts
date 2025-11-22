// Quick test of corrected OllamaProvider
import { OllamaProvider } from './adapters/providers/OllamaProvider.ts';

console.log('Testing corrected OllamaProvider...');

const provider = new OllamaProvider();

try {
  console.log('Asking: "What is React and why use it?"');
  
  let response = '';
  let chunks = 0;
  
  for await (const chunk of provider.streamResponse('What is React and why use it?', 'phi3:mini')) {
    chunks++;
    response += chunk;
    Deno.stdout.writeSync(new TextEncoder().encode(chunk));
  }
  
  console.log(`\n\n=== SUMMARY ===`);
  console.log(`Chunks: ${chunks}`);
  console.log(`Total length: ${response.length} chars`);
  console.log(`Ends properly: ${response.trim().length > 50 ? 'YES' : 'NO'}`);
  
} catch (error) {
  console.error('Test failed:', error);
}