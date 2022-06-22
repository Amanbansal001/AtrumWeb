import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Guest from './Guest';
import { _list } from "../../Store/action/crud";

function mapStateToProps(state, props) {
    return {
        showLogin : true,
        state:state,
        props:props
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        _list
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Guest);

