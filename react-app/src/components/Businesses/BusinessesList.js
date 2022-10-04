import businessesReducer, { getBusinesses } from "../../store/business";
import { getBusinessesByUser } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import BusinessForm from "./BusinessForm";
import { useHistory } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import './BusinessList.css'

const BusinessesList = () => {
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
        dispatch(getBusinesses())
    }, [dispatch])

    if (!businessesArr.length) return null
    return (
        <div className="businesslist-main">
            <NavBar />
            <div className="main-bottom">
                <div className="category-main"></div>
                <div className="businesslist-container">
                    {businessesArr.map((business) => (
                        <div className="business-card-container"
                            key={business.id}
                            onClick={() => { history.push(`/businesses/${business.id}`) }}>
                            <div className="business-image-container">
                                <img src={business.previewImage} alt='Business Image'
                                    height={180} width={180}
                                    onError={e => { e.currentTarget.src = "https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1543513629099-01N4YI9L13AKXEMTDKYX/Restaurant-New-Restaurant-Business.png?format=1500w"; }}
                                />
                                {/* {business['Images'] ?
                                    <img src={business['Images'][0].url} alt='Business Image' height={200} width={200} /> :
                                    <img src="https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-580x348.jpg" alt='Business Image' height={200} width={200} />
                                } */}
                            </div>
                            <div className="business-intro-container">
                                <div className="business-name">{business.name}</div>
                                <div className="business-rating">
                                    <div className="stars-container">
                                        {Array.apply(null, { length: Math.ceil(business.avgStar) }).map((e, i) => (
                                            <i key={i} className="fa-solid fa-star"></i>
                                        ))}
                                        {Array.apply(null, { length: Math.floor(5 - business.avgStar) }).map((e, i) => (
                                            <i key={i} className="fa-regular fa-star"></i>
                                        ))}
                                        <span className="review-nums">{business.numReview}</span>
                                    </div>
                                </div>
                                <div className="open-close"><span className="open">Open: </span>{business.open} - {business.close}</div>
                                <div className="description">{business.description}</div>
                            </div>
                            <div className="horizontal-separator "></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BusinessesList
