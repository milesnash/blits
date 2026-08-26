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

export type BaseRecord = Record<string, unknown>;

export type PartialReadonly<T> = Readonly<Partial<T>>;

export type StateFn<This, Return = unknown> = (this: This) => Return;

export type ComputedReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => infer R ? R : never;
};

export type FnMap = Record<string, (...args: unknown[]) => unknown>;

export type ConfigFnsMap<This, OwnProps> = ThisType<This> & OwnProps;
