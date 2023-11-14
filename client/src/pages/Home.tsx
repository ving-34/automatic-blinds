import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { addCircleOutline } from "ionicons/icons";
import { AddDeviceModal, DeviceList } from "../components";
import { useState } from "react";

const Home: React.FC = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" onClick={() => setIsAddDeviceOpen(true)}>
              <IonIcon slot="start" icon={addCircleOutline} />
              Device
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AddDeviceModal
          isOpen={isAddDeviceOpen}
          onDismiss={() => setIsAddDeviceOpen(false)}
        />
        <IonGrid>
          <IonRow>
            <IonCol
              offsetMd="2"
              sizeMd="8"
              offsetLg="3"
              sizeLg="6"
              offsetXl="4"
              sizeXl="4"
            >
              <DeviceList />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
