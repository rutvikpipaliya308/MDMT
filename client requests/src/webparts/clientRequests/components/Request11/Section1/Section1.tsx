import * as React from 'react';
import { ISection1Props, ISection1State, IParentClientDetails } from './ISection1Props';
import * as strings from 'ClientRequestsWebPartStrings';

import ClipLoader from "react-spinners/ClipLoader";
import { Web } from 'sp-pnp-js';
import { Icon, Label } from 'office-ui-fabric-react';

import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const columns = [
    { name: strings.ActionHeader, selector: 'Action', width: '80px', maxWidth: '80px' },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, width: '80px', maxWidth: '80px' },
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
            requestor: 0,
            office: '',
            itemID: 0,
            selectedParentClient: '',
            selectedSocialName: '',
            parentClientUpdateArray: [],
            isCompanyDisable: false,
            errors: {
                selectParent: '',
                requestExists: '',
                clientExists: '',
                companyExists: ''
            },
            assignedClientsArray: null,
            assignedClientsString: '',
            updateRequestDataID: 0
        };
        this.companySectionRef = React.createRef<CompanySection>();
    }

    public async componentWillMount() {
        /// <summary>Bind data.</summary>
        if (this.props.data === null || this.props.data === undefined) {
            this.setState({
                requestor: await Utils.GetCurrentUserId(this.objWeb),
                office: await Utils.GetCurrentUserOffice(this.objWeb, this.props.context),
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
                selectedParentClient: this.props.listData["MaconomyAccountID"],
                //selectedSocialName: this.props.listData["Title"],
                isCompanyDisable: true
            });
            await this.GetSelectedParentSocialName();
            await this.GetUpdateRequestDataID();
        }

        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });
        }

        if (this.props.itemID > 0) {
            this.setState({ itemID: this.props.itemID });
        } else {
            await this.BindGridData();
        }
        // this.setState({ loading: false });
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
                        <CompanySection isDisable={this.state.isCompanyDisable} ref={this.companySectionRef} {...this.props} dpCompany={this.state.dpCompany} isWorkflowTypeNeeded={false} setLoader={this.SetLoader.bind(this)} requestType={strings.RequestType[4]} accessLevel={this.props.accessLevel} />

                        {/* Display Parent client details in Data Table */}
                        <div className="grid-table" style={{ position: "relative" }}>
                            {this.state.itemID === 0 ?
                                <DataTableExtensions
                                    data={this.state.parentClientUpdateArray}
                                    columns={columns}
                                    print={false}
                                    export={false}
                                    filterHidden={false}
                                >
                                    <DataTable
                                        className="table"
                                        data={this.state.parentClientUpdateArray}
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
                                </DataTableExtensions> : null}
                        </div>

                        {/* Show error  */}
                        {this.state.errors.selectParent.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.selectParent} </Label>
                        </span> : null}

                        {/* Show current selectd client MaconomyAccountID and Social Name. */}
                        {this.state.selectedParentClient.length > 0 && this.state.errors.clientExists.length === 0 ? <div className="alert alert-warning mt-3" role="alert">
                            <Label className="text-left">{strings.YouHaveSelectedText} <strong>{this.state.selectedParentClient}</strong> - {this.state.selectedSocialName}</Label>
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
            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="CustomerType"></FieldRef>
                <FieldRef Name="Title"></FieldRef>
                <FieldRef Name="LegalName"></FieldRef>
                <FieldRef Name="Line1"></FieldRef>
                <FieldRef Name="Zipcode"></FieldRef>
                <FieldRef Name="Postal_District_City"></FieldRef>
                <FieldRef Name="Country"></FieldRef>
                <FieldRef Name="Currency"></FieldRef>
                <FieldRef Name="TaxRegistrationNo"></FieldRef>
            </ViewFields>
            <Query>
                <Where>
                    <Eq><FieldRef Name="CustomerType" /><Value Type="Text">parent client</Value></Eq>
                </Where>
                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>
            </Query>
            </View>`;

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempData = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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
                if (tempItem.CustomerType == "parent client" && isAccessLevelPresent) {
                    tempArray.push(tempItem);
                }
            });

            tempArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));

            var data = tempArray;

            if (data !== null) {
                let tempArray: IParentClientDetails[] = [];

                data.forEach(element => {
                    tempArray.push({
                        Action: <input type="radio" checked={this.state.selectedParentClient === element['MaconomyAccountID']} name="parent" value={element["MaconomyAccountID"]} onClick={this.SelectParentClient.bind(this, element['MaconomyAccountID'], element["Title"])}></input>,
                        Link: <a onClick={(e) => { e.preventDefault(); window.open(this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=pcl", '_blank') }} href=''>{strings.Grid_LinkHeader}</a>,
                        CustomerType: element["CustomerType"],
                        MaconomyAccountID: element["MaconomyAccountID"],
                        SocialName: element["Title"],
                        LegalName: element["LegalName"],
                        Line1: element["Line1"],
                        Zipcode: element["Zipcode"],
                        Postal_District_City: element["Postal_District_City"],
                        Country: element["Country"],
                        Currency: element["Currency"],
                        TaxRegistrationNo: element["TaxRegistrationNo"]
                    });
                });
                this.setState({
                    parentClientUpdateArray: cloneDeep(tempArray)
                });
            }
        } catch (error) {
            console.log("bindGridData--->", error);
        }
    }

    private async GetAssignedClients(macId: string) {
        /// <summary>Fetch data for assigned clients.</summary>
        try {
            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="ParentClient"></FieldRef>
            </ViewFields>
            <Query>
                <Where>
                    <Eq><FieldRef Name="ParentClient" /><Value Type="Text">`+ macId + `</Value></Eq>
                </Where>
                <OrderBy><FieldRef Name='MaconomyAccountID' Ascending='True'></FieldRef></OrderBy>
            </Query>
            </View>`;

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempData = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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
                if (tempItem.ParentClient == macId && isAccessLevelPresent) {
                    tempArray.push(tempItem);
                }
            });

            tempArray.sort((a, b) => (a.MaconomyAccountID > b.MaconomyAccountID) ? 1 : ((b.MaconomyAccountID > a.MaconomyAccountID) ? -1 : 0));
            var data = tempArray;

            if (data != null) {
                let tempArray = [];
                let tempIds = [];

                data.forEach(element => {
                    tempArray.push({
                        MaconomyAccountID: element['MaconomyAccountID']
                    });
                    tempIds.push(element['MaconomyAccountID']);
                });

                this.setState({
                    assignedClientsArray: tempArray,
                    assignedClientsString: tempIds.join(',')
                });
            }
        } catch (error) {
            console.log('Assigned clients--->', error);
        }
    }

    private async GetSelectedParentSocialName() {
        /// <summary>Fetch data for datatable.</summary>
        try {

            let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
                <FieldRef Name="MaconomyAccountID"></FieldRef>
                <FieldRef Name="Title"></FieldRef>
            </ViewFields>
            <Query>
                <Where>
                    <Eq> <FieldRef Name='MaconomyAccountID' /><Value Type='Text'>`+ this.props.listData["MaconomyAccountID"] + `</Value> </Eq>
                </Where>
            </Query>
            </View>`;

            // let data = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME, viewXML);
            var tempData = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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
                if (tempItem.MaconomyAccountID == this.props.listData["MaconomyAccountID"] && isAccessLevelPresent) {
                    tempArray.push(tempItem);
                }
            });

            var data = tempArray;

            if (data !== null && data !== undefined) {
                this.setState({ selectedSocialName: data["Title"] });
            } else {
                let errors = this.state.errors;
                errors.clientExists = strings.NoMaconomyParentClient_Msg[0] + this.props.listData["MaconomyAccountID"] + strings.NoMaconomyParentClient_Msg[1];
                this.setState({ errors: errors });

            }

        } catch (error) {
            console.log('Get social Name--->', error);
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

    private SelectParentClient(selectedParentClient: string, selectedSocialName: string): void {
        /// <summary>Set MaconomyAccountID & Social Name when select client from list.</summary>
        this.setState({
            ...this.state,
            selectedParentClient: selectedParentClient,
            selectedSocialName: selectedSocialName
        }, () => {
            this.SelectRadio();
        });

        //rutvik validate change
        let errors = this.state.errors;
        errors.selectParent = '';
        this.setState({ errors: errors });
        //end
    }

    private SelectRadio(): void {
        // <summary>Event called on page change.</summary>
        let tempArray = this.state.parentClientUpdateArray;
        for (let parent = 0; parent < tempArray.length; parent++) {
            if (tempArray[parent].MaconomyAccountID === this.state.selectedParentClient) {
                tempArray[parent].Action = <input type="radio" checked={true} name="parent" value={tempArray[parent].MaconomyAccountID} onClick={this.SelectParentClient.bind(this, tempArray[parent].MaconomyAccountID, tempArray[parent].SocialName)} ></input>;
            } else {
                tempArray[parent].Action = <input type="radio" checked={false} name="parent" value={tempArray[parent].MaconomyAccountID} onClick={this.SelectParentClient.bind(this, tempArray[parent].MaconomyAccountID, tempArray[parent].SocialName)} ></input>;
            }
        }
        this.setState({
            parentClientUpdateArray: cloneDeep(tempArray)
        });
    }

    private ValidateSection(data): boolean {
        /// <summary>Validate parent selected from list or not.</summary>
        let errors = this.state.errors;
        errors.selectParent = (this.state.selectedParentClient === '') ? strings.SelectClientMsg : "";
        if (this.props.itemID > 0 && Utils.CheckRequiredField(data.dpCompany) === false) {
            errors.companyExists = strings.NoCompany_Msg[0] + this.props.listData["Company"] + strings.NoCompany_Msg[1];

        }
        this.setState({ errors: errors });
        let valid = errors.selectParent.length > 0 || errors.companyExists.length > 0 ? false : true;
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
            // change end - 25-1-22
            var tempData = {
                Company: data.dpCompany,
                RequestType: Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor, //R 29-3-23 exception vendor
                Office: this.state.office,
                WorkflowType: strings.WorkflowType[0],
                RequestID: Utils.GenerateRequestID(this.state.itemID),
                Status: strings.Status[0],
                MaconomyAccountID: this.state.selectedParentClient.toString(),
                Title: this.state.selectedSocialName.toString(),
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
                        await this.GetAssignedClients(this.state.selectedParentClient);

                        let tempUpdateRequestData = {
                            MaconomyAccountID: this.state.selectedParentClient.toString(),
                            Child: this.state.assignedClientsString,
                            RequestID: this.state.itemID.toString(),
                            Title: this.state.selectedSocialName.toString(),
                            AccessLevel: accessLevel
                        };

                        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.getById(this.state.updateRequestDataID).update(tempUpdateRequestData).then((response) => {
                        });
                    }
                });
            } else {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(async (res) => {
                    this.setState({
                        itemID: res.data.Id
                    });

                    await this.GetAssignedClients(this.state.selectedParentClient);
                    let tempUpdateRequestData = {
                        MaconomyAccountID: this.state.selectedParentClient.toString(),
                        Child: this.state.assignedClientsString,
                        RequestID: this.state.itemID.toString(),
                        Title: this.state.selectedSocialName.toString(),
                        AccessLevel: accessLevel
                    };

                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTDATA_INTERNALANAME).items.add(tempUpdateRequestData).then(async (response) => {
                        this.setState({ updateRequestDataID: response.data.Id });
                    });
                });

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID) }).then((res) => {
                });

                const body: string = JSON.stringify({
                    'RequestID': this.state.itemID.toString(),
                    'Folder': '',
                    'FolderRead': '',
                    'FolderContribute': '',
                    'ReqRead': '',
                    'ReqContribute': this.state.requestor.toString(),
                    'UpdateRequestID': this.state.updateRequestDataID.toString(),
                    'UpdateReqContribute': this.state.requestor.toString(),
                });

                //jaymin change
                var tempBody = {
                    Title: this.state.itemID.toString(),
                    FolderPath: "",
                    FolderRead: "",
                    FolderContribute: "",
                    ReqRead: "",
                    ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                    UpdateRequestID: this.state.updateRequestDataID.toString(),
                    UpdateReqContribute: this.state.requestor.toString() //R FHD change 19-9-2023,
                };

                //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);
            }
        } catch (error) {
            console.log("save data --->", error);
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
        if (await this.ValidateSection(data) === false || data === null) {
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
                this.setState({ loading: false, isCompanyDisable: true }, async () => {
                    await this.props.dataChange("section1Data", this.state);
                    await this.props.dataChange("itemID", this.state.itemID);
                    await this.props.dataChange("approvalData", {
                        "company": this.state.dpCompany,
                        "workflowType": strings.WorkflowType[0],
                        "requestType": Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                        "requestorID": this.state.requestor,

                        "maconomyAccountID": this.state.selectedParentClient,

                        "updateRequestDataID": this.state.updateRequestDataID.toString()
                    });
                    this.props.nextStep();
                });
            } else {
                this.setState({ loading: false });
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
        ///Check for duplicate parent client update request in running mode.

        let viewXML = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="MaconomyAccountID"></FieldRef>
            <FieldRef Name="RequestType"></FieldRef>
            <FieldRef Name="Status"></FieldRef>
            <FieldRef Name="Child"></FieldRef>
            <FieldRef Name="Submitted"></FieldRef>
            <FieldRef Name="RequestID"></FieldRef>
        </ViewFields>
        <RowLimit>1</RowLimit>
        <Query>
            <Where>
                <And>
                    <And>
                        <Eq><FieldRef Name="RequestType" /><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[4].text + `</Value></Eq>
                        <Eq><FieldRef Name="MaconomyAccountID" /><Value Type="Text">`+ this.state.selectedParentClient + `</Value></Eq>
                    </And>
                    <And>
                        <Eq><FieldRef Name="Status"/><Value Type="Text">Open</Value></Eq>
                        <Eq><FieldRef Name="Submitted" /><Value Type="Boolean">1</Value></Eq>
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
            if (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[4].text && tempItem.MaconomyAccountID == this.state.selectedParentClient && tempItem.Status == "Open" && tempItem.Submitted == true && isAccessLevelPresent) {
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
}