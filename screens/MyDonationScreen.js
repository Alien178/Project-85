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
import { ListItem } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class MyDonationScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          allDonations: [],
          userID: firebase.auth().currentUser.email
        };
        this.requestRef = null;
      }

      getAllDonations = () => {
        this.requestRef = db.collection("allDonations").onSnapshot((Snapshot) => {
          var allDonations = Snapshot.docs.map((document) => document.data());
          this.setState({
            allDonations: allDonations,
          });
        });
      };
    
      componentDidMount() {
        this.getAllDonations();
      }
    
      componentWillUnmount() {
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString();
    
      renderItem = ({ item, index }) => {
        return (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.bookName}</ListItem.Title>
              <ListItem.Subtitle>{"Requested By: " + item.requestedBy + "\nStatus: " + item.requestStatus}</ListItem.Subtitle>
              <TouchableOpacity style={styles.button}>
                <Text style={{ color: "#FFFFFF" }}>Send Book</Text>
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem>
        );
      };

      render() {
        return (
          <View style={{ flex: 1 }}>
            <MyHeader title={"My Donations"} />
            <View style={{ flex: 1 }}>
              {this.state.allDonations.length == 0 ? (
                <View style={styles.subContainer}>
                  <Text style={{ fontSize: 20 }}>List Of All Book Donations</Text>
                </View>
              ) : (
                <FlatList
                  data={this.state.allDonations}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                ></FlatList>
              )}
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    subContainer: {
      flex: 1,
      fontSize: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: 100,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ff5722",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
    },
  });