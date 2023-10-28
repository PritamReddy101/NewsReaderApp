import {StyleSheet,Text,View,TextInput,FlatList,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { Ionicons } from '@expo/vector-icons'
import HeadlineList from '../components/HeadlineList';
import { useNavigation } from '@react-navigation/native';

const Search = (
    // {navigation}
    ) => {
    const navigation = useNavigation();
    const [SearchText, setSearchText] = useState('');
    const [Data, setData] = useState([]);
    const searchNews = async text => {
        setSearchText(text);
        if (text.length > 2) {
            const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&apiKey=a5d0794bce2d42f9a8b357bb377da1b7&q=${text}`,
            );
            const data = await response.json();
            setData(data.articles);
        }
    };
    return (
        <View style={{display:'flex', flex:1,backgroundColor:'#fff'}}>
            <View>
              <Text style={styles.appName}>Smart News</Text>
            </View>
        <View style={{display:'flex', marginTop:5}}>
        <View style={{display:'flex',flexDirection:'row', alignItems:'center', paddingTop:10, paddingBottom:10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <TextInput
            style={{flex:0.8,marginLeft:20,borderWidth:1,padding:8}}
            placeholder="🔍 Search"
            value={SearchText}
            onChangeText={text => {
              searchNews(text);
            }}
            className="text-sm text-white"
          />
        </View>
        </View>
  
        <View className="mb-16">
            <HeadlineList newsList={Data}></HeadlineList>
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            renderItem={({item, index}) => {
              return <Card item={item} navigation={navigation} index={index} />;
            }}
          /> */}
        </View>
      </View>
    );
  };
  

  const styles = StyleSheet.create({
    appName:{
        fontSize: 26,
        fontWeight: '900',
        color: 'red',
        letterSpacing:0.5
    },
  })

  export default Search;