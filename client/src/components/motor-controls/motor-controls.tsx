import { IonButton, IonIcon } from "@ionic/react";
import { MotorService } from "../../services/motor-service";
import { useEffect, useState } from "react";
import {
  MotorDirection,
  MotorMoveButton,
} from "../motor-move-button/motor-move-button";
import { arrowDownCircleOutline, arrowUpCircleOutline } from "ionicons/icons";

export interface MotorControlsProps {
  motorId: string;
}

export const MotorControls = (props: MotorControlsProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "4rem",
      }}
    >
      <MotorMoveButton motorId={props.motorId} direction={MotorDirection.Up}>
        <IonIcon icon={arrowUpCircleOutline}></IonIcon>
      </MotorMoveButton>
      <MotorMoveButton motorId={props.motorId} direction={MotorDirection.Down}>
        <IonIcon icon={arrowDownCircleOutline}></IonIcon>
      </MotorMoveButton>
    </div>
  );
};
