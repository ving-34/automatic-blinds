import { useEffect, useState } from "react";
import { Device } from "../../types";
import { DeviceService } from "../../services";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonTitle,
} from "@ionic/react";

export const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    (async () => {
      setDevices(await new DeviceService().getDevices());
    })();
  }, []);

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Devices</IonLabel>
      </IonListHeader>
      {devices.map((device) => (
        <IonItem key={device.id} routerLink={`/device/${device.id}`}>
          <IonLabel>{device.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
