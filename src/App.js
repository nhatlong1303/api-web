import React, { Component } from 'react';
import { Route, Router, Switch, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './routers/PrivateRoute';
import Login from './components/login/login';
import { history } from './history';
import routes from './routers/routers';
import LayoutHeader from './components/layout/header';
import LayoutFooter from './components/layout/footer';
// import LeftPanel from './components/layout/leftpanel';
// import { Row, } from 'reactstrap';
import ScrollButton from './components/layout/ScrollButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from './actions/homeActions';
import CommonMenuParent from './components/home/menu';
class App extends Component {
  constructor(props) {
    super(props)
    document.title = "API-WEB"
    history.listen((location, action) => {
      // console.log("Hello Khanh");
      // console.log(location);
      // console.log(action);
      // console.log(this.props.match.url);
      // console.log(this.props.location.pathname);

    });
    this.state = {
      listCategoryLV0: [],
      listCategoryAll: []
    }
    localStorage.removeItem('reload');
  }

  toggle = (toggle) => {
    this.setState({
      toggle: toggle
    })
  }
  componentDidMount() {
    this.getCateGoryLV0();
    this.getCateGoryAll();
  }
  componentDidUpdate(nextProps) {
    if(this.props.isLoading){
      this.getCateGoryAll();
      this.getCateGoryLV0();
      this.props.HomeActions.isLoading(false)
    }
   
  }
  getCateGoryLV0 = () => {
    let param = {
      categoryParent: 0
    }
    this.props.HomeActions.categoryLV0(param, (error, data) => {
      if (data) {
        this.setState({
          listCategoryLV0: data
        })
      } else {
        console.log(error)
      };
    });
  }
  getCateGoryAll = () => {
    this.props.HomeActions.categoryAll(null, (error, data) => {
      if (data) {
        this.setState({
          listCategoryAll: data
        })
      } else {
        console.log(error)
      };
    });
  }
  render() {
    return (
      <BrowserRouter >
        <Router history={history}>
          {localStorage.getItem('TOKEN') ?
            <div>
              <LayoutHeader />
              <CommonMenuParent listCategoryLV0={this.state.listCategoryLV0} listCategoryAll={this.state.listCategoryAll} />
              <div >
                <Switch>
                  {this.showRoute(routes)}
                </Switch>
              </div>
              <LayoutFooter />
              <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
            </div> : <Switch>
              <Route path="/login">
                <Login />
              </Route>
              {this.showRoute(routes)}
            </Switch>}
        </Router>
      </BrowserRouter>
    );
  }
  showRoute = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <PrivateRoute key={index} path={route.path} exact={route.exact} component={route.main} />
        )
      });
    }
    return result;
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.home.isLoading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    HomeActions: bindActionCreators(HomeActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
