const initialState={
    communities:[
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
        {
            name:"One Piece",
            author:"Eiichiro Oda",
            members:Math.floor(Math.random() * 6969),
        },
    ]
}

const communityStore=(state=initialState,action)=>{
    switch(action.type){
        case "add":
            return({
                ...state,
                communities:["hehehehhe","hahhaha"]
            })
        default:
            return state
    }
}
export default communityStore