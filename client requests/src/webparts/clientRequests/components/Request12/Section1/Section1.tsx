import * as React from 'react';
import { ISection1Props, ISection1State, ICompanyClientDetails } from './ISection1Props';
import * as strings from 'ClientRequestsWebPartStrings';
import { Web } from 'sp-pnp-js';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import ClipLoader from "react-spinners/ClipLoader";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px' },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
    { name: strings.CompanyFieldLabel, selector: 'Company', sortable: true, wrap: true, width: '100px' },
    { name: strings.Grid_TypeHeader, selector: 'CustomerType', sortable: true, wrap: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true, wrap: true },
    { name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true, width: '100px' },
    { name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true, minWidth: '150px' }
];

export default class Section1 extends React.Component<ISection1Props, ISection1State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private companySectionRef: any;

    constructor(props: ISection1Props) {
        super(props);

        this.state = {
            dpCompany: '',
            loading: true,
            gridLoading: false,
            rbtnWorkflowType: strings.WorkflowType[0],
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            companyClientArray: [],
            selectedCompanyClient: '',
            errors: {
                selectedClient: '',
                requestExists: '',
                companyClientsNotExists: '',
                clientExists: '',
                companyExists: ''
            },
            selectedClientSocialName: '',
            updateRequestDataArray: '',
            updateRequestDataID: 0
        };
        this.companySectionRef = React.createRef<CompanySection>();
    }

    public async componentWillMount() {
        /// <summary>Bind data.</summary>
        if (this.props.data === null || this.props.data === undefined) {
            this.setState({
                requestor: await Utils.GetCurrentUserId(this.objWeb),
                office: await Utils.GetCurrentUserOffice(this.objWeb, this.props["context"])
            });
        }

        //rutvik change for requestor id change
        if (this.props.listData != null && this.props.listData != undefined) {
            let currentUSerID = await Utils.GetCurrentUserId(this.objWeb);
            if (this.props.listData.Stage1ApproverId == currentUSerID || this.props.listData.Stage1_sub_approverId == currentUSerID || this.props.listData.stage2_approverId == currentUSerID || this.props.listData.stage2_sub_approverId == currentUSerID) {
                this.setState({
                    requestor: this.props.listData.RequestorId
                });
            }
        }

        if (this.props.listData !== null) {
            this.setState({
                dpCompany: this.props.listData["Company"],
                rbtnWorkflowType: this.props.listData["WorkflowType"],
                folderPath: this.props.listData["FolderPath"],
                selectedCompanyClient: this.props.listData["MaconomyAccountID"],

            });
            await this.GetUpdateRequestData(this.props.listData["MaconomyAccountID"]);
            await this.GetUpdateRequestDataID();
        }

        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });
        }

        if (this.props.itemID === 0) {
            await this.BindGridData();
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
        if (this.props.data === null || this.props.data === undefined) {
            this.setState({ loading: false });
        }
    }

    public render(): React.ReactElement<ISection1Props> {
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
                    {/* <!-- card-header ======================== --> */}
                    <div className="card-header text-center">
                        <h3 className="border-0 pl-0">{strings.Sec1Question}
                        </h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        <CompanySection isDisable={this.props.itemID > 0 ? true : false} ref={this.companySectionRef} {...this.props} setLoader={this.SetLoader.bind(this)} dpCompany={this.state.dpCompany} rbtnWorkflowType={this.state.rbtnWorkflowType} isWorkflowTypeNeeded={false} setSelectedCompany={this.SetSelectedCompany.bind(this)} requestType={strings.RequestType[5]} accessLevel={this.props.accessLevel} />
                        {this.props.itemID === 0 ?
                            <React.Fragment>
                                <div className="card-header text-center">
                                    <h3 className="border-0 pl-0">{strings.Lbl_SelectCompanyClientGrid}
                                    </h3>
                                </div>
                                {/* Display Client details in Data Table */}
                                <div className="grid-table" style={{ position: "relative" }}>
                                    <div className="loading-css" style={{ display: this.state.gridLoading ? "block" : "none" }}>
                                        <ClipLoader
                                            css={Constants.LOADING_CSS}
                                            size={50}
                                            color={Constants.LOADER_COLOR}
                                            loading={this.state.gridLoading}
                                        />
                                    </div>

                                    <DataTableExtensions
                                        data={this.state.companyClientArray}
                                        columns={columns}
                                        print={false}
                                        export={false}
                                        filterHidden={false}
                                    >
                                        <DataTable
                                            className="table"
                                            data={this.state.companyClientArray}
                                            columns={columns}
                                            responsive={true}
                                            pagination={true}
                                            paginationComponentOptions={{ noRowsPerPage: true }}
                                            paginationPerPage={10}
                                            noHeader={true}
                                            persistTableHead={true}
                                            noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordsAvailable}</label></div>}
                                            sortIcon={<Icon iconName="SortDown" />}
                                            onChangePage={this.SelectRadio.bind(this)}
                                            onSort={this.SelectRadio.bind(this)}
                                            noContextMenu={true}
                                        />
                                    </DataTableExtensions>
                                </div>
                            </React.Fragment> : null}
                        {this.state.errors.selectedClient.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.selectedClient} </Label>
                        </span> : null}

                        {/* Show current selectd client MaconomyAccountID and Social Name. */}
                        {this.state.selectedCompanyClient.length > 0 && this.state.errors.clientExists.length === 0 ?
                            <div className="alert alert-warning mt-3" role="alert">
                                <Label className="text-left">{strings.YouHaveSelectedText} <strong>{this.state.selectedCompanyClient}</strong> - {this.state.selectedClientSocialName}</Label>
                            </div> : null}

                        {/* Show error message for request is already exists or not */}
                        {this.state.errors.requestExists.length > 0 ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >
                                <Label className="errormessage requestExistsErrorCls">{strings.ClientRequest_RunningMode[0] + " "}</Label>
                                {this.generateRequestExistsHTML(this.state.errors.requestExists)}
                                <Label className="errormessage requestExistsErrorCls">{" " + strings.ClientRequest_RunningMode[1]}</Label>
                            </Label>
                        </div> : null}

                        {/* Show error message for company is  exists or not */}
                        {this.state.errors.companyExists.length > 0 ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.companyExists} </Label>
                        </div> : null}

                        {this.state.errors.companyClientsNotExists.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.companyClientsNotExists} </Label>
                        </span> : null}

                        {this.state.errors.clientExists.length > 0 ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.clientExists} </Label>
                        </div> : null}
                    </div>
                    {/* <!-- card-footer========================= --> */}
                    <CardFooter {...this.props} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div>
            </div>
        );
    }

    private generateRequestExistsHTML(requestExistsError) {
        let textAfterRequestID = requestExistsError.substr(requestExistsError.indexOf("ID:") + 4);
        let requestID = textAfterRequestID.split(" ")[0];
        let ID = textAfterRequestID.split(" ")[1];
        let redirectionURL = this.props.context.pageContext.web.absoluteUrl + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=";
        return (
            <a className="errormessage requestExistsErrorCls" style={{ textDecoration: "underline" }} target="_blank" href={redirectionURL + ID.toString()}>{requestID}</a>
        )
    }

    private SetLoader(status: boolean) {
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    }

    private async BindGridData() {
        /// <summary>Fetch data for datatable.</summary>
        try {
            let error = this.state.errors;
            this.setState({ gridLoading: true });
            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="Company"></FieldRef>
                <FieldRef Name="CustomerType"></FieldRef>
                <FieldRef Name="Title"></FieldRef>
                <FieldRef Name="LegalName"></FieldRef>
                <FieldRef Name="Line1"></FieldRef>
                <FieldRef Name="Line2"></FieldRef>
                <FieldRef Name="Zipcode"></FieldRef>
                <FieldRef Name="Postal_District_City"></FieldRef>
                <FieldRef Name="Country_Area_Region"></FieldRef>
                <FieldRef Name="Country"></FieldRef>
                <FieldRef Name="Currency"></FieldRef>
                <FieldRef Name="TaxRegistrationNo"></FieldRef>
                <FieldRef Name="ClientAttentionName"></FieldRef>
                <FieldRef Name="Email"></FieldRef>
                <FieldRef Name="PhoneNo"></FieldRef>
                <FieldRef Name="DefaultTaxCode"></FieldRef>
                <FieldRef Name="PaymentTerms"></FieldRef>
                <FieldRef Name="WithholdingTaxType"></FieldRef>
                <FieldRef Name="Emirate"></FieldRef>
				<FieldRef Name="PlaceOfSupply"></FieldRef>
				<FieldRef Name="GSTRegistrationType"></FieldRef>
				<FieldRef Name="CIN"></FieldRef>
                <FieldRef Name="TDSTaxRate"></FieldRef>
                <FieldRef Name='Sector'></FieldRef>
                <FieldRef Name='ClientStatus'></FieldRef>
                <FieldRef Name='ClientType'></FieldRef>
                <FieldRef Name='CompanyRegistrationNo'></FieldRef>
                <FieldRef Name="CustomerRemark4"></FieldRef>
                <FieldRef Name="CustomerRemark5"></FieldRef>
                <FieldRef Name="CustomerRemark8"></FieldRef>
                <FieldRef Name="CustomerRemark7"></FieldRef>
                <FieldRef Name="ClientIDType"></FieldRef>
                <FieldRef Name="ClientLead"></FieldRef>
                <FieldRef Name="CommercialManager"></FieldRef>
                <FieldRef Name="Biller"></FieldRef>
                <FieldRef Name="ProjectAnalyst"></FieldRef>
                <FieldRef Name="ResourceManager"></FieldRef>
            </ViewFields>
                <Query>
                    <Where>
                        <Eq><FieldRef Name="Company" /><Value Type="Text">`+ this.state.dpCompany.split('-')[0].trim() + `</Value></Eq>
                    </Where>
                    <OrderBy><FieldRef Name='ID' Ascending='True'></FieldRef></OrderBy>
                </Query>
            </View>`;

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.COMPANYCUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempItems = await this.objWeb.lists.getByTitle(Constants.COMPANYCUSTOMERCARD_INTERNALNAME).items.select().getAll();
            let tempDataArray = [];
            tempItems.filter((item) => {
                let isAccessLevelPresent: boolean = false;
                if (item.AccessLevel === this.props.accessLevel) {
                    isAccessLevelPresent = true;
                } else {
                    if (item["AccessLevel"] !== null && this.props.accessLevel !== null) {
                        let accessLevelArrayFromItem = [];
                        let accessLevelArrayFromUser = [];
                        accessLevelArrayFromItem = item["AccessLevel"].split(',');
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
                if (item.Company == this.state.dpCompany.split('-')[0].trim() && isAccessLevelPresent) {
                    tempDataArray.push(item);
                }
            });

            var data = tempDataArray;
            if (data !== null) {
                let tempArray = [];

                data.forEach(element => {
                    tempArray.push({
                        Action: <input type="radio" checked={this.state.selectedCompanyClient === element['MaconomyAccountID']} name="client" value={element["MaconomyAccountID"]} onClick={this.SelectCompanyClient.bind(this, element['MaconomyAccountID'], element['Title'])}></input>,
                        Link: <a onClick={(e) => { e.preventDefault(); window.open(this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=ccc", '_blank') }} href=''>{strings.Grid_LinkHeader}</a>,
                        MaconomyAccountID: element["MaconomyAccountID"],
                        SocialName: element["Title"],
                        LegalName: element["LegalName"],
                        Zipcode: element["Zipcode"],
                        Line1: element["Line1"],
                        Line2: element["Line2"],
                        Postal_District_City: element["Postal_District_City"],
                        Country: element["Country"],
                        Currency: element["Currency"],
                        TaxRegistrationNo: element["TaxRegistrationNo"],
                        Company: element["Company"],
                        CustomerType: element["CustomerType"],
                        Id: element["ID"],
                        ClientAttentionName: element["ClientAttentionName"],
                        Email: element["Email"],
                        PhoneNo: element["PhoneNo"],
                        DefaultTaxCode: element["DefaultTaxCode"],
                        PaymentTerms: element["PaymentTerms"],
                        WithholdingTaxType: element["WithholdingTaxType"],
                        Emirate: element["Emirate"],
                        PlaceOfSupply: element["PlaceOfSupply"],
                        GSTRegistrationType: element["GSTRegistrationType"],
                        CIN: element["CIN"],
                        TDSTaxRate: element["TDSTaxRate"],
                        CompanyRegistrationNo: element["CompanyRegistrationNo"],
                        ClientStatus: element["ClientStatus"],
                        ClientType: element["ClientType"],
                        Sector: element["Sector"],
                        Country_Area_Region: element["Country_Area_Region"],
                        //rutvik 12-7 24
                        CustomerRemark4: element["CustomerRemark4"],
                        CustomerRemark5: element["CustomerRemark5"],
                        CustomerRemark8: element["CustomerRemark8"],
                        CustomerRemark7: element["CustomerRemark7"],
                        ClientIDType: element["ClientIDType"],
                        //Rutvik emp dropdown change 3-3-23
                        ClientLead: element["ClientLead"],
                        CommercialManager: element["CommercialManager"],
                        Biller: element["Biller"],
                        ProjectAnalyst: element["ProjectAnalyst"],
                        ResourceManager: element["ResourceManager"],
                        //end
                        FinanceEmail: element["FinanceEmail"], //rutvik 29-3-24
                        ExcludeFromClientInvoiceReminder: element["ExcludeFromClientInvoiceReminder"]
                    });
                });

                this.setState({
                    companyClientArray: cloneDeep(tempArray)
                });

                if (this.state.dpCompany !== "") {
                    if (this.state.companyClientArray.length > 0) {
                        error.companyClientsNotExists = '';
                    } else {
                        error.companyClientsNotExists = strings.CompanyClient_NotExists;
                    }
                }
            }
            this.setState({ gridLoading: false, errors: error });
        } catch (error) {
            console.log("Bind Grid Data ---> ", error);
        }
    }

    private async GetUpdateRequestData(maconomyNumber: string) {
        // Get data from updateRequestData list
        let company = this.state.dpCompany.split('-')[0].trim();
        let viewXML = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="MaconomyAccountID"></FieldRef>
            <FieldRef Name="Company"></FieldRef>
            <FieldRef Name="Title"></FieldRef>
            <FieldRef Name="LegalName"></FieldRef>
            <FieldRef Name="ClientAttentionName"></FieldRef>
            <FieldRef Name="Email"></FieldRef>
            <FieldRef Name="PhoneNo"></FieldRef>
            <FieldRef Name="DefaultTaxCode"></FieldRef>
            <FieldRef Name="PaymentTerms"></FieldRef>
            <FieldRef Name="WithholdingTaxType"></FieldRef>
            <FieldRef Name="Emirate"></FieldRef>
			<FieldRef Name="PlaceOfSupply"></FieldRef>
			<FieldRef Name="GSTRegistrationType"></FieldRef>
			<FieldRef Name="CIN"></FieldRef>
            <FieldRef Name="TDSTaxRate"></FieldRef>
            <FieldRef Name="Line1"></FieldRef>
            <FieldRef Name="Line2"></FieldRef>
            <FieldRef Name="Zipcode"></FieldRef>
            <FieldRef Name="Postal_District_City"></FieldRef>
            <FieldRef Name="Country_Area_Region"></FieldRef>
            <FieldRef Name="Country"></FieldRef>
            <FieldRef Name="Currency"></FieldRef>
            <FieldRef Name="CompanyRegistrationNo"></FieldRef>
            <FieldRef Name="Sector"></FieldRef>
            <FieldRef Name="ClientStatus"></FieldRef>
            <FieldRef Name="ClientType"></FieldRef>
            <FieldRef Name="TaxRegistrationNo"></FieldRef>
            <FieldRef Name="CustomerRemark4"></FieldRef>
            <FieldRef Name="CustomerRemark5"></FieldRef>
            <FieldRef Name="CustomerRemark8"></FieldRef>
            <FieldRef Name="CustomerRemark7"></FieldRef>
            <FieldRef Name="ClientIDType"></FieldRef>
            <FieldRef Name="ClientLead"></FieldRef>
            <FieldRef Name="CommercialManager"></FieldRef>
            <FieldRef Name="Biller"></FieldRef>
            <FieldRef Name="ProjectAnalyst"></FieldRef>
            <FieldRef Name="ResourceManager"></FieldRef>
		</ViewFields>
		<RowLimit>1</RowLimit>
		<Query>
            <Where>
                <And>
                    <Eq><FieldRef Name="MaconomyAccountID"/><Value Type="Text">`+ maconomyNumber + `</Value></Eq>
                    <Eq><FieldRef Name="Company"/><Value Type="Text">`+ company + `</Value></Eq>
                </And>
			</Where>
        </Query>
        </View>`;

        // let data = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.COMPANYCUSTOMERCARD_INTERNALNAME, viewXML);
        var tempItems = await this.objWeb.lists.getByTitle(Constants.COMPANYCUSTOMERCARD_INTERNALNAME).items.select().getAll();
        let tempDataArray = [];
        tempItems.filter((item) => {
            let isAccessLevelPresent: boolean = false;
            if (item.AccessLevel === this.props.accessLevel) {
                isAccessLevelPresent = true;
            } else {
                if (item["AccessLevel"] !== null && this.props.accessLevel !== null) {
                    let accessLevelArrayFromItem = [];
                    let accessLevelArrayFromUser = [];
                    accessLevelArrayFromItem = item["AccessLevel"].split(',');
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
            if (item.MaconomyAccountID == maconomyNumber && item.Company == company && isAccessLevelPresent) {
                tempDataArray.push(item);
            }
        });

        var data = tempDataArray[0];
        if (data !== null && data !== undefined) {
            data.PaymentTerms = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.PaymentTerms);
            //rutvik test changes
            //data.DefaultTaxCode = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.DefaultTaxCode);
            //data.ClientIDType = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME, data.ClientIDType);

            this.setState({
                selectedCompanyClient: data.MaconomyAccountID,
                selectedClientSocialName: data.Title,
                updateRequestDataArray: {
                    MaconomyAccountID: data.MaconomyAccountID,
                    Title: data.Title,
                    Company: this.state.dpCompany,
                    LegalName: data.LegalName,
                    ClientAttentionName: data.ClientAttentionName,
                    Email: data.Email,
                    PhoneNo: data.PhoneNo,
                    DefaultTaxCode: data.DefaultTaxCode,
                    PaymentTerms: data.PaymentTerms,
                    WithholdingTaxType: data.WithholdingTaxType,
                    Emirate: data.Emirate,
                    PlaceofSupply: data.PlaceOfSupply,
                    GSTRegistrationType: data.GSTRegistrationType,
                    CIN: data.CIN,
                    TDSTaxRate: data.TDSTaxRate,
                    RequestID: this.props.itemID.toString(),
                    Line1: data.Line1,
                    Line2: data.Line2,
                    Zipcode: data.Zipcode,
                    Postal_District_City: data.Postal_District_City,
                    Country_Area_Region: data.Country_Area_Region,
                    Country: data.Country,
                    Currency: data.Currency,
                    CompanyRegistrationNo: data.CompanyRegistrationNo,
                    Sector: data.Sector,
                    ClientStatus: data.ClientStatus,
                    ClientType: data.ClientType,
                    TaxRegistrationNo: data.TaxRegistrationNo,
                    AccessLevel: data.AccessLevel,
                    //rutvik 12-7 24
                    CustomerRemark4: data.CustomerRemark4,
                    CustomerRemark5: data.CustomerRemark5,
                    CustomerRemark8: data.CustomerRemark8,
                    CustomerRemark7: data.CustomerRemark7,
                    ClientIDType: data.ClientIDType,
                    //Rutvik emp dropdown change 3-3-23
                    ClientLead: data.ClientLead,
                    CommercialManager: data.CommercialManager,
                    Biller: data.Biller,
                    ProjectAnalyst: data.ProjectAnalyst,
                    ResourceManager: data.ResourceManager,
                    //end
                    FinanceEmail: data.FinanceEmail, //rutvik 29-3-24
                    ExcludeFromClientInvoiceReminder: data.ExcludeFromClientInvoiceReminder
                }
            });
        } else {
            let errors = this.state.errors;
            errors.clientExists = strings.NoMaconomyCompanyClient_Msg[0] + this.state.selectedCompanyClient + strings.NoMaconomyCompanyClient_Msg[1];
            this.setState({ errors: errors });
        }
    }

    private async GetUpdateRequestDataID() {
        // Get UpdateRequestData ID request.
        let viewXML = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="RequestID"></FieldRef>
        </ViewFields>
        <RowLimit>1</RowLimit>
        <Query>
            <Where>
                <Eq><FieldRef Name="RequestID"/><Value Type="Text">`+ this.props.itemID + `</Value></Eq>
            </Where>
        </Query>
        </View>`;

        // let data = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME, viewXML);
        var tempData = await this.objWeb.lists.getByTitle(Constants.UPDATEREQUESTDATA_INTERNALANAME).items.select().getAll();
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
            if (tempItem.RequestID == this.props.itemID && isAccessLevelPresent) {
                tempArray.push(tempItem);
            }
        });

        let data = tempArray[0];

        if (data !== null && data !== undefined) {
            this.setState({
                updateRequestDataID: data.ID
            });
        }
    }

    private SelectCompanyClient(selectedClient: string, selectedSocialName: string): void {
        /// <summary>Set MaconomyAccountID when select client from list.</summary>

        this.setState({
            ...this.state,
            selectedClientSocialName: selectedSocialName,
            selectedCompanyClient: selectedClient
        }, () => {
            this.SelectRadio();
        });

        //rutvik validate change
        let errors = this.state.errors;
        errors.selectedClient = '';
        this.setState({ errors: errors });
        //end

    }

    private SelectRadio(): void {
        // <summary>Event called on page change.</summary>
        let tempArray = this.state.companyClientArray;
        for (let client = 0; client < tempArray.length; client++) {
            if (tempArray[client].MaconomyAccountID === this.state.selectedCompanyClient) {
                tempArray[client].Action = <input type="radio" checked={true} name="client" value={tempArray[client].MaconomyAccountID} onClick={this.SelectCompanyClient.bind(this, tempArray[client].MaconomyAccountID, tempArray[client].SocialName)} ></input>;
            } else {
                tempArray[client].Action = <input type="radio" checked={false} name="client" value={tempArray[client].MaconomyAccountID} onClick={this.SelectCompanyClient.bind(this, tempArray[client].MaconomyAccountID, tempArray[client].SocialName)} ></input>;
            }
        }
        this.setState({
            companyClientArray: cloneDeep(tempArray)
        });
    }

    private async SetSelectedCompany(value: string) {
        // <summary>Set selected company value</summary> 
        await this.setState({ dpCompany: value, selectedCompanyClient: '' });
        await this.BindGridData();
    }

    private ValidateSection(data: any): boolean {
        /// <summary>Validate client selected from list or not.</summary>
        let errors = this.state.errors;

        errors.selectedClient = (this.state.selectedCompanyClient == '') ? strings.SelectCompanyClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];

        }
        this.setState({ errors: errors });
        let valid = errors.selectedClient.length > 0 || errors.companyExists.length > 0 ? false : true;
        return valid;
    }

    private async SaveData(data: any) {
        /// <summary>Save data in list.</summary>
        try {
            // change start - 25-1-22
            this.setState({ loading: true });
            var accessLevel;
            var companyNumber = [];
            await this.objWeb.getList(this.serverRelativeURL + Constants.ACCESSLEVELRANGE).items.getAll().then(async (record) => {
                if (record != null) {
                    record.filter((tempItem) => {
                        if (tempItem.AccessLevel != null && tempItem.LowerRange != null && tempItem.UpperRange != null) {
                            companyNumber = data.dpCompany.split('-');
                            var number = parseInt(companyNumber[0].trim());
                            if (number >= tempItem.LowerRange && number <= tempItem.UpperRange) {
                                accessLevel = tempItem.AccessLevel;
                            }
                        }
                    })
                }
            })
            //change end - 25-1-22
            var tempData = {
                Company: data.dpCompany,
                RequestType: Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor, //R 29-3-23 exception vendor
                Office: this.state.office,
                WorkflowType: strings.WorkflowType[0],
                RequestID: Utils.GenerateRequestID(this.state.itemID),
                Status: strings.Status[0],
                MaconomyAccountID: this.state.selectedCompanyClient.toString(),
                Title: this.state.selectedClientSocialName,
                AccessLevel: accessLevel,
            };

            //rutvik task 9
            var queryParameters = new UrlQueryParameterCollection(window.location.href);
            if (queryParameters.getValue("itemID")) {
                let id: number = parseInt(queryParameters.getValue("itemID"));
                let currentUSerID = await Utils.GetCurrentUserId(this.objWeb);
                if ((this.props.listData.Stage1ApproverId == currentUSerID || this.props.listData.Stage1_sub_approverId == currentUSerID) && this.props.listData.RequestorId !== currentUSerID) {
                    let recordSaved = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.filter(`ID eq ${this.props.listData.ID}`).getAll();
                    if (recordSaved.length === 0) {
                        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.add(this.props.listData);
                    }
                }
            }

            if (this.state.itemID > 0) {

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update(tempData).then(async (res) => {
                    if (this.props.data === null || this.props.data === undefined) {
                        if (!queryParameters.getValue("itemID")) {
                            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.getById(this.state.updateRequestDataID).update(this.state.updateRequestDataArray).then((response) => {
                            });
                        }
                    }
                });
            } else {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(async (res) => {
                    this.setState({
                        itemID: res.data.Id
                    });

                    let selectedClientData = this.state.companyClientArray.filter((client) => { return client.MaconomyAccountID === this.state.selectedCompanyClient; })[0];
                    let tempUpdateRequestData = {
                        MaconomyAccountID: this.state.selectedCompanyClient,
                        Title: selectedClientData.SocialName,
                        LegalName: selectedClientData.LegalName,
                        Company: data.dpCompany,
                        ClientAttentionName: selectedClientData.ClientAttentionName,
                        Email: selectedClientData.Email,
                        PhoneNo: selectedClientData.PhoneNo,
                        //rutvik test change
                        //DefaultTaxCode: await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.DefaultTaxCode),
                        DefaultTaxCode: selectedClientData.DefaultTaxCode,
                        PaymentTerms: await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.PaymentTerms),
                        WithholdingTaxType: selectedClientData.WithholdingTaxType,
                        Emirate: selectedClientData.Emirate,
                        PlaceofSupply: selectedClientData.PlaceOfSupply,
                        GSTRegistrationType: selectedClientData.GSTRegistrationType,
                        CIN: selectedClientData.CIN,
                        TDSTaxRate: selectedClientData.TDSTaxRate,
                        RequestID: this.state.itemID.toString(),
                        Line1: selectedClientData.Line1,
                        Line2: selectedClientData.Line2,
                        Zipcode: selectedClientData.Zipcode,
                        Postal_District_City: selectedClientData.Postal_District_City,
                        Country_Area_Region: selectedClientData.Country_Area_Region,
                        Country: selectedClientData.Country,
                        Currency: selectedClientData.Currency,
                        CompanyRegistrationNo: selectedClientData.CompanyRegistrationNo,
                        Sector: selectedClientData.Sector,
                        ClientStatus: selectedClientData.ClientStatus,
                        ClientType: selectedClientData.ClientType,
                        TaxRegistrationNo: selectedClientData.TaxRegistrationNo,
                        AccessLevel: accessLevel,
                        CustomerRemark4: selectedClientData.CustomerRemark4,
                        CustomerRemark5: selectedClientData.CustomerRemark5,
                        CustomerRemark8: selectedClientData.CustomerRemark8,
                        CustomerRemark7: selectedClientData.CustomerRemark7,
                        ClientIDType: selectedClientData.ClientIDType,
                        //Rutvik emp dropdown change 3-3-23
                        ClientLead: selectedClientData.ClientLead,
                        CommercialManager: selectedClientData.CommercialManager,
                        Biller: selectedClientData.Biller,
                        ProjectAnalyst: selectedClientData.ProjectAnalyst,
                        ResourceManager: selectedClientData.ResourceManager,
                        //end
                        FinanceEmail: selectedClientData.FinanceEmail, //rutvik 29-3-24
                        ExcludeFromClientInvoiceReminder: selectedClientData.ExcludeFromClientInvoiceReminder
                    };
                    this.setState({ updateRequestDataArray: tempUpdateRequestData });

                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.add(tempUpdateRequestData).then(async (response) => {
                        this.setState({ updateRequestDataID: response.data.Id });
                    });
                });

                let viewXML = `<View>
                <ViewFields>
                    <FieldRef Name="ID"></FieldRef>
                    <FieldRef Name="FolderPath"></FieldRef>
                </ViewFields>
                <RowLimit>1</RowLimit>
                <Query>
                    <Where>
                        <And>
                            <Neq><FieldRef Name="ID"></FieldRef><Value Type="Number">`+ this.state.itemID + `</Value></Neq>
                            <And>
                                <Eq><FieldRef Name="MaconomyAccountID"></FieldRef><Value Type="Text">`+ this.state.selectedCompanyClient + `</Value></Eq>
                                <And>
                                    <Eq><FieldRef Name="Status"></FieldRef><Value Type="Text">`+ strings.Status[1] + `</Value></Eq>
                                    <And>
                                        <Eq><FieldRef Name="Company"></FieldRef><Value Type="Text">`+ data.dpCompany + `</Value></Eq>
                                        <In>
                                            <FieldRef Name="RequestType" />
                                            <Values>
                                                <Value Type='Choice'>`+ Constants.REQUESTTYPE_OPTIONS[5].text + `</Value>
                                            </Values>
                                        </In>
                                    </And>
                                </And>
                            </And>
                        </And>
                    </Where>
                    <OrderBy>
                        <FieldRef Name="ID" Ascending="False" />
                    </OrderBy>
                </Query>
                </View>`;

                let newFolderPath: string = await Utils.CreateAttachmentFolder(this.objWeb, this.serverRelativeURL, this.state.itemID);
                let oldFolderPath: string;

                // let requestData = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME, viewXML);
                var tempData2 = await this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll();
                let tempArray = [];
                tempData2.filter((tempItem) => {
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
                    if (tempItem.ID != this.state.itemID && tempItem.MaconomyAccountID == this.state.selectedCompanyClient && tempItem.Status == strings.Status[1] && tempItem.Company == data.dpCompany && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && isAccessLevelPresent) {
                        tempArray.push(tempItem);
                    }
                });

                let requestData = tempArray[0];

                if (requestData !== null && requestData !== undefined) {
                    if (Utils.CheckRequiredField(requestData["FolderPath"]) === true) {
                        oldFolderPath = requestData["FolderPath"];
                        let folderPathBody: string = JSON.stringify({
                            'Source': oldFolderPath,
                            'Destination': newFolderPath
                        });
                        await Utils.CallMSFlow(this.props.context, folderPathBody, this.props.copyFilesFlowUrl);
                    }
                }

                this.setState({ folderPath: newFolderPath });

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: newFolderPath }).then((res) => {
                });

                const body: string = JSON.stringify({
                    'RequestID': this.state.itemID.toString(),
                    'Folder': newFolderPath,
                    'FolderRead': '',
                    'FolderContribute': this.state.requestor.toString(),
                    'ReqRead': '',
                    'ReqContribute': this.state.requestor.toString(),
                    'UpdateRequestID': this.state.updateRequestDataID.toString(),
                    'UpdateReqContribute': this.state.requestor.toString(),
                });

                //jaymin change
                var tempBody = {
                    Title: this.state.itemID.toString(),
                    FolderPath: newFolderPath,
                    FolderRead: "",
                    FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                    ReqRead: "",
                    ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                    UpdateRequestID: this.state.updateRequestDataID.toString(),
                    UpdateReqContribute: this.state.requestor.toString()//R FHD change 19-9-2023,
                };

                //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);
            }
        } catch (error) {
            console.log("SaveData--->", error);
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

    private async SaveDataOperations() {
        /// <summary>Validate and save data operations.</summary>
        let data = this.companySectionRef.current.ValidateCompanySection();

        if (this.state.errors.companyClientsNotExists.length > 0) {
            return false;
        }
        if (this.ValidateSection(data) === false || data === null) {
            return false;
        }
        if (await this.CheckIsRequestExists() === true) {
            return false;
        }

        this.setState({ dpCompany: data.dpCompany });
        await this.SaveData(data);
        return true;
    }

    private async _NextClick() {
        /// <summary>Next button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (Utils.CheckRequiredField(this.state.errors.clientExists) === false) {
            if (await this.SaveDataOperations()) {
                this.setState({ loading: false }, async () => {
                    await this.props.dataChange("section1Data", this.state);
                    await this.props.dataChange("itemID", this.state.itemID);
                    await this.props.dataChange("approvalData", {
                        "company": this.state.dpCompany,
                        "workflowType": this.state.rbtnWorkflowType,
                        "requestType": Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                        "folderPath": this.state.folderPath,
                        "requestorID": this.state.requestor,
                        "maconomyAccountID": this.state.selectedCompanyClient,
                        "updateRequestDataID": this.state.updateRequestDataID.toString()
                    });
                    await this.props.dataChange("macAccountId", this.state.selectedCompanyClient);
                    this.props.nextStep();
                });
            } else {
                this.setState({ loading: false }); //9-2-23
            }
        } else {
            this.setState({ loading: false }); //9-2-23
        }
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (Utils.CheckRequiredField(this.state.errors.clientExists) === false) {
            if (await this.SaveDataOperations()) {
                window.location.href = this.props.context.pageContext.web.absoluteUrl;
            }
        }
    }

    private async CheckIsRequestExists() {
        let viewXML = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="MaconomyAccountID"></FieldRef>
            <FieldRef Name="RequestType"></FieldRef>
            <FieldRef Name="Status"></FieldRef>
            <FieldRef Name="RequestID"></FieldRef>
        </ViewFields>
        <RowLimit>1</RowLimit>
        <Query>
            <Where>
                <And>
                    <And>
                        <Eq><FieldRef Name="Status"></FieldRef><Value Type="Choice">`+ strings.Status[0] + `</Value></Eq>
                        <Eq><FieldRef Name="Submitted"/><Value Type="Boolean">1</Value></Eq>
                    </And>
                    <And>
                        <Eq><FieldRef Name="MaconomyAccountID"></FieldRef><Value Type="Text">`+ this.state.selectedCompanyClient + `</Value></Eq>
                        <Eq><FieldRef Name="RequestType"></FieldRef><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[5].text + `</Value></Eq>
                    </And>
                </And>
            </Where>
        </Query>
        </View>`;

        // let requestData = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME, viewXML);
        var tempData = await this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll();
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
            if (tempItem.Status == strings.Status[0] && tempItem.Submitted == true && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && tempItem.MaconomyAccountID == this.state.selectedCompanyClient && isAccessLevelPresent) {
                tempArray.push(tempItem);
            }
        });

        let requestData = tempArray[0];
        let errorsObj = this.state.errors;

        if (requestData !== null && requestData !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
            errorsObj.requestExists = strings.ClientRequest_RunningModeReq12[0] + requestData.RequestID + " " + requestData.ID + strings.ClientRequest_RunningModeReq12[1];
            this.setState({ errors: errorsObj, loading: false });
            return true;
        } else {
            errorsObj.requestExists = '',
                this.setState({ errors: errorsObj });
            return false;
        }
    }
}