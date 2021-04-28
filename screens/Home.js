import React,{useState,useEffect} from "react"
import {
  StyleSheet,
  ScrollView
} from 'react-native'
import {Fab,
  Icon,
  List,
  ListItem,
  Left,
  Button,
  Right,
  Title,
  CheckBox,
  Subtitle,
  Container,
  H1,
  Text,
  Body,
  Spinner
} from "native-base"

import AsyncStorage from '@react-native-community/async-storage'
import {useIsFocused} from '@react-navigation/native'

const Home=({navigation,route})=>{
const [listOfSeries, setListOfSeries] = useState(['hey'])
const [loading, setLoading] = useState(false)

const isFocused=useIsFocused()
const getList=async()=>{
setLoading(true)
const storedValue=await AsyncStorage.getItem('@season_list')
if(!storedValue){
setListOfSeries([isFocused])
}
const list=JSON.parse(storedValue)
setListOfSeries(list);
setLoading(false)

}
const deleteSeries=async (id)=>{
const newList=await listOfSeries.filter((list)=>list.id !==id)
await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
setListOfSeries(newList)
}
const markSeries=async (id)=>{
const newArr=listOfSeries.map((list)=>{
  if(list.id==id){
    list.isWatched=!list.isWatched
  }
  return list
})

await AsyncStorage.setItem('@season_list',JSON.stringify(newArr))
setListOfSeries(newArr)
}

useEffect(() => {
  getList();
}, [isFocused])
if(loading){
  return (
    <Container style={styles.container}>
      <Spinner color='blue'/>
    </Container>
  )
}
return(
    <ScrollView contentContainerStyle={styles.container}>
     {listOfSeries.length==0 ?(
       <Container>
         <H1 style={styles.heading}> Empty list</H1>
       </Container>
     )
     :
     (<>
     <H1 style={styles.heading}> Next to watch</H1>
     <List>
     {listOfSeries.map((s)=>(
         <ListItem key={s.id} style={styles.listItem} noBorder>
         <Left>
           <Button style={styles.actionButton} 
           onPress={()=>deleteSeries(s.id)}
           danger>
             <Icon name="trash" active/>
           </Button>
           <Button style={styles.actionButton} 
           onPress={()=>{navigation.navigate('Edit',{s})}}
           >
             <Icon name="edit" active type="Feather"/>
           </Button>
         </Left>
         <Body>
           <Title style={styles.seasonName}>{s.name}</Title>
           <Text note>{s.season}</Text>
         </Body>
         <Right>
           <CheckBox checked={s.isWatched}
           onPress={()=>markSeries(s.id)}
           />
         </Right>
       </ListItem>
       ))}
     </List>
     </>)}

     <Fab
     style={{backgroundColor:"#5067ff"}}
     position='bottomRight'
     onPress={()=>navigation.navigate('Add')}>
       <Icon name='add'/>
     </Fab>
    </ScrollView>
)
}
const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 5,
    },
    actionButton: {
      marginLeft: 5,
    },
    seasonName: {
      color: '#fdcb9e',
      textAlign: 'justify',
    },
    listItem: {
      marginLeft: 0,
      marginBottom: 20,
    },
  });
  
export default Home;