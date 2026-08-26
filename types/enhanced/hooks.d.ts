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

import { BaseRecord } from "./core";

export interface Hooks<This = BaseRecord> {
  /**
   * Fires when the Component is being instantiated
   * At this moment child elements will not be available yet
   */
  init?: (this: This) => void;
  /**
   * Fires when the Component is fully initialized and ready for interaction.
   */
  ready?: (this: This) => void;
  /**
   * Triggers when the Component receives focus.
   *
   * This event can fire multiple times during the component's lifecycle
   */
  focus?: (this: This) => void;
  /**
   * Triggers when the Component loses focus.
   *
   * This event can fire multiple times during the component's lifecycle
   */
  unfocus?: (this: This) => void;
  /**
   * Fires when the Component is being destroyed and removed.
   */
  destroy?: (this: This) => void;
  hover?: (this: This) => void;
  unhover?: (this: This) => void;
  /**
   * Fires upon each frame start  (allowing you to tap directly into the renderloop)
   *
   * Note: This hook will fire continuously, multiple times per second!
   */
  frameTick?: (this: This, data: { time: number; delta: number }) => void;
  /**
   * Fires when the component enters the viewport _margin_ and is attached to the render tree
   *
   * This event can fire multiple times during the component's lifecycle
   */
  attach?: (this: This) => void;
  /**
   * Fires when the component leaves the viewport _margin_ and is detached from the render tree
   *
   * This event can fire multiple times during the component's lifecycle
   */
  detach?: (this: This) => void;
  /**
   * Fires when the component enters the visible viewport
   *
   * This event can fire multiple times during the component's lifecycle
   */
  enter?: (this: This) => void;
  /**
   * Fires when the component leaves the visible viewport
   *
   * This event can fire multiple times during the component's lifecycle
   */
  exit?: (this: This) => void;
  /**
   * Fires when the renderer is done rendering and enters an idle state (idle = true)
   * and when the renderer starts rendering again and leaves the idle state (idle = false)
   *
   * @param idle - boolean to indicate whether the renderer is in idle state or not
   *
   * Note: This event can fire multiple times
   */
  idle?: (this: This, idle: boolean) => void;
  /**
   * Fires at a predefined interval and reports the current FPS value
   *
   * Note: This event fire multiple times
   */
  fpsUpdate?: (this: This, fps: number) => void;
}
