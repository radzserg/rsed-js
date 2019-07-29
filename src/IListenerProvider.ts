import AppEvent from "./AppEvent";

export type AppEventHandler = (event: AppEvent) => void;

export interface IListenerProvider {
    getListenersForEvent(event: AppEvent) : AppEventHandler[];
}