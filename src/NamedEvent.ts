import AppEvent from "./AppEvent";

class NamedEvent extends AppEvent {
    private readonly name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

export default NamedEvent;
