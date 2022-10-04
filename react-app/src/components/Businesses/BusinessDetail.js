import { getBusinessById } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";

import ReviewForm from "../Reviews/ReviewForm";
import NavBar from "../Navigation/NavBar";

import './BusinessDetail.css'
import './BusinessList.css'
import ReviewList from "../Reviews/ReviewList";

import { Modal } from "../context/Modal"
import { getReviewsByBusinessId } from "../../store/review";

const BusinessDetail = () => {
    const businessId = +useParams().businessId
    const dispatch = useDispatch()
    const history = useHistory()
    const businesses = useSelector((state) => state.businesses)
    const reviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session.user)
    const business = businesses[businessId]
    let reviewsArr
    if (reviews) reviewsArr = Object.values(reviews)

    // console.log('*************business', business)
    const [showModal, setShowModal] = useState(false)
    const [businessNotFound, setBusinessNotFound] = useState(false)
    const [businessLoaded, setBusinessLoaded] = useState(false)


    const roundStar = (num) => {
        if (num % 1 == 0) return num
        else if ((num - Math.floor(num)) >= 0.5) num = Math.ceil(num)
        else num = Math.floor(num) + 0.5
        return num
    }

    const starPercent = () => {
        let dic = {}
        if (business) {
            if (reviewsArr) {
                for (let review of reviewsArr) {
                    if (!dic[review.stars]) {
                        dic[review.stars] = 1
                    }
                    else {
                        dic[review.stars]++
                    }
                }
                for (let i = 1; i <= 5; i++) {
                    if (!dic[i]) { dic[i] = 0 }
                    if (dic[i]) { dic[i] = Math.round(dic[i] / business.numReview * 100) }
                }
                return dic
            }
        }
    }

    useEffect(() => {
        (async () => {
            const res = await dispatch(getBusinessById(businessId))
            if (!res) {
                setBusinessNotFound(true)
            }
            setBusinessLoaded(true)
        })()
    }, [dispatch, reviews, businessId, setBusinessLoaded])

    if (!businessLoaded) return null

    function redirect() {
        setTimeout(() => { history.push(`/`) }, 1500)
    }

    if (businessNotFound) {
        return (
            <div>
                <h1 className='business-not-exist'>Business does not exist...redirecting</h1>
                {redirect()}
            </div>
        )
    }



    return businessLoaded && business ? (
        <div className="business-detail-page">
            <NavBar />
            <div className="business-top-background">
                <div className="business-image">
                    <img className='detail-image' src={business.previewImage} alt='Business Image'
                        onError={e => { e.currentTarget.src = "https://images.squarespace-cdn.com/content/v1/56a2785c69a91af45e06a188/1543513629099-01N4YI9L13AKXEMTDKYX/Restaurant-New-Restaurant-Business.png?format=1500w"; }} />
                    {/* {business.Images?.map((image) => (
                        <img className='detail-image' src={image.url} alt='Business Image' />
                    ))} */}
                    <div className="business-detail-name">
                        {business.name}
                    </div>
                    <div className="business-detail-rating">
                        <div className="stars-container">
                            {Array.apply(null, { length: Math.ceil(business.avgStar) }).map((e, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                            ))}
                            {Array.apply(null, { length: Math.floor(5 - business.avgStar) }).map((e, i) => (
                                <i key={i} className="fa-regular fa-star"></i>
                            ))}
                            <span className="review-detail-nums">{business.numReview} reviews</span>
                        </div>
                        <div className="open-close-detail">
                            {Array.apply(null, { length: Math.floor(business.priceRange) }).map((e, i) => (
                                <span key={i} className="priceRange-detail">$</span>
                            ))}
                            <span>Open: </span>
                            <span>{business.open} - {business.close}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="business-bottom">
                <div className="horizontal-separator"></div>
                <div className="detail-about-container">
                    <div className="about-box">
                        <div className="detail-about-title">About</div>
                        <div className="detail-description">{business.description}</div>
                    </div>
                    <div className="business-detail">
                        <div className="contact-info">
                            <div className="phone">
                                <span >{business.phone}</span>
                            </div>
                            <div className="address">
                                <span>{business.address}</span>
                                <div className="city-state">
                                    {business.city}, {business.state}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {user?.id === business.ownerId && (
                    <button className='form-button'
                        onClick={() => {
                            history.push(`/businesses/${businessId}/edit`)
                        }}>
                        <i className="fa-solid fa-pen-to-square" />Edit this business
                    </button>
                )}
                <div className="review-list-container">
                    <div className="review-overview-container">
                        <div className="overall-rating-container">
                            <div className="review-overview-title">Reviews</div>
                            <div className="overall-rating-title">
                                Overall rating
                                <div className="stars-container">
                                    <div>
                                        {Array.apply(null, { length: Math.ceil(business.avgStar) }).map((e, i) => (
                                            <i className="fa-solid fa-star"></i>
                                        ))}
                                        {Array.apply(null, { length: Math.floor(5 - business.avgStar) }).map((e, i) => (
                                            <i className="fa-regular fa-star"></i>
                                        ))}
                                    </div>
                                    <span className="review-overall-nums">{business.numReview} reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className="rating-bar-container">
                            <div className="rating-bar-fields">
                                <div className="rating-bar-label">stars5</div>
                                <div className="rating-bar-background">
                                    {starPercent() && reviewsArr.length > 0 && (
                                        <div className="rating-bar" style={{ width: `${starPercent()[5]}%`, backgroundColor: 'rgb(251,80,60)' }}></div>
                                    )}
                                </div>
                            </div>
                            <div className="rating-bar-fields">
                                <div className="rating-bar-label">stars4</div>
                                <div className="rating-bar-background">
                                    {starPercent() && reviewsArr.length > 0 && (
                                        <div className="rating-bar" style={{ width: `${starPercent()[4]}%`, backgroundColor: 'rgb(253,100,62)' }}></div>
                                    )}
                                </div>
                            </div>
                            <div className="rating-bar-fields">
                                <div className="rating-bar-label">stars3</div>
                                <div className="rating-bar-background">
                                    {starPercent() && reviewsArr.length > 0 && (
                                        <div className="rating-bar" style={{ width: `${starPercent()[3]}%`, backgroundColor: 'rgb(254,135,66)' }}></div>
                                    )}
                                </div>
                            </div>
                            <div className="rating-bar-fields">
                                <div className="rating-bar-label">stars2</div>
                                <div className="rating-bar-background">
                                    {starPercent() && reviewsArr.length > 0 && (
                                        <div className="rating-bar" style={{ width: `${starPercent()[2]}%`, backgroundColor: 'rgb(254,173,72)' }}></div>
                                    )}
                                </div>
                            </div>
                            <div className="rating-bar-fields">
                                <div className="rating-bar-label">stars1</div>
                                <div className="rating-bar-background">
                                    {starPercent() && reviewsArr.length > 0 && (
                                        <div className="rating-bar" style={{ width: `${starPercent()[1]}%`, backgroundColor: 'rgb(255,204,75)' }}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReviewList businessId={business.id} />
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
                </div>
                <div className="review-list-main">
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ReviewForm setShowModal={setShowModal} />
                    </Modal>)}
            </div>
        </div >
    ) : null

}
export default BusinessDetail
