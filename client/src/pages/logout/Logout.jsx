import "./logout.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableLogout from "../../components/datatable/DatatableLogout"
import React from 'react';

const Logout = () => {
return ( 
<div className="stock">
    <Sidebar/>
    <div className="stockContainer">
    <Navbar/>
    
    <DatatableLogout/>
    </div>
</div>
)
}

export default Logout;