import { IonButton } from "@ionic/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { MotorService } from "../../services/motor-service";

export enum MotorDirection {
  Down = -1,
  Up = 1,
}

export interface MotorMoveButtonProps extends PropsWithChildren {
  deviceId: string;
  direction: MotorDirection;
}

export const MotorMoveButton = (props: MotorMoveButtonProps) => {
  const service = new MotorService(props.deviceId);

  const [isMoving, setIsMoving] = useState(false);
  const [moveInterval, setMoveInterval] = useState<
    ReturnType<typeof setInterval> | undefined
  >(undefined);

  useEffect(() => {
    if (isMoving) {
      setMoveInterval(
        setInterval(() => service.move(props.direction * 16), 75)
      );
    } else {
      if (moveInterval) {
        clearInterval(moveInterval);
        setMoveInterval(undefined);
      }
    }
  }, [isMoving]);

  return (
    <IonButton
      expand="block"
      onPointerDown={() => setIsMoving(true)}
      onPointerUp={() => setIsMoving(false)}
    >
      {props.children}
    </IonButton>
  );
};
