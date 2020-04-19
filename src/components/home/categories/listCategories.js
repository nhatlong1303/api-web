import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomeActions from '../../../actions/homeActions';
import * as CategoryActions from '../../../actions/categoryActions';
import DataGrid, { Column, Editing, EditingTexts, FilterRow, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react';
import { Row, } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, } from 'reactstrap';
import swal from 'sweetalert';

var moment = require('moment');
class listCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listCategory: [],
            OpenModal: false,
            listCategoryLV0: [],
            listCategoryLV2: [],

            Level1: '',
            Level2: '',
            categoryName: '',
            nameDev: '',

            id: '',

            isUpdate: false

        }
    }
    componentDidMount() {
        this.getCateGoryAll();
        this.getCateGoryLV0();
    }
    getCateGoryLV0 = () => {
        let param = {
            categoryParent: 0
        }
        this.props.HomeActions.categoryLV0(param, (error, data) => {
            if (data) {
                this.setState({
                    listCategoryLV0: data.category
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
                    listCategory: data.category,
                })
            } else {
                console.log(error)
            };
        });
    }
    cellRender = (item) => {
        return (
            <Row style={{ paddingLeft: '10px' }}>
                <div className="dx-field" style={{ width: '50%', textAlign: 'center' }}>
                    <Button icon="edit"
                        type="success"
                        text="Edit"
                        onClick={() => this.onEdit(item)}
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
    onOpenModal = () => {
        this.setState({ OpenModal: !this.state.OpenModal, categoryName: '', nameDev: '', isUpdate: false })
    }
    onChangeLevel1 = (data) => {
        var target = data.target;
        let array = [];
        this.state.listCategory.map((item) => {
            if (item.categoryParent === parseInt(target.value)) {
                array.push(item)
            }
            return array
        })
        this.setState({ Level1: target.value, listCategoryLV2: array, Level2: '', Level3: '' })
    }

    onChangeData = (data) => {
        var target = data.target;
        var value = target.value;
        var name = target.name;
        this.setState({ [name]: value })
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
                    this.props.CategoryActions.onDelete(param, (error, data) => {
                        if (data.code === 200 && data.success) {
                            swal("Poof! Your imaginary file has been deleted!", {
                                icon: "success",
                            });
                            this.props.HomeActions.isLoading(true);
                            this.getCateGoryAll();
                            this.getCateGoryLV0();
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
    onEdit = (item) => {
        this.setState({
            OpenModal: true,
            id: item.data.id,
            categoryName: item.data.categoryName,
            nameDev: item.data.nameDev,
            isUpdate: true,
        })
    }
    onSave = (event) => {
        event.preventDefault();
        let param = {
            categoryName: this.state.categoryName,
            nameDev: this.state.nameDev,
            created_at: this.state.isUpdate ? this.state.created_at : moment().format("YYYY/MM/DD HH:mm:ss"),
            updated_at: moment().format("YYYY/MM/DD HH:mm:ss"),
            categoryParent: this.state.Level2 !== '' ? this.state.Level2 : this.state.Level1 !== '' ? this.state.Level1 : 0,
            id: this.state.id
        }
        if (!this.state.isUpdate) {
            this.props.CategoryActions.onInsert(param, (error, data) => {
                if (data) {
                    if (data.code === 200 && data.success) {
                        swal({
                            title: "Success",
                            text: "Thêm dữ liệu thành công!",
                            icon: "success",
                        }).then(() => {
                            this.onOpenModal();
                            this.getCateGoryAll();
                            this.getCateGoryLV0();
                            this.props.HomeActions.isLoading(true);
                        });
                    } else {
                        swal("Warning! Thêm dữ liệu thất bại", {
                            icon: "warning",
                        });
                    };
                } else {
                    console.log(error)
                };
            });
        } else {
            this.props.CategoryActions.onUpdate(param, (error, data) => {
                if (data) {
                    if (data.code === 200 && data.success) {
                        swal({
                            title: "Success",
                            text: "Cập nhật dữ liệu thành công!",
                            icon: "success",
                        }).then(() => {
                            this.onOpenModal();
                            this.getCateGoryAll();
                            this.getCateGoryLV0();
                            this.props.HomeActions.isLoading(true);
                        });

                    } else {
                        swal("Warning! Update dữ liệu thất bại", {
                            icon: "warning",
                        });
                    };
                } else {
                    console.log(error)
                };
            });
        }
    }
    onSubmit = () => {
        document.getElementById('submit').click();
    }
    render() {
        return (
            <div style={{ padding: '10px 10px 10px 10px' }}>
                <Modal isOpen={this.state.OpenModal} toggle={this.onOpenModal} size={'lg'} style={{ 'maxWidth': '95%' }}>
                    <ModalHeader toggle={this.onOpenModal}>Thêm Danh mục</ModalHeader>
                    <ModalBody style={{ margin: '10px 10px 10px 10px' }}>
                        <Form onSubmit={this.onSave}>
                            {!this.state.isUpdate &&
                                <FormGroup row>
                                    <Row className="col-sm-12 col-md-6">
                                        <div className="col-4">
                                            <Label className="pdt10">danh mục</Label>
                                        </div>
                                        <div className="col-8 " >
                                            <Input type="select" name="Level1" id="Level1" value={this.state.Level1} onChange={this.onChangeLevel1}  >
                                                <option value={''} >----</option>
                                                {this.state.listCategoryLV0.length > 0 && this.state.listCategoryLV0.map((item, index) =>
                                                    <option key={index} value={item.id} >{item.categoryName}</option>)}
                                            </Input>
                                        </div>
                                    </Row>
                                    <Row className="col-sm-12 col-md-6">
                                        <div className="col-4">
                                            <Label className="pdt10">danh mục  2</Label>
                                        </div>
                                        <div className="col-8 " >
                                            <Input type="select" name="Level2" id="Level2" value={this.state.Level2} onChange={this.onChangeData}  >
                                                {this.state.Level2 === '' && <option value={''} >----</option>}
                                                {this.state.listCategoryLV2.length > 0 && this.state.listCategoryLV2.map((item, index) =>
                                                    <option key={index} value={item.id} >{item.categoryName}</option>)}
                                            </Input>
                                        </div>
                                    </Row>
                                </FormGroup>}
                            <FormGroup row>
                                <Row className="col-sm-12 col-md-6">
                                    <div className="col-4">
                                        <Label className="pdt10">Tên danh mục</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input required invalid={this.state.categoryName !== "" ? false : true} valid={this.state.categoryName !== "" ? true : false} type="text" onChange={this.onChangeData} name="categoryName" id="categoryName" placeholder="Tên danh mục" value={this.state.categoryName} />
                                    </div>
                                </Row>
                                <Row className="col-sm-12 col-md-6">
                                    <div className="col-4">
                                        <Label className="pdt10">Tên Dev</Label>
                                    </div>
                                    <div className="col-8 " >
                                        <Input required invalid={this.state.nameDev !== "" ? false : true} valid={this.state.nameDev !== "" ? true : false} type="text" onChange={this.onChangeData} name="nameDev" id="nameDev" placeholder="Tên DEV" value={this.state.nameDev} />
                                    </div>
                                </Row>
                            </FormGroup>
                            <input type="submit" id="submit" className="hide"></input>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button icon="check"
                            type="success"
                            text={this.state.isUpdate ? 'Update' : 'Save'}
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
                    dataSource={this.state.listCategory}
                    showBorders={true}
                    allowColumnReordering={true}
                    columnHidingEnabled={true}
                    columnAutoWidth={true}
                    height={window.innerHeight - 280}
                >
                    <Editing
                        mode="popup"
                        allowDeleting={false}>
                        <EditingTexts confirmDeleteMessage={null} />
                    </Editing>
                    <Paging defaultPageSize={10} />
                    <FilterRow applyFilter={'auto'} visible={true} />
                    <Column dataField="id" caption="Mã Danh mục" dataType="number" width={100} />
                    <Column dataField="categoryName" caption="Tên Danh mục" dataType="string" />
                    <Column dataField="nameDev" caption="Tên Dev" dataType="string" />
                    <Column dataField="categoryParent" caption="Danh mục cha" width={200} dataType="number" />
                    <Column dataField="" cellRender={this.cellRender} width={300} />
                </DataGrid>
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
        HomeActions: bindActionCreators(HomeActions, dispatch),
        CategoryActions: bindActionCreators(CategoryActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(listCategories);