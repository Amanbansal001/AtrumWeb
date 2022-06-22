import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const Category = (props) => {

    const [categorys, setcategorys] = useState([]);

    useEffect(() => {
        fetchCategory();
    }, [])



    const fetchCategory = () => {
        props._list('categorys?v=2', ``, res => {
            setcategorys(res.data.fetch);
        })
    }

    return (
        <>

            <AtrumLayout {...props}>
                <section className="inner-bredcrum">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    <ul>
                                        <li><a href="#">Categories</a></li>
                                        
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
                                <h3 className="main-head">Categories</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <ul className="category-list">
                                    {categorys && categorys.length > 0 ? categorys.map((data, idx) => {
                                        return (
                                            <li key={idx}><Link to={`/product/listing?category=${data.id}`}>{data.categoryName}</Link></li>
                                        )
                                    }) : null}
                                </ul>
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
)(Category);