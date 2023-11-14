import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { MotorDirection, MotorMoveButton } from "./motor-move-button";
import {
  arrowDownCircleOutline,
  arrowUpCircleOutline,
  stopCircleOutline,
} from "ionicons/icons";
import { useState } from "react";

export interface MotorControlsProps {
  deviceId: string;
}

export const MotorControls = (props: MotorControlsProps) => {
  const [direction, setDirection] = useState<MotorDirection | undefined>(
    undefined
  );

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <MotorMoveButton
            isMoving={direction === MotorDirection.Up}
            onClick={() =>
              setDirection(
                direction === MotorDirection.Up ? undefined : MotorDirection.Up
              )
            }
            deviceId={props.deviceId}
            direction={MotorDirection.Up}
            disabled={direction === MotorDirection.Up}
          >
            <IonIcon icon={arrowUpCircleOutline}></IonIcon>
          </MotorMoveButton>
        </IonCol>
        <IonCol>
          <MotorMoveButton
            isMoving={direction === MotorDirection.Down}
            disabled={direction === MotorDirection.Down}
            onClick={() =>
              setDirection(
                direction === MotorDirection.Down
                  ? undefined
                  : MotorDirection.Down
              )
            }
            deviceId={props.deviceId}
            direction={MotorDirection.Down}
          >
            <IonIcon icon={arrowDownCircleOutline}></IonIcon>
          </MotorMoveButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            expand="block"
            color="danger"
            disabled={direction === undefined}
            onClick={() => setDirection(undefined)}
          >
            <IonIcon icon={stopCircleOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
