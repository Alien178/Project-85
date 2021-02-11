import * as React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";

export default class CustomSideBarMenu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.6, marginTop: 40, }}>
          <DrawerItems {...this.props}></DrawerItems>
        </View>
        <View
          style={{ flex: 0.4, justifyContent: "flex-end", paddingBottom: 50, alignItems: "center", }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: "50%",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "#8C0303",
              borderColor: "#400101",
              borderWidth: 4,
              borderRadius: 5,
            }}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
