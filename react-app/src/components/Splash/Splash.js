import { NavLink } from 'react-router-dom'
import NavBar from '../Navigation/NavBar'
import splash1 from '../Images/splash1.jpg'
import splash2 from '../Images/splash2.jpg'
import splash3 from '../Images/splash3.jpg'
import splash4 from '../Images/splash4.jpg'
import { useEffect, useState } from 'react'


function SplashPage() {
    const imagesArr = [splash1, splash2, splash3, splash4]
    const quotesArr = [
        'Food tastes better when you eat it with your family',
        'Meal memories are made here',
        'You cannot tell a hungry child that you gave him food yesterday',
        'Happiness is kids eathing their food no matter what.'
    ]

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
                width: '100vw', height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} >
            <div className='splash'>
                <div className='splash-nav'>
                    <NavBar isSplash={true} />
                </div>
                <div className='splash-content'>
                    <p className='splash-text'
                        style={{
                            color: 'whitesmoke',
                            fontFamily: 'Comic Sans MS, Comic Sans, cursive',
                            fontSize: '30px'
                        }}>
                        {quotesArr[quoteIdx]}</p>
                    <button className='direct-business'>Explore</button>
                </div>
            </div>
        </ div>
    )
}

export default SplashPage
