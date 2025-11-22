import { corsHeaders } from '../../config/env.ts';

export class HttpHandler {
  
  handleOptions(): Response {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  handleHealth(): Response {
    return new Response(
      JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  handleDefault(): Response {
    return new Response(
      JSON.stringify({ 
        message: "Zypher Agent Server", 
        endpoints: ["/ws", "/health"] 
      }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
}