import { Observable, map } from "rxjs";
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
          this.createDevice({ id });
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
}
