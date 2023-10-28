import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Share, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { ScrollView } from 'react-native-gesture-handler';

function ReadNews() {
    const news = useRoute().params.news;
    const navigation = useNavigation();
    const [bookmarked, setBookmarked] = useState(false)

    useEffect(() => {
        // Load bookmarks from AsyncStorage when the component mounts
        retrieveBookmarks();
      }, []);
    
      const shareNews = () => {
        Share.share({
          message: news.title + '\nLink:' + news.url,
        });
      };
    
      const toggleBookmark = () => {
        if (bookmarked) {
          removeBookmark();
        } else {
          saveBookmark();
        }
        setBookmarked(!bookmarked);
      };
    
      const saveBookmark = async () => {
        try {
          // Get existing bookmarks from AsyncStorage or initialize an empty array
          const bookmarks = (await AsyncStorage.getItem('bookmarks')) || '[]';
          console.log(bookmarks)
          const parsedBookmarks = JSON.parse(bookmarks);
    
          // Add the new bookmark to the array
          parsedBookmarks.push(news);
          console.log(parsedBookmarks)
    
          // Save the updated array back to AsyncStorage
          await AsyncStorage.setItem('bookmarks', JSON.stringify(parsedBookmarks));
        } catch (error) {
          console.error('Error saving bookmark:', error);
        }
      };
    
      const removeBookmark = async () => {
        try {
          // Get existing bookmarks from AsyncStorage
          const bookmarks = (await AsyncStorage.getItem('bookmarks')) || '[]';
          const parsedBookmarks = JSON.parse(bookmarks);
    
          // Remove the news item from the array of bookmarks
          const updatedBookmarks = parsedBookmarks.filter((item) => item.title !== news.title);
    
          // Save the updated array back to AsyncStorage
          await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } catch (error) {
          console.error('Error removing bookmark:', error);
        }
      };
    
      const retrieveBookmarks = async () => {
        try {
          // Retrieve bookmarks from AsyncStorage and update the state
          const bookmarks = await AsyncStorage.getItem('bookmarks');
          if (bookmarks) {
            const parsedBookmarks = JSON.parse(bookmarks);
    
            // Check if the current news item is bookmarked
            const isBookmarked = parsedBookmarks.some((item) => item.title === news.title);
            setBookmarked(isBookmarked);
          }
        } catch (error) {
          console.error('Error retrieving bookmarks:', error);
        }
      };

    return (
        <ScrollView style={{backgroundColor:'#fff', flex:1}}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={styles.appName}>Smart News</Text>
                <TouchableOpacity onPress={()=>shareNews()}>
                    <Ionicons name="share-outline" size={32} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{marginTop:10, marginBottom:10, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>toggleBookmark()}>
                {bookmarked?<Ionicons name="bookmark" size={32} color="black" />:<Ionicons name="bookmark-outline" size={30} color="black" />}
                </TouchableOpacity>
            </View>
            <Image source={{uri:news.urlToImage}} style={{width:'100%', height:300, borderRadius:15}} />
            
            <Text style={{marginTop:10, color:'red', fontSize:16}}>{news.source.name}</Text>
            <Text style={{marginTop:10, fontSize:22, fontWeight:'bold'}}>{news.title}</Text>
            <Text style={{marginTop:10, fontSize:18, color:'gray', lineHeight:25}}>{news.description}</Text>
            <TouchableOpacity onPress={()=>WebBrowser.openBrowserAsync(news.url)}>
                <Text style={{marginTop:10, fontSize:16, fontWeight:'bold',color:'red'}}>Read More</Text>
            </TouchableOpacity>
        </ScrollView>
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

export default ReadNews