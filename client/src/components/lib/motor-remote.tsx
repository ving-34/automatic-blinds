import { GestureDetail, IonIcon, createGesture } from "@ionic/react";
import { MotorDirection } from "./motor-move-button";
import { chevronDown, chevronUp } from "ionicons/icons";
import { useCallback, useEffect, useRef, useState } from "react";

import "./motor-remote.scss";
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
      setMoveInterval(setInterval(() => service.move(direction * 108), 400));
    } else {
      if (moveInterval) {
        clearInterval(moveInterval);
        setMoveInterval(undefined);
      }
    }
  }, [direction]);

  return [direction, setDirection] as const;
};

export interface MotorRemoteProps {
  deviceId: string;
  disabled?: boolean;
  percentage?: number;
}

export const MotorRemote = (props: MotorRemoteProps) => {
  const remote = useRef<HTMLDivElement>(null);

  const service = new MotorService(props.deviceId);
  const [direction, setDirection] = useMotorMove(props.deviceId);

  const onStart = () => {
    setDirection(undefined);
  };

  const UP_THRESHOLD = -75;
  const DOWN_THRESHOLD = 75;

  const onMove = useCallback(
    (detail: GestureDetail) => {
      if (props.disabled) {
        setDirection(undefined);
        return;
      }

      if (
        detail.deltaY < UP_THRESHOLD &&
        (props.percentage === undefined || props.percentage !== 0)
      ) {
        console.log("setting direction up");
        setDirection(MotorDirection.Up);
      } else if (
        detail.deltaY > DOWN_THRESHOLD &&
        (props.percentage === undefined || props.percentage !== 100)
      ) {
        console.log("setting direction down");
        setDirection(MotorDirection.Down);
      } else {
        console.log("clearing direction");
        setDirection(undefined);
      }
    },
    [props.percentage, props.disabled, setDirection]
  );

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
          gestureName: "motor-remote-swipe",
        });

        gesture.enable();

        return () => {
          gesture.destroy();
        };
      }
    }
  }, [remote, onMove]);

  return (
    <div
      className={clsx("motor-remote", props.disabled && "disabled")}
      ref={remote}
    >
      <div
        onClick={() => service.move(MotorDirection.Up * 64)}
        className={clsx(
          "motor-remote__button",
          direction === MotorDirection.Up && "active",
          props.percentage === 0 && "disabled"
        )}
      >
        <IonIcon icon={chevronUp} />
        <IonIcon icon={chevronUp} />
        <IonIcon icon={chevronUp} />
      </div>
      <div
        onClick={() => service.move(MotorDirection.Down * 64)}
        className={clsx(
          "motor-remote__button",
          direction === MotorDirection.Down && "active",
          props.percentage === 100 && "disabled"
        )}
      >
        <IonIcon icon={chevronDown} />
        <IonIcon icon={chevronDown} />
        <IonIcon icon={chevronDown} />
      </div>
    </div>
  );
};
