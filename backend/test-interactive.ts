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
      console.log(`📤 Enviando: "${line}"`);
      const pergunta = {
        type: 'task',
        task: line.trim(),
        model: 'llama3.2'
      };
      ws.send(JSON.stringify(pergunta));
    }
  }
}

ws.addEventListener('open', () => {
  console.log('🟢 WebSocket conectado! Digite sua pergunta:');
  handleInput();
});

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'connected') {
    console.log('✅ Conexão confirmada');
  } else if (data.type === 'status') {
    console.log('⏳ Processando...\n📝 Resposta: ');
  } else if (data.type === 'chunk') {
    // Mostra texto em tempo real
    const encoder = new TextEncoder();
    Deno.stdout.writeSync(encoder.encode(data.content));
  } else if (data.type === 'complete') {
    console.log('\n\n✅ Completo! Digite outra pergunta ou "exit":');
  } else if (data.type === 'error') {
    console.error('\n❌ Erro:', data.message);
  }
});

ws.addEventListener('error', (error) => {
  console.error('❌ Erro WebSocket:', error);
  Deno.exit(1);
});

ws.addEventListener('close', () => {
  console.log('🔴 Conexão fechada');
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