import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, FlatList, TouchableOpacity, Image, Text} from 'react-native'

function HeadlineList({newsList}) {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList
                data={newsList}
                renderItem={({item})=>(
                    item.description?(
                    <View>
                        <View style={{height:1, backgroundColor:'lightgrey', marginTop:10, marginLeft:-20}}></View>
                        <TouchableOpacity style={{marginTop:15, display:'flex', flexDirection:'row'}} onPress={()=>navigation.navigate('read-news',{news:item})}>
                            <Image source ={{uri:item.urlToImage}} 
                                style={{width:130, height:130, borderRadius:10}}
                            />
                            <View style={{marginRight:135, marginLeft:10}}>
                                <Text numberOfLines={4} style={{fontSize:18, fontWeight:'bold'}}>{item.title}</Text>
                                <Text style={{color:'red', marginTop:6}}>{item?.source?.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>):null
                )}
            >
            </FlatList>
        </View>
    )
}

export default HeadlineList
