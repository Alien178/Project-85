import * as React from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { Text, StyleSheet, View } from "react-native";
import db from "../config";
import firebase from "firebase";

export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      value: "",
    };
  }

  getNumberOfUnreadNotifications() {
    db.collection("allNotifications")
      .where("notificationStatus", "==", "unread")
      .where("targetedUserID", "==", this.state.userID)
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: unreadNotifications.length,
        });
      });
  }

  bellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#696969"
          size={25}
          onPress={() => {this.props.navigation.navigate("Notifications")}}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      </View>
    );
  };

  componentDidMount() {
    this.getNumberOfUnreadNotifications();
  }

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#696969"
            onPress={() => {
              this.props.navigation.toggleDrawer();
            }}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
        }}
        rightComponent={<this.bellIconWithBadge {...this.props} />}
        backgroundColor="#EAF8FE"
      />
    );
  }
}
