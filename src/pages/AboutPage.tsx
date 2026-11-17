import { IonContent, IonHeader, IonPage } from '@ionic/react';
import type React from 'react';

import Navbar from '../components/Navbar';

export default function AboutPage(): React.ReactElement {
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent>
        <div className="container mt-4 pb-5" style={{ maxWidth: '860px' }}>
          <h2 className="mb-3">About — AppClients React</h2>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Descripción del proyecto</h5>
              <p className="card-text">
                <strong>AppClients React</strong> es una aplicación multiplataforma desarrollada con{' '}
                <strong>Ionic React</strong> y <strong>TypeScript</strong> para la gestión de clientes conectada en
                tiempo real a una base de datos <strong>PostgreSQL en Supabase</strong>.
              </p>
              <p className="card-text mb-2">
                Sigue una arquitectura por capas (<code>Pages → Services → Supabase SDK</code>) utilizando{' '}
                <strong>React Router</strong> para la navegación entre vistas, <strong>Hooks</strong> (
                <code>useState</code> y <code>useEffect</code>) para el estado y ciclo de vida, y{' '}
                <strong>Bootstrap 5</strong> para la interfaz visual.
              </p>
              <ul className="mb-0">
                <li>
                  <strong>Ver clientes:</strong> consulta la tabla <code>clients</code> en Supabase y la renderiza de
                  forma declarativa.
                </li>
                <li>
                  <strong>Añadir clientes:</strong> formulario controlado para insertar nuevos registros en PostgreSQL.
                </li>
                <li>
                  <strong>About:</strong> resumen técnico del proyecto con imagen en formato <code>.webp</code> y vídeo
                  explicativo de React.
                </li>
              </ul>
            </div>
          </div>

          <h5 className="mb-2">Arquitectura visual (.webp)</h5>
          <div className="mb-4">
            <img
              src="/about-app.webp"
              alt="Arquitectura AppClients React con Ionic y Supabase"
              className="img-fluid rounded border shadow-sm w-100"
            />
          </div>

          <h5 className="mb-2">Vídeo explicativo sobre React (YouTube)</h5>
          <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm border">
            <iframe
              src="https://www.youtube.com/embed/Tn6-PIqc4UM"
              title="React in 100 Seconds"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
