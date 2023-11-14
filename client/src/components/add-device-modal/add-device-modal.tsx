import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DevicesService } from "../../services/devices-service";
import { useCallback, useEffect, useState } from "react";
import { Subscription } from "rxjs";

export interface AddDeviceModalProps {
  isOpen?: boolean;
  onDismiss?: () => void;
}

export const AddDeviceModal = (props: AddDeviceModalProps) => {
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );

  const [deviceIds, setDeviceIds] = useState<string[]>([]);

  const addDevice = useCallback(
    (deviceId: string) => {
      if (deviceIds.find((_deviceId) => _deviceId === deviceId)) {
        return;
      }

      setDeviceIds([...deviceIds, deviceId]);
    },
    [deviceIds]
  );

  useEffect(() => {
    if (props.isOpen) {
      setSubscription(
        DevicesService.getInstance()
          .startDiscovery()
          ?.subscribe(({ topic }) => {
            addDevice(topic.split("/")[1]);
          })
      );
    } else {
      DevicesService.getInstance().stopDiscovery();
    }

    return () => DevicesService.getInstance().stopDiscovery();
  }, [props.isOpen]);

  useEffect(() => {
    return () => {
      subscription?.unsubscribe();
    };
  }, [subscription]);

  return (
    <IonModal isOpen={props.isOpen} onWillDismiss={props.onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Searching for devices</IonCardTitle>
            <IonCardSubtitle>
              <IonSpinner name="circles" />
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        {deviceIds.length > 0 && (
          <IonList inset={true}>
            {deviceIds.map((deviceId) => (
              <IonItem key={deviceId}>
                <IonLabel>{deviceId}</IonLabel>
                <IonButton
                  slot="end"
                  routerLink={`device/${deviceId}`}
                  onClick={props.onDismiss}
                >
                  Connect
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};
