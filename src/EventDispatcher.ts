import {AppEventHandler, IListenerProvider} from "./IListenerProvider";
import {IEventDispatcher} from "./IEventDispatcher";

export default class EventDispatcher implements IEventDispatcher {
    private listeners: IListenerProvider[] = [];

    dispatch(event: any) {
        this.listeners.forEach((listener: IListenerProvider) => {
            const eventHandlers: AppEventHandler[] = listener.getListenersForEvent(event);
            eventHandlers.forEach((handler: AppEventHandler) => {
                handler(event);
            });
        })
    };

    addListenerProvider(listener: IListenerProvider) {
        this.listeners.push(listener);
    }
}