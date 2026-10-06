import axios from 'axios'
export const baseUrl='http://localhost:9200'

export const postApiData=async(endPoint,data)=>{
    const response=await axios.post(`${baseUrl}/${endPoint}`,data)
    const result=await response.data
    return result;
}
export const getApiData=async(endPoint)=>{
    const response=await axios.get(`${baseUrl}/${endPoint}`)
    const result=await response.data
    return result;
}
export const deleteApiData=async(endPoint)=>{
    const response=await axios.delete(`${baseUrl}/${endPoint}`)
    const result=await response.data
    return result;
}