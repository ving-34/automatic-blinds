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
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import "./Home.css";
import { addCircleOutline } from "ionicons/icons";
import { AddDeviceModal, DeviceList } from "../components";
import { useEffect, useState } from "react";
import { DeviceService } from "../services";
import { Device } from "../types";

const Home: React.FC = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  const fetchDevices = async (event?: CustomEvent<RefresherEventDetail>) => {
    setDevices(await new DeviceService().getDevices());

    setTimeout(() => {
      event?.detail.complete();
    }, 600);
  };

  useEffect(() => {
    if (!isLoaded) {
      (async () => {
        await fetchDevices();
        setIsLoaded(true);
      })();
    }

    return () => {
      setIsLoaded(false);
    };
  }, []);

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
        <IonRefresher slot="fixed" onIonRefresh={fetchDevices}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

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
              <DeviceList devices={devices} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
