import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { MotorControls } from "../components/motor-controls/motor-controls";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <MotorControls motorId="1" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
