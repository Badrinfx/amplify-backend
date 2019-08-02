// Implemented Flat List
import React,{ Component} from 'react';
import {Alert, AsyncStorage,StyleSheet, Text, View, TextInput, TouchableOpacity ,Image,Keyboard,FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Svg} from 'expo';
import { FileSystem } from 'expo';
import Util from './utility.js';

import Pagination,{Icon,Dot} from 'react-native-pagination'
import _ from 'lodash'



import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import obj from './utility.js';


export default class App extends React.Component {
 
 static navigationOptions = {
 };
 constructor(props){
 super(props)
 this.state = { title: "",dreamTitle:[] ,dreamTitleTemp:[],leftPosition:80,pageTitle:"Dream Journal",txt:'',newData:[]}
 this.onViewableItemsChanged.bind(this)
 this.viewabilityConfig = {
 waitForInteraction: true,
 viewAreaCoveragePercentThreshold: 0.70

 }
 
 }
 onViewableItemsChanged({viewableItems, changed}) {
 console.log('viewableItems', viewableItems)
 console.log('changed', changed)
 }

 search = () =>
 {
 return(
 <Svg id='Capa_1' width="15" height="15" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966'>
 <Svg.Path fill='#bdbdbd' d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z'
 />
 </Svg>
 );
 }
 add =() =>
 {
 return(
 <Svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
 <Svg.Circle cx='16' cy='16' r='15' fill='#32CD32' />
 <Svg.Path fill='#ffffff' d='M17.6 14.4v-4.8h-3.2v4.8h-4.8v3.2h4.8v4.8h3.2v-4.8h4.8v-3.2h-4.8z'/>
 </Svg>

 );
 }
 //for read the file 
 async readfile()
 {

 Util.readjson().then((result) => 
 {
 console.log(result+'uuu');

 this.setState({ 'dreamTitle': result.split("||") })
 this.setState({ 'dreamTitleTemp':result.split("||") })
 //this.setState({'newData':result.split("||")})

 });

 await "";
 
 }
 searchframe = () =>
{
 this.setState ({leftPosition : 10,pageTitle:"Dream Search",dreamTitle:[]})


}
searchframe2 = () =>
{
 this.setState ({leftPosition : 80, pageTitle:"Dream Journal",dreamTitle:this.state.dreamTitleTemp})

}
handlesearch = (txt) => {
 
 text=txt.toLowerCase();
 console.log(text+"txt");
 var resultsearch = [];
let newData=this.state.dreamTitleTemp.filter(item=>{
 return JSON.parse(item).dreamtitle.toLowerCase().indexOf(text) != -1 
 })

 console.log(newData+"new");
 this.setState({txt:txt,pageTitle:"Dream Search",dreamTitle:newData})
}
 
 SetEmoji = (emoji) =>
 {
 if( emoji === "angry")
 return Util.angryimgHighlight();
 else if( emoji === "sad")
 return Util.sadimghighlight();
 else if( emoji === "calm")
 return Util.calmimghighlight();
 else if( emoji === "happy")
 return Util.happyimghighlight();

 }
 addDream = () =>
{
 AsyncStorage.setItem('Menu', "AddDream");
 this.props.navigation.navigate('Main', {name: 'Jane'});
}
editDream=(fid) =>
{
 AsyncStorage.setItem('fid', fid);
 console.log(fid+"get");
 AsyncStorage.setItem('Menu', "List");
 this.props.navigation.navigate('Main', {name: 'Jane'});
}

 componentDidMount(prevProps) 
{
 this.timeoutHandle = setTimeout(()=>{
 this.readfile();
}, .1);


}

componentWillUnmount(){
 clearTimeout(this.timeoutHandle); 
}



 render() {
 
 const {navigate} = this.props.navigation;
 
 
 
 return( 
 <View style = {{flex:1}}> 
 <View style={{flex:2, flexDirection: 'column'}}>
 <View style = {{width:wp('95.5%'),height:hp('23%')}}>
 {/* <View style={{
 flexDirection: 'row', width:wp('95.5%'),paddingLeft: 0, paddingTop :10,borderBottomWidth:0.5,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderColor:'#bdbdbd'}}>
 <View style={{ height:hp('20%')}} >
 <Text
 style ={{color:'#253858',fontSize: 24, marginHorizontal:12,marginTop:30,textAlign:'left',height:hp('20%'),marginLeft: 20,}}>Dream Journal</Text>
 </View>
 <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
 <View style={{borderWidth:1,borderColor:'#bdbdbd',borderRadius:4,width:wp('60%'),height:hp('4%'),marginTop:80,marginHorizontal:-120}}>
 <View style={{ marginLeft:90,marginTop:6}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{this.search()}</TouchableOpacity>
 </View>
 <TextInput style={{marginLeft:103,marginTop:-19,fontSize:9,fontFamily:'Roboto'}}
 placeholder='Search'
 placeholderTextColor='#bdbdbd'/>
 </View>
 <View style={{marginLeft:160,marginTop:45}}>
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{Util.edit()}</TouchableOpacity>

 </View>
 
 <View style={{ marginLeft:-30,marginTop:75}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={() => this.addDream()}>{this.add()}</TouchableOpacity>
 </View>
 
 </View>
 </View> */}
 <View>
 
 </View>
 
 <View style={{flex:2.25,
 flexDirection: 'row', width:wp('95.5%'),paddingLeft: 0, paddingTop : 15,borderBottomWidth:0.5,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderColor:'#bdbdbd'}}>
 <View style={{ height:hp('20%')}} >
 <Text
 style ={{color:'#253858',fontSize: 24, marginHorizontal:12,marginTop:40,textAlign:'left',height:hp('20%'),marginLeft: 20,}}>{this.state.pageTitle}</Text>
 </View>
 <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
 <View style={{borderWidth:1,borderColor:'#bdbdbd',borderRadius:4,width:wp('60%'),height:hp('4%'),marginTop:80,marginHorizontal:-120}}>
 <View style={{flexDirection:'row'}} 
 >
 <View style = {[styles.searchicon,{marginLeft: this.state.leftPosition}]}>
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{this.search()}</TouchableOpacity>
 </View>
 <View style={{width:'50%',marginTop:5,marginBottom:3,marginLeft:5}}>
 <TextInput style={{marginLeft:3,fontSize:9,fontFamily:'Roboto'}}
 placeholder='Search'
 
 onFocus={this.searchframe}
 onBlur={this.searchframe2}
 onChangeText={(txt) => { this.handlesearch(txt) }} 
 placeholderTextColor='#bdbdbd'/>
 </View>
 {/* <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{this.search()}</TouchableOpacity> */}
 </View>
 {/* <TextInput style={{marginLeft:103,marginTop:10,fontSize:9,fontFamily:'Roboto',backgroundColor:'red'}}
 placeholder='Search'
 placeholderTextColor='#bdbdbd'/> */}
 </View>
 <View style={{marginLeft:160,marginTop:45}}>
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{Util.edit()}</TouchableOpacity>

 </View>
 
 

 <View style={{ marginLeft:-30,marginTop:75}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={() => this.addDream()}>{this.add()}</TouchableOpacity>
 </View>
 
 </View>
 </View>
 
 </View>
 
 <View style = {{width:wp('100%'),height:hp('77%')}}>
 
 <FlatList
 
 //data={this.state.dreamTitle}
 data={this.state.dreamTitle.map(item => item).reverse()}
 showsHorizontalScrollIndicator={true}
 renderItem={({item,idx}) => {
 // console.log(obj);
 
 if(item && item!='undefined'){
 item = JSON.parse(item);
 return(
 // console.log(obj);
 
 
 <TouchableOpacity key={'t'+idx} activeOpacity = { .5 } pointerEvents='None' style={{}} onPress={()=>{this.editDream(item.fid)}} >
 
 <View key={idx} style={{flex:0.75, flexDirection: 'row',width:wp('92%'),height:hp('9%'), paddingLeft: 10, paddingTop : 0,borderBottomWidth:1,borderColor:'#bdbdbd',marginLeft:12}}>
 <View style={{width:wp('40%'),height:hp('5%')}}>
 <Text key={'k'+idx} style={{marginTop:8,fontSize:14,color:'black',marginLeft:-12}} > {item.dreamtitle}</Text>
 <Text key={'l'+idx} style={{marginTop:3,fontSize:12,color:'#bdbdbd',marginLeft:-12}}> {item.dated}</Text>
 </View>
 <Text key={'m'+idx} style={{width:wp('25%'),height:hp('5%'),marginTop:31,marginRight:2, fontSize:10,color:'#bdbdbd',}}> {item.category}</Text>
 <View style={{width:wp('10%'),height:hp('5%') ,justifyContent:'flex-end'}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' style={{justifyContent:'space-around',marginTop:15,marginLeft:40}} >
 {this.SetEmoji(item.emoji)}
 </TouchableOpacity>
 
 {}
 
 </View>
 
 </View>
 </TouchableOpacity>
 
 
 ) }}}
 ref={r=>this.refs=r}
 keyExtractor={(item, index) => index.toString()}
 
 onViewableItemsChanged={this.onViewableItemsChanged}
 viewabilityConfig={this.viewabilityConfig}
 /> 
 <Pagination
 debugMode
 dotIconNameActive="contacts"
 dotTextColor="red"
 dotSwapAxis
 dotPositionSwap
 dotTextColorActive="green"
 dotTextColorNotActive="red"
 dotTextColorEmpty="#4b5258"
 dotIconColorActive="green"
 dotIconColorNotActive="red"
dotIconColorEmpty="#4b5258"
 dot={Size=12}
 paginationStyle={{ alignItems:"flex-end", justifyContent: 'space-between', position:"absolute", margin:0, bottom:150, left:0, right:0, padding:0, flex:1,height:300,}}
 listRef={this.refs}
 paginationVisibleItems={this.state.viewableItems}
 paginationItems={this.state.dreamTitle}
 paginationItemPadSize={3} 
 />
 </View>
 {/* <View style={{flex:2.25,
 flexDirection: 'row', width:wp('95.5%'),paddingLeft: 0, paddingTop : 15,borderBottomWidth:0.5,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderColor:'#bdbdbd'}}>
 <View style={{ height:hp('20%')}} >
 <Text
 style ={{color:'#253858',fontSize: 24, marginHorizontal:12,marginTop:40,textAlign:'left',height:hp('20%'),marginLeft: 20,}}>Dream Journal</Text>
 </View>
 <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
 <View style={{borderWidth:1,borderColor:'#bdbdbd',borderRadius:4,width:wp('60%'),height:hp('4%'),marginTop:80,marginHorizontal:-120}}>
 <View style={{ marginLeft:90,marginTop:6}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{this.search()}</TouchableOpacity>
 </View>
 <TextInput style={{marginLeft:103,marginTop:-19,fontSize:9,fontFamily:'Roboto'}}
 placeholder='Search'
 placeholderTextColor='#bdbdbd'/>
 </View>
 <View style={{marginLeft:160,marginTop:45}}>
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' >{Util.edit()}</TouchableOpacity>

 </View>
 
 <View style={{ marginLeft:-30,marginTop:75}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' onPress={() => this.addDream()}>{this.add()}</TouchableOpacity>
 </View>
 
 </View>
 </View> */}
 
{/* <View style={{flex:2,backgroundColor:'blue'}} >
<FlatList
 data={this.state.dreamTitle}
 renderItem={({item,idx}) => {
 // console.log(obj);
 
 
 
 if(item && item!='undefined'){
 item = JSON.parse(item);
 return(
 // console.log(obj);
 
 <TouchableOpacity key={'t'+idx} activeOpacity = { .5 } pointerEvents='None' style={{}} onPress={()=>{this.editDream(item.fid)}} >
 
 <View key={idx} style={{flex:0.75, flexDirection: 'row',width:wp('92%'),height:hp('9%'), paddingLeft: 10, paddingTop : 0,borderBottomWidth:1,borderColor:'#bdbdbd',marginLeft:12}}>
 <View style={{width:wp('40%'),height:hp('5%')}}>
 <Text key={'k'+idx} style={{marginTop:8,fontSize:14,color:'black',marginLeft:-12}} > {item.dreamtitle}</Text>
 <Text key={'l'+idx} style={{marginTop:3,fontSize:12,color:'#bdbdbd',marginLeft:-12}}> {item.dated}</Text>
 </View>
 <Text key={'m'+idx} style={{width:wp('25%'),height:hp('5%'),marginTop:28,marginRight:2, fontSize:10,color:'#bdbdbd',}}> {item.category}</Text>
 <View style={{width:wp('10%'),height:hp('5%') ,justifyContent:'flex-end'}} >
 <TouchableOpacity activeOpacity = { .5 } pointerEvents='None' style={{justifyContent:'space-around',marginTop:15,marginLeft:40}} >
 {this.SetEmoji(item.emoji)}
 </TouchableOpacity>
 
 
 
 </View>
 
 </View>
 </TouchableOpacity>
 
 ) }}}
 ref={r=>this.refs=r}
 keyExtractor={(item, index) => index.toString()}
 
 onViewableItemsChanged={this.onViewableItemsChanged}
 viewabilityConfig={this.viewabilityConfig}
 /> */}
 {/* <Pagination
 debugMode
 dotIconNameActive="contacts"
 dotTextColor="red"
 dotSwapAxis
 dotPositionSwap
 dotTextColorActive="green"
 dotTextColorNotActive="red"
 dotTextColorEmpty="#4b5258"
 dotIconColorActive="green"
 dotIconColorNotActive="red"
dotIconColorEmpty="#4b5258"
 dot={Size=12}
 paginationStyle={{ alignItems:"flex-end", justifyContent: 'space-between', position:"absolute", margin:0, bottom:150, left:0, right:0, padding:0, flex:1,height:300,}}
 listRef={this.refs}
 paginationVisibleItems={this.state.viewableItems}
 paginationItems={this.state.dreamTitle}
 paginationItemPadSize={3} 
 /> */}
{/* </View> */}
</View>
</View> 
 );
 }}
 const styles=StyleSheet.create({
 container: {
 
 
 },
 searchicon: {
 marginLeft:80,marginTop:5,marginBottom:5, width:'5%'
 },
 

 })