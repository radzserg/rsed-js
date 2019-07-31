export type AppEventHandler = (event: any) => void;

export interface IListenerProvider {
    getListenersForEvent(event: any): AppEventHandler[];
}