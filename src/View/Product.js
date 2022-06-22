import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import { useLocation } from "react-router";
import CertificatePopup from "../Components/CertificatePopup";
import ZoomImage from "../Components/ZoomImage";
import Share from "../Components/Share";
import { isMobile, showModal } from "../Utils";
import Enquiry from "../Components/Enquiry";
import _ from "lodash";


const initialState = {
    buyNowText: `Buy Now`
}

const Product = (props) => {

    const location = useLocation();
    const profile = getProfile();
    const [productId, setproductId] = useState();
    const [productById, setproductById] = useState();
    const [featuredArt, setfeaturedArt] = useState([]);
    const [followText, setfollowText] = useState(`Follow`);
    const [prev, setprev] = useState();
    const [next, setnext] = useState();
    const [faturedArtist, setfaturedArtist] = useState([]);
    const [latestArt, setlatestArt] = useState([]);

    const [startr, setstartr] = useState(0);
    const [endr, setendr] = useState(4);

    const [starto, setstarto] = useState(0);
    const [endo, setendo] = useState(4);

    const [startr1, setstartr1] = useState(0);
    const [endr1, setendr1] = useState(4);

    const [buyNow, setBuyNow] = useState(true);
    const [buyNowText, setBuyNowText] = useState(initialState.buyNowText);


    useEffect(() => {

        if (location.pathname) {

            setnext(null)
            setprev(null)
            setfollowText(`Follow`)
            setproductId(parseInt(props.match.params.id))
        }

    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchAPI();
    }, [productId])


    const fetchAPI = () => {
        fetchProductById();
        fetchfeaturedArt();
        fetchlatestArt();
    }

    const fetchProductById = () => {
        if (!productId) { return }
        props._list(`products/${productId}?active=1`, ``, res => {

            if (res.data.fetch.follow) {
                setfollowText(`Followed`)
            }

            if (res.data.fetch.wishlist) {
                res.data.fetch.like = true;
            } else {
                res.data.fetch.like = false;
            }

            setproductById(res.data.fetch);
            fetchfeaturedArtist(res.data.fetch)

            let product = localStorage.getItem("cart");

            setTimeout(() => {
                checkIfProductExist(res.data.fetch);
            }, 1000);
        })
    }

    const fetchfeaturedArt = () => {

        props._list(`products/all?notInid=${productId}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.active == 1);
            setfeaturedArt(res.data.fetch);

            if (res.data.fetch && res.data.fetch.length > 0) {

                const checkIfExist = res.data.fetch.find(e => e.id == (productId + 1));
                if (!checkIfExist) {
                    setnext(1)
                } else {
                    setnext(productId + 1)
                }


                if (productId != 1) {
                    setprev(productId - 1)
                }
            }
        })
    }

    const follow = () => {
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`productFollows`, {
            productId: productId,
            userId: (profile) ? profile.id : 0
        }, res => {
            if (followText == "Follow") {
                setfollowText(`Followed`)
            } else {
                setfollowText(`Follow`)
            }
        })
    }

    const checkIfProductExist = (productData) => {
        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let isExist = product.find(e => e.id === productData.id);
            if (isExist) {
                setBuyNowText(`Added to Cart`)
            }
        }
    }

    const addToCart = (e) => {
        e.preventDefault();

        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let isExist = product.find(e => e.id === productById.id);

            if (product.find(e => e.logistics != productById.logistics)) {
                localStorage.removeItem("cart");
                product = [];
                isExist = null;
            }

            if (!isExist) {
                let prod = productById;;
                prod = { ...prod, isAuction: false };
                product.push(prod);
                localStorage.setItem("cart", JSON.stringify(product));
                props.history.push('/cart');
            }
        } else {
            product = [];
            let prod = productById;;
            prod = { ...prod, isAuction: false };
            product.push(prod);
            localStorage.setItem("cart", JSON.stringify(product));
            props.history.push('/cart');
        }

    }

    const fetchlatestArt = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setlatestArt(res.data.fetch);
        })
    }

    const fetchfeaturedArtist = (_productById) => {


        if (!_productById) { return; }

        props._list(`products/all?userIdIn=${_productById.userId}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.active == 1);
            res.data.fetch = _.uniqBy(res.data.fetch, "id");
            res.data.fetch = _.filter(res.data.fetch, function (f) { return f.id != productId; });
            setfaturedArtist(res.data.fetch);
        })
    }

    const profileSection = (id) => {
        props.history.push(`/profile/artist/${id}`)
    }

    const productSection = (id) => {
        props.history.push(`/product/${id}`)
    }

    const viewMorer = (e) => {
        e.preventDefault();
        setendr(endr + 4);
    }

    const viewMoreo = (e) => {
        e.preventDefault();
        setendo(endo + 4);
    }

    const viewMorer1 = (e) => {
        e.preventDefault();
        setendr1(endr1 + 4);
    }

    const like = (e, data) => {
        e.preventDefault();

        const profile = getProfile();
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`wishlists`, {
            productId: data.id,
            userId: (profile) ? profile.id : 0
        }, res => {
            const temp = productById;

            if (temp.like) {
                temp.like = false;
            } else {
                temp.like = true;
            }

            setproductById({ ...temp });
        }, err => {

        })


    }

    return (
        <>
            <AtrumLayout {...props}>

                {!productById || !productById.user ?
                    <div className={`text-center productnofoundmobile`}>No Product Found</div>
                    : <>
                        <section className="inner-bredcrum d-none">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="bredcrum-box">
                                            <ul>
                                                {productById && productById.user ?
                                                    <>
                                                        <li><a href="#">Artwork</a></li> <li>/</li> <li><a href="#">{productById.user.name}</a></li> <li>/</li> <li>{productById.user.nationality}</li>
                                                    </>
                                                    : null}
                                            </ul>
                                            <ul className="top-pagination">
                                                {prev ?
                                                    <li><Link to={`/product/${prev}`}><i className="fa fa-arrow-left" /> Previous</Link></li>
                                                    : null}
                                                <li><Link to={`/product/${next}`}>Next <i className="fa fa-arrow-right" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="product-sec">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="product-top">
                                            <h3 className="product-head row">
                                                <div className="col-md-5">
                                                    <span>{productById.productName}, {productById.publishYear}<span>by {productById.user.name}, {productById.user.nationality}</span></span>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="follow-btn">
                                                        <div className="product-text">
                                                            <a href="#" className="buy-btn followartisebutton" onClick={follow}>{followText}</a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-5">
                                        <div className="product-img">
                                            <div className="easyzoom1 easyzoom1--overlay">
                                                <a href="#" data-toggle="modal" data-target="#zoomimage">
                                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={productById.productImage} width="100%" height={580} alt="" />
                                                </a>
                                            </div>
                                            <div className="like-box">
                                                <a href="#" onClick={(e) => { like(e, productById) }}>
                                                    {!productById.like ?
                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-transparent.png" className="unlike" />
                                                        :
                                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/heart-black.png" className="like" />
                                                    }
                                                </a>
                                            </div>
                                        </div>
                                        <div className="view-share-box">
                                            <ul>
                                                {productById.isViewRoom == "1" && !isMobile() ?
                                                    <li><Link to={`/viewing-room/${productId}`}><i className="fa fa-eye" /> View In room</Link></li>
                                                    : null}
                                                <li><a href="#" data-toggle="modal" data-target="#shareModal"><i className="fa fa-share-alt" /> Share</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-text">
                                            <div className="short-description">
                                                <h3>{productById.productName}, {productById.publishYear}</h3>

                                                <p>{productById.material}</p>
                                                {productById.gallery ?
                                                    <p>Part of {productById.gallery}</p>
                                                    : null}

                                                <p>{productById.length}cm x {productById.height}cm </p>
                                                <p>{productById.frame}</p>
                                                <p>{productById.edition}</p>
                                                <p>{productById.productDescription}</p>
                                            </div>
                                            <div className="shiping-text">
                                                {productById.showPrice == "1" ?
                                                    <h3>US$ {productById.price}

                                                    </h3>
                                                    : null}
                                                <p>VAT excluded in price</p>
                                                <p>Shipped from {productById.user.city}</p>

                                            </div>
                                            {productById.inStock == 1 && buyNow ?
                                                <div className="sale-box">
                                                    {!productById.isStock ?
                                                        <a href="#" className="buy-btn">Out Of Stock</a>
                                                        :
                                                        <>
                                                            {buyNowText == initialState.buyNowText ?
                                                                <a href="#" className="buy-btn" onClick={addToCart}>{buyNowText}</a>
                                                                :
                                                                <Link href="/cart" className="buy-btn" onClick={addToCart}>{buyNowText}</Link>
                                                            }
                                                        </>
                                                    }
                                                </div>
                                                : <div className="sale-box">
                                                    {productById.inStock == 0 ?
                                                        <a href="#" className="buy-btn">Sold</a>
                                                        : <a href="#" className="buy-btn">On Hold</a>}
                                                </div>}

                                            {productById.inStock > 0 ?
                                                <div className="sale-box">
                                                    <a href="#" className="buy-btn" onClick={e => window.showBtModal('enquiryModal')}>Enquire Now</a>
                                                </div>
                                                : null}
                                            <div className="verified-box">

                                                <p><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/secure-shield.svg" /> <a className="certify" >Certificate of authenticity included</a></p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="description-sec">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="description-box">
                                            <h3 className="title">About the Artwork</h3>
                                            <ul>

                                                {productById.collection ?
                                                    <>
                                                        <li>Collection:</li>
                                                        <li>{productById.collection}</li>
                                                    </> : null}
                                                {productById.medium ?
                                                    <>
                                                        <li>Medium:</li>
                                                        <li>{productById.medium}</li>
                                                    </> : null}

                                                {productById.frame ?
                                                    <>
                                                        <li>Frame:</li>
                                                        <li>{productById.frame}</li>
                                                    </> : null}
                                            </ul>
                                        </div>
                                        <div className="description-box bor-out pt-4">
                                            <h3 className="title">About the Artist</h3>
                                            <h2 className="mt-5 desc-title">{productById.user.name} <a className="follow cursor-pointer" onClick={follow}>{followText}</a></h2>
                                            <p>{productById.user.bio}</p>
                                        </div>
                                        <ul className="top-pagination mt-4 mt-sm-5">
                                            {prev ?
                                                <li><Link to={`/product/${prev}`}><i className="fa fa-arrow-left" /> Previous</Link></li>
                                                : null}
                                            <li><Link to={`/product/${next}`}>Next <i className="fa fa-arrow-right" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="featured-sec product-page">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h3 className="main-head">Other Works by Artist</h3>
                                    </div>
                                </div>
                                <div className="row mt-3 mt-sm-5 flex-wrapinher">
                                    {faturedArtist && faturedArtist.length > 0 ? faturedArtist.map((data, idx) => {

                                        return (
                                            <div className="col-md-3 col-5" key={idx} onClick={() => productSection(data.id)}>
                                                <div className="feature-box hover">
                                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} alt={data.productName} className="img-fluid" />
                                                    <p>{data.productName}</p>

                                                </div>
                                            </div>
                                        )
                                    }) : null}
                                </div>
                                {faturedArtist && faturedArtist.length > 4 ?
                                    <div className="row mt-0">

                                    </div>
                                    : null}
                            </div>
                        </section>


                    </>}
                <CertificatePopup {...props} productById={productById} />
                <ZoomImage {...props} image={(productById) ? productById.productImage : ''} />
                <Share {...props} productById={productById} />
                <Enquiry {...props} productById={productById} />
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
)(Product);