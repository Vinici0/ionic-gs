import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useForm } from '../hook/useForm';
interface User {
  nombre: string;
  email: string;
  edad : number;
}

const Tab1: React.FC = () => {

  const { nombre, email, handleChange } = useForm<User>({
    nombre: "Vinicio",
    email: "vinicio.borja10@gmail.com",
    edad: 35,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        
        {/* Formulario de inicio de sesión */}
        <form>
          <input
            name="nombre"
            value={nombre}
            placeholder="Nombre"
            onChange={handleChange}
          ></input>
          <br />
          <br />
          <input
            name="email"
            value={email}
            placeholder="Correo Electrónico"
            onChange={handleChange}
          ></input>
                    <br />
                    <br />
          <input
            name="edad"
            value={String(email)}
            placeholder="Edad"
            onChange={handleChange}
          ></input>
             <br />
             <br />
          <IonButton type="submit">Iniciar Sesión</IonButton>
        </form>
        <pre>{JSON.stringify({ nombre, email }, null, 3)}</pre>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
