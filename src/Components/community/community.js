import React from 'react'
import redo from './304-3049844_cool-luffy-wallpaper-one-piece-luffy.png'
import classes from './community.css'
const community=(props)=>{
    return(
        <div className={classes.image} >
            <img className={classes.image__img} src={redo} alt="Bricks"/>
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