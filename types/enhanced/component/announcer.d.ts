/*
 * Copyright 2023 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AnnouncerUtteranceOptions {
  /**
   * Language code (BCP 47 format, e.g., 'en-US', 'fr-FR')
   *
   * @default 'en-US'
   */
  lang?: string;
  /**
   * Voice pitch (0 to 2, where 1 is normal)
   *
   * @default 1
   */
  pitch?: number;
  /**
   * Speech rate (0.1 to 10, where 1 is normal)
   *
   * @default 1
   */
  rate?: number;
  /**
   * Voice to use (obtained from `speechSynthesis.getVoices()`)
   *
   * @default null
   */
  voice?: SpeechSynthesisVoice | null;
  /**
   * Volume level (0 to 1, where 1 is full volume)
   *
   * @default 1
   */
  volume?: number;
  /**
   * Whether to enable utterance keep-alive (prevents pausing on some platforms)
   *
   * @default undefined
   */
  enableUtteranceKeepAlive?: boolean;
}

export interface AnnouncerDriverOptions extends AnnouncerUtteranceOptions {
  /**
   * Message to be spoken by the platform announcer driver.
   */
  message: string | number;
  /**
   * Internal announcement id used by the Blits announcer queue.
   */
  id: number;
}

export interface AnnouncerDriver {
  /**
   * Speak one queued announcement.
   */
  speak(options: AnnouncerDriverOptions): Promise<any>;
  /**
   * Stop the active platform announcement, when supported.
   */
  cancel(): void;
}

export interface AnnouncerUtterance extends Promise<string> {
  /**
   * Removes a specific message from the announcement queue,
   * to make sure it isn't spoke out.
   *
   * Does not interupt the message when it's already being announced.
   */
  cancel(message: string | number): void;
  remove(message: string | number): void;

  /**
   * Interrupts a specific message as it is being spoken out by the Text to Speech
   * engine.
   */
  stop(message: string | number): void;
}

export interface Announcer {
  /**
   * Instruct the Announcer to speak a message. Will add the message
   * to the end of announcement queue by default
   *
   * When a message is added with politeness set to `assertive` the message
   * will be added to the beginning of the queue
   *
   * @param message - The message to be spoken
   * @param politeness - Politeness level ('off', 'polite', or 'assertive')
   * @param options - Optional utterance options (rate, pitch, lang, voice, volume)
   */
  speak(
    message: string | number,
    politeness?: "off" | "polite" | "assertive",
    options?: AnnouncerUtteranceOptions,
  ): AnnouncerUtterance;
  /**
   * Instruct the Announcer to speak a message with 'polite' politeness level.
   * Will add the message to the end of announcement queue.
   *
   * @param message - The message to be spoken
   * @param options - Optional utterance options (rate, pitch, lang, voice, volume)
   */
  polite(message: string | number, options?: AnnouncerUtteranceOptions): AnnouncerUtterance;
  /**
   * Instruct the Announcer to speak a message with 'assertive' politeness level.
   * Will add the message to the beginning of announcement queue.
   *
   * @param message - The message to be spoken
   * @param options - Optional utterance options (rate, pitch, lang, voice, volume)
   */
  assertive(message: string | number, options?: AnnouncerUtteranceOptions): AnnouncerUtterance;
  /**
   * Configure global default utterance options that will be applied to all
   * subsequent announcements unless overridden by per-call options.
   *
   * @param options - Default utterance options (rate, pitch, lang, voice, volume)
   */
  configure(options?: AnnouncerUtteranceOptions): void;
  /**
   * Instruct the Announcer to add a pause of a certain duration (in ms). Will add this pause
   * to the end of announcement queue
   *
   */
  pause(delay: number): AnnouncerUtterance;
  /**
   * Interupts and instantly stops any running text to speech utterance
   *
   */
  stop(): void;
  /**
   * Clears out the announcement queue of messages.
   */
  clear(): void;
  /**
   * Enables the announcer.
   */
  enable(): void;
  /**
   * Disables the announcer. Any messages passed in the announcer.speak() message
   * will not be added to the queue
   */
  disable(): void;
  /**
   * Toggles the announcer based on the passed toggle value (Boolean)
   */
  toggle(toggle: boolean): void;
}
