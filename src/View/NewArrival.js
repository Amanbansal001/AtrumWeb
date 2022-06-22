import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const NewArrival = (props) => {


    const [latestArt, setlatestArt] = useState([]);
    const [bestSeller, setbestSeller] = useState([]);


    useEffect(() => {
        fetchlatestArt();
        fetchBestSeller();
    }, [])


    const profileSection = (id) => {
        props.history.push(`profile/artist/${id}`)
    }

    const productSection = (id) => {
        props.history.push(`/product/${id}`)
    }


    const fetchlatestArt = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setlatestArt(res.data.fetch);
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
                <section className="inner-bredcrum new-arrival">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    <ul>
                                        <li><a href="#">New Arrivals</a></li>
                                       
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
                                <h3 className="main-head">New Arrivals</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            {latestArt && latestArt.length > 0 ? latestArt.map((data, idx) => {
                                return (

                                    <div className="col-md-3 hover" key={idx} onClick={() => productSection(data.id)}>
                                        <div className="feature-box">
                                            <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src={data.productImage} alt={data.productName} className="img-fluid" />
                                            <p>{data.productName} <span>{data.publishYear}</span></p>
                                            <h5 className="cost">US$ {data.publishYear}</h5>
                                        </div>
                                    </div>
                                )
                            }) : null}

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
)(NewArrival);