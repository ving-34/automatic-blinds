import { Observable, map, race } from "rxjs";
import { MQTTClient, TopicData } from "../../mqtt/lib/client";
import { Device } from "../../types";

export class DeviceService {
  public static getURL() {
    return import.meta.env.VITE_API_URL;
  }

  public constructor() {}

  public connectToDevice(id: string): Observable<void> {
    MQTTClient.getInstance().publish(`device/${id}/connect`);

    return MQTTClient.getInstance()
      .subscribe(`device/${id}/connect-response`)
      .pipe(
        map(({ payload }) => {
          const [id, type] = String(payload).split(":");

          this.createDevice({ id, type });
        })
      );
  }

  public async createDevice(device: Device): Promise<void> {
    const response = await fetch(`${DeviceService.getURL()}device`, {
      method: "POST",
      body: JSON.stringify(device),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create device");
    }

    return;
  }

  public async getDevices(): Promise<Device[]> {
    const response = await fetch(`${DeviceService.getURL()}device`);

    if (!response.ok) {
      throw new Error("Failed to get devices");
    }

    return response.json();
  }

  public async getDevice(id: string): Promise<Device> {
    const response = await fetch(`${DeviceService.getURL()}device/${id}`);

    if (!response.ok) {
      throw new Error("Failed to get device");
    }

    return response.json();
  }

  public initSession(
    id: string
  ): Observable<{ percentage: number; isConfigured: boolean }> {
    MQTTClient.getInstance().publish(`device/${id}/session/init`);

    return MQTTClient.getInstance()
      .subscribe(`device/${id}/session/init-response`)
      .pipe(
        map(({ payload }) => {
          const [percentage, isConfigured] = String(payload).split(":");

          return {
            percentage: Number(percentage),
            isConfigured: JSON.parse(isConfigured) as boolean,
          };
        })
      );
  }

  public setTop(id: string): void {
    MQTTClient.getInstance().publish(`device/${id}/configuration/set-top`);
  }

  public setBottom(id: string): void {
    MQTTClient.getInstance().publish(`device/${id}/configuration/set-bottom`);
  }

  public moveToTop(id: string): void {
    MQTTClient.getInstance().publish(`device/${id}/move/top`);
  }

  public moveToBottom(id: string): void {
    MQTTClient.getInstance().publish(`device/${id}/move/bottom`);
  }

  public saveConfiguration(id: string): void {
    MQTTClient.getInstance().publish(`device/${id}/configuration/save`);
  }

  public onMove(id: string): Observable<number> {
    return MQTTClient.getInstance()
      .subscribe(`device/${id}/on-move`)
      .pipe(
        map(({ payload }) => {
          return Number(payload);
        })
      );
  }

  public onConfigured(
    id: string
  ): Observable<{ percentage: number; isConfigured: boolean }> {
    return MQTTClient.getInstance()
      .subscribe(`device/${id}/configuration/save-response`)
      .pipe(
        map(({ payload }) => {
          const [percentage, isConfigured] = String(payload).split(":");

          return {
            percentage: Number(percentage),
            isConfigured: JSON.parse(isConfigured) as boolean,
          };
        })
      );
  }

  public moveToPercentage(
    id: string,
    percentage: number
  ): Observable<{ percentage: number }> {
    MQTTClient.getInstance().publish(
      `device/${id}/move/percentage`,
      String(percentage)
    );

    return MQTTClient.getInstance()
      .subscribe(`device/${id}/move/percentage-response`)
      .pipe(
        map(({ payload }) => {
          const [percentage] = String(payload).split(":");
          return {
            percentage: Number(percentage),
          };
        })
      );
  }
}
