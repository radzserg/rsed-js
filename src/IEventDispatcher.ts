import AppEvent from "./AppEvent";

export interface IEventDispatcher {
    dispatch: (event: AppEvent) => void;
}