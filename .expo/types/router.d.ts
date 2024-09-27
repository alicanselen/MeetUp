/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/two` | `/_sitemap` | `/login` | `/modal` | `/two`;
      DynamicRoutes: `/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/[id]`;
    }
  }
}
