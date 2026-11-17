import { IonContent, IonHeader, IonPage } from '@ionic/react';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import type { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

export default function NewClientPage(): React.ReactElement {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    phone: '',
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!client.name.trim() || !client.email.trim() || !client.phone.trim()) {
      setErrorMsg('Por favor, completa nombre, email y teléfono.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      await ClientsService.addClient({
        name: client.name.trim(),
        email: client.email.trim(),
        phone: client.phone.trim(),
      });
      navigate('/clients');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar el cliente en Supabase.';
      setErrorMsg(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent>
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
          <h2 className="mb-3">Añadir clientes</h2>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={(e) => void handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="client-name" className="form-label">
                Nombre
              </label>
              <input
                id="client-name"
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="client-email" className="form-label">
                Email
              </label>
              <input
                id="client-email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="client-phone" className="form-label">
                Teléfono
              </label>
              <input
                id="client-phone"
                type="tel"
                className="form-control"
                placeholder="Teléfono"
                value={client.phone}
                onChange={(e) => setClient({ ...client, phone: e.target.value })}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/clients')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}
