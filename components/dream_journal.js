import React,{ Component} from 'react';
import {TouchableHighlight,Animated, Alert, AsyncStorage,StyleSheet, Text, View, TextInput, TouchableOpacity ,Image,Keyboard,FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Svg} from 'expo';
import { FileSystem } from 'expo';
import Util from './utility.js';
import { SwipeListView } from 'react-native-swipe-list-view';
import PropTypes from 'prop-types';
import Pagination,{Icon,Dot} from 'react-native-pagination'
import _ from 'lodash'
import Footer from './bottomtab';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Amplify from 'aws-amplify'
import API,{graphqlOperation} from '@aws-amplify/api'
// import awsmobile from '../aws-exports'
import { createDreams } from "../src/graphql/mutations"
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

export default class App extends React.Component {
  
    static navigationOptions = {
    };
    constructor(props)
        {
          super(props)
          this.state = { 
               title: "",dreamTitle:[] ,dreamTitleTemp:[],leftPosition:80,pageTitle:"Dream Journal",dreamTitleForFile:[],filteredData:[],
               undo:null,previndex:-1
                }
               this.onViewableItemsChanged.bind(this)
               this.viewabilityConfig = { 
               waitForInteraction: true,
               viewAreaCoveragePercentThreshold: 0.70
                }
        }
    
  // REQUIRED for ReactNativePagination to work correctly
     onViewableItemsChanged = ({ viewableItems }) => {
        console.log("viewable items\r\n");
        console.log('viewableItems', viewableItems)
    
    }
 
    closeRow(rowMap, rowKey) {
        //const prevIndex = this.state.dreamTitle.findIndex(item => item.fid === rowKey);
        try{
        const prevIndex = 0;
        console.log('prev' + prevIndex + " " + rowKey);
        if (rowMap[prevIndex]) 
        {
			rowMap[prevIndex].closeRow();
    }}
    catch(e)
    {}
    }
    undoRow(){
		    const newData = [...this.state.dreamTitle];
        newData[this.state.previndex] = this.state.undo;
        this.setState({dreamTitle: newData});
        this.savefile(newData);
    }

    deleteRow(rowMap, rowKey) {
      try{
		    this.closeRow(rowMap, rowKey);
		    const newData = [...this.state.dreamTitle];
        const prevIndex = this.state.dreamTitle.findIndex(item => item.fid === rowKey);
        newData[prevIndex].IsDeleted = "true";
        console.log("index" + prevIndex);
        this.setState({ undo:this.state.dreamTitle[prevIndex] }) ;
        this.setState({previndex:prevIndex}) ;
        this.setState({dreamTitle: newData});
        this.savefile(newData);
    }
    catch(e)
    {}
    }
    async savefile(newData)
    {
     filename = FileSystem.documentDirectory + "dream" + ".json";
     let filearray = newData.map(i => i).reverse() ;
     let result;
     let dreamtitleval = "";
     try{
        for(var i=0; i< filearray.length; i++)
         {
          if(filearray[i] != undefined && filearray[i] != 'undefined')
          {
           if(i==0)
            dreamtitleval = JSON.stringify(filearray[i]);
           else
            dreamtitleval += "||" + JSON.stringify(filearray[i]);
          
          }
         }
        console.log("C" + JSON.stringify(dreamtitleval));
        }
     catch(e)
        {}
     result = await FileSystem.writeAsStringAsync(filename, dreamtitleval, { encoding: FileSystem.EncodingTypes.UTF8 });
         
     let input ={
     dreamtitle:result.title,
      dreamdescription:result.descr,
      wokeupfeeling:result.emoji,
      dreamprivacy:result.isDreamPrivate,
      Category:result.Category,
      City:result.City,
      Country:CountryStateCity.getCountryById(result.Country).name,
      State:CountryStateCity.getStateById(result.Country).name,
      Date:selectedStartDate
    }
    
    const result1 = await API.graphql(graphqlOperation(createDreams, { input }))
  
    const newDreams = result1.data.createDreams
    const updatedDreams = [newDreams, ...dreams]
    this.setState({ dreams: updatedDreams, title:"",TextInputValue:"",EmojiStatus:"",dreamprivacy:false,Category:"",City:"",
    Country:"",State:"",Date:""})
    }

  deleteSectionRow(rowMap, rowKey) {
	 this.closeRow(rowMap, rowKey);
	 var [section, row] = rowKey.split('.');
	 const newData = [...this.state.sectionListData];
	 const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
	 newData[section].data.splice(prevIndex, 1);
	 this.setState({sectionListData: newData});
	}

    onRowDidOpen = (rowKey, rowMap) => 
    {
		//console.log('This row opened', rowKey);
	}

    onSwipeValueChange = (swipeData) => 
    {
       //const { key, value } = swipeData;
	   //this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	}

    search = () =>
    {
      return(
        <Svg id='Capa_1' width="10" height="10" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966'>
        <Svg.Path fill='#bdbdbd' d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23 s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92 c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17 s-17-7.626-17-17S14.61,6,23.984,6z'/>
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
    trash = () =>
    {
      return(
        <Svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
        <Svg.Path fill='#d11a2a' d='M21 6h4v1h-17v-1h4v-1c0-1.112 0.894-2 1.997-2h5.005c1.102 0 1.997 0.895 1.997 2v1zM8 8h17v18.999c0 1.658-1.343 3.001-3 3.001h-11c-1.666 0-3-1.344-3-3.001v-18.999zM12 11v16h1v-16h-1zM16 11v16h1v-16h-1zM20 11v16h1v-16h-1zM14.003 4c-0.554 0-1.003 0.444-1.003 1v1h7v-1c0-0.552-0.438-1-1.003-1h-4.994z'/>
        </Svg>
      );
    }
    close = () =>
    {
      return(
        <Svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'>
        <Svg.Path fill='#1E90FF' d='M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z'/>
        <Svg.Path fill='#1E90FF'd='M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z' />
        </Svg>
      )
    }
    
    //for read the file  
    async readfile()
    {
      try{
      Util.readjson().then((result) => 
        {
          console.log(result+'uuu');
          this.setState({ 'dreamTitle': result.split("||").map((item,i) => ( JSON.parse(item) )).reverse() })
          console.log(JSON.stringify(this.state.dreamTitle)+"qqqq");
          this.setState({ 'dreamTitleTemp':result.split("||").map((item,i) => (JSON.parse(item))).reverse() })
          this.setState({'dreamTitleForFile' : result.split("||")});
        });
      }
      catch(e)
      {}
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
    stopwords=["a","a's","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain't","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","aside","ask","asking","associated","at","available","away","awfully","b","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","c'mon","c's","came","can","can't","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","currently","d","definitely","described","despite","did","didn't","different","do","does","doesn't","doing","don't","done","down","downwards","during","e","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","happens","hardly","has","hasn't","have","haven't","having","he","he's","hello","help","hence","her","here","here's","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn't","it","it'd","it'll","it's","its","itself","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","little","look","looking","looks","ltd","m","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn't","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","t's","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that's","thats","the","their","theirs","them","themselves","then","thence","there","there's","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're","they've","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","we'll","we're","we've","welcome","well","went","were","weren't","what","what's","whatever","when","whence","whenever","where","where's","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who's","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won't","wonder","would","wouldn't","x","y","yes","yet","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","z","zero"]
   // fltr=['a']
   for (var i=0;i<stopwords.length ;i++){
     if(text == stopwords[i])
      text = text.replace(stopwords[i], "");
     else
     {
      text = text.replace(stopwords[i] + " ", "");
      text = text.replace(" " + stopwords[i], "");
     }      
   }

   let filteredData = []; 
    if(!text)
    {  
      filteredData=this.state.dreamTitleTemp.filter(item=>{
        return ( item.dreamtitle.toLowerCase().indexOf(text) != -1  || item.descr.toLowerCase().indexOf(text) != -1 )
        });
    }    
        //  data=['a','b','d']
        //   test=data.filter(item=>{return !fltr.includes(item)})
        //   alert(test)
      
          console.log(filteredData+"filtered"); 
          //let newfilteredData=filteredData.filter(item=>{return !fltr.includes(item.descr.toLowerCase().indexOf(text)!=-1)})
    
          // for (var i=0;i<stopwords.length ;i++){
          //   for(var j=0;j<filteredData.length;j++){
          //     if(filteredData[j].descr==stopwords[i]){
           
          //      newfil=filteredData.descr.replace(stopwords[i],"")
          //       filteredData=concat(newfill,filteredData.descr)
          //     }  
          //   }
          //   console.log(filteredData+"filtered")
          //   }   
          
        
        this.setState({txt:txt,pageTitle:"Dream Search",dreamTitle:filteredData})
      
     }
    onpressfunc=()=>
    {
      try{
      this.setState({pageTitle:"Dream Search",dreamTitle:this.state.filteredData})
      }
      catch(e)
      {}
    }
    SetEmoji = (emoji) =>
    {
      try{
      if( emoji === "angry")
      return Util.angryimgHighlight();
      else if( emoji === "sad")
      return Util.sadimghighlight();
      else if( emoji === "calm")
      return Util.calmimghighlight();
      else if( emoji === "happy")
      return Util.happyimghighlight();
    }
    catch(e)
    {}
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
    addDream =async () =>
    {
      try{
        
      AsyncStorage.setItem('Menu', "AddDream");
      this.props.navigation.navigate('Main', {name: 'Jane'});
     } 
    catch(e)
    {}
  }
    editDream=(fid) =>
    {
      try
      {
      AsyncStorage.setItem('fid', fid);
      console.log(fid+"get");
      AsyncStorage.setItem('Menu', "List");
      this.props.navigation.navigate('Main', {name: 'Jane'});
    }
    catch(e)
    {}
  }
    deleteItem=(rowMap, fid) =>
    {
      console.log(fid+"wwww"+ rowMap)
      for(var i=0; i< this.state.dreamTitle.length; i++)
        {
          var j=this.state.dreamTitle[i];
          if( j!="" && j != 'undefined' )
            {
             j=JSON.parse(this.state.dreamTitle[i])
             console.log(j.fid+'fid')
               if(j.fid==fid)
                {
                 console.log("delete"+this.state.dreamTitle.length);
                 const newData = [...this.state.dreamTitle];
                 newData.splice(i,1);
                 this.setState({dreamTitle: newData});
                 console.log("delete"+this.state.dreamTitle.length);          
                 this.closeRow(rowMap, i);
                 break;
                }
            }
        }
    }

componentDidMount(prevProps) 
 {
   try
   {
  this.timeoutHandle = setTimeout(()=>{
  this.readfile();
   }, .1);
 }
 catch(e)
 {}
}

componentWillUnmount(){
  try{
  clearTimeout(this.timeoutHandle); 
 } catch(e)
 {}
}

 render() 
 {
   const {navigate} = this.props.navigation;
   return(
    <View style = {{flex:1}}> 
    <View style = {styles.subcontainer}>
        <View style={{flex:2, flexDirection: 'column'}}>
         <View style = {{width:wp('95.5%'),height:hp('23%')}}>
          <View style={{flex:2.25, flexDirection: 'row', width:wp('95.5%'),paddingLeft: 0, paddingTop : 15,borderBottomWidth:0.5,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,borderColor:'#bdbdbd'}}>
           <View style={{ height:hp('20%')}} >
            <Text style ={{color:'#253858',fontSize: 24, marginHorizontal:12,marginTop:40,textAlign:'left',height:hp('20%'),marginLeft: 20,}}>{this.state.pageTitle}</Text>
           </View>
          <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
           <View style={{borderWidth:1,borderColor:'#bdbdbd',borderRadius:4,width:wp('60%'),height:hp('4%'),marginTop:80,marginHorizontal:-120}}>
            <View style={{flexDirection:'row'}}>
              <View style = {[styles.searchicon,{marginLeft: this.state.leftPosition}]}>
                <TouchableOpacity activeOpacity = { .5 } onPress={()=>this.onpressfunc()} pointerEvents='None' >{this.search()}</TouchableOpacity>
              </View>
              <View style={{width:'50%',marginTop:3,marginBottom:3}}>
                <TextInput style={{marginLeft:3,fontSize:9,fontFamily:'Roboto'}}
                 onChangeText={(txt) => { this.handlesearch(txt) }} 
                 placeholder='Search'
                 onFocus={this.searchframe}
                 onBlur={this.searchframe2}
                 placeholderTextColor='#bdbdbd'/>
              </View>
             </View>
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
  data={this.state.dreamTitle.filter(item=>{
    return item.IsDeleted != "true"
    })}              
  showsHorizontalScrollIndicator={true}
  renderItem={({item,idx}) => {
  //console.log(item);
  if(item && item!='undefined' ){
   var temp = [];
   temp.push((item));
   return(
    <React.Fragment>
      <SwipeListView 
         useFlatList
		  data={temp}                          
		  renderItem={ (data, rowMap) => (
            <TouchableHighlight key={'t'+data.item.fid} activeOpacity = { .5 } pointerEvents='None' onPress={()=>{this.editDream(data.item.fid)}} >
             <View key={data.item.fid} style={styles.rowFront}>
              <View style={{width:wp('40%'),height:hp('5%')}}> 
               <Text key={'k'+data.item.fid} style={{marginTop:-2,fontSize:14,color:'black',marginLeft:-22}} > {data.item.dreamtitle}{data.item.fid}</Text>
               <Text key={'l'+data.item.fid} style={{marginTop:3,fontSize:12,color:'#bdbdbd',marginLeft:-22}}> {data.item.dated}</Text>
              </View>
                <Text key={'m'+data.item.fid} style={{width:wp('25%'),height:hp('5%'),marginTop:28,marginRight:-16, fontSize:10,color:'#bdbdbd',}}> {data.item.category}</Text>
              <View style={{width:wp('20%'),height:hp('5%') ,alignContent:'flex-end',alignItems:'flex-end',justifyContent:'flex-end'}} >
                {this.SetEmoji(data.item.emoji)}            
              </View>
             </View>
            </TouchableHighlight>
            )}            
		  renderHiddenItem={ (data, rowMap) => (
			<View style={styles.rowBack} key={'h'+data.item.fid}>
				<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.fid) }>
					{this.close()}
				</TouchableOpacity>
				<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.fid) }>
          {this.trash()}
				</TouchableOpacity>
			</View>
            )}
            leftOpenValue={75}
            keyExtractor={(item, index) => index.toString()}
			      rightOpenValue={-150}
			      previewRowKey={'0'}
			      previewOpenValue={-40}
			      previewOpenDelay={3000}
           />
    </React.Fragment>
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
 </View>
 {/* Code */}
 <TouchableOpacity onPress={() =>this.addDream()}  style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {/* End */}
</View>
<View style = {styles.bottomContainer}>
<Footer navigation={this.props.navigation} />
</View>
 </View>
            
          )
    }}
    const styles=StyleSheet.create({
      container: {
        backgroundColor: 'white',
        flex: 1
      },
      standalone: {
        marginTop: 30,
        marginBottom: 30,
      },
      standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: hp('9%'),
        width: wp('100%')
      },
      standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: hp('7%'),
        width: wp('100%')
        //padding: 15
      },
      backTextWhite: {
        color: '#FFF'
      },
      rowFront: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        height: hp('9%'),
        width: wp('100%'),
        flex:0.75, flexDirection: 'row', paddingTop : 0,borderBottomWidth:1,borderColor:'#bdbdbd',
        //marginLeft:-12,
      },
      rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingLeft: 15,
        height: hp('9%'),
        width: wp('98%')

      },
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        marginTop:20,
        justifyContent: 'center',
        alignContent:'center',
        position: 'absolute',
        top: 0,
        width: wp('5%'),
        height:hp('3%')
      },
      backRightBtnLeft: {
        right: 75
      },
      backRightBtnRight: {
        right: 0
      },
      controls: {
        alignItems: 'center',
        marginBottom: 30
      },
      switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
      },
      switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
      },
      trash: {
        height: 25,
        width: 25,
      },
      standalone: {
        marginTop: 30,
        marginBottom: 30,
      },
      searchicon: {
        marginLeft:80,marginTop:5,marginBottom:5, width:'5%'
          },
          fab: { 
            position: 'absolute', 
            width: 50, 
            height: 50, 
            alignItems: 'center', 
            justifyContent: 'center', 
            right: 5, 
            bottom: 30, 
            backgroundColor: '#32CD32', 
            borderRadius: 25, 
            elevation: 8 
            }, 
            fabIcon: { 
              fontSize: 45, 
              color: 'white',
              top:-1
            },
            subcontainer:{
              height:hp('91%'),
              width:wp('100%'),
              
            },
            bottomContainer:{

              height:hp('9%'),
              width:wp('100%'),
              
            },
        
        
        })