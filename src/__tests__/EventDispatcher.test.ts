import EventDispatcher from "../EventDispatcher";
import { IListenerProvider } from "../IListenerProvider";
import NamedEvent from "../NamedEvent";

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
        const event = new NamedEvent("USER_LOGGED_IN");
        eventDispatcher.dispatch(event);
        // expect(eventHandler).toHaveBeenCalledTimes(1);
        expect(eventHandler).toHaveBeenCalledWith(event);
    });
});
