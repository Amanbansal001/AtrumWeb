import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import CertificatePopup from "../Components/CertificatePopup";
import Share from "../Components/Share";
import ZoomImage from "../Components/ZoomImage";
import { auctionDate, isMobile } from "../Utils";


const bids = [3, 6, 9, 12, 18, 25, 28, 30, 35, 40, 45, 60, 65, 70, 75, 100]

const AuctionLanding = (props) => {


    const location = useLocation();
    const profile = getProfile();
    const [productId, setproductId] = useState();
    const [productById, setproductById] = useState();
    const [featuredArt, setfeaturedArt] = useState([]);
    const [followText, setfollowText] = useState(`Follow`);
    const [prev, setprev] = useState();
    const [next, setnext] = useState();
    const [bidPrice, setbidPrice] = useState(`1000`);
    const [days, setdays] = useState(0);
    const [hours, sethours] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [seconds, setseconds] = useState(0);
    const [auctionu, setauctionu] = useState();
    const [auctionp, setauctionp] = useState();
    const [auctionId,setauctionId]=useState()

    useEffect(() => {
        fetchAPI();
    }, [])

    useEffect(() => {

        if (location.pathname) {
            
            setnext(null)
            setprev(null)
            setfollowText(`Follow`)
            setproductId(parseInt(props.match.params.id))
            setauctionId(props.match.params.auctionId)
        }

    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchAPI();
        upcoming();
    }, [productId])

    const fetchAPI = () => {
        fetchProductById();
        fetchfeaturedArt();
    }

    const fetchProductById = () => {
        if (!productId || !auctionId) { return }
        props._list(`auction/${productId}`, `?productId=${productId}&auctionId=${auctionId}`, res => {
            if (res.data.fetch.follow) {
                setfollowText(`Followed`)
            }

            if(res.data.fetch.wishlist){
                res.data.fetch.like=true;
            }else{
                res.data.fetch.like=false;
            }
            
            res.data.fetch.product.expiryDate = res.data.fetch.auctionName.expiryDate;
            res.data.fetch.product.price = parseFloat(res.data.fetch.price);
            res.data.fetch.product.bidPrice = parseFloat(res.data.fetch.price);

            setproductById(res.data.fetch.product);
            countdown(res.data.fetch);
        })
    }

    const fetchfeaturedArt = () => {

        props._list(`products/all?notInid=${productId}`, ``, res => {
            res.data.fetch=res.data.fetch.filter(e=>e.active==1);
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


    const upcoming = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setauctionu(res.data.fetch);
            setauctionp(res.data.fetch);
        })
    }

    const past = () => {
        props._list('products/all?sortBy=desc&active=1&isStock=1', ``, res => {
            setauctionp(res.data.fetch);
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

    const setNewPrice = (price) => {
        setproductById({ ...productById, bidPrice: price });
    }

    const auctionLanding = () => {
        props.history.push(`/auction/1?_r=${Date.now()}`);
    }

    const countdown = (res) => {
        // Set the date we're counting down to
        var countDownDate = new Date(res.auctionName.expiryDate).getTime();

        // Update the count down every 1 second
        var x = setInterval(() => {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"

            setdays(days);
            sethours(hours);
            setminutes(minutes);
            setseconds(seconds);


        }, 1000);
    }

    const addToCart = (e) => {
        localStorage.removeItem("cart");
        e.preventDefault();

        if(productById.bidPrice<productById.price){
            alert(`Bid price cannot be less than min Bid price`);
            return;
        }
        localStorage.removeItem("cart");
        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let isExist = product.find(e => e.id === productById.id);
            if (!isExist) {
                let prod = productById;;
                prod = {...prod,isAuction:true,price:productById.bidPrice};
                product.push(prod);
                localStorage.setItem("cart", JSON.stringify(product));
            }
        } else {
            product = [];
            let prod = productById;;
            prod = {...prod,isAuction:true,price:productById.bidPrice};
            product.push(prod);
            localStorage.setItem("cart", JSON.stringify(product));
        }
        props.history.push({
            pathname: `/confirm/bid/${auctionId}/${productId}`,
            state: { price: productById.bidPrice,auctionId:auctionId }
        });
        
    }

    const like = (e, data) => {
        e.preventDefault();

        const profile = getProfile();
        if (!profile) { alert(`Kindly login to continue`); return; }
        props._post(`wishlists`,{
            productId:data.id,
            userId:(profile)?profile.id:0
        },res=>{
            const temp = productById;
            
            if (temp.like) {
                temp.like = false;
            } else {
                temp.like = true;
            }


            setproductById({...temp});
        },err=>{

        })

        
    }

    return (
        <>
            <AtrumLayout {...props}>
                {!productById ?
                    <div className={`text-center`}>No Auction Product Found</div>
                    : <>
                       
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
                                                            <a href="#" className="follow followartisebutton float-left ml-0" onClick={follow}>{followText}</a> 
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
                                                                <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/heart-transparent.png" className="unlike" />
                                                                :
                                                                <img onError={(e)=>{e.target.onerror = null; e.target.src="/assets/images/placeholder.png"}} src="/assets/images/heart-black.png" className="like" />
                                                            }
                                                </a>
                                            </div>
                                        </div>
                                        <div className="view-share-box">
                                            <ul>
                                            {productById.isViewRoom=="1" && !isMobile()?
                                                <li><Link to={`/viewing-room/${productId}`}><i className="fa fa-eye" /> View In room</Link></li>
                                            :null}
                                                <li><a href="#" data-toggle="modal" data-target="#shareModal"><i className="fa fa-share-alt" /> Share</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-text">
                                            <div className="short-description landingp">
                                            <h3>{productById.productName}, {productById.publishYear}</h3>
                                                
                                                <p>{productById.material}</p>
                                                {productById.gallery?
                                                <p>Part of {productById.gallery}</p>
                                                :null}
                                                <p>{productById.length}</p>
                                                <p>{productById.frame}</p>
                                                <p>{productById.edition}</p>
                                                <p>{productById.productDescription}</p>
                                               
                                            </div>
                                            <div className="bid-text">
                                                <h3>Starting Bid: US$ {productById.price}</h3>
                                                
                                                <div className="form-group" style={{width:`260px`}}>
                                                    <label for="name">Place your bid</label>
                                                    <input type="number" className="form-control" id="bidPrice" value={productById.bidPrice} placeholder="Bid Price" onChange={(e)=>setNewPrice(e.target.value)} />
                                                </div>
                                                
                                            </div>
                                            <div className="sale-box landing-sale">
                                                <a href="#" onClick={e => addToCart(e)} className="buy-btn">Bid Now</a>
                                                <p>Live {auctionDate(productById.expiryDate)}</p>
                                                <ul className="counter-list">
                                                    <li>
                                                        <div className="counter">
                                                            <h2 className="timer count-title count-number" data-to={0} data-speed={1000} />
                                                            <p className="count-text ">{days}d</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="counter">
                                                            <h2 className="timer count-title count-number" data-to={2} data-speed={2500} />
                                                            <p className="count-text ">{hours}h</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="counter">
                                                            <h2 className="timer count-title count-number" data-to={57} data-speed={1500} />
                                                            <p className="count-text ">{minutes}m</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="counter">
                                                            <h2 className="timer count-title count-number" data-to={59} data-speed={1500} />
                                                            <p className="count-text ">{seconds}s</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
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
                                            <h3 className="title">About the Artwork <a href="#" className="follow" onClick={follow}>{followText}</a></h3>
                                            <ul>
                                               
                                                {productById.collection?
                                                <>
                                                <li>Collection:</li>
                                                <li>{productById.collection}</li>
                                                </>:null}
                                                {productById.medium?
                                                <>
                                                <li>Medium:</li>
                                                <li>{productById.medium}</li>
                                                </>:null}
                                                
                                                {productById.frame?
                                                <>
                                                <li>Frame:</li>
                                                <li>{productById.frame}</li>
                                                </>:null}
                                            </ul>
                                        </div>
                                        <div className="description-box bor-out pt-4">
                                            <h3 className="title">About the Artist</h3>
                                            <h2 className="mt-5 desc-title">{productById.user.name}</h2>
                                            <p>{productById.user.bio}</p>
                                            <ul className="top-pagination mt-4 mt-sm-5">
                                                {prev ?
                                                    <li><Link to={`/auction/${prev}`}><i className="fa fa-arrow-left" /> Previous</Link></li>
                                                    : null}
                                                <li><Link to={`/auction/${next}`}>Next <i className="fa fa-arrow-right" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                    </>}

                <CertificatePopup {...props} productById={productById} />
                <ZoomImage {...props} image={(productById)?productById.productImage:''}/>
                <Share {...props} productById={productById} />
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
)(AuctionLanding);