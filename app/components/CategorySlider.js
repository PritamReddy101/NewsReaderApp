import React, {useState} from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

function CategorySlider({selectCategory}) {
    const [active, setActive] = useState(1)
    const categoryList=[
        {
            id: 1,
            name: 'Top Headlines',
            category: 'general',
          },
          {
            id: 5,
            name: 'Sports',
            category: 'sports',
          },
          {
            id: 2,
            name: 'Business',
            category: 'business',
          },
          {
            id: 3,
            name: 'Entertainment',
            category: 'entertainment',
          },
          {
            id: 4,
            name: 'Health',
            category: 'health',
          },
          {
            id: 6,
            name: 'Science',
            category: 'science',
          },
          {
            id: 7,
            name: 'Technology',
            category: 'technology',
          },
    ]

    const onCategoryClick=(id)=>(
        setActive(id)
    )

    return (
        <View style={{marginTop: 10}}>
            <FlatList
                data={categoryList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>{onCategoryClick(item.id); selectCategory(item.category)}}>
                        <Text style={item.id==active?styles.selectedText:styles.unselectedText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            >
            
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    unselectedText:{
        marginRight:15,
        fontSize:21,
        fontWeight:'800',
        color:'dimgray',
    },
    selectedText:{
        marginRight:15,
        fontSize:21,
        fontWeight:'900',
        color:'red',
    }
})

export default CategorySlider