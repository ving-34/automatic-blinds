import { MQTTClient } from "../mqtt/client";

export class MotorService {
  private deviceId: string;

  public constructor(deviceId: string) {
    this.deviceId = deviceId;
  }

  public async move(numberOfSteps: number): Promise<void> {
    const client = MQTTClient.getInstance().client;
    await client.publishAsync(
      `device/${this.deviceId}/move`,
      numberOfSteps.toString()
    );
  }
}
