import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login-actions';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
class header extends Component {
    constructor(props) {
        super(props)
        var moment = require('moment');
        moment().format();
        this.state = {
            weekOfYear: moment().week(),
            isOpen: false,
            totalNotRead: '',
            checkList: [],
            listNotifi: [],
            hasMore: true,
            //items: Array.from({ length: 20 })
        }

        this.logoutTimeout();

    }

    componentDidMount() {
    }

    Logout = () => {
        localStorage.clear();
        window.location.reload();

    }
    logoutTimeout = () => {
        setTimeout(this.Logout, 3600000);
    }

    render() {
        //console.log(this.state)
        return (
            <div style={{ 'background': 'rgb(53, 65, 211)' }} className="top-alway" >
                <Row className="mgr0">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <form>
                            <Row className="height60" >
                                <Col xs="6" sm="6" md="6" lg="6" xl="9" >
                                    <Row className="mgt15  col-3 pdl20 align-middle">
                                        <Link to='/categories'> <Button outline  color="warning">categories</Button>{' '}</Link>
                                    </Row>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="6" xl="3" className="pd0">
                                    <Row className="mgt15 mgr0">
                                        <Col xs="5" sm="5" md="5" lg="5" xl="4" className="pd0">
                                            <b className="colorwhite">Week {this.state.weekOfYear}</b>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </div >
        );
    }

}
const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(header);