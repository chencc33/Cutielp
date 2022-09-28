import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getBusinessById, createBusiness, updateBusiness } from '../../store/business';

const BusinessForm = ({ businessId }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const userId = user.id
    console.log('***********userId', userId)

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
            console.log('***********foundBusiness', foundBusiness)
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
        console.log('************ownerId', ownerId)
        console.log('************priceRange', priceRange)
        let formData = {
            name, email, website, open, close, phone, address, city, state, zipcode, description, priceRange, ownerId
        }
        console.log('************formData', formData)
        if (!business) {
            await dispatch(createBusiness(formData))
        } else {
            await dispatch(updateBusiness(formData, businessId))
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='business-input-container'>
                    <label className='business-input-label'>Name</label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Email</label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Website</label>
                    <input type='text' value={website} onChange={e => setWebsite(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Open</label>
                    <input type='text' value={open} onChange={e => setOpen(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Close</label>
                    <input type='text' value={close} onChange={e => setClose(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Phone</label>
                    <input type='text' value={phone} onChange={e => setPhone(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Address</label>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>City</label>
                    <input type='text' value={city} onChange={e => setCity(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>State</label>
                    <input type='text' value={state} onChange={e => setState(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Zipcode</label>
                    <input type='text' value={zipcode} onChange={e => setZipcode(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Description</label>
                    <input type='text' value={description} onChange={e => setDescription(e.target.value)}></input>
                </div>
                <div className='business-input-container'>
                    <label className='business-input-label'>Price Range</label>
                    <input type='number' value={priceRange} onChange={e => setPriceRange(e.target.value)}></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default BusinessForm
