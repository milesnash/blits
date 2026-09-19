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

export interface Plugin<Options extends any, FactoryFn extends (options?: Options) => any> {
  /**
   * Name of the plugin. The plugin will be accessible on each Component's
   * `this` scope under this name, prefixed with a `$` (i.e. myplugin => `this.$myplugin`)
   */
  name: string;

  /**
   * Singleton function that will be used to instantiate the plugin.
   * Should do all necessary setup and ideally return an object with
   * properties or methods that can be used in the App
   */
  plugin: FactoryFn extends (options?: Options) => infer Instance ? Instance : never;
}

export type PluginInstance<P extends Plugin> = P["plugin"];
