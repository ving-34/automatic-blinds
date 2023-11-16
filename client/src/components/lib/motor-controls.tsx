import {
  GestureDetail,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  createGesture,
} from "@ionic/react";
import { MotorDirection, MotorMoveButton } from "./motor-move-button";
import {
  arrowDown,
  arrowDownCircleOutline,
  arrowUp,
  arrowUpCircleOutline,
  chevronDown,
  chevronUp,
  stopCircleOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import "./motor-controls.scss";
import clsx from "clsx";
import { MotorService } from "../../services";

const useMotorMove = (deviceId: string) => {
  const [direction, setDirection] = useState<MotorDirection | undefined>(
    undefined
  );

  const service = new MotorService(deviceId);

  const [moveInterval, setMoveInterval] = useState<
    ReturnType<typeof setInterval> | undefined
  >(undefined);

  useEffect(() => {
    if (direction) {
      setMoveInterval(setInterval(() => service.move(direction * 16), 75));
    } else {
      if (moveInterval) {
        clearInterval(moveInterval);
        setMoveInterval(undefined);
      }
    }
  }, [direction]);

  return [direction, setDirection] as const;
};

export interface MotorControlsProps {
  deviceId: string;
}

export const MotorControls = (props: MotorControlsProps) => {
  const remote = useRef<HTMLDivElement>(null);

  const service = new MotorService(props.deviceId);
  const [direction, setDirection] = useMotorMove(props.deviceId);

  const onStart = () => {
    setDirection(undefined);
  };

  const UP_THRESHOLD = -75;
  const DOWN_THRESHOLD = 75;

  const onMove = (detail: GestureDetail) => {
    if (detail.deltaY < UP_THRESHOLD) {
      setDirection(MotorDirection.Up);
    } else if (detail.deltaY > DOWN_THRESHOLD) {
      setDirection(MotorDirection.Down);
    } else {
      setDirection(undefined);
    }
  };

  const onEnd = () => {
    setDirection(undefined);
  };

  useEffect(() => {
    if (remote.current) {
      const target = remote.current;
      if (target) {
        const gesture = createGesture({
          el: target,
          blurOnStart: true,
          onStart: () => onStart(),
          disableScroll: true,
          direction: "y",
          onMove: (detail) => onMove(detail),
          onEnd: () => onEnd(),
          gestureName: "motor-control-swipe",
        });

        gesture.enable();

        return () => {
          gesture.destroy();
        };
      }
    }
  }, [remote]);

  return (
    <div className="motor-controls" ref={remote}>
      <div
        onClick={() => service.move(MotorDirection.Up * 16)}
        className={clsx(
          "motor-controls__button",
          direction === MotorDirection.Up ? "active" : ""
        )}
      >
        <IonIcon icon={chevronUp} />
        <IonIcon icon={chevronUp} />
        <IonIcon icon={chevronUp} />
      </div>
      <div
        onClick={() => service.move(MotorDirection.Down * 16)}
        className={clsx(
          "motor-controls__button",
          direction === MotorDirection.Down ? "active" : ""
        )}
      >
        <IonIcon icon={chevronDown} />
        <IonIcon icon={chevronDown} />
        <IonIcon icon={chevronDown} />
      </div>
    </div>
  );
};
