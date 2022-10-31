import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../store/session';

const ProfileForm = ({ currentUser, setShowModal }) => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(async () => {
        const foundUser = await dispatch(getUser(currentUser.id))

        setFirstName(foundUser.firstName)
        setLastName(foundUser.lastName)
        setEmail(foundUser.email)
        setCity(foundUser.city)
        setState(foundUser.state)
        setZipcode(foundUser.zipcode)
        setPreviewImage(foundUser.previewImage)
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formdata = {
            firstName, lastName, email, city, state, zipcode, previewImage
        }

        let data = await dispatch(updateUser(formdata, currentUser.id))
        if (Array.isArray(data)) {
            setErrors(data)
        } else {
            await dispatch(updateUser(formdata, currentUser.id))
            setShowModal(false)
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-title' id="profile-form-title">My Profile</div>

                {hasSubmitted && errors.length > 0 && (<div className='errorContainer'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='errorText'>{error.split(":")[1]}</div>
                    ))}
                </div>)}

                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>First Name</label>
                    <input type='text'
                        value={firstName} onChange={e => setFirstName(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>Last Name</label>
                    <input type='text'
                        value={lastName} onChange={e => setLastName(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels' pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address">Email</label>
                    <input type='text'
                        value={email} onChange={e => setEmail(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>City</label>
                    <input type='text'
                        value={city} onChange={e => setCity(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>State</label>
                    <input type='text'
                        value={state} onChange={e => setState(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>Zipcode</label>
                    <input type='text'
                        value={zipcode} onChange={e => setZipcode(e.target.value)} required></input>
                </div>
                <div className='form-fields' id='profile-form-fields'>
                    <label className='form-labels'>Preview Image</label>
                    <input type='text'
                        value={previewImage} onChange={e => setPreviewImage(e.target.value)}></input>
                </div>
                <button className='form-submit-button' id='profile-form-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProfileForm
