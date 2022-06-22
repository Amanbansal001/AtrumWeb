import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import ProductView from "../Components/ProductView";
import queryString from 'query-string';

const ProductListing = (props) => {
    
    const propsQuery = queryString.parse(props.location.search);
    
    
    return (
        <>
            <AtrumLayout {...props}>
                <section className="inner-bredcrum">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bredcrum-box">
                                    <ul>
                                        <li><a href="#">Products</a></li>
                                    </ul>
                                    {propsQuery && propsQuery.search?
                                        <div>Search result for "{propsQuery.search}"</div>
                                    :<></>}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ProductView {...props} />
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
)(ProductListing);