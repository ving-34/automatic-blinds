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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { DiscoveryService } from "../../services/lib/discovery-service";
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
        DiscoveryService.getInstance()
          .startDiscovery()
          ?.subscribe(({ topic }) => {
            addDevice(topic.split("/")[1]);
          })
      );

      setStopSubscription(
        DiscoveryService.getInstance()
          .onDiscoveryStopped()
          ?.subscribe(({ topic }) => {
            removeDevice(topic.split("/")[1]);
          })
      );
    } else {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DiscoveryService.getInstance().stopDiscovery();
    }

    return () => {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DiscoveryService.getInstance().stopDiscovery();
    };
  }, [props.isOpen]);

  useEffect(() => {
    return () => {
      setDeviceIds([]);
      discoverSubscription?.unsubscribe();
      stopSubscription?.unsubscribe();
      DiscoveryService.getInstance().stopDiscovery();
    };
  }, []);

  return (
    <IonModal isOpen={props.isOpen} onWillDismiss={props.onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {deviceIds.length > 0 ? (
          <IonList inset={true}>
            {deviceIds.map((deviceId) => (
              <DeviceItem
                key={deviceId}
                id={deviceId}
                onConnect={props.onDismiss}
              />
            ))}
          </IonList>
        ) : (
          <IonTitle>
            <div className="ion-margin-bottom">Searching for devices</div>
            <IonSpinner name="circles" />
          </IonTitle>
        )}
      </IonContent>
    </IonModal>
  );
};
