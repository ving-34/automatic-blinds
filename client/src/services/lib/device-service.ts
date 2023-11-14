import { Observable, map } from "rxjs";
import { MQTTClient, TopicData } from "../../mqtt/lib/client";

export class DeviceService {
  private deviceId: string;

  public constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  public connectToDevice() {
    MQTTClient.getInstance().publish(`device/${this.deviceId}/connect`);

    return MQTTClient.getInstance()
      .subscribe(`device/${this.deviceId}/connect-response`)
      .pipe(
        map(({ payload }) => {
          this.createDevice();
        })
      );
  }

  public async createDevice(): Promise<void> {
    const response = await fetch("/api/device", {
      method: "POST",
      body: JSON.stringify({ id: this.deviceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create device");
    }

    return;
  }
}
