import _, { zip } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import PaymentWait from "../Components/PaymentWait";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import { getProfile } from "../Utils/token";
import Select from 'react-select-search';
import $ from 'jquery';
import PaymentWaitLimit from "../Components/PaymentWaitLimit";


const USD_TO_SAR = 3.75
const TEST_USERID = 316;

const CheckoutOrder = (props) => {

    const profile = getProfile();

    const [carts, setcarts] = useState();
    const [total, settotal] = useState(0.00);

    const [address, setaddress] = useState([]);
    const [name, setname] = useState();
    const [addressLine1, setaddressLine1] = useState();
    const [addressLine2, setaddressLine2] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [country, setcountry] = useState();
    const [zipCode, setzipCode] = useState();

    const [baddress, setbaddress] = useState([]);
    const [bname, setbname] = useState();
    const [baddressLine1, setbaddressLine1] = useState();
    const [baddressLine2, setbaddressLine2] = useState();
    const [bcity, setbcity] = useState();
    const [bstate, setbstate] = useState();
    const [bcountry, setbcountry] = useState();
    const [bzipCode, setbzipCode] = useState();

    const [pkId, setpkId] = useState();
    const [bpkId, setbpkId] = useState();
    const [backendErr, setbackendErr] = useState(``);

    const [countryObj, setcountryobj] = useState([]);
    const [stateObj, setstateObj] = useState([]);
    const [cityObj, setcityObj] = useState([]);
    const [vat, setvat] = useState(0);
    const [shipping, setshipping] = useState(0);

    const [shippings, setshippings] = useState()
    const [shippingAmt, setshippingAmt] = useState(0)
    const [shippingAwait, setshippingAwait] = useState(true)
    const [isAuction, setisAuction] = useState(false);
    const [SippingAmount, setSippingAmount] = useState([])
    const [isProceed, setisProceed] = useState(false)
    const prevCountRef = useRef();

    useEffect(() => {
        getSippingAmount();

       
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


    useEffect(() => {
        if (zipCode) {

            let c = localStorage.getItem("cart");
            c = JSON.parse(c);
            if (c[0].logistics == "DHL") {
                getDHLTax(c);
            }
        }
    }, [zipCode])

    useEffect(() => {
        let c = localStorage.getItem("cart");
        if (!c) {
            props.history.push('/');
            return;
        }

        c = JSON.parse(c);

        let obj = countryObj.find(e => e.name == country);
        if (obj && obj.vat) {
            setvat(parseFloat(obj.vat));
        }


        if (c[0].logistics == "DHL") {
            getDHLTax(c);
        } else {

            let tShipping = 0;
            c.forEach(async (e, idx) => {
               
                const shippingprice = SippingAmount.find(f => f.productId == e.id && f.fromCity == e.user.city && f.toCity == city);
                if (shippingprice) {
                    c[idx].shippingAmt = shippingprice.price;
                    tShipping += parseFloat(shippingprice.price);
                } else {
                    c[idx].shippingAmt = 0;
                    if (profile.id == TEST_USERID) {
                        c[idx].shippingAmt = 0.01;
                        tShipping = 0.01
                    }
                }

            })

            let obj = countryObj.find(e => e.name == country);
            if (obj && obj.vat) {
                setvat(parseFloat(obj.vat));
            }

            
            if (profile.id == TEST_USERID) {
                setshippingAmt(0.01);
            } else {
                setshippingAmt(tShipping);
            }

            setcarts([...c]);
        }
    }, [city])

    const artworksShipping = () => {
        props._list('artworksShipping', ``, res => {
            setshippings(res.data.fetch);
        })
    }

    const fetchCountry = () => {
        let d = localStorage.getItem("country");
        if (d) {
            let f = JSON.parse(d);
            f = f.map(e => { return { ...e, value: e.name, name: e.name } })

            setcountryobj(f);
            window.select2_init();
            return;
        }
        props._list('country', ``, res => {
            localStorage.setItem("country", JSON.stringify(res.data.fetch))
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
            setcountryobj(res.data.fetch);

            window.select2_init();
        })
    }

    const fetchState = () => {
        let obj = countryObj.find(e => e.name == country);
        if (!obj) { return }
        props._list(`state?country_id=${obj.id}`, ``, res => {
            res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
            setstateObj(res.data.fetch);

            window.select2_init();
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

                    window.select2_init();
                })
            })

        } else {
            props._list(`city?state_id=${obj.id}`, ``, res => {
                res.data.fetch = _.orderBy(res.data.fetch, [e => e.name.toLowerCase()], ['asc']);
                res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.name, name: e.name } })
                setcityObj(res.data.fetch);
                window.select2_init();
            })
        }
    }

    const getCart = () => {
        let product = localStorage.getItem("cart");
        if (product) {
            product = JSON.parse(product);
            let t = 0;
            let isAuction = false;
            product.forEach(element => {
                t += parseFloat(element.price * element.qty);
                isAuction = (element.isAuction) ? true : false;
            });
            
            setcarts(product);
            settotal(t);
            setisAuction(isAuction);
        } else {
            setcarts([]);
        }
    }


    const getSippingAmount = () => {
        props._list(`artworksShipping`, ``, res => {
           
            setSippingAmount(res.data.fetch)

            getCart();
            fetchAddress();
            fetchCountry();
            artworksShipping();
        });
    }

    const getPaymentId = (res, bres) => {
        
        if (!profile) {
            alert(`Please login in continue`);
            return;
        }


        let tShipping = 0;
        let waitShipping = false;

        carts.forEach((e, idx) => {

            tShipping += parseFloat(e.shippingAmt);

            if (e.shippingAmt <= 0) {
                waitShipping = true;
                if (profile.id == TEST_USERID) {
                    waitShipping = false;
                }
            }
        })

        setshippingAmt(tShipping);
        setisProceed(true);
        const postData = {
            amount: ((total + (parseFloat(vat) * total) / 100) + parseFloat(shippingAmt)),
            shipAddressId: res.id,
            billAddressId: bres.id,
            carts: carts,
            totalShippingAmount: parseFloat(shippingAmt),
            vat: vat,
            orderStatus: (waitShipping) ? `PENDING FOR SHIPPING CHARGES` : `PENDING FOR PAYMENT`,
            orderType: (isAuction) ? 'AUCTION' : 'PRODUCT',
            _content: Date.now()
        };


        props._post(`payment`, postData, res => {
            if (res.data && res.data.payment && res.data.payment.id) {
                
                if (profile.id == TEST_USERID) {
                    props.history.push({
                        pathname: '/do/payment/web/' + res.data.payment.id,
                        state: {
                            paymentId: res.data.payment.id
                        }
                    });
                    return;
                }

                if (!waitShipping) {
                    
                    props.history.push({
                        pathname: '/do/payment/web/' + res.data.payment.id,
                        state: {
                            paymentId: res.data.payment.id
                        }
                    });
                } else {
                    if (res.data.payment.taxes > 0) {
                        props.history.push({
                            pathname: '/do/payment/web/' + res.data.payment.id,
                            state: {
                                paymentId: res.data.payment.id
                            }
                        });
                    } else {
                        window.showBtModal('paymentwait');
                        localStorage.removeItem("cart");
                    }
                }
            }
        }, err => {
            setisProceed(false);
            alert(err.response.data.errorMessage)
        })
    }

    const taxes = (postData) => {
        props._post(`dhl/taxes`, postData, res => {

        }, err => {
            alert(err.response.data.errorMessage)
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

            const c = countryObj.find(e => e.name == data.country);
            if (c && c.vat) {
                setvat(c.vat);
            } else {
                setvat(0)
            }

        } else {
            setpkId(``)
            setname(``)
            setaddressLine1(``)
            setaddressLine2(``)
            setcity(``)
            setstate(``)
            setcountry(``)
            setzipCode(``)
            document.getElementById("sameBilling").checked = false;
        }
    }


    const fetchAddress = () => {
        if (!profile) { return }
        props._list(`orderAddresses?userId=${profile.id}`, ``, res => {
            res.data.fetch = res.data.fetch.filter(e => e.shippingType == "Shipping");
            res.data.fetch = res.data.fetch.map(e => { return { ...e, value: e.id, name: e.addressLine1 } })
            setaddress(res.data.fetch);
        })
    }

    const saveAddress = () => {
        if (!profile) {
            alert(`Please login in continue`);
            return;
        }
        newAddress();
    }

    const handleChangeCountry = (val) => {
        setcountry(val);
        const c = countryObj.find(e => e.name == val);
        if (c && c.vat) {
            setvat(c.vat);
        } else {
            setvat(0)
        }
    }

    const newAddress = () => {
        let newAddressObj = false;
        let shippingObj = address.find(e => e.id == pkId);

        if (shippingObj) {
            if (city != shippingObj.city) {
                newAddressObj = true;
            } else if (state != shippingObj.state) {
                newAddressObj = true;
            } else if (country != shippingObj.country) {
                newAddressObj = true;
            } else if (zipCode != shippingObj.zipCode) {
                newAddressObj = true;
            } else if (addressLine1 != shippingObj.addressLine1) {
                newAddressObj = true;
            } else if (addressLine2 != shippingObj.addressLine2) {
                newAddressObj = true;
            } else if (name != shippingObj.name) {
                newAddressObj = true;
            }
        }

        setbackendErr(``);
        if (!name || !addressLine1 || !country || !city || !state || !zipCode) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        if (zipCode.length < 5 || zipCode.length > 10) {
            setbackendErr(`Enter valid zip code`);
            return;
        }

        if (!bname || !baddressLine1 || !bcountry || !bcity || !bstate || !bzipCode) {
            setbackendErr(`Please complete form to continue`);
            return;
        }

        if (bzipCode.length < 5 || bzipCode.length > 10) {
            setbackendErr(`Enter valid zip code`);
            return;
        }


        if (!newAddressObj && pkId && bpkId) {
            getPaymentId({ id: pkId }, { id: bpkId });
        } else if (!newAddressObj && pkId && !bpkId) {
            createOrderwithNewBillingAdd();
        } else {
            createOrderwithNewAdd();
        }


    }

    const createOrderwithNewAdd = () => {
        props._post('orderAddresses', {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 0,
            shippingType: 'Shipping',
            isBillingSame: 1,
            name: name,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
        }, res => {
            props._post('orderAddresses', {
                userId: (getProfile()) ? getProfile().id : 0,
                isDefault: 0,
                shippingType: 'Billing',
                isBillingSame: 0,
                name: bname,
                addressLine1: baddressLine1,
                addressLine2: baddressLine2,
                city: bcity,
                state: bstate,
                country: bcountry,
                zipCode: bzipCode,
            }, bres => {
                getPaymentId(res.data.fetch, bres.data.fetch);
            })

        })
    }

    const createOrderwithNewBillingAdd = () => {
        props._post('orderAddresses', {
            userId: (getProfile()) ? getProfile().id : 0,
            isDefault: 0,
            shippingType: 'Billing',
            isBillingSame: 0,
            name: bname,
            addressLine1: baddressLine1,
            addressLine2: baddressLine2,
            city: bcity,
            state: bstate,
            country: bcountry,
            zipCode: bzipCode,
        }, bres => {
            getPaymentId({ id: pkId }, bres.data.fetch);
        })
    }

    const sameBilling = (e) => {
        
        if (e.target.checked == true) {
            setbpkId(pkId)
            setbname(name);
            setbstate(state);
            setbzipCode(zipCode);
            setbcountry(country);
            setbcity(city);
            setbaddressLine1(addressLine1);
            setbaddressLine2(addressLine2);
        } else {
            setbpkId(``)
        }
    }

    const getDHLTax = (carts) => {

        var date = new Date();
        date.setHours(10);

        // add a day
        date.setDate(date.getDate() + 7);

        let c = carts;
        if (!city) { return }

        let dimensions = [];
        carts.forEach(e => {
            dimensions.push({
                "weight": parseFloat(e.weight || 0),
                "dimensions": {
                    "length": parseFloat(e.length) || 1,
                    "width": parseFloat(e.breadth) || 1,
                    "height": parseFloat(e.height) || 1
                   
                }
            })
        });

        const artistC = countryObj.find(e => e.name == carts[0].user.country);
        const artistCCode = countryObj.find(e => e.name == country);
        const shipperC = countryObj.find(e => e.name == country);

        const data = {
            _content: Date.now(),
            "customerDetails": {
                "shipperDetails": {
                    "postalCode": carts[0].user.zipCode,
                    "cityName": carts[0].user.city,
                    "countryCode": (artistC) ? artistC.iso2 : '',
                    "provinceCode": (artistCCode) ? artistCCode.iso2 : '',
                    "addressLine1": carts[0].user.address.substring(0, 45)
                },
                "receiverDetails": {
                    "postalCode": zipCode,
                    "cityName": city,
                    "addressLine1": (addressLine1) ? addressLine1.substring(0, 45) : '',
                    "countryCode": (shipperC) ? shipperC.iso2 : ''
                }
            },
            "plannedShippingDateAndTime": (new Date(date)).toISOString(),
            "unitOfMeasurement": "metric",
            "isCustomsDeclarable": false,
            "monetaryAmount": [
                {
                    "typeCode": "declaredValue",
                    "value": 10,
                    "currency": "USD"
                }
            ],
            "requestAllValueAddedServices": false,
            "returnStandardProductsOnly": false,
            "nextBusinessDay": false,
            "packages": dimensions
        };

        props._post(`dhl/taxes`, data, res => {

            if (res.data && res.data.taxes) {
                let tShipping = 0;
                c.forEach(async (e, idx) => {
                    c[idx].shippingAmt = res.data.taxes;
                    
                })

                if (profile.id == TEST_USERID) {
                    setshippingAmt(0.01);
                } else {
                    setshippingAmt(res.data.taxes);
                }

                setcarts([...c]);

                localStorage.setItem("carts", JSON.stringify(c));
            } else {
                let tShipping = 0;
                c.forEach(async (e, idx) => {
                    c[idx].shippingAmt = 0;
                })

                if (profile.id == TEST_USERID) {
                    setshippingAmt(0.01);
                } else {
                    setshippingAmt(0);
                }

                setcarts([...c]);

                localStorage.setItem("carts", JSON.stringify(c));
            }
        }, err => {
            let tShipping = 0;
            c.forEach(async (e, idx) => {
                c[idx].shippingAmt = 0;
            })

            if (profile.id == TEST_USERID) {
                setshippingAmt(0.01);
            } else {
                setshippingAmt(0);
            }

       
            setcarts([...c]);

            localStorage.setItem("carts", JSON.stringify(c));
        }, false)
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
                                <h3 className="main-head d-none d-sm-block">Confirm Your Order</h3>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="checkout-sec">
                    <div className="container-fluid">
                        <div className="row">
                            
                            <div className="col-md-12">
                                <div className="checkout-box">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="main-head">Shipping & Billing Address (Step 2)</h3>


                                            <div className="checkout-formbox">
                                                <form action="#" method="post">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Name</label>
                                                        </div>
                                                        <div className="col-md-9 form-group">
                                                            <input type="text" placeholder="name" className="form-control" maxLength={50} value={name || ``} onChange={(e) => setname(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    {address && address.length > 0 ?
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <label>Select the shipping address:</label>
                                                            </div>

                                                            <div className="col-md-9 form-group">
                                                                
                                                                <Select
                                                                    
                                                                    search={true}
                                                                    className="searchselectBox"
                                                                    name="form-field-name"
                                                                    options={address}
                                                                    placeholder="Select Address"
                                                                    value={pkId || ``} onChange={(e) => handleSelectedAddress(e)}
                                                                ></Select>
                                                            </div>

                                                        </div>
                                                        : null}
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Ship To:</label>
                                                        </div>
                                                        <div className="col-md-9 form-group mbn">
                                                            <input type="text" placeholder="address 1" className="form-control mb-3" value={addressLine1 || ``} onChange={(e) => setaddressLine1(e.target.value)} />
                                                            <input type="text" placeholder="address 2" className="form-control mb-3" value={addressLine2 || ``} onChange={(e) => setaddressLine2(e.target.value)} />
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Country:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            
                                                                            <Select
                                                                                className="searchselectBox"
                                                                                placeholder="Search Country"
                                                                                search
                                                                                filterOptions={handleFilter}
                                                                                options={countryObj}
                                                                                value={country || ``} onChange={(e) => handleChangeCountry(e)}
                                                                            ></Select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>State:</label>
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
                                                                            <label>City:</label>
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
                                                                            <label>Pin/Zip:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            <input type="text" placeholder="zipcode" value={zipCode || ``} className="form-control mb-3" onChange={(e) => setzipCode(e.target.value)} />
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3" />
                                                        <div className="col-md-9">
                                                            <div className="form-check-inline">
                                                                <label className="form-check-label">
                                                                    <input type="checkbox" id="sameBilling" className="form-check-input" onClick={e => sameBilling(e)} />Billing address same as shipping address
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Bill To:</label>
                                                        </div>
                                                        <div className="col-md-9 form-group mbn">
                                                            <input type="text" placeholder="address 1" className="form-control mb-3" value={baddressLine1 || ``} onChange={(e) => setbaddressLine1(e.target.value)} />
                                                            <input type="text" placeholder="address 2" className="form-control mb-3" value={baddressLine2 || ``} onChange={(e) => setbaddressLine2(e.target.value)} />
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Country:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            
                                                                            <Select
                                                                                className="searchselectBox"
                                                                                placeholder="Search Country"
                                                                                search
                                                                                filterOptions={handleFilter}
                                                                                options={countryObj}
                                                                                value={bcountry || ``} onChange={(e) => setbcountry(e.value)}
                                                                            ></Select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>State:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            
                                                                            <Select
                                                                                className="searchselectBox"
                                                                                placeholder="Search State"
                                                                                search
                                                                                filterOptions={handleFilter}
                                                                                options={stateObj}
                                                                                value={bstate || ``} onChange={(e) => setbstate(e)}
                                                                            ></Select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>City:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            
                                                                            <Select
                                                                                className="searchselectBox"
                                                                                placeholder="Search City"
                                                                                search
                                                                                filterOptions={handleFilter}
                                                                                options={cityObj}
                                                                                value={bcity || ``} onChange={(e) => setbcity(e)}
                                                                            ></Select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Pin/Zip:</label>
                                                                        </div>
                                                                        <div className="col-md-9 form-group">
                                                                            <input type="text" placeholder="zipcode" value={bzipCode || ``} className="form-control mb-3" pattern="[0-9]{5}" required onChange={(e) => setbzipCode(e.target.value)} />
                                                                           
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className={`mt-1 mt-sm-4 text-danger text-center mb-0 mb-sm-3`}>{backendErr}</div>
                                                </form>
                                            </div>
                                            <hr className="mt-0 mt-sm-3" />
                                            <div className="subtotal-box">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Subtotal</td>
                                                            <td>$ {total}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>VAT ({vat}%)</td>
                                                            <td>$ {(total * vat) / 100}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping Charges</td>
                                                            <td>{(shippingAmt == 0) ? `Yet to be calculated` : `$ ` + shippingAmt}</td>
                                                        </tr>

                                                        
                                                        <tr>
                                                            <td>Total</td>
                                                            <td>$ {(total + (parseFloat(vat) * total) / 100) + parseFloat(shippingAmt)}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-3" />
                                                <div className="col-md-9">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <a href="#" className="btn-btn" onClick={() => props.history.push('/')}>Close</a>
                                                        </div>
                                                        {!isProceed ?
                                                            <div className="col-md-6">
                                                                <input type="button" defaultValue="Proceed to Pay" className="btn-black" onClick={saveAddress} />
                                                            </div>
                                                            : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <PaymentWait {...props} carts={carts} vat={vat} shippingAmt={shippingAmt} total={total} />
                <PaymentWaitLimit {...props} carts={carts} vat={vat} shippingAmt={shippingAmt} total={total} />
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
)(CheckoutOrder);