import axios from '../../axios/axios'
import React,{Component} from 'react'

class Post extends Component{

    componentDidMount(){
        const animeName=this.props.match.params.anime
        const newLink="/api/communities/"+animeName
        console.log(newLink);
        axios.get(newLink)
            .then(response=>{
                console.log(response);
            })
    }


    render(){
        return(
            <h1 style={{textAlign:"center"}}>{this.props.match.params.anime}</h1>
        )
    }

}

export default Post