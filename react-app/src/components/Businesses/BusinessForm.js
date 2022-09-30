import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { getBusinessById, createBusiness, updateBusiness, deleteBusiness } from '../../store/business';
import NavBar from '../Navigation/NavBar';
import newBusiness from '../Images/newBusiness.jpg'
import './BusinessForm.css'

const BusinessForm = ({ businessId }) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector((state) => state.session.user)
    const userId = user?.id

    const [business, setBusiness] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
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
    const [ownerId, setOwnerId] = useState(userId || 0)

    useEffect(async () => {
        if (businessId) {
            const foundBusiness = await dispatch(getBusinessById(businessId))

            setBusiness(foundBusiness)

            setName(foundBusiness.name)
            setEmail(foundBusiness.email)
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
        } else {
            setName('')
            setEmail('')
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
        }
    }, [dispatch, businessId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = {
            name, email, website, open, close, phone, address, city, state, zipcode, description, priceRange, ownerId
        }
        if (!business) {
            await dispatch(createBusiness(formData))
        } else {
            await dispatch(updateBusiness(formData, businessId))
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <div className='create-business-main'>
                <form className='business-form' style={{ width: '60%' }} onSubmit={handleSubmit} >
                    <div className='form-title'>Hello! Let's start!</div>
                    <p style={{ fontSize: '10px' }}>We'll use these information to help you claim your Cutielp page</p>
                    <div className='form-fields'>
                        <label className='form-labels'>Name</label>
                        <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Email</label>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Website</label>
                        <input type='text' value={website} onChange={e => setWebsite(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Open</label>
                        <input type='text' value={open} onChange={e => setOpen(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Close</label>
                        <input type='text' value={close} onChange={e => setClose(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Phone</label>
                        <input type='text' value={phone} onChange={e => setPhone(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Address</label>
                        <input type='text' value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>City</label>
                        <input type='text' value={city} onChange={e => setCity(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>State</label>
                        <input type='text' value={state} onChange={e => setState(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Zipcode</label>
                        <input type='text' value={zipcode} onChange={e => setZipcode(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Description</label>
                        <input type='text' value={description} onChange={e => setDescription(e.target.value)}></input>
                    </div>
                    <div className='form-fields'>
                        <label className='form-labels'>Price Range</label>
                        <input type='number' value={priceRange} onChange={e => setPriceRange(e.target.value)}></input>
                    </div>
                    <button type='submit' className='form-submit-button' style={{ width: '60%' }}>Submit</button>
                    {/* <button onClick={async () => {
                        await dispatch(deleteBusiness(businessId))
                        history.push('/businesses')
                    }}>Delete</button> */}
                </form>
                <div className='businessForm-image-container' style={{ width: "40%" }}>
                    <img className='businessForm-image' src={newBusiness} alt='Business Image' height={600} />
                </div>
            </div>
        </div>
    )
}

export default BusinessForm
