import React from "react";
import { isLogin } from "../../Utils/token";

const Loader = (identifier) => {

    const type=isLogin()?`-post`:'';
    
    if(identifier==="0"){
        document.querySelectorAll('.loader-div').forEach(e=>{
            e.classList.remove('show');
        })
    }else{
        document.querySelectorAll('.loader-div').forEach(e=>{
            e.classList.add('show');
        })
    }


    return (
        <div className="loader-div hide">
            <div className={`loader${type}`}><div className="ldio-7cxkyhjer4s">
                 <div></div>
             </div></div>
        </div>
        
    );
}

export default Loader