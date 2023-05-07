import { RouteProp } from '@react-navigation/native';
import {
  NavigationScreens,
  RouteStackParams,
} from '../navigation/Navigation.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type routeProps = RouteProp<
  RouteStackParams,
  NavigationScreens.DETAIL_SCREEN
>;
export type navigationProps = NativeStackNavigationProp<
  RouteStackParams,
  NavigationScreens
>;

export type Props = {
  navigation: navigationProps;
  route: routeProps;
};
