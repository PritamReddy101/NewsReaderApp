import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import HeadlineList from '../components/HeadlineList'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'


function Bookmark() {
  
    useEffect(() => {
        // Load bookmarks from AsyncStorage when the component mounts
        retrieveBookmarks();
      }, []);

    const [Data, setData] = useState([]);
    const navigation = useNavigation();
    
    const retrieveBookmarks = async () => {
        try {
          // Retrieve bookmarks from AsyncStorage and update the state
          const bookmarks = await AsyncStorage.getItem('bookmarks');
          if (bookmarks) {
            const parsedBookmarks = JSON.parse(bookmarks);
            setData(parsedBookmarks);
          }
        } catch (error) {
          console.error('Error retrieving bookmarks:', error);
        }
    };

    return (
        <View style={{display:'flex', flex:1,backgroundColor:'#fff'}}>
            <View>
            <Text style={styles.appName}>Smart News</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center',}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 22,fontWeight: '700', color:'dimgray', marginLeft:90}}>Bookmarks</Text>
            </View>
            {Data.length!=0?
            (<View className="mb-16">
                <HeadlineList newsList={Data}></HeadlineList>
            </View>):<Text style={{fontSize: 16,textAlign:'center', marginTop:Dimensions.get('screen').height*0.40}}>No bookmarks</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
  appName:{
      fontSize: 26,
      fontWeight: '900',
      color: 'red',
      letterSpacing:0.5
  },
})

export default Bookmark
