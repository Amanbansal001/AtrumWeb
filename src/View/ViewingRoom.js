import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { viewingRoomOwl } from "../Utils";


const styles = {
    container: {
        position: "relative",
        top: "0",
        left: "0",
        bottom: "0",
        width: "100%",
        height: window.mobileCheck()?`35vh`:`100vh`,
    },
    imgWidth: {
        width: "100%"
    },
    innerImg: {
        position: "absolute",
        top: "0",
        bottom: "0",
        width: "100%",
        height: "100%"
    }
};

const ViewingRoom = (props) => {

    const productId = props.match.params.id;
    const [products, setproducts] = useState([]);
    const [faturedArtist, setfaturedArtist] = useState([]);
    const [latestArt, setlatestArt] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchfeaturedArtist();
        fetchlatestArt();
    }, [])


    const fetchfeaturedArtist = () => {
        props._list('trendingArtists', ``, res => {
            res.data.fetch = res.data.fetch.map(e => ({ ...e, like: false }))
            setfaturedArtist(res.data.fetch);
        })
    }

    const fetchlatestArt = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setlatestArt(res.data.fetch);
        })
    }

    const fetchProducts = () => {

        props._list('products/all', `?active=1&isStock=1`, res => {
            if (productId) {
                res.data.fetch = res.data.fetch.filter(e => e.id == productId);
                if (res.data.fetch.length > 0) {
                    const vR = calculateRoom(res.data.fetch[0])

                    res.data.fetch[0].length = vR.finalWidth;
                    res.data.fetch[0].height = vR.finalHeight;
                    setproducts(res.data.fetch);
                }


            } else {
                setproducts(res.data.fetch);
            }

            setTimeout(() => {
                viewingRoomOwl();
            }, 500)
        })
    }

    const productSection = (id) => {
        props.history.push(`product/${id}`)
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }

    const calculateRoom = (product) => {
       
        product.length = parseFloat(product.length);
        product.height = parseFloat(product.height);
       
        let whatPerW = 1600;
        let whatPerH = 1269;

        let finalHeight = Math.abs((whatPerH * (product.height)) / 100) / 10;
        let finalWidth = Math.abs((whatPerW * (product.length)) / 100) / 9;
        if(product.height==product.length){
            whatPerW = whatPerH;
            finalWidth = Math.abs((whatPerW * (product.length)) / 100) / 10;
        }

        if(window.mobileCheck()){
            finalHeight = finalHeight/3;
            if(product.height==product.length){
                finalWidth = finalWidth/3;
            }else{
                finalWidth = finalWidth/2.8;
            }
        }

        return { finalHeight, finalWidth }
    }

    return (
        <>
            <AtrumLayout {...props}>
               

                <div style={styles.container}>
                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} style={{ width: "100%", height: "100%" }} src={`https://uploads.codesandbox.io/uploads/user/4fa33963-4d36-49a5-ac9a-8e3726fd3fba/oILA-image.png`} alt="" />

                    <div style={styles.innerImg}>
                        <div className="viewroomsizemobileclose" onClick={() => window.history.back()} style={{
                            fontSize: `20px`,
                            float: `right`,
                            marginRight: `27px`,
                            marginTop: `15px`,
                            border: `2px solid #000`,
                            borderRadius: `52%`,
                            padding: `3px 12px`,
                            cursor: `pointer`,
                            position: `relative`,
                            zIndex: `99999999`
                        }}
                        >X</div>
                        <div className="viewroomsizemobile" style={{
                            fontSize: "17px",
                            marginRight: "27px",
                            marginLeft: "15px",
                            marginTop: "15px",
                            border: "2px solid rgb(0, 0, 0)",
                            padding: "3px 12px",
                            cursor: "pointer",
                            position: "relative",
                            zIndex: "99999999",
                            width: "205px",
                        }}>View Room : 15ft x 9ft</div>
                        <div
                            style={{
                                position: "absolute",
                                top: window.mobileCheck()?"-10px":"-33px",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >

                            {products && products.length > 0 ?
                                <img
                                    style={{ height: `${products[0].height}px`, width: `${products[0].length}px` }}
                                    className="view-room-img"
                                    src={(products && products.length > 0) ? products[0].productImage : ""}
                                    alt=""
                                />
                                : null}
                        </div>
                    </div>
                </div>
                <section className="featured-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Featured Artists</h3>
                            </div>
                        </div>
                        <div className="row mt-5 flex-wrapinher">
                            {faturedArtist && faturedArtist.length > 0 ? faturedArtist.slice(0, 4).map((data, idx) => {

                                return (
                                    <div className="col-md-3 col-5" key={idx} onClick={() => profileSection(data.user.id)}>
                                        <div className="feature-box hover">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.user.profilePic} alt={data.user.profilePic} className="img-fluid" />
                                            <p>{data.user.name} <span>{data.user.nationality}</span></p>
                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                        <div className="row mt-2 mt-sm-3">
                            <div className="col-md-12 text-center">
                                <Link to="/artist/listing" className="view-all">View All</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="artist-sec border-line">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head">Latest Artwork &amp; Artist</h3>
                            </div>
                        </div>
                        <div className="row mt-3 mt-sm-5">
                            <div className="col-md-4 col-4">
                                {latestArt && latestArt.length > 0 ? latestArt.slice(0, 2).map((data, idx) => {

                                    return (
                                        <div className="artist-box hover" key={idx}>
                                            <div>
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" onClick={() => { productSection(data.id) }} />
                                            </div>

                                        </div>
                                    )

                                }) : null}
                            </div>
                            <div className="col-md-4 col-4">
                                {latestArt && latestArt.length > 0 ? latestArt.slice(2, 4).map((data, idx) => {

                                    return (
                                        <div className="artist-box hover" key={idx}>
                                            <div>
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" onClick={() => { productSection(data.id) }} />
                                            </div>

                                        </div>
                                    )

                                }) : null}
                            </div>
                            <div className="col-md-4 col-4">
                                {latestArt && latestArt.length > 0 ? latestArt.slice(4, 6).map((data, idx) => {

                                    return (
                                        <div className="artist-box hover" key={idx} >
                                            <div>
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" onClick={() => { productSection(data.id) }} />
                                            </div>

                                        </div>
                                    )

                                }) : null}
                            </div>

                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 text-center">
                                <Link to="/new-arrivals" className="view-all">View All</Link>
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
)(ViewingRoom);