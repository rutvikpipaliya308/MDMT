import * as React from 'react';
import { ISection3Props, ISection3State } from './ISection3Props';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { Web } from 'sp-pnp-js';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

export default class Section3 extends React.Component<ISection3Props, ISection3State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private isRequest8: boolean = this.props.requestType === "8";


    constructor(props: ISection3Props) {
        super(props);
        this.state = {
            loading: true,
            tbxContactComNo: '',
            dpCountry: { value: '', options: [] },
            dpSector: { value: '', options: [] },
            dpCurrency: { value: '', options: [] },
            dpExcludedFromClientInvoiceReminder: { value: strings.strNo, options: Constants.EXCLUDEFROMCLIENTINVOICEREMINDER }, //rutvik 29-3-24
            //dpClientStatus: { value: '', options: [] },
            dpClientType: { value: '', options: [] },
            tbxSocialName: '',
            tbxLegalNameInArabic: '', //rutvik 13-3-24
            tbxLine2: '',
            tbxZipcode: '',
            tbxPostal: '',
            tbxCountryArea: '',
            tbxClientAttenName: '',
            tbxEmail: '',
            tbxFinanceEmail: '', //rutvik 28-3-24
            tbxPhoneNo: '',
            tbxCompanyRegNo: '',
            currentUserid: '',
            requestorid: '',
            tbxArabicLine1: '', //rutvik 13-3-24
            tbxArabicLine2: '',
            // tbxArabicZipcode: '',
            tbxArabicPostal: '',
            tbxArabicCountryArea: '', //end
            Boolean3Value: false, //rutvik 28-3-24
            errors: {
                tbxSocialName: '',
                tbxLegalNameInArabic: '', //rutvik 13-3-24
                tbxPostal: '',
                dpCountry: '',
                tbxClientAttenName: '',
                tbxEmail: '',
                tbxFinanceEmail: '', //rutvik 28-3-24
                tbxPhoneNo: '',
                dpCurrency: '',
                dpSector: '',
                //dpClientStatus: '',
                dpClientType: '',
                dpExcludedFromClientInvoiceReminder: '',
                tbxZipcode: '', //rutvik 13-3-24
                tbxArabicLine1: '', //rutvik 13-3-24
                tbxArabicLine2: '',
                // tbxArabicZipcode: '',
                tbxArabicPostal: '',
                tbxArabicCountryArea: '',
            },
            itemID: 0
        };
    }

    public async componentWillMount() {

        try {
            /// <summary>Bind data.</summary>            
            let item = null;
            if (this.isRequest8) {
                let viewXML = `<View>
            <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="Title"></FieldRef>
            <FieldRef Name="ClientCompanyNo"></FieldRef>
            <FieldRef Name="Sector"></FieldRef>            
            <FieldRef Name="ClientType"></FieldRef>
            <FieldRef Name="Country"></FieldRef>
            <FieldRef Name="ClientAttentionName"></FieldRef>
            <FieldRef Name="PhoneNo"></FieldRef>
            <FieldRef Name="Email"></FieldRef>
            </ViewFields>
            <RowLimit>1</RowLimit><Query><Where>
            <Eq><FieldRef Name="ClientCompanyNo"/><Value Type="Text">`+ this.props.contactCompanyNo + `</Value></Eq>  
            </Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>`;

                // item = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CONTACTCOMPANY_INTERNALANAME, viewXML);
                var tempData = await this.objWeb.lists.getByTitle(Constants.CONTACTCOMPANY_INTERNALANAME).items.select().getAll();
                let tempArray = [];
                tempData.filter((tempItem) => {
                    let isAccessLevelPresent: boolean = false;
                    if (tempItem.AccessLevel === this.props.accessLevel) {
                        isAccessLevelPresent = true;
                    } else {
                        if (tempItem["AccessLevel"] !== null && this.props.accessLevel !== null) {
                            let accessLevelArrayFromItem = [];
                            let accessLevelArrayFromUser = [];
                            accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                            accessLevelArrayFromUser = this.props.accessLevel.split(',');

                            accessLevelArrayFromItem.forEach(element => {
                                accessLevelArrayFromUser.forEach(ele => {
                                    if (ele === element) {
                                        isAccessLevelPresent = true;
                                    }
                                });
                            });
                        }
                    }
                    if (tempItem.ClientCompanyNo == this.props.contactCompanyNo && isAccessLevelPresent) {
                        tempArray.push(tempItem);
                    }
                });

                tempArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
                item = tempArray[0];
                if (item !== null) {
                    this.setState({
                        tbxContactComNo: item["ClientCompanyNo"],
                        tbxSocialName: item["Title"],
                        dpSector: Utils.GetDropdownStateValue(item["Sector"], this.state.dpSector),
                        //dpClientStatus: Utils.GetDropdownStateValue(item["ClientStatus"], this.state.dpClientStatus),
                        dpClientType: Utils.GetDropdownStateValue(item["ClientType"], this.state.dpClientType),
                        dpCountry: Utils.GetDropdownStateValue(item["Country"], this.state.dpCountry),
                        tbxClientAttenName: item["ClientAttentionName"],
                        tbxPhoneNo: item["PhoneNo"],
                        tbxEmail: item["Email"],
                        tbxFinanceEmail: item["FinanceEmail"],
                        dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(item["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludedFromClientInvoiceReminder)
                    });

                    //rutvik 29-3-24
                    if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                        this.setState({
                            tbxLegalNameInArabic: item["LegalNameInArabic"],
                            tbxArabicLine1: item["ArabicLine1"],
                            tbxArabicLine2: item["ArabicLine2"],
                            // tbxArabicZipcode: item["ArabicZipCode"],
                            tbxArabicPostal: item["ArabicPostalDistrict"],
                            tbxArabicCountryArea: item["ArabicCountryAreaRegion"],
                        })
                    }
                }
            }
            if (this.props.data === null || this.props.data === undefined) {
                await this.BindData();
            }

            if (this.props.listData !== null && (this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    tbxLine2: this.props.listData["Line2"],
                    tbxZipcode: this.props.listData["Zipcode"],
                    tbxPostal: this.props.listData["Postal_District_City"],
                    tbxCountryArea: this.props.listData["Country_Area_Region"],
                    tbxCompanyRegNo: this.props.listData["CompanyRegistrationNo"],
                    dpCurrency: Utils.GetDropdownStateValue(this.props.listData["Currency"], this.state.dpCurrency),
                    //rutvik 13-3-2024
                    tbxLegalNameInArabic: this.props.listData["LegalNameInArabic"],
                    tbxArabicLine1: this.props.listData["ArabicLine1"],
                    tbxArabicLine2: this.props.listData["ArabicLine2"],
                    // tbxArabicZipcode: this.props.listData["ArabicZipCode"],
                    tbxArabicPostal: this.props.listData["ArabicPostalDistrict"],
                    tbxArabicCountryArea: this.props.listData["ArabicCountryAreaRegion"],
                    tbxFinanceEmail: this.props.listData["FinanceEmail"],
                    //end
                    dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(this.props.listData["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludedFromClientInvoiceReminder) //rutvik 29-3-24
                });

                //rutvik 13-3-24
                if (this.props.CountryOfCompany !== Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                    this.setState({
                        tbxLegalNameInArabic: '',
                        tbxArabicLine1: '',
                        tbxArabicLine2: '',
                        // tbxArabicZipcode: '',
                        tbxArabicPostal: '',
                        tbxArabicCountryArea: '',
                    });
                }
                //end

                let stateData = {};

                this.props.listData["Title"] !== null && this.props.listData["Title"] !== "" ? stateData["tbxSocialName"] = this.props.listData["Title"] : null;
                this.props.listData["Email"] !== null && this.props.listData["Email"] !== "" ? stateData["tbxEmail"] = this.props.listData["Email"] : null;
                this.props.listData["FinanceEmail"] !== null && this.props.listData["FinanceEmail"] !== "" ? stateData["tbxFinanceEmail"] = this.props.listData["FinanceEmail"] : null; //rutvik 29-3-24
                this.props.listData["PhoneNo"] !== null && this.props.listData["PhoneNo"] !== "" ? stateData["tbxPhoneNo"] = this.props.listData["PhoneNo"] : null;
                this.props.listData["ClientAttentionName"] !== null && this.props.listData["ClientAttentionName"] !== "" ? stateData["tbxClientAttenName"] = this.props.listData["ClientAttentionName"] : null;
                this.props.listData["Country"] !== null && this.props.listData["Country"] !== "" ? stateData["dpCountry"] = Utils.GetDropdownStateValue(this.props.listData["Country"], this.state.dpCountry) : null;
                this.props.listData["Sector"] !== null && this.props.listData["Sector"] !== "" ? stateData["dpSector"] = Utils.GetDropdownStateValue(this.props.listData["Sector"], this.state.dpSector) : null;
                //this.props.listData["ClientStatus"] !== null && this.props.listData["ClientStatus"] !== "" ? stateData["dpClientStatus"] = Utils.GetDropdownStateValue(this.props.listData["ClientStatus"], this.state.dpClientStatus) : null;
                this.props.listData["ClientType"] !== null && this.props.listData["ClientType"] !== "" ? stateData["dpClientType"] = Utils.GetDropdownStateValue(this.props.listData["ClientType"], this.state.dpClientType) : null;
                if (!this.isRequest8) {
                    this.setState({ ...stateData });
                } else if (this.isRequest8 && this.state.tbxContactComNo === this.props.listData["ContactCompanyNo"]) {
                    this.setState({ ...stateData });
                }

            }

            if (this.props.data !== null && this.props.data !== undefined) {
                this.setState({ ...this.props.data }, () => {

                    if (this.isRequest8 && this.props.data.tbxContactComNo !== this.props.contactCompanyNo && item !== null) {
                        this.setState({
                            tbxContactComNo: item["ClientCompanyNo"],
                            tbxSocialName: item["Title"],
                            dpSector: Utils.GetDropdownStateValue(item["Sector"], this.state.dpSector),
                            //dpClientStatus: Utils.GetDropdownStateValue(item["ClientStatus"], this.state.dpClientStatus),
                            dpClientType: Utils.GetDropdownStateValue(item["ClientType"], this.state.dpClientType),
                            dpCountry: Utils.GetDropdownStateValue(item["Country"], this.state.dpCountry),
                            tbxClientAttenName: item["ClientAttentionName"] === null ? "" : item["ClientAttentionName"],
                            tbxPhoneNo: item["PhoneNo"] === null ? "" : item["PhoneNo"],
                            tbxEmail: item["Email"] === null ? "" : item["Email"],
                            tbxFinanceEmail: item["FinanceEmail"] === null ? "" : item["FinanceEmail"], //rutvik 29-3-24
                            dpExcludedFromClientInvoiceReminder: Utils.GetDropdownStateValue(item["ExcludeFromClientInvoiceReminder"] === true ? strings.strYes : strings.strNo, this.state.dpExcludedFromClientInvoiceReminder) //rutvik 29-3-24
                        });
                    }
                });

                //rutvik 13-3-24
                if (this.props.CountryOfCompany !== Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
                    this.setState({
                        tbxLegalNameInArabic: '',
                        tbxArabicLine1: '',
                        tbxArabicLine2: '',
                        // tbxArabicZipcode: '',
                        tbxArabicPostal: '',
                        tbxArabicCountryArea: '',
                    });
                }

            }
            this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;

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
                this.setState({ ...this.state, errors: errors });
            }
        } catch (error) {
            console.log("Request7/Section3.tsx/ComponentWillMount-->", error);
        }
    }

    public render(): React.ReactElement<ISection3Props> {
        return (
            <div className="container-fluid">
                {/* <!-- card-primary ===================== --> */}
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
                        <h3>{strings.Section3Title}</h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        {this.isRequest8 ? <React.Fragment>
                            {/* <!-- Contact Company ====================================== --> */}
                            <h6>{strings.Lbl_ContactCompany}</h6>
                            <div className="row">
                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <label>{strings.Lbl_ContactCompanyNo}</label>
                                    <input id="tbxContactComNo" disabled className="form-control" type="text" value={this.state.tbxContactComNo} placeholder="" maxLength={255} />
                                </div>
                            </div>
                        </React.Fragment> : ""}
                        {/* <!-- Name ====================================== --> */}
                        <h6>{strings.Lbl_Name}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_SocialName}<sub>*</sub></label>
                                <input id="tbxSocialName" disabled={this.checkIfFieldDisabled("tbxSocialName")} className="form-control" type="text" value={this.state.tbxSocialName} placeholder="" onChange={this._onTbxChange.bind(this)} maxLength={255} />
                                {this.state.errors.tbxSocialName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxSocialName} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_LegalName}</label>
                                <input id="tbxlegalName" className="form-control" type="text" value={this.props.section2Data.tbxlegalName} placeholder="" maxLength={255} disabled={true} />
                            </div>
                            {/* rutvik 13-3-24 */}
                            {this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                                <>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_LegalNameInArabic}<sub>*</sub></label>
                                        <input id="tbxLegalNameInArabic" className="form-control" dir="rtl" type="text" disabled={this.checkIfFieldDisabled("tbxLegalNameInArabic")} value={this.state.tbxLegalNameInArabic} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxLegalNameInArabic.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxLegalNameInArabic} </Label>
                                        </span> : null}
                                    </div>
                                </>
                                : null}
                        </div>

                        {/* <!-- Address ===================================== --> */}
                        <h6>{strings.Lbl_Address}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Line1}</label>
                                <input id="tbxLine1" className="form-control" type="text" value={this.props.section2Data.tbxLine1} placeholder="" maxLength={255} disabled={true} />

                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Line2}</label>
                                <input id="tbxLine2" disabled={this.checkIfFieldDisabled("tbxLine2")} className="form-control" type="text" value={this.state.tbxLine2} placeholder="" onChange={this._onTbxChange.bind(this)} maxLength={255} />
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_ZipCode}{this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ? <sub>*</sub> : null}</label>
                                <input id="tbxZipcode" disabled={this.checkIfFieldDisabled("tbxZipcode")} className="form-control" type="text" value={this.state.tbxZipcode} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {this.state.errors.tbxZipcode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxZipcode} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Postal}<sub>*</sub></label>
                                <input id="tbxPostal" disabled={this.checkIfFieldDisabled("tbxPostal")} className="form-control" type="text" value={this.state.tbxPostal} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {this.state.errors.tbxPostal.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxPostal} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_CountryArea}</label>
                                <input id="tbxCountryArea" disabled={this.checkIfFieldDisabled("tbxCountryArea")} className="form-control" type="text" value={this.state.tbxCountryArea} placeholder="" onChange={this._onTbxChange.bind(this)} />
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Country}<sub>*</sub></label>
                                <Dropdown id="dpCountry" disabled={this.checkIfFieldDisabled("dpCountry")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCountry.value} options={this.state.dpCountry.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpCountry.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpCountry} </Label>
                                </span> : null}
                            </div>
                        </div>

                        {/* <!-- Arabic Address ===================================== --> */}
                        {this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
                            <>
                                <h6>{strings.Lbl_ArabicAddress}</h6>
                                <div className="row">
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_ArabicLine1}<sub>*</sub></label>
                                        <input id="tbxArabicLine1" className="form-control" dir="rtl" type="text" value={this.state.tbxArabicLine1} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} disabled={this.checkIfFieldDisabled("tbxArabicLine1")} />
                                        {this.state.errors.tbxArabicLine1.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxArabicLine1} </Label>
                                        </span> : null}
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_ArabicLine2}<sub>*</sub></label>
                                        <input id="tbxArabicLine2" disabled={this.checkIfFieldDisabled("tbxArabicLine2")} className="form-control" dir="rtl" type="text" value={this.state.tbxArabicLine2} placeholder="" onChange={this._onTbxChange.bind(this)} maxLength={255} />
                                        {this.state.errors.tbxArabicLine2.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxArabicLine2} </Label>
                                        </span> : null}
                                    </div>
                                    {/* <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_ArabicZipCode}{this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY ? <sub>*</sub> : null}</label>
                                        <input id="tbxArabicZipcode" disabled={this.checkIfFieldDisabled("tbxArabicZipcode")} className="form-control" dir="rtl" type="text" value={this.state.tbxArabicZipcode} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxArabicZipcode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxArabicZipcode} </Label>
                                        </span> : null}
                                    </div> */}
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_ArabicPostal}<sub>*</sub></label>
                                        <input id="tbxArabicPostal" disabled={this.checkIfFieldDisabled("tbxArabicPostal")} className="form-control" dir="rtl" type="text" value={this.state.tbxArabicPostal} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                        {this.state.errors.tbxArabicPostal.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                            <Label className="errormessage" >{this.state.errors.tbxArabicPostal} </Label>
                                        </span> : null}
                                    </div>
                                    <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                        <label className='arabic-right-text'>{strings.Lbl_ArabicCountryArea}</label>
                                        <input id="tbxArabicCountryArea" disabled={this.checkIfFieldDisabled("tbxArabicCountryArea")} className="form-control" dir="rtl" type="text" value={this.state.tbxArabicCountryArea} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                    </div>
                                </div>
                            </> : null}

                        {/* <!-- Contact Details ====================================== --> */}
                        <h6>{strings.Lbl_ContactDetails}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_ClientAttentionName}
                                    {/* <sub>*</sub> */}
                                </label>
                                <input id="tbxClientAttenName" disabled={this.checkIfFieldDisabled("tbxClientAttenName")} className="form-control" type="text" value={this.state.tbxClientAttenName} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {/* {this.state.errors.tbxClientAttenName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxClientAttenName} </Label>
                                </span> : null} */}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_EmailAddress}<sub>*</sub></label>
                                <input id="tbxEmail" disabled={this.checkIfFieldDisabled("tbxEmail")} className="form-control" type="email" value={this.state.tbxEmail} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {this.state.errors.tbxEmail.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxEmail} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_PhoneNo}<sub>*</sub></label>
                                <input id="tbxPhoneNo" disabled={this.checkIfFieldDisabled("tbxPhoneNo")} className="form-control" type="text" value={this.state.tbxPhoneNo} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {this.state.errors.tbxPhoneNo.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxPhoneNo} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_FinanceEmailAddress}{this.state.Boolean3Value ? <sub>*</sub> : null}</label>
                                <input id="tbxFinanceEmail" disabled={this.checkIfFieldDisabled("tbxFinanceEmail")} className="form-control" type="text" value={this.state.tbxFinanceEmail} placeholder="" onChange={this._onTbxChange.bind(this)} />
                                {this.state.errors.tbxFinanceEmail.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.tbxFinanceEmail} </Label>
                                </span> : null}
                            </div>
                            {this.state.Boolean3Value ?
                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <label>{strings.Lbl_ExcludedFromClientInvoiceReminders}<sub>*</sub></label>
                                    <Dropdown id="dpExcludedFromClientInvoiceReminder" disabled={this.checkIfFieldDisabled("dpExcludedFromClientInvoiceReminder")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpExcludedFromClientInvoiceReminder.value} options={this.state.dpExcludedFromClientInvoiceReminder.options} onChange={this._onDpChange.bind(this)} />
                                    {this.state.errors.dpExcludedFromClientInvoiceReminder.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage" >{this.state.errors.dpExcludedFromClientInvoiceReminder} </Label>
                                    </span> : null}
                                </div> : null}

                        </div>

                        {/* <!-- General Information ====================================== --> */}
                        <h6>{strings.Lbl_GeneralInfo}</h6>
                        <div className="row">
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Currency}<sub>*</sub></label>
                                <Dropdown id="dpCurrency" disabled={this.checkIfFieldDisabled("dpCurrency")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCurrency.value} options={this.state.dpCurrency.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpCurrency.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpCurrency} </Label>
                                </span> : null}
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_CompanyRegNo}</label>
                                <input id="tbxCompanyRegNo" disabled={this.checkIfFieldDisabled("tbxCompanyRegNo")} className="form-control" type="text" value={this.state.tbxCompanyRegNo} placeholder="" onChange={this._onTbxChange.bind(this)} />
                            </div>
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_Sector}<sub>*</sub></label>
                                <Dropdown id="dpSector" disabled={this.checkIfFieldDisabled("dpSector")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpSector.value} options={this.state.dpSector.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpSector.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpSector} </Label>
                                </span> : null}
                            </div>
                            {/* rutvik 20-7 25 */}
                            {/* <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_ClientStatus}<sub>*</sub></label>
                                <Dropdown id="dpClientStatus" disabled={this.checkIfFieldDisabled("dpClientStatus")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientStatus.value} options={this.state.dpClientStatus.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpClientStatus.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpClientStatus} </Label>
                                </span> : null}
                            </div> */}
                            <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                <label>{strings.Lbl_ClientType}<sub>*</sub></label>
                                <Dropdown id="dpClientType" disabled={this.checkIfFieldDisabled("dpClientType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientType.value} options={this.state.dpClientType.options} onChange={this._onDpChange.bind(this)} />
                                {this.state.errors.dpClientType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                    <Label className="errormessage" >{this.state.errors.dpClientType} </Label>
                                </span> : null}
                            </div>
                        </div>
                    </div>
                    <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div>
            </div>);
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

    //Shraddha 12-08-22 item 28
    private async BindData() {
        /// <summary>Bind data.</summary>
        var tempStateObj = {};
        for (var i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {
            let options = await Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS_7_8[i].name);
            var tempObj = this.state[Constants.MASTER_DROPDOWNS_7_8[i].key];
            tempObj.options = options;
            options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS_7_8[i].key] = tempObj : [];
        }
        tempStateObj["loading"] = false;
        this.setState({ ...tempStateObj });
    }

    private ValidateSection3(): boolean {
        /// <summary>Validate section 3.</summary>
        let errors = this.state.errors;
        for (var i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {
            errors[Constants.MASTER_DROPDOWNS_7_8[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS_7_8[i].key].value) === false) ? strings.CantLeaveBlankMsg : "";
        }


        errors.tbxSocialName = (Utils.CheckRequiredField(this.state.tbxSocialName) === false) ? strings.CantLeaveBlankMsg : "";
        errors.tbxPostal = (Utils.CheckRequiredField(this.state.tbxPostal) === false) ? strings.CantLeaveBlankMsg : "";
        // errors.tbxClientAttenName = (Utils.CheckRequiredField(this.state.tbxClientAttenName) === false) ? strings.CantLeaveBlankMsg : "";
        errors.tbxEmail = Utils.CheckRequiredField(this.state.tbxEmail) === false ? strings.CantLeaveBlankMsg : "";
        errors.tbxPhoneNo = (Utils.CheckRequiredField(this.state.tbxPhoneNo) === false) ? strings.CantLeaveBlankMsg : "";

        //rutvik 13-3-24 & 28-3-24 validation of zip code
        if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
            if (this.state.dpCountry.value == Constants.SAUDI_ARABIA_COUNTRY) {
                errors.tbxZipcode = (Utils.CheckRequiredField(this.state.tbxZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxZipcode) == false) ? strings.ZipCodeValidationString : "";

                // errors.tbxArabicZipcode = (Utils.CheckRequiredField(this.state.tbxArabicZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxArabicZipcode) == false) ? strings.ZipCodeValidationString : "";
            } else {
                errors.tbxZipcode = "";
            }

            errors.tbxLegalNameInArabic = (Utils.CheckRequiredField(this.state.tbxLegalNameInArabic) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicLine1 = (Utils.CheckRequiredField(this.state.tbxArabicLine1) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicLine2 = (Utils.CheckRequiredField(this.state.tbxArabicLine2) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxArabicPostal = (Utils.CheckRequiredField(this.state.tbxArabicPostal) === false) ? strings.CantLeaveBlankMsg : "";
            //end
        } else {
            errors.tbxLegalNameInArabic = "";
            errors.tbxArabicLine1 = "";
            errors.tbxArabicLine2 = "";
            errors.tbxArabicPostal = "";
            // errors.tbxArabicZipcode = "";
        }

        //rutvik 29-3-24
        if (this.state.Boolean3Value) {
            errors.tbxFinanceEmail = (Utils.CheckRequiredField(this.state.tbxFinanceEmail) === false) ? strings.CantLeaveBlankMsg : "";
            errors.dpExcludedFromClientInvoiceReminder = (Utils.CheckRequiredField(this.state.dpExcludedFromClientInvoiceReminder.value) === false) ? strings.CantLeaveBlankMsg : "";
        } else {
            errors.tbxFinanceEmail = "";
            errors.dpExcludedFromClientInvoiceReminder = "";
        }

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
                Title: Utils.TrimData(this.state.tbxSocialName),
                Line2: Utils.TrimData(this.state.tbxLine2),
                Zipcode: Utils.TrimData(this.state.tbxZipcode),
                Postal_District_City: Utils.TrimData(this.state.tbxPostal),
                Country_Area_Region: Utils.TrimData(this.state.tbxCountryArea),
                Country: this.state.dpCountry.value,
                Currency: this.state.dpCurrency.value,
                CompanyRegistrationNo: Utils.TrimData(this.state.tbxCompanyRegNo),
                Email: Utils.TrimData(this.state.tbxEmail),
                PhoneNo: Utils.TrimData(this.state.tbxPhoneNo),
                ClientAttentionName: Utils.TrimData(this.state.tbxClientAttenName),
                Sector: this.state.dpSector.value,
                //rutvik 20-7 25
                //ClientStatus: this.state.dpClientStatus.value,
                //endr
                ClientType: this.state.dpClientType.value,
                //Rutvik 13-3-24
                LegalNameInArabic: Utils.TrimData(this.state.tbxLegalNameInArabic),
                ArabicLine1: Utils.TrimData(this.state.tbxArabicLine1),
                ArabicLine2: Utils.TrimData(this.state.tbxArabicLine2),
                // ArabicZipCode: Utils.TrimData(this.state.tbxArabicZipcode),
                ArabicPostalDistrict: Utils.TrimData(this.state.tbxArabicPostal),
                ArabicCountryAreaRegion: Utils.TrimData(this.state.tbxArabicCountryArea),
                //end
                FinanceEmail: Utils.TrimData(this.state.tbxFinanceEmail), //rutvik 29-3-24
                ExcludeFromClientInvoiceReminder: this.state.Boolean3Value ? this.state.dpExcludedFromClientInvoiceReminder.value === strings.strYes ? true : false : false//rutvik 29-3-24
            };
            if (this.isRequest8) {
                tempData["ContactCompanyNo"] = Utils.TrimData(this.state.tbxContactComNo);
            }

            if (this.props.itemID > 0) {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
                });
            }
        } catch (error) {
            console.log("section 3 save data", error);
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

    private _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>Textbox change event.</summary>
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });

        //rutvik validate change
        let errors = this.state.errors;
        if (id === "tbxSocialName") errors.tbxSocialName = '';
        if (id === "tbxPostal") errors.tbxPostal = '';
        if (id === "tbxZipcode") errors.tbxZipcode = ''; //rutvik 13-3-24
        if (id === "tbxClientAttenName") errors.tbxClientAttenName = '';
        if (id === "tbxEmail") errors.tbxEmail = '';
        if (id === "tbxPhoneNo") errors.tbxPhoneNo = '';

        //rutvik 13-3-24        
        if (id === "tbxLegalNameInArabic") errors.tbxLegalNameInArabic = '';
        if (id === "tbxArabicLine1") errors.tbxArabicLine1 = '';
        if (id === "tbxArabicLine2") errors.tbxArabicLine2 = '';
        // if (id === "tbxArabicZipcode") errors.tbxArabicZipcode = '';
        if (id === "tbxArabicPostal") errors.tbxArabicPostal = '';

        //rutvik 29-3-24
        if (id === "tbxFinanceEmail") errors.tbxFinanceEmail = "",

            this.setState({ errors: errors });
        //end        

    }

    private _onDpChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption): void {
        // <summary>Event called on dropdown value change.</summary>
        var tempObj = this.state[event.target.id];
        tempObj.value = item.text;
        this.setState({ ...this.state, [event.target.id]: tempObj });

        //rutvik validate change
        let errors = this.state.errors;
        if (event.target.id === "dpCountry") errors.dpCountry = '';
        if (event.target.id === "dpCurrency") errors.dpCurrency = '';
        if (event.target.id === "dpSector") errors.dpSector = '';
        if (event.target.id === "dpClientType") errors.dpClientType = '';
        if (event.target.id == "dpExcludedFromClientInvoiceReminder") errors.dpExcludedFromClientInvoiceReminder = ''; //rutvik 29-3-24

        //rutvik 13-3-2024
        if (event.target.id === "dpCountry" && item.text !== Constants.SAUDI_ARABIA_COUNTRY) {
            errors.tbxZipcode = '';
            // errors.tbxArabicZipcode = '';
        }

        this.setState({ errors: errors });
        //end        
    }

    private async _NextClick() {
        /// <summary>Next button event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            this.setState({ loading: false }, () => {
                this.props.dataChange("section3Data", this.state);
                this.props.nextStep();
            });
        }
    }

    private async _BackClick() {
        /// <summary>Back button event.</summary>
        this.props.dataChange("section3Data", this.state);
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
        /// <summar>Validate and save data operations.</summary>
        if (this.ValidateSection3() === false) {
            this.setState({ loading: false }); //9-2-23
            return false;
        }
        await this.SaveData();
        return true;
    }
}