/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  ListView,
  TouchableOpacity,
  TextInput,
  AppRegistry,
  RecyclerViewBackedScrollView,
  StyleSheet,
  ScrollView,
  SegmentedControlIOS,
  Text,
  View
} from 'react-native';
import Row from './Row.js';

let arr = [];
let count = 1;
class TodoApp extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      selectedIndex: 0,
      text: "",
      dataSource: dataSource.cloneWithRows(arr)
    };

  }
  onAdd() {
    if (this.state.text.length > 0) {
      arr.push({
        word: this.state.text,
        state: true,
        id: count
      });
      count = count + 1;
      this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        text: "",
        dataSource: this.dataSource.cloneWithRows(arr)
      });
    }
  }
  renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator} key={sectionID + rowID}/>
    );
  }

  updateRow(value, id) {
    for (i in arr) {
      if (arr[i].id === id) {
        arr[i].state = value;
      }
    }
    this.setState({
      dataSource: this.dataSource.cloneWithRows(arr)
    });
    console.log("row updated")
  }
  renderNewList() {
    console.log("called")
    var dataClone =[];
    for (var i in arr) {
      console.log(arr[i].state == this.state.selectedIndex)
      if (arr[i].state == this.state.selectedIndex)
        dataClone.push(arr[i]);
    }
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: this.dataSource.cloneWithRows(dataClone)
    });
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>

        <View style={styles.textEntry}>
          <TextInput
            ref="input"
            style={styles.inputText}
            placeholder="Enter Text"
            onChangeText={(text) => this.setState({ text }) }
            value={this.state.text}
            onSubmitEditing={() => {
              this.onAdd();
            } }
            blurOnSubmit={false}
            />
          <TouchableOpacity  style={styles.addButton}>
            <Text onPress={() => this.onAdd() } style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        </View>

        <View  style={{ flex: 9, paddingTop: 0, backgroundColor: "#fff" }}>
          <View style={{ flex: 7, borderWidth: 0, height: 430, backgroundColor: "#fff" }}>
            <ListView
              style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <Row onChange ={(value, id) => this.updateRow(value, id) } row={rowData}/>}
              renderHeader={() => <Header />}
              renderSeparator={this.renderSeparator}
              enableEmptySections={true}
              scrollEnabled={true}
              />
          </View>
          <View style={{ flex: 2 }}>
            <SegmentedControlIOS
              enable={true}
              values={['InComplete', 'Completed']}
              selectedIndex={this.state.selectedIndex}
              
              onChange={(event) => {
                this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
                console.log("HI");
                this.renderNewList();
              } }
              />
          </View>
        </View>
      </View>

    );
  }
}
const Header = (props) => (
  <View style={styles.container}>
    <Text style={{ textDecorationStyle: "solid" }}>
      LIST
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },

  inputText: {
    height: 40,
    borderColor: 'gray', borderWidth: 2, flex: 3, alignItems: "center", paddingLeft: 15
  },
  addButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2, flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listView: {
    borderWidth: 2,
    borderColor: "#F5FCFF"
  },
  addText: {
    fontSize: 25,
    color: "#4682b4"
  },
  textEntry: {
    padding: 20,
    flexDirection: "row",
    flex: 1,
    paddingBottom: 10
  },
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
