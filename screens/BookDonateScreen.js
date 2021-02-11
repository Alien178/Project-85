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

export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedBooksList: [],
    };
    this.requestRef = null;
  }

  getRequestedBooksList = () => {
    this.requestRef = db.collection("requestedBooks").onSnapshot((Snapshot) => {
      var requestedBooksList = Snapshot.docs.map((document) => document.data());
      this.setState({
        requestedBooksList: requestedBooksList,
      });
    });
  };

  componentDidMount() {
    this.getRequestedBooksList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.bookName}</ListItem.Title>
          <ListItem.Subtitle>{item.reasonToRequest}</ListItem.Subtitle>
          <TouchableOpacity style={styles.button} onPress = {() => {this.props.navigation.navigate("ReceiverDetails", {"details": item})}}>
            <Text style={{ color: "#FFFFFF" }}>View</Text>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Donate Book"} navigation={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          {this.state.requestedBooksList.length == 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Requested Books</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.requestedBooksList}
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
