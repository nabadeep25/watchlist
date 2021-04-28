import React,{useEffect,useState} from "react"
import {StyleSheet,ScrollView} from 'react-native'
import {
  Form,Item,Input,
 

  Button,
 
  Container,
  H1,
  Text,
  
} from "native-base"

import AsyncStorage from '@react-native-community/async-storage'


const Edit=({navigation,route})=>{
  const [name, setName] = useState('');
    const [season, setSeason] = useState('');
    const [id, setId] = useState(null)
    const update=async ()=>{
      try {
        if(!name || !season)
        return alert('Fill both fields')
        //TODO add snackbar
        const series={
          id,
          name,
          season,
          isWatched:false
     
        }
        const storedValue=await AsyncStorage.getItem('@season_list')
       const list=await JSON.parse(storedValue);
       list.map((s)=>{
         if(s.id==id){
           s.name=name;
           s.season=season;
         }
         return s;
       })
       await AsyncStorage.setItem('@season_list',JSON.stringify(list))
       navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }

    }
    useEffect(() => {
      const {series}=route.params;
      console.log(series)
      const {id,name,season}=series;
      setId(id)
      setName(name)
      setSeason(season)
    }, [])
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
           onPress={update}
           ><Text style={{color:"#fff"}}>Update</Text></Button>
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
export default Edit;