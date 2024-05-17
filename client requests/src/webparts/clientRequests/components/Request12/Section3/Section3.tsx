import { ISection3Props, ISection3State } from './ISection3Props';
import { Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import { Dropdown, IDropdownOption, Icon, Label, IDropdownStyles } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import * as React from 'react';

export default class Section3 extends React.Component<ISection3Props, ISection3State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private requestJson: any = null;
    private clientJson: any = null;
    constructor(props: ISection3Props) {
        super(props);

        this.state = {
            requestor: 0,
            loading: true,
            dpDefaultTaxCode: { value: '', options: [] },
            dpPaymentTerms: { value: '', options: [] },
            dpWithholdingTaxType: { value: '', options: [] },
            dpEmirate: { value: '', options: [] },
            dpPlaceofSupply: { value: '', options: [] },
            dpGSTRegistrationType: { value: '', options: [] },
            clientDetail: '',
            tbxCIN: '',
            tbxTDSTaxRate: '',
            dpClientIDType: { value: '', options: [] },
            errors: {
                dpDefaultTaxCode: '',
                dpPaymentTerms: '',
                tbxCustomerRemark4: '',
                tbxCustomerRemark5: '',
                tbxCustomerRemark8: '',
                tbxCustomerRemark7: '',
                dpClientIDType: '',
            },
            section2TbxValues: '',
            itemID: 0,
            tbxCustomerRemark4: '',
            tbxCustomerRemark5: '',
            tbxCustomerRemark7: '',
            tbxCustomerRemark8: '',
            currentUserid: '',
            requestorid: '',
        };
    }

    public async componentWillMount() {
        /// <summary>Bind data for read only and edit mode.</summary>
        if (this.props.data === null || this.props.data === undefined) {
            await this.BindData();
        }

        //shraddha test 7
        await this.getClientIDTypeOptions();

        //rutvik test1 change
        // var tempObj = this.state['dpDefaultTaxCode'];
        // if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        // } else {
        //     if (this.props.listData !== null && this.props.listData !== undefined) {
        //         if (this.props.listData.DefaultTaxCode !== null) {
        //             if (this.props.listData.DefaultTaxCode === this.props.section2Data.clientDetail["lblDefaultTaxCode"]) {
        //                 tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //                 tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //                 this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //             } else {
        //                 tempObj.value = this.props.listData.DefaultTaxCode;
        //                 await this.BindDefaultTaxCode(this.props.listData.DefaultTaxCode);
        //             }

        //         } else {
        //             tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //             tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //             this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //         }
        //     } else {
        //         tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //         tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //         this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //     }
        // }
        //test1 end

        //rutvik test change
        // if (this.props.listData !== null && this.props.listData !== undefined) {
        //     if (this.props.listData.DefaultTaxCode !== null) {
        //         if (this.props.listData.DefaultTaxCode === this.props.section2Data.clientDetail["lblDefaultTaxCode"]) {
        //             var tempObj = this.state['dpDefaultTaxCode'];
        //             if (this.props.section2Data.clientDetail["lblDefaultTaxCode"] !== null && (this.props.data === null || this.props.data === undefined)) {
        //                 if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        //                 } else {
        //                     tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //                     tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //                     this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //                 }
        //             }
        //         }
        //     }
        //     else {
        //         var tempObj = this.state['dpDefaultTaxCode'];
        //         if (this.props.section2Data.clientDetail["lblDefaultTaxCode"] !== null && (this.props.data === null || this.props.data === undefined)) {
        //             if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        //             } else {
        //                 tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //                 tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //                 this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //             }
        //         }
        //     }
        // } else {
        //     var tempObj = this.state['dpDefaultTaxCode'];
        //     if (this.props.section2Data.clientDetail["lblDefaultTaxCode"] !== null && (this.props.data === null || this.props.data === undefined)) {
        //         if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        //         } else {
        //             tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //             tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //             this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //         }
        //     }
        // }
        //end


        if (this.props.listData !== null) {
            if (this.props.listData.DefaultTaxCode !== null) {
                this.setState({
                    dpDefaultTaxCode: Utils.GetDropdownStateValue(this.props.listData["DefaultTaxCode"], this.state.dpDefaultTaxCode),
                    dpPaymentTerms: Utils.GetDropdownStateValue(this.props.listData["PaymentTerms"], this.state.dpPaymentTerms),
                    dpWithholdingTaxType: Utils.GetDropdownStateValue(this.props.listData["WithholdingTaxType"], this.state.dpWithholdingTaxType),
                    dpEmirate: Utils.GetDropdownStateValue(this.props.listData["Emirate"], this.state.dpEmirate),
                    dpPlaceofSupply: Utils.GetDropdownStateValue(this.props.listData["PlaceofSupply"], this.state.dpPlaceofSupply),
                    dpGSTRegistrationType: Utils.GetDropdownStateValue(this.props.listData["GSTRegistrationType"], this.state.dpGSTRegistrationType),
                    tbxCIN: this.props.listData["CIN"],
                    tbxTDSTaxRate: this.props.listData["TDSTaxRate"],
                    tbxCustomerRemark4: this.props.listData["CustomerRemark4"],
                    tbxCustomerRemark5: this.props.listData["CustomerRemark5"],
                    tbxCustomerRemark8: this.props.listData["CustomerRemark8"],
                    tbxCustomerRemark7: this.props.listData["CustomerRemark7"],
                    dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),

                });
            } else {
                if (this.props.data === undefined) {
                    await this.SetTextBoxValue();
                }
            }
        } else {
            if (this.props.data === undefined) {
                await this.SetTextBoxValue();
            }
        }

        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });

            //rutvik test change
            // if (this.props.data.dpDefaultTaxCode.value !== this.props.section2Data.clientDetail["lblDefaultTaxCode"]) {
            //     await this.BindDefaultTaxCode(this.props.data.dpDefaultTaxCode.value);
            // }
            //end
        }

        if (this.props.section2Data.clientDetail !== null && this.props.data === undefined) {
            let placeOfSupplyValue = this.props.section2Data.clientDetail["lblPlaceofSupply"];
            if (this.props.section2Data.clientDetail["lblPlaceofSupply"] !== null) {
                placeOfSupplyValue = this.state.dpPlaceofSupply.options.filter(e => e.text.split('-')[0].trim().toLowerCase() === this.props.section2Data.clientDetail["lblPlaceofSupply"])[0].text;
            }
            this.setState({
                clientDetail: {
                    lblTaxRegistrationNo: this.props.section2Data.clientDetail["lblTaxRegistrationNo"],
                    lblDefaultTaxCode: this.props.section2Data.clientDetail["lblDefaultTaxCode"],
                    lblPaymentTerms: this.props.section2Data.clientDetail["lblPaymentTerms"],
                    lblWithholdingTaxType: this.props.section2Data.clientDetail["lblWithholdingTaxType"],
                    lblEmirate: this.props.section2Data.clientDetail["lblEmirate"],
                    lblPlaceofSupply: placeOfSupplyValue,
                    lblGSTRegistrationType: this.props.section2Data.clientDetail["lblGSTRegistrationType"],
                    lblCIN: this.props.section2Data.clientDetail["lblCIN"],
                    lblTDSTaxRate: this.props.section2Data.clientDetail["lblTDSTaxRate"],
                    lblCustomerRemark4: this.props.section2Data.clientDetail["lblCustomerRemark4"],
                    lblCustomerRemark5: this.props.section2Data.clientDetail["lblCustomerRemark5"],
                    lblCustomerRemark8: this.props.section2Data.clientDetail["lblCustomerRemark8"],
                    lblCustomerRemark7: this.props.section2Data.clientDetail["lblCustomerRemark7"],
                    lblClientIDType: this.props.section2Data.clientDetail["lblClientIDType"]
                }
            });
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //Shraddha 08-08-22 item 4 end

        this.setState({
            loading: false
        });
    }

    //shraddha test 7
    public async getClientIDTypeOptions() {
        try {
            let ClientIDTypeOptions = this.state.dpClientIDType;
            let ClientTypeOption: any = [];
            let IsRequiredOptions: any = [];
            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME).items.select("Title", "KSAClientDescription").getAll().then(async (record) => {
                record.filter((tempitem) => {
                    if (tempitem.Title != null) {
                        var obj1 = { 'key': (tempitem.Title + " - " + tempitem.KSAClientDescription), 'text': (tempitem.Title + " - " + tempitem.KSAClientDescription) };
                        ClientTypeOption.push(obj1);
                    }
                })
            })

            ClientIDTypeOptions.options = ClientTypeOption;
            await this.setState({
                dpClientIDType: ClientIDTypeOptions
            })

            this.setState({ loading: false });

        } catch (error) {
            console.log("getClientIDTypeOptions(Section4.tsx)--->", error);

        }

    }

    public async componentDidMount() {
        this.forceUpdate();

        //rutvik test change     
        // await this.BindData();
        // if (this.props.section2Data.clientDetail["lblDefaultTaxCode"] !== null && (this.props.data === null || this.props.data === undefined)) {
        //     var tempObj = this.state['dpDefaultTaxCode'];
        //     if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        //     } else {
        //         tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //         tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //         this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //     }
        // }

        // if (this.props.data !== null && this.props.data !== undefined) {
        //     if (this.props.data.dpDefaultTaxCode.value !== this.props.section2Data.clientDetail["lblDefaultTaxCode"]) {
        //         await this.BindDefaultTaxCode(this.props.data.dpDefaultTaxCode.value);
        //     }
        //     else {
        //         if (tempObj.options.filter(x => x.text === this.props.section2Data.clientDetail["lblDefaultTaxCode"]).length > 0) {
        //         } else {
        //             tempObj.options.push({ key: this.props.section2Data.clientDetail["lblDefaultTaxCode"], text: this.props.section2Data.clientDetail["lblDefaultTaxCode"] });
        //             tempObj.value = this.props.section2Data.clientDetail["lblDefaultTaxCode"];
        //             this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //         }
        //     }

        // }
    }

    public render(): React.ReactElement<ISection3Props> {
        this.DropDownColorChange();
        return (
            <div className="container-xl">
                <div className="card-primary" style={{ position: "relative" }}>
                    <div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
                        <ClipLoader
                            css={Constants.LOADING_CSS}
                            size={50}
                            color={Constants.LOADER_COLOR}
                            loading={this.state.loading}
                        />
                    </div>
                    <div className="card-header">
                        <h3 className="">{strings.UpdateFields_Title}</h3>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6 col-lg-6 form-info ">
                                <h6>{strings.Lbl_TaxInformation}</h6>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_TaxRegNo}</label>
                                        <p>{this.state.clientDetail.lblTaxRegistrationNo !== null ? this.state.clientDetail.lblTaxRegistrationNo : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_DefaultTaxCode}</label>
                                        <p>{this.state.clientDetail.lblDefaultTaxCode !== null && this.state.clientDetail.lblDefaultTaxCode !== '' ? this.state.clientDetail.lblDefaultTaxCode : strings.EmptyData}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <h6>{strings.Lbl_TaxInformation}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label className='defaultTaxCodelbl'>{strings.Lbl_DefaultTaxCode}<sub>*</sub></label>
                                        <Dropdown id="dpDefaultTaxCode" className="defaultTaxCode" disabled={this.checkIfFieldDisabled("dpDefaultTaxCode")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpDefaultTaxCode.value} options={this.state.dpDefaultTaxCode.options} onChange={this._OnDropDownChange.bind(this)} />
                                        {this.state.errors.dpDefaultTaxCode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.dpDefaultTaxCode} </Label>
                                        </span> : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-lg-6 form-info">
                                <h6>{strings.Lbl_PaymentInformation}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label>{strings.Lbl_PaymentTerms}</label>
                                        <p>{this.state.clientDetail.lblPaymentTerms !== null ? this.state.clientDetail.lblPaymentTerms : strings.EmptyData}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <h6>{strings.Lbl_PaymentInformation}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label className='paymentTermslbl'>{strings.Lbl_PaymentTerms}<sub>*</sub></label>
                                        <Dropdown id="dpPaymentTerms" className='paymentTerms' disabled={this.checkIfFieldDisabled("dpPaymentTerms")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpPaymentTerms.value} options={this.state.dpPaymentTerms.options} onChange={this._OnDropDownChange.bind(this)} />
                                        {this.state.errors.dpPaymentTerms.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.dpPaymentTerms} </Label>
                                        </span> : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                            <React.Fragment>

                                <div className="row">
                                    <div className="col-md-6 col-lg-6 form-info">
                                        <h6>{strings.Lbl_GulfSpecInfo}</h6>
                                        <div className="row">
                                            <div className="form-group col-6">
                                                <label>{strings.Lbl_WithHoldingTax}</label>
                                                <p>{this.state.clientDetail.lblWithholdingTaxType !== null ? this.state.clientDetail.lblWithholdingTaxType : strings.EmptyData}</p>
                                            </div>
                                            <div className="form-group col-6">
                                                <label>{strings.Lbl_Emirate}</label>
                                                <p>{this.state.clientDetail.lblEmirate !== null ? this.state.clientDetail.lblEmirate : strings.EmptyData}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <h6>{strings.Lbl_GulfSpecInfo}</h6>
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_WithHoldingTax}</label>
                                                <Dropdown id="dpWithholdingTaxType" disabled={this.checkIfFieldDisabled("dpWithholdingTaxType")} placeholder='' selectedKey={this.state.dpWithholdingTaxType.value} options={this.state.dpWithholdingTaxType.options} onChange={this._OnDropDownChange.bind(this)} />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_Emirate}</label>
                                                <Dropdown id="dpEmirate" disabled={this.checkIfFieldDisabled("dpEmirate")} placeholder='' selectedKey={this.state.dpEmirate.value} options={this.state.dpEmirate.options} onChange={this._OnDropDownChange.bind(this)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </React.Fragment>
                            : null}

                        {this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 form-info">
                                        <h6>{strings.Lbl_IndiaSpecInfo}</h6>
                                        <div className="row">
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_PlaceOfSupply}</label>
                                                <p>{this.state.clientDetail.lblPlaceofSupply !== null ? this.state.clientDetail.lblPlaceofSupply : strings.EmptyData}</p>
                                            </div>
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_GSTRegType}</label>
                                                <p>{this.state.clientDetail.lblGSTRegistrationType !== null ? this.state.clientDetail.lblGSTRegistrationType : strings.EmptyData}</p>
                                            </div>
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_CIN}</label>
                                                <p>{this.state.clientDetail.lblCIN !== null ? this.state.clientDetail.lblCIN : strings.EmptyData}</p>
                                            </div>
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_TDSRate}</label>
                                                <p>{this.state.clientDetail.lblTDSTaxRate !== null ? this.state.clientDetail.lblTDSTaxRate : strings.EmptyData}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <h6>{strings.Lbl_IndiaSpecInfo}</h6>
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_PlaceOfSupply}</label>
                                                <Dropdown id="dpPlaceofSupply" disabled={this.checkIfFieldDisabled("dpPlaceofSupply")} placeholder='' selectedKey={this.state.dpPlaceofSupply.value} options={this.state.dpPlaceofSupply.options} onChange={this._OnDropDownChange.bind(this)} />
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_GSTRegType}</label>
                                                <Dropdown id="dpGSTRegistrationType" disabled={this.checkIfFieldDisabled("dpGSTRegistrationType")} placeholder='' selectedKey={this.state.dpGSTRegistrationType.value} options={this.state.dpGSTRegistrationType.options} onChange={this._OnDropDownChange.bind(this)} />
                                            </div>
                                            <div className="form-group  col-sm-6">
                                                <label>{strings.Lbl_CIN}</label>
                                                <input id="tbxCIN" disabled={this.checkIfFieldDisabled("tbxCIN")} maxLength={255} className="form-control" type="text" value={this.state.tbxCIN} placeholder="" onChange={this._onTbxChange.bind(this)}
                                                    style={{ backgroundColor: (Utils.TrimData(this.state.tbxCIN) !== Utils.TrimData(this.state.clientDetail.lblCIN)) ? Constants.YELLOW : Constants.WHITE }} />
                                            </div>
                                            <div className="form-group  col-sm-6">
                                                <label>{strings.Lbl_TDSRate}</label>
                                                <input id="tbxTDSTaxRate" disabled={this.checkIfFieldDisabled("tbxTDSTaxRate")} maxLength={255} className="form-control" type="text" value={this.state.tbxTDSTaxRate} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: (Utils.TrimData(this.state.tbxTDSTaxRate) !== Utils.TrimData(this.state.clientDetail.lblTDSTaxRate)) ? Constants.YELLOW : Constants.WHITE }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </React.Fragment>
                            : null}

                        {/* rutvik 12-7 24 */}
                        {this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY ?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 form-info">
                                        <h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
                                        <div className="row">
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_CustomerRemark4}</label>
                                                <p>{this.state.clientDetail.lblCustomerRemark4 !== null ? this.state.clientDetail.lblCustomerRemark4 : strings.EmptyData}</p>
                                            </div>
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_CustomerRemark5}</label>
                                                <p>{this.state.clientDetail.lblCustomerRemark5 !== null ? this.state.clientDetail.lblCustomerRemark5 : strings.EmptyData}</p>
                                            </div>
                                        </div>
                                        {/* {/ Shraddha test 8 /} */}
                                        <div className="row">
                                            <div className="form-group  col-6">
                                                <label>{strings.Lbl_CustomerRemark8}</label>
                                                <p>{this.state.clientDetail.lblCustomerRemark8 !== null ? this.state.clientDetail.lblCustomerRemark8 : strings.EmptyData}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_CustomerRemark4}<sub>*</sub></label>
                                                <input id="tbxCustomerRemark4" maxLength={255} className="form-control" type="text" value={this.state.tbxCustomerRemark4} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark4) !== '' && Utils.TrimData(this.state.tbxCustomerRemark4) !== this.state.clientDetail.lblCustomerRemark4 ? Constants.YELLOW : Constants.WHITE }} />
                                                {this.state.errors.tbxCustomerRemark4.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                    <Label className="errormessage" >{this.state.errors.tbxCustomerRemark4} </Label>
                                                </span> : null}
                                            </div>
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_CustomerRemark5}<sub>*</sub></label>
                                                <input id="tbxCustomerRemark5" maxLength={255} className="form-control" type="text" value={this.state.tbxCustomerRemark5} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark5) !== '' && Utils.TrimData(this.state.tbxCustomerRemark5) !== this.state.clientDetail.lblCustomerRemark5 ? Constants.YELLOW : Constants.WHITE }} />
                                                {this.state.errors.tbxCustomerRemark5.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                    <Label className="errormessage" >{this.state.errors.tbxCustomerRemark5} </Label>
                                                </span> : null}
                                            </div>
                                        </div>
                                        {/* {/ Shraddha test 8 /} */}
                                        <div className="row">
                                            <div className="form-group col-sm-6">
                                                <label>{strings.Lbl_CustomerRemark8}<sub>*</sub></label>
                                                <input id="tbxCustomerRemark8" maxLength={255} className="form-control" type="text" value={this.state.tbxCustomerRemark8} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark8) !== '' && Utils.TrimData(this.state.tbxCustomerRemark8) !== this.state.clientDetail.lblCustomerRemark8 ? Constants.YELLOW : Constants.WHITE }} />
                                                {this.state.errors.tbxCustomerRemark8.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                    <Label className="errormessage" >{this.state.errors.tbxCustomerRemark8} </Label>
                                                </span> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </React.Fragment>
                            : null}

                        {/* {/ Shraddha test 7 /} */}
                        {(this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2]) ?
                            <div className="row">
                                <div className="col-md-5 col-lg-6 form-info">
                                    <h6>{strings.Lbl_SaudiSpecificData}</h6>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>{strings.Lbl_CustomerRemark7}</label>
                                            <p>{this.state.clientDetail.lblCustomerRemark7 !== null ? this.state.clientDetail.lblCustomerRemark7 : strings.EmptyData}</p>
                                        </div>
                                        {/* {/ Shraddha test 7 /} */}
                                        <div className="form-group col-sm-6">
                                            <label>{strings.Lbl_ClientIDType}</label>
                                            <p>{this.state.clientDetail.ClientIDType !== null ? Utils.GetClientIDTypeDescription(this.state.clientDetail.ClientIDType, this.state.dpClientIDType) : strings.EmptyData}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7 col-lg-6">
                                    <h6>{strings.Lbl_SaudiSpecificData}</h6>
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label>{strings.Lbl_CustomerRemark7}</label>
                                            <input id="tbxCustomerRemark7" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark7")} className="form-control" type="text" value={this.state.tbxCustomerRemark7} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark7) !== '' && Utils.TrimData(this.state.tbxCustomerRemark7) !== this.state.clientDetail.lblCustomerRemark7 ? "yellow" : "white" }} />
                                            {this.state.errors.tbxCustomerRemark7.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                <Label className="errormessage" >{this.state.errors.tbxCustomerRemark7} </Label>
                                            </span> : null}
                                        </div>

                                        <div className="form-group col-sm-6">
                                            <label className='defaultTaxCodelbl'>{strings.Lbl_ClientIDType}</label>
                                            <Dropdown id="dpClientIDType" className="defaultTaxCode" disabled={this.checkIfFieldDisabled("dpClientIDType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientIDType.value} options={this.state.dpClientIDType.options} onChange={this._OnDropDownChange.bind(this)} />
                                            {this.state.errors.dpDefaultTaxCode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                <Label className="errormessage" >{this.state.errors.dpClientIDType} </Label>
                                            </span> : null}
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                        {/* {/ Shraddha test 7 end /} */}

                    </div>
                    <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div>
            </div>
        );
    }


    private checkIfFieldDisabled(tagID) {
        let listOfEditableFieldsSection1 = this.props.listOfEditableFields;

        //Shraddha 08-08-22 item 4
        let currentuser = this.state.currentUserid;
        let requestorid = this.state.requestorid;

        if (this.props.itemSubmitted && currentuser !== requestorid && !this.props.isFHDUser) { //R fhd change 20-9
            //Shraddha 08-08-22 item 4 end
            var item = listOfEditableFieldsSection1.filter((item) => item.key == tagID);
            if (item) {
                if (item.length > 0) {
                    return item[0].openable;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }


    //rutvik test changes	
    private async BindDefaultTaxCode(value: string) {
        // <summary>bind data in form</summary>	
        for (var i = 0; i < Constants.MASTER_DROPDOWNS.length; i++) {
            if (Constants.MASTER_DROPDOWNS[i].name === "Default Tax code") {
                await this.setState({ dpDefaultTaxCode: { value: '', options: [] } });
                var tempStateObj = {};
                let options = await Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name);
                var tempObj = this.state[Constants.MASTER_DROPDOWNS[i].key];
                tempObj.options = options;
                tempObj.value = value;
                tempStateObj[Constants.MASTER_DROPDOWNS[i].key] = options.length > 0 ? tempObj : [];
                await this.setState({
                    dpDefaultTaxCode: {
                        options: tempObj["options"],
                        value: tempObj["value"]
                    }
                });
                break;
            }
        }
    }
    //end

    private DropDownColorChange() {
        /// <summary>Set dropdown highlight color by comparing values.</summary>
        document.querySelector('#dpDefaultTaxCode') !== null ? ((document.querySelector('#dpDefaultTaxCode') as HTMLElement).querySelector(`#dpDefaultTaxCode > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpDefaultTaxCode.value) !== '' && Utils.TrimData(this.state.dpDefaultTaxCode.value) !== Utils.TrimData(this.state.clientDetail.lblDefaultTaxCode) ? Constants.YELLOW : Constants.WHITE : null;

        document.querySelector('#dpPaymentTerms') !== null ? ((document.querySelector('#dpPaymentTerms') as HTMLElement).querySelector(`#dpPaymentTerms > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpPaymentTerms.value) !== '' && Utils.TrimData(this.state.dpPaymentTerms.value) !== Utils.TrimData(this.state.clientDetail.lblPaymentTerms) ? Constants.YELLOW : Constants.WHITE : null;

        document.querySelector('#dpWithholdingTaxType') !== null ? ((document.querySelector('#dpWithholdingTaxType') as HTMLElement).querySelector(`#dpWithholdingTaxType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpWithholdingTaxType.value) !== Utils.TrimData(this.state.clientDetail.lblWithholdingTaxType) ? Constants.YELLOW : Constants.WHITE : null;

        document.querySelector('#dpEmirate') !== null ? ((document.querySelector('#dpEmirate') as HTMLElement).querySelector(`#dpEmirate > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpEmirate.value) !== Utils.TrimData(this.state.clientDetail.lblEmirate) ? Constants.YELLOW : Constants.WHITE : null;

        document.querySelector('#dpClientIDType') !== null ? ((document.querySelector('#dpClientIDType') as HTMLElement).querySelector(`#dpClientIDType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== Utils.TrimData(this.state.clientDetail.lblClientIDType) ? Constants.YELLOW : Constants.WHITE : null;//Shraddha test 7

        document.querySelector('#dpGSTRegistrationType') !== null ? ((document.querySelector('#dpGSTRegistrationType') as HTMLElement).querySelector(`#dpGSTRegistrationType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpGSTRegistrationType.value) !== Utils.TrimData(this.state.clientDetail.lblGSTRegistrationType) ? Constants.YELLOW : Constants.WHITE : null;
        if (this.state.dpPlaceofSupply.value !== null) {
            document.querySelector('#dpPlaceofSupply') !== null ? ((document.querySelector('#dpPlaceofSupply') as HTMLElement).querySelector(`#dpPlaceofSupply > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpPlaceofSupply.value) !== Utils.TrimData(this.state.clientDetail.lblPlaceofSupply) ? Constants.YELLOW : Constants.WHITE : null;
        }
    }

    private async BindData() {
        /// <summary>Bind DropDown list.</summary>
        var tempStateObj = {};

        for (var i = 0; i < Constants.MASTER_DROPDOWNS.length; i++) {
            let options = [];
            if (!Constants.MASTER_DROPDOWNS[i].required) {
                options.push({ key: '', text: '' });
            }

            var tempObj = this.state[Constants.MASTER_DROPDOWNS[i].key];
            if (Constants.MASTER_DROPDOWNS[i].name === "Default Tax code") {
                let tempoptions = await Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name);
                options.push(...tempoptions);
                tempObj.options = options;
            }
            else {
                let tempoptions = await Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name)
                options.push(...tempoptions);
                tempObj.options = options;
            }

            options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS[i].key] = tempObj : [];
        }

        tempStateObj["loading"] = false;
        this.setState({ ...tempStateObj });
    }

    private async _OnDropDownChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption) {
        /// <summary>On DropDown change set state property of dropdown.</summary>
        var countryObj = this.state[event.target.id];
        countryObj.value = item.text;
        this.setState({ ...this.state, [event.target.id]: countryObj });

        //rutvik validate change
        let errors = this.state.errors;
        if (event.target.id === "dpDefaultTaxCode") errors.dpDefaultTaxCode = '';
        if (event.target.id === "dpPaymentTerms") errors.dpPaymentTerms = '';
        this.setState({ errors: errors });
        //end
    }

    private async _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>On texbox value change set value into state property.</summary>
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });

        //rutvik validate change
        let errors = this.state.errors;
        if (id === "tbxCustomerRemark4") errors.tbxCustomerRemark4 = '';
        if (id === "tbxCustomerRemark5") errors.tbxCustomerRemark5 = '';
        if (id === "tbxCustomerRemark8") errors.tbxCustomerRemark8 = '';
        this.setState({ errors: errors });
        //end


    }

    private async ValidateSection3() {
        /// <summary>Validate required fields available or not.</summary>
        let errors = this.state.errors;

        //rutvik 12-7 24
        if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY) {
            errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : "";//Shraddha test 8
        }
        else {
            errors.tbxCustomerRemark4 = "";
            errors.tbxCustomerRemark5 = "";
            errors.tbxCustomerRemark8 = "";
        }
        //endr

        for (var i = 0; i < 2; i++) {
            errors[Constants.MASTER_DROPDOWNS[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS[i].key].value) === false) ? strings.CantLeaveBlankMsg : "";
        }

        this.setState({ errors: errors });
        let valid = true;
        Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null });
        return valid;
    }

    private async _BackClick() {
        /// <summary>Back button click event.</summary>
        await this.props.dataChange("section3Data", this.state);
        await this.props.dataChange("macAccountId", this.props.selectedClient);
        this.props.backStep();
    }

    private async _NextClick() {
        /// <summary>Next button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperation()) {
            this.requestJson = {
                ClientAttentionName: Utils.TrimData(this.props.section2Data.tbxClientAttentionName),
                Email: Utils.TrimData(this.props.section2Data.tbxEmail),
                PhoneNo: Utils.TrimData(this.props.section2Data.tbxPhoneNo),
                DefaultTaxCode: this.state.dpDefaultTaxCode.value,
                PaymentTerms: this.state.dpPaymentTerms.value,
                WithholdingTaxType: this.state.dpWithholdingTaxType.value,
                Emirate: this.state.dpEmirate.value,
                PlaceofSupply: Utils.CheckRequiredField(this.state.dpPlaceofSupply.value) === false ?
                    this.state.dpPlaceofSupply.value : this.state.dpPlaceofSupply.value.split('-')[0].trim(),
                GSTRegistrationType: this.state.dpGSTRegistrationType.value,
                CIN: Utils.TrimData(this.state.tbxCIN),
                TDSTaxRate: Utils.TrimData(this.state.tbxTDSTaxRate),
                CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                ClientIDType: this.state.dpClientIDType.value
            },
                this.clientJson = {
                    ClientAttentionName: Utils.TrimData(this.props.section2Data.clientDetail["lblClientAttentionName"]),
                    Email: Utils.TrimData(this.props.section2Data.clientDetail["lblEmail"]),
                    PhoneNo: Utils.TrimData(this.props.section2Data.clientDetail["lblPhoneNo"]),
                    DefaultTaxCode: Utils.TrimData(this.props.section2Data.clientDetail["lblDefaultTaxCode"]),
                    PaymentTerms: Utils.TrimData(this.props.section2Data.clientDetail["lblPaymentTerms"]),
                    WithholdingTaxType: Utils.TrimData(this.props.section2Data.clientDetail["lblWithholdingTaxType"]),
                    Emirate: Utils.TrimData(this.props.section2Data.clientDetail["lblEmirate"]),
                    PlaceofSupply: Utils.TrimData(this.props.section2Data.clientDetail["lblPlaceofSupply"]),
                    GSTRegistrationType: Utils.TrimData(this.props.section2Data.clientDetail["lblGSTRegistrationType"]),
                    CIN: Utils.TrimData(this.props.section2Data.clientDetail["lblCIN"]),
                    TDSTaxRate: Utils.TrimData(this.props.section2Data.clientDetail["lblTDSTaxRate"]),
                    MaconomyAccountID: this.props.section2Data.clientDetail["lblMaconomyAccountID"],
                    //rutvik 12-7 24
                    CustomerRemark4: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark4"]),
                    CustomerRemark5: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark5"]),
                    //endr
                    CustomerRemark8: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark8"]),
                    CustomerRemark7: Utils.TrimData(this.props.section2Data.clientDetail["lblCustomerRemark7"]),
                    ClientIDType: Utils.GetClientIDTypeDescription(this.props.section2Data.clientDetail["lblClientIDType"], this.state.dpClientIDType),
                }
            this.setState({ loading: false }, async () => {
                await this.props.dataChange("section3Data", this.state);
                await this.props.dataChange("requestJson", this.requestJson);
                await this.props.dataChange("clientJson", this.clientJson);
                this.props.nextStep();
            });
        } else {
            this.setState({ loading: false }); //9-2-23
        }
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperation()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    private async SaveData() {
        /// <summary>Save data in list.</summary>
        try {
            this.setState({ loading: true });

            var tempData = {
                DefaultTaxCode: this.state.dpDefaultTaxCode.value,
                PaymentTerms: this.state.dpPaymentTerms.value,
                WithholdingTaxType: this.state.dpWithholdingTaxType.value,
                Emirate: this.state.dpEmirate.value,
                PlaceofSupply: this.state.dpPlaceofSupply.value,
                GSTRegistrationType: this.state.dpGSTRegistrationType.value,
                CIN: Utils.TrimData(this.state.tbxCIN),
                TDSTaxRate: Utils.TrimData(this.state.tbxTDSTaxRate),
                //rutvik 12-7 24
                CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                //endr
                CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
            };

            if (this.props.itemID > 0) {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
                });
            }
        } catch (error) {
            console.log("Save Data--->", error);
            //error log change
            let errordata = {
                Title: new Date(),
                Errors: error,
                RequestID: this.props.itemID
            }
            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata);
            //error log change end
            this.setState({ loading: false });
        }
    }

    private async SaveDataOperation() {
        /// <summary>Validate and save data operations.</summary>
        if (await this.ValidateSection3() === false) {
            return false;
        }
        await this.SaveData();
        return true;
    }

    private SetTextBoxValue() {
        /// <summary>set text box values from maconomy data.</summary>
        let placeOfSupplyValue = this.props.section2Data.clientDetail["lblPlaceofSupply"];
        if (this.props.section2Data.clientDetail["lblPlaceofSupply"] !== null) {
            placeOfSupplyValue = this.state.dpPlaceofSupply.options.filter(e => e.text.split('-')[0].trim().toLowerCase() === this.props.section2Data.clientDetail["lblPlaceofSupply"])[0].text;
        }
        this.setState({
            dpDefaultTaxCode: Utils.GetDropdownStateValueDefaultTaxCode(this.props.section2Data.clientDetail["lblDefaultTaxCode"], this.state.dpDefaultTaxCode), //10-2-23
            dpPaymentTerms: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblPaymentTerms"], this.state.dpPaymentTerms),
            dpWithholdingTaxType: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblWithholdingTaxType"], this.state.dpWithholdingTaxType),
            dpEmirate: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblEmirate"], this.state.dpEmirate),
            dpPlaceofSupply: Utils.GetDropdownStateValue(placeOfSupplyValue, this.state.dpPlaceofSupply),
            dpGSTRegistrationType: Utils.GetDropdownStateValue(this.props.section2Data.clientDetail["lblGSTRegistrationType"], this.state.dpGSTRegistrationType),
            tbxCIN: this.props.section2Data.clientDetail["lblCIN"],
            tbxTDSTaxRate: this.props.section2Data.clientDetail["lblTDSTaxRate"],
            //rutvik 12-7 24
            tbxCustomerRemark4: this.props.section2Data.clientDetail["lblCustomerRemark4"],
            tbxCustomerRemark5: this.props.section2Data.clientDetail["lblCustomerRemark5"],
            //endr
            tbxCustomerRemark8: this.props.section2Data.clientDetail["lblCustomerRemark8"],//Shraddha test 8
            tbxCustomerRemark7: this.props.section2Data.clientDetail["lblCustomerRemark7"],//Shraddha test 7                    tbxClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.tbxClientIDType),
            dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.section2Data.clientDetail["lblClientIDType"], this.state.dpClientIDType),
        });
    }
}