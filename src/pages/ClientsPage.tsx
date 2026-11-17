import { IonContent, IonHeader, IonPage, useIonViewWillEnter } from '@ionic/react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import type { Client } from '../interfaces/Client';
import { ClientsService } from '../services/ClientsService';

export default function ClientsPage(): React.ReactElement {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchClients = useCallback(async (): Promise<void> => {
    try {
      const data = await ClientsService.getClients();
      setClients(data);
      setErrorMsg('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar los clientes desde Supabase.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    ClientsService.getClients()
      .then((data) => {
        if (!active) return;
        setClients(data);
        setErrorMsg('');
      })
      .catch((err: unknown) => {
        if (!active) return;
        const message = err instanceof Error ? err.message : 'Error al cargar los clientes desde Supabase.';
        setErrorMsg(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useIonViewWillEnter(() => {
    void fetchClients();
  });

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent>
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Ver clientes</h2>
            <Link to="/new-client" className="btn btn-primary">
              Añadir cliente
            </Link>
          </div>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <p className="text-muted">Cargando clientes...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No hay clientes registrados.
                      </td>
                    </tr>
                  ) : (
                    clients.map((client) => (
                      <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
