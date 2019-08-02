import React,{ Component} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Alert, AsyncStorage,StyleSheet, Text, View, TextInput, TouchableHighlight,TouchableOpacity,Pagination ,Image,Keyboard,Button,Modal} from 'react-native';
import {EvilIcons as Icon} from 'react-native-vector-icons';
import {NavigationEvents} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Svg,Constants} from 'expo';
import KeyboardShift from './KeyboardShift';


import { FileSystem } from 'expo';
import moment from 'moment';
import Util from './utility.js';
import CountryStateCity from 'country-state-city';
import Amplify,{Storage} from 'aws-amplify'
import API,{graphqlOperation} from '@aws-amplify/api'
import awsmobile from '../aws-exports'
import { createDreams } from "../src/graphql/mutations"
import { listDreamss } from "../src/graphql/queries"



Amplify.configure(awsmobile)


export default class App extends React.Component {
    _mounted = false;
    static navigationOptions = {
      //title: 'Screen1',
    };
    constructor(props){
           super(props)
           this.state = {dreams:[],result:[],title: "", desc :"",textBgColor: '#F4F5F6',textColor:'#000000',compvalcalled : false,text:"" ,Category:"",maxfilelength: 1, editMode : true,sampleText:"Save",fid:0,existingfid:false ,isDreamPrivate:"false"}
           this.onSave = this.onSave.bind(this);
           this.onEdit = this.onEdit.bind(this);
           allCountries = CountryStateCity.getAllCountries();
           countrystates = CountryStateCity.getStatesOfCountry();
           this._mounted = true;
        }
    setModalVisible = (visible) => 
     {
       this.setState({modalVisible: visible});
     }
    //Svg Emojis added
    setCompVal = () =>
    {
      if(!this.state.compvalcalled)
       {
        AsyncStorage.getItem('Menu').then((val) =>
         { 
          if (val == "AddDream")         
           {
            this.setState({editMode : true});
            AsyncStorage.setItem('Menu', "");
            AsyncStorage.setItem("EmojiStatus", "");
            AsyncStorage.setItem('Category1', "");
            AsyncStorage.setItem('Dated', moment(new Date()).format('DD MMMM YYYY').toString());
            AsyncStorage.setItem("country","231")
            AsyncStorage.setItem("state","3956");
            AsyncStorage.setItem('city', "");
            AsyncStorage.setItem('isDreamPrivate',"false");
            this.clear();
            this.setState({fid:0});
            this.setState({existingfid: true});
            }
          else if(val == "List")
            {
             Util.readjson().then((result) => 
              {
               AsyncStorage.getItem('country').then((value) => this.setState({ selectedCountry: value }))
               AsyncStorage.getItem('Dated').then((value) => this.setState({ selectedStartDate: value }))
               AsyncStorage.getItem('state').then((value) => {this.setState({ selectedState: value })
               console.log(value)
                })
               AsyncStorage.getItem('city').then((value) => {this.setState({ City: value })
               console.log(value+"fff")})
               AsyncStorage.getItem('Category1').then((value) =>
                { 
                 this.setState({ selectedValue: value })
                 console.log(value+"iiii")
                })
               AsyncStorage.getItem('isDreamPrivate').then((value) =>{this.setState({isDreamPrivate:value})})
               AsyncStorage.getItem('editMode').then((value) => {
               if(value == 'true')
               this.setState({ editMode: true });
               else
               this.setState({editMode:false});
                })
               var filearray = result.split("||");
               this.setState({maxfilelength : filearray.length+1});
               console.log(this.state.maxfilelength + 'length1');
               AsyncStorage.setItem('maxfilelength', (filearray.length+1).toString());
               AsyncStorage.getItem('fid').then((val) =>{
               console.log(val + "val");
               this.setState({existingfid: true});
               this.setState({fid : (val ? val : 1)});  
               console.log('settt'+val);              
               var t = Util.getFileobj(filearray, val);                
               if(t.dreamtitle)
                {
                  this.setState({ title: t.dreamtitle ,TextInputValue: t.descr,EmojiStatus: t.emoji ,angryimg: "",sadimg: "",calmimg: "",happyimg: ""});
                  if(t.emoji=='angry')
                  this.setState({angryimg:'highlight'})
                  else if(t.emoji=='sad')
                  this.setState({sadimg:'highlight1'})
                  else if(t.emoji=='calm')
                  this.setState({calmimg:'highlight2'})
                  else if(t.emoji=='happy')
                  this.setState({happyimg:'highlight3'})
                  AsyncStorage.getItem('EmojiStatus').then((value) =>{
                  if(value)
                   {
                    this.setState({ EmojiStatus: value });
                    console.log("emoji edited");
                    this.setState ({angryimg : ""})
                    this.setState ({sadimg : ""})
                    this.setState ({calmimg : ""})
                    this.setState ({happyimg : ""})
                    if( this.state.EmojiStatus === "angry")
                    this.setState ({angryimg : 'highlight'})
                    else if( this.state.EmojiStatus === "sad")
                    {
                     this.setState ({sadimg : 'highlight1'})  
                    }      
                    else if( this.state.EmojiStatus === "calm")
                    {
                    this.setState ({calmimg : 'highlight2'})  
                    }        
                    else if( this.state.EmojiStatus === "happy")
                    {
                    this.setState ({happyimg : 'highlight3'})  
                    }         
                   }       
                });

                this.setState({selectedCountry:t.country,selectedState:t.state,City:t.city,Category:t.category,selectedStartDate:t.dated});
                countrystates = CountryStateCity.getStatesOfCountry(t.country);
                this.setState({CountryStates: countrystates,selectedState:t.state,isDreamPrivate:t.isDreamPrivate});               
              }
            });
         });
            
        }
        else
        {
         AsyncStorage.getItem('Dated').then((value) => this.setState({ selectedStartDate: value }))
         AsyncStorage.getItem('Category1').then((value) => 
          {
          this.setState({ Category: value })
          console.log(value+'sss')
          })
          AsyncStorage.getItem('country').then((value) => this.setState({ selectedCountry: value }))
          AsyncStorage.getItem('state').then((value) => this.setState({ selectedState: value }))
          AsyncStorage.getItem('city').then((value) => {this.setState({ City: value })})
          AsyncStorage.getItem('isDreamPrivate').then((value) =>{this.setState({isDreamPrivate:value})})
          AsyncStorage.getItem('EmojiStatus').then((value) => 
          {
            this.setState({ EmojiStatus: value });
            console.log("ssssssss");
            this.setState ({angryimg : ""})
            this.setState ({sadimg : ""})
            this.setState ({calmimg : ""})
            this.setState ({happyimg : ""})
            if( this.state.EmojiStatus === "angry")
            this.setState ({angryimg : 'highlight'})
            else if( this.state.EmojiStatus === "sad")
            {
              this.setState ({sadimg : 'highlight1'})  
            }      
            else if( this.state.EmojiStatus === "calm")
            {
              this.setState ({calmimg : 'highlight2'})  
            }        
            else if( this.state.EmojiStatus === "happy")
            {
              this.setState ({happyimg : 'highlight3'})  
            }          
          });
         }
        });
      }
    }

    async fnclear()
    {
      AsyncStorage.setItem("Title", "");
      AsyncStorage.setItem("EmojiStatus", "");
      AsyncStorage.setItem("Dated", moment(new Date()).format('DD MMMM YYYY').toString());
      AsyncStorage.setItem("Category1", "");
      AsyncStorage.setItem("TextInputValue", "");
      AsyncStorage.setItem("country", "231");
      AsyncStorage.setItem("state","3956");
      AsyncStorage.setItem('city', "");
      AsyncStorage.setItem('isDreamPrivate',"false");
      await AsyncStorage.setItem('editMode','');
      await AsyncStorage.setItem("Menu", "");
    }
   async database(){
     try {
      const dreams = await API.graphql(graphqlOperation(listDreamss))
      console.log("dreams: ", dreams)
      this.setState({ dreams: dreams.data.listDreamss.items })
     }  
 catch (err) {
      console.log("error: ", err)
     }}
componentDidMount() 
 {
 this.fnclear();
 }

 onEnterText = (TextInputValue) =>
  {
    var TextLength = TextInputValue.length.toString() ;
    if(TextInputValue.length > 1024 )
     {
        alert("Character limit Exceeded");
        return;
     }
       this.setState({TextInputValue : TextInputValue});
       AsyncStorage.setItem("TextInputValue", TextInputValue);
     }
 async savefile()
  {
    filename = FileSystem.documentDirectory + "dream" + ".json";
    //let result;
    try{
      result = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dream" + ".json", { encoding: FileSystem.EncodingTypes.UTF8 });
      //console.log("set"+result);
      //result = "";
      
      if(this.state.fid == 0)
        {
        console.log(result+"wait")
        let filearray = result.split("||");
        this.setState({fid : (result=="" ? 1: this.getMaxfid(filearray) )}); 
        }
       }
    catch(e)
      {
        result = "";
        this.setState({fid : 1}); 
        console.log(e);
       }
      console.log("saving" + this.state.fid);
      let countryobj = CountryStateCity.getCountryById(this.state.selectedCountry);
      let stateobj = CountryStateCity.getStateById(this.state.selectedState);
      let dreamtitleval = {dreamtitle :  this.state.title, emoji : this.state.EmojiStatus,dated:this.state.selectedStartDate,
        category:this.state.Category, fid: this.state.fid.toString(),descr:this.state.TextInputValue,country:this.state.selectedCountry,
        state:this.state.selectedState,city:this.state.City,isDreamPrivate:(this.state.isDreamPrivate ? "true" : "false"),countryName:countryobj.name,stateName:stateobj.name, 
        IsDeleted : "false"};
        console.log("saving" + dreamtitleval);
      if(this.state.fid == 1 && !this.state.existingfid)
        {
        //console.log("mmm"+result);
         if(result=="")      
          dreamtitleval = JSON.stringify(dreamtitleval) //first time add dream
        }
      else
       {
        bfound = false;
        let filearray = result ? result.split("||") : [];
        console.log("multi"+filearray);
   
        for(var i=0; i< filearray.length; i++)
        {
          var j=filearray[i];
          console.log(j+'file')
          if( j!="" && j !='undefined' )
          {
            j = JSON.parse(filearray[i])
            if(j.fid == this.state.fid)
            {
              console.log("edit"+this.state.fid)
              filearray[i] = JSON.stringify(dreamtitleval); //edit dream
              console.log("read" + JSON.stringify(dreamtitleval));
              bfound = true;
              break;    
            }
          }  
        }          
        if(!bfound){
          filearray.push(JSON.stringify(dreamtitleval)); //add dream click
          this.addDream(dreamtitleval)
        }
        
        //dreamtitleval = filearray.join('||');
        for(var i=0; i< filearray.length; i++)
        {
          if(filearray[i] != undefined && filearray[i] != 'undefined'){
            if(i==0)
            dreamtitleval = filearray[i];
            else
            {
              dreamtitleval += "||" + filearray[i];
              if(dreamtitleval.indexOf("||") == 0)
              dreamtitleval = dreamtitleval.substring(2);        
            }
          }
        }
        
      } 
    console.log("ms" + JSON.stringify(dreamtitleval));
    await FileSystem.writeAsStringAsync(filename,   dreamtitleval, { encoding: FileSystem.EncodingTypes.UTF8 });
    this.clear();
    }
   
getMaxfid(filearray)
 {
    var max= 0;
    for(var i=0; i< filearray.length; i++)
      {
        var j=filearray[i];
        console.log(j+'file')
        if( j!="" && j !='undefined' )
        {
          j = JSON.parse(filearray[i])
          if(parseInt(j.fid) > max)
          {
            max = parseInt(j.fid);
          }
        }  
      }          
      console.log('max' + max)
      return max+1;
  }

onSave()
{
  if(!this.state.editMode)
  {
    this.setState({editMode: true});
    AsyncStorage.setItem('editMode','true');
    console.log('onsave');
    return;
  }
  Keyboard.dismiss();
  if(!this.state.TextInputValue || !this.state.TextInputValue.trim())
  {
    alert("Please enter text");
    return;
  }
 
  if(this.state.title == "")
    { 
      var   str=this.state.TextInputValue.trim();    
      var  n = str.indexOf(" ");
      console.log(n);
      if(n != -1)
      n = str.indexOf(" ", n + 1);
      console.log(n);
      if(n != -1)
      n = str.indexOf(" ", n + 1);
      console.log(n);
      if(n == -1)
      n = this.state.TextInputValue.length;
      this.setState({title : str.substring(0,n)});
      AsyncStorage.setItem("Title", str.substring(0,n));
    }
  this.setModalVisible(true);
}
onEditable=()=>
   {
   this.setState({editMode : true});
   this.setState({sampleText:'Save'});
   }
onEdit()
 {
  Keyboard.dismiss();
  this.props.navigation.navigate('Edit', {name: 'Jane'});
}

clear=()=>
{
  this.setState({title : "",TextInputValue : "",EmojiStatus: "" ,angryimg: "",sadimg: "",calmimg: "" ,happyimg: ""  });
  AsyncStorage.setItem("title","");
  AsyncStorage.setItem("TextInputValue","");
  AsyncStorage.setItem('editMode','');
}
// {dreamtitle :  this.state.title, emoji : this.state.EmojiStatus,dated:this.state.selectedStartDate,
//   category:this.state.Category, fid: this.state.fid.toString(),descr:this.state.TextInputValue,country:this.state.selectedCountry,
//   state:this.state.selectedState,city:this.state.City,isDreamPrivate:(this.state.isDreamPrivate ? "true" : "false"), IsDeleted : "false"};
addDream = async (dream) => {
  if(dream)
    {
      const {dreamtitle,emoji,dated,category,descr,country,state,city,isDreamPrivate} = dream
      let input ={
        dreamtitle:dreamtitle,
        dreamdescription:descr,
        wokeupfeeling:emoji,
        dreamprivacy:isDreamPrivate,
        Category:category,
        City:city,
        Country:country,
        State:state,
        Date:dated
      }
      
      const result1 = await API.graphql(graphqlOperation(createDreams, { input }))

    }
    else{
          const {title,dreams,TextInputValue,EmojiStatus,isDreamPrivate,Category,
            selectedStartDate,selectedState,selectedCountry,City} = this.state
          let input ={
            dreamtitle:title,
            dreamdescription:TextInputValue,
            wokeupfeeling:EmojiStatus,
            dreamprivacy:isDreamPrivate,
            Category,
            City,
            Country:CountryStateCity.getCountryById(selectedCountry).name,
            State:CountryStateCity.getStateById(selectedState).name,
            Date:selectedStartDate
          }
          
          const result1 = await API.graphql(graphqlOperation(createDreams, { input }))
    }
  const newDreams = result1.data.createDreams
  const updatedDreams = [newDreams, ...dreams]
  this.setState({ dreams: updatedDreams, title:"",TextInputValue:"",EmojiStatus:"",dreamprivacy:false,Category:"",City:"",
  Country:"",State:"",Date:""})
 

};


movenextPage = () =>
{
  this.savefile();//call filesystem
  this.props.navigation.navigate('DreamJournal', {name: 'Jane'});
  this.setModalVisible(!this.state.modalVisible);
  this.addDream()
}
changeText=()=>
{
  if(!this.state.editMode)
  {
    return(<TouchableOpacity style={styles.saveView} type='Submit'onPress={this.onSave}>
           <Text style={styles.text}>EDIT
           </Text> 
           </TouchableOpacity>
          );
  }
  else
  {
  return(<TouchableOpacity style={styles.saveView} type='Submit' onPress={this.onSave}>
         <Text style={styles.text}>SAVE
         </Text>
        </TouchableOpacity>
        );
  }
}

editDetailsChange=()=>
{  
  if(!this.state.editMode)
  {
   return(
       <View style={{flexDirection:'row', marginHorizontal: -220, bottom:70}}>
       <TouchableOpacity style={styles.saveView} type='Submit' onPress=  { ()=>this.props.navigation.navigate('DreamJournal', {name: 'Jane'})}>
       <Text style={styles.text}>Back
       </Text> 
       </TouchableOpacity>
       </View>);
  }
  else{
    return(<View style={{flexDirection:'row',marginTop:-40, marginHorizontal: 9, bottom:26}}>
           <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' type ="button" onPress={this.onEdit}  >{Util.edit()}</TouchableOpacity> 
           <Text style={{color:'#000080', bottom:-1}}>Edit details</Text>           
          </View>);

      }
}

ShowModal(){
  if(this.state.modalVisible){
  return (
  <View style={{}}>
    <Modal
      animationType="none"
      transparent={true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
            <View style={{flex: 1,marginTop:hp('35%'), borderRadius:4,marginBottom:hp('50.27%'),marginLeft:wp('20%'),marginRight:wp('20%'),flexDirection: 'column',justifyContent:'center', borderWidth:2, borderColor:'#1E90FF' ,backgroundColor: '#1E90FF'}}>
        <View>
          <Text style={{color:'#ffffff',borderBottomWidth:2,borderColor:'#000000',textAlign:'center',width:wp('59%'),height:hp('6%'),textAlign:'center',justifyContent:'center',textAlignVertical:'center'}}>Save Dream?</Text>
          <View style={{flexDirection:'row'}}>
          <TouchableHighlight activeOpacity = {.9} underlayColor='#1E90FF' style={{justifyContent:'center',borderRightWidth:2,borderColor:'#000000',}} type='button'
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={{color:'#ffffff',width:wp('28%'),height:hp('5%'),textAlign:'center',justifyContent:'center',textAlignVertical:'center'}}>Cancel</Text>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={.9} underlayColor='#1E90FF'  style={{justifyContent:'center',width:wp('29%'),height:hp('5%')}}
            onPress={() => {
              this.movenextPage();
              }}>
            <Text style={{color:'#ffffff',textAlign:'center',}}>OK</Text>
          </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal> 
    </View>   
    );
          }
          else
          {
            <View></View>
          }
          }


render() {
  const {navigate} = this.props.navigation;
  if(!this._mounted)
  return (<React.Fragment></React.Fragment>);
  else{
    return(
      <KeyboardShift>
      {() => (
      <ScrollView style ={styles.Container}
      keyboardDismissMode="none"
      keyboardShouldPersistTaps="handled">
       
      <NavigationEvents onDidFocus={() => this.setCompVal()} />
        
      <TextInput
        style = {styles.registerInput}
        placeholder ='New Dream Title'
        onChangeText={this.handleTitle}
        // placeholderTextColor = {'rgba(0,0,0,0.5)'}
        placeholderTextColor = '#878681'
        value={this.state.title} maxLength={20}
        editable={this.state.editMode }
      />

      <TextInput
        style = {[styles.textAreaInput,{backgroundColor: this.state.textBgColor}]}
        placeholder ='Describe your dream here...'
        numberOfLines={10} 
        value={this.state.TextInputValue} 
        multiline={true} 
        onFocus={this.ChangeWhiteColor}
        onBlur={this.ChangeGrayColor}       
        placeholderTextColor = {'#bdbdbd'}
        // Code by Shakthi  Limit Exceeded
        onChangeText={TextInputValue => this.onEnterText(TextInputValue) }
        editable={this.state.editMode}
      />

<Text style={styles.Woke}></Text> 

<Text style={styles.Woke}> Woke up feeling:</Text> 
<View style={{flex: 1, flexDirection: 'row',justifyContent:'space-evenly',marginHorizontal:90,margin:20,marginTop:-3,left:-10}}>
 <View style={{width: 40, height: 40 }} >
  <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={this.handleangryHighlight}>
    {this.state.angryimg === "highlight" ? Util.angryimgHighlight(): Util.angryimg() }
  </TouchableOpacity>
 </View>
 <View style={{width: 40, height: 40 }} >
  <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={this.handlesadHighlight}>
   {this.state.sadimg === "highlight1" ? Util.sadimghighlight() : Util.sadimg() }
  </TouchableOpacity>
 </View>
 <View style={{width: 40, height: 40 }} >
  <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={this.handlecalmHighlight}>
   {this.state.calmimg === "highlight2" ? Util.calmimghighlight() : Util.calmimg() }
  </TouchableOpacity>
 </View>
<View style={{width: 40, height: 40 }} >
  <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={this.handlehappyHighlight}>
   {this.state.happyimg === "highlight3" ? Util.happyimghighlight() : Util.happyimg() }
  </TouchableOpacity>
  </View>
  </View>
{
  this.ShowModal()
 }
 {this.changeText()}
 {this.editDetailsChange()}

 </ScrollView>
 )
 }
 </KeyboardShift>
   );
  }
} 

handleTitle = (val) =>
 {
  this.setState({title : val});
  AsyncStorage.setItem("Title", val);
 }

handleangryHighlight = (e) =>
{
  
  if(!this.state.editMode)
  return;
  Keyboard.dismiss();

  if( this.state.angryimg === 'highlight')//deselect the emojis
  {
    this.setState ({angryimg : '',EmojiStatus : 'angryhighlight'})
    AsyncStorage.setItem("EmojiStatus", 'highlight');
  }
  
  else 
  {
  
     this.setState ({angryimg : 'highlight',sadimg : "",calmimg : "",happyimg : ""})
     AsyncStorage.setItem("EmojiStatus", "angry");
     this.setState ({EmojiStatus : 'angry'});
  }}
handlesadHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
  Keyboard.dismiss();
  if( this.state.sadimg === 'highlight1')
  {
    AsyncStorage.setItem("EmojiStatus", 'highlight1');
    this.setState ({sadimg:'', EmojiStatus : 'sadhighlight'});
  }
  else 
  {
    AsyncStorage.setItem("EmojiStatus", "sad");
    this.setState ({sadimg:'highlight1',angryimg:"",calmimg:"",happyimg:"", EmojiStatus : 'sad'});
   } }

handlecalmHighlight = (e) =>
{
  if(!this.state.editMode)
  return;

  Keyboard.dismiss();

  if( this.state.calmimg === 'highlight2')//deselect the emojis
  {
  AsyncStorage.setItem("EmojiStatus", 'highlight2');

  this.setState ({calmimg:'',
  EmojiStatus : 'calmhighlight'});
  }
else 
{
  AsyncStorage.setItem("EmojiStatus", "calm");
  this.setState ({calmimg:'highlight2',sadimg:"",angryimg:"",happyimg:"", EmojiStatus : 'calm'});
}}
handlehappyHighlight = (e) =>
{  
  if(!this.state.editMode)
  return;
  Keyboard.dismiss();
  if( this.state.happyimg === 'highlight3')
  {
    AsyncStorage.setItem("EmojiStatus", 'highlight3');
    this.setState ({happyimg:'', EmojiStatus : 'happyhighlight'});
  }
  else 
  {
    AsyncStorage.setItem("EmojiStatus", "happy");
    this.setState ({happyimg:'highlight3',sadimg:"",calmimg:"",angryimg:"", EmojiStatus : 'happy'});
}}
  ChangeWhiteColor = (value) =>
{
  console.log(value);
  this.setState ({textBgColor : "#FFFFFF"})
}
ChangeGrayColor = (value) =>
{
  console.log(value);
  this.setState ({textBgColor : "#F4F5F7"})
}
}

styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  registerInput:{
    
    fontSize: 24,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,255)',
    color: 'black',
    marginHorizontal: 17,
    alignItems: 'center',
    bottom: -40,
    width: wp('90%'),
    height: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontFamily: 'Roboto',
   
    
  },

  textAreaInput:{
    borderRadius: 4,
    fontSize: 12,
    position:'relative',
    textAlign:'justify',
    textAlignVertical: "top",
    backgroundColor: '#F4F5F7',
    color: 'black',
    marginHorizontal:17,
    alignItems: 'center',
    margin: 10,
    width: wp('90%'),
    height: hp('54%'),
    borderWidth: 1,
    borderColor: '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOpacity: 0.8,
    fontFamily: 'Roboto',
    bottom:-30,
    //line space & space from border left and top
    lineHeight:16,
    paddingLeft:7,
    paddingTop:7
      },

  saveView:{
    width: wp('25%'),
    height: hp('4%'),
    margin:20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 12,
    marginHorizontal:248,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    bottom: 21,
    borderRadius: 8,
  },
                 
                    
text:{
    color: '#ffffff',
    fontSize: 12,
    paddingLeft : -50,
    paddingRight : -50,
    textAlign: 'center',
   },
  
Woke: 
   {
     marginHorizontal:100,
     textAlign:'center',
     justifyContent: 'flex-end',
     margin:10,
    },
    }
);



