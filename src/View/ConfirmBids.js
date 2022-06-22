import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getProfile } from "../Utils/token";
import Select from 'react-select-search';

const ConfirmBids = (props) => {

    const location = useLocation();
    const profile = getProfile();
    const [productId, setproductId] = useState(parseInt(props.match.params.id));
    const [productById, setproductById] = useState();
    const [name, setname] = useState();
    const [country, setcountry] = useState();
    const [addressLine1, setaddressLine1] = useState();
    const [addressLine2, setaddressLine2] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [zipCode, setzipCode] = useState('0');
    const [phone, setphone] = useState();
    const [bidStatus, setbidStatus] = useState();
    const [backendErr, setbackendErr] = useState(``);
    const [premium, setpremium] = useState(0)

    const [countryObj, setcountryobj] = useState([]);
    const [stateObj, setstateObj] = useState([]);
    const [cityObj, setcityObj] = useState([]);
    const [pkId, setpkId] = useState();
    const [address, setaddress] = useState([]);

    useEffect(() => {
        fetchAddress();
        fetchProductById();
        fetchCountry();
        fetchState();
    }, [])

    useEffect(() => {
        if (country) {
            fetchState();
        }
    }, [country])

    useEffect(() => {
        if (state) {
            fetchCity();
        }
    }, [state])

    useEffect(() => {
        const defaultAdd = address.find(e => e.isDefault == 1);
        if (defaultAdd) {
            handleSelectedAddress(defaultAdd.id);
        }
    }, [address])

    const fetchProductById = () => {
        if (isNaN(productId)) { return }
        props._list(`products/${productId}`, ``, res => {
            //res.data.fetch=res.data.fetch.filter(e=>e.active==1);
            if (props.location && props.location.state) {
                res.data.fetch.price = parseFloat(props.location.state.price);
                res.data.fetch.auctionId = props.location.state.auctionId;
            }
           
            setproductById(res.data.fetch);
        })
    }

    const setNewPrice = (price) => {
        setproductById({ ...productById, price: price });
    }

    const saveBid = () => {
        setbackendErr(``);
        if (!name || !addressLine1 || !phone || !country || !city || !state) {
            setbackendErr(`Please complete form to continue`);
            return;
        }
        if (!zipCode) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        if (zipCode.length < 5 || zipCode.length > 10) {
            setbackendErr(`Enter valid zip code`);
            return;
        }

        if (!getProfile()) {
            setbackendErr(`Kindly Login to continue`);
            return;
        }

        props._post('productBids', {
            userId: (getProfile()) ? getProfile().id : 0,
            phone: phone,
            name: name,
            productId: productId,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            bidPrice: productById.price,
            auctionId: productById.auctionId,
            bidStatus: 'Pending'
        }, res => {
            let product = [];
            let prod;
            prod = productById;
            prod = { ...prod, isAuction: true, bidId: res.data.fetch.id, price: parseFloat(props.location.state.price) };
            product.push(prod);
            localStorage.setItem("cart", JSON.stringify(product));
            props.history.push('/cart');
        }, err => {
            alert(err.response.data.errorMessage)
        })
    }

    const fetchCountry = () => {
        let d = localStorage.getItem("country");
        if (d) {
            let f = JSON.parse(d);
            f = f.map(e => { return { ...e, value: e.name, name: e.name } })

            setcountryobj(f);
            return;
        }
        props._list('country', ``, res => {
            localStorage.setItem("country", JSON.stringify(res.data.fetch))
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
            setcountryobj(res.data.fetch);
        })
    }

    const fetchState = () => {
        let obj = countryObj.find(e => e.name == country);
        if (!obj) { return }
        props._list(`state?country_id=${obj.id}`, ``, res => {
            res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
            setstateObj(res.data.fetch);
        })
    }

    const fetchCity = () => {
        let obj = stateObj.find(e => e.name == state);

        if (!obj) {

            let obj = countryObj.find(e => e.name == country);
            
            props._list(`state?country_id=${obj.id}&limit=1000`, ``, res => {
              
                let obj = res.data.fetch.find(e => e.name == state);
               
                props._list(`city?state_id=${obj.id}`, ``, res => {
                    res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
                    res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
                    setcityObj(res.data.fetch);
                })
            })

        } else {
            props._list(`city?state_id=${obj.id}`, ``, res => {
                res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
                res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
                setcityObj(res.data.fetch);
            })
        }
    }

    const fetchAddress = () => {
        if (!profile) { return }
        props._list(`orderAddresses?userId=${profile.id}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.shippingType == "Shipping");
            setaddress(res.data.fetch);
        })
    }

    const handleSelectedAddress = (id) => {

        let data = address.find(e => e.id == id);
        
        if (data) {
            setpkId(data.id)
            setname(data.name)
            setaddressLine1(data.addressLine1)
            setaddressLine2(data.addressLine2)
            setcity(data.city)
            setstate(data.state)
            setcountry(data.country)
            setzipCode(data.zipCode)
        } else {
            setpkId(``)
            setname(``)
            setaddressLine1(``)
            setaddressLine2(``)
            setcity(``)
            setstate(``)
            setcountry(``)
            setzipCode(``)
        }
    }

    const handleFilter = (items) => {
      
        return (searchValue) => {
            if (searchValue.length === 0) {
                return items;
            }
            const updatedItems = items.filter((item) => {
                
                return item.name.toLowerCase().includes(searchValue.toLowerCase());
                
            });
            return updatedItems;
        };
    };

    return (
        <>
            <AtrumLayout {...props}>
                {!productById ?
                    <div className={`text-center`}>No Auction Product Found</div>
                    : <>
                        <section className="confirm-sec">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="confirm-left">
                                            <h3 className="main-head confirmmbobidtxtmain">Confirm Your Bid</h3>
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={productById.productImage} className="img-fluid" />
                                            <h2 className="bid-title">{productById.productName}, {productById.publishYear}<span>by {productById.user.name}</span></h2>
                                            <div className="current-bids text-center">
                                                <div className="row">
                                                    <div className="col-md-7">
                                                        <a href="#" className="bids-show">Current Bid: $ {productById.price}</a>
                                                    </div>
                                                    <div className="col-md-5 bids-add">
                                                        <p>Place Your Max Bid:</p>
                                                        <div className="dropdown">
                                                            <button type="button" className="btn btn-primary dropdown-toggle2"
                                                            >USD $ {productById.price}</button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bidpage-list">
                                                <ul>
                                                    <li><span>Your max bid:</span><span>$ {productById.price}</span></li>
                                                    <li><span className="subtotal">Subtotal</span><span className="cost">$ {parseFloat(productById.price) + parseFloat(premium)}</span></li>
                                                </ul>
                                                <p>Plus any applicable shipping, taxes, and fees.</p>
                                            </div>
                                            <div className="lastbid-text">
                                                <h5>Please share your credit card details to confirm the bid.</h5>
                                                <p>Registration is free. Atrum will never charge this card without your permission,
                                                    and you are free to use any payment method or card to pay if you win.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="confirm-right">
                                            <h3 className="main-head confirmmbobidtxtmain">Information</h3>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>Name:</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" placeholder="Your full name" className="form-control" value={name} onChange={e => setname(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-md-3 pr-0">
                                                    <label>Address line 1:</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" placeholder="Add apt.,floor,suite,building" className="form-control" value={addressLine1} onChange={e => setaddressLine1(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>Address line 2 <br />(opional):</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" placeholder="Add apt.,floor,suite,building" className="form-control" value={addressLine2} onChange={e => setaddressLine2(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>Country:</label>
                                                </div>
                                                <div className="col-md-9">
                                                    
                                                    <Select
                                                        className="searchselectBox"
                                                        placeholder="Search Country"
                                                        search
                                                        filterOptions={handleFilter}
                                                        options={countryObj}
                                                        value={country || ``} onChange={(e) => setcountry(e)}
                                                    ></Select>

                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>State/Province:</label>
                                                </div>
                                                <div className="col-md-9">
                                                   
                                                    <Select
                                                        className="searchselectBox"
                                                        placeholder="Search State"
                                                        search
                                                        filterOptions={handleFilter}
                                                        options={stateObj}
                                                        value={state || ``} onChange={(e) => setstate(e)}
                                                    ></Select>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>City:</label>
                                                </div>
                                                <div className="col-md-9">
                                                   

                                                    <Select
                                                        className="searchselectBox"
                                                        placeholder="Search City"
                                                        search
                                                        filterOptions={handleFilter}
                                                        options={cityObj}
                                                        value={city || ``} onChange={(e) => { setcity(e) }}
                                                    ></Select>
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>Phone Number:</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" value={phone} placeholder="Add phone number" className="form-control" onChange={
                                                        e => setphone(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-3">
                                                    <label>Zip code:</label>
                                                </div>
                                                <div className="col-md-9">
                                                    <input type="text" minLength={`5`} maxLength={`10`} placeholder="Zip Code" className="form-control" value={zipCode} 
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                          event.preventDefault();
                                                        }
                                                      }}
                                                    onChange={e => setzipCode(e.target.value)
                                                    } />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="agree">I agree to <a href="/condition-of-sale" target="_blank">Conditions of Sale</a></p>
                                                </div>
                                            </div>

                                            <div className={`row`}>
                                                <div className={`col-md-12 text-danger text-sm-center mb-3`}>{backendErr}</div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-md-12 text-center">
                                                    <input type="submit" className="confirm-btn" defaultValue="Confirm Your Bid" onClick={saveBid} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>}
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
)(ConfirmBids);