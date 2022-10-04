import Crypumpkin from './Images/Crypumpkin.gif'
import NavBar from './Navigation/NavBar'
function PageNotFound() {
    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', marginTop: '30px', marginLeft: '50px' }}>
                <h1>
                    Page not found
                </h1>
                <img src={Crypumpkin} alt='pumpkin image' height={200} />
            </div>
        </>
    )
}
export default PageNotFound
