import Logo from './Images/Logo.png'
import React from 'react'

const TopBar = () => {
    return (
        <div className="top-bar-container"
            style={{
                display: 'flex',
                backgroundColor: '#c41200',
                fontFamily: 'Comic Sans MS, Comic Sans, cursive',
                color: 'whitesmoke',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <img src={Logo} alt='Logo' height={50} width={50} />
            <div>Cutielp</div>
        </div>
    )
}

export default TopBar
