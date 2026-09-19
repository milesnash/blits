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

import { Plugin } from "../plugin";

interface Log {
  /**
   * Log an info message
   */
  info(...args: any[]): void;
  /**
   * Log an error message
   */
  error(...args: any[]): void;
  /**
   * Log a warning
   */
  warn(...args: any[]): void;
  /**
   * Log a debug message
   */
  debug(...args: any[]): void;
}

export interface LogPlugin extends Plugin<undefined, () => Log> {}
