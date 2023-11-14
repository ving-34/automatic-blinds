import {
  IonAlert,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { AddDeviceModal, MotorControls } from "../components";
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Device } from "../types";
import { DeviceService } from "../services";

interface DevicePageProps
  extends RouteComponentProps<{
    deviceId: string;
  }> {}

const DevicePage: React.FC<DevicePageProps> = (props: DevicePageProps) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const device = await new DeviceService().getDevice(
        props.match.params.deviceId
      );
      setDevice(device);
      setName(device?.name ?? "");
    })();
  }, [props.match.params.deviceId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert>{DeviceService.getURL()}</IonAlert>
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
              {device && (
                <>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        label="Name"
                        placeholder="Device Name"
                        value={name}
                        onIonChange={(e) =>
                          setName(e.target.value?.toString() ?? "")
                        }
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <MotorControls deviceId={device.id} />
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
