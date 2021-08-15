import React from 'react'
import classes from './community.css'
const images=require.context('../../images',true)
const community=(props)=>{
    const community=images(`./${props.name}.jpg`).default
    return(
        <div onClick={props.clicked} className={classes.image} >
            <img className={classes.image__img} src={community} height="390px" alt={props.name}/>
            <div className={classes.image__overlay} >
                <div className={classes.image__title} >{props.name}</div>
                <p className={classes.author}>
                    {props.author}
                </p>
                <p className={classes.members}>
                    {props.members} Members
                </p>
            </div>
        </div>
    )
}

export default community