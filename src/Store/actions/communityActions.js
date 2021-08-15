import axios from '../../axios/axios'

const storeCommunities=(communities)=>{
    return{
        type:"STORE",
        value:communities
    }
}

export const getAllCommunities=()=>{
    return dispatch=>{
        axios.get("/api/communities")
            .then(response=>{
                dispatch(storeCommunities(response.data.data.communities))
            })
    }
}