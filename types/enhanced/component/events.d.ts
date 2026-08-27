import { BaseRecord } from "../core";

type EmitArgs<R extends BaseRecord> = {
  [K in keyof R]: R[K] extends undefined
    ? [name: K, data?: undefined, byReference?: boolean]
    : [name: K, data: R[K], byReference?: boolean];
}[keyof R];

export interface Events<EventRegistry extends BaseRecord = BaseRecord> {
  /**
   * Emit events that other components can listen to
   * @param name - name of the event to be emitted
   * @param data - optional data to be passed along
   * @param byReference - whether or not to pass the data by reference.
   * The default behaviour is passing the data object by reference (`true`).
   * When explicitely passing `false` the object will be recursively cloned
   * and cleaned from any potential reactivity before emitting
   *
   * @returns {boolean | undefined} True if all listeners executed, false otherwise. undefined is Component is end-of-life
   */
  $emit(...args: EmitArgs<EventRegistry>): boolean | undefined;

  /**
   * Listen to events emitted by other components
   */
  $listen<K extends keyof EventRegistry>(
    event: K,
    callback: (args: EventRegistry[K]) => void,
    priority?: number,
  ): void;

  /**
   * Remove an event listener previously registered with $listen
   */
  $unlisten(event: keyof EventRegistry): void;

  /**
   * Remove all listeners for this component from all events
   */
  $clearListeners(): void;
}
