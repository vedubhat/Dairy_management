import React from 'react'
import profile_user from '../assets/profile-user.png'
const Stat_card = () => {
  return (
    <div className='card'>
        <img src={profile_user} alt="" />
        <span className='card_num'>714</span>
        <span className='card_title'>Monthly sales</span>
    </div>
  )
}

export default Stat_card
