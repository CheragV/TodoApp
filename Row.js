import React,{Component} from 'react';
import { View, Text , Switch , StyleSheet } from 'react-native';


class Row extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      switchOn: true,
      sty:'none'
    };
  }
  swap(value){
    this.setState({
      switchOn: !this.state.switchOn,
      sty:this.state.switchOn?'line-through':'none'
      });
  }
  render(){
    console.log(this.state)
    return(
      <View style={styles.rowView}>
        <Text
            style={{fontFamily:"Verdana",
            textAlign:"center",
            textDecorationColor : 'black',
            textDecorationStyle:'solid',
            textDecorationLine:this.state.sty,
            flex:3
          }}
            >{this.props.txt}</Text>
        <Switch
          onValueChange={() => {this.swap()}}
          style={{marginBottom: 0}}
          value={this.state.switchOn}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  rowView:{flexDirection:"row",alignItems:"center",justifyContent:"center",height:45},
});


module.exports= Row
