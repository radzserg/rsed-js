import AppEvent from "../AppEvent";
describe("AppEvent", () => {
    test("it defines name by prototype", () => {
        class FooEvent extends AppEvent {
        }
        const event = new FooEvent();
        expect(event.getName()).toEqual("FooEvent");
    });

    test("it defines name by name provided in static method", () => {
        class BarEvent extends AppEvent {
            static eventName = "Bar";
        }
        const event = new BarEvent();
        expect(event.getName()).toEqual("Bar");
    });
});