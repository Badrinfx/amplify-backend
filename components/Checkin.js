import React, {Component} from 'react';
//import { ScrollView, TouchableOpacity,Text, StyleSheet,View } from 'react-native';
import { StyleSheet, Text,TextInput, View ,Dimensions,PixelRatio,Button,TouchableOpacity,FlatList} from 'react-native';
import { Constants } from 'expo';
import RadioButton from './RadioButton';
import CheckBox from 'react-native-check-box';
import Footer from './bottomtab';
import API,{graphqlOperation} from '@aws-amplify/api'
import { listCheckInQuestions } from "../src/graphql/queries"
import { CreateMyCustomTypeInput } from '../src/graphql/mutations';
const awsmobile = {
  "aws_project_region": "us-east-2",
  "aws_appsync_graphqlEndpoint": "https://i7wrzuymb5esbb6p7qwz6swyom.appsync-api.us-east-2.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-2",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-kzqgsrjgu5gufp36rji3g667xi",
  "aws_cognito_identity_pool_id": "us-east-2:451c8527-7982-4af9-8f0e-9a56057fe37f",
  "aws_cognito_region": "us-east-2",
  "aws_user_pools_id": "us-east-2_duo5Pt5XZ",
  "aws_user_pools_web_client_id": "141tauve3flbbqjapbksqj5r9l",
  "oauth": {},
  "aws_dynamodb_all_tables_region": "us-east-2",
  "aws_dynamodb_table_schemas": [
      {
          "tableName": "test-table-dream",
          "region": "us-east-2"
      }
  ]
}

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
export default class checkin extends Component {
  constructor(props){ 
      super(props)
      this.state = {answer:[],questions: [], arr:[],open:"",ans:[], isChecked : false}
      this.onViewableItemsChanged.bind(this);
  }

  componentDidMount()
  {
    this.database();
  }


  database = async() => {
    //try {
     const checkinquestions = await API.graphql(graphqlOperation(listCheckInQuestions))
     this.setState({questions:checkinquestions.data.listCheckInQuestions.items})
     console.log("chkins: " + JSON.stringify(checkinquestions))
     //this.setState({ checkinquestions : checkinquestions.items })
    //}  
    //catch (err) {
     //console.log("error: " + err)
    //}
  }

  onClick = (selectedobj) =>
  {
    //console.log(selectedobj);
    this.state.ans.push(selectedobj);
    console.log(this.state.ans);
    this.addAnswer(answer);

  }
  addAnswer = async (answer) => {
    //alert(dream.dreamtitle) 
    const ddate = moment(date) 
    const {uuid,qid,qval} = answer;
    console.log(ddate+"dd")    
    let input ={
      uuid:answer.uuid,
      questionNo:answer.qid,
      answerValue:answer.qval,
      answerDate:ddate,
      }
    const result1 = await API.graphql(graphqlOperation(CreateMyCustomTypeInput, { input }))    
  }  

  answerType =(item)=>
  {
      console.log(JSON.stringify(item) + "gggg");
      if(item.answerOption=="list")
      {
          let opt = item.answerValue.split(",");
          //let optcolor = item.optionscolor.split(",");
          return opt.map((obj,idx) =>
          {              
            if(obj)
            {
              console.log(obj+"s");
              return(
                <View key={"a"+item.questionNo + idx}>
                <TouchableOpacity  style={chkinsstyles.chkins_button} activeOpacity= {0.5} type='Button' onPress={() => {
                                                                        this.onClick({uuid:item.uuid,qid: item.questionNo, qval : obj});
                                                                        }} >
                    <Text style={{fontSize:18,fontFamily:'Roboto',textAlignVertical:'center'}}>{obj}</Text>
                </TouchableOpacity>              
                </View>
              )
            }
          });
      }
      if(item.answerOption =="RadioButton")
      {
        let opts = item.answerValue.split(",");
        let radiooptions = [];
        for(var i =0; i < opts.length; i++)
        {
          radiooptions.push({uuid:item.uuid,qid: item.questionNo, key: opts[i], text : opts[i]});
          //console.log({qid: item.questionNo, key: opts[i], text : opts[i]});
        }
        return(
              <View key={"r"+item.questionNo}>
                <RadioButton options={radiooptions} callback={this.onClick}  />
              </View>
              )
      }
      if(item.answerOption =="CheckBox")
      {
        let opt = item.answerValue.split(",");
          return opt.map((obj,idx) =>
          {              
            if(obj)
            {
              console.log(obj+"s");            
              return(
                  <View key={"r"+idx}>
                    <CheckBox key={"c"+idx} id={idx}
                       style={{padding:10,alignItems:'flex-start',justifyContent:'flex-start'}}
                       onClick={()=>{
                       this.setState({isChecked:!this.state.isChecked});
                       this.onClick({uuid:item.uuid,qid: item.questionNo, qval : this.state.isChecked})              
                     }}
                       isChecked={this.state.isChecked}
                       rightText={obj}
                       rightTextStyle={{textAlign:'left',color:'#000f55',fontFamily:'Roboto',fontWeight:'normal',fontSize:18}}
                     />
                  </View>
              )
            }            
          })
      }
      if(item.answerOption =="openended")
      {
          return(
          <View key={"b"+item.questionNo}>
              <TextInput 
                style = {chkinsstyles.chkins_openInput}
                placeholder ='Type here'
                onChangeText ={text => this.onClick({uuid:item.uuid, qid:item.questionNo,qval:text })}
                placeholderTextColor = '#878681'
                maxLength={50}                />
          </View>
          )
      }

  }

  _renderItem = ({item,index}) => {
    console.log("redner" + index);
      return (
          <View key={"q"+item.uuid} style ={chkinsstyles.chkins_viewbox}>
          <TextInput  key={'k'+item.uuid} style={{fontSize:18,color:'black',lineHeight:25,}}  multiline={true} > {item.questionDescription}</TextInput>
          {/* <Text key={'l'+item.questionNo} style={{marginTop:20,fontSize:16,color:'black'}} > {item.answerValue}</Text> */}
          <TouchableOpacity style={{margin:20}}>{this.answerType(item)}</TouchableOpacity>
          <Text key={'l'+item.uuid} style={{textAlign:'right',textAlignVertical:'bottom',alignItems:'baseline',justifyContent:'flex-end'}} >{index+1}/ {this.state.questions.length}</Text> 

          </View>
      )};
       //pressed an item
onPressItem = (item) => console.log("onPressItem:item ",item);

//map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
_keyExtractor = (item, index) => item.uuid;

onViewableItemsChanged = ({ viewableItems, changed }) =>this.setState({viewableItems})
/*
// REQUIRED for ReactNativePagination to work correctly
onViewableItemsChanged = ({ viewableItems }) => {
  //console.log("viewable items\r\n");
  //console.log('viewableItems', viewableItems)

}
*/

  render()
  {
    if(this.state.questions.length <= 0)
    {
        return(<>
        </>)
    }
    else{
      return(
      <View style={chkinsstyles.chkins_container}>
      <View style = {styles.subcontainer}>

      <View style={chkinsstyles.statusBar} />

          <View style={chkinsstyles.chkins_title}> 
           <Text style={chkinsstyles.chkins_titleText}>
             Check-in
           </Text>
          </View> 
      <View style={chkinsstyles.chkins_box}> 
        <FlatList
          data={this.state.questions}
          ref={r=>this.refs=r}//create refrence point to enable scrolling
          keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
          renderItem={this._renderItem}//render each item
          onViewableItemsChanged={this.onViewableItemsChanged}
          horizontal={true}
          pagingEnabled
        />
        </View>
     </View>
     <View style = {styles.bottomContainer}>
        <Footer navigation={this.props.navigation} />
     </View>
    </View>
  );
  }
  }
} 
chkinsstyles = StyleSheet.create({

  chkins_container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chkins_title:{

      width: widthPercentageToDP('100%'),
      height: heightPercentageToDP('10%'),
      backgroundColor:'white',
  },
  chkins_titleText:{
      fontSize:24,
      fontFamily:'Roboto',
      color:'black',
      textAlign:'left',
      textAlignVertical:'center',
      marginHorizontal:10,
      marginTop:30,
  },
  chkins_box:{
  
      backgroundColor:"#F4F5F7",
      height:heightPercentageToDP('60%'),
      width:widthPercentageToDP('92%'),
      margin:('4%'),
  },
  chkins_viewbox:{
      flexDirection:'column',
      marginHorizontal:20,
      marginTop:25,
      textAlignVertical:'center',
      justifyContent:'center',
      width:widthPercentageToDP('90%'),
      height:heightPercentageToDP('60%'),
      marginHorizontal:widthPercentageToDP('1%'),
      padding:15,
  },
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
    chkins_button:{
        backgroundColor:'#4ee44e',
        borderRadius:4,
        height:heightPercentageToDP('5%'),
        width:widthPercentageToDP('50%'),
        margin:8,
        padding:5,
  },
  chkins_openInput:{
     fontFamily:'Roboto',
     fontSize:18,
     textAlignVertical:'center',
     justifyContent:'center',
  },
  subcontainer:{
    zIndex:1,
    height:heightPercentageToDP('91%'),
    width:widthPercentageToDP('100%'),
  },
  bottomContainer:{
    zIndex:1,
    height:heightPercentageToDP('9%'),
    width:widthPercentageToDP('100%'),
    
  },
});  
