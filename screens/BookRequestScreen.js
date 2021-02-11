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
import db from "../config";
import firebase from "firebase";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
    };
  }

  createUniqueID() {
      return Math.random().toString(36).substring(7)
  }

  addRequest = (bookName, reasonToRequest) => {
    var userID = this.state.userID;
    var randomRequestID = this.createUniqueID();
    db.collection("requestedBooks").add({
        userID: userID,
        bookName: bookName,
        reasonToRequest: reasonToRequest,
        requestID: randomRequestID
    })
    this.setState({
        userID: firebase.auth().currentUser.email,
        bookName: "",
        reasonToRequest: "",
    })
    Alert.alert("Book Request Successfull")
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Request Book"} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Book Name"}
            onChangeText={(text) => {
              this.setState({ bookName: text });
            }}
            value={this.state.bookName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300, textAlignVertical: "top" }]}
            placeholder={"Enter your Reason"}
            onChangeText={(text) => {
              this.setState({ reasonToRequest: text });
            }}
            value={this.state.reasonToRequest}
            multiline
            numberOfLines={8}
            maxLength={594}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}
>
            <Text>Request Book</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
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
});
