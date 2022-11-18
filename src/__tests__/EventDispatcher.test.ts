import EventDispatcher from "../EventDispatcher";
import { IListenerProvider } from "../IListenerProvider";

const mockListenerProvider = (eventHandler: jest.Mock): IListenerProvider => {
  const getListenersForEvent = jest.fn();
  getListenersForEvent.mockReturnValue([eventHandler]);
  return {
    getListenersForEvent,
  } as unknown as IListenerProvider;
};
describe("EventDispatcher", () => {
  test("it adds listeners", () => {
    const eventHandler = jest.fn();
    const mockedListenerProvider = mockListenerProvider(eventHandler);

    const eventDispatcher = new EventDispatcher();
    eventDispatcher.addListenerProvider(mockedListenerProvider);
    const event = {};
    eventDispatcher.dispatch(event);
    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler).toHaveBeenCalledWith(event);
  });

  test("it adds many listeners", () => {
    const eventHandlers = [];
    const mockedListenerProviders = [];
    for (let i = 0; i < 15; i++) {
      const eventHandler = jest.fn();
      eventHandlers.push(eventHandler);
      mockedListenerProviders.push(mockListenerProvider(eventHandler));
    }

    const eventDispatcher = new EventDispatcher();
    mockedListenerProviders.forEach((listener) => {
      eventDispatcher.addListenerProvider(listener);
    });
    const event = { a: 123 };
    eventDispatcher.dispatch(event);
    eventHandlers.forEach((eventHandler) => {
      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler).toHaveBeenCalledWith(event);
    });
  });

  test("it adds and removes listeners", () => {
    const eventHandlers = [];
    const mockedListenerProviders = [];
    for (let i = 0; i < 3; i++) {
      const eventHandler = jest.fn();
      eventHandlers.push(eventHandler);
      mockedListenerProviders.push(mockListenerProvider(eventHandler));
    }

    const eventDispatcher = new EventDispatcher();
    mockedListenerProviders.forEach((listener) => {
      eventDispatcher.addListenerProvider(listener);
    });
    const event = { a: 123 };
    eventDispatcher.dispatch(event);
    eventHandlers.forEach((eventHandler) => {
      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler).toHaveBeenCalledWith(event);
    });

    eventDispatcher.deleteListenerProvider(mockedListenerProviders[1]);

    const event2 = { b: 456 };
    eventDispatcher.dispatch(event2);
    expect(eventHandlers[0]).toHaveBeenCalledWith(event2);
    expect(eventHandlers[2]).toHaveBeenCalledWith(event2);
    expect(eventHandlers[1]).not.toHaveBeenCalledWith(event2);
  });
});
