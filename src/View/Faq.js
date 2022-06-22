import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

const Faq = (props) => {


    return (
        <>
            <AtrumLayout {...props} homePage={true} >
                <section className="faq-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <h3 className="main-head">Frequently Asked Questions</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <div id="accordion">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <a className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    What is Lorem Ipsum?
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="card-body">
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making
                                                it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                                                consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                                                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                                                This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                                                comes from a line in section 1.10.32.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <a className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Collapsible Group Item #2
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                            <div className="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <a className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Collapsible Group Item #3
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div className="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
    }, dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Faq);