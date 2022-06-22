import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import AuthenticatedLayout from './AuthenticatedLayout';
import { _list } from "../../Store/action/crud";

function mapStateToProps(state, props) {
    return {
        showLogin : true,
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
)(AuthenticatedLayout);

