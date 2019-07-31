# RSED - Event Dispatcher

RSED is really simple event dispatcher.

# Getting Started

**Build your custom application event**
```typescript 
export default class CurrentUserSaved 
{
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
    console.log("New user authenticated", event.user) 
  };
}
```

**Build event dispatcher**
```typescript
import EventDispatcher, { IEventDispatcher } from "rsed";

const eventDispatcher = new EventDispatcher();
eventDispatcher.addListenerProvider(
    new CurrentUserEventListener()
);
```

**Dispatch event in your application**
```typescript
eventDispatcher.dispatch(new CurrentUserSaved(currentUser));
```