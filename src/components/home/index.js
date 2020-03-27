import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../actions/homeActions';
import Home from './home';
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div id="dev" className="col-12">
                <div><Home /></div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        HomeActions: bindActionCreators(HomeActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);