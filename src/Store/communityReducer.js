const initialState={
    communities:[],
}

const communityStore=(state=initialState,action)=>{
    switch(action.type){
        case "STORE":
            return(
                {
                    ...state,
                    communities:action.value,
                }
            )
        default:
            return state

    }
}
export default communityStore