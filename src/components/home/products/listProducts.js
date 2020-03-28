import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../../actions/homeActions';
import * as ProductsActions from '../../../actions/productsActions';
import DataGrid, { Column, Editing, EditingTexts, FilterRow, LoadPanel, Paging, ColumnFixing } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react';
import { Row } from 'react-bootstrap';
import swal from 'sweetalert';

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
            this.setState({ categoryID: this.props.match.params.id })
            this.props.HomeActions.isLoading(false);
        }
    }
    onDelete = (item) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.refs.gridContainer.instance.deleteRow(item.rowIndex)
                    let param = {
                        id: item.data.id
                    }
                    this.props.ProductsActions.onDelete(param, (error, data) => {
                        if (data.code === 200 && data.success) {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            swal("Warning! failed", {
                                icon: "warning",
                            });
                        };
                    });


                } else {
                    swal("Your imaginary file is safe!");
                }
            });



    }
    cellRender = (item) => {
        return (
            <Row style={{ paddingLeft: '10px' }}>
                <div className="dx-field" style={{ width: '50%', textAlign: 'center' }}>
                    <Button icon="check"
                        type="success"
                        text="Done"
                    />
                </div>
                <div className="dx-field" style={{ width: '50%', textAlign: 'center' }}>
                    <Button icon="check"
                        type="danger"
                        text="delete"
                        onClick={() => this.onDelete(item)} />
                </div>
            </Row>
        )
    }
    cellRenderRating = (item) => {
        return (
            <div className="stars">
                <span className={parseFloat(item.data.rate) >= 0.5 && parseFloat(item.data.rate) < 1 ? 'star half' : parseFloat(item.data.rate) >= 1 ? 'star on' : 'star'}></span>
                <span className={parseFloat(item.data.rate) >= 1.5 && parseFloat(item.data.rate) < 2 ? 'star half' : parseFloat(item.data.rate) >= 2 ? 'star on' : 'star'}></span>
                <span className={parseFloat(item.data.rate) >= 2.5 && parseFloat(item.data.rate) < 3 ? 'star half' : parseFloat(item.data.rate) >= 3 ? 'star on' : 'star'}></span>
                <span className={parseFloat(item.data.rate) >= 3.5 && parseFloat(item.data.rate) < 4 ? 'star half' : parseFloat(item.data.rate) >= 4 ? 'star on' : 'star'}></span>
                <span className={parseFloat(item.data.rate) >= 4.5 && parseFloat(item.data.rate) < 5 ? 'star half' : parseFloat(item.data.rate) >= 5 ? 'star on' : 'star'}></span>
            </div>
        )
    }
    onAdd = () => {
        console.log(this.refs.gridContainer.instance.addRow())
    }
    render() {
        return (
            <div style={{ padding: '10px 10px 10px 10px' }}>
                <div className="dx-field" style={{ textAlign: 'right' }}>
                    <Button icon="add"
                        type="default"
                        text="Thêm"
                        onClick={this.onAdd}
                    />

                </div>
                <DataGrid
                    elementAttr={{
                        id: 'gridContainer'
                    }}
                    ref="gridContainer"
                    dataSource={this.state.listProducts}
                    showBorders={true}
                    allowColumnReordering={true}
                    customizeColumns={this.customizeColumns}
                    onContentReady={this.onContentReady}
                >
                    <Editing
                        mode="popup"
                        allowAdding={true}
                        allowDeleting={false}>
                        <EditingTexts confirmDeleteMessage={null} />
                    </Editing>
                    <Paging defaultPageSize={10} />
                    <FilterRow applyFilter={'auto'} visible={true} />
                    <Column dataField="productName" caption="Tên" dataType="string" />
                    <Column dataField="categoryName" caption="Tên Danh mục" dataType="string" />
                    <Column dataField="quantity" caption="Số lượng" width={100} alignment="center" dataType="string" />
                    <Column dataField="price" caption="Đơn giá" dataType="string" />
                    <Column dataField="created_at" caption="Ngày tạo" dataType="date" />
                    <Column dataField="rate" caption="Đánh giá" cellRender={this.cellRenderRating} width={150} alignment="center" />
                    <Column dataField="sale" caption="Discount (%)" width={100} alignment="center" dataType="string" />
                    <Column dataField="image" caption="Hình ảnh" dataType="object" />
                    <Column dataField="" cellRender={this.cellRender} width={300} />
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
        HomeActions: bindActionCreators(HomeActions, dispatch),
        ProductsActions: bindActionCreators(ProductsActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(listProducts);