import { getBusinesses, getBusinessByCategoryId } from "../../store/business";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import NavBar from "../Navigation/NavBar";
import './BusinessList.css'

const BusinessesList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const businesses = useSelector((state) => state.businesses)
    const businessesArr = Object.values(businesses)
    const [isLoaded, setIsLoaded] = useState(false)


    const roundStar = (num) => {
        if (num % 1 == 0) return num
        else if ((num - Math.floor(num)) >= 0.5) num = Math.ceil(num)
        else num = Math.floor(num) + 0.5
        return num
    }

    useEffect(() => {
        dispatch(getBusinesses()).then(() => setIsLoaded(true))
    }, [dispatch])

    if (!businessesArr.length) return null
    return isLoaded ? (
        <div className="businesslist-main">
            <NavBar />
            <div className="main-bottom">
                <div className="category-main" >
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinesses())
                        }}>
                        <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-foods-vacation-planning-guys-trip-flaticons-flat-flat-icons.png" />
                        <p className="category-name">All</p>
                    </div>
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(1))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/emoji/64/000000/bento-box-emoji.png" />
                        <p className="category-name">Japanese</p>
                    </div>
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(2))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/external-febrian-hidayat-flat-febrian-hidayat/64/000000/external-dessert-restaurant-febrian-hidayat-flat-febrian-hidayat.png" />
                        <p className="category-name">Cafe</p>
                    </div>
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(3))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/emoji/64/000000/hot-dog-emoji.png" />
                        <p className="category-name">American</p>
                    </div>
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(4))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/color/64/000000/hamburger.png" />
                        <p className="category-name">Burger</p>
                    </div>
                    <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(5))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/external-linector-flat-linector/64/000000/external-breakfast-hotel-service-linector-flat-linector.png" />
                        <p className="category-name">Breakfast</p>
                    </div>
                    {/* <div className="category-icon"
                        onClick={async () => {
                            await dispatch(getBusinessByCategoryId(6))
                        }}>
                        <img className="category-icon-img" src="https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/000000/external-jiaozi-china-photo3ideastudio-flat-photo3ideastudio.png" />
                        <p className="category-name">Chinese</p>
                    </div> */}
                </div>
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
                            {/* kok */}
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
                                <div className="card-category-name">{business.categoryName}</div>
                                <div className="open-close"><span className="open">Open: </span>{business.open === business.close ? '24 hours' : `${business.open} - ${business.close}`}</div>
                                <div className="description">{business.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
}

export default BusinessesList
