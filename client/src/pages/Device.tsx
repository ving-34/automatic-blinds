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
import { RouteComponentProps } from "react-router";

interface DevicePageProps
  extends RouteComponentProps<{
    deviceId: string;
  }> {}

const DevicePage: React.FC<DevicePageProps> = (props: DevicePageProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MotorControls deviceId={props.match.params.deviceId} />
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
