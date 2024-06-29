import {
  IonButton,
  IonCol,
  IonIcon,
  IonLabel,
  IonProgressBar,
  IonRange,
  IonRow,
  IonText,
} from "@ionic/react";
import { MotorRemote } from "./motor-remote";
import { cloudyNightOutline, sunnyOutline } from "ionicons/icons";
import { Subscription, first } from "rxjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { DeviceService } from "../../services";
import { createPortal } from "react-dom";

export interface BlindControlsProps {
  deviceId: string;
  initalPercentage: number;
}

export const BlindControls = (props: BlindControlsProps) => {
  const [moveSubscription, setMoveSubscription] = useState<Subscription>();
  const [percentage, setPercentage] = useState(props.initalPercentage);
  const [isMoving, setIsMoving] = useState(false);
  const ref = useRef<HTMLIonRowElement>(null);

  useEffect(() => {
    setMoveSubscription(
      new DeviceService().onMove(props.deviceId).subscribe((percentage) => {
        setPercentage(percentage);

        if (percentage === 0 || percentage === 100) {
          setIsMoving(false);
        }
      })
    );

    return () => {
      moveSubscription?.unsubscribe();
    };
  }, []);

  const toolbar = useMemo(() => {
    if (
      ref.current &&
      ref.current.closest(".ion-page")?.querySelector("ion-toolbar")
    ) {
      return ref.current.closest(".ion-page")?.querySelector("ion-toolbar");
    }
  }, [ref.current]);

  const moveToPercentage = (percentage: number) => {
    setIsMoving(true);
    new DeviceService()
      .moveToPercentage(props.deviceId, percentage)
      .pipe(first())
      .subscribe(({ percentage }) => {
        setIsMoving(false);
        setPercentage(percentage);
      });
  };

  return (
    <>
      {isMoving &&
        toolbar &&
        createPortal(<IonProgressBar type="indeterminate" />, toolbar)}
      <IonRow ref={ref}>
        <IonCol>
          <IonButton
            expand="block"
            onClick={() => {
              setIsMoving(true);
              new DeviceService().moveToTop(props.deviceId);
            }}
            disabled={percentage === 0 || isMoving}
          >
            <IonIcon icon={sunnyOutline} slot="start" />
            Open blinds
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            expand="block"
            color="light"
            onClick={() => {
              setIsMoving(true);
              new DeviceService().moveToBottom(props.deviceId);
            }}
            disabled={percentage === 100 || isMoving}
          >
            <IonIcon icon={cloudyNightOutline} slot="start" />
            Close blinds
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-padding-top">
          <MotorRemote
            deviceId={props.deviceId}
            disabled={isMoving}
            percentage={percentage}
          />
        </IonCol>
      </IonRow>
      <IonRow className="ion-padding-top ion-margin-top">
        <IonCol size="10" offset="1">
          <IonText className="ion-text-center">
            <h4>{percentage}%</h4>
          </IonText>
          <IonRange
            min={0}
            max={100}
            value={percentage}
            disabled={isMoving}
            onIonChange={(event) =>
              moveToPercentage(event.detail.value as number)
            }
          />
        </IonCol>
      </IonRow>
    </>
  );
};
