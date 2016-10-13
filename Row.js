import React, {Component} from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';


class Row extends React.Component {
  constructor(props) {
    super(props);
  }
  swap(value,id) {
    this.props.onChange(value,id)
  }
  render() {
    return (
      <View style={styles.rowView}>
        <Text
          style={{
            fontFamily: "Verdana",
            textAlign: "center",
            textDecorationColor: 'black',
            textDecorationStyle: 'solid',
            textDecorationLine: this.props.row.state ? 'none' : 'line-through',
            flex: 3
          }}
          >{this.props.row.word}</Text>
        <Switch
          onValueChange={(value) => { this.swap(value,this.props.row.id) } }
          style={{ marginBottom: 0 }}
          value={this.props.row.state}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rowView: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 45 },
});


module.exports = Row
