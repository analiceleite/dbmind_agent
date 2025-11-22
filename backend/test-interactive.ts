// Interactive WebSocket Test
const ws = new WebSocket('ws://localhost:8000/ws');

async function handleInput() {
  for await (const line of Deno.stdin.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream())) {
    
    if (line.trim() === 'exit') {
      ws.close();
      Deno.exit(0);
    }
    
    if (line.trim()) {
      console.log(`📤 Sending: "${line}"`)
      const question = {
        type: 'task',
        task: line.trim(),
        model: 'phi3:mini'
      };
      ws.send(JSON.stringify(question));
    }
  }
}

ws.addEventListener('open', () => {
  console.log('🟢 WebSocket connected! Type your question:');
  handleInput();
});

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'connected') {
    console.log('✅ Connection confirmed');
  } else if (data.type === 'status') {
    console.log('⏳ Processing...\n📝 Response: ');
  } else if (data.type === 'chunk') {
    // Shows text in real time
    const encoder = new TextEncoder();
    Deno.stdout.writeSync(encoder.encode(data.content));
  } else if (data.type === 'complete') {
    console.log('\n\n✅ Complete! Type another question or "exit":');
  } else if (data.type === 'error') {
    console.error('\n❌ Error:', data.message);
  }
});

ws.addEventListener('error', (error) => {
  console.error('❌ WebSocket Error:', error);
  Deno.exit(1);
});

ws.addEventListener('close', () => {
  console.log('🔴 Connection closed');
  Deno.exit(0);
});

class TextLineStream extends TransformStream {
  constructor() {
    let buffer = '';
    super({
      transform(chunk, controller) {
        buffer += chunk;
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          controller.enqueue(line);
        }
      },
      flush(controller) {
        if (buffer) {
          controller.enqueue(buffer);
        }
      }
    });
  }
}