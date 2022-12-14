import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../store/profile';

const ProfileForm = ({ currentUser, setShowModal }) => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

    useEffect(async () => {
        const foundUser = await dispatch(getUser(currentUser.id))

        setFirstName(foundUser.firstName)
        setLastName(foundUser.lastName)
        setEmail(foundUser.email)
        setCity(foundUser.city)
        setState(foundUser.state)
        setZipcode(foundUser.zipcode)
        setProfileImage(foundUser.profileImage)
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        let formdata = {
            firstName, lastName, email, city, state, zipcode, profileImage
        }

        let data = await dispatch(updateUser(formdata, currentUser.id))
        if (Array.isArray(data)) {
            setErrors(data)
        } else {
            await dispatch(updateUser(formdata, currentUser.id))
            setShowModal(false)
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


        if (res.ok) {
            const response = await res.json();
            setProfileImage(response.url);

            setImageLoading(false);

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
                    <label className='form-labels'>Profile Image</label>
                    <input className='file-upload'
                        type='file'
                        accept='image/*'
                        onChange={updateImage}
                        id='file-input'
                    />
                    <div style={{ display: 'flex' }}>
                        <button className='file-upload-button'
                            onClick={handleSubmitImage}
                            disabled={image === null}
                        >Upload</button>
                        <button className='file-upload-button'
                            onClick={() => {
                                setImage(null)
                                setProfileImage('')
                                document.getElementById('file-input').value = null;
                            }}
                            disabled={image === null}
                        >Delete</button>
                    </div>
                    {(imageLoading) && <p>Loading...</p>}
                </div>
                <button className='form-submit-button' id='profile-form-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProfileForm
