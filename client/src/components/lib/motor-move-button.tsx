import { IonButton } from "@ionic/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { MotorService } from "../../services/lib/motor-service";

export enum MotorDirection {
  Down = -1,
  Up = 1,
}

export interface MotorMoveButtonProps extends PropsWithChildren {
  deviceId: string;
  direction: MotorDirection;
  isMoving: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const MotorMoveButton = (props: MotorMoveButtonProps) => {
  const service = new MotorService(props.deviceId);
  const [moveInterval, setMoveInterval] = useState<
    ReturnType<typeof setInterval> | undefined
  >(undefined);

  useEffect(() => {
    if (props.isMoving) {
      setMoveInterval(
        setInterval(() => service.move(props.direction * 16), 75)
      );
    } else {
      if (moveInterval) {
        clearInterval(moveInterval);
        setMoveInterval(undefined);
      }
    }
  }, [props.isMoving]);

  return (
    <IonButton expand="block" onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </IonButton>
  );
};
