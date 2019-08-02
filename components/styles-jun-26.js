//Sprint 1 Code
import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  // height: Platform.OS === 'android' ? 200 : 100,
    container: {
      flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    
    registerInput:{
      //width: Dimensions.get('window').width-55,
      //height: 45,
      //borderRadius: 0,
      fontSize: 24,
      //paddingLeft: 45,
      backgroundColor: 'rgba(255,255,255,255)',
      color: 'black',
      marginHorizontal: 17,
      alignItems: 'center',
      //marginTop:20,
      width: wp('90%'),
      height: hp('10%'),
      //borderWidth: 1,
      //borderColor: 'orange',
      flexDirection: 'row',
      justifyContent: 'space-around',
      //borderWidth: 1,
      //borderColor: 'black',
      //flex:2
      
    },
    registerInput1:{
      //width: Dimensions.get('window').width-55,
      //height: 45,
      //borderRadius: 0,
      fontSize: 24,
      //paddingLeft: 45,
      backgroundColor: 'rgba(255,255,255,255)',
      color: 'black',
      marginHorizontal: -25,
      alignItems: 'center',
      //marginTop:20,
      width: wp('90%'),
      height: hp('10%'),
      //borderWidth: 1,
      //borderColor: 'orange',
      flexDirection: 'row',
      justifyContent: 'space-around',
      //borderWidth: 1,
      //borderColor: 'black',
      //flex:2
    //  margin: -3,
    top:-18,
      
    },
    
    
    textAreaInput:{
      //width: Dimensions.get('window').width-100,
      //height: 100,
      //color: '#FF0000',
      borderRadius: 4,
      fontSize: 12,
      textAlign:'justify',
      textAlignVertical: "top",
      //paddingLeft: 45,
      backgroundColor: '#F4F5F7',
      color: '#000000',
      marginHorizontal:17,
      alignItems: 'center',
      margin: 20,
      width: wp('90%'),
      height: hp('50%'),
      borderWidth: 1,
      borderColor: '#d3d3d3',
      flexDirection: 'row',
      justifyContent: 'space-around',
      shadowOpacity: 0.8,

      //flex:6
    },
  
    bottomView:{
      width: wp('20%'),
      height: hp('5%'),
      margin:20,
     // borderWidth: 1,
      //borderColor: 'black',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal:265,
      fontSize:12,
      //marginTop:230,
      backgroundColor:'#1E90FF',
      //justifyContent:'center',
      alignItems: 'center',
      //position: 'absolute',
            bottom: -125,
      borderRadius: 8
    
    },
    
    text:{
      color: '#ffffff',
      fontSize: 12,
      textAlign: 'center',
      paddingLeft : -50,
paddingRight : -50,
    
    },
   // Woke: {
   // bottom:-85,
    //marginTop:-80,
    //margin:10,
    //right:-50,
    //marginHorizontal:90,
    //textAlign:'center',
    //margin:1
  // }, 
  //woke text alignment
   Woke1: {
    
    //  marginHorizontal:60,
    //  textAlign:'center',
    //  marginTop:1
    marginHorizontal:100,
     textAlign:'center',
     justifyContent: 'flex-end',
     margin:10,
    //  bottom:-5,
     left:-10,
     top:-1,
    }, 
   
   shareable: {
    
      //  marginHorizontal:60,
      //  textAlign:'center',
      //  marginTop:1
      marginHorizontal:-10,
       textAlign:'center',
       justifyContent: 'flex-end',
       margin:10,
       bottom:-17,
      //  right:-2,
       left:-80,
      }, 

  /* container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },*/
   edit_text:
   {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'left',
 marginHorizontal:-80

   },
  // Specify theme properties to override specific styles for calendar parts. Default = {}
 /* theme:
  {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    monthTextColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textMonthFontWeight: 'bold',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
  },*/
   input: {
       //marginTop:20,
       height: hp('5%'),
       marginHorizontal:-60,
       
       backgroundColor: '#ffffff',
       borderColor:'#bdbdbd',
       color:'blue',
       width: wp('50%'),
       paddingLeft: 20,
       borderBottomWidth: 2,
       
       //paddingTop:10,
       shadowColor: "#bdbdbd",

       shadowOpacity: 5
       },
       
   
      //  edit_input: {
      //   marginTop:100,
       
      //   marginHorizontal:25,
        
      //   backgroundColor: '#ffffff',
      //   borderColor:'#bdbdbd',
      //   color:'blue',
        
     
      //   shadowColor: "#bdbdbd",
      //   borderBottomWidth:1,
      //   height:70,
      //   width:350,
        
 
        
      //   },
    

        edit_BackButton: {
          backgroundColor: '#1E90FF',
          width: 120,
          
          //  height: 40,
          //width: 90,
          //height: 30,
          color:'#FFFFFF',
           //borderRadius: 8,
           //paddingRight: 50,
           //position: 'absolute',
           //marginTop: 500,
          //marginLeft: 40,
          fontSize: 20,
        //left: -15
         
       },         
       edit_SaveButton: {
        backgroundColor: '#1E90FF',
       //width: 90,
       //color:'#FFFFFF',
        //height: 30,
        //borderRadius: 8,
        //paddingRight: 50,
        //position: 'absolute',
        //marginTop: 500,
//          marginRight: 40,
         //fontSize: 20,                                      
       //right: -15
      },        

 
        
      
        BackButton: {
          backgroundColor: '#1E90FF',
          // width: 120,
         
          //  height: 40,
          width: wp('25%'),
          height: hp('4%'),
          color:'#FFFFFF',
           borderRadius: 8,
          // paddingRight: 50,
          // position: 'absolute',
              marginHorizontal:-7,
              margin:20,
          //marginLeft: 40,
          //fontSize: 15,
        //left: -15
        fontSize: 12,
        textAlign: 'center',
        justifyContent:'center',
        bottom:-19,
          
       },         
   
       SaveButton: {
        backgroundColor: '#1E90FF',
        width: wp('25%'),
        height: hp('4%'),
        //color:'#FFFFFF',
         borderRadius: 8,
          //paddingRight: 50,
        position: 'absolute',
        marginHorizontal: 135,
        margin:20,
        // textAlign: 'center',
        justifyContent:'center',

          //marginRight: 40,
         //fontSize: 20,                                      
       //right: -15
       bottom:-52,
      },        
      SaveButtonText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 12,

      },
     
            
    
       /* SaveButton: {
         backgroundColor: '#1E90FF',
         width: wp('20%'),
         height: hp('5%'),
         margin:20,
         marginHorizontal:150,
         color:'#FFFFFF',
          borderRadius: 8,
           paddingRight: 50,
         position: 'absolute',
         
         alignItems: 'center',
         textAlign:'center',
         bottom: -39,
         flexDirection: 'row',
         justifyContent: 'space-around',
         right:30,
         
       },        
       SaveButtonText:{
         textAlign: 'center',
         //color: '#ffffff',
         fontSize: 12,

       },
       Button: {
        width: 30, 
        height: 30, 
        // position:'absolute',
        // marginTop: -50,
        marginHorizontal: 10, 
        bottom:-15,
        padding:-5,
        
        
        
         },*/

      }
    );
