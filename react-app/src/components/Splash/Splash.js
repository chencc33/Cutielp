import { NavLink, useHistory } from 'react-router-dom'
import NavBar from '../Navigation/NavBar'
import splash1 from '../Images/splash1.jpg'
import splash2 from '../Images/splash2.jpg'
import splash3 from '../Images/splash3.jpg'
import splash4 from '../Images/splash4.jpg'
import { useEffect, useState } from 'react'

import './splash.css'


function SplashPage() {
    const imagesArr = [splash1, splash2, splash3, splash4]
    const quotesArr = [
        'Food tastes better when you eat it with your family',
        'Meal memories are made here',
        'You cannot tell a hungry child that you gave him food yesterday',
        'Happiness is kids eathing their food no matter what.'
    ]

    const history = useHistory()
    const [splashIdx, setSplashIdx] = useState(0)
    const [quoteIdx, setQuoteIdx] = useState(0)

    useEffect(() => {
        const backgroundInterval = setInterval(() => {
            setSplashIdx((pre) => ++pre % imagesArr.length)
        }, 5000)
        return () => {
            clearInterval(backgroundInterval)
        }
    }, [])

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setQuoteIdx((pre) => ++pre % quotesArr.length)
        }, 5000)
        return () => {
            clearInterval(quoteInterval)
        }
    }, [])

    return (
        <div className='splash-container'
            style={{
                backgroundImage: `url(${imagesArr[splashIdx]})`,
                width: '100vw',
                height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} >
            <div className='splash'>
                <div className='splash-nav'>
                    <NavBar isSplash={true} />
                </div>
                <div className='splash-content'
                    style={{
                        position: 'fixed',
                        top: '30%',
                        left: '10%',
                        width: '50vw'
                    }}>
                    <p className='splash-text'
                        style={{
                            color: 'whitesmoke',
                            fontFamily: 'Comic Sans MS, Comic Sans, cursive',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            textShadow: '1.5px 1.5px gray'
                        }}>
                        {quotesArr[quoteIdx]}</p>
                    <button className='redirect-business'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#c41200',
                            border: 'none',
                            borderRadius: '5px',
                            color: 'whitesmoke',
                            cursor: 'pointer',
                            fontSize: 'smaller'
                        }}
                        onClick={() => { history.push('/businesses/all') }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <p>Explore Restaurants</p>
                    </button>
                </div>
            </div>
            <div className="splash-footer"
                style={{
                    position: 'absolute',
                    left: '0',
                    bottom: '0',
                    // marginTop: '500px',
                    textAlign: 'center',
                    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
                    color: 'black',
                    fontWeight: 'bold'
                }}>
                Chen Chen
                <div className='splashpage-profile-container'
                    style={{
                        color: 'whitesmoke'
                    }}>
                    <a href="https://github.com/chencc33" target="_blank">
                        <i className="fa-brands fa-square-github devLinks"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/chencc33" target="_blank">
                        <i className="fa-brands fa-linkedin devLinks"></i>
                    </a>
                </div>
            </div>
        </ div>
    )
}

export default SplashPage
