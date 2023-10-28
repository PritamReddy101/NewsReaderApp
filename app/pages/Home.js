import React , {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import CategorySlider from '../components/CategorySlider'
import { Ionicons } from '@expo/vector-icons'
import HeadlineSlider from '../components/HeadlineSlider'
import HeadlineList from '../components/HeadlineList'
import GlobalApi from '../services/GlobalApi'
import { useNavigation } from '@react-navigation/native'

function Home() {
    const navigation = useNavigation();
    const [newsList, setNewsList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // getTopHeadline();
        getNewsByCategory('general');
    }, [])

    const getNewsByCategory = async(category) => {
        setLoading(true)
        const result = (await GlobalApi.getByCategory(category)).data
        setNewsList(result.articles)
        setLoading(false)
    }

    const getTopHeadline = async() =>{
        const result = (await GlobalApi.getTopHeadline).data
        setNewsList(result.articles)
    }
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.appName}>Smart News</Text>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={styles.floatingButton} onPress={()=>navigation.navigate('bookmarks')}>
                        <Ionicons name="bookmark" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding:10}} onPress={()=>navigation.navigate('search')}>
                        <Ionicons name="search" size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
                <CategorySlider selectCategory={(category)=>getNewsByCategory(category)}></CategorySlider>
                {loading ? <ActivityIndicator style={{marginTop:Dimensions.get('screen').height*0.40}} size={'large'} color={'red'}/> :
                 <View>
                 <View>
                    <HeadlineSlider newsList={newsList}></HeadlineSlider>
                    
                    <HeadlineList newsList={newsList}></HeadlineList>
                </View>
                
                </View>
                
        }
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

    // floatingButton:{
    //     position:'absolute',
    //     backgroundColor: 'red',
    //     zIndex:1,
    //     borderRadius: 20,
    //     right:10,
    //     top:Dimensions.get('screen').height*0.75
    // }
})

export default Home