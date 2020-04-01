import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../../actions/homeActions';
import * as ProductsActions from '../../../actions/productsActions';
import DataGrid, { Column, Editing, EditingTexts, FilterRow, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react';
import { Row, } from 'react-bootstrap';
import swal from 'sweetalert';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from 'reactstrap';
const moment = require('moment');
class listProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
            OpenModal: false,
            listCategory: [],
            listCategoryLevel2: [],
            listCategoryLevel3: [],

            productName: '',
            quantity: '',
            description: '',
            price: '',
            Level1: '',
            Level2: '',
            Level3: '',
            image: ''
        }
    }

    componentDidMount() {
        this.setState({
            Level1: this.props.match.params.id.split('-')[0], Level2: this.props.match.params.id.split('-')[1] !== undefined ? this.props.match.params.id.split('-')[1] : '',
            Level3: this.props.match.params.id.split('-')[2] !== undefined ? this.props.match.params.id.split('-')[2] : ''
        });
        this.getListProducts(this.props.match.params.id.split('-')[0],this.props.match.params.id.split('-')[1] , this.props.match.params.id.split('-')[2]);
        this.getCateGoryAll();
    }
    getCateGoryAll = () => {
        this.props.HomeActions.categoryAll(null, (error, data) => {
            if (data) {
                let array = [];
                let array1 = []
                data.category.map((item) => {
                    if ((item.categoryParent === parseInt(this.props.match.params.id.split('-')[1] !== undefined ? this.props.match.params.id.split('-')[1] : this.props.match.params.id.split('-')[0])) || item.id === parseInt(this.props.match.params.id.split('-')[1])) {
                        array.push(item)
                    }
                    return array;
                })
                data.category.map((item) => {
                    if (this.props.match.params.id.split('-')[2] !== undefined) {
                        if (item.id === parseInt(this.props.match.params.id.split('-')[2])) {
                            array1.push(item)
                        }
                    } else {
                        if (item.categoryParent === parseInt(this.props.match.params.id.split('-')[1])) {
                            array1.push(item)
                        }
                    }
                })
                this.setState({
                    listCategory: data.category,
                    listCategoryLevel2: array,
                    listCategoryLevel3: array1
                })
            } else {
                console.log(error)
            };
        });
    }

    getListProducts = (lv1,lv2,lv3) => {
        let param = {
            Level1:lv1,
            Level2:lv2,
            Level3:lv3
        }
        this.props.HomeActions.products(param, (error, data) => {
            if (data) {

                this.setState({
                    listProducts: data.products,
                })
            } else {
                console.log(error)
            };
        });
    }
    componentDidUpdate(nextProps) {
        if (this.props.isLoading) {
            let id = parseInt(this.props.match.params.id.split('-')[2] !== undefined ? this.props.match.params.id.split('-')[2] : this.props.match.params.id.split('-')[1] !== undefined ? this.props.match.params.id.split('-')[1] : this.props.match.params.id.split('-')[0]);
            this.getListProducts(this.props.match.params.id.split('-')[0],this.props.match.params.id.split('-')[1] , this.props.match.params.id.split('-')[2]);
            let array = [];
            let array1 = [];
            this.props.CATEGORYALL.length > 0 && this.props.CATEGORYALL.map((item) => {
                if ((item.categoryParent === parseInt(this.props.match.params.id.split('-')[1] !== undefined ? this.props.match.params.id.split('-')[1] : this.props.match.params.id.split('-')[0])) || item.id === parseInt(this.props.match.params.id.split('-')[1])) {
                    array.push(item)
                }
                return array;
            })
            this.props.CATEGORYALL.length > 0 && this.props.CATEGORYALL.map((item) => {
                if (this.props.match.params.id.split('-')[2] !== undefined) {
                    if (item.id === parseInt(this.props.match.params.id.split('-')[2])) {
                        array1.push(item)
                    }
                } else {
                    if (item.categoryParent === parseInt(this.props.match.params.id.split('-')[1])) {
                        array1.push(item)
                    }
                }
                return array1;
            })
            this.setState({
                Level1: this.props.match.params.id.split('-')[0], Level2: this.props.match.params.id.split('-')[1] !== undefined ? this.props.match.params.id.split('-')[1] : '',
                Level3: this.props.match.params.id.split('-')[2] !== undefined ? this.props.match.params.id.split('-')[2] : '', listCategoryLevel2: array, listCategoryLevel3: array1
            })
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
                    <Button icon="edit"
                        type="success"
                        text="Edit"
                    />
                </div>
                <div className="dx-field" style={{ width: '50%', textAlign: 'center' }}>
                    <Button icon="remove"
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
    cellRenderImage = (item) => {
        return <img alt="" style={{ width: '50px', height: '50px' }} src={item.value} />
    }
    onOpenModal = () => {
        this.setState({
            OpenModal: !this.state.OpenModal,
            productName: '',
            quantity: '',
            description: '',
            price: '',
            Level1: this.state.Level1,
            Level2: this.state.Level2,
            Level3: this.state.Level3,
            image: '',
        })
    }

    onChangeData = (data) => {
        var target = data.target;
        var value = target.value;
        var name = target.name;
        this.setState({ [name]: value })
    }
    onChangeLevel2 = (data) => {
        var target = data.target;
        let array = [];
        this.state.listCategory.map((item) => {
            if (item.categoryParent === parseInt(target.value)) {
                array.push(item)
            }
            return array
        })
        this.setState({ Level2: target.value, listCategoryLevel3: array })
    }
    onClickFile = () => {
        document.getElementById('file').click();
    }
    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    onChangeImage = async (event) => {
        if (event.target.files[0] !== undefined) {
            if (event.target.files[0].size >= 100000) {
                swal("Warning! vượt quá dung lượng ảnh", {
                    icon: "warning",
                });
            } else {
                this.setState({
                    image: await this.toBase64(event.target.files[0])
                })
            }
        }
    }
    onSave = (event) => {
        event.preventDefault();
        let param = {
            productName: this.state.productName,
            quantity: this.state.quantity,
            description: this.state.description,
            price: this.state.price,
            Level1: this.state.Level1,
            Level2: this.state.Level2,
            Level3: this.state.Level3,
            created_at: moment().format("YYYY/MM/DD HH:mm:ss"),
            image: this.state.image
        }
        this.props.ProductsActions.onInsert(param, (error, data) => {
            if (data) {
                if (data.code === 200 && data.success) {
                    swal("success! Thêm dữ liệu thành công", {
                        icon: "success",
                    })
                    this.setState({
                        productName: '',
                        quantity: '',
                        description: '',
                        price: '',
                        Level1: this.state.Level1,
                        Level2: this.state.Level2,
                        Level3: this.state.Level3,
                        image: '',
                        OpenModal: false
                    })
                    this.getListProducts(this.props.match.params.id.split('-')[0],this.props.match.params.id.split('-')[1] , this.props.match.params.id.split('-')[2]);
                } else {
                    swal("Warning! Thêm dữ liệu thất bại", {
                        icon: "warning",
                    });
                };
            } else {
                console.log(error)
            };
        });

    }
    onSubmit = () => {
        document.getElementById('submit').click();
    }
    render() {
        return (
            <div style={{ padding: '10px 10px 10px 10px' }}>
                <Modal isOpen={this.state.OpenModal} toggle={this.onOpenModal} size={'lg'} style={{ 'maxWidth': '95%' }}>
                    <ModalHeader toggle={this.onOpenModal}>Thêm sản phẩm</ModalHeader>
                    <ModalBody style={{ margin: '10px 10px 10px 10px' }}>
                        <Form onSubmit={this.onSave}>
                            <FormGroup row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Tên SP</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input required invalid={this.state.productName !== "" ? false : true} valid={this.state.productName !== "" ? true : false} type="text" onChange={this.onChangeData} name="productName" id="productName" placeholder="Tên sản phẩm" />
                                    </div>
                                </Row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Số lượng</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input required invalid={this.state.quantity !== "" ? false : true} valid={this.state.quantity !== "" ? true : false} type="number" onChange={this.onChangeData} name="quantity" id="quantity" placeholder="Số lượng" />
                                    </div>
                                </Row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Đơn giá</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input required invalid={this.state.price !== "" ? false : true} valid={this.state.price !== "" ? true : false} type="number" onChange={this.onChangeData} name="price" id="price" placeholder="Đơn giá" />
                                    </div>
                                </Row>

                            </FormGroup>
                            <FormGroup row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Cấp 1</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input type="select" name="Level1" id="Level1" onChange={this.onChangeData}  >
                                            {this.state.listCategory.length > 0 && this.state.listCategory.map((item, index) => {
                                                if (parseInt(this.state.Level1) === item.id) {
                                                    return (
                                                        <option key={index} value={item.id}>{item.categoryName}</option>
                                                    )
                                                }
                                            })}
                                        </Input>
                                    </div>
                                </Row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Cấp 2</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input type="select" name="Level2" id="Level2" onChange={this.onChangeLevel2} disabled={this.props.match.params.id.split('-')[1] !== undefined ? true : false}  >
                                            {this.props.match.params.id.split('-')[1] === undefined &&
                                                <option value={''} >----</option>}
                                            {this.state.listCategoryLevel2.length > 0 && this.state.listCategoryLevel2.map((item, index) =>
                                                <option key={index} value={item.id}>{item.categoryName}</option>
                                            )}
                                        </Input>
                                    </div>
                                </Row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Cấp 3</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input type="select" name="Level3" id="Level3" onChange={this.onChangeData} disabled={this.props.match.params.id.split('-')[2] !== undefined ? true : false} >
                                            {this.state.listCategoryLevel3.length > 0 && this.state.listCategoryLevel3.map((item, index) =>
                                                <option key={index} value={item.id}>{item.categoryName}</option>
                                            )}
                                        </Input>
                                    </div>
                                </Row>
                            </FormGroup>
                            <FormGroup row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Mô tả</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input invalid={this.state.description !== "" ? false : true} valid={this.state.description !== "" ? true : false} required type="textarea" name="description" id="description" onChange={this.onChangeData} />
                                    </div>
                                </Row>
                                <Row className="col-4">
                                    <div className="col-4">
                                        <Label className="pdt10">Hình ảnh</Label>
                                    </div>
                                    <div className="col-4 " >
                                        <input type="file" id="file" multiple className="hide" onChange={this.onChangeImage} />
                                        <button type="button" id="btnBgStory" className="btn btn-primary " onClick={this.onClickFile}>
                                            <i className="fas fa-image"></i> Pictures </button>
                                    </div>
                                    <div className="col-4">
                                        <img alt="" src={this.state.image} style={{ width: '100px', height: '100px' }} />
                                    </div>
                                </Row>
                            </FormGroup>
                            <input type="submit" id="submit" className="hide"></input>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button icon="check"
                            type="success"
                            text="Save"
                            onClick={this.onSubmit}
                        />
                        <Button icon="remove"
                            type="normal"
                            text="Cancel"
                            onClick={this.onOpenModal}
                        />
                    </ModalFooter>
                </Modal>

                <div className="dx-field" style={{ textAlign: 'right' }}>
                    <Button icon="add"
                        type="default"
                        text="Thêm"
                        onClick={this.onOpenModal}
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
                        allowDeleting={false}>
                        <EditingTexts confirmDeleteMessage={null} />
                    </Editing>
                    <Paging defaultPageSize={10} />
                    <FilterRow applyFilter={'auto'} visible={true} />
                    <Column dataField="productName" caption="Tên" dataType="string" />
                    <Column dataField="categoryName" caption="Tên Danh mục" dataType="string" />
                    <Column dataField="quantity" caption="Số lượng" width={100} alignment="center" dataType="string" />
                    <Column dataField="price" caption="Đơn giá" dataType="string" />
                    <Column dataField="created_at" caption="Ngày tạo" dataType="date" format='dd/MM/yyyy HH:mm:ss' width={150} />
                    <Column dataField="rate" caption="Đánh giá" cellRender={this.cellRenderRating} width={150} alignment="center" />
                    <Column dataField="sale" caption="Discount (%)" width={100} alignment="center" dataType="string" />
                    <Column dataField="image" caption="Hình ảnh" cellRender={this.cellRenderImage} alignment="center" width={100} />
                    <Column dataField="" cellRender={this.cellRender} width={300} />
                </DataGrid>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.home.isLoading,
        CATEGORYALL: state.home.CATEGORYALL.category
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        HomeActions: bindActionCreators(HomeActions, dispatch),
        ProductsActions: bindActionCreators(ProductsActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(listProducts);