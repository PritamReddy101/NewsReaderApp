import { create } from 'apisauce'

const api = create({
  baseURL: 'https://newsapi.org/v2',
})

const apiKey='a5d0794bce2d42f9a8b357bb377da1b7'

const getTopHeadline = api.get('/top-headlines?country=in&apiKey='+apiKey)

const getByCategory = (category) => api.get('/top-headlines?country=in&apiKey=' + apiKey  + '&category=' + category)

//https://newsapi.org/v2/top-headlines?country=in&apiKey=9b2bec38269a4a7ab665833a16afe05f&category=${category}

export default{
    getTopHeadline,
    getByCategory
}

///top-headlines?country=us&apiKey=3cf8c997e953491fa4b6a5010a625b5e