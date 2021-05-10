import {IEvent, IEventPayload, IListener, IListenerId} from "../types/event";
import {uuid} from "./uuid";

type IListeners = Map<IListenerId, IListener>;

export class NotificationService {

    private static readonly _instance = new NotificationService();
    public static instance() {
        return NotificationService._instance;
    }
    private listeners = new Map<IEvent, IListeners>();
    private constructor() {
    }

    public subscribe(event: IEvent, listener: IListener) {
        const listenerMap = this.listeners.get(event) || new Map<IListenerId, IListener>();
        const id = uuid();
        listenerMap.set(id, listener);
        this.listeners.set(event, listenerMap);
        return id;
    }

    public unsubscribe(event: IEvent, listenerId: IListenerId) {
        const listenerMap = this.listeners.get(event);
        if(!listenerMap) {
            console.warn("Not found listener map for event", event);
            return;
        }
        listenerMap.delete(listenerId);
        if(listenerMap.size===0) {
            this.listeners.delete(event);
        }
    }

    public notify(event: IEvent, payload?: IEventPayload) {
        console.log("notify"+event)
        const listenerMap = this.listeners.get(event);
        if(!listenerMap) {
            console.warn("Not found listener map for event", event);
            return;
        }
        console.log("notify "+event+" listenerMap=", listenerMap)
        listenerMap.forEach((listener: IListener) => {
            try {
                listener(payload);
            } catch(err) {
                console.error(err);
            }
        })
    }
}