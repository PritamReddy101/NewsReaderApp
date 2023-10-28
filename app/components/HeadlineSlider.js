import { useNavigation } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import GlobalApi from '../services/GlobalApi'

function HeadlineSlider({newsList}) {
    const navigation = useNavigation();
    return (
        <View style={{marginTop:15}}>
            <FlatList
                data={newsList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=>(
                    item.description?(
                    <TouchableOpacity onPress={()=>navigation.navigate('read-news',{news:item})}
                        style={{width:Dimensions.get('screen').width*0.80, marginRight:15}}>
                        <Image source={{uri:item.urlToImage}}
                            style={{height:Dimensions.get('screen').width*0.77, borderRadius:10}}
                        />
                        <Text numberOfLines={3} style={{marginTop:10, fontSize:23, fontWeight:'900'}}>{item.title}</Text>
                        <Text style={{marginTop:5, color:'red'}}>{item?.source?.name}</Text>
                    </TouchableOpacity>
                ):null)}
                >

            </FlatList>
        </View>
    )
}

export default HeadlineSlider
