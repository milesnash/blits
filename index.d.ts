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

// blits file type reference
/// <reference path="./blits.d.ts" />

import * as Legacy from "./types/legacy.d.ts";

declare module "@lightningjs/blits" {
  export type AnnouncerUtteranceOptions = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.AnnouncerUtteranceOptions;
  export type AnnouncerDriverOptions = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.AnnouncerDriverOptions;
  export type AnnouncerDriver = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.AnnouncerDriver;
  export type AnnouncerUtterance = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.AnnouncerUtterance;
  export type Announcer = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Announcer;
  export type Hooks = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Hooks;
  export type Input = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Input;
  export type Log = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Log;
  export type RouteData = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.RouteData;
  export type RouteOptions = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RouteOptions;
  export type Router = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Router;
  export type CustomComponentProperties = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.CustomComponentProperties;
  export type ComponentBase = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ComponentBase;
  export type ApplicationBase = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ApplicationBase;
  export type ChildComponentBase = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ChildComponentBase;
  export type PropObject = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.PropObject;
  export type Props = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Props;
  export type ComponentContext = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ComponentContext;
  export type ApplicationContext = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ApplicationContext;
  export type ComponentConfig = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ComponentConfig;
  export type RouterHooks = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.RouterHooks;
  export type RouterConfig = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RouterConfig;
  export type ApplicationConfig = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.ApplicationConfig;
  export type Transition = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Transition;
  export type Before = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Before;
  export type RouteTransition = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RouteTransition;
  export type RouteTransitionFunction = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RouteTransitionFunction;
  export type RouteAnnounce = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RouteAnnounce;
  export type RequireAtLeastOne = BlitsTypeSystem extends { mode: "modern" }
    ? never
    : Legacy.RequireAtLeastOne;
  export type RouteHooks = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.RouteHooks;
  export type Route = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Route;
  export type Settings = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Settings;
  export type Blits = BlitsTypeSystem extends { mode: "modern" } ? never : Legacy.Blits;

  const Blits: Blits;

  export default Blits;
}
