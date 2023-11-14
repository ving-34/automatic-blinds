import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { MotorControls } from "../components/motor-controls/motor-controls";
import { addCircleOutline } from "ionicons/icons";
import { AddDeviceModal } from "../components/add-device-modal/add-device-modal";
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
