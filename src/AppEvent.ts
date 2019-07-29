abstract class AppEvent {
    protected static eventName: string;
    getName() {
        const me = <typeof AppEvent>this.constructor;
        const name = me.eventName;
        if (name !== undefined) {
            return name;
        }
        return this.constructor.name;
    }
}

export default AppEvent;