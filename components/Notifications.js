import React, {Component} from 'react';
import {View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { Svg} from 'expo';
import Footer from './bottomtab'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Notifications extends Component {

  static navigationOptions = {
   
  };


 render() {
    return (

<View style = {styles.container}>
<View style = {styles.subcontainer}>
<Image source={require('./../assets/notify.png')}/>

  </View>
  <View style = {styles.bottomContainer}>
  <Footer navigation={this.props.navigation} />
</View>
</View>
    )
  }
}

const styles = StyleSheet.create({
    textCheckin: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 300,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subcontainer:{
    height:hp('91%'),
    width:wp('100%'),
    
  },
  bottomContainer:{
    height:hp('9%'),
    width:wp('100%'),
    backgroundColor:'blue'
  }
});


export default Notifications;