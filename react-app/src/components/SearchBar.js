import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

function SearchBar() {
    const dispatch = useDispatch()
    // const history = useHistory()
    const businesses = useSelector(state => state.businesses)
    const businessesArr = Object.values(businesses)
    const [dropDown, setDropDown] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [matchBusinesses, setMatchBusinesses] = useState({})

    useEffect(() => {
        const closeMenu = (e) => {
            if (dropDown && e.target.id !== 'search-bar') {
                setUserInput("")
                setDropDown(false)
            }
        }
        document.addEventListener('click', closeMenu)
        setMatchBusinesses([])
        return () => document.removeEventListener('click', closeMenu)
    }, [dropDown])

    const inputHandler = (e) => {
        e.preventDefault()
        setUserInput(e.target.value)
        let bizSet = { ...businesses }
        let bizSetOutgoing = {}
        for (let business of businessesArr) {
            let addedByName = false
            if (business.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                delete bizSet[business.id]
                bizSetOutgoing[business.id] = business
                addedByName = true
            }
            if (!addedByName) {
                for (const category of business.categoryName) {
                    if (category.toLowerCase().includes(e.target.value.toLowerCase())) {
                        bizSetOutgoing[business.id] = business
                        delete bizSet[business.id]
                    }
                }
            }
        }
        setMatchBusinesses(bizSetOutgoing)
    }
    let handleSubmit = async e => {
        e.preventDefault()
        let params = { 'name': userInput, 'category': userInput }
        await dispatch(getBizThunk(params))
        setUserInput("")
        setDropDown(false)
        const query = new URLSearchParams(params)
        history.push(`/businesses/search?${query.toString()}`)
    }

    if (location.pathname.split('/')[2] === 'reviews') {
        handleSubmit = async e => {
            e.preventDefault()
            let params = { name: userInput, category: userInput };
            await dispatch(getBizThunk(params));
            setUserInput("");
            const reviewBizQuery = new URLSearchParams(params)
            history.push(`/writeareview/search?${reviewBizQuery.toString()}`)
        }
    }

    let bizMatchesArray = Object.values(bizMatches)
    let results = Array.from(bizMatchesArray).slice(0, 5)
    if (Array.from(bizMatchesArray).length > 5) results.push({ endcard: 'See all Results' })
    return (
        <div>
            <div>
                <form
                    onSubmit={handleSubmit}
                    action="/"
                    method="GET"
                >
                    <label></label>
                    <input
                        autoComplete="off"
                        type='text'
                        placeholder="American, Chinese, Breakfast...."
                        onChange={inputHandler}
                        value={userInput}
                    ></input>
                    <div
                        type='submit'
                        onClick={handleSubmit}
                    ></div>
                </form>
            </div>
            <div className="drop-down"></div>
        </div>
    )
}

export default SearchBar
