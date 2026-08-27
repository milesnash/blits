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

import {
  BaseRecord,
  ComputedReturnTypes,
  ConfigFnsMap,
  FnMap,
  PartialReadonly,
  StateFn,
} from "./core";
import { Events } from "./component/events";
import { Hooks } from "./hooks";
import { Input } from "./input";
import { Watch } from "./watch";

export interface Blits<
  EventRegistry extends BaseRecord = BaseRecord,
  AppEvents extends Events = Events<EventRegistry>,
> {
  Component<
    Props extends BaseRecord = BaseRecord,
    State extends BaseRecord = BaseRecord,
    Computed extends FnMap = FnMap,
    ComputedProps extends ComputedReturnTypes<Computed> = ComputedReturnTypes<Computed>,
    Methods extends FnMap = FnMap,
  >(
    name: string,
    config: {
      // Templating config
      // TODO: components?: Components;
      template?: string;

      // Value provider config
      props?: Props;
      state?: StateFn<PartialReadonly<Props>, State>;
      computed?: ConfigFnsMap<PartialReadonly<Props & State>, Computed>;
      methods?: ConfigFnsMap<Readonly<AppEvents & Props & State & ComputedProps>, Methods>;

      // Listener config
      hooks?: Hooks<Readonly<AppEvents & Props & State & ComputedProps & Methods>>;
      input?: Input<Readonly<Props & State & ComputedProps & Methods>>;
      watch?: Watch<
        Readonly<Props & State & ComputedProps & Methods>,
        Readonly<Props & State & ComputedProps>
      >;
    },
  ): void;

  configure<EventRegistry extends BaseRecord = BaseRecord>(): Blits<EventRegistry>;
}
