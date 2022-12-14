import { useHistory } from "react-router-dom"

function ListBusinessPage({ searchResults, searchInput, setSearchResults, setSearchInput }) {

    const history = useHistory()
    if (!searchResults.length && searchInput) return <div className="search-results">No results</div>
    return (
        <>
            {searchResults.length > 0 && (
                searchResults.map(business => (
                    <div className="search-results"
                        key={business}
                        onClick={() => {
                            history.push(`/businesses/${business.id}`)
                            setSearchResults([])
                            setSearchInput("")
                        }}
                    >
                        <div className="search-results-row1">
                            <div className="search-results-name">{business.name}</div>
                            <div className="search-results-category">{business.categoryName}</div>
                        </div>
                        <div className="search-results-address">{business.address}</div>
                    </div>
                ))
            )}
        </>
    )
}
export default ListBusinessPage
