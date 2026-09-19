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

import { Announcer } from "./announcer";
import { BaseRecord } from "../core";
import { Handler, Methods } from "./methods";
import { PluginInstance } from "../plugin";
import { LogPlugin } from "../plugins/log";
import { Scheduling } from "./scheduling";

/**
 * The basic built-ins of a Component
 */
export interface ApplicationBase<State extends BaseRecord = BaseRecord>
  extends Methods, Scheduling {
  /**
   * Announcer methods for screen reader support
   */
  readonly $announcer: Announcer;

  /**
   * Log plugin is automatically available
   */
  readonly $log: PluginInstance<LogPlugin>;

  /**
   * Indicates whether the component currently has focus
   *
   * @returns Boolean
   */
  readonly $hasFocus: boolean;

  /**
   * Human-readable identifier for this component instance (e.g. "MyComponent_0")
   */
  readonly $componentId: string;

  /**
   * Dynamically set the size of a component holder node
   */
  readonly $size: (dimensions: {
    /**
     * Component width
     */
    w: number;
    /**
     * Component height
     */
    h: number;
  }) => void;
}

export interface ComponentBase<
  State extends BaseRecord = BaseRecord,
> extends ApplicationBase<State> {
  /**
   * The parent Component
   */
  readonly $parent: Handler;
}
