import React from "react";

const Share = (props) => {

    const shareFb=()=>{
        const txt = `http://www.facebook.com/sharer.php?u=${window.location.href}&p=${props.productById.productName}`;
        window.open(txt,"Social");
    }

    const shareWhatsapp=()=>{
        const txt = `https://api.whatsapp.com/send?phone=&text=${window.location.href}`;
        window.open(txt,"Social");
    }

    const sharePinterest=()=>{
        const txt = `http://pinterest.com/pin/create/button/?url=${window.location.href}&description=${props.productById.productName}`;
        window.open(txt,"Social");
    }

    const shareMail=()=>{
        const txt = `mailto:hello@atrumart.com?subject=${window.location.href}&body=${props.productById.productDescription}`
        window.open(txt,"Social");
    }

    const shareTwiiter=()=>{
        const txt = `http://twitter.com/share?text=${window.location.href}`;
        window.open(txt,"Social");
    }

    const shareTumblr=()=>{
        const txt = `https://www.tumblr.com/widgets/share/tool/preview?shareSource=legacy&canonicalUrl=&url=${window.location.href}&posttype=photo&content=${props.productById.productImage}&caption=${props.productById.productName}&clickthroughUrl=`;
        window.open(txt,"Social");
    }

    const copyClipBoard=()=>{
        /* Get the text field */
        var copyText = document.getElementById("copy-input");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
    }

    return (
        <>

            <div className="certificate-popup sharepopup-setting">
                <div className="modal" id="shareModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Share</h5>

                            </div>
                            <div className="modal-body">

                            <div className={`social-flex row`}>
                                <div className="col-md-6 form-group col-12">
                                    <input id="copy-input" value={window.location.href} type="text" className="form-control"/>
                                </div>
                                <div className="col-md-3 sale-box col-3">
                                    <a href="#" className="follow" onClick={copyClipBoard}>Copy</a>
                                </div>
                            </div>

                                <div className={`social-flex`}>
                                    <div>
                                        <button onClick={shareFb}>
                                            <i className="fa fa-facebook" />Facebook
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={shareWhatsapp}>
                                            <i className="fa fa-whatsapp" />Whatsapp
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={shareTwiiter}>
                                            <i className="fa fa-twitter" />Twitter
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={shareMail}>
                                            <i className="fa fa-envelope" />Mail
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={sharePinterest}>
                                            <i className="fa fa-pinterest" />Pinterest
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={shareTumblr}>
                                            <i className="fa fa-tumblr" />Tumblr
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Share