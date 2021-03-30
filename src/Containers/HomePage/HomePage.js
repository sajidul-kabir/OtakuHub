import React,{Component} from 'react'
import {connect} from 'react-redux'
import classes from './Homepage.css'
import Community from '../../Components/community/community'
class HomePage extends Component{
    render(){

        const communities=this.props.communities.map(community=>{
            return(
                <div>
                    <Community name={community.name} author={community.author} members={community.members}/>
                </div>
            )
        })


        console.log(this.props.communities);
        return(
            <div className={classes.communitiesMainDiv}>
                {communities}
            </div>
        )
    }
}


const mapPropsToState=(state)=>{
    return({
        communities:state.communityStore.communities
    })
}

const mapDispatchToProps=(dispatch=>{
    return{
        AddNewCommunity:()=>dispatch({type:"add"})
    }
})

export default connect(mapPropsToState,mapDispatchToProps)(HomePage)