import Logo from './Images/Logo.png'
import React from 'react'
import { useHistory } from 'react-router-dom'

const TopBar = () => {
    const history = useHistory()
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => { history.push('/') }}
            >
                <img src={Logo} alt='Logo' height={50} width={50} />
                <div>Cutielp</div>
            </div>
        </div>
    )
}

export default TopBar
