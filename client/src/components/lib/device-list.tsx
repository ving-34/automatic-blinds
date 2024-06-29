import { useEffect, useState } from "react";
import { Device } from "../../types";
import { DeviceService } from "../../services";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
} from "@ionic/react";

export interface DeviceListProps {
  devices: Device[];
}

export const DeviceList = (props: DeviceListProps) => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Devices</IonLabel>
      </IonListHeader>
      {props.devices.map((device) => (
        <IonItem key={device.id} routerLink={`/device/${device.id}`}>
          <IonLabel>{device.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};
