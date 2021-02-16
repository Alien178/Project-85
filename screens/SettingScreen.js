import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      firstName: "",
      lastName: "",
      contact: "",
      address: "",
      docID: "",
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("emailID", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailID: data.emailID,
            firstName: data.firstName,
            lastName: data.lastName,
            contact: data.contact,
            address: data.address,
            docID: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docID).update({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
    });
    Alert.alert("Profile Updated!!");
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={styles.profileContainer}>
        <MyHeader title="Settings" navigation={this.props.navigation}/>
        <View style={styles.container}>
          <TextInput
            style={styles.formTextInput}
            placeholder="First Name"
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder="Last Name"
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder="Contact"
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.formTextInput}
            placeholder="Address"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          ></TextInput>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 65,
    fontWeight: "300",
    paddingBottom: 10,
    color: "#ff3d00",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    marginTop: 50,
  },
  buttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  },
});
