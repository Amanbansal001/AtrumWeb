import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { isMobile } from "../Utils";

const NFT = (props) => {

    const [products, setproducts] = useState([]);
    const [config, setconfig] = useState();

    useEffect(() => {
        fetchProducts();
        fetchConfig();
    }, [])

    const nftPage = (e) => {
        e.preventDefault();

        if (window.confirm("You will be redirected to Open sea platform") == true) {
            window.location.href = `https://opensea.io/collection/atrum-arts`;
        } else {

        }

    }

    const fetchProducts = () => {

        props._list('nft', ``, res => {
            setproducts(res.data.fetch);
        })
    }

    const fetchConfig = () => {

        let res = JSON.parse(localStorage.getItem("config"));

        if (!res) {
            props._list('config', ``, res => {
                setconfig(res.data.fetch.find(e => e.col === "NFT_WALLET"));
            })
        } else {
            setconfig(res.find(e => e.col === "NFT_WALLET"));
        }
    }

    const productSection = (imageURL) => {
        if (window.confirm("You will be redirected to Open sea platform") == true) {
            window.location.href = imageURL;
        } else {

        }

    }

    return (
        <>
            <AtrumLayout {...props}>
                <section className="inner-bredcrum">
                    <div className="container">
                        <div className="row">
                            <div class="col-md-12 wondermobtxt d-block d-sm-none">
                                <h4 className="text-center">To explore our NFT collection listed below, kindly visit Opensea/atrum-arts</h4>
                            </div>
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    
                                    {config && config.val === "1" ?
                                        <>
                                            {!isMobile() ?
                                                <a className="wallet" href="https://opensea.io/collection/atrum-arts" target="_blank">OpenSea</a>
                                                : <a className="wallet" onClick={() => alert(`To explore our NFT collection, kindly visit Opensea/atrum-arts`)} >OpenSea</a>}
                                        </>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="inner2sec1 d-none d-sm-block">
                    {isMobile() ?
                        <a onClick={() => alert(`To explore our NFT collection, kindly visit Opensea/atrum-arts`)}><img style={{ width: '100%' }} src="https://lh3.googleusercontent.com/fife/AAWUweVcLoZzyC9cOxg8zmd1ggY0HvD71gavq38zZkB2AxAC8aFGScFED2iIUISaJ0ApjCsTdwPn84KRvUBychxf96kW_lWtG_1Du2dhlngfWij4MkMoK5ag5octC_aK0XluHekwt-0m0yGv-jy74oodTesOpLbto2ThWM88GyEOZvrasr70xwNfu_bj-msiXmLDqMzvOZGHI5q5fic8r6uWyR_NDA9J70ggO7tf3v5ELvJtCiEap2VxAhZOWbzXk-EvnXVoJGR8H51AKfOEeIcUCMMHnNtb5o5642qnwMsbe3Mpjt42-GOjJ3oAjmUjXIXqWehCQ768f-mE8KXnxWaqmdehWPHXeLXr01sWx7upucTtquNq8pO16H77dJ-FZADHTv_ngwhUUb84xvDg7LqYg39SCoSJ8vnbFufSb2fOT95uCFcP7RY2tJ1TegzhtiYu54SYmDko2BcF7KFHKaRLoP2XYxDT2LNCnkx4dthfimZOwui7xjBqbM0XSIKRDBQHixG-JPBTsYKU8yZXOAjVhw4w3fB_NiWI18KJlnINYy_YMBftlz1q2NqEtJ51IMPKFQ2_IG7sqrKQS1UumgQ0KSSAPEaExfSuMEFl1wD0xLEvSLMP9EOUHyfpvJSCZmqmN6lGK-f3h9DS_ykcM2fJbJTlex_KJnhckOsvmTfXzI-q68B8eYh9rmiYzHbcYuEIhYxY5LcnbRLN2-ZZpxXCSw_BYLdopOD-1Q=w1920-h942" /></a>
                        :
                        <a href="https://opensea.io/collection/atrum-arts" target="_blank"><img style={{ width: '100%' }} src="https://lh3.googleusercontent.com/fife/AAWUweVcLoZzyC9cOxg8zmd1ggY0HvD71gavq38zZkB2AxAC8aFGScFED2iIUISaJ0ApjCsTdwPn84KRvUBychxf96kW_lWtG_1Du2dhlngfWij4MkMoK5ag5octC_aK0XluHekwt-0m0yGv-jy74oodTesOpLbto2ThWM88GyEOZvrasr70xwNfu_bj-msiXmLDqMzvOZGHI5q5fic8r6uWyR_NDA9J70ggO7tf3v5ELvJtCiEap2VxAhZOWbzXk-EvnXVoJGR8H51AKfOEeIcUCMMHnNtb5o5642qnwMsbe3Mpjt42-GOjJ3oAjmUjXIXqWehCQ768f-mE8KXnxWaqmdehWPHXeLXr01sWx7upucTtquNq8pO16H77dJ-FZADHTv_ngwhUUb84xvDg7LqYg39SCoSJ8vnbFufSb2fOT95uCFcP7RY2tJ1TegzhtiYu54SYmDko2BcF7KFHKaRLoP2XYxDT2LNCnkx4dthfimZOwui7xjBqbM0XSIKRDBQHixG-JPBTsYKU8yZXOAjVhw4w3fB_NiWI18KJlnINYy_YMBftlz1q2NqEtJ51IMPKFQ2_IG7sqrKQS1UumgQ0KSSAPEaExfSuMEFl1wD0xLEvSLMP9EOUHyfpvJSCZmqmN6lGK-f3h9DS_ykcM2fJbJTlex_KJnhckOsvmTfXzI-q68B8eYh9rmiYzHbcYuEIhYxY5LcnbRLN2-ZZpxXCSw_BYLdopOD-1Q=w1920-h942" /></a>
                    }
                   
                    <div className="row mt-3 mr-5">
                        <div className="col-md-12 text-center">
                          
                        </div>
                    </div>
                </section>
                <section className="product-listing-sec">
                    <div className="container">

                    </div>
                </section>
 

                <section className="featured-sec artist-work">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <h3 className="main-head pl-0 pl-sm-3">NFT Artworks</h3>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="card-columns">
                                {products && products.length > 0 ? products.map((data, idx) => {
                                    return (

                                        <div key={idx} className="card" >
                                            {isMobile() ?
                                                <a onClick={() => alert(`To explore our NFT collection, kindly visit Opensea/atrum-arts`)}>
                                                    <div className="feature-box">
                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.nftImage} className="img-fluid" />
                                                        <p>{data.nftTitle}</p>
                                                        <h5 className="cost">{data.nftDescription}</h5>
                                                    </div>
                                                </a>
                                                :
                                                <a href={data.nftUrl} target="_blank">
                                                    <div className="feature-box">
                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.nftImage} className="img-fluid" />
                                                        <p>{data.nftTitle}</p>
                                                        <h5 className="cost">{data.nftDescription}</h5>
                                                    </div>
                                                </a>
                                            }
                                        </div>
                                    )
                                }) : null}
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
)(NFT);