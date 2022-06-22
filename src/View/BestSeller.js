import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const BestSeller = (props) => {

    const [newArrivals, setnewArrivals] = useState([]);
    const [bestSeller, setbestSeller] = useState([]);


    useEffect(() => {
        fetchNewArrivals();
        fetchBestSeller();
    }, [])


    const productSection = (search) => {
        props.history.push(`/artwork?search=${search}`)
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }


    const fetchNewArrivals = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setnewArrivals(res.data.fetch);
        })
    }

    const fetchBestSeller = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setbestSeller(res.data.fetch);
        })
    }

    return (
        <>

            <AtrumLayout {...props}>
                <section className="inner-bredcrum">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    <ul>
                                        <li><a href="#">Best Seller</a></li>
                                       
                                    </ul>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Bestsellers</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            {newArrivals && newArrivals.length > 0 ? newArrivals.slice(0, 4).map((data, idx) => {
                                return (

                                    <div key={idx} className="col-md-3 hover" onClick={() => productSection(data.productName)}>
                                        <div className="feature-box">
                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.productImage} alt={data.user.name} className="img-fluid" />

                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                                <a href="#" className="view-all">View All</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured-sec with-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">New Arrivals</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            {newArrivals && newArrivals.length > 0 ? newArrivals.slice(0, 4).map((data, idx) => {
                                return (

                                    <div className="col-md-3 hover" key={idx} onClick={() => productSection(data.productName)}>
                                        <div className="feature-box">
                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.productImage} alt={data.user.name} className="img-fluid" />

                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                                <a href="#" className="view-all">View All</a>
                            </div>
                        </div>
                    </div>
                </section>
            </AtrumLayout>
        </>
    );
}

function mapStateToProps(state, props) {
    return {
        showLogin: true,
        state: state
    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        _post,
        _list,
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BestSeller);