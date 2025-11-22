import type { ModelProvider } from './ModelProvider.ts';
import { ZypherAgent } from "@corespeed/zypher";

export class ZypherProvider implements ModelProvider {
  private agent: ZypherAgent;

  constructor(agent: ZypherAgent) {
    this.agent = agent;
  }

  async* streamResponse(prompt: string, model?: string): AsyncIterable<string> {
    const event$ = this.agent.runTask(prompt, model || "phi3:mini");
    const { eachValueFrom } = await import("rxjs-for-await");
    
    for await (const agentEvent of eachValueFrom(event$)) {
      if ('type' in agentEvent && agentEvent.type === 'message') {
        const msgEvent = agentEvent as { type: string; message?: { content: string | Array<{ text: string }> } };
        if (msgEvent.message?.content) {
          const content = Array.isArray(msgEvent.message.content)
            ? msgEvent.message.content.map((c: { text: string }) => c.text).join('')
            : msgEvent.message.content;
          
          if (content.trim()) {
            yield content;
          }
        }
      }
    }
  }
}