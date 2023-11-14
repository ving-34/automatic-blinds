import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DevicesService } from "../../services/lib/devices-service";
import { useCallback, useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { DeviceItem } from "./device-item";

export interface AddDeviceModalProps {
  isOpen?: boolean;
  onDismiss?: () => void;
}

export const AddDeviceModal = (props: AddDeviceModalProps) => {
  const [discoverSubscription, setDiscoverSubscription] = useState<
    Subscription | undefined
  >(undefined);
  const [stopSubscription, setStopSubscription] = useState<
    Subscription | undefined
  >(undefined);

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

  const removeDevice = useCallback(
    (deviceId: string) => {
      setDeviceIds(deviceIds.filter((_deviceId) => _deviceId !== deviceId));
    },
    [deviceIds]
  );

  useEffect(() => {
    if (props.isOpen) {
      setDiscoverSubscription(
        DevicesService.getInstance()
          .startDiscovery()
          ?.subscribe(({ topic }) => {
            addDevice(topic.split("/")[1]);
          })
      );

      setStopSubscription(
        DevicesService.getInstance()
          .onDiscoveryStopped()
          ?.subscribe(({ topic }) => {
            removeDevice(topic.split("/")[1]);
          })
      );
    } else {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DevicesService.getInstance().stopDiscovery();
    }

    return () => {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DevicesService.getInstance().stopDiscovery();
    };
  }, [props.isOpen]);

  useEffect(() => {
    return () => {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DevicesService.getInstance().stopDiscovery();
    };
  }, []);

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
              <DeviceItem
                key={deviceId}
                id={deviceId}
                onConnect={props.onDismiss}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};
