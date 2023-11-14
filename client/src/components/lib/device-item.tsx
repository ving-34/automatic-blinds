import { IonButton, IonItem, IonLabel } from "@ionic/react";
import { useState } from "react";
import { DeviceService } from "../../services";

export interface DeviceItemProps {
  id: string;
  onConnect?: () => void;
}

export const DeviceItem = (props: DeviceItemProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnectionSuccess = () => {
    if (props.onConnect) {
      props.onConnect();
    }
  };

  const onConnect = () => {
    setIsConnecting(true);

    const service = new DeviceService(props.id);
    const subscription = service.connectToDevice().subscribe(() => {
      onConnectionSuccess();
      setIsConnecting(false);
    });
  };

  return (
    <IonItem key={props.id}>
      <IonLabel>{props.id}</IonLabel>
      <IonButton slot="end" onClick={onConnect}>
        Connect
      </IonButton>
    </IonItem>
  );
};
