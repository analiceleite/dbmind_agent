import { corsHeaders } from '../../config/env.ts';
import * as HistoryRepo from '../database/HistoryRepository.ts';

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

  async handleHistoryList(): Promise<Response> {
    const rows = await HistoryRepo.listHistory(100);
    return new Response(JSON.stringify(rows), { headers: { "Content-Type": "application/json", ...corsHeaders } });
  }

  async handleHistoryGet(id: string): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'invalid id' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    const row = await HistoryRepo.getHistoryById(numericId);
    if (!row) {
      return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    return new Response(JSON.stringify(row), { headers: { "Content-Type": "application/json", ...corsHeaders } });
  }

  async handleHistoryCreate(req: Request): Promise<Response> {
    try {
      const payload = await req.json();
      const { session_id, question, model, sql_query, answer } = payload;
      if (!question) {
        return new Response(JSON.stringify({ error: 'question is required' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
      }
      const created = await HistoryRepo.createHistory(question, model, sql_query, answer, session_id);
      return new Response(JSON.stringify(created), { status: 201, headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      console.error('[HttpHandler] handleHistoryCreate error', err);
      return new Response(JSON.stringify({ error: 'invalid request' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
  }

  async handleHistoryUpdate(id: string, req: Request): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'invalid id' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    try {
      const payload = await req.json();
      console.log('[HttpHandler] handleHistoryUpdate', { id: numericId, payload });
      const updated = await HistoryRepo.updateHistory(numericId, payload);
      if (!updated) return new Response(JSON.stringify({ error: 'not found or nothing updated' }), { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } });
      return new Response(JSON.stringify(updated), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      console.error('[HttpHandler] handleHistoryUpdate error', err);
      return new Response(JSON.stringify({ error: 'invalid request' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
  }

  async handleHistoryDelete(id: string): Promise<Response> {
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'invalid id' }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    console.log('[HttpHandler] handleHistoryDelete', { id: numericId });
    const ok = await HistoryRepo.deleteHistory(numericId);
    if (!ok) return new Response(JSON.stringify({ error: 'delete failed' }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
    return new Response(null, { status: 204, headers: corsHeaders });
  }
}