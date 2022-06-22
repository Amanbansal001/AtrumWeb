import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AtrumLayout from "../Layouts/AtrumLayout";
import { _post, _list } from "../Store/action/crud";

import '../../src/Enquiry.scss';
import { getProfile } from "../Utils/token";
import _ from "lodash";

const Enquiry = (props) => {

    const profile = getProfile();
    const [enquiry, setenquiry] = useState();
    const [message, setmessage] = useState();
    const [messageList, setmessageList] = useState();
    const [messages, setmessages] = useState();
    const [messageId, setmessageId] = useState();

    useEffect(() => {
        enquiries();
    }, [])

    const enquiries = () => {
        props._list(`enquiry`, `?userId=${profile.id}`, res => {
            setenquiry(res.data.fetch);
            const list = _.uniqBy(res.data.fetch, "messageId");
            setmessageList(list)

            setTimeout(() => {
                if (messageId) {
                    getbymessageId(messageId);
                }
            }, 2000);

        })
    }

    const getbymessageId = (messageId) => {
      
        const _messages = enquiry.filter(e => e.messageId == messageId);
        setmessageId(messageId);
        setmessages([..._messages]);
    }

    const sendMessage = () => {
        const _messages = enquiry.find(e => e.messageId == messageId);
        if (!_messages) { return };
        props._post(`enquiry`, {
            productId: _messages.productId,
            userId: profile.id,
            messageId: messageId,
            message: message,
            byUserId: profile.id
        }, res => {
            setmessage(``);
            enquiries();

            let t = messages;
            t.push({
                productId: _messages.productId,
                userId: profile.id,
                messageId: messageId,
                message: message,
                byUserId: profile.id
            })
            setmessages([...t]);
        })
    }

    return (
        <>
            <AtrumLayout {...props}>

                <section className="inbox-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="inbox-left">
                                    {messageList && messageList.length > 0 ? messageList.map((data, idx) => {
                                        return (
                                            <div className="row mb-3" onClick={() => getbymessageId(data.messageId)}>
                                                <div className="col-md-3 col-5">
                                                    <div className="inbox-leftimg">
                                                        <img src={data.product.productImage} className="img-fluid" />
                                                    </div>
                                                </div>
                                                <div className="col-md-9 col-7">
                                                    <div className="inbox-text">
                                                        <h4>{data.product.productName} <span>{data.product.publishYear}</span></h4>
                                                        <p>{data.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null}

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="inbox-right">
                                   
                                    <div className="inbox-wbox">
                                        <h4 className="border-bottom pb-1 mb-3 chathostoryheadmob">Chat History</h4>
                                        <div className="row">  
                                            {messages && messages.length > 0 ? messages.map((data, idx) => {
                                                return (
                                                    <div className="col-md-12">
                                                        <div className={` ${data.byUserId == profile.id ? 'text-right submitchatenquiry' : 'replychatenquiry'}`}>
                                                            <p>
                                                                {data.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <h6 className="chatsuggestion">Please Click on the Enquiry to view the Chat History.</h6>}
                                        </div>

                                    </div>

                                    {messages && messages.length > 0?
                                    <div className="inbox-rightform">
                                        <div>
                                            <div className="row">
                                                <div className="form-group col-md-8">
                                                    <textarea value={message}
                                                        onChange={e => setmessage(e.target.value)} className="form-control" rows={5} maxLength={300} id="comment" placeholder="Type Your Message" defaultValue={""} />
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <input type="submit" onClick={sendMessage} defaultValue="Send" className="btn-black" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :null}
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
)(Enquiry);