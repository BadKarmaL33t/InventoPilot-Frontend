import Home from "../homepage/Home.jsx";
import PresentationPage from "../presentationPage/PresentationPage.jsx";

function AppViewport({ page }) {
    return (
        page === "/" &&
        <div className="content-outer-container">
            <div className="content-left-inner-container">
                {/*routes voor het linker frame hier tussen plaatsen*/}
                <Home/>
            </div>
            <div className="content-right-inner-container">
                {/*routes voor het rechter frame hier tussen plaatsen*/}
                <PresentationPage/>
            </div>
        </div>
    );
}

export default AppViewport;