import NamedEvent from "../NamedEvent";

describe("NamedEvent", () => {
    test("it return getName set in constructor", () => {
        const eventName = "USED_LOGGED_IN";
        const event = new NamedEvent(eventName);
        expect(event.getName()).toEqual(eventName);
    });
});
