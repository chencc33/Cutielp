import { getBusinessById } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import BusinessForm from "./BusinessForm";

const BusinessDetail = () => {
    const businessId = useParams().businessId
    const dispatch = useDispatch()
    const businesses = useSelector((state) => state.businesses)
    const business = businesses[businessId]

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getBusinessById(businessId))
    }, [dispatch])
    if (business) console.log(business)

    if (!business) return null
    return (
        <>
            <div className="business-top-background">
                <div className="business-image">
                    {business.Images?.map((image) => (
                        <img src={image.url} alt='Business Image' height={200} width={200} />
                    ))}
                    <div className="business-name">{business.name}</div>
                    <div className="business-rating">
                        <div className="stars">Stars: {business.avgStar}</div>
                        <div className="review-num">Reviews: {business.numReview}</div>
                    </div>
                </div>
            </div>
            <div className="business-detail">
                <div className="open-close">Open until {business.close}</div>
                <div className="contact-info">
                    <div className="website">{business.website}</div>
                    <div className="phone">{business.phone}</div>
                    <div className="address">{business.address}</div>
                </div>
            </div>
            <div className="review-container">
                <div className="review-profile">
                    <div className="profile-container">
                        <div className="profile-image"></div>
                        <div className="name"></div>
                    </div>
                    <div className="create-review-container">
                        <div className="stars"></div>
                        <div className="start-reivew-instruction"></div>
                        <button className="create-review-button">Write a review</button>
                    </div>
                </div>
                <div className="review-info-container">
                    <div className="stars-container"></div>
                    <div className="bars-container"></div>
                </div>
                <div className="review-card-container">
                    <div className="user-profile-container">
                        <div className="profile-image"></div>
                        <div className="name"></div>
                    </div>
                    <div className="stars"></div>
                    <div className="review-content"></div>
                </div>
            </div>
            <button onClick={() => {
                setShowForm(true)
            }}>Edit this business</button>
            {showForm && (<BusinessForm businessId={businessId} />)}
        </>
    )

}
export default BusinessDetail
