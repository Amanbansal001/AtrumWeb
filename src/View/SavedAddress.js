import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list, _put } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import Select from 'react-select-search';

const SavedAddress = (props) => {

    const [address, setaddress] = useState([]);
    const [name, setname] = useState();
    const [addressLine1, setaddressLine1] = useState();
    const [addressLine2, setaddressLine2] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [country, setcountry] = useState();
    const [zipCode, setzipCode] = useState();
    const [pkId, setpkId] = useState();
    const [backendErr, setbackendErr] = useState(``);


    const [countryObj, setcountryobj] = useState([]);
    const [stateObj, setstateObj] = useState([]);
    const [cityObj, setcityObj] = useState([]);

    useEffect(() => {
        fetchAddress();
        fetchCountry();
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
        if (!obj) { return }
        props._list(`city?state_id=${obj.id}`, ``, res => {
            res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
            setcityObj(res.data.fetch);
        })
    }

    const fetchAddress = () => {
        props._list(`orderAddresses?userId=${getProfile().id}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.shippingType == "Shipping");
            setaddress(res.data.fetch);
        })
    }

    const saveAddress = () => {
        if (pkId) {
            updateAddress();
        } else {
            newAddress();
        }
    }

    const newAddress = () => {
        setbackendErr(``);
        if (!name || !addressLine1 || !country || !city || !state || !zipCode) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        if (zipCode.length < 5 || zipCode.length > 10) {
            setbackendErr(`Enter valid zip code`);
            return;
        }

        props._post('orderAddresses', {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 0,
            shippingType: 'Shipping',
            isBillingSame: 0,
            name: name,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
        }, res => {
            setpkId(``)
            fetchAddress();
        })
    }

    const updateAddress = () => {
        setbackendErr(``);
        if (!name || !addressLine1 || !country || !city || !state || !zipCode) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        props._put(`orderAddresses/${pkId}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 1,
            shippingType: 'Shipping',
            isBillingSame: 0,
            name: name,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            id: pkId
        }, res => {
            setpkId(``)
            fetchAddress();
        })
    }


    const delAdd = (data) => {

        props._put(`orderAddresses/${data.id}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            type: `DELETE`,
            id: data.id
        }, res => {
            setpkId(``)
            fetchAddress();
        })
    }

    const defAdd = (data) => {

        props._put(`orderAddresses/${data.id}`, {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 1,
            id: data.id
        }, res => {
            setpkId(``)
            fetchAddress();
        })
    }

    const edit = (data) => {

        setpkId(data.id)
        setname(data.name)
        setaddressLine1(data.addressLine1)
        setaddressLine2(data.addressLine2)
        setcity(data.city)
        setstate(data.state)
        setcountry(data.country)
        setzipCode(data.zipCode)

        window.window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <section className="checkout-headsec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="main-head d-none d-sm-block">My Addresses</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-sec">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 d-none d-sm-block">
                                <div className="filter">
                                    <div className="filter-box">
                                        <ul className="filter-list">
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            <li><Link to="/profile">My Profile</Link></li>
                                            
                                            <li className={`active`}><Link to="/saved/address">My Address</Link></li>
                                           
                                            <li><Link to="/wishlist">My Wishlist</Link></li>
                                            <li><Link to="/order/history">My Order History</Link></li>
                                            <li><Link to="/bid/history">My Bid History</Link></li>
                                            <li><Link to="/logout"><img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src="/assets/images/logout.png" style={{ marginRight: "10px" }} /> Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="checkout-box">
                                    <div className="row">
                                        <div className="col-md-11">
                                            <h3 className="main-head d-none d-sm-block">My Save Address</h3>
                                            <div className="checkout-formbox">
                                                <form action="#" method="post">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Name <i className="text-danger">*</i></label>
                                                        </div>
                                                        <div className="col-md-9 form-group">
                                                            <input type="text" placeholder="name *" className="form-control" maxLength={50} value={name} onChange={e => setname(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Ship To: <i className="text-danger">*</i></label>
                                                        </div>
                                                        <div className="col-md-9 form-group mbn">
                                                            <input type="text" placeholder="address 1 *" className="form-control mb-3" value={addressLine1} onChange={e => setaddressLine1(e.target.value)} />
                                                            <input type="text" placeholder="address 2 " className="form-control mb-3" value={addressLine2} onChange={e => setaddressLine2(e.target.value)} />
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Country:<i className="text-danger">*</i></label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                           
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
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>State: <i className="text-danger">*</i></label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                           
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
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>City: <i className="text-danger">*</i></label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            
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
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Pin/Zip: <i className="text-danger">*</i></label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            <input type="text" className="form-control" minLength={`5`} maxLength={`10`} value={zipCode}
                                                                            onKeyPress={(event) => {
                                                                                if (!/[0-9]/.test(event.key)) {
                                                                                  event.preventDefault();
                                                                                }
                                                                              }}
                                                                            onChange={e => setzipCode(e.target.value)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-danger text-center mb-sm-3`}>{backendErr}</div>
                                                    <div className="row mt-sm-4 mt-2">
                                                        <div className="col-md-3" />
                                                        <div className="col-md-9">
                                                            <div className="row">
                                                                <div className="col-md-5">
                                                                    <a className="btn-btn hover" onClick={() => edit({
                                                                        id: ``,
                                                                        name: ``,
                                                                        addressLine1: ``,
                                                                        addressLine2: ``,
                                                                        country: ``,
                                                                        zipCode: ``,
                                                                        state: ``,
                                                                        zipCode: ``,
                                                                        city: ``,
                                                                    })}>Cancel</a>
                                                                </div>
                                                                <div className="col-md-2" />
                                                                <div className="col-md-5">
                                                                    <a className="btn-black hover" onClick={saveAddress}>Save</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="saved-shipaddress">
                                                <h3 className="inner-head">Saved Shipping Address</h3>
                                                <div className="row mt-1 mt-sm-5">

                                                    {address && address.length > 0 ? address.map((data, idx) => {
                                                        return (
                                                            <div className="col-md-6" key={idx}>
                                                                <div className="address-card">
                                                                    <h4 className="address-cardhead">{data.name}
                                                                        {data.isDefault === 1 ?
                                                                            <span>Default</span>
                                                                            : <span className="setdefault hover" onClick={() => defAdd(data)}>Set as Default</span>
                                                                        }
                                                                    </h4>
                                                                    <p className="address-box">{data.addressLine1},{data.addressLine2},{data.city},{data.state},{data.country},{data.zipCode} { }</p>
                                                                    <div className="card-btnbox">
                                                                        <div className="row">
                                                                            <div className="col-md-5">
                                                                                <a className="btn-btn hover" onClick={() => edit(data)}>Edit</a>
                                                                            </div>
                                                                            <div className="col-md-2" />
                                                                            <div className="col-md-5">
                                                                                <a href="#" className="btn-black" onClick={(e) => { e.preventDefault(); delAdd(data) }}>Remove</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) : null}


                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
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
        _put
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavedAddress);