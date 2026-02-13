import { corsHeaders } from '../../config/env.ts';

export class ConfigHandler {
  handleConfig(req: Request): Response {
    // Get the host from the request to return the correct URL to the client
    const host = req.headers.get("host") || Deno.env.get("PUBLIC_HOST") || "localhost:8000";
    
    // Send configuration that frontend can use at runtime
    const config = {
      wsUrl: `ws://${host}/ws`,
      apiUrl: `http://${host}`,
    };

    console.log('[Config] Returning URLs for host:', host, config);

    return new Response(
      JSON.stringify(config),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
}
