import React, { useEffect, useState } from "react";
import { _post, _list } from "../Store/action/crud";
import queryString from 'query-string';
import _ from "lodash";

const ProductView = (props) => {
    
    const propsQuery = queryString.parse(props.location.search);
    const [products, setproducts] = useState([]);
    const [categorys, setcategorys] = useState([]);
    const [catArr, setcatArr] = useState([]);
    const [artistArr, setartistArr] = useState([]);
    const [artist, setartist] = useState([])

    useEffect(() => {
        if (!propsQuery.category) {
            fetchAPI();
        }
        fetchCategory();
        fetchArtist();
    }, [])

    useEffect(() => {
        if (propsQuery.category) {
            window.window.scrollTo({ top: 0, behavior: 'smooth' });
            fetchCategory();

            setcatArr(propsQuery.category.split(","))
        }
    }, [propsQuery.category])

    useEffect(() => {
        fetchAPI();
    }, [catArr.length])

    useEffect(() => {
        fetchAPI();
    }, [artistArr.length])


    const fetchAPI = () => {
        fetchProducts();
    }

    const fetchCategory = () => {
        props._list('categorys', ``, res => {
            setcategorys(res.data.fetch);
        })
    }

    const fetchProducts = () => {
        const isWonderRoom = (props.isWonderRoom) ? 1 : 0;
        props._list('products/all', `?isWonderRoom=${isWonderRoom}&categoryIdIn=${catArr.join(",")}&userIdIn=${artistArr.join(",")}&active=1&isStock=1`, res => {
            res.data.fetch = _.uniqBy(res.data.fetch, 'id');
            setproducts(res.data.fetch);
        })
    }

    const fetchArtist = () => {
        const isWonderRoom = (props.isWonderRoom) ? 1 : 0;
        props._list('users', `?roleType=Artist&status=1&isWonderRoom=${isWonderRoom}`, res => {
            res.data.fetch = _.orderBy(res.data.fetch, [user => user.name.toLowerCase()], ['asc']);
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
      
        setartistArr([]);
        document.getElementById("search").value = "";
        props.history.push(`/product?search=`);
    }

    return (
        <>

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
                            <section className="featured-sec artist-work">
                                <div className="container">
                                    <div className="row">
                                        <div className="card-columns">
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

            {!props.isWonderRoom || props.isWonderRoom == 0 ?
                <section className="featured-sec artist-work">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <h3 className="main-head pl-0 pl-sm-3">Related Artworks</h3>
                            </div>
                        </div>
                        <div className="row mt-3 flex-wrapinher">
                            {products && products.length > 0 ? products.slice(0, 4).map((data, idx) => {
                                return (

                                    <div key={idx} className="col-md-3 col-5" onClick={() => productSection(data.id)}>
                                        <div className="feature-box">
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={data.productImage} className="img-fluid" />
                                            <p>{data.productName} <span>{data.publishYear}</span></p>
                                            <h5 className="cost">US$ {data.price}</h5>
                                        </div>
                                    </div>
                                )
                            }) : null}

                        </div>
                    </div>
                </section>
                : null}
        </>
    );
}


export default ProductView;