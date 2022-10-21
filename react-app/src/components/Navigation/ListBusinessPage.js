import { useHistory } from "react-router-dom"

function ListBusinessPage({ searchResults }) {
    // const results = searchResults.map(business => (
    //     <div>{business.name}</div>
    // ))
    // const content = results
    const history = useHistory()
    return (
        <>
            {searchResults.length > 0 && (
                searchResults.map(business => (
                    <div className="search-results"
                        onClick={() => { history.push(`/businesses/${business.id}`) }}
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
