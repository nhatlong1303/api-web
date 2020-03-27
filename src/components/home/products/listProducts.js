import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../../actions/homeActions';
import DataGrid, { Column, Scrolling, FilterRow, LoadPanel, Paging, ColumnFixing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react';
import { Row } from 'react-bootstrap';
class listProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryID: '',
            listProducts: []
        }
    }
    componentDidMount() {
        this.setState({ categoryID: this.props.match.params.id });
        this.getListProducts(this.props.match.params.id);
    }
    getListProducts = (id) => {
        let param = {
            id: id
        }
        this.props.HomeActions.products(param, (error, data) => {
            if (data) {
                this.setState({
                    listProducts: data.products
                })
            } else {
                console.log(error)
            };
        });
    }
    componentDidUpdate(nextProps) {
        if (this.props.isLoading) {
            this.getListProducts(this.props.match.params.id);
            this.props.HomeActions.isLoading(false);
        }
    }
    doneClick=(item)=>{
        console.log(item.data)
    }
    cellRender = (item) => {
        return (
            <Row style={{paddingLeft:'10px'}}>
                <div className="dx-field" style={{width:'50%',textAlign:'center'}}>
                    <Button icon="check"
                        type="success"
                        text="Done"
                        />
                </div>
                <div className="dx-field" style={{width:'50%',textAlign:'center'}}>
                    <Button icon="check"
                        type="danger"
                        text="delelte"
                        onClick={()=>this.doneClick(item)} />
                </div>
            </Row>
        )
    }
    render() {
        return (
            <div style={{ padding: '10px 10px 10px 10px' }}>
                <DataGrid
                    elementAttr={{
                        id: 'gridContainer'
                    }}
                    dataSource={this.state.listProducts}
                    showBorders={true}
                    customizeColumns={this.customizeColumns}
                    onContentReady={this.onContentReady}
                >
                    <Paging defaultPageSize={10} />
                    <FilterRow applyFilter={'auto'} visible={true} />
                    <Column dataField="productName" caption="Tên" dataType="string" />
                    <Column dataField="quantity" caption="Số lượng"  dataType="string"  />
                    <Column dataField="price" caption="Đơn giá"  dataType="string"  />
                    <Column dataField="image" caption="Hình ảnh" />
                    <Column dataField=""  cellRender={this.cellRender} width={300}/>
                </DataGrid>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.home.isLoading
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        HomeActions: bindActionCreators(HomeActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(listProducts);