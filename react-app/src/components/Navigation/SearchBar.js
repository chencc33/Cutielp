import React, { useState, useEffect } from 'react';
import { getBusinesses } from "../../store/business";
import ListBusinessPage from "./ListBusinessPage";
import { useDispatch, useSelector } from 'react-redux';

function SearchBar({ businessesArr, setSearchInput, setSearchResults }) {
    // const dispatch = useDispatch()
    // const businesses = useSelector(state => state.businesses)
    // const businessesArr = Object.values(businesses)
    // const [searchInput, setSearchInput] = useState("")
    // const [searchResults, setSearchResults] = useState([])

    // useEffect(() => {
    //     dispatch(getBusinesses())
    // }, [])

    const handleSubmit = (e) => e.preventDefault()
    const handleChange = (e) => {
        if (!e.target.value) return setSearchResults([])
        const resultsArr = businessesArr.filter(business => business.name.toLowerCase().includes(e.target.value.toLowerCase()) || business.categoryName.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResults(resultsArr)
        setSearchInput(e.target.value)
    };

    return (
        <div className="search-bar-box">
            <form
                className="search-bar"
                onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    id='search'
                    type='text'
                    placeholder="American, Chinese, Breakfast...."
                    onChange={handleChange}
                ></input>
                <button className="search-button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {/* <ListBusinessPage searchResults={searchResults} searchInput={searchInput} setSearchResults={setSearchResults} setSearchInput={setSearchInput} /> */}
        </div >
    )
}

export default SearchBar
