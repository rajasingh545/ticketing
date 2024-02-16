import { Listener } from "./base-listener";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

class EventObserver<T extends Event> {
  private obs: Listener<T>[] = [];

  subscribe(event: Listener<T>) {
    this.obs.push(event);
  }

  listen() {
    this.obs.forEach((obs) => {
      obs.listen();
    });
  }
}

export const eventObserver = new EventObserver();
