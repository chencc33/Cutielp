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
    console.log('**********', businessesArr[0]['Images'])

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    if (!businessesArr.length) return null
    return (
        <>
            <NavBar />
            {/* <button onClick={() => (setShowForm(true))}>Create a Business</button> */}
            <div className="horizontal-separator" />
            <div className="businesslist-main">
                {businessesArr.map((business) => (
                    <div className="business-card-container"
                        key={business.id}
                        onClick={() => { history.push(`/businesses/${business.id}`) }}>
                        <div className="business-image-container">
                            <img src={business['Images'][0]?.url} alt='Business Image' height={150} width={150} />
                            {/* {business['Images']?.map((image) => (
                                <img src={image.url} alt='Business Image' height={200} width={200} />
                            ))} */}
                        </div>
                        <div className="business-intro-container">
                            <div className="business-name">{business.name}</div>
                            <div className="business-rating">
                                <div className="stars">Stars: {business.avgStar}</div>
                                <div className="review-num">Reviews: {business.numReview}</div>
                            </div>
                            <div className="open-close">Close: {business.close}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* {showForm && (<BusinessForm />)} */}
        </>
    )
}

export default BusinessesList
