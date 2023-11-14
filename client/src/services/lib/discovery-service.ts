import { MQTTClient } from "../../mqtt/lib/client";
import { Observable } from "rxjs";

export class DiscoveryService {
  private static instance: DiscoveryService;
  private _isDiscovering: boolean;

  public static getInstance() {
    if (!DiscoveryService.instance) {
      DiscoveryService.instance = new DiscoveryService();
    }

    return DiscoveryService.instance;
  }

  public constructor() {
    this._isDiscovering = false;
  }

  public isDiscovering() {
    return this._isDiscovering;
  }

  public startDiscovery() {
    if (this.isDiscovering()) {
      return;
    }

    this._isDiscovering = true;

    return MQTTClient.getInstance().subscribe("device/+/discovery");
  }

  public stopDiscovery() {
    if (this.isDiscovering()) {
      MQTTClient.getInstance().unsubscribe("device/+/discovery");
      this._isDiscovering = false;
    }
  }

  public onDiscoveryStopped(): Observable<any> {
    return MQTTClient.getInstance().subscribe(`device/+/discovery-stopped`);
  }
}
