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

    const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

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
        if (name.length < 2 || name.length > 30) errs.push('error: Name length needs to be between 3-30.')
        if (address.length > 50) errs.push('error: Address length less than 50')
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
        setErrors(errs)
    }, [name, priceRange, description, address, open, close])

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavBar />
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
                        <label className='form-labels'>Open * (ex: 5pm)</label>
                        <input type='text' placeholder='e.g., 9am'
                            pattern='([0-9]{1,2}am)||([0-9]{1,2}pm)'
                            value={open} onChange={e => setOpen(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Close * (ex: 9pm)</label>
                        <input type='text' placeholder='e.g., 9pm'
                            pattern='([0-9]{1,2}am)||([0-9]{1,2}pm)'
                            value={close} onChange={e => setClose(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Phone * (ex: 123-345-5678)</label>
                        <input type='tel' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' placeholder='123-456-7891'
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
                        <select value={state} onChange={e => setState(e.target.value)} required >
                            <option disabled selected hidden value="">Choose your state</option>
                            {
                                Object.values(statesArr).map(state => (
                                    <option key={state} value={state}>{state}</option>
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
                        <select value={priceRange} className='pricerange-select'
                            onChange={e => setPriceRange(e.target.value)} required>
                            <option value={1}>$</option>
                            <option value={2}>$$</option>
                            <option value={3}>$$$</option>
                        </select>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Preivew Image *</label>
                        <input type='text' value={previewImage} onChange={e => setPreviewImage(e.target.value)} required></input>
                    </div>
                    <button type='submit' className='form-submit-button'
                        style={{ width: '60%' }}>Submit</button>
                    {businessId && (<button className='form-submit-button'
                        style={{ width: '60%' }}
                        onClick={async () => {
                            await dispatch(deleteBusiness(businessId))
                            await dispatch(getBusinesses())
                            history.push('/businesses')
                        }}>Delete</button>)}
                </form>
                <div className='businessForm-image-container' style={{ width: "40%" }}>
                    <img className='businessForm-image' src={newBusiness} alt='Business Image' height={600} />
                </div>
            </div>
        </div>
    )
}

export default BusinessForm
