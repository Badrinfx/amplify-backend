import React, { Component } from 'react';
import {AsyncStorage, Picker, StyleSheet, View, Text,Modal,TouchableHighlight,TouchableOpacity, TextInput, Switch, Image, StatusBarIOS, PixelRatio } from 'react-native';
import {AntDesign as Icon} from 'react-native-vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { fn } from 'moment';
import CountryStateCity from 'country-state-city';
import Footer from './bottomtab';

//import DeviceInfo from 'react-native-device-info'
import styles from './styles.js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NavigationEvents} from 'react-navigation';
import { Svg} from 'expo';
//import { CheckBox ,colors, ThemeProvider} from 'react-native-elements';
import Util from './utility.js';
import CheckBox from 'react-native-check-box';
import { FileSystem } from 'expo';
import Amplify from 'aws-amplify'
import API,{graphqlOperation} from '@aws-amplify/api'
// import awsmobile from '../aws-exports'
import { createDreams,updateDreams } from "../src/graphql/mutations"
import { listDreamss } from "../src/graphql/queries"
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
  
}
Amplify.configure(awsmobile)

export default class New extends Component {
    constructor(props) {
     super(props);
        allCountries = CountryStateCity.getAllCountries();
        countrystates = CountryStateCity.getStatesOfCountry();
        
    this.state = {
      Date: '',
      Country: '',
      State: '',
      City: '',
      Category: '',
      selectedStartDate: "",
      AllCountries : [],
      CountryStates : [],
      title : "",
      TextInputValue:"",
      showview : true,
      picker : false,
      compvalcalled : false,
      selectedCountry : "231",
      selectedState : "3956",
      maxfilelength: 1, editMode : true,sampleText:"Save",fid:0,existingfid:false,isDreamPrivate:"false",
      dreams:[]
    }  
      this.onSave = this.onSave.bind(this);
      this.showCalender = this.showCalender.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
}
    static navigationOptions = {
        title: 'screen2',
      };
     
    setCompVal = () =>
      {
        try{
        console.log(this.state.compvalcalled);
        if(!this.state.compvalcalled){
           AsyncStorage.getItem('Menu').then((val) =>
           { 
             console.log(val+'ddd'); 
              if (val == "AddDream")         
             {
               this.setState({editMode : true,fid:0,existingfid: true});
               AsyncStorage.setItem('Menu', "");
               AsyncStorage.setItem('Title',"");
               AsyncStorage.setItem('TextInputValue',"");
               AsyncStorage.setItem("EmojiStatus", "");
               AsyncStorage.setItem('Category1', "");
               AsyncStorage.setItem('Dated', "");
               AsyncStorage.setItem('state', "3656");
               AsyncStorage.setItem('country', "231");
               AsyncStorage.setItem('city', "");
               AsyncStorage.setItem('isDreamPrivate',"false");
               this.clear();
             }
             else if(val == "List")
             {
               Util.readjson().then((result) => 
                 {
                  AsyncStorage.getItem('Title').then((value) =>
                  {
                   this.setState({ 'title': value })
                  })
                   console.log(result+'uuu');
                   this.setState({editMode : false});
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
                     AsyncStorage.setItem('TextInputValue', t.descr);
                     AsyncStorage.setItem('Title', t.dreamtitle);
                     console.log(t.descr + "descr");
                     if(t.emoji=='angry')
                     this.setState({angryimg:'highlight'})
                     else if(t.emoji=='sad')
                     this.setState({sadimg:'highlight1'})
                     else if(t.emoji=='calm')
                     this.setState({calmimg:'highlight2'})
                     else if(t.emoji=='happy')
                     this.setState({happyimg:'highlight3'})
                     this.setState({selectedCountry:t.country});
                     countrystates = CountryStateCity.getStatesOfCountry(t.country);
                     this.setState({CountryStates: countrystates,selectedState:t.state,City:t.city,Category:t.category,selectedStartDate:t.dated,isDreamPrivate:t.isDreamPrivate});               
                    }
                  });
                });
              }
             else
             {
               AsyncStorage.getItem('Title').then((value) =>
                 {
                  this.setState({ 'title': value })
                 })
               AsyncStorage.getItem('Dated').then((value) => 
                 {
                  this.setState({ selectedStartDate: value });
                  console.log(this.state.selectedStartDate);
                 }); 
               AsyncStorage.getItem('TextInputValue').then((TextInputValue) => this.setState({ 'TextInputValue': TextInputValue }))
               AsyncStorage.getItem('country').then((value) => this.setState({ selectedCountry: value }))
               AsyncStorage.getItem('state').then((value) => this.setState({ selectedState: value }))
               AsyncStorage.getItem('city').then((value) => {this.setState({ City: value })})
               AsyncStorage.getItem('Category1').then((value) =>
                  { this.setState({ selectedValue: value })
                  console.log(value+"iiii")
                  })
               AsyncStorage.getItem('EmojiStatus').then((value) => 
                 {
                  this.setState({ EmojiStatus: value,angryimg : "",sadimg : "", calmimg : "",happyimg : ""});
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
              );
            }
         });
        }}
        catch(e)
        {}

      }
    componentDidMount() 
      {
        try{
        AsyncStorage.setItem('editMode','');
        this.setState({AllCountries: allCountries});
        let countrystates = CountryStateCity.getStatesOfCountry(this.state.selectedCountry);
        this.setState({CountryStates: countrystates}); 
      }
      catch(e)
      {}
    }
    getItem = async() =>
      {
        await this.setState({ 'title': (AsyncStorage.getItem('Title') || 'none') });
      }

    loadAllCountries() 
      {
       return this.state.AllCountries.map((countries, idx) => (
       <Picker.Item key={idx} label={countries.name} value={countries.id} />
        ))
      }

    
    loadStates() 
      {
       return this.state.CountryStates.map((countries, idx) => (
       <Picker.Item key={idx} label={countries.name} value={countries.id} />
        ))
      }

   handleCountrySel = (value) => 
      {
        if(!this.state.editMode)
        return;
        this.setState({selectedCountry : value}); 
        countrystates = CountryStateCity.getStatesOfCountry(value);
        this.setState({CountryStates: countrystates}); 
        let countryobj = CountryStateCity.getCountryById(value);
        //countryobj.name 
        console.log('Country'+countryobj.name)
        return AsyncStorage.setItem("country", value)
       
      }
  
   handleStateSel = (value) => 
      {
        if(!this.state.editMode)
        return;
        console.log("cs" + value);
        this.setState({selectedState : value}); 
        let statescity = CountryStateCity.getCitiesOfState(value);
        this.setState({statescity: countrystates}); 
        let stateobj = CountryStateCity.getStateById(value);
        //stateobj.name 
        console.log('State'+stateobj.name)

        return AsyncStorage.setItem("state", value)
      }

    handleCity = (city) => 
      {
        this.setState ({ City:city });
        console.log(city+"ppp");
        return AsyncStorage.setItem("city", city)
      }

   handleCategory = (text) => 
     {
       if(!this.state.editMode)
       return;
       this.setState ({ Category:text });
       return AsyncStorage.setItem("Category1", text)
     }
    
    renderPicker() {
      const smaxDate = moment(new Date, 'DD-MM-YYYY'); 
        if (this.state.picker) {
          return (
            <CalendarPicker
              onDateChange={this.onDateChange} maxDate={smaxDate}
            />
          );
          
        }
        
      }
    
      showCalender()
      {
        if(!this.state.editMode)
        return;
       
        this.setState({ picker: !this.state.picker });
        this.setState({ showview: !this.state.showview });
      }
      onDateChange(date) 
       {
         date = moment(date).format('DD MMMM YYYY'); // 15-11-2017T11:17:30+01
         this.setState({
         selectedStartDate: date,
         });
         this.setState({ picker: !this.state.picker });
         this.setState({ showview: !this.state.showview });
         AsyncStorage.setItem("Dated", date);
         console.log(date);
       }
setModalVisible = (visible) => 
       {
        this.setState({modalVisible: visible});
       }
clear()
       {
        this.setState({title : "",TextInputValue : "",EmojiStatus: "",angryimg: "",sadimg: "",calmimg: "",happyimg: ""});
        AsyncStorage.setItem("title","");
       }
 
        addDream = async (dream) => {
  
          if(dream)
          {
            const {dreamtitle,emoji,fid,dated,category,descr,country,state,city,isDreamPrivate} = dream
            const {dreams}=this.state
            let input ={
              dreamtitle:dreamtitle,
              dreamdescription:descr,
              dreamid:fid,
              wokeupfeeling:emoji,
              dreamprivacy:isDreamPrivate,
              Category:category,
              City:city,
              Country:CountryStateCity.getCountryById(country).name,
              State:CountryStateCity.getStateById(state).name,
              Date:dated
            }
            
            const result1 = await API.graphql(graphqlOperation(createDreams, { input }))
            const newDreams = result1.data.createDreams
        const updatedDreams = [newDreams, ...dreams]
        this.setState({ dreams: updatedDreams})
      
        
          }
          else{
            const {dreamtitle,emoji,fid,dated,category,descr,country,state,city,isDreamPrivate} = dream
              
            let input ={
              dreamtitle:dreamtitle,
              dreamdescription:descr,
              dreamid:fid,
              wokeupfeeling:emoji,
              dreamprivacy:isDreamPrivate,
              Category:category,
              City:city,
              Country:CountryStateCity.getCountryById(country).name,
              State:CountryStateCity.getStateById(state).name,
              Date:dated
            }
            const result1 = await API.graphql(graphqlOperation(updateDreams, { input }))
              const newDreams = result1.data.updateDreams
          const updatedDreams = [newDreams, ...dreams]
          this.setState({ dreams : updatedDreams})
          }    

        }
movenextPage = () =>
      {
  this.savefile();
  this.props.navigation.navigate('DreamJournal', {name: 'Jane'});
  this.setModalVisible(!this.state.modalVisible);
  this.addDream()
      }

changeText=()=>
{
  if(!this.state.editMode)
  {
    return(<TouchableOpacity style={styles.SaveButton} type='Submit' onPress={this.onSave}>
           <Text style={styles.SaveButtonText}>Edit
           </Text> 
           </TouchableOpacity>
    );
  }
  else
  {
  return(<TouchableOpacity style={styles.SaveButton} type='Submit' onPress={this.onSave}>
         <Text style={styles.SaveButtonText}>SAVE
         </Text>
         </TouchableOpacity>
        );
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
            <View style={{flex: 1,marginTop:hp('35%'), borderRadius:4,marginBottom:hp('50.1%'),marginLeft:wp('20%'),marginRight:wp('20%'),flexDirection: 'column',justifyContent:'center', borderWidth:2, borderColor:'#1E90FF' ,backgroundColor: '#1E90FF'}}>
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
          
onSave()
  {
    if(!this.state.editMode)
      {
        this.setState({editMode: true});
        return;
      }
    let bIsVal = true;
    AsyncStorage.getItem('Title').then((value) =>
            {
             this.setState({ 'title': value })
            }
            )
    AsyncStorage.getItem('TextInputValue').then((TextInputValue) =>
            { 
              console.log(TextInputValue + "dddd");
              this.setState({ TextInputValue: TextInputValue });
              if(!this.state.TextInputValue || !this.state.TextInputValue.trim())
                 {
                  alert("Please enter text");
                  bIsVal = false;
                 }
                 if(bIsVal)
                 {
                 if(this.state.title == "" || this.state.title == null)
                    { 
                     var   str=this.state.TextInputValue.trim();    
                     var  n = str.indexOf(" ");
                     if(n != -1)
                     n = str.indexOf(" ", n + 1);
                     if(n != -1)
                     n = str.indexOf(" ", n + 1);
                     console.log(n);
                     if(n == -1)
                     n = this.state.TextInputValue.length;
                     this.setState({title : str.substring(0,n)});
                    }  
                  this.setModalVisible(true);
                 }
                })
            }
async savefile()
    {
      filename = FileSystem.documentDirectory + "dream" + ".json";
      let result;
      try{
          result = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dream" + ".json", { encoding: FileSystem.EncodingTypes.UTF8 });
          console.log("set"+result);
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
      let dreamtitleval = {dreamtitle :  this.state.title, emoji : this.state.EmojiStatus,country:this.state.selectedCountry,state:this.state.selectedState,city:this.state.City,dated:this.state.selectedStartDate,
        category:this.state.Category, fid: this.state.fid.toString(),countryName:countryobj.name,stateName:stateobj.name,descr:this.state.TextInputValue,isDreamPrivate:this.state.isDreamPrivate, IsDeleted : "false"};
        console.log("saving" + dreamtitleval);

      if(this.state.fid == 1 && ! this.state.existingfid)
      {
        if(result=="")      
        dreamtitleval = JSON.stringify(dreamtitleval) 
        //first time add dream
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
        filearray.push(JSON.stringify(dreamtitleval)); 
        this.addDream(dreamtitleval)
        }//add dream click
        for(var i=0; i< filearray.length; i++)
        {
          if(filearray[i] != undefined && filearray[i] != 'undefined'){
            if(i==0)
            dreamtitleval = filearray[i];
            else
            dreamtitleval += "||" + filearray[i];
            if(dreamtitleval.indexOf("||") == 0)
            dreamtitleval = dreamtitleval.substring(2);        
          }
        }
        
      } 
      console.log("ms" + JSON.stringify(dreamtitleval));
      
      await FileSystem.writeAsStringAsync(filename,   dreamtitleval, { encoding: FileSystem.EncodingTypes.UTF8 });

      this.clear();
    }
    getMaxfid(filearray){
      var max= 0;
      for(var i=0; i< filearray.length; i++)
      {
        var j=filearray[i];
        console.log(j+'file')
        if( j!="" && j !='undefined' )
        {
          j = JSON.parse(filearray[i])
          if(j.fid > max)
          {
            max = j.fid;
          }
        }  
      }          
      return parseInt(max)+1;
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
onBack =()=>
    {
      AsyncStorage.setItem('editMode','true');
      this.props.navigation.navigate('Main', {name: 'Jane'});
    }
   
render() {
        const {navigate} = this.props.navigation;
        const startDate = this.state.selectedStartDate ? this.state.selectedStartDate.toString() :  moment(new Date()).format('DD MMMM YYYY').toString();
        if (this.state.showview){
        return (
          <View style={{flex: 10, flexDirection: 'column', paddingLeft: 30, paddingTop : 30, borderWidth:2, borderColor: "black"}}>
           <NavigationEvents onDidFocus={() => this.setCompVal()} />
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingTop : 30,marginLeft:-20}}>
              <View style={{width: 100, height: 50, }} >
                <TextInput
                  style = {styles.registerInput1}
                  placeholder ='Dream Title'
                  editable = {false}
                  //onChangeText={this.handleTitle}
                  value={this.state.title} maxLength={20}
                  placeholderTextColor = '#253858'        
                  />
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop : 30}}>
              <View style={{width: wp('10%'), height:hp('5%'), }} >
              <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:5,marginRight:15}}></Text>
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", height:30, width:380,left:-15,top:16}}>Date:</Text>
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:8}}></Text>
            </View>
              <View style={{width: wp('65%'), height:hp('5%'),top:24}} >
              <TextInput 
              autoCapitalize = "none"
              value={startDate}/>
            </View>
              <View style={{width: wp('10%'), height:hp('5%'),top:24}} >
              <Icon name='calendar' size={20} color='#000080'  onPress={this.showCalender}/>
              {this.renderPicker()}
              </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row' ,alignSelf:"flex-end"}}>
              <View style={{width: wp('10%'), height:hp('5%') }} >
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", height:28, width:380,left:-15,top:22}}>Country:</Text>
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:18}}></Text>
            </View>
              <View style={{width: wp('75%'), height:hp('5%'), top: 9, right:-12  }} >
                <Picker style= {{right:27}}
                 selectedValue={this.state.selectedCountry}            
                 onValueChange={this.handleCountrySel}
                 enabled={this.state.editMode}>
                 {this.loadAllCountries()}
               
                </Picker>
              </View>
              </View>


              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop : 30,}}>
              <View style={{width: wp('10%'), height:hp('5%') }} >
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", height:20, width:380,left:-15,top:-6}}>State:</Text>
              <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-2 }}></Text>
              <TextInput style= {styles.edit_input}
                underlineColorAndroid="transparent"
                autoCapitalize = "none"   
                onChangeText={this.handleState}/>
              </View>
              <View style={{width: wp('75%'), height:hp('5%'), top : -15}} >
                <Picker style= {{right:14,top:-3}} 
                  selectedValue={this.state.selectedState}
                  onValueChange={this.handleStateSel}
                  enabled={this.state.editMode}>
                  {this.loadStates()}
                </Picker>
              </View>

              </View>


              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop : 30}}>
                <View style={{width: wp('12%'), height:hp('5%') }} > 
                 <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", height:20, width:380,left:-1,top:-33 }}>City:</Text> 
                 <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-29 }}></Text>
                </View>
                <View style={{width: wp('60%'), height:hp('5%'), top : -31, left:-10}} > 
                  <TextInput style= {styles.edit_input}
                  placeholder="Enter the city"
                  value={this.state.City} maxLength={50}
                  onChangeText={this.handleCity}
                  editable={this.state.editMode }

                  placeholderTextColor = '#bdbdbd'
                  underlineColorAndroid="transparent"            
                  autoCapitalize = "none" />             
                </View>
              </View>


              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop : 30}}>
                <View style={{width: wp('10%'), height:hp('5%')  }} >     
                <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-50}}></Text> 
                <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black",height:30, width:380,top:-40,left:-15}}>About:</Text>
                <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-44}}></Text>
              </View>
              <View style={{width: wp('75%'), height:hp('5%'),top:-48}} > 
                <Picker style= {{right:14}}
                selectedValue={this.state.Category}            
                onValueChange={this.handleCategory}
                enabled={this.state.editMode}>
                <Picker.Item label="-Select-" value="-select-" />
                <Picker.Item label="Me/My family" value="me/my family" />
                <Picker.Item label="My workplace" value="my workplace" />
                <Picker.Item label="Religion" value="religion" />
                <Picker.Item label="War" value="war" />
                <Picker.Item label="Government" value="government" />
                <Picker.Item label="Natural disasters" value="natural disasters" />
                <Picker.Item label="Others" value="Others" />
                </Picker>            
                </View>
              </View>

        <Text style={styles.Woke1}> Woke up feeling:</Text> 
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',marginHorizontal:90, margin:20,top:-7,left:-10}}>

           <View style={{width: 40, height: 40 }} >
              <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={this.handleangryHighlight}>
                  {this.state.angryimg === "highlight" ? Util.angryimgHighlight() : Util.angryimg() }
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
<CheckBox
    style={{marginLeft:1}}
    onClick={()=>{
      this.setState({isDreamPrivate: this.state.isDreamPrivate == "true" ? "false" : "true"})
      AsyncStorage.setItem('isDreamPrivate',this.state.isDreamPrivate)
       }}
    isChecked={this.state.isDreamPrivate == "true"}
    rightText={"Keep this dream private"}
    disabled={!this.state.editMode}

    rightTextStyle={{color:'#000f55',marginLeft:1,fontFamily:'Roboto',fontWeight:'normal',}}
    checkedImage={<Image source={require('./../assets/icons8-checked-checkbox-24.png')}/>}
    uncheckedImage={<Image source={require('./../assets/ic_check_box_outline_blank.png')}/>}
  
/>


<View style={{flex: 1, flexDirection: 'row'}}>
    <View >              
      <TouchableOpacity
        style = {styles.BackButton}   
        onPress={this.onBack} >            
        <Text style = {styles.SaveButtonText}> BACK </Text>               
      </TouchableOpacity>
    </View>
{
  this.ShowModal()
 }
{this.changeText()}

    </View>
   <View style={{marginRight:20,marginBottom:30}}>
    <View style = {styles.container}>
    <View style = {styles.bottomContainer}>
        <Footer navigation={this.props.navigation} />
      </View>
    
    </View>
     </View>
     </View>
     )}
        else{
        return (
          <View style={{flex: 10, flexDirection: 'column', paddingLeft: 20, paddingTop : 30, paddingRight: 20, borderWidth:2, borderColor: "black"}}>
          {this.renderPicker()}
          </View>
        );
    }
}
handleangryHighlight = (e) =>
{
  if(!this.state.editMode)
  return;

  if( this.state.angryimg === 'highlight')
  {
    this.setState ({angryimg : ''})
    AsyncStorage.setItem("EmojiStatus", 'highlight');
    this.setState ({EmojiStatus : 'angryhighlight'});
  }
  else 
{
  AsyncStorage.setItem("EmojiStatus", "angry");
  this.setState ({angryimg:'highlight',sadimg:"",calmimg:"",happyimg:"", EmojiStatus : 'angry'});

}}
handlesadHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
  if( this.state.sadimg === 'highlight1')
  {
    AsyncStorage.setItem("EmojiStatus", 'highlight1');
    this.setState ({sadimg:'', EmojiStatus : 'sadhighlight'});
  }
  else 
  {
  
    AsyncStorage.setItem("EmojiStatus", "sad");
    this.setState ({sadimg:'highlight1',angryimg:"",calmimg:"",happyimg:"", EmojiStatus : 'sad'});
  }}
handlecalmHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
  if( this.state.calmimg === 'highlight2')
  {
  AsyncStorage.setItem("EmojiStatus", 'highlight2');
  this.setState ({calmimg:'', EmojiStatus : 'calmhighlight'}); 
  }
else 
  {
   this.setState ({calmimg:'highlight2',sadimg:"",angryimg:"",happyimg:"", EmojiStatus : 'calm'});
   AsyncStorage.setItem("EmojiStatus", "calm");
}}
handlehappyHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
  if( this.state.happyimg === 'highlight3')
  {
  AsyncStorage.setItem("EmojiStatus", 'highlight3');
    this.setState ({happyimg:'', EmojiStatus : 'happyhighlight'}); } 
     else 
  {
  
    this.setState ({happyimg:'highlight3',sadimg:"",calmimg:"",angryimg:"", EmojiStatus : 'happy'});
  AsyncStorage.setItem("EmojiStatus", "happy");
  }
}
}
