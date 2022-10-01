import { getBusinessById } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";

import ReviewForm from "../Reviews/ReviewForm";
import NavBar from "../Navigation/NavBar";

import './BusinessDetail.css'
import ReviewList from "../Reviews/ReviewList";

const BusinessDetail = () => {
    const businessId = useParams().businessId
    const dispatch = useDispatch()
    const history = useHistory()
    const businesses = useSelector((state) => state.businesses)
    const business = businesses[businessId]

    const [showForm, setShowForm] = useState(false)

    const roundStar = (num) => {
        if (num % 1 == 0) return num
        else if ((num - Math.floor(num)) >= 0.5) num = Math.ceil(num)
        else num = Math.floor(num) + 0.5
        return num
    }

    useEffect(() => {
        dispatch(getBusinessById(businessId))
    }, [dispatch])
    if (business) console.log(business)

    if (!business) return null
    return (
        <div className="business-detail-page">
            <NavBar />
            <div className="business-top-background">
                <div className="business-image">
                    <img className='detail-image' src={business.Images[0]?.url} alt='Business Image' />
                    {/* {business.Images?.map((image) => (
                        <img className='detail-image' src={image.url} alt='Business Image' />
                    ))} */}
                    <div className="business-detail-name">{business.name}</div>
                    <div className="business-detail-rating">
                        <div className="stars">
                            {Array.apply(null, { length: Math.ceil(business.avgStar) }).map((e, i) => (
                                <i className="fa-regular fa-star"></i>
                            ))} <span className="review-detail-nums">{business.numReview} reviews</span>
                        </div>
                        <div className="open-close-detail">Open {business.open} - {business.close}</div>
                    </div>
                </div>
            </div>
            <div className="business-bottom">
                <button className='form-button'
                    onClick={() => {
                        history.push(`/businesses/${businessId}/edit`)
                    }}>
                    <i className="fa-solid fa-pen-to-square" />Edit this business
                </button>
                <button className="form-button"
                    onClick={() => { setShowForm(true) }}>
                    <i className="fa-regular fa-star" />Write a review
                </button>
                <div className="business-detail">
                    {/* <div className="open-close">Close until {business.close}</div> */}
                    <div className="contact-info">
                        <div className="website">{business.website}</div>
                        <div className="phone">{business.phone}</div>
                        <div className="address">{business.address}</div>
                    </div>
                </div>
            </div>
            <div className="review-container">
                <ReviewList businessId={businessId} />
                <div className="review-profile">
                    <div className="profile-container">
                        <div className="profile-image"></div>
                        <div className="name"></div>
                    </div>
                    <div className="create-review-container">
                        <div className="stars"></div>
                        <div className="start-reivew-instruction"></div>
                    </div>
                </div>
                {/* <div className="horizontal-separator"></div>
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
                </div> */}
            </div>
            <div className="review-list-main">
                {showForm && (<ReviewForm />)}
            </div>
        </div>
    )

}
export default BusinessDetail
