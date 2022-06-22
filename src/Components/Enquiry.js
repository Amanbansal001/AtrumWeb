import React, { useState } from "react";
import { getProfile } from "../Utils/token";

const Enquiry = (props) => {

    const [message, setmessage] = useState();
    const [submit, setsubmit] = useState(false);

    const profile = getProfile();


    const sendMessage = () => {

        if(!profile){
            alert(`Kindly login to continue`);
            return;
        }

        props._post(`enquiry`, {
            productId: props.productById.id,
            messageId: profile.id.toString() + props.productById.id.toString(),
            userId: profile.id,
            message: message,
            byUserId: profile.id
        }, res => {
            setsubmit(true);
        })
    }

    return (
        <>

            <section className="sendmessage-popup">
                <div className="modal" id="enquiryModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                          
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button>
                                <h4 className="modal-title">Send message to Atrum</h4>
                                <p>An Artrum Specialist is available to answer your questions and help you collect through Atrum.</p>
                                <div>
                                    <div className="form-group">
                                        <div className="row">
                                            <label className="col-md-2">From:</label>
                                            <div className="col-md-10"><input type="text" className="form-control" value={profile ? profile.name : ''} placeholder="" disabled/></div>
                                        </div>
                                    </div>
                                    <div className="form-group no-border">
                                        <div className="row">
                                            <label className="col-md-12">YOUR MESSAGE</label>
                                            <div className="col-md-12"><textarea className="form-control" rows={5} maxLength={300} value={message} disabled={submit} onChange={e => setmessage(e.target.value)} id="comment" placeholder="Leave Your Comments" defaultValue={""} /></div>
                                        </div>
                                    </div>
                                    <div className="text-success text-center">{submit?`Your message has been sent`:``}</div>
                                    <div className="form-group no-border">
                                        <div className="row">
                                            <div className="col-md-12"><input type="submit" className="btn-black" defaultValue="Send" onClick={sendMessage} disabled={submit}/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Enquiry