import businessesReducer, { getBusinesses } from "../../store/business";
import { getBusinessesByUser } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import BusinessForm from "./BusinessForm";
import { useHistory } from "react-router-dom";

const BusinessesList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businesses = useSelector((state) => state.businesses)
    const businessesArr = Object.values(businesses)

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    if (!businessesArr.length) return null
    return (
        <>
            <button onClick={() => (setShowForm(true))}>Create a Business</button>
            <div className="horizontal-separator" />
            {businessesArr.map((business) => (
                <div className="business-container"
                    key={business.id}
                    onClick={() => { history.push(`/businesses/${business.id}`) }}>
                    <div className="business-image">
                        {business['Images']?.map((image) => (
                            <img src={image.url} alt='Business Image' height={200} width={200} />
                        ))}
                    </div>
                    <div className="business-into-container">
                        <div className="business-name">{business.name}</div>
                        <div className="business-rating">
                            <div className="stars">Stars: {business.avgStar}</div>
                            <div className="review-num">Reviews: {business.numReview}</div>
                        </div>
                        <div className="open-close">Close: {business.close}</div>
                    </div>
                </div>
            ))}
            {showForm && (<BusinessForm />)}
        </>
    )
}

export default BusinessesList
