import * as React from 'react';
import { ISection4Props, ISection4State } from './ISection4Props';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { ControlMode, Util, Web } from 'sp-pnp-js';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const MASTER_DROPDOWNS = [{ key: "dpDefaultTaxCode", name: "Default Tax code", required: true },
{ key: "dpPaymentTerms", name: "Payment Terms", required: true },
{ key: "dpDeliveryMethod", name: "Delivery Method", required: true },
{ key: "dpWithHoldingTax", name: "Withholding Tax Type", required: false },
{ key: "dpEmirate", name: "Emirate", required: false },
{ key: "dpPlaceOfSupply", name: "Place of supply", required: false },
{ key: "dpGSTRegType", name: "GST Registration Type", required: false }];

export default class Section4 extends React.Component<ISection4Props, ISection4State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);

    constructor(props: ISection4Props) {
        super(props);
        this.state = {
            loading: true,
            dpDefaultTaxCode: { value: '', options: [] },
            dpPaymentTerms: { value: '', options: [] },
            dpWithHoldingTax: { value: '', options: [] },
            dpEmirate: { value: '', options: [] },
            dpPlaceOfSupply: { value: '', options: [] },
            dpGSTRegType: { value: '', options: [] },
            dpDeliveryMethod: { value: '', options: [] },
            tbxCIN: '',
            tbxInstructions: '',
            tbxCustomerRemark4: '',
            tbxCustomerRemark5: '',
            tbxTDSRate: '',
            country: '',
            tbxCustomerRemark8: '',
            tbxCustomerRemark7: '',
            dpClientIDType: { value: '', options: [] },
            currentUserid: '',
            requestorid: '',
            errors: {
                dpDefaultTaxCode: '',
                dpPaymentTerms: '',
                dpDeliveryMethod: '',
                tbxCustomerRemark4: '',
                tbxCustomerRemark5: '',
                tbxCustomerRemark8: '',
                tbxCustomerRemark7: '',
                dpClientIDType: '',
            },
            itemID: 0
        };
    }

    public async componentDidMount() {
        //rutvik 6-7 24        
        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("Country").get().then((data) => {
            this.setState({ country: data.Country });
            if (data.Country !== "Italy") {
                this.setState({ tbxCustomerRemark4: "0000000" });
            } else {
                this.setState({ tbxCustomerRemark4: "" });
            }
        });
        //endr

        //rutvik test change
        // if (this.props.listData !== null && this.props.listData !== undefined) {
        //     if (this.props.listData["DefaultTaxCode"] !== null && (this.props.data === null || this.props.data === undefined)) {
        //         var tempObj = this.state['dpDefaultTaxCode'];
        //         if (tempObj.options.filter(x => x.text === this.props.listData["DefaultTaxCode"]).length > 0) {
        //         } else {
        //             tempObj.value = this.props.listData["DefaultTaxCode"];
        //             tempObj.options.push({ key: this.props.listData["DefaultTaxCode"], text: this.props.listData["DefaultTaxCode"] });
        //             this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //         }
        //     }

        //     if (this.props.data !== null && this.props.data !== undefined) {
        //         if (this.props.data.dpDefaultTaxCode.value !== this.props.listData["DefaultTaxCode"]) {
        //             await this.BindDefaultTaxCode(this.props.data.dpDefaultTaxCode.value);
        //         }
        //         else {
        //             if (tempObj.options.filter(x => x.text === this.props.listData["DefaultTaxCode"]).length > 0) {
        //             } else {
        //                 tempObj.value = this.props.listData["DefaultTaxCode"];
        //                 tempObj.options.push({ key: this.props.listData["DefaultTaxCode"], text: this.props.listData["DefaultTaxCode"] });
        //                 this.setState({ ...this.state, ['dpDefaultTaxCode']: tempObj });
        //             }
        //         }

        //     }
        // }

    }

    //rutvik test changes
    // private async BindDefaultTaxCode(value: string) {
    //     // <summary>bind data in form</summary>

    //     for (var i = 0; i < MASTER_DROPDOWNS.length; i++) {

    //         if (MASTER_DROPDOWNS[i].name === "Default Tax code") {
    //             var tempStateObj = {};
    //             let options = await Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, MASTER_DROPDOWNS[i].name);
    //             var tempObj = this.state[MASTER_DROPDOWNS[i].key];
    //             tempObj.options = options;
    //             options.length > 0 ? tempStateObj[MASTER_DROPDOWNS[i].key] = tempObj : [];
    //             this.setState({ ...tempStateObj });
    //             break;
    //         }
    //     }
    // }

    public async componentWillMount() {
        /// <summary>Bind data.</summary>        
        if (this.props.data === null || this.props.data === undefined) {
            await this.BindData();
        }
        //shraddha test 7
        await this.getClientIDTypeOptions();

        if (this.props.listData !== null) {
            this.setState({
                tbxCIN: this.props.listData["CIN"],
                tbxTDSRate: this.props.listData["TDSTaxRate"],
                tbxInstructions: this.props.listData["Instructions"],
                dpDefaultTaxCode: Utils.GetDropdownStateValue(this.props.listData["DefaultTaxCode"], this.state.dpDefaultTaxCode),
                dpPaymentTerms: Utils.GetDropdownStateValue(this.props.listData["PaymentTerms"], this.state.dpPaymentTerms),
                dpWithHoldingTax: Utils.GetDropdownStateValue(this.props.listData["WithholdingTaxType"], this.state.dpWithHoldingTax),
                dpEmirate: Utils.GetDropdownStateValue(this.props.listData["Emirate"], this.state.dpEmirate),
                dpPlaceOfSupply: Utils.GetDropdownStateValue(this.props.listData["PlaceofSupply"], this.state.dpPlaceOfSupply),
                dpGSTRegType: Utils.GetDropdownStateValue(this.props.listData["GSTRegistrationType"], this.state.dpGSTRegType),
                dpDeliveryMethod: Utils.GetDropdownStateValue(this.props.listData["DeliveryMethod"], this.state.dpDeliveryMethod),
                //Shraddha test 7
                tbxCustomerRemark4: this.props.listData["CustomerRemark4"],
                tbxCustomerRemark5: this.props.listData["CustomerRemark5"],
                tbxCustomerRemark8: this.props.listData["CustomerRemark8"],
                tbxCustomerRemark7: this.props.listData["CustomerRemark7"],
                dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),

            });
        }

        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
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

    public render(): React.ReactElement<ISection4Props> {
        return (
            <div className="container-fluid" >
                {/* <!-- card-primary ===================== --> */}
                < div className="card-primary" style={{ position: "relative" }} >
                    <div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
                        <ClipLoader
                            css={Constants.LOADING_CSS}
                            size={50}
                            color={Constants.LOADER_COLOR}
                            loading={this.state.loading}
                        />
                    </div>
                    <div className="card-header">
                        <h3 className="">{strings.Section4Title}</h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        {/* <!-- Tax Information ====================================== --> */}
                        <h6>{strings.Lbl_TaxInformation}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_TaxRegNo}</label>
                                <input id="tbxTaxRegNo" className="form-control" type="text" value={this.props.section2Data.tbxTaxRegNo} placeholder="" maxLength={255} disabled={true} />
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_DefaultTaxCode}<sub>*</sub></label>
                                <Dropdown id="dpDefaultTaxCode" disabled={this.checkIfFieldDisabled("dpDefaultTaxCode")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpDefaultTaxCode.value} options={this.state.dpDefaultTaxCode.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpDefaultTaxCode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpDefaultTaxCode} </Label>
                                </span> : null}
                            </div>
                        </div>

                        {/* <!-- Payment Information ===================================== --> */}
                        <h6>{strings.Lbl_PaymentInformation}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_PaymentTerms}<sub>*</sub></label>
                                <Dropdown id="dpPaymentTerms" disabled={this.checkIfFieldDisabled("dpPaymentTerms")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpPaymentTerms.value} options={this.state.dpPaymentTerms.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpPaymentTerms.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpPaymentTerms} </Label>
                                </span> : null}
                            </div>
                        </div>
                        {/* <!-- Billing ===================================== --> */}
                        <h6>{strings.Lbl_Billing}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Instructions}</label>
                                <input id="tbxInstructions" disabled={this.checkIfFieldDisabled("tbxInstructions")} className="form-control" type="text" value={this.state.tbxInstructions} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_DeliveryMethod}<sub>*</sub></label>
                                <Dropdown id="dpDeliveryMethod" disabled={this.checkIfFieldDisabled("dpDeliveryMethod")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpDeliveryMethod.value} options={this.state.dpDeliveryMethod.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpDeliveryMethod.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpDeliveryMethod} </Label>
                                </span> : null}
                            </div>
                        </div>

                        {/* <!-- Italian Invoice Extension ===================================== --> */}
                        {/* rutvik 5-7 24 */}
                        {this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY ?
                            <React.Fragment>
                                <h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_CustomerRemark4}<sub>*</sub></label>
                                        <input id="tbxCustomerRemark4" className="form-control" type="text" disabled={this.checkIfFieldDisabled("tbxCustomerRemark4")} value={this.state.tbxCustomerRemark4} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxCustomerRemark4.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxCustomerRemark4} </Label>
                                        </span> : null}
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-6">
                                        <label>{strings.Lbl_CustomerRemark5}<sub>*</sub></label>
                                        <input id="tbxCustomerRemark5" className="form-control" disabled={this.checkIfFieldDisabled("tbxCustomerRemark5")} type="text" value={this.state.tbxCustomerRemark5} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxCustomerRemark5.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxCustomerRemark5} </Label>
                                        </span> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_CustomerRemark8}<sub>*</sub></label>
                                        <input id="tbxCustomerRemark8" className="form-control" disabled={this.checkIfFieldDisabled("tbxCustomerRemark8")} type="text" value={this.state.tbxCustomerRemark8} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxCustomerRemark8.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxCustomerRemark8} </Label>
                                        </span> : null}
                                    </div>

                                </div>
                            </React.Fragment> : null}

                        {/* {/ Shraddha test 7 /} */}
                        {(this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2]) ?
                            <React.Fragment>
                                <h6>{strings.Lbl_SaudiSpecificData}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_CustomerRemark7}</label>
                                        <input id="tbxCustomerRemark7" className="form-control" disabled={this.checkIfFieldDisabled("tbxCustomerRemark7")} type="text" value={this.state.tbxCustomerRemark7} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxCustomerRemark7.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxCustomerRemark7} </Label>
                                        </span> : null}
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label className='paymentTermslbl'>{strings.Lbl_ClientIDType}</label>
                                        <Dropdown id="dpClientIDType" className='paymentTerms' disabled={this.checkIfFieldDisabled("dpClientIDType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientIDType.value} options={this.state.dpClientIDType.options} onChange={this._onDpChange.bind(this)} />
                                        {this.state.errors.dpClientIDType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.dpClientIDType} </Label>
                                        </span> : null}
                                    </div>
                                </div>
                            </React.Fragment> : null}

                        {Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                            <React.Fragment>
                                {/* <!-- Gulf Specific Information ====================================== --> */}
                                <h6>{strings.Lbl_GulfSpecInfo}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_WithHoldingTax}</label>
                                        <Dropdown id="dpWithHoldingTax" disabled={this.checkIfFieldDisabled("dpWithHoldingTax")} placeholder='' selectedKey={this.state.dpWithHoldingTax.value} options={this.state.dpWithHoldingTax.options} onChange={this._onDpChange.bind(this)} />
                                    </div>
                                    {Constants.EMIRATE_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 ?
                                        <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                            <label>{strings.Lbl_Emirate}</label>
                                            <Dropdown id="dpEmirate" disabled={this.checkIfFieldDisabled("dpEmirate")} placeholder='' selectedKey={this.state.dpEmirate.value} options={this.state.dpEmirate.options} onChange={this._onDpChange.bind(this)} />
                                        </div>
                                        : null}
                                </div>
                            </React.Fragment>
                            : null}

                        {this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY ?
                            <React.Fragment>
                                {/* <!-- India Specific Information ====================================== --> */}
                                <h6>{strings.Lbl_IndiaSpecInfo}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_PlaceOfSupply}</label>
                                        <Dropdown id="dpPlaceOfSupply" disabled={this.checkIfFieldDisabled("dpPlaceOfSupply")} placeholder='' selectedKey={this.state.dpPlaceOfSupply.value} options={this.state.dpPlaceOfSupply.options} onChange={this._onDpChange.bind(this)} />
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_GSTRegType}</label>
                                        <Dropdown id="dpGSTRegType" disabled={this.checkIfFieldDisabled("dpGSTRegType")} placeholder='' selectedKey={this.state.dpGSTRegType.value} options={this.state.dpGSTRegType.options} onChange={this._onDpChange.bind(this)} />
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_CIN}</label>
                                        <input id="tbxCIN" disabled={this.checkIfFieldDisabled("tbxCIN")} className="form-control" type="text" value={this.state.tbxCIN} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label>{strings.Lbl_TDSRate}</label>
                                        <input id="tbxTDSRate" disabled={this.checkIfFieldDisabled("tbxTDSRate")} className="form-control" type="text" value={this.state.tbxTDSRate} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                    </div>
                                </div>
                            </React.Fragment>
                            : null}
                    </div>
                    <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div >
            </div >);
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

    private async BindData() {
        /// <summary>Bind data.</summary>
        var tempStateObj = {};
        for (var i = 0; i < MASTER_DROPDOWNS.length; i++) {
            let options = [];
            if (!MASTER_DROPDOWNS[i].required) {
                options[0] = { key: '', text: '' }
            }

            var tempObj = this.state[MASTER_DROPDOWNS[i].key];
            if (MASTER_DROPDOWNS[i].name === "Default Tax code") {
                let tempoptions = await Utils.GetMasterListItemsForDefaultTaxCode(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS[i].name);
                options.push(...tempoptions);
                tempObj.options = options;
            }
            else {
                let tempoptions = await Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, MASTER_DROPDOWNS[i].name);
                options.push(...tempoptions);
                tempObj.options = options;
            }

            options.length > 0 ? tempStateObj[MASTER_DROPDOWNS[i].key] = tempObj : [];
        }
        tempStateObj["loading"] = false;
        this.setState({ ...tempStateObj });
    }


    private ValidateSection4(): boolean {
        /// <summary>Validate section 4.</summary>
        let errors = this.state.errors;
        errors.dpDefaultTaxCode = (Utils.CheckRequiredField(this.state.dpDefaultTaxCode.value) === false) ? strings.CantLeaveBlankMsg : "";
        errors.dpPaymentTerms = (Utils.CheckRequiredField(this.state.dpPaymentTerms.value) === false) ? strings.CantLeaveBlankMsg : "";
        errors.dpDeliveryMethod = (Utils.CheckRequiredField(this.state.dpDeliveryMethod.value) === false) ? strings.CantLeaveBlankMsg : "";

        //rutvik 6-7 24
        if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY) {
            errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : "";
        } else {
            errors.tbxCustomerRemark4 = '';
            errors.tbxCustomerRemark5 = '';
            errors.tbxCustomerRemark8 = '';
        }
        //endr
        this.setState({ errors: errors });
        let valid = true;
        Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null; });
        return valid;
    }

    private async SaveData() {
        /// <summary>Save data in list.</summary>
        try {
            this.setState({ loading: true });
            var tempData = {
                DefaultTaxCode: this.state.dpDefaultTaxCode.value,
                PaymentTerms: this.state.dpPaymentTerms.value,
                WithholdingTaxType: this.state.dpWithHoldingTax.value,
                Emirate: this.state.dpEmirate.value,
                PlaceofSupply: this.state.dpPlaceOfSupply.value,
                GSTRegistrationType: this.state.dpGSTRegType.value,
                TDSTaxRate: Utils.TrimData(this.state.tbxTDSRate),
                Instructions: Utils.TrimData(this.state.tbxInstructions),
                CIN: Utils.TrimData(this.state.tbxCIN),
                DeliveryMethod: this.state.dpDeliveryMethod.value,
                CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
                CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
                CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
                CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
                ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
            };


            if (this.props.itemID > 0) {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
                });
            }
        } catch (error) {
            this.setState({ loading: false });
            //error log change
            let errordata = {
                Title: new Date(),
                Errors: error,
                RequestID: this.props.itemID
            }
            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata);
            //error log change end
            console.log("section 4 save data", error);
        }
    }

    private _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>Textbox change event.</summary>
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

    private _onDpChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption): void {
        /// <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState({ ...this.state, [event.target.id]: tempObj });

        //rutvik validate change
        let errors = this.state.errors;
        if (event.target.id === "dpDefaultTaxCode") errors.dpDefaultTaxCode = '';
        if (event.target.id === "dpPaymentTerms") errors.dpPaymentTerms = '';
        if (event.target.id === "dpDeliveryMethod") errors.dpDeliveryMethod = '';
        this.setState({ errors: errors });
        //end

    }

    private async _NextClick() {
        /// <summary>Next button event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            this.setState({ loading: false }, async () => {
                await this.props.dataChange("section4Data", this.state);
                this.props.nextStep();
            });
        }
    }

    private async _BackClick() {
        /// <summary>Back button event.<summary>
        this.props.dataChange("section4Data", this.state);
        this.props.backStep();
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    private async SaveDataOperations() {
        /// <summary>Validate and save data operations.</summary>
        if (this.ValidateSection4() === false) {
            this.setState({ loading: false }); //9-2-23
            return false;
        }
        await this.SaveData();
        return true;
    }
}