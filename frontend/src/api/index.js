import axios from 'axios';

const URL = "http://localhost:5000/";

export const getData = async() =>{
    try{
        const {data} = await axios.get(URL);
        return data;
    }
    catch(e){
        console.log(e);
    }
}

export const postData = async(postData) =>{
    try{
        const {data} = await axios.post(URL+'add',postData);
        return data;
    }
    catch(e){
        console.log(e);
    }
}