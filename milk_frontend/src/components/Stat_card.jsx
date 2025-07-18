
import React from 'react'
import profile_user from '../assets/profile-user.png'
import data_table_context from '../context/DataTableContext';

import { useContext } from 'react';
const Stat_card = () => {
    const context = useContext(data_table_context);
    console.log(context);
    return (
        <div className='card' >
            <img src={profile_user} alt="" />
            <span className='card_num'>714</span>
            <span className='card_title'>Monthly sales</span>
        </div>
    )
}

export default Stat_card
