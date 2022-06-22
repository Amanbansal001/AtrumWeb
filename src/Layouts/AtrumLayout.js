import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import { isMobile } from "../Utils";

const AtrumLayout = (props) => {

    return (
        <>
            <Loader identifier='0' />
            <Header {...props} propsQuery={props.propsQuery}/>
            <>
                {props.children}
            </>

            {!isMobile() ?
                <section className="app-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 order-2 order-sm-1">
                                <div className="app-text">
                                    <h2>Collect Art on Atrum App</h2>
                                    <a href="https://apps.apple.com/in/app/atrumart/id1607295318" target="_blank"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/google-logo.svg" /></a>
                                    <a href="https://play.google.com/store/apps/details?id=com.app.atrumart" target="_blank"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/apple-logo.svg" /></a>
                                </div>
                            </div>
                            <div className="col-md-6 order-1 order-sm-2">
                                <div className="app-img">
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/smartphone-.png" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : null}

            
                <Footer {...props} propsQuery={props.propsQuery}/>
               
        </>
    )

}

export default AtrumLayout;