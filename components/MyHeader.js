import * as React from "react";
import { Header } from "react-native-elements";

const MyHeader = props => {
    return <Header centerComponent = {{text: props.title, style: {color: "#90A5A9", fontWeight: "bold", fontSize: 20}}} backgroundColor = {"#EAF8FE"}/>
} 

export default MyHeader;