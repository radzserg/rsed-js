export type AppEventHandler = (event: object) => void;

export interface IListenerProvider {
    getListenersForEvent(event: object): AppEventHandler[];
}