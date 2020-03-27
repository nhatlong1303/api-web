import React, { Component } from 'react';
import { Form, FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login-actions';
import { Redirect } from 'react-router-dom';

class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSubmit: false,
            username: '',
            password: ''
        }

    }
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmit: true
        })
        let param = {
            name: this.state.username,
            password:this.state.password
        }
        this.props.loginAction.Login(param, (error, data) => {
            console.log(data)
            if (data) {
                let user = data.data.user || {};
                localStorage.setItem('PROFILE', JSON.stringify(user));
                localStorage.setItem('TOKEN', JSON.stringify(data.token));
                localStorage.setItem('reload', true);
                this.setState({
                    isSubmit: true
                })
                return <Redirect to="/home" />
            } else {
                console.log(error)
            };
        });


    }
    componentDidUpdate(nextProps, nextState) {
        if (localStorage.getItem('reload')) {
            window.location.href = "/home"
        }
    }
    render() {
        var { username, password } = this.state;
        return (
            <div style={{ 'background': '#e3e3e3', 'height': `${window.innerHeight}px` }}>{localStorage.getItem('TOKEN') !== null ? <Redirect to="/home" /> :
                <div className="container" >
                    <FormGroup style={{ 'paddingTop': '5%' }}>
                        <Row >
                            <Col xs="12" ms="12" md="12" lg="12" style={{ 'height': `${window.innerHeight - 100}px` }}>
                                <Card style={{ 'height': '100%' }} >
                                    <CardBody >
                                        <div style={{ 'paddingLeft': '65px' }}>
                                            <h1 className="login" style={{ 'fontFamily': 'Muli-Bold' }}>LOGIN</h1>
                                            <img src="http://10.0.0.137/oms/public/img/bg-login-bar.png" alt=""></img>
                                            <Form onSubmit={this.onSubmit}>
                                                <FormGroup>
                                                    <Input type="text" name="username" value={username} required placeholder="Username"
                                                        onChange={this.onChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Input type="password" name="password" value={password} required placeholder="Password"
                                                        onChange={this.onChange}
                                                    />
                                                </FormGroup>
                                                <button type="submit" className="btn btn-error btn-block btn-flat btn-login">LOGIN</button>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </FormGroup>
                </div>}
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
        loginAction: bindActionCreators(loginActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(login);