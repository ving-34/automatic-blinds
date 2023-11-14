import mqtt from "mqtt";
import match from "mqtt-match";
import { Observable, Subject } from "rxjs";

export type SubscriptionCallback = (
  topic: string,
  payload: string | Buffer
) => void;

export interface TopicData {
  topic: string;
  payload: Buffer | string;
}

export type TopicSubject = Subject<TopicData>;

export interface TopicSubscription {
  topic: string;
  subject: TopicSubject;
}

export class MQTTClient {
  private static instance: MQTTClient;
  private subscriptions: TopicSubscription[];

  public static getInstance(): MQTTClient {
    if (!MQTTClient.instance) {
      MQTTClient.instance = new MQTTClient();
    }

    return MQTTClient.instance;
  }

  public client: mqtt.MqttClient;

  public constructor() {
    this.client = mqtt.connect("ws://192.168.2.12", { port: 8080 });
    this.client.on("message", (topic, payload) =>
      this.onMessage(topic, payload)
    );

    this.subscriptions = [];
  }

  public subscribe(topic: string): TopicSubject {
    const subject = new Subject<TopicData>();
    this.subscriptions.push({ topic, subject });
    this.client.subscribe(topic);

    return subject;
  }

  private findSubscriptions(topic: string): TopicSubscription[] {
    return this.subscriptions.filter((subscription) =>
      match(subscription.topic, topic)
    );
  }

  private onMessage(topic: string, payload: string | Buffer) {
    this.findSubscriptions(topic).forEach((subscription) =>
      subscription.subject.next({ topic, payload })
    );
  }
}
