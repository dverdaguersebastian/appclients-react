import { supabase, supabaseUrl } from '../config/supabase';
import type { Client } from '../interfaces/Client';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_KEY en .env.');
  }
  return supabase;
}

export class ClientsService {
  static async testConnection(): Promise<{ url: string; totalClients: number; clients: Client[] }> {
    const client = requireSupabase();
    const { data, error } = await client.from('clients').select('*');
    if (error) {
      throw error;
    }
    const clients = (data ?? []) as Client[];
    return {
      url: supabaseUrl,
      totalClients: clients.length,
      clients,
    };
  }

  static async getClients(): Promise<Client[]> {
    const client = requireSupabase();
    const { data, error } = await client.from('clients').select('*').order('id', { ascending: true });
    if (error) {
      throw error;
    }
    return (data ?? []) as Client[];
  }

  static async getClient(id: number): Promise<Client> {
    const client = requireSupabase();
    const { data, error } = await client.from('clients').select('*').eq('id', id).single();
    if (error) {
      throw error;
    }
    return data as Client;
  }

  static async addClient(newClient: Client): Promise<void> {
    const client = requireSupabase();
    const { error } = await client.from('clients').insert([newClient]);
    if (error) {
      throw error;
    }
  }

  static async updateClient(id: number, updatedClient: Client): Promise<void> {
    const client = requireSupabase();
    const { error } = await client.from('clients').update(updatedClient).eq('id', id);
    if (error) {
      throw error;
    }
  }

  static async deleteClient(id: number): Promise<void> {
    const client = requireSupabase();
    const { error } = await client.from('clients').delete().eq('id', id);
    if (error) {
      throw error;
    }
  }
}
