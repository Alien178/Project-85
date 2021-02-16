import * as React from "react";
import MyHeader from "../components/MyHeader";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { ListItem, Card, Header, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class ReceiverDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      receiverID: this.props.navigation.getParam("details")["userID"],
      requestID: this.props.navigation.getParam("details")["requestID"],
      bookName: this.props.navigation.getParam("details")["bookName"],
      reasonToRequest: this.props.navigation.getParam("details")[
        "reasonToRequest"
      ],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocID: "",
      userName: "",
    };
  }

  getReceiverDetails = () => {
    db.collection("users")
      .where("emailID", "==", this.state.receiverID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            receiverName: data.firstName,
            receiverContact: data.contact,
            receiverAddress: data.address,
          });
        });
      });

    db.collection("requestedBooks")
      .where("requestID", "==", this.state.requestID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            receiverRequestDocID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userID);
  }

  updateBookStatus = () => {
    db.collection("allDonations").add({
      bookName: this.state.bookName,
      requestID: this.state.requestID,
      requestedBy: this.state.receiverName,
      donorID: this.state.userID,
      requestStatus: "Donor Interested",
    });
  };

  addNotification = () => {
    var messages = this.state.userName + "has shown interest donating the book";
    db.collection("allNotifications").add({
      targetedUserID: this.state.receiverID,
      donorID: this.state.userID,
      requestID: this.state.requestID,
      bookName: this.state.bookName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notificationStatus: "unread",
      message: messages,
    });
  };

  getUserDetails = (userID) => {
    db.collection("users")
      .where("emailID", "==", userID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().firstName + " " + doc.data().lastName,
          });
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name={"arrow-left"}
                type={"feather"}
                color={"#696969"}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              ></Icon>
            }
            centerComponent={{
              text: "Donate Books",
              style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor={"#EAF8FE"}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Book Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Book Name: {this.state.bookName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Reason: {this.state.reasonToRequest}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Receiver Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Contact: {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverID != this.state.userID ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBookStatus();
                this.addNotification();
                this.props.navigation.navigate("MyDonations");
              }}
            >
              <Text>Donate Book</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});
