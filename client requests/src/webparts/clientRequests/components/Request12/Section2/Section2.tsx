import * as React from 'react';
import { ISection2Props, ISection2State } from './ISection2Props';
import { Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Dropdown, IDropdownOption, Icon, Label } from 'office-ui-fabric-react';

export default class Section2 extends React.Component<ISection2Props, ISection2State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);

    constructor(props: ISection2Props) {
        super(props);

        this.state = {
            requestor: '',
            clientDetail: '',
            loading: true,
            tbxClientAttentionName: '',
            tbxEmail: '',
            tbxPhoneNo: '',
            itemID: 0,
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end

            //rutvik 29-3-24
            tbxFinanceEmail: '',
            dpExcludeFromClientInvoiceReminder: { value: strings.strNo, options: Constants.EXCLUDEFROMCLIENTINVOICEREMINDER },
            Boolean3Value: false,
            errors: {
                tbxFinanceEmail: '',
                dpExcludeFromClientInvoiceReminder: ''
            }
        };
    }

    public async componentWillMount() {
        /// <summary>Bind data for read only and edit mode.</summary>
        await this.GetCompanyClient();

        if (this.props.listData !== null) {
            if (this.props.listData.LegalName !== null) {
                this.setState({
                    tbxClientAttentionName: this.props.listData["ClientAttentionName"],
                    tbxEmail: this.props.listData["Email"],
                    tbxPhoneNo: this.props.listData["PhoneNo"],
                    tbxFinanceEmail: this.props.listData["FinanceEmail"],
                    dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.props.listData["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludeFromClientInvoiceReminder)
                });
            } else {
                this.setState({
                    tbxClientAttentionName: this.state.clientDetail.lblClientAttentionName,
                    tbxEmail: this.state.clientDetail.lblEmail,
                    tbxPhoneNo: this.state.clientDetail.lblPhoneNo,
                    tbxFinanceEmail: this.state.clientDetail.lblFinanceEmail,
                    dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.state.clientDetail.lblExcludeFromClientInvoiceReminder, this.state.dpExcludeFromClientInvoiceReminder)
                });
            }
        } else {
            this.setState({
                tbxClientAttentionName: this.state.clientDetail.lblClientAttentionName,
                tbxEmail: this.state.clientDetail.lblEmail,
                tbxPhoneNo: this.state.clientDetail.lblPhoneNo,
                tbxFinanceEmail: this.state.clientDetail.lblFinanceEmail,
                dpExcludeFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.state.clientDetail.lblExcludeFromClientInvoiceReminder, this.state.dpExcludeFromClientInvoiceReminder)
            });
        }

        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
        this.setState({ loading: false });

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //Shraddha 08-08-22 item 4 end

        //rutvik 29-3-24
        let Companiesvalues = await Utils.GetDropDownValuesForCompany(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company');

        var CurrentRequestData = await this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select('Company').get();

        let Boolean3OfSelectedCompany = Companiesvalues.filter(x => x.key === CurrentRequestData.Company);
        this.setState({ Boolean3Value: Boolean3OfSelectedCompany[0].Boolean3 });
        if (!this.state.Boolean3Value) {
            let errors = this.state.errors;
            errors.tbxFinanceEmail = "";
            errors.dpExcludeFromClientInvoiceReminder = "";
            this.setState({ ...this.state, errors: errors });
        }
    }

    public render(): React.ReactElement<ISection2Props> {
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
                                <h6>{strings.Lbl_Name}</h6>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_MaconomyClientNo}</label>
                                        <p>{this.state.clientDetail.lblMaconomyAccountID !== null ? this.state.clientDetail.lblMaconomyAccountID : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.CompanyFieldLabel}</label>
                                        <p>{this.state.clientDetail.lblCompany !== null ? this.state.clientDetail.lblCompany : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_SocialName}</label>
                                        <p>{this.state.clientDetail.lblSocialName !== null ? this.state.clientDetail.lblSocialName : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_LegalName}</label>
                                        <p>{this.state.clientDetail.lblLegalName !== null ? this.state.clientDetail.lblLegalName : strings.EmptyData}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-lg-6 form-info ">
                                <h6>{strings.Lbl_Address}</h6>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Line1}</label>
                                        <p>{this.state.clientDetail.lblLine1 !== null ? this.state.clientDetail.lblLine1 : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Line2}</label>
                                        <p>{this.state.clientDetail.lblLine2 !== null ? this.state.clientDetail.lblLine2 : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_ZipCode}</label>
                                        <p>{this.state.clientDetail.lblZipcode !== null ? this.state.clientDetail.lblZipcode : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Postal}</label>
                                        <p>{this.state.clientDetail.lblPostalDistrictCity !== null ? this.state.clientDetail.lblPostalDistrictCity : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_CountryArea}</label>
                                        <p>{this.state.clientDetail.lblCountryAreaRegion !== null ? this.state.clientDetail.lblCountryAreaRegion : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Country}</label>
                                        <p>{this.state.clientDetail.lblCountry !== null ? this.state.clientDetail.lblCountry : strings.EmptyData}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6 col-lg-6 form-info ">
                                <h6>{strings.Lbl_ContactDetails}</h6>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_ClientAttentionName}</label>
                                        <p>{this.state.clientDetail.lblClientAttentionName !== null ? this.state.clientDetail.lblClientAttentionName : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_EmailAddress}</label>
                                        <p>{this.state.clientDetail.lblEmail !== null ? this.state.clientDetail.lblEmail : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_PhoneNo}</label>
                                        <p>{this.state.clientDetail.lblPhoneNo !== null ? this.state.clientDetail.lblPhoneNo : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_FinanceEmailAddress}</label>
                                        <p>{this.state.clientDetail.lblFinanceEmail !== null ? this.state.clientDetail.lblFinanceEmail : strings.EmptyData}</p>
                                    </div>
                                    {this.state.Boolean3Value ?
                                        <div className="form-group col-6">
                                            <label>{strings.Lbl_ExcludedFromClientInvoiceReminders}</label>
                                            <p>{this.state.clientDetail.lblExcludeFromClientInvoiceReminder !== null ? this.state.clientDetail.lblExcludeFromClientInvoiceReminder : strings.EmptyData}</p>
                                        </div> : null}

                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 ">
                                <h6>{strings.Lbl_ContactDetails}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label>{strings.Lbl_ClientAttentionName}</label>
                                        <input id="tbxClientAttentionName" disabled={this.checkIfFieldDisabled("tbxClientAttentionName")} maxLength={255} className="form-control" type="text" value={this.state.tbxClientAttentionName} placeholder="" onChange={this._onTbxChange.bind(this)}
                                            style={{ backgroundColor: (Utils.TrimData(this.state.tbxClientAttentionName) !== Utils.TrimData(this.state.clientDetail.lblClientAttentionName)) ? Constants.YELLOW : Constants.WHITE }} />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label>{strings.Lbl_EmailAddress}</label>
                                        <input id="tbxEmail" disabled={this.checkIfFieldDisabled("tbxEmail")} maxLength={255} className="form-control" type="text" value={this.state.tbxEmail} placeholder="" onChange={this._onTbxChange.bind(this)}
                                            style={{ backgroundColor: (Utils.TrimData(this.state.tbxEmail) !== Utils.TrimData(this.state.clientDetail.lblEmail)) ? Constants.YELLOW : Constants.WHITE }} />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label>{strings.Lbl_PhoneNo}</label>
                                        <input id="tbxPhoneNo" disabled={this.checkIfFieldDisabled("tbxPhoneNo")} maxLength={255} className="form-control" type="text" value={this.state.tbxPhoneNo} placeholder="" onChange={this._onTbxChange.bind(this)}
                                            style={{ backgroundColor: (Utils.TrimData(this.state.tbxPhoneNo) !== Utils.TrimData(this.state.clientDetail.lblPhoneNo)) ? Constants.YELLOW : Constants.WHITE }} />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label>{strings.Lbl_FinanceEmailAddress}{this.state.Boolean3Value ? <sub>*</sub> : null}</label>
                                        <input id="tbxFinanceEmail" disabled={this.checkIfFieldDisabled("tbxFinanceEmail")} maxLength={255} className="form-control" type="text" value={this.state.tbxFinanceEmail} placeholder="" onChange={this._onTbxChange.bind(this)}
                                            style={{ backgroundColor: (Utils.TrimData(this.state.tbxFinanceEmail) !== Utils.TrimData(this.state.clientDetail.lblFinanceEmail)) ? Constants.YELLOW : Constants.WHITE }} />
                                        {this.state.errors.tbxFinanceEmail.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxFinanceEmail} </Label>
                                        </span> : null}
                                    </div>
                                    {this.state.Boolean3Value ?
                                        <div className="form-group col-sm-6">
                                            <label>{strings.Lbl_ExcludedFromClientInvoiceReminders}{this.state.Boolean3Value ? <sub>*</sub> : null}</label>
                                            <Dropdown id="dpExcludeFromClientInvoiceReminder" disabled={this.checkIfFieldDisabled("dpExcludeFromClientInvoiceReminder")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpExcludeFromClientInvoiceReminder.value} options={this.state.dpExcludeFromClientInvoiceReminder.options} onChange={this._onDpChange.bind(this)} style={{ backgroundColor: (Utils.TrimData(this.state.dpExcludeFromClientInvoiceReminder.value) !== Utils.TrimData(this.state.clientDetail.lblExcludeFromClientInvoiceReminder)) ? Constants.YELLOW : Constants.WHITE }} />

                                            {this.state.errors.dpExcludeFromClientInvoiceReminder.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                                <Label className="errormessage" >{this.state.errors.dpExcludeFromClientInvoiceReminder} </Label>
                                            </span> : null}
                                        </div> : null}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-6 form-info ">
                                <h6>{strings.Lbl_GeneralInfo}</h6>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Currency}</label>
                                        <p>{this.state.clientDetail.lblCurrency !== null ? this.state.clientDetail.lblCurrency : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_CompanyRegNo}</label>
                                        <p>{this.state.clientDetail.lblCompanyRegistrationNo !== null ? this.state.clientDetail.lblCompanyRegistrationNo : strings.EmptyData}</p>
                                    </div>
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_Sector}</label>
                                        <p>{this.state.clientDetail.lblSector !== null ? this.state.clientDetail.lblSector : strings.EmptyData}</p>
                                    </div>
                                    {/* //rutvik 20-7 25 */}
                                    {/* <div className="form-group col-6">
                                        <label>{strings.Lbl_ClientStatus}</label>
                                        <p>{this.state.clientDetail.lblClientStatus !== null ? this.state.clientDetail.lblClientStatus : strings.EmptyData}</p>
                                    </div> */}
                                    <div className="form-group col-6">
                                        <label>{strings.Lbl_ClientType}</label>
                                        <p>{this.state.clientDetail.lblClientType !== null ? this.state.clientDetail.lblClientType : strings.EmptyData}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

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


    public componentDidMount() {
        this.forceUpdate();
    }

    private async _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>On texbox value change set value into state property.</summary>
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });

        //rutvik 29-3-24
        let errors = this.state.errors;
        if (id === "tbxFinanceEmail") errors.tbxFinanceEmail = "",

            this.setState({ errors: errors });
    }

    //rutvik 1-4-23
    private _onDpChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption): void {
        // <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState({ ...this.state, [event.target.id]: tempObj });

        let errors = this.state.errors;
        if (event.target.id == "dpExcludeFromClientInvoiceReminder") errors.dpExcludeFromClientInvoiceReminder = '';

        this.setState({ errors: errors });
    }

    private async GetCompanyClient() {
        /// <summary>Fetch client data to display in read only mode.</summary>
        try {
            var data = this.props.selectedClientData;

            if (data !== null) {
                data.PaymentTerms = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.PaymentTerms);
                //rutvik test change
                //data.DefaultTaxCode = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.DefaultTaxCode);
                data.PlaceOfSupply = data.PlaceofSupply;
                this.setState({
                    clientDetail: {
                        lblMaconomyAccountID: data.MaconomyAccountID,
                        lblCompany: data.Company,
                        lblSocialName: data.Title,
                        lblLegalName: data.LegalName,
                        lblClientAttentionName: data.ClientAttentionName,
                        lblEmail: data.Email,
                        lblFinanceEmail: data.FinanceEmail, //rutvik 29-3-24
                        lblExcludeFromClientInvoiceReminder: data.ExcludeFromClientInvoiceReminder === true ? strings.strYes : strings.strNo, //rutvik 1-4-23
                        lblPhoneNo: data.PhoneNo,
                        lblDefaultTaxCode: data.DefaultTaxCode, //rutvik test change
                        lblPaymentTerms: data.PaymentTerms,
                        lblWithholdingTaxType: data.WithholdingTaxType,
                        lblEmirate: data.Emirate,
                        lblPlaceofSupply: data.PlaceOfSupply,
                        lblGSTRegistrationType: data.GSTRegistrationType,
                        lblCIN: data.CIN,
                        lblTDSTaxRate: data.TDSTaxRate,
                        lblLine1: data.Line1,
                        lblLine2: data.Line2,
                        lblZipcode: data.Zipcode,
                        lblPostalDistrictCity: data.Postal_District_City,
                        lblCountryAreaRegion: data.Country_Area_Region,
                        lblCountry: data.Country,
                        lblCurrency: data.Currency,
                        lblCompanyRegistrationNo: data.CompanyRegistrationNo,
                        lblSector: data.Sector,
                        //rutvik 20-7 25
                        //lblClientStatus: data.ClientStatus,
                        //endr
                        lblClientType: data.ClientType,
                        lblTaxRegistrationNo: data.TaxRegistrationNo,
                        lblCustomerRemark4: data.CustomerRemark4,
                        lblCustomerRemark5: data.CustomerRemark5,
                        lblCustomerRemark8: data.CustomerRemark8,
                        lblCustomerRemark7: data.CustomerRemark7,
                        lblClientIDType: data.ClientIDType,
                        //rutvik employee dp change 3-3-23
                        lblClientLead: data.ClientLead,
                        lblCommercialManager: data.CommercialManager,
                        lblBiller: data.Biller,
                        lblProjectAnalyst: data.ProjectAnalyst,
                        lblResourceManager: data.ResourceManager
                    }
                });

            }
        } catch (error) {
            console.log("Get client data--->", error);
        }
    }

    private async _BackClick() {
        /// <summary>Back button click event.</summary>
        await this.props.dataChange("section2Data", this.state);
        this.props.backStep();
    }

    private async _NextClick() {
        /// <summary>Next button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            this.setState({ loading: false }, async () => {
                await this.props.dataChange("section2Data", this.state);
                this.props.nextStep();
            });
        } //rutvik 29-3-24
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        //rutvik 29-3-24
        if (await this.SaveDataOperations()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    //rutvik 29-3-24
    private async SaveDataOperations() {
        /// <summar>Validate and save data operations.</summary>
        if (this.ValidateSection3() === false) {
            this.setState({ loading: false }); //9-2-23
            return false;
        }
        await this.SaveData();
        return true;
    }

    //rutvik 29-3-24
    private ValidateSection3(): boolean {
        /// <summary>Validate section 3.</summary>
        let errors = this.state.errors;

        if (this.state.Boolean3Value) {
            errors.tbxFinanceEmail = (Utils.CheckRequiredField(this.state.tbxFinanceEmail) === false) ? strings.CantLeaveBlankMsg : "";
        } else {
            errors.tbxFinanceEmail = "";
        }

        this.setState({ errors: errors });
        let valid = true;
        Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null; });
        return valid;
    }

    private async SaveData() {
        /// <summary>Save data in list.</summary>
        try {
            this.setState({
                loading: true
            });

            var tempData = {
                ClientAttentionName: Utils.TrimData(this.state.tbxClientAttentionName),
                Email: Utils.TrimData(this.state.tbxEmail),
                PhoneNo: Utils.TrimData(this.state.tbxPhoneNo),
                LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
                //rutvik employee dp change 3-3-23
                ClientLead: this.state.clientDetail.lblClientLead,
                CommercialAnalyst: this.state.clientDetail.lblCommercialManager,
                Biller: this.state.clientDetail.lblBiller,
                ProjectAnalyst: this.state.clientDetail.lblProjectAnalyst,
                ResourceManager: this.state.clientDetail.lblResourceManager,
                FinanceEmail: Utils.TrimData(this.state.tbxFinanceEmail), //rutvik 29-3-24
                ExcludeFromClientInvoiceReminder: this.state.dpExcludeFromClientInvoiceReminder.value === strings.strYes ? true : false //rutvik 1-4-23
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
}