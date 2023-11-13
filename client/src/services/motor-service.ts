export class MotorService {
  private motorId: string;

  public constructor(motorId: string) {
    this.motorId = motorId;
  }

  public async move(numberOfSteps: number): Promise<void> {
    await fetch(`/api/motor/${this.motorId}/move`, {
      method: "post",
      body: JSON.stringify({
        steps: numberOfSteps,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
