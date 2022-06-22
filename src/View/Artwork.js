import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import * as _ from 'lodash';
import queryString from 'query-string';

const Artwork = (props) => {

    const propsQuery = queryString.parse(props.location.search);
    const [products, setproducts] = useState([]);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const [categorys, setcategorys] = useState([]);
    const [catArr, setcatArr] = useState([]);
    const [artistArr,setartistArr]=useState([]);
    const [pName, setpName] = useState();
    const [artist,setartist]=useState([])

    useEffect(() => {
        fetchAPI();
    }, [])

    useEffect(() => {
        setpName(propsQuery.search)
        fetchAPI();
        fetchCategory()
        fetchArtist();

        if (propsQuery.search && catArr.length === 0) {
            fetchRelatedProducts()
        }

    }, [propsQuery.search])

    useEffect(() => {
        fetchAPI();
    }, [catArr.length])

    useEffect(() => {
        fetchAPI();
    }, [artistArr.length])

    const fetchAPI = () => {
        fetchProducts();
    }

    const fetchProducts = () => {
        let _pName = (!propsQuery.search) ? '' : (propsQuery.search);
        
        props._list('products/all', `?active=1&isWonderRoom=0&isStock=1&productNameLike=${_pName}&$category.categoryNameLike$=${_pName}&$user.nameLike$=${_pName}&categoryIdIn=${catArr.join(",")}&userIdIn=${artistArr.join(",")}`, res => {
            setproducts(res.data.fetch);
        })
    }

    const fetchRelatedProducts = () => {
        props._list('products/all', `?categoryIdIn=${catArr.join(",")}&userIdIn=${artistArr.join(",")}&active=1&isStock=1`, res => {
            res.data.fetch = _.shuffle(res.data.fetch);
            setrelatedProducts(res.data.fetch);
        })
    }

    const fetchCategory = () => {
        props._list('categorys', ``, res => {
            setcategorys(res.data.fetch);
        })
    }

    const fetchArtist = () => {
        props._list('users', `?roleType=Artist&status=1&isWonderRoom=0`, res => {
            res.data.fetch = _.orderBy(res.data.fetch,[user => user.name.toLowerCase()], ['asc']);
            setartist(res.data.fetch);
        })
    }

    const productSection = (id) => {
        props.history.push(`/product/${id}`)
    }

    const handleChangeCat = (e) => {

        let arr = catArr;
        const idx = arr.findIndex(f => f == e);
        if (idx > -1) {
            arr.splice(idx, 1);
            setcatArr([...arr]);
        } else {
            arr.push(e);
            setcatArr([...arr]);
        }

    }

    const handleChangeArtist = (e) => {

        let arr = artistArr;
        const idx = arr.findIndex(f => f == e);
        if (idx > -1) {
            arr.splice(idx, 1);
            setartistArr([...arr]);
        } else {
            arr.push(e);
            setartistArr([...arr]);
        }

    }

    const reset = (e) => {
        e.preventDefault();
        setpName('');
        setcatArr([])
        setartistArr([]);
        document.getElementById("search").value = "";
        props.history.push(`/artwork?search=`);
    }

    return (
        <>
            <AtrumLayout {...props}>
            
            {propsQuery && propsQuery.search ?
                <section className="inner-bredcrum d-block d-sm-none">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box"> 
                                    <div>Search result for "{propsQuery.search}"</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            : <></>}

                
                <section className="inner-bredcrum d-none d-sm-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    <ul>
                                        <li><a href="#">Artwork</a></li>
                                        
                                    </ul>
                                    {propsQuery && propsQuery.search ?
                                        <div>Search result for "{propsQuery.search}"</div>
                                        : <></>}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="product-listing-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="filter">
                                    <div id="accordion" className="filteraccordian">
                                        <div class="card">
                                            <div class="card-header mt-1 mb-0 mb-sm-3" id="headingOne">
                                                <h5 class="mb-0">
                                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <h3 className="filter-head">Filter By</h3>
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" class="showdemo collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div class="card-body">
                                                    <div className="filter-box">
                                                        <h4>Category</h4>
                                                        {categorys && categorys.length > 0 ? categorys.map((data, idx) => {
                                                            return (
                                                                <label key={idx} className="checkcontainer">{data.categoryName}
                                                                    <input type="checkbox" onChange={(e) => { handleChangeCat(data.id) }} checked={(catArr.find(e => e == data.id)) ? true : false} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                            )
                                                        }) : null}

                                                    </div>

                                                    <div className="filter-box">
                                                        <h4>Artist</h4>
                                                        {artist && artist.length > 0 ? artist.map((data, idx) => {
                                                            return (
                                                                <label key={idx} className="checkcontainer">{data.name}
                                                                    <input type="checkbox" onChange={(e) => { handleChangeArtist(data.id) }} checked={(artistArr.find(e => e == data.id)) ? true : false} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                            )
                                                        }) : null}

                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>

                                    <div className="row col-md-2 text-center">
                                        <a href="#" className="view-all follow" onClick={reset}>Reset</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <section className="featured-sec artist-work artist-worknewBox">
                                    <div className="container">
                                        <div className="row">
                                            <div  className="card-columns">
                                            {products && products.length > 0 ? products.map((data, idx) => {
                                                return (

                                                    <div key={idx} className="card" onClick={() => productSection(data.id)}>
                                                        <div className="feature-box">
                                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" />
                                                            <p>{data.productName} <span>{data.publishYear}</span></p>
                                                            
                                                        </div>
                                                    </div>
                                                )
                                            }) : <div className={`text-center productnofoundmobile`}><h1>No product found</h1></div>}
                                            </div>
                                        </div>
                                       
                                    </div>
                                </section>
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
)(Artwork);