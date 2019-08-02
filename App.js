import {createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation';
import MainScreen from './components/main.js'
import EditScreen from './components/edit.js'
import DreamJournalScreen from './components/dream_journal.js'
import BottomtabScreen from './components/bottomtab.js'
import GetBetterScreen from './components/Getbetter.js'
import NotificationsScreen from  './components/Notifications'
import TrendingScreen from './components/Trending'
import CheckinScreen from './components/Checkin.js'
//import ShakthiEditScreen from './components/shakthiedit.js'

const MainNavigator = createStackNavigator({
    Main: {screen: MainScreen},
    Edit: {screen: EditScreen},
    DreamJournal: {screen: DreamJournalScreen},
    Bottomtab:{screen:BottomtabScreen},
    GetBetter :{screen: GetBetterScreen}, 
    Notifications:{screen: NotificationsScreen},
    Trending:{screen:TrendingScreen},
    Checkin:{screen:CheckinScreen},
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
  
});

const BottomNavigator = createBottomTabNavigator({
  //Main: {screen: MainScreen},
  Bottomtab: {screen: BottomtabScreen},
  //DreamJournal: {screen: DreamJournalScreen},
}),



App = createAppContainer(MainNavigator,BottomNavigator);

export default App; 