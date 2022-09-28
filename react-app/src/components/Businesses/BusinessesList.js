import businessesReducer, { getBusinesses } from "../../store/business";
import { getBusinessesByUser } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const BusinessesList = () => {
    const dispatch = useDispatch()
    console.log('***********in component*******')
    const businesses = useSelector((state) => state.businesses)
    const businessesArr = Object.values(businesses)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    if (!businessesArr.length) return null
    return (
        <>
            {businessesArr.map((business) => (
                <div className="business-container">
                    <div className="business-image"></div>
                    <div className="business-into-container">
                        <div className="business-name">{business.name}</div>
                        <div className="business-rating">
                            <div className="stars"></div>
                            <div className="review-num"></div>
                        </div>
                        <div className="open-close">{business.close}</div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BusinessesList
