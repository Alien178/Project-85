import * as React from "react";
import { Image } from "react-native";
import BookDonateScreen from "../screens/BookDonateScreen";
import BookRequestScreen from "../screens/BookRequestScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppStackNavigator } from "./AppStackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  DonateBook: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/donate.png")}
          style={{ width: 20, height: 20 }}
        ></Image>
      ),
      tabBarLabel: "Donate Books",
    },
  },
  RequestBook: {
    screen: BookRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request.png")}
          style={{ width: 20, height: 20 }}
        ></Image>
      ),
      tabBarLabel: "Request Books",
    },
  },
});
