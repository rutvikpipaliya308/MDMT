import * as React from 'react';
import { ISection1Props, ISection1State } from './ISection1Props';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Web } from 'sp-pnp-js';
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Icon, Label } from 'office-ui-fabric-react';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px', },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
    {
        name: strings.AccessLevelHeader,
        selector: 'AccessLevel',
        sortable: true,
        minWidth: '120px'
    },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true },
    {
        name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true,
        minWidth: '200px',
    },
    {
        name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true,
        minWidth: '150px',
    },
    {
        name: strings.DuplicationcheckHeader[10], selector: 'Status', wrap: true, sortable: true,
        minWidth: '100px',
    },
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
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            clientArray: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            selectedClient: { macAccountId: '', socialName: '' },
            currentCompanyAccessLevel: '', //Rutvik 17-1-24
            errors: {
                dpCompany: '',
                selectedClient: '',
                requestExists: '',
                clientExists: '',
                companyExists: ''
            },
            filter: '',
            updateRequestDataID: 0,
            updateRequestDataArray: ''

        };
        this.companySectionRef = React.createRef<CompanySection>();
    }

    public async componentWillMount() {
        try {
            /// <summary>Bind data.</summary>
            if (this.props.data === null || this.props.data === undefined) {
                this.setState({
                    requestor: await Utils.GetCurrentUserId(this.objWeb),
                    office: await Utils.GetCurrentUserOffice(this.objWeb, this.props["context"]),
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
                await this.GetSelectedSocialName(this.props.listData["MaconomyAccountID"]);
                this.setState({
                    dpCompany: this.props.listData["Company"],
                    rbtnWorkflowType: this.props.listData["WorkflowType"],
                    folderPath: this.props.listData["FolderPath"],
                });
                //await this.GetUpdateRequestDataID(); //rutvik test chagne and related changes
            }

            if (this.props.data !== null && this.props.data !== undefined) {
                await this.setState({ ...this.props.data });
            }

            await this.BindGridData(); //rutvik1

            if (this.props.itemID === 0) {
                await this.BindGridData();
            }
            this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
            if (this.props.data === null || this.props.data === undefined) {
                this.setState({ loading: false });
            }

            //Shraddha 08-08-22 item 4 //rutvik1
            var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
            var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

            this.setState({ currentUserid: currentUserID });
            this.setState({ requestorid: requestoridd });
            //Shraddha 08-08-22 item 4 end
        }
        catch (error) {
            console.log("Section 1/Request13 >>", error);
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
                        {/* rutvik1 */}
                        <CompanySection ref={this.companySectionRef} isDisable={this.checkIfFieldDisabled("dpCompany")} {...this.props} dpCompany={this.state.dpCompany} setLoader={this.SetLoader.bind(this)} rbtnWorkflowType={this.state.rbtnWorkflowType} isWorkflowTypeNeeded={true} requestType={strings.RequestType[6]} accessLevel={this.props.accessLevel} setCurrentCompanyAccessLevel={this.setCurrentCompanyAccessLevel} />

                        {/* Display Client details in Data Table */}
                        {<React.Fragment>
                            <div className="card-header text-center"><h3 className="border-0 pl-0">{strings.Lbl_SelectClientGrid}</h3></div>
                            <div className="grid-table" style={{ position: "relative", }}>
                                <DataTableExtensions
                                    columns={columns}
                                    data={this.state.clientArray}
                                    print={false}
                                    export={false}
                                    filterHidden={false}>
                                    <DataTable
                                        className="table"
                                        data={this.state.clientArray}
                                        columns={columns}
                                        responsive={true}
                                        pagination={true}
                                        paginationComponentOptions={{ noRowsPerPage: true }}
                                        paginationPerPage={10}
                                        noHeader={true}
                                        persistTableHead={true}
                                        noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordsAvailable}</label></div>}
                                        sortIcon={<Icon iconName="SortDown" />}
                                        onChangePage={this.selectRadio.bind(this)}
                                        onSort={this.selectRadio.bind(this)}
                                        noContextMenu={true}
                                    />
                                </DataTableExtensions>
                            </div>
                        </React.Fragment>}
                        {this.state.errors.selectedClient.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.selectedClient} </Label>
                        </span> : null}
                        {/* Show current selectd client MaconomyAccountID and Social Name. */}
                        {this.state.selectedClient.macAccountId > 0 && this.state.errors.clientExists.length === 0 ? <div className="alert alert-warning mt-3" role="alert">
                            <Label className="text-left">{strings.YouHaveSelectedText} <strong>{this.state.selectedClient.macAccountId}</strong> - {this.state.selectedClient.socialName} </Label>
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

                        {/* Show error message for company is exists or not */}
                        {this.state.errors.companyExists.length > 0 ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.companyExists} </Label>
                        </div> : null}

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

    //Rutvik 17-1-24
    private setCurrentCompanyAccessLevel = async (data) => {
        this.setState({ currentCompanyAccessLevel: data });

        this.setState({
            ...this.state,
            selectedClient: {
                macAccountId: '',
                socialName: ''
            }
        });
        this.setState({ loading: true });
        await this.BindGridData();
        this.setState({ loading: false });
    }

    private generateRequestExistsHTML(requestExistsError) {
        let textAfterRequestID = requestExistsError.substr(requestExistsError.indexOf("ID:") + 4);
        let requestID = textAfterRequestID.split(" ")[0];
        let ID = textAfterRequestID.split(" ")[1];
        let redirectionURL = this.props.context.pageContext.web.absoluteUrl + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=";
        // if (this.state.itemID !== Number(ID)) {
        return (
            <a className="errormessage requestExistsErrorCls" style={{ textDecoration: "underline" }} target="_blank" href={redirectionURL + ID.toString()}>{requestID}</a>
        )
        // }
        // else {
        //     let errorsObj = this.state.errors;
        //     errorsObj.requestExists = ""
        //     this.setState({ errors: errorsObj });
        // }
    }

    private SetLoader(status: boolean) {
        //<summary>set loader value from parameter</summary>
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    }

    private checkIfFieldDisabled(tagID) {
        let listOfEditableFieldsSection1 = this.props.listOfEditableFields;

        //Shraddha 08-08-22 item 4
        let currentuser = this.state.currentUserid;
        let requestorid = this.state.requestorid;

        if (this.props.itemSubmitted) { //R fhd change 20-9-2023
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

    private async GetUpdateRequestDataID() {
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

        if (data !== null) {
            this.setState({
                updateRequestDataID: data.ID
            });
        }
    }

    private async BindGridData() {
        /// <summary>Fetch data for datatable.</summary>
        try {
            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="Title"></FieldRef>
                <FieldRef Name="LegalName"></FieldRef>
                <FieldRef Name="Line1"></FieldRef>
                <FieldRef Name="Line2"></FieldRef>
                <FieldRef Name="Zipcode"></FieldRef>
                <FieldRef Name="Postal_District_City"></FieldRef>
                <FieldRef Name="Country"></FieldRef>
                <FieldRef Name="Currency"></FieldRef>
                <FieldRef Name="TaxRegistrationNo"></FieldRef>
                <FieldRef Name="Country_Area_Region"></FieldRef>
                <FieldRef Name="CompanyRegistrationNo"></FieldRef>
                <FieldRef Name="Sector"></FieldRef>
                <FieldRef Name="ClientStatus"></FieldRef>
                <FieldRef Name="ClientType"></FieldRef>
                <FieldRef Name="Status"></FieldRef>
                <FieldRef Name="CustomerRemark4"></FieldRef>
                <FieldRef Name="CustomerRemark5"></FieldRef>
                <FieldRef Name="CustomerRemark8"></FieldRef>
                <FieldRef Name="CustomerRemark7"></FieldRef>
                <FieldRef Name="ClinetIDType"></FieldRef>
                <FieldRef Name="ClientLead"></FieldRef>
                <FieldRef Name="CommercialManager"></FieldRef>
                <FieldRef Name="Biller"></FieldRef>
                <FieldRef Name="ProjectAnalyst"></FieldRef>
                <FieldRef Name="ResourceManager"></FieldRef>
            </ViewFields>
                <Query>
                    <Where>
                        <Eq><FieldRef Name="CustomerType" /><Value Type="Text">legal client</Value></Eq>
                    </Where>
                    <OrderBy><FieldRef Name='ID' Ascending='True'></FieldRef></OrderBy>
                </Query>
            </View>`;

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempItems = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
            let tempArray = [];
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
                if ((item.CustomerType == "legal client") && isAccessLevelPresent) {
                    //17-1-24 rutvik
                    if (this.state.currentCompanyAccessLevel !== '' && item["AccessLevel"] !== null) {
                        if (item["AccessLevel"] === this.state.currentCompanyAccessLevel) {
                            tempArray.push(item);
                        }
                    } else {
                        tempArray.push(item);
                    }
                }
            });

            tempArray.sort((a, b) => (a.ID > b.ID) ? 1 : ((b.ID > a.ID) ? -1 : 0));
            var data = tempArray;

            if (data !== null) {
                let tempArray = [];
                for (let item = 0; item < data.length; item++) {
                    tempArray.push({
                        Action: <input type="radio" className="client" checked={this.state.selectedClient.macAccountId === data[item]['MaconomyAccountID']} name="client" value={data[item]['MaconomyAccountID']} onClick={this.SelectClient.bind(this, data[item]['MaconomyAccountID'], data[item]['Title'])} ></input>,
                        Link: <a onClick={(e) => { e.preventDefault(); window.open(this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + data[item]['ID'] + "&rqType=cl", '_blank') }} href=''>{strings.Grid_LinkHeader}</a>,
                        AccessLevel: data[item]["AccessLevel"], //17-1-24 Rutvik
                        MaconomyAccountID: data[item]["MaconomyAccountID"],
                        SocialName: data[item]["Title"],
                        LegalName: data[item]["LegalName"],
                        Zipcode: data[item]["Zipcode"],
                        Line1: data[item]["Line1"],
                        Postal_District_City: data[item]["Postal_District_City"],
                        Country: data[item]["Country"],
                        Currency: data[item]["Currency"],
                        TaxRegistrationNo: data[item]["TaxRegistrationNo"],
                        Status: data[item]["Status"],
                        Line2: data[item]["Line2"],
                        Country_Area_Region: data[item]["Country_Area_Region"],
                        CompanyRegistrationNo: data[item]["CompanyRegistrationNo"],
                        Sector: data[item]["Sector"],
                        ClientStatus: data[item]["ClientStatus"],
                        ClientType: data[item]["ClientType"],
                        CustomerRemark4: data[item]["CustomerRemark4"],
                        CustomerRemark5: data[item]["CustomerRemark5"],
                        CustomerRemark8: data[item]["CustomerRemark8"],//Shraddha test 8
                        CustomerRemark7: data[item]["CustomerRemark7"],//Shraddha test 7
                        ClientIDType: data[item]["ClientIDType"],//Shraddha test 7
                        //Rutvik emp dropdown change 3-3-23
                        ClientLead: data[0]["ClientLead"],
                        CommercialManager: data[0]["CommercialManager"],
                        Biller: data[0]["Biller"],
                        ProjectAnalyst: data[0]["ProjectAnalyst"],
                        ResourceManager: data[0]["ResourceManager"]
                        //end
                    });
                }

                this.setState({
                    clientArray: cloneDeep(tempArray)
                });
            }
            this.setState({ loading: false });
        }
        catch (error) {
            console.log("BindGridData(Section1.tsx)--->", error);
        }
    }

    private async GetSelectedSocialName(maconomyNumber: string) {
        /// <summary>Fetch data for datatable.</summary>
        try {
            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="Title"></FieldRef>
                <FieldRef Name="LegalName"></FieldRef>
                <FieldRef Name="Line1"></FieldRef>
                <FieldRef Name="Line2"></FieldRef>
                <FieldRef Name="Zipcode"></FieldRef>
                <FieldRef Name="Postal_District_City"></FieldRef>
                <FieldRef Name="Country"></FieldRef>
                <FieldRef Name="Currency"></FieldRef>
                <FieldRef Name="TaxRegistrationNo"></FieldRef>
                <FieldRef Name="Country_Area_Region"></FieldRef>
                <FieldRef Name="CompanyRegistrationNo"></FieldRef>
                <FieldRef Name="Sector"></FieldRef>
                <FieldRef Name="ClientStatus"></FieldRef>
                <FieldRef Name="ClientType"></FieldRef>
                <FieldRef Name="CustomerRemark4"></FieldRef>
                <FieldRef Name="CustomerRemark5"></FieldRef>
                <FieldRef Name="ClientLead"></FieldRef>
                <FieldRef Name="CommercialManager"></FieldRef>
                <FieldRef Name="Biller"></FieldRef>
                <FieldRef Name="ProjectAnalyst"></FieldRef>
                <FieldRef Name="ResourceManager"></FieldRef>
             </ViewFields>
             <Query>
             <Where>
             <Eq>
                <FieldRef Name='MaconomyAccountID' />
                <Value Type='Text'>`+ maconomyNumber + `</Value>
             </Eq>
          </Where>
          </Query>
            </View>`;

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempItems = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
            let tempArray = [];
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
                if ((item.MaconomyAccountID == maconomyNumber) && isAccessLevelPresent) {
                    tempArray.push(item);
                }
            });

            tempArray.sort((a, b) => (a.ID > b.ID) ? 1 : ((b.ID > a.ID) ? -1 : 0));
            var data = tempArray;
            if (data !== null && data.length > 0) {
                data[0]['Country'] = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data[0]['Country']);

                this.setState({
                    selectedClient: {
                        macAccountId: data[0]["MaconomyAccountID"],
                        socialName: data[0]['Title']
                    },
                    updateRequestDataArray: {
                        MaconomyAccountID: data[0]['MaconomyAccountID'],
                        Title: data[0]['Title'],
                        LegalName: data[0]['LegalName'],
                        Line1: data[0]['Line1'],
                        Line2: data[0]['Line2'],
                        Zipcode: data[0]['Zipcode'],
                        Postal_District_City: data[0]['Postal_District_City'],
                        Country_Area_Region: data[0]['Country_Area_Region'],
                        Country: data[0]['Country'],
                        Currency: data[0]['Currency'],
                        CompanyRegistrationNo: data[0]['CompanyRegistrationNo'],
                        Sector: data[0]['Sector'],
                        ClientStatus: data[0]['ClientStatus'],
                        ClientType: data[0]['ClientType'],
                        TaxRegistrationNo: data[0]['TaxRegistrationNo'],
                        RequestID: this.props.itemID.toString(),
                        AccessLevel: data[0]["AccessLevel"],
                        CustomerRemark4: data[0]["CustomerRemark4"],
                        CustomerRemark5: data[0]["CustomerRemark5"],
                        CustomerRemark8: data[0]["CustomerRemark8"],
                        CustomerRemark7: data[0]["CustomerRemark7"],//Shraddha test 7
                        ClientIDType: data[0]["ClientIDType"],//Shraddha test 7
                        //Rutvik emp dropdown change 3-3-23
                        ClientLead: data[0]["ClientLead"],
                        CommercialManager: data[0]["CommercialManager"],
                        Biller: data[0]["Biller"],
                        ProjectAnalyst: data[0]["ProjectAnalyst"],
                        ResourceManager: data[0]["ResourceManager"]
                        //end
                    }
                });
            } else {
                let errors = this.state.errors;
                errors.clientExists = strings.NoMaconomyClient_Msg[0] + this.props.listData["MaconomyAccountID"] + strings.NoMaconomyClient_Msg[1];
                this.setState({ errors: errors });
            }

        }
        catch (error) {
            console.log("BindGridData(Section1.tsx)--->", error);
        }
    }

    private SelectClient(clientNo: string, socialName: string): void {
        /// <summary>Set MaconomyAccountID and SocialName when select client from list.</summary>            
        //this.selectRadio();
        this.setState({
            ...this.state,
            selectedClient: {
                macAccountId: clientNo,
                socialName: socialName
            }
        }, () => {
            this.selectRadio();
        });

        //rutvik validate change
        let errors = this.state.errors;
        errors.selectedClient = '';
        this.setState({ errors: errors });
        //end
    }

    private selectRadio(): void {
        // <summary>Event called on page change.</summary>        

        let tempClientArray = this.state.clientArray;
        for (let client = 0; client < tempClientArray.length; client++) {
            if (tempClientArray[client].MaconomyAccountID === this.state.selectedClient.macAccountId) {
                tempClientArray[client].Action = <input type="radio" className="client" checked={true} name="client" value={tempClientArray[client].MaconomyAccountID} onClick={this.SelectClient.bind(this, tempClientArray[client].MaconomyAccountID, tempClientArray[client].SocialName)} ></input>;
            }
            else {
                tempClientArray[client].Action = <input type="radio" className="client" checked={false} name="client" value={tempClientArray[client].MaconomyAccountID} onClick={this.SelectClient.bind(this, tempClientArray[client].MaconomyAccountID, tempClientArray[client].SocialName)} ></input>;
            }
        }
        this.setState({
            clientArray: cloneDeep(tempClientArray),
        });

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
            //Rutvik change end - 25-1-22
            var tempData = {
                Company: data.dpCompany,
                RequestType: Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor, //R 29-3-23 exception vendor
                Office: this.state.office,
                WorkflowType: data.rbtnWorkflowType,
                RequestID: Utils.GenerateRequestID(this.state.itemID),
                Status: strings.Status[0],
                //rutvik test change
                //Title: this.state.selectedClient.socialName.toString(),
                MaconomyAccountID: this.state.selectedClient.macAccountId.toString(),
                OldMacId: this.state.selectedClient.macAccountId.toString(), //rutvik change
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
                    // if (this.props.listData !== null && this.props.listData !== undefined) {
                    //     await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.getById(this.state.updateRequestDataID).update(this.state.updateRequestDataArray).then((response) => {
                    //     });
                    //}
                });
            } else {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(async (res) => {
                    this.setState({
                        itemID: res.data.Id,
                    });

                    let selectedClientData = this.state.clientArray.filter((client) => { return client.MaconomyAccountID === this.state.selectedClient.macAccountId; })[0];
                    let tempUpdateRequestData = {
                        MaconomyAccountID: this.state.selectedClient.macAccountId.toString(),
                        Title: selectedClientData.SocialName,
                        LegalName: selectedClientData.LegalName,
                        Line1: selectedClientData.Line1,
                        Line2: selectedClientData.Line2,
                        Zipcode: selectedClientData.Zipcode,
                        Postal_District_City: selectedClientData.Postal_District_City,
                        Country_Area_Region: selectedClientData.Country_Area_Region,
                        Country: await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, selectedClientData.Country),
                        Currency: selectedClientData.Currency,
                        CompanyRegistrationNo: selectedClientData.CompanyRegistrationNo,
                        Sector: selectedClientData.Sector,
                        ClientStatus: selectedClientData.ClientStatus,
                        ClientType: selectedClientData.ClientType,
                        TaxRegistrationNo: selectedClientData.TaxRegistrationNo,
                        RequestID: this.state.itemID.toString(),
                        AccessLevel: accessLevel,
                        CustomerRemark4: selectedClientData.CustomerRemark4,
                        CustomerRemark5: selectedClientData.CustomerRemark5,
                        CustomerRemark8: selectedClientData.CustomerRemark8, //Shraddha test 8
                        CustomerRemark7: selectedClientData.CustomerRemark7, //Shraddha test 7
                        //Rutvik emp dropdown change 3-3-23
                        ClientLead: selectedClientData.ClientLead,
                        CommercialManager: selectedClientData.CommercialManager,
                        Biller: selectedClientData.Biller,
                        ProjectAnalyst: selectedClientData.ProjectAnalyst,
                        ResourceManager: selectedClientData.ResourceManager,
                        //end
                        ClientIDType: await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME, selectedClientData.ClientIDType),//Shraddha test 7
                    };
                    this.setState({ updateRequestDataArray: tempUpdateRequestData });

                    // await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.add(tempUpdateRequestData).then(async (response) => {
                    //     this.setState({ updateRequestDataID: response.data.Id });
                    // });
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
                                <Eq><FieldRef Name="MaconomyAccountID"></FieldRef><Value Type="Text">`+ this.state.selectedClient.macAccountId + `</Value></Eq>
                                <And>
                                    <Eq><FieldRef Name="Status"></FieldRef><Value Type="Text">`+ strings.Status[1] + `</Value></Eq>
                                    <In>
                                        <FieldRef Name="RequestType" />
                                        <Values>
                                            <Value Type='Choice'>`+ Constants.REQUESTTYPE_OPTIONS[1].text + `</Value>
                                            <Value Type='Choice'>`+ Constants.REQUESTTYPE_OPTIONS[3].text + `</Value>
                                        </Values>
                                    </In>   
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

                // let requeuestData = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME, viewXML);
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
                    if (tempItem.ID != this.state.itemID && tempItem.MaconomyAccountID == this.state.selectedClient.macAccountId && tempItem.Status == strings.Status[1] && (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[1].text || tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[6].text) && isAccessLevelPresent) {
                        tempArray.push(tempItem);
                    }
                });

                let requeuestData = tempArray[0];

                if (requeuestData !== null && requeuestData !== undefined) {
                    if (Utils.CheckRequiredField(requeuestData["FolderPath"]) === true) {
                        oldFolderPath = requeuestData["FolderPath"];

                        let folderPathBody: string = JSON.stringify({
                            'Source': oldFolderPath,
                            'Destination': newFolderPath
                        });

                        await Utils.CallMSFlow(this.props.context, folderPathBody, this.props.copyFilesFlowUrl);
                    }
                }

                this.setState({ folderPath: newFolderPath });

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: newFolderPath, }).then((res) => {
                });

                const body: string = JSON.stringify({
                    'RequestID': this.state.itemID.toString(),
                    'Folder': newFolderPath,
                    'FolderRead': '',
                    'FolderContribute': this.state.requestor.toString(),
                    'ReqRead': '',
                    'ReqContribute': this.state.requestor.toString(),
                    //'UpdateRequestID': this.state.updateRequestDataID.toString(),
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
                    //UpdateRequestID: this.state.updateRequestDataID.toString(),
                    UpdateReqContribute: this.state.requestor.toString() //R FHD change 19-9-2023,
                };

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);
                //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
            }
        } catch (error) {
            console.log("section 1 save data", error);
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
                        "maconomyAccountID": this.state.selectedClient.macAccountId,
                        //"updateRequestDataID": this.state.updateRequestDataID.toString()
                    });
                    this.props.dataChange("updateRequestDataID", this.state.updateRequestDataID);
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

    private async SaveDataOperations() {
        /// <summary>Validate and save data operations.</summary>
        let data = this.companySectionRef.current.ValidateCompanySection();
        if (this.ValidationSection(data) === false || data === null) {
            return false;
        }
        // if (await this.CheckIsRequestExists() === true) {
        //     return false
        // }
        this.setState({
            dpCompany: data.dpCompany,
            rbtnWorkflowType: data.rbtnWorkflowType,
        });

        await this.SaveData(data);
        return true;
    }

    private async CheckIsRequestExists() {
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
            if (tempItem.Status == strings.Status[0] && tempItem.Submitted == true && tempItem.MaconomyAccountID == this.state.selectedClient.macAccountId && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[6].text && isAccessLevelPresent) {
                tempArray.push(tempItem);
            }
        });

        let requestData = tempArray[0];
        let errorsObj = this.state.errors;

        if (requestData !== null && requestData !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
            errorsObj.requestExists = strings.ClientRequest_RunningMode[0] + requestData.RequestID + " " + requestData.ID + strings.ClientRequest_RunningMode[1];
            this.setState({ errors: errorsObj, loading: false });
            return true;
        } else {
            errorsObj.requestExists = '',
                this.setState({ errors: errorsObj });
            return false;
        }
    }

    private ValidationSection(data): boolean {
        /// <summary>Validate client selected from list or not.</summary>
        let errors = this.state.errors;

        errors.selectedClient = (this.state.selectedClient.macAccountId == '') ? strings.SelectClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];
        }
        this.setState({ errors: errors });
        let valid = errors.selectedClient.length > 0 || errors.companyExists.length > 0 ? false : true;
        return valid;
    }
}