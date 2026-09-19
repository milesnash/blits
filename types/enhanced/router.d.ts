import { BaseRecord, ConfigFnsMap, internal } from "./core";
import { Blits } from "./index";

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

interface Transition<Props extends BaseRecord, K extends keyof Props = keyof Props, V = Props[K]> {
  /**
   * Name of the prop to transition (i.e. 'x', 'y', 'alpha', 'color')
   */
  prop: K;
  /**
   * Value the prop should transition to (i.e. 0, 100, '#223388')
   */
  value: V;
  /**
   * Duration of the transition in milliseconds, defaults to 300
   */
  duration?: number;
  /**
   * Easing function to apply to the transition
   */
  easing?: string;
  /**
   * Delay before the transition starts in milliseconds
   */
  delay?: number;
}

interface Before<
  Props extends BaseRecord = BaseRecord,
  K extends keyof Props = keyof Props,
  V = Props[K],
> {
  /**
   * Name of the prop to set before the transition starts
   */
  prop: K;
  /**
   * Value the prop to set before the transition starts
   */
  value: V;
}

/**
 * Router Options that can be used at the same time.
 */
interface ConcurrentRouteOpts {
  /**
   * Whether the page navigation should be added to the history stack
   * used when navigating back using `this.$router.back()`
   *
   * @default true
   */
  inHistory?: boolean;
  passFocus?: boolean;
}

/**
 * Route Options that can't be true at the same time
 */
type MutualExclusiveRouteOpts =
  | {
      /**
       * Whether the router should reuse the current page component instance (when matching with the Component
       * specified for the route that we're routing to).
       *
       * @default true
       */
      reuseComponent?: true;
      /**
       * Whether the page should be kept alive when navigating away. Can be useful
       * for a homepage where the state should be fully retained when navigating back
       * from a details page
       *
       * @default false
       */
      keepAlive?: false;
    }
  | {
      /**
       * Whether the router should reuse the current page component instance (when matching with the Component
       * specified for the route that we're routing to).
       *
       * @default true
       */
      reuseComponent?: false;
      /**
       * Whether the page should be kept alive when navigating away. Can be useful
       * for a homepage where the state should be fully retained when navigating back
       * from a details page
       *
       * @default false
       */
      keepAlive?: true;
    };

type RouteOptions = ConcurrentRouteOpts & MutualExclusiveRouteOpts;

interface RouteTransition<Props extends BaseRecord = BaseRecord> {
  /**
   * Setting or Array of Settings before new view enters into the router view
   */
  before: Before<Props> | Before<Props>[];
  /**
   * Transition or Array of Transitions for new view to enters into the router view
   */
  in: Transition<Props> | Transition<Props>[];
  /**
   * Transition or Array of Transitions for old view to leave the router view
   */
  out: Transition<Props> | Transition<Props>[];
}

export type RouteTransitionFunction<Props extends BaseRecord> = (
  previousRoute: Route,
  currentRoute: Route,
) => RequireAtLeastOne<RouteTransition<Props>>;

interface RouteAnnounce {
  /**
   * Message to be announced
   */
  message: string;
  /**
   * Politeness level
   *
   * Defaults to 'off'
   */
  politeness?: "off" | "polite" | "assertive";
}

interface RouteHooks {
  before?: (
    to: Route,
    from: Route,
  ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
  after?: (
    to: Route,
    from: Route,
  ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
}

type ComponentConfigProps = Required<Parameters<Blits["Component"]>[1]["props"]>;

export interface Route<
  Context extends BaseRecord = BaseRecord,
  Data extends BaseRecord = BaseRecord,
  Meta extends BaseRecord = BaseRecord,
  Component extends ReturnType<Blits["Component"]> = ReturnType<Blits["Component"]>,
>  {
  /**
   * URI path for the route
   */
  readonly path: string;
  /**
   * Component to load when activating the route
   */
  readonly component: Component;
  /**
   * Transition configuration for the route
   */
  readonly transition?:
    // TODO: This isn't narrowing in the way I want it to, which is make only the props of the component valid values to "prop" in Transition
    | RequireAtLeastOne<RouteTransition<Component[typeof internal]["props"]>>
    | RouteTransitionFunction<Component[typeof internal]["props"]>;
  /**
   * Extra route options
   */
  readonly options?: RouteOptions;
  /**
   * Message to be announced when visiting the route (often used for accessibility purposes)
   *
   * Can be either a `String` with the message or an object that defines the message and the
   * politeness level
   */
  readonly announce?: string | RouteAnnounce;
  /**
   * Register hooks for the route
   */
  readonly hooks?: ConfigFnsMap<
    Context,
    {
      before?: (
        to: Route,
        from: Route,
      ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
      after?: (
        to: Route,
        from: Route,
      ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
    }
  >;
  /**
   * Route path parameters
   */
  readonly params?: Record<string, string | number>;
  /**
   * Allows for attaching custom data to a route, either hardcoded in the
   * route definition or asigned to the route object in a before hook
   *
   * Will be merged with the route params and navigation data and passed as
   * props into the route component
   */
  readonly data?: Data;

  /**
   * Metadata attached to the route, can be used to add any arbitrary
   * data to a route such as `auth: true/false`, a route ID or route description
   * Note that this data is not reactive and not passed as props to components.
   * The metadata is available in the router `before` or `beforeEach` hooks
   *
   */
  readonly meta?: Meta;
};

export interface RouterConfig<Context extends BaseRecord> {
  /**
   * Register hooks for the router
   */
  hooks?: ConfigFnsMap<
    Context,
    {
      init?: () => Promise<void> | void;
      beforeEach?: (
        to: Route,
        from: Route,
      ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
      afterEach?: (
        to: Route,
        from: Route,
      ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
      error?: (
        err: string,
      ) => string | Route | void | boolean | Promise<string | Route | void | boolean>;
    }
  >;

  /**
   * Routes definition
   *
   * @example
   *
   * ```js
   * routes: [
   *  { path: '/', component: Home },
   *  { path: '/details', component: Details },
   *  { path: '/account', component: Account },
   * ]
   * ```
   */
  routes?: Route<Context>[];

  /**
   * Enable or disable RouterView history navigation on Back input
   *
   * @default true
   *
   * @remarks
   * This is an app-wide setting that affects all RouterView instances in your application.
   * The router state is global and shared across all router instances.
   *
   * @example
   * ```js
   * router: {
   *   backNavigation: false, // Disable automatic back navigation
   *   routes: [...]
   * }
   * ```
   */
  backNavigation?: boolean;
}
