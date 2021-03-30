import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import HomePage from '../Containers/HomePage/HomePage'

const routeManagement=()=>{
    return(
        <BrowserRouter>
            <Route path="/" component={HomePage}/>
        </BrowserRouter>
    )
}

export default routeManagement