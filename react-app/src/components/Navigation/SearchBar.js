import React from "react";

function SearchBar({ businessesArr, setSearchResults, setSearchInput }) {

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
        </div >
    )
}

export default SearchBar