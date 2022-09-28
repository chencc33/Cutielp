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

    useEffect(() => {
        dispatch(getBusinessById(businessId))
    }, [dispatch])

    if (!business) return null
    return (
        <>
            <div className="business-top-background">
                <div className="business-image">
                    <div className="business-name">{business.name}</div>
                    <div className="business-rating">
                        <div className="stars"></div>
                        <div className="review-num"></div>
                    </div>
                </div>
            </div>
            <div className="business-detail">
                <div className="open-close"></div>
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
            <BusinessForm businessId={businessId} />
        </>
    )

}
export default BusinessDetail
