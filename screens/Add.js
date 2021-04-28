import React,{useState} from "react"
import {Text,StyleSheet,ScrollView} from 'react-native'
import {Container,Form,Item,Input,Button,H1} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'

const Add=({navigation})=>{
    const [name, setName] = useState('');
    const [season, setSeason] = useState('');

    const addToList=async ()=>{
 try {
   if(!name || !season)
   return alert('Fill both fields')
   //TODO add snackbar
   const series={
     id:shortid.generate(),
     name:name,
     season:season,
     isWatched:false

   }
   const storedValue=await AsyncStorage.getItem('@season_list')
   const prevList=await JSON.parse(storedValue);
   if(!prevList){
     const newList=[series]
     await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
   }else{
     prevList.push(series)
     await AsyncStorage.setItem('@season_list',JSON.stringify(prevList))
   }
   navigation.navigate('Home')

 } catch (error) {
   console.log(error)
 }
    }

return(
    <Container>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
           <H1 style={styles.heading}>Add to List</H1>
           <Form>
               <Item rounded style={styles.formItem}>
                   <Input placeholder='Series Name' 
                   style={{color:'#000'}}
                   value={name}
                   onChangeText={(text)=>setName(text)}
                   />
               </Item>
               <Item rounded style={styles.formItem}>
                   <Input placeholder='Season Number'
                    style={{color:'#000'}}
                    value={season}
                    onChangeText={(s)=>setSeason(s)}
                    />
               </Item>
               <Button rounded block
               onPress={addToList}
               ><Text style={{color:"#fff"}}>Add</Text></Button>
           </Form>
        </ScrollView>
    </Container>
)
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });
  
export default Add;