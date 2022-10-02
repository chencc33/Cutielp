import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getBusinessById, createBusiness, updateBusiness, deleteBusiness } from '../../store/business';
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
    // const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
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

    useEffect(async () => {
        if (businessId) {
            const foundBusiness = await dispatch(getBusinessById(businessId))

            setBusiness(foundBusiness)

            setName(foundBusiness.name)
            // setEmail(foundBusiness.email)
            setWebsite(foundBusiness.website)
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
            // setPreviewImage(foundBusiness.preivewImage)
        } else {
            setName('')
            // setEmail('')
            setWebsite('')
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
            // setPreviewImage('')
            setErrors([])
            setHasSubmitted(false)
        }
    }, [dispatch, businessId])

    useEffect(() => {
        let errs = []
        if (name.length < 2 || name.length > 30) errs.push('error: Name length needs to be between 3-30.')
        // if (!website.includes('www')) errs.push('error: Website is invalid')
        if (address.length > 50) errs.push('error: Address length less than 50')
        if (description.length < 5 || description.length > 255) errs.push('error: Description length 5-255')
        if (priceRange < 1 || priceRange > 4) errs.push('error: price range 1 - 3')
        setErrors(errs)
    }, [name, priceRange, description, address])
    console.log('**********useEffecterrors', errors)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formData = {
            name, website, open, close, phone, address, city, state, zipcode, description, priceRange, ownerId
            // ,previewImage
        }

        if (!business && !errors.length) {
            let data = await dispatch(createBusiness(formData))
            console.log('**********handlesubmitBefore', data)
            // if (Array.isArray(data)) {
            //     setErrors(data)
            console.log('**********handlesubmitAfter', errors)
            // } else {
            // await dispatch(createBusiness(formData))
            history.push(`/businesses`)
            // }
        }
        if (!errors.length && business) {
            let data = await dispatch(updateBusiness(formData, businessId))
            if (Array.isArray(data)) {
                setErrors(data)
            } else {
                await dispatch(updateBusiness(formData, businessId))
                history.push(`/businesses/${business.id}`)
            }
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <div className='create-business-main'>
                <form className='business-form' style={{ width: '60%' }} onSubmit={handleSubmit} >
                    <div className='form-title'>Hello! Let's start!</div>
                    <p style={{ fontSize: '10px' }}>We'll use these information to help you claim your Cutielp page</p>

                    {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
                        {errors.map((error, ind) => (
                            <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                        ))}
                    </div>)}

                    <div className='form-fields'>
                        <label className='form-labels'>Name</label>
                        <input type='text' placeholder='required'
                            value={name} onChange={e => setName(e.target.value)} required></input>
                    </div>
                    {/* <div className='form-fields'>
                        <label className='form-labels'>Email</label>
                        <input type='text' placeholder='required'
                            value={email} onChange={e => setEmail(e.target.value)} required></input>
                    </div> */}
                    <div className='form-fields'>
                        <label className='form-labels'>Website</label>
                        <input type='text' placeholder='optional'
                            value={website} onChange={e => setWebsite(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Open</label>
                        <input type='text' placeholder='required'
                            value={open} onChange={e => setOpen(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Close</label>
                        <input type='text' placeholder='required'
                            value={close} onChange={e => setClose(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Phone</label>
                        <input type='text'
                            value={phone} onChange={e => setPhone(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Address</label>
                        <input type='text' placeholder='required'
                            value={address} onChange={e => setAddress(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>City</label>
                        <input type='text' placeholder='required'
                            value={city} onChange={e => setCity(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>State</label>
                        <input type='text' placeholder='required'
                            value={state} onChange={e => setState(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Zipcode</label>
                        <input type='text' placeholder='required' pattern='[0-9]{5}'
                            value={zipcode} onChange={e => setZipcode(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Description</label>
                        <input type='text' placeholder='required'
                            value={description} onChange={e => setDescription(e.target.value)} required></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Price Range</label>
                        <input type='number' value={priceRange} onChange={e => setPriceRange(e.target.value)} required></input>
                    </div>
                    {/* <div className='form-fields'>
                        <label className='form-labels'>preivewImage</label>
                        <input type='text' value={previewImage} onChange={e => setPreviewImage(e.target.value)}></input>
                    </div> */}
                    <button type='submit' className='form-submit-button'
                        style={{ width: '60%' }}>Submit</button>
                    {businessId && (<button className='form-submit-button'
                        style={{ width: '60%' }}
                        onClick={async () => {
                            await dispatch(deleteBusiness(businessId))
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
