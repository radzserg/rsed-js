# RSED - Event Dispatcher

RSED is simple event dispatcher. It dispatches events in sync mode. There's no async/await, all events are non-blocking.

# Getting Started

**Build your custom application event**

```typescript
export default class CurrentUserSaved {
  public user: User;
  constructor(user: User) {
    this.user = user;
  }
}
```

**Build event listeners**

You have to build class that implements IListenerProvider.

```typescript
import { AppEventHandler, IListenerProvider } from "rsed";

export default class CurrentUserEventListener implements IListenerProvider {
  getListenersForEvent(event: object): AppEventHandler[] {
    if (event instanceof CurrentUserSaved) {
      return [this.setAccess];
    }
    return [];
  }

  setAccess = (event: CurrentUserSaved) => {
    console.log("New user authenticated", event.user);
  };
}
```

**Build event dispatcher**

```typescript
import EventDispatcher, { IEventDispatcher } from "rsed";

const eventDispatcher = new EventDispatcher();
eventDispatcher.addListenerProvider(new CurrentUserEventListener());
```

**Dispatch event in your application**

```typescript
eventDispatcher.dispatch(new CurrentUserSaved(currentUser));
```

**Test async event handlers**

```typescript
// add tester helper
export const flushPromises = () => {
  return new Promise((resolve) => setImmediate(resolve));
};

export class MyAsyncListener {
  public async isSatisfied(newValue: number) {
    // await someAction()
  }
}

// test

eventDispatcher.dispatch(new MyEvent());
await flushPromises();

expect(MyAsyncListener.isSatisfied).toHaveBeenCalled();
```
