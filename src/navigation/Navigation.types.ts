import { Movie } from '../model/movie';

export enum NavigationScreens {
  HOME_SCREEN = 'HomeScreem',
  DETAIL_SCREEN = 'DetailScreen',
}

export type RouteStackParams = {
  [NavigationScreens.HOME_SCREEN]: undefined;
  [NavigationScreens.DETAIL_SCREEN]: { movie: Movie };
};
