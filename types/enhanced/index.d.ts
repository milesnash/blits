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
} from "./component";

export interface Blits {
  Component<
    Props = BaseRecord,
    State = BaseRecord,
    Computed = FnMap,
    ComputedProps = ComputedReturnTypes<Computed>,
    Methods = FnMap,
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
      methods?: ConfigFnsMap<Readonly<Props & State & ComputedProps>, Methods>;

      // Listener config
      // TODO: hooks
      // TODO: input
      // TODO: watch
    },
  ): void;
}
