
import { getBusinessesByUser } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import './BusinessList.css'
import { NavLink } from "react-router-dom";

const BusinessesListByUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businesses = useSelector((state) => state.businesses)
    const businessesArr = Object.values(businesses)

    const roundStar = (num) => {
        if (num % 1 == 0) return num
        else if ((num - Math.floor(num)) >= 0.5) num = Math.ceil(num)
        else num = Math.floor(num) + 0.5
        return num
    }

    useEffect(() => {
        dispatch(getBusinessesByUser())
    }, [dispatch])

    // if (!businessesArr.length) return null
    return (
        <div className="businesslist-main">
            <NavBar />
            {!businessesArr.length && (
                <div className="no-business-container">
                    <div className="no-business-message">You don't have any businesses yet....
                        <NavLink className="no-business-message no-business-link" to={`/businesses/create`}> Create one? </NavLink>
                    </div>
                    <div>
                        <img className="no-business-pumpkin" src={"https://pbs.twimg.com/media/EgcK9waVAAUZCqs.jpg:large"} alt='pumpkin' height={300} width={300} />
                    </div>
                </div>
            )}
            <div className="main-bottom">
                <div className="category-main"></div>
                <div className="businesslist-container">
                    {businessesArr.length > 0 && businessesArr.map((business) => (
                        <div className="business-card-container"
                            key={business.id}
                            onClick={() => { history.push(`/businesses/${business.id}`) }}>
                            <div className="business-image-container">
                                <img src={business.previewImage} alt='Business Image' height={150} width={150}
                                    onError={e => { e.currentTarget.src = "https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1543513629099-01N4YI9L13AKXEMTDKYX/Restaurant-New-Restaurant-Business.png?format=1500w"; }}
                                />
                                {/* {business['Images']?.map((image) => (
                                <img src={image.url} alt='Business Image' height={200} width={200} />
                            ))} */}
                            </div>
                            <div className="business-intro-container">
                                <div className="business-name">{business.name}</div>
                                <div className="business-rating">
                                    <div className="stars">
                                        {Array.apply(null, { length: Math.ceil(business.avgStar) }).map((e, i) => (
                                            <i className="fa-regular fa-star"></i>
                                        ))} <span className="review-nums">{business.numReview}</span>
                                    </div>
                                    {/* {roundStar(business.avgStar)} */}
                                </div>
                                <div className="open-close">Open: {business.open} - {business.close}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="map-main"></div>
            </div>
        </div>
    )
}

export default BusinessesListByUser
