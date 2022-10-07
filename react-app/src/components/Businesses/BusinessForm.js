import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getBusinessById, createBusiness, updateBusiness, deleteBusiness, getBusinesses } from '../../store/business';
import NavBar from '../Navigation/NavBar';
import newBusiness from '../Images/newBusiness.jpg'
import './BusinessForm.css'

const BusinessForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const businessId = useParams().businessId

    const existBusiness = useSelector((state) => state.businesses)[businessId]

    const user = useSelector((state) => state.session.user)
    const userId = user?.id

    const [business, setBusiness] = useState(null)

    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const [name, setName] = useState('')
    const [open, setOpen] = useState('')
    const [close, setClose] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [description, setDescription] = useState('')
    const [priceRange, setPriceRange] = useState(1)
    const [previewImage, setPreviewImage] = useState("")
    const [ownerId, setOwnerId] = useState(userId || 0)

    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

    const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

    let timesArr = []
    for (let i = 1; i <= 12; i++) {
        timesArr.push(`${i}am`)
    }
    for (let i = 1; i <= 12; i++) {
        timesArr.push(`${i}pm`)
    }

    const priceRangeObj = { "$": 1, "$$": 2, "$$$": 3 }

    useEffect(async () => {
        if (businessId) {
            const foundBusiness = await dispatch(getBusinessById(businessId))

            setBusiness(foundBusiness)
            setName(foundBusiness.name)
            setOpen(foundBusiness.open)
            setClose(foundBusiness.close)
            setPhone(foundBusiness.phone)
            setAddress(foundBusiness.address)
            setCity(foundBusiness.city)
            setState(foundBusiness.state)
            setZipcode(foundBusiness.zipcode)
            setDescription(foundBusiness.description)
            setPriceRange(foundBusiness.priceRange)
            setOwnerId(foundBusiness.ownerId)
            setPreviewImage(foundBusiness.previewImage)
        } else {
            setName('')
            setOpen('')
            setClose('')
            setPhone('')
            setAddress('')
            setCity('')
            setState('')
            setZipcode('')
            setDescription('')
            setPriceRange(1)
            setOwnerId(userId || 0)
            setPreviewImage('')
            setErrors([])
            setHasSubmitted(false)
        }
    }, [dispatch, businessId])

    useEffect(() => {
        let errs = []
        const validImage = ['jpg', 'jpeg', 'png']
        if (name.length < 2 || name.length > 30) errs.push('error: Name length needs to be between 2-30.')
        if (address.length < 3 || address.length > 50) errs.push('error: Address length should be 2-50')
        if (description.length < 5 || description.length > 255) errs.push('error: Description length 5-255')
        if (priceRange < 1 || priceRange > 4) errs.push('error: price range 1 - 3')
        if (open.length === 4) {
            if (parseInt(open.slice(0, 2)) > 12) { errs.push('error: invalid open time') }
        }
        if (close.length === 4) {
            if (parseInt(close.slice(0, 2)) > 12) { errs.push('error: invalid close time') }
        }
        if (open.slice(-2) === close.slice(-2)) {
            if (open !== '12am') {
                if (parseInt(open.slice(0, 2)) > parseInt(close.slice(0, 2))) { errs.push('error: close time can not be early than open time') }
            }
        }
        if (!zipcode.length === 5) { errs.push('error: Zipcode should be a 5-digit number') }
        if (!validImage.some(item => previewImage.includes(item))) { errs.push('error: Please provide a valid image address') }
        setErrors(errs)
    }, [name, priceRange, description, address, open, close, zipcode, previewImage])

    // do not allow none-owner to edit a business
    let hasAuth
    if (!businessId) hasAuth = true
    else if (existBusiness?.ownerId === userId) {
        hasAuth = true
    } else {
        hasAuth = false
    }

    if (!hasAuth) {
        return (
            <>
                <NavBar />
                <h2 style={{ textAlign: 'center' }}>You don't have authorization to edit this business</h2>
            </>
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formData = {
            name, open, close, phone, address, city, state, zipcode, open, close, description, priceRange, ownerId, previewImage
        }

        if (!business && !errors.length) {
            let data = await dispatch(createBusiness(formData))
            if (Array.isArray(data)) {
                setErrors(data)
            } else {
                // await dispatch(createBusiness(formData))
                history.push(`/businesses/${data.id}`)
            }
        }
        if (!errors.length && business) {
            let data = await dispatch(updateBusiness(formData, businessId))
            if (Array.isArray(data)) {
                setErrors(data)
            } else {
                await dispatch(updateBusiness(formData, businessId))
                history.push(`/businesses/${businessId}`)
            }
        }
    }

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/businesses/upload', {
            method: "POST",
            body: formData,
        });

        // console.log('**************ImageUrl', res)
        if (res.ok) {
            const response = await res.json();
            setPreviewImage(response.url);

            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            alert("An error occurred while uploading the image.");

        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            {hasAuth && (

                <div className='create-business-main'>
                    <form className='business-form' style={{ width: '60%' }} onSubmit={handleSubmit} >
                        <div className='form-title'>Hello! Let's start!</div>
                        <p style={{ fontSize: '13px' }}>We'll use these information to help you claim your Cutielp page</p>

                        {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
                            {errors.map((error, ind) => (
                                <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                            ))}
                        </div>)}

                        <div className='form-fields'>
                            <label className='form-labels'>Business Name *</label>
                            <input type='text'
                                value={name} onChange={e => setName(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Open *</label>
                            <select className='form-selects' value={open} onChange={e => setOpen(e.target.value)} required >
                                <option className='form-options-default' disabled selected hidden value="">Choose your open time</option>
                                {
                                    timesArr.map(open => (
                                        <option className='form-options' key={open} value={open}>{open}</option>
                                    ))
                                }
                            </select>
                            {/* <input type='text' placeholder='e.g., 9am'
                            pattern='([0-9]{1,2}am)||([0-9]{1,2}pm)'
                            value={open} onChange={e => setOpen(e.target.value)} required></input> */}
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Close *</label>
                            <select className='form-selects' value={close} onChange={e => setClose(e.target.value)} required >
                                <option className='form-options-default'
                                    disabled selected hidden value="">
                                    Choose your close time
                                </option>
                                {
                                    timesArr.map(close => (
                                        <option className='form-options' key={close} value={close}>{close}</option>
                                    ))
                                }
                            </select>
                            {/* <input type='text' placeholder='e.g., 9pm'
                            pattern='([0-9]{1,2}am)||([0-9]{1,2}pm)'
                            value={close} onChange={e => setClose(e.target.value)} required></input> */}
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Phone * (ex: 123-345-5678)</label>
                            <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                value={phone} onChange={e => setPhone(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Address *</label>
                            <input type='text' placeholder=''
                                value={address} onChange={e => setAddress(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>City *</label>
                            <input type='text'
                                value={city} onChange={e => setCity(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>State *</label>
                            <select className='form-selects' value={state} onChange={e => setState(e.target.value)} required >
                                <option className='form-options' disabled selected hidden value="">Choose your state</option>
                                {
                                    statesArr.map(state => (
                                        <option className='form-options' key={state} value={state}>{state}</option>
                                    ))
                                }
                            </select>
                            {/* <input type='text' placeholder='e.g, CA'
                            pattern='[A-Z]{2}'
                            value={state} onChange={e => setState(e.target.value)} required></input> */}
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Zipcode *</label>
                            <input type='text' pattern='[0-9]{5}'
                                value={zipcode} onChange={e => setZipcode(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Description *</label>
                            <input type='text' placeholder='Tell us about your restaurant'
                                value={description} onChange={e => setDescription(e.target.value)} required></input>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Price Range *</label>
                            <select className='form-selects' value={priceRange}
                                onChange={e => setPriceRange(e.target.value)} required>
                                <option className='form-options' disabled selected hidden value="">Choose your price range</option>
                                {Object.keys(priceRangeObj).map((priceRange) => (
                                    <option className='form-options' key={priceRange} value={priceRangeObj[priceRange]}>{priceRange}</option>
                                ))}
                            </select>
                        </div>
                        <div className='form-fields'>
                            <label className='form-labels'>Preivew Image *</label>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={updateImage}
                                id='file-input'
                            />
                            <button
                                onClick={handleSubmitImage}
                            // disabled={image === null}
                            >Submit</button>
                            <button
                                onClick={() => {
                                    setImage(null)
                                    setPreviewImage('')
                                    document.getElementById('file-input').value = null;
                                }}
                                disabled={image === null}
                            >Delete</button>
                            {(imageLoading) && <p>Loading...</p>}
                        </div>


                        {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
                            {errors.map((error, ind) => (
                                <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                            ))}
                        </div>)}


                        <button type='submit' className='form-submit-button'
                            style={{ width: '60%' }}>Submit</button>
                        {businessId && (<button className='form-submit-button'
                            style={{ width: '60%' }}
                            onClick={async () => {
                                setTimeout(() => dispatch(deleteBusiness(businessId)), 500)
                                // await dispatch(getBusinesses())
                                history.push('/businesses')
                            }}>Delete</button>)}
                    </form>
                    <div className='businessForm-image-container' style={{ width: "40%" }}>
                        <img className='businessForm-image' src={newBusiness} alt='Business Image' height={600} />
                    </div>
                </div >
            )}
        </div >
    )
}

export default BusinessForm
