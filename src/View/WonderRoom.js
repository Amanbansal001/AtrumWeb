import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";
import ProductView from "../Components/ProductView";
import queryString from 'query-string';

const WonderRoom = (props) => {

    const propsQuery = queryString.parse(props.location.search);


    return (
        <>
            <AtrumLayout {...props}>

                 
                <section className="">
                    <div className="">
                        <div className="d-sm-block d-none">
                            <div className="">
                                <div className="">
                                    <img style={{ width: "100%" }} src="https://lh3.googleusercontent.com/fife/AAWUweW6YBG-CLPxQEDwClkxbtD0ZLNd5gc3TAo6RjxJAYysIWKaZD-GKEU78Rr02zPffBT8rWAAWAKlBL8zOQf4rGC_HOTA8I_szDwXRdI6aV5HSlSrszI0j9a-sGIXPmAGpQBVdD7dQxDPBa3y8N1TErGcryWKkkaFyQtCm9RyUOCy5c-YmiJ7YtpZr-jsz-d70QAVil8VFteb1Fyw5GDdpdfpwX1VBIcQiJAdJjqz-u2AouHETXQ1NIfM1okb9RJ8Sm6kSRhWcZybu91VB32JmYAQzDWnXvn5pyS_k4TExwCoxG9NBrH5ICp89vu7gMP55TUGZJQPIzhGSBRjB0GqaljjEtRHyfT2yjFB2jsIRfuGiy1xHcNyyoMKqZJ0Nc8lHfYDuFetZVCQZKq6IqdbU7HjpPyO-zP6XpOmtzlhC7UDJwsqaBAT0-tE8znX7pj7B3RlcqOe3BOjNAgSRyjKE0snxjAcpN4jXshYloqi_czTwEjaYA86JuZwbIBw5hbTPx6VqT3qi1CuMdWZEt0gevSUM8zutd0g-GeclpMk38MEUOeTyegEEJif7OEm8zwt3o3eaL03KzV6hkG5kzQ0gy8N8aWQXRZnYzvGHwQrLOuIUwFWL0LScpC0yw5h8YLcL7xu_Fb1cqYavpafTBjawUhWZpyDjgZZ3yc4waWC321aTC_LWBZZZ5F_xddxjvf1HP160hvQt655SXhhNm1wy3nYXFf99-sXeA=w1920-h942-ft" className="img-fluid" />
                                   
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row text-center mt-3 mb-3">
                                <div className="col-md-12 wondermobtxt">
                                <h4>The Wonder Room is a curated selection of artworks sensibly put together by Atrum’s Co-founders and includes some of their personal favorites, special pieces acquired during their travels, unique artworks made especially for Atrum, and limited edition pieces.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <ProductView {...props} isWonderRoom={1} />
            </AtrumLayout>
        </>
    );
}

function mapStateToProps(state, props) {
    return {
        showLogin: true,
        state: state,
        isWonderRoom: 1
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
)(WonderRoom);