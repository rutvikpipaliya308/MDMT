import * as React from 'react';
import { IRequest12Props, IRequest12State } from './IRequest12Props';
import { Web, PermissionKind } from 'sp-pnp-js';
import * as Utils from '../Utils';
import * as Constants from './../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import Section1 from './Section1/Section1';
import Section2 from './Section2/Section2';
import Section3 from './Section3/Section3';
import Attachments from '../common/Attachments/Attachments';

export const listOfEditableFields = [
    { key: "dpCompany", value: strings.CompanyFieldLabel, openable: true },
    { key: "txtSocialName", value: strings.Lbl_SocialName, openable: true },
    { key: "tbxlegalName", value: strings.Lbl_LegalName, openable: true },
    { key: "tbxLine1", value: strings.Lbl_Line1, openable: true },
    { key: "tbxTaxRegistrationNumber", value: strings.Lbl_TaxRegNo, openable: true },
    { key: "tbxBankAccountNo", value: strings.Lbl_BankAccNo, openable: true },
    { key: "tbxSwift", value: strings.Lbl_SwiftBIC, openable: true },
    { key: "tbxBeneficiaryAccountName", value: strings.Lbl_BeneficiaryAccName, openable: true },
    { key: "tbxSocialName", value: strings.Lbl_SocialName, openable: true },
    { key: "tbxCompanyRegistrationNumber", value: strings.Lbl_CompanyRegNo, openable: true },
    { key: "tbxLine2", value: strings.Lbl_Line2, openable: true },
    { key: "tbxZipcode", value: strings.Lbl_ZipCode, openable: true },
    { key: "tbxPostalDistrictCity", value: strings.Lbl_Postal, openable: true },
    { key: "tbxCountryAreaRegion", value: strings.Lbl_CountryArea, openable: true },
    { key: "dpCountry", value: strings.Lbl_Country, openable: true },
    { key: "tbxClientAttentionName", value: strings.Lbl_ClientAttentionName, openable: true },
    { key: "tbxEmail", value: strings.Lbl_EmailAddress, openable: true },
    { key: "tbxPhoneNo", value: strings.Lbl_PhoneNo, openable: true },
    { key: "dpCurrency", value: strings.Lbl_Currency, openable: true },
    { key: "dpSector", value: strings.Lbl_Sector, openable: true },
    { key: "dpClientType", value: strings.Lbl_ClientType, openable: true },
    { key: "dpClientStatus", value: strings.Lbl_ClientStatus, openable: true },
    { key: "dpPaymentTerms", value: strings.Lbl_PaymentTerms, openable: true },
    { key: "dpPaymentMode", value: strings.Lbl_PaymentMode, openable: true },
    { key: "tbxInstructions", value: strings.Lbl_Instructions, openable: true },
    { key: "dpDeliveryMethod", value: strings.Lbl_DeliveryMethod, openable: true },
    { key: "tbxTDSTaxRate", value: strings.Lbl_TDSRate, openable: true },
    { key: "dpDefaultTaxCode", value: strings.Lbl_DefaultTaxCode, openable: true },
    { key: "tbxIBAN", value: strings.Lbl_IBAN, openable: true },
    { key: "tbxSwiftBIC", value: strings.Lbl_SwiftBIC, openable: true },
    { key: "tbxSortCode", value: strings.Lbl_SortCode, openable: true },
    { key: "tbxPaymentTransID", value: strings.Lbl_PaymentTransID, openable: true },
    { key: "dpWithholdingTaxType", value: strings.Lbl_WithHoldingTax, openable: true },
    { key: "dpEmirate", value: strings.Lbl_Emirate, openable: true },
    { key: "dpPlaceOfSupply", value: strings.Lbl_PlaceOfSupply, openable: true },
    { key: "dpGSTRegistrationType", value: strings.Lbl_GSTRegType, openable: true },
    { key: "tbxCIN", value: strings.Lbl_CIN, openable: true },
    { key: "tbxCustomerRemark4", value: strings.Lbl_CustomerRemark4, openable: true },
    { key: "tbxCustomerRemark5", value: strings.Lbl_CustomerRemark5, openable: true },
    { key: "tbxCustomerRemark7", value: strings.Lbl_CustomerRemark7, openable: true },
    { key: "tbxCustomerRemark8", value: strings.Lbl_CustomerRemark8, openable: true },
    { key: "dpClientIDType", value: strings.Lbl_ClientIDType, openable: true },
    { key: "tbxFinanceEmail", value: strings.Lbl_FinanceEmailAddress, openable: true },
    { key: "dpExcludedFromClientInvoiceReminder", value: strings.Lbl_ExcludedFromClientInvoiceReminders, openable: true },
];

export default class Request12 extends React.Component<IRequest12Props, IRequest12State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private isAccessLevelPresentForUser: boolean = true;

    constructor(props: IRequest12Props) {
        super(props);
        this.state = {
            currentStep: 0,
            loading: true,
            itemID: 0,
            dataNotFound: false,
            invalidPermission: false,
            companyNo: '',
            approvalData: null,
            listData: null,
            section1Data: null,
            macAccountId: '',
            requestJson: null,
            clientJson: null,
            itemSubmitted: false,
            isFHDUser: false //r fhd change 20-9
        };
    }

    public async componentWillMount() {
        /// <summary>Get request item for edit form.</summary>
        let hasAddPermission: boolean = await Utils.CheckUserAddPermission(this.objWeb, PermissionKind);

        // Change start - 27/12/2021
        var currentUserId = await Utils.GetCurrentUserId(this.objWeb);
        let currentUPN = await Utils.GetUserUPNFromGraphAPI(this.props.context);

        var tempUserAccessLevel = await this.objWeb.lists.getByTitle(Constants.USERACCESSLEVEL_INTERNALNAME).items
            .filter(`Email eq '${currentUPN.toLowerCase()}'`)
            .getAll();
        let isAccessLevelExists: boolean = tempUserAccessLevel.length > 0 ? true : false;
        var tempAccessLevel: string = "";
        // Change end - 27/12/2021

        //R FHD change 20-9-2023
        // var currentUPN = await Utils.GetUserUPNFromGraphAPI(this.props.context);
        let FHDUser = await this.objWeb.lists.getByTitle(Constants.FHDUSERS).items
            .filter(`Email eq '${currentUPN.toLowerCase()}'`)
            .getAll();

        let isCurrentFHDUser: boolean = FHDUser.length > 0 ? true : false;
        this.setState({ isFHDUser: isCurrentFHDUser });
        //end

        if (hasAddPermission && isAccessLevelExists) {
            var queryParameters = new UrlQueryParameterCollection(window.location.href);

            // Change start - 28/12/2021
            tempAccessLevel = tempUserAccessLevel[0].Title;
            // Change end - 28/12/2021

            if (queryParameters.getValue("itemID")) {
                let id: number = parseInt(queryParameters.getValue("itemID"));
                if (!isNaN(id)) {
                    let viewXML = `<View>
                    ${Constants.REQUESTVIEWXML}
                                <RowLimit>1</RowLimit>
                                <Query>
                                <Where><And><Eq><FieldRef Name="ID"/><Value Type="Number">`+ id.toString() + `</Value></Eq>
                                <Eq><FieldRef Name="RequestType"/><Value Type="Text">`+ Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text + `</Value></Eq>
                                </And></Where></Query></View>`;

                    // let item = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME, viewXML);
                    var tempData = await this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll();
                    let tempArray = [];
                    tempData.filter((tempItem) => {
                        let isAccessLevelPresent: boolean = false;
                        if (tempItem.AccessLevel === tempAccessLevel) {
                            isAccessLevelPresent = true;
                        } else {
                            if (tempItem["AccessLevel"] !== null && tempAccessLevel !== null) {
                                let accessLevelArrayFromItem = [];
                                let accessLevelArrayFromUser = [];
                                accessLevelArrayFromItem = tempItem["AccessLevel"].split(',');
                                accessLevelArrayFromUser = tempAccessLevel.split(',');

                                accessLevelArrayFromItem.forEach(element => {
                                    accessLevelArrayFromUser.forEach(ele => {
                                        if (ele === element) {
                                            isAccessLevelPresent = true;
                                        }
                                    });
                                });
                            }
                        }
                        if (tempItem.ID == id.toString() && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text && isAccessLevelPresent) {
                            tempArray.push(tempItem);
                        }
                    });

                    let item = tempArray[0];
                    if (item !== null && item !== undefined) {
                        let hasItemEditPermission: boolean = await Utils.CheckUserItemEditPermission(this.serverRelativeURL, this.objWeb, PermissionKind, id);
                        if (hasItemEditPermission) {
                            this.setState({ itemID: id, listData: item });
                            if (item.Submitted) {
                                this.getEditableFields(item);
                                this.setState({ itemSubmitted: item.Submitted });
                            }
                        }
                        else {
                            this.setState({ invalidPermission: true });
                        }
                    }
                    else {
                        this.setState({ dataNotFound: true });
                    }
                }
            }
        } else {
            if (hasAddPermission === true && isAccessLevelExists === false) {
                this.isAccessLevelPresentForUser = false;
            }
            this.setState({ invalidPermission: true });
        }
        this.setState({ loading: false, currentStep: 1, accessLevel: tempAccessLevel });
    }

    private async getEditableFields(item) {
        let viewXML = ""
        let selectFields = `<ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="Title"></FieldRef>
            <FieldRef Name="RequestType"></FieldRef>
            <FieldRef Name="WorkflowType"></FieldRef>
            <FieldRef Name="OpenLevel1"></FieldRef>
            <FieldRef Name="OpenLevel2"></FieldRef>
            <FieldRef Name="OpenLevel3"></FieldRef>
            </ViewFields>`;

        var levelOpenQuery = "";
        if (item.Stage1Status == "Pending") {
            levelOpenQuery = `<Eq><FieldRef Name="OpenLevel1"/><Value Type="Integer">1</Value></Eq>`;
        }
        else if (item.Stage2Status == "Pending") {
            levelOpenQuery = `<Eq><FieldRef Name="OpenLevel2"/><Value Type="Integer">1</Value></Eq>`;
        }
        else if (item.Stage3Status == "Pending") {
            levelOpenQuery = `<Eq><FieldRef Name="OpenLevel3"/><Value Type="Integer">1</Value></Eq>`;
        }

        var queryString = `<Query><Where>
            <And>`
            + levelOpenQuery +
            `<And>
              <Eq><FieldRef Name="RequestType"/><Value Type="Text">` + item.RequestType + `</Value></Eq>
              <Eq><FieldRef Name="WorkflowType"/><Value Type="Text">` + item.WorkflowType + `</Value></Eq>
            </And>
            </And>    
          </Where></Query>`;

        viewXML = `<View>` + selectFields + `<RowLimit>4999</RowLimit>` + queryString + `</View>`;

        let tempItems: any;
        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.MACONOMYEDITABLEFIELDSINTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText').then((items: any) => {
            tempItems = items;
        });
        tempItems.map((listItem) => {
            let index;
            listOfEditableFields.some(function (entry, i) {
                if (entry.value == listItem.Title) {
                    index = i + 1;
                    return true;
                }
            });
            if (index) {
                listOfEditableFields[index - 1].openable = false;
            }
        });
    }

    public render(): React.ReactElement<IRequest12Props> {
        return (
            <div className="wrapper">
                {/* <!-- Main Content --> */}
                <main className="main-content" style={{ position: "relative" }}>
                    <div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
                        <ClipLoader
                            css={Constants.LOADING_CSS}
                            size={50}
                            color={Constants.LOADER_COLOR}
                            loading={this.state.loading}
                        />
                    </div>
                    <div className="container-fluid" >
                        {/* <!-- main-title================= --> */}

                        <h1 className="main-title mb-4">
                            <img className="icon" src={require('../../images/request.svg')} alt="Request Travel" />
                            {strings.RequestType[5]}
                        </h1>
                    </div>
                    {/* <!-- main-title End================= --> */}
                    {this.state.invalidPermission ? <div className="card-primary not-found-block">
                        <img className="not-found" src={require('../../images/warning.png')} alt="" />
                        <h1>{this.isAccessLevelPresentForUser === false ? strings.invalidAccessLevel : strings.InvalidPermissionMsg}</h1>
                    </div> :
                        this.state.dataNotFound ?
                            <div className="card-primary not-found-block">
                                <img className="not-found" src={require('../../images/not-found.png')} alt="" />
                                <h1>{strings.Datanotfound}</h1>
                            </div>
                            :
                            <React.Fragment>
                                <div className="container-xl">
                                    <ul className="row no-gutters process-block mb-5">
                                        {Constants.COMPANYCLIENTUPDATE_SECTIONS.map((item, i) => (
                                            <li key={i} className={i === (this.state.currentStep - 1) ? Constants.CLSCOLACTIVE : this.state.currentStep > i ? Constants.CLSCOLSAVE : Constants.CLSCOL}>
                                                <span>{item.key}</span>
                                                <p>{item.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* shraddha task 17 */}
                                <div className="container-xl" >
                                    <p style={{ textAlign: "center", fontSize: 15 }}>
                                        {strings.MessageText1} <a href={strings.TraningMaterialLink} target="_blank">{strings.ClickHere}</a> {strings.MessageText2}
                                    </p>
                                </div>
                                {this.RenderSections(this.state.currentStep)}
                            </React.Fragment>
                    }
                </main>
                {/* <!-- End Main Content --> */}
            </div>
        );
    }

    private RenderSections(step: number) {
        /// <summary>Render section for request 12.</summary>
        var queryParameters = new UrlQueryParameterCollection(window.location.href);
        if (queryParameters.getValue("itemID")) {
            let id: number = parseInt(queryParameters.getValue("itemID"));
            if (!isNaN(id)) {
                if (this.state.listData === null) {
                    return '';
                }
            }
        }
        switch (step) {
            case 1:
                return <Section1 {...this.props} itemID={this.state.itemID} listData={this.state.listData} isFHDUser={this.state.isFHDUser} data={this.state.section1Data} dataChange={this.dataChange.bind(this)} nextStep={this.NextStep.bind(this)} itemSubmitted={this.state.itemSubmitted} accessLevel={this.state.accessLevel} />;
            case 2:
                return <Section2 {...this.props} approvalData={this.state.approvalData} itemID={this.state.itemID} isFHDUser={this.state.isFHDUser} listData={this.state.listData} data={this.state.section2Data} dataChange={this.dataChange.bind(this)} selectedClient={this.state.macAccountId} nextStep={this.NextStep.bind(this)} backStep={this.BackStep.bind(this)} selectedClientData={this.state.section1Data.updateRequestDataArray} listOfEditableFields={listOfEditableFields} itemSubmitted={this.state.itemSubmitted} />;
            case 3:
                return <Section3 {...this.props} section2Data={this.state.section2Data} approvalData={this.state.approvalData} isFHDUser={this.state.isFHDUser} itemID={this.state.itemID} listData={this.state.listData} data={this.state.section3Data} selectedClient={this.state.macAccountId} dataChange={this.dataChange.bind(this)} nextStep={this.NextStep.bind(this)} backStep={this.BackStep.bind(this)} listOfEditableFields={listOfEditableFields} itemSubmitted={this.state.itemSubmitted} />;
            case 4:
                return <Attachments {...this.props} requestJson={this.state.requestJson} clientJson={this.state.clientJson} itemID={this.state.itemID} listData={this.state.listData} approvalData={this.state.approvalData} backStep={this.BackStep.bind(this)} itemSubmitted={this.state.itemSubmitted} accessLevel={this.state.accessLevel} />;
        }
    }

    private dataChange(id: string, value: any) {
        /// <summary>Method to be called to set state in request7.</summary>
        this.setState({ ...this.state, [id]: value });
    }

    private NextStep() {
        /// <summary>Calculate and set next section.</summary>
        let step = this.state.currentStep;
        this.setState({
            currentStep: step + 1,
        });
    }

    private BackStep() {
        /// <summary>Calculate and set back section.</summary>
        let step = this.state.currentStep;
        this.setState({
            currentStep: step - 1,
        });
    }
}