import React, { useEffect } from "react";
import { easyzoom_call } from "../Utils";

const ZoomImage = (props) => {

    useEffect(() => {
        
        setTimeout(() => {
            window.easyzoom_call()
        }, 1000);
    }, [props.image])

    return (
        <>
            <div className="certificate-popup zoompopupmob">
                <div className="modal" id="zoomimage">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{background:"transparent"}}>
                            <div className="modal-body">
                                <div className="ml-4"><button type="button" className="close" data-dismiss="modal"><img src="/assets/images/cancel.png" /></button></div>
                                <div className="mt-3">
                                    <div className="easyzoom easyzoom--overlay">
                                        <a href={props.image}>
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/assets/images/placeholder.png" }} src={props.image} width="500px" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ZoomImage