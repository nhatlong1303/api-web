import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import { Link } from 'react-router-dom';
import 'rc-menu/assets/index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../actions/homeActions';
class menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            key:['']
        }
    }
    onClick = (item) => {
        this.setState({
            key:item.key
        })
        this.props.HomeActions.isLoading(true);
    }

    render() {
        var { listCategoryLV0, listCategoryAll } = this.props;
        return (
            <Menu
                onClick={this.onClick}
                mode={'horizontal'}
                openAnimation={'slide-up'}
                selectedKeys={this.state.key}
            >
                {listCategoryLV0.map((item, index) => {
                    if (item.data().categoryParent === '0') {
                        return (
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">{item.data().categoryName}</span>
                                }
                                key={index+'a'}
                                popupOffset={[10, 15]}
                            >
                                <MenuItem key={item.id}><Link style={{width:'100%'}} to={`/category/`+item.id} >{item.data().categoryName}</Link></MenuItem>
                                <Divider />
                                {listCategoryAll.map((item1, index1) => {
                                    if (item1.data().categoryParent === item.id) {
                                        return (
                                            <SubMenu
                                                title={
                                                    <span className="submenu-title-wrapper">{item1.data().categoryName}</span>
                                                }
                                                key={index1+'b'}
                                                popupOffset={[10, 15]}
                                            >
                                                <MenuItem key={item1.id}><Link  to={`/category/`+item.id+'&'+item1.id} >{item1.data().categoryName}</Link></MenuItem>
                                                <Divider />
                                                {listCategoryAll.map((item2, index2) => {
                                                    if (item2.data().categoryParent === item1.id) {
                                                        return (
                                                            <SubMenu
                                                                title={
                                                                    <span className="submenu-title-wrapper">{item2.data().categoryName}</span>
                                                                }
                                                                key={index2+'c'}
                                                                popupOffset={[10, 15]}
                                                            >
                                                                <MenuItem key={item2.id}><Link to={`/category/`+item.id+'&'+item1.id+'&'+item2.id} >{item2.data().categoryName}</Link></MenuItem>
                                                                <Divider />
                                                            </SubMenu>
                                                        )
                                                    }

                                                })}
                                            </SubMenu>
                                        )
                                    }
                                })}
                            </SubMenu>

                        )
                    }

                })}
            </Menu>

        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        HomeActions:bindActionCreators(HomeActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (menu);