import React,{Component} from 'react'
import {connect} from 'react-redux'
import classes from './Homepage.css'
import Community from '../../Components/community/community'
import * as actionCreators from '../../Store/actions/communityActions'
class HomePage extends Component{

    componentDidMount(){
        this.props.getCommunities()
    }

    cardClickHandler=(name)=>{
        console.log(name);
        const link="/"+encodeURIComponent(name)+"/posts"
        this.props.history.push(link)
    }

    render(){

        const communities=this.props.communities.map(community=>{
            return(
                <div>
                    <Community name={community.name} clicked={this.cardClickHandler.bind(this,community.name)} image={community.images[0]} author={community.author} members={community.members}/>
                </div>
            )
        })

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
        getCommunities:()=>dispatch(actionCreators.getAllCommunities())
    }
})

export default connect(mapPropsToState,mapDispatchToProps)(HomePage)