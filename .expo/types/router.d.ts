/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/login` | `/(tabs)` | `/(tabs)/` | `/(tabs)/create` | `/(tabs)/profile` | `/_sitemap` | `/create` | `/login` | `/modal` | `/profile`;
      DynamicRoutes: `/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}` | `/event/${Router.SingleRoutePart<T>}/attendance`;
      DynamicRouteTemplate: `/[id]` | `/event/[id]` | `/event/[id]/attendance`;
    }
  }
}
