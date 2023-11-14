import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Motor Controls</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <MotorControls deviceId={props.match.params.deviceId} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
