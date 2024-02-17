import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@rajasingh545/ticketing-package";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
