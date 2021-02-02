import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { Card,Header,Body,Title,Container } from 'native-base'
const screenWidth = Dimensions.get('window').width
const shareArray = [
  {id:1, name: "L&T", buyAt: 100.00, sellAt: 112.00 },
  { id:2,name: "NHPC", buyAt: 25.60, sellAt: 28.80 },
  { id:3,name: "SBICard", buyAt: 80.00, sellAt: 85.40 },
  { id:4,name: "Appollo", buyAt: 250.00, sellAt: 195.00 },
  {id:5, name: "Edelweiss", buyAt: 290.24, sellAt: 62.80 },
  { id:6,name: "ITC", buyAt: 153.95, sellAt: 244.94 },
  { id:7,name: "TCS", buyAt: 456.00, sellAt: 561.00 },
  {id:8, name: "CEAT", buyAt: 200.00, sellAt: 205.44 },
  {id:9, name: "HDFCBank", buyAt: 806.00, sellAt: 1008.50 },
  { id:10,name: "PowerGrid", buyAt: 190.00, sellAt: 565.45 },
  {id:11, name: "AXISBank", buyAt: 30.50, sellAt: 80.54 },
  {id:12, name: "BajajFinsv", buyAt: 31.60, sellAt: 81.65 },
  {id:13, name: "CIPLA", buyAt: 140.00, sellAt: 157.45 },
  { id:14,name: "EKC", buyAt: 80.50, sellAt: 88.50 },
  { id:15,name: "EMCO", buyAt: 25.60, sellAt: 0.45 }] 
let total=0
let finalTotal=0
const App = ({ props, navigation }) => {
  const [userAmount, setUserAmount] = useState(0)
  const [showShares, setShowShares] = useState([])
  const [showList,setShowList]=useState(false) 

  // const getAmount = (amount) => {  
  //   shareArray.map((item, i) => {
  //     if (item.buyAt <= parseInt(amount)) {
  //       var dict = {}
  //       dict['buy'] = item.buyAt.toFixed(2)
  //       dict['name'] = item.name
  //       dict['profit'] = item.sellAt - item.buyAt 
  //       setShowShares(setShowShares =>[...setShowShares,dict]) 
  //       setShowList(true)
  //     }
  //   })
  //   console.log('showing array', showShares)
  // }

  const getAmount=(amount)=>{
    var array=[]
    shareArray.map((item)=>{
      if(item.buyAt <= parseInt(amount)){
        var dict = {}
        dict['buy'] = item.buyAt.toFixed(2)
        dict['name'] = item.name
        dict['profit'] = item.sellAt - item.buyAt 
        array.push(dict)
       
        total = array.reduce((prev,next) => prev + parseFloat(next.buy),0) 
        dict['totalBuyPrice'] = total //>= amount ? amount : 0
      
        setShowShares(setShowShares =>[...setShowShares,dict])  
        setShowList(true)
        console.log('======>>> final array',showShares)
      } 
    }) 
  }

  const renderList = (item) => {
    return (
    <View>
      {item.profit>0 ? 
       <Card style={styles.cardStyle}>
      
         <View style={{padding:15,flex:0.3}}>
         <Text style={{ fontSize: 16,fontWeight:'bold'}}>{item.name}</Text>
         </View>
         <View style={{padding:15,flex:0.3}}>
         <Text>Buy At: {item.buy}</Text>
         </View>
         <View style={{padding:15,flex:0.3}}>
         <Text style={{ color: "green", fontSize: 16, fontWeight: "bold" }}>Profit: {item.profit.toFixed(2)}</Text>
       </View>
     </Card>:null}
    </View>
       
      )
  }
  return (
   
      <SafeAreaView style={{flex:1}}> 
      <Container style={{flex:1}}> 
        <Header style={{backgroundColor:"#fff"}} noShadow >
          <Body>
            <Title style={{alignSelf:"center",fontSize:18,color:"#000",fontWeight:'bold'}}>Buy Shares</Title>
          </Body>
        </Header>
        <ScrollView
        keyboardShouldPersistTaps
          contentInsetAdjustmentBehavior="automatic" >
          <View style={styles.rootView}>
            <Text style={styles.enterAmountText} >Enter Amount</Text>
            <TextInput
              keyboardType={'numeric'}
              placeholder={'0'}
              style={styles.textInputStyle}
              value={userAmount}
              onChangeText={(amount) => setUserAmount(amount)} />
              <TouchableOpacity style={[{backgroundColor:userAmount ? 'black' :'gray'},styles.searchButton]} onPress={()=> userAmount ? getAmount(userAmount) : console.log('enter amount')}>
                <Text style={styles.searchTextStyle}>Calculate</Text> 
              </TouchableOpacity>
          </View>
          <Text style={{color:"#000"}}>Total:{total}</Text>
          {showList ?  
            <FlatList
            style={{paddingBottom:50}}
            keyExtractor={(item, index) => index} 
              data={showShares}//.sort((a,b)=> b.profit - a.profit)}
              renderItem={({ item }) => renderList(item)} /> :
            null}  
        </ScrollView>  
      </Container>
      </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  rootView:{
     justifyContent: "center", 
     alignItems: "center",
      padding: 20 
    },
    enterAmountText:{
       fontSize: 18, 
       fontWeight: "800"
       },

       textInputStyle:{
        paddingLeft: 10,
        marginTop: 15,
        height: 45,
        width: screenWidth - 30,
        backgroundColor: "#f3f3f3",
        borderWidth: 0.5,
        borderRadius: 10,
        fontWeight:'500',
        color:'#000'
      },
      searchButton:{
        marginTop:20,
        marginBottom:15,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:'center', 
        height:45,
        width:screenWidth/3
      },
      searchTextStyle:{
        color:"#fff",
        fontWeight:"500",
        fontSize:18
      },
      cardStyle:{ alignSelf:"center",
      marginVertical: 10, borderRadius: 15,
      borderColor: "gray", flexDirection: "row",
      width:screenWidth-30,padding:10,justifyContent:'space-between',flex:1
    }

})
export default App;
