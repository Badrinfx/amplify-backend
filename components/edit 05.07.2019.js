//Sprint 1 Code
//City Alignment Fixed
import React, { Component } from 'react';
import {AsyncStorage, Picker, StyleSheet, View, Text, TouchableOpacity, TouchableHighlight,Modal,TextInput, Switch, Image, StatusBarIOS, PixelRatio } from 'react-native';
import {AntDesign as Icon} from 'react-native-vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import CountryStateCity from 'country-state-city';
import CheckBox from 'react-native-check-box'
//import DeviceInfo from 'react-native-device-iyarn anfo'
import styles from './styles.js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NavigationEvents} from 'react-navigation';
import { Svg} from 'expo';
import Util from './utility.js';
import { FileSystem } from 'expo';



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
      maxfilelength: 1, editMode : true,sampleText:"Save",fid:0,existingfid:false,
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
        console.log(this.state.compvalcalled);
        if(!this.state.compvalcalled){
          console.log('va');
           AsyncStorage.getItem('Menu').then((val) =>
           { 
             console.log(val+'ddd'); 
              if (val == "AddDream")         
             {
               this.setState({editMode : true});
               AsyncStorage.setItem('Menu', "");
               AsyncStorage.setItem('Title',"");
               
               AsyncStorage.setItem('TextInputValue',"");
               AsyncStorage.setItem("EmojiStatus", "");
               AsyncStorage.setItem('Category1', "");
               AsyncStorage.setItem('Dated', "");
               AsyncStorage.setItem('state', "3656");
               AsyncStorage.setItem('country', "231");
               AsyncStorage.setItem('city', "");

               this.clear();
               this.setState({fid:0});
               this.setState({existingfid: true});
                   
             }
             else if(val == "List")
             { 
                 Util.readjson().then((result) => 
                 {
                 // AsyncStorage.setItem('TextInputValue',"");

                  AsyncStorage.getItem('Title').then((value) =>
                  {
                   this.setState({ 'title': value })
                  })
                  AsyncStorage.getItem('TextInputValue').then((TextInputValue) => {
                    this.setState({ 'TextInputValue': TextInputValue })
                    console.log(TextInputValue+"qqqqqq")
                  })

                 
                   //var listid="";
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
                     //var t = JSON.parse(filearray[val-1]);
                     var t = Util.getFileobj(filearray, val);                
                     //console.log(t.dreamtitle + "val");
                     if(t.dreamtitle)
                     {
                     this.setState({ title: t.dreamtitle ,TextInputValue: t.descr,EmojiStatus: t.emoji ,angryimg: "",sadimg: "",calmimg: "",happyimg: ""});
                     AsyncStorage.setItem('TextInputValue', t.descr);
                     AsyncStorage.setItem('Title', t.dreamtitle);
                     console.log(t.descr + "descr");
                    //  this.setState({ TextInputValue: t.descr });
                    //  this.setState({ EmojiStatus: t.emoji });
                      
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
                     this.setState({CountryStates: countrystates});               
                     this.setState({selectedState:t.state});
                     this.setState({City:t.city});
                     this.setState({Category:t.category})
                     this.setState({selectedStartDate:t.dated})
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
       // AsyncStorage.getItem('Category').then((value) => this.setState({ text: value }))

        AsyncStorage.getItem('Dated').then((value) => 
        {
          this.setState({ selectedStartDate: value });
          console.log(this.state.selectedStartDate);
        }); 
        AsyncStorage.getItem('TextInputValue').then((TextInputValue) => this.setState({ 'TextInputValue': TextInputValue }))
        AsyncStorage.getItem('country').then((value) => this.setState({ selectedCountry: value }))
        
        AsyncStorage.getItem('state').then((value) => this.setState({ selectedState: value }))
        AsyncStorage.getItem('city').then((value) => {this.setState({ City: value })
        console.log(value+"fff")})
        AsyncStorage.getItem('Category1').then((value) =>
       { this.setState({ selectedValue: value })
       console.log(value+"iiii")
      })
AsyncStorage.getItem('EmojiStatus').then((value) => 
        {
          this.setState({ EmojiStatus: value });
          //console.log("ssssssss");
          //console.log(this.state.EmojiStatus);
          this.setState ({angryimg : ""})
          this.setState ({sadimg : ""})
          this.setState ({calmimg : ""})
          this.setState ({happyimg : ""})
  
  
          if( this.state.EmojiStatus === "angry")
          this.setState ({angryimg : 'highlight'})
          else if( this.state.EmojiStatus === "sad")
          {
            //this.setState ({angryimg : require('./../assets/angry.png')})
            this.setState ({sadimg : 'highlight1'})  
          }      
          else if( this.state.EmojiStatus === "calm")
          {
            //this.setState ({angryimg : require('./../assets/angry.png')})
            this.setState ({calmimg : 'highlight2'})  
          }        
          else if( this.state.EmojiStatus === "happy")
          {
            //this.setState ({angryimg : require('./../assets/angry.png')})
            this.setState ({happyimg : 'highlight3'})  
          }          
        }
      
        );
   
       }
     });
    }
   }
      componentDidMount(prevProps) 
      {
       // console.log("id" + allCountries.length);
        //AsyncStorage.getItem('Title').then((value) => this.setState({ 'title': value }))
        //this.getItem();
       
        //console.log('did');
        //AsyncStorage.setItem('Title',"");
        AsyncStorage.setItem('editMode','');

        this.setState({AllCountries: allCountries});
        let countrystates = CountryStateCity.getStatesOfCountry(this.state.selectedCountry);
        this.setState({CountryStates: countrystates});     
  
      }

      getItem = async() =>
      {
        //console.log('get' + this.state.title);
        await this.setState({ 'title': (AsyncStorage.getItem('Title') || 'none') });
      }

    
    loadAllCountries() {
      //console.log("init" + this.state.AllCountries.length)

      return this.state.AllCountries.map((countries, idx) => (
        <Picker.Item key={idx} label={countries.name} value={countries.id} />
    ))
    }

    componentWillUnmount = () =>
    {
      //console.log('unmount');
      //AsyncStorage.removeItem('Title');
    }

    loadStates() {
     // console.log("states" + this.state.CountryStates.length)

      return this.state.CountryStates.map((countries, idx) => (
        <Picker.Item key={idx} label={countries.name} value={countries.id} />
    ))
    }

    
//     handleDate = (text) => {
//         this.setState ({ Date:text })
//     }
//  handleCountry = (text) => {
//         this.setState ({ Country:text })
       
//     }
   handleCountrySel = (value) => {
   
    this.setState({selectedCountry : value}); 
    countrystates = CountryStateCity.getStatesOfCountry(value);
    this.setState({CountryStates: countrystates}); 
    return AsyncStorage.setItem("country", value)
    
    }

handleStateSel = (value) => {
  this.setState({selectedState : value}); 
  return AsyncStorage.setItem("state", value)

}

    handleCity = (city) => {
      this.setState ({ City:city })
      return AsyncStorage.setItem("city", city)

  }
   handleCategory = (text) => {
    
    this.setState ({ Category:text });
    AsyncStorage.setItem("Category1", text)
    return AsyncStorage.setItem("Category1", text)

      }
    
    renderPicker() {
         const smaxDate = moment(new Date, 'DD-MM-YYYY'); 
        if (this.state.picker) {
        return (
            //<View style={styles.container}>
            <CalendarPicker
              onDateChange={this.onDateChange} maxDate={smaxDate}
             // const maxDate = moment(new Date, 'DD-MM-YYYY').format(); // 15-11-2017T11:17:30+01:00


            />
            //</View>
          );
        }
      }
    
      showCalender()
      {
        if(!this.state.editMode)
        return;
       
        this.setState({ picker: !this.state.picker });
        this.setState({ showview: !this.state.showview });
        //console.log("showv" + this.state.showview);
      }
      onDateChange(date) {
         // console.log('date');
          //const minDate = new Date(); // Today

          //minDate={minDate};
         
          date = moment(date).format('DD MMMM YYYY'); // 15-11-2017T11:17:30+01
          
          //console.log(date);
          //console.log(minDate);

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
  //AsyncStorage.setItem("TextInputValue", "");
this.setState({title : "",TextInputValue : "",EmojiStatus: "",angryimg: "",sadimg: "",calmimg: "",happyimg: ""});
  // this.setState({city:""});
   //this.setState({country:""});
   //this.setState({date:moment(new Date()).format('DD MMMM YYYY').toString()})
}

  movenextPage = () =>
{
  this.savefile();
  //this.clear();
  this.props.navigation.navigate('DreamJournal', {name: 'Jane'});
  this.setModalVisible(!this.state.modalVisible);
  
  
}


 changeText=()=>
{
  if(!this.state.editMode)
  {
    return(<TouchableOpacity style={styles.SaveButton} type='Submit'
    onPress={this.onSave}>
      <Text style={styles.SaveButtonText}>EDIT
    </Text> 
      </TouchableOpacity>
    );
  }
  else
  {

  return(<TouchableOpacity style={styles.SaveButton} type='Submit'
  onPress={this.onSave}>
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
            <View style={{flex: 1,marginTop:hp('31%'), borderRadius:8,marginBottom:hp('53%'),marginLeft:wp('20%'),marginRight:wp('20%'),flexDirection: 'column',justifyContent:'center', borderWidth:2, borderColor:'#1E90FF' ,backgroundColor: '#1E90FF'}}>
        <View>
          <Text style={{color:'#ffffff',borderBottomWidth:2,borderColor:'#000000',textAlign:'center',width:wp('59%'),height:hp('7.5%'),textAlign:'center',justifyContent:'center',textAlignVertical:'center'}}>Save Dream?</Text>
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
console.log("lll"+value);
  }
  )
 
AsyncStorage.getItem('TextInputValue').then((TextInputValue) =>
  { 
 this.setState({ TextInputValue: TextInputValue });
 console.log('i'+TextInputValue);
  if(!this.state.TextInputValue || !this.state.TextInputValue.trim())
       {
        alert("Please enter text");
        bIsVal = false;
       }
console.log("ttttttt")
       if(bIsVal)
       {
console.log("text");
       if(this.state.title == "" || this.state.title == null)
{ 
console.log("nnnnnnnnnnnn")
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
  }  

  this.setModalVisible(true);
}
       

      })
      

       }

                 async savefile()
    {
      
//console.log(Dated+'s');
      //var r = await FileSystem.writeAsStringAsync('test.txt','name');    
      //return await FileSystem.writeAsStringAsync('test.txt','name');    
      filename = FileSystem.documentDirectory + "dream" + ".json";
      //await MediaLibrary.createAssetAsync(`${FileSystem.documentDirectory}test.txt`);
      let result;
      try{
          result = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dream" + ".json", { encoding: FileSystem.EncodingTypes.UTF8 });
          //result = JSON.parse(result);
          console.log("set"+result);
         //result = "";
          if(this.state.fid == 0)
          {
            console.log(result+"wait")
          let filearray = result.split("||");

          this.setState({fid : (result=="" ? 1:filearray.length+1)}); 
          }
      }
      catch(e)
      {
        
        result = "";
        this.setState({fid : 1}); 
        console.log(e);
        
      }
      console.log("saving" + this.state.fid);
      let dreamtitleval = {dreamtitle :  this.state.title, emoji : this.state.EmojiStatus,country:this.state.selectedCountry,state:this.state.selectedState,city:this.state.City,dated:this.state.selectedStartDate,
        category:this.state.Category, fid: this.state.fid.toString(),descr:this.state.TextInputValue};
      if(this.state.fid == 1 && !this.state.existingfid)
      {
        //console.log("mmm"+result);
        if(result=="")      
        dreamtitleval = JSON.stringify(dreamtitleval) //first time add dream
        //else
         //dreamtitleval = result + "||"  + JSON.stringify(dreamtitleval)
      }
      else
      {
        bfound = false;
        let filearray = result.split("||");
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
        if(!bfound)
        filearray.push(JSON.stringify(dreamtitleval)); //add dream click
        //dreamtitleval = filearray.join('||');
        for(var i=0; i< filearray.length; i++)
        {
          if(filearray[i] != undefined && filearray[i] != 'undefined'){
            if(i==0)
            dreamtitleval = filearray[i];
            else
            dreamtitleval += "||" + filearray[i];
          }
        }
        
      } 
      console.log("ms" + JSON.stringify(dreamtitleval));
      await FileSystem.writeAsStringAsync(filename,   dreamtitleval, { encoding: FileSystem.EncodingTypes.UTF8 });

      this.clear();
    }
    onBack =()=>
    {
      AsyncStorage.setItem('editMode','true');
      //console.log("onback");
      this.props.navigation.navigate('Main', {name: 'Jane'});

    }
   
          
  
    render() {
        const {navigate} = this.props.navigation;
        const startDate = this.state.selectedStartDate ? this.state.selectedStartDate.toString() :  moment(new Date()).format('DD MMMM YYYY').toString();
       //console.log(startDate);
        //console.log("showview" + this.state.showview);
        if (this.state.showview){
        return (
          <View style={{flex: 10, flexDirection: 'column', paddingLeft: 30, paddingTop : 30, borderWidth:2, borderColor: "black"}}>
<NavigationEvents onDidFocus={() => this.setCompVal()} />
 <View style={{flex: 1, flexDirection: 'row', paddingLeft: 30, paddingTop : 30,marginLeft:-20}}>
 <View style={{width: 100, height: 50, }} >
 <TextInput
 style = {styles.registerInput1}
 placeholder ='Dream Title'
 editable = {false}//read only
 //onChangeText={title => this.setState({title})}
 value={this.state.title} maxLength={20}
 placeholderTextColor = '#253858' />
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
 //placeholder="Date:"
 //placeholderTextColor = "#151515"
 autoCapitalize = "none"
 value={startDate}/>
 {/*<Icon name='calendar' 
 size={20} color='#000000' onPress={this.showCalender}
 style={{flexDirection:'row',height:30,margin:5, marginHorizontal: 100,backgroundColor:'#FFFFFF'}}/>*/}
 </View>
 <View style={{width: wp('10%'), height:hp('5%'),top:24}} >
 <Icon name='calendar' 
 size={20} color='#000080' onPress={()=>this.showCalender()}
 />
 {this.renderPicker()}
 </View>
 </View>

 <View style={{flex: 1, flexDirection: 'row' ,alignSelf:"flex-end"}}>
 <View style={{width: wp('10%'), height:hp('5%') }} >
 <Text style={{marginLeft:-20,padding: 0, fontSize:  wp("4%"), color: "black", height:28, width:380,left:-15,top:31}}>Country:</Text>
 <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:18}}></Text>
 </View>
 <View style={{width: wp('75%'), height:hp('5%'), top: 16, right:-12 }} >
 {/* marginBottom: 200, borderWidth:2, borderColor: "black" */}
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
 {/* <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:20, top:-5}}>State:</Text> */}
 <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", height:20, width:380,left:-15,top:1}}>State:</Text>
 <Text style={{marginLeft:-20,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-2 }}></Text>
 <TextInput style= {styles.edit_input}
 underlineColorAndroid="transparent"
 //placeholder="State:"
 //placeholderTextColor = "#151515"
 autoCapitalize = "none" 
 onChangeText={this.handleState}/>
 </View>
 <View style={{width: wp('75%'), height:hp('5%'), top : -11}} >
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
 
 <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", height:20, width:380,left:-1,top:-27 }}>City:</Text> 
 <Text style={{marginLeft:-33,padding: 0, fontSize: 15, color: "black", borderBottomWidth:1, height:-7, width:380,borderColor:'#bdbdbd',left:-15,top:-29 }}></Text>
 </View>
 <View style={{width: wp('60%'), height:hp('5%'), top : -31, left:-10}} > 
 <TextInput style= {styles.edit_input}
 placeholder="Enter the city"
 value={this.state.City} maxLength={50}
 onChangeText={this.handleCity}
 editable={this.state.editMode}
 placeholderTextColor = '#bdbdbd'
 underlineColorAndroid="transparent" 
 autoCapitalize = "none" /> 
 </View>
 </View>


 <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20, paddingTop : 30}}>
 <View style={{width: wp('10%'), height:hp('5%') }} > 
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
{/* Comment by Shakthi */}
              {/* <View style={{flex: 1, flexDirection: 'row', paddingLeft: 2, paddingTop : 30}}>
                <View>              
                <TextInput style= {styles.Woke}
                underlineColorAndroid="transparent"
                placeholder="Woke up feeling:"
                placeholderTextColor = "#151515"
                autoCapitalize = "none"
                onChangeText={this.handleWoke}/>
                </View>
                <View style={{width: 60, height: 40 }} >                              
                </View>
              </View> */}
              {/* End */}

              {/* Added by Shakthi Emojies */}
               

        <Text style={styles.Woke1}> Woke up feeling:</Text> 
{/* <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',marginHorizontal:90, margin:2,left:-10,top: -8}}> */}

<View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',marginHorizontal:90, margin:20,top:-25,left:-10}}>
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
{/* <Text>Keep this dream private</Text> */}
{/* Added Checkbox for Shareable */}
{/* <Text style={styles.shareable}> his Keep this dream private</Text>  */}

{/* <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',marginHorizontal:90, margin:20,marginTop:-3,top:-1,left:-10}}></View> */}

            {/* End */}
    <CheckBox
    style={{marginLeft:1}}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    rightText={"Keep this dream private"}
    rightTextStyle={{color:'#000f55',marginLeft:1,fontFamily:'Roboto',fontWeight:'normal',}}
   uncheckedImage={<Image source={require('./../assets/ic_check_box_outline_blank.png')}/>}
    checkedImage={<Image source={require('./../assets/icons8-checked-checkbox-24.png')}/>}
    disabled={!this.state.editMode}


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



              <View style={{flex: 2, flexDirection: 'row', paddingLeft: 20, paddingTop : 30}}>
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

  console.log("img clicked");
  AsyncStorage.setItem("EmojiStatus", "angry");

  this.setState ({angryimg:'highlight',sadimg:"",calmimg:"",happyimg:"", EmojiStatus : 'angry'});

}}
handlesadHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
  //console.log("img clicked" + e.source);
  if( this.state.sadimg === 'highlight1')
  {
    //this.setState ({sadimg : ''})
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
  
  //console.log("img clicked" + e.source);
  this.setState ({calmimg:'highlight2',sadimg:"",angryimg:"",happyimg:"", EmojiStatus : 'calm'});
  AsyncStorage.setItem("EmojiStatus", "calm");
}}
handlehappyHighlight = (e) =>
{
  if(!this.state.editMode)
  return;
 // console.log("img clicked" + e.source);
 if( this.state.happyimg === 'highlight3')
  {
  AsyncStorage.setItem("EmojiStatus", 'highlight3');
    this.setState ({happyimg:'', EmojiStatus : 'happyhighlight'}); } 
     else 
  {
  
    this.setState ({happyimg:'highlight3',sadimg:"",calmimg:"",angryimg:"", EmojiStatus : 'happy'});
  AsyncStorage.setItem("EmojiStatus", "happy");
}}

}

            
/*const styles=StyleSheet.create({
            container: {
               paddingTop: 70
               
            },
            input: {
                margin: 5,
                height: 30,
                
                backgroundColor: '#ffffff',
                borderColor:'#bdbdbd',
                color:'blue',
                width: 280,
                paddingLeft: 20,
                borderBottomWidth: 2,
                
                paddingTop:10,
                shadowColor: "#bdbdbd",
    
                shadowOpacity: 5
                },
                
                
          
                 
                BackButton: {
                    backgroundColor: '#1E90FF',
                    // width: 120,
                    
                    //  height: 40,
                    width: 90,
                    height: 30,
                    color:'#FFFFFF',
                     borderRadius: 8,
                     paddingRight: 50,
                     position: 'absolute',
                     marginTop: 500,
                    marginLeft: 40,
                    fontSize: 20,
                  left: -15
                   
                 },         
                 SaveButton: {
                  backgroundColor: '#1E90FF',
                 width: 90,
                 //color:'#FFFFFF',
                  height: 30,
                  borderRadius: 8,
                  paddingRight: 50,
                  position: 'absolute',
                  marginTop: 500,
                    marginRight: 40,
                   //fontSize: 20,                                      
                 right: -15
                },        
                SaveButtonText:{
                  textAlign: 'center',
                  //color: '#ffffff',
                  fontSize: 15,
  
                },
                 Woke: {
                right: -10,
                }
      });*/
