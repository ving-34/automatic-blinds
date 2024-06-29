import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { BlindControls, MotorRemote } from "../components";
import { useEffect, useMemo, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Device } from "../types";
import { DeviceService } from "../services";

import "./Device.scss";
import { Subscription } from "rxjs";

interface DevicePageProps
  extends RouteComponentProps<{
    deviceId: string;
  }> {}

const DevicePage: React.FC<DevicePageProps> = (props: DevicePageProps) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const N_STEPS = 3;

  const deviceId = useMemo(
    () => props.match.params.deviceId,
    [props.match.params.deviceId]
  );

  const [isConfigured, setIsConfigured] = useState(false);
  const [percentage, setPercentage] = useState<number | undefined>(undefined);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionSubscription, setSessionSubscription] =
    useState<Subscription>();
  const [configuredSubscription, setConfiguredSubscription] =
    useState<Subscription>();
  const [moveSubscription, setMoveSubscription] = useState<Subscription>();

  useEffect(() => {
    setSessionSubscription(
      new DeviceService()
        .initSession(deviceId)
        .subscribe(({ percentage, isConfigured }) => {
          setPercentage(percentage);
          setIsConfigured(isConfigured);
          setIsSessionActive(true);
        })
    );

    return () => {
      sessionSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setMoveSubscription(
      new DeviceService().onMove(deviceId).subscribe((percentage) => {
        setPercentage(percentage);
      })
    );

    return () => {
      moveSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setConfiguredSubscription(
      new DeviceService()
        .onConfigured(deviceId)
        .subscribe(({ percentage, isConfigured }) => {
          setIsConfigured(isConfigured);
          setPercentage(percentage);

          if (!isConfigured) {
            setError("An error occurred while configuring your blinds.");
          }
        })
    );

    return () => {
      configuredSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const device = await new DeviceService().getDevice(deviceId);
      setDevice(device);
      setName(device?.name ?? "");
    })();
  }, [deviceId]);

  useEffect(() => {
    return () => {
      setIsConfigured(false);
      setIsSessionActive(false);
    };
  }, []);

  const [step, setStep] = useState(0);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
            <IonTitle>Device</IonTitle>
            {!isConfigured && (
              <IonProgressBar type="determinate" value={step / N_STEPS} />
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid style={{ position: "fixed", width: "100%" }}>
            <IonRow>
              <IonCol
                offsetMd="2"
                sizeMd="8"
                offsetLg="3"
                sizeLg="6"
                offsetXl="4"
                sizeXl="4"
              >
                {isSessionActive &&
                  device &&
                  (isConfigured ? (
                    percentage === undefined ? null : (
                      <IonRow>
                        <IonCol>
                          <BlindControls
                            deviceId={deviceId}
                            initalPercentage={percentage}
                          />
                        </IonCol>
                      </IonRow>
                    )
                  ) : (
                    <>
                      {step === 0 ? (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonText>
                                <h4 className="ion-text-center">
                                  Let's configure your blinds
                                </h4>
                              </IonText>
                              <IonText color="medium">
                                <p className="ion-text-center">
                                  Before you can start using your blinds, we
                                  need to do a quick configuration
                                </p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                          <IonRow className="ion-padding-top">
                            <IonCol>
                              <IonButton
                                expand="block"
                                onClick={() => setStep(step + 1)}
                              >
                                Start Configuration
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      ) : step === 1 ? (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonText>
                                <h4 className="ion-text-center">
                                  Start by opening the blinds all the way
                                </h4>
                              </IonText>
                              <IonText color="medium">
                                <p className="ion-text-center">
                                  Use the remote bellow to control the blinds
                                </p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                          <IonRow className="ion-padding-top ion-padding-bottom">
                            <MotorRemote deviceId={deviceId} />
                          </IonRow>
                          <IonRow className="ion-padding-top">
                            <IonCol>
                              <IonButton
                                disabled={true}
                                expand="block"
                                color="light"
                                onClick={() => setStep(step - 1)}
                              >
                                Previous
                              </IonButton>
                            </IonCol>
                            <IonCol>
                              <IonButton
                                expand="block"
                                onClick={() => {
                                  new DeviceService().setTop(deviceId);
                                  setStep(step + 1);
                                }}
                              >
                                Next
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      ) : step === 2 ? (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonText>
                                <h4 className="ion-text-center">
                                  Now, close them all the way
                                </h4>
                              </IonText>
                              <IonText color="medium">
                                <p className="ion-text-center">
                                  Use the remote bellow to control the blinds
                                </p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                          <IonRow className="ion-padding-top ion-padding-bottom">
                            <MotorRemote deviceId={deviceId} />
                          </IonRow>
                          <IonRow className="ion-padding-top">
                            <IonCol>
                              <IonButton
                                expand="block"
                                color="light"
                                onClick={() => setStep(step - 1)}
                              >
                                Previous
                              </IonButton>
                            </IonCol>
                            <IonCol>
                              <IonButton
                                expand="block"
                                onClick={() => {
                                  new DeviceService().setBottom(deviceId);
                                  setStep(step + 1);
                                }}
                              >
                                Next
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      ) : step === 3 ? (
                        <>
                          <IonRow>
                            <IonCol>
                              <IonText>
                                <h4 className="ion-text-center">
                                  You're all set!
                                </h4>
                              </IonText>
                              <IonText color="medium">
                                <p className="ion-text-center">
                                  You can now start using your blinds
                                </p>
                              </IonText>
                            </IonCol>
                          </IonRow>
                          <IonRow className="ion-padding-top">
                            <IonCol>
                              <IonButton
                                expand="block"
                                onClick={() => {
                                  new DeviceService().saveConfiguration(
                                    deviceId
                                  );
                                }}
                              >
                                Let's Go
                              </IonButton>
                              <IonButton
                                expand="block"
                                color="dark"
                                fill="clear"
                                onClick={() => setStep(1)}
                              >
                                Restart Configuration
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        </>
                      ) : null}
                    </>
                  ))}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
      <IonAlert
        isOpen={error !== ""}
        header={"Something went wrong"}
        subHeader={"Please try again"}
        message={error}
        buttons={["Try Again"]}
        onDidDismiss={() => {
          setError("");
          setStep(1);
        }}
      ></IonAlert>
    </>
  );
};

export default DevicePage;
