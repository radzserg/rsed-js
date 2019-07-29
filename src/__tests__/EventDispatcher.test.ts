import EventDispatcher from "../EventDispatcher";
import { IListenerProvider } from "../IListenerProvider";

describe("EventDispatcher", () => {
    test("it add listeners", () => {
        const eventHandler = jest.fn();
        const getListenersForEvent = jest.fn();
        getListenersForEvent.mockReturnValueOnce([eventHandler]);
        const mockListenerProvider = ({
            getListenersForEvent,
        } as unknown) as IListenerProvider;

        const eventDispatcher = new EventDispatcher();
        eventDispatcher.addListenerProvider(mockListenerProvider);
        const event = {};
        eventDispatcher.dispatch(event);
        expect(eventHandler).toHaveBeenCalledTimes(1);
        expect(eventHandler).toHaveBeenCalledWith(event);
    });
});
