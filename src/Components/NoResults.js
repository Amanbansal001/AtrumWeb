import React from "react";

const NoResultsStyle={
    margin: `0px auto`,
    textAlign: `center`,
    fontSize: `23px`,
    fontWeight: `600`,
    marginTop: `10%`
}

const NoResults = (props) => {
    
    if(!props.list || props.list && props.list.length>0){
        return <></>;
    }

    return (
        <>
            <div style={NoResultsStyle}>{props.message?props.message:'No Result Found'}</div>
        </>
    )

}

export default NoResults