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

import { BaseRecord } from "../core";

/**
 * Pass focus to other Component; optionally with an event
 */
interface Focus {
  $focus(evt?: KeyboardEvent): void;
}

/**
 * Have another Component process input
 *
 * @returns {boolean} true if a handler was found and handled the input.
 */
interface Input {
  $input(evt?: KeyboardEvent): boolean;
}

/**
 * Methods of the Component for handling
 */
interface Handler extends Focus, Input {}

/**
 * Select a Component by reference
 */
interface Select {
  $select(ref: string): Handler | undefined;
}

/**
 * Trigger reactivity related to a state property, even when
 * the property has not changed value
 */
interface Trigger<State extends BaseRecord = BaseRecord> {
  $trigger(key: keyof State): void;
}

/**
 * The basic built-ins of a Component
 */
export interface ComponentBase<State extends BaseRecord = BaseRecord>
  extends Handler, Select, Trigger<State> {
  $parent: Handler;
}
