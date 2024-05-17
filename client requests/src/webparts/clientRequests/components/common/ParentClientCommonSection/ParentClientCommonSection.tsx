import * as React from 'react';
import { IParentClientCommonSectionProps, IParentClientCommonSectionState, IClientDetails, ISelectedClients } from './IParentClientCommonSectionProps';
import * as strings from 'ClientRequestsWebPartStrings';

import ClipLoader from "react-spinners/ClipLoader";
import { Web, Util, util } from 'sp-pnp-js';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';

import CardFooter from '../../common/CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { cloneDeep, uniq } from '@microsoft/sp-lodash-subset';
import { Icon, Label, Checkbox } from 'office-ui-fabric-react';
import * as ReactDOM from 'react-dom';
import { ISubmitData } from '../../common/Attachments/IAttachmentsProps';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const columns = [
    { name: strings.ActionHeader, selector: 'Action', width: "80px" },
    { name: strings.Grid_LinkHeader, selector: 'Link', sortable: false, maxWidth: '80px' },
    { name: strings.Grid_TypeHeader, selector: 'Type', sortable: true, wrap: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[0], selector: 'MaconomyAccountID', sortable: true, minWidth: '120px' },
    { name: strings.DuplicationcheckHeader[8], selector: 'Currency', sortable: true, wrap: true },
    { name: strings.DuplicationcheckHeader[1], selector: 'SocialName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[2], selector: 'LegalName', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[3], selector: 'Line1', sortable: true, wrap: true, minWidth: '200px' },
    { name: strings.DuplicationcheckHeader[5], selector: 'Zipcode', sortable: true, wrap: true, width: '100px' },
    { name: strings.DuplicationcheckHeader[6], selector: 'Postal_District_City', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[7], selector: 'Country', sortable: true, wrap: true, minWidth: '150px' },
    { name: strings.DuplicationcheckHeader[9], selector: 'TaxRegistrationNo', sortable: true, wrap: true, minWidth: '200px' }
];

export default class ParentClientCommonSection extends React.Component<IParentClientCommonSectionProps, IParentClientCommonSectionState> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private isRequest9: boolean = this.props.approvalData.requestType.toLocaleLowerCase() === Constants.REQUESTTYPE_OPTIONS[2].text.toLocaleLowerCase();
    private requestorID;
    private submitData: ISubmitData = {
        data: '',
        approverContribute: [],
        approverRead: [],
        notificationApprovers: [],
        body: '',
        notificationBody: '',
    };

    constructor(props: IParentClientCommonSectionProps) {
        super(props);
        this.state = {
            loading: true,
            availableClientsArray: [],
            assignedClientsArray: [],
            previousAssignedClients: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            errors: {
                approvalData: '',
                selectClient: '',
                noUpdate: ''
            }
        };
    }

    public async componentWillMount() {
        /// <summary>Bind data.</summary>
        if (this.props.listData !== null) {
            let tempAssignedClients = this.state.assignedClientsArray;

            if (Utils.CheckRequiredField(this.props.listData["Child"]) !== false) {
                let tempAssignedClientsMacIds = this.props.listData["Child"].split(',');
                for (let client = 0; client < tempAssignedClientsMacIds.length; client++) {
                    tempAssignedClients.push({
                        MaconomyAccountID: tempAssignedClientsMacIds[client],
                        SocialName: ''
                    });
                }
            }
            this.setState({
                assignedClientsArray: tempAssignedClients
            });
        }


        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ ...this.props.data });
        } else {
            if (!this.isRequest9) {
                await this.BindAssignedClients();
            }
            await this.BindAvailableClientsGridData();
        }
        this.setState({ loading: false });
    }

    //rutvik change
    public async componentDidMount() {
        //Shraddha 08-08-22 item 4
        var itemid = this.props.itemID;
        var tempRequestorId = await this.objWeb.lists.getByTitle("Requests").items.filter(`ID eq ${itemid}`).select("RequestorId").getAll();

        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
    }


    public render(): React.ReactElement<IParentClientCommonSectionProps> {
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
                    <div className="card-header" style={{ textAlign: "left" }}>
                        <h3>{strings.SelectClientsForParentClient}</h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="col">
                                <h3 className="border-0 pl-0 text-left">{strings.AvailableClients}</h3>
                            </div>
                        </div>


                        {/* <!-- Available clients grid. ===================================== --> */}
                        <div className="grid-table" id="clientsGrid" style={{ position: "relative", }}>
                            <DataTableExtensions
                                data={this.state.availableClientsArray}
                                columns={columns}
                                print={false}
                                export={false}
                                filterHidden={false}
                            >
                                <DataTable
                                    className="table"
                                    data={this.state.availableClientsArray}
                                    columns={columns}
                                    responsive={true}
                                    pagination={true}
                                    paginationPerPage={10}
                                    persistTableHead={true}
                                    noHeader={true}
                                    noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordsAvailable}</label></div>}
                                    paginationComponentOptions={{ noRowsPerPage: true }}
                                    sortIcon={<Icon iconName="SortDown" />}
                                    noContextMenu={true}
                                />
                            </DataTableExtensions>
                        </div>

                        {/* <!-- card-header ===================================== --> */}
                        <div className="text-left pt-4">
                            <h3 className="border-0 pl-0">{strings.AssignedClients}</h3>
                        </div>

                        <div id="selectedClientsDiv">
                            {this.isRequest9 ?
                                <ul className="list-group text-left">
                                    {this.state.assignedClientsArray.length > 0 ?
                                        this.state.assignedClientsArray.map(client => {
                                            return (
                                                <li className="list-group-item">
                                                    <strong> {client.MaconomyAccountID} </strong> - {client.SocialName}
                                                </li>
                                            )
                                        })
                                        : ''}
                                </ul>
                                :
                                <ul className="list-group text-left">
                                    {this.state.previousAssignedClients.length > 0 ?
                                        this.state.previousAssignedClients.map(client => {
                                            let tempClient = this.state.assignedClientsArray.filter((assignedClient) => { return assignedClient.MaconomyAccountID === client.MaconomyAccountID });
                                            let backgroundColor = tempClient.length > 0 ? "list-group-item" : "list-group-item list-group-item-danger";
                                            return (
                                                <li className={backgroundColor}>
                                                    <strong>{client.MaconomyAccountID}</strong> - {client.SocialName}
                                                </li>
                                            )
                                        })
                                        : ''}

                                    {this.state.assignedClientsArray.length > 0 ?
                                        this.state.assignedClientsArray.map(client => {
                                            let tempClient = this.state.previousAssignedClients.filter((assignedClient) => { return assignedClient.MaconomyAccountID === client.MaconomyAccountID });
                                            return (
                                                tempClient.length > 0 ?
                                                    null :
                                                    <li className="list-group-item list-group-item-success">
                                                        <strong>{client.MaconomyAccountID}</strong> - {client.SocialName}
                                                    </li>
                                            )
                                        })
                                        : ''}
                                </ul>}

                        </div>

                        {this.state.errors.approvalData !== undefined && this.state.errors.approvalData.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage text-left" >{this.state.errors.approvalData} </Label>
                        </span> : null}

                        {this.state.errors.selectClient.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage text-left displayBlock" >{this.state.errors.selectClient} </Label>
                        </span> : null}

                        {!(this.isRequest9) ?
                            this.state.errors.noUpdate.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                <Label className="errormessage text-left" >{this.state.errors.noUpdate} </Label>
                            </span> : null
                            : null}
                    </div>

                    {/* <!-- show assigned clients list ===================================== --> */}

                    {(this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid) ?
                        <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} saveItemBtnMethod={this._SaveClick.bind(this)} />
                        :
                        <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} submitBtnMethod={this._SubmitClick.bind(this)} />
                    }
                </div>
            </div>
        );
    }

    private async GetRequest9AvailableClientsXML() {
        // Calm query for request 9 grid data.
        let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
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
            <RowLimit>5000</RowLimit>
            <Query>
                <Where>
                    <And>
                        <Or>
                            <Eq><FieldRef Name="CustomerType" /><Value Type="Text">legal client</Value></Eq>
                            <Eq><FieldRef Name="CustomerType" /><Value Type="Text">parent client</Value></Eq>
                        </Or>
                        <Or>
                            <IsNull><FieldRef Name='ParentClient' /></IsNull>
                            <Eq><FieldRef Name="ParentClient" /><Value Type="Text">Template External</Value></Eq>
                        </Or>
                    </And>
                </Where>
                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>
            </Query>
            </View>`;

        return viewXML;
    }

    private async GetRequest11AvailableClientsXML() {
        // Calm query for request 11 grid data.
        let viewXML = `<View>
            <ViewFields>
                <FieldRef Name="ID"></FieldRef>
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
            <RowLimit>5000</RowLimit>
            <Query>
                <Where>
                <And>
                    <Neq>
                        <FieldRef Name='MaconomyAccountID' />
                        <Value Type='Text'>`+ this.props.approvalData["maconomyAccountID"] + `</Value>
                    </Neq>
                    <Or>
                        <IsNull><FieldRef Name='ParentClient' /></IsNull>
                        <Or>
                            <Eq><FieldRef Name="ParentClient" /><Value Type="Text">`+ this.props.approvalData["maconomyAccountID"] + `</Value></Eq>
                            <Eq><FieldRef Name="ParentClient" /><Value Type="Text">Template External</Value></Eq>
                        </Or>
                    </Or>
                </And>
                </Where>
                <OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy>
            </Query>
            </View>`;

        return viewXML;
    }

    private async BindAvailableClientsGridData() {
        /// <summary>Fetch data for datatable.</summary>
        try {
            let viewXML;
            if (this.isRequest9) {
                viewXML = await this.GetRequest9AvailableClientsXML();
            } else {
                viewXML = await this.GetRequest11AvailableClientsXML();
            }

            // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });
            var tempItems = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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
                if (this.isRequest9) {
                    if (((item.CustomerType == "legal client") || (item.CustomerType == "parent client") && (item.ParentClient == null) || (item.ParentClient == "Template External")) && isAccessLevelPresent) {
                        tempDataArray.push(item);
                    }
                }
                else {
                    if ((item.MaconomyAccountID != this.props.approvalData["MaconomyAccountID"]) && ((item.ParentClient == null) || (item.ParentClient == "Template External" || item.ParentClient == this.props.approvalData["MaconomyAccountID"])) && isAccessLevelPresent) {
                        tempDataArray.push(item);
                    }
                }

            });
            tempDataArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));

            var data = tempDataArray;

            if (data !== null) {
                let tempArray: IClientDetails[] = [];

                data.forEach(element => {
                    let isSelected = false;
                    let reqType: string;
                    let tempAssignedClient = this.state.assignedClientsArray.filter((assignedClient) => { return assignedClient.MaconomyAccountID === element["MaconomyAccountID"] });
                    if (tempAssignedClient.length > 0) {
                        isSelected = true;
                    }

                    if (element['CustomerType'] === "parent client") {
                        reqType = 'pcl';
                    } else {
                        reqType = 'cl'
                    }

                    tempArray.push({
                        Action: <Checkbox defaultChecked={isSelected} key={element["MaconomyAccountID"]} value={element["MaconomyAccountID"]} onChange={this.SelectClient.bind(this, element["MaconomyAccountID"], element["Title"])} />,
                        Link: <a onClick={(e) => { e.preventDefault(); window.open(this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=" + reqType, '_blank') }} href=''>{strings.Grid_LinkHeader}</a>,
                        Type: element["CustomerType"],
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
                    availableClientsArray: cloneDeep(tempArray)
                }, () => {
                    let tempAssignedClients = this.state.assignedClientsArray;
                    let tempAvailableClientsArray = this.state.availableClientsArray;
                    let tempPreviousClientArray = this.state.previousAssignedClients;

                    for (let client = 0; client < tempAssignedClients.length; client++) {
                        let tempSelectedClient = tempAvailableClientsArray.filter(availableClients => { return availableClients.MaconomyAccountID === tempAssignedClients[client].MaconomyAccountID });

                        if (tempSelectedClient.length > 0) {
                            tempAssignedClients[client].SocialName = tempSelectedClient[0].SocialName;
                        } else {
                            tempAssignedClients.splice(client, 1);
                        }
                    }

                    if (!this.isRequest9) {
                        for (let client = 0; client < tempPreviousClientArray.length; client++) {
                            let tempPreviousAssignedClient = tempAvailableClientsArray.filter((availableClient) => { return availableClient.MaconomyAccountID === tempPreviousClientArray[client].MaconomyAccountID });
                            if (tempPreviousAssignedClient.length > 0) {
                                tempPreviousClientArray[client].SocialName = tempPreviousAssignedClient[0].SocialName;
                            }
                        }

                        this.setState({
                            assignedClientsArray: tempAssignedClients,
                            previousAssignedClients: tempPreviousClientArray
                        });
                    } else {
                        this.setState({
                            assignedClientsArray: tempAssignedClients
                        });
                    }
                });
            }
        } catch (error) {
            console.log("Grid Data--->", error);

        }
    }

    private async BindAssignedClients() {
        try {
            /// <summary>Fetch data for assigned clients.</summary>

            var data = this.props.section1Data.assignedClientsArray

            if (data !== null) {
                let tempAssignedClients = this.state.assignedClientsArray;
                let tempPreviousClients = [];

                data.forEach(element => {
                    let clientPresent = this.state.assignedClientsArray.filter((assignedClient) => { return assignedClient.MaconomyAccountID === element["MaconomyAccountID"] });
                    if (clientPresent.length === 0) {
                        tempAssignedClients.push({
                            MaconomyAccountID: element["MaconomyAccountID"],
                            SocialName: ''
                        });
                    }

                    tempPreviousClients.push({
                        MaconomyAccountID: element["MaconomyAccountID"],
                        SocialName: ''
                    });
                });
                this.setState({
                    assignedClientsArray: tempAssignedClients,
                    previousAssignedClients: tempPreviousClients
                });
            }
        } catch (error) {
            console.log("bind assigned clients--->", error);
        }
    }

    private SelectClient(macId, socialName, event: React.FormEvent<HTMLElement>, isChecked: boolean) {
        // <summary>Event called on select client.</summary>
        try {
            let tempAssignedClients = this.state.assignedClientsArray;
            let tempAvailableClientsArray = this.state.availableClientsArray;
            let tempAvailableClient = tempAvailableClientsArray.filter((availableClient) => { return availableClient.MaconomyAccountID === macId });

            if (isChecked) {
                tempAssignedClients.push({ MaconomyAccountID: macId, SocialName: socialName });
                if (tempAvailableClient.length > 0) {
                    var index = tempAvailableClientsArray.indexOf(tempAvailableClient[0]);
                    tempAvailableClientsArray[index].Action = <Checkbox key={tempAvailableClient[0].MaconomyAccountID} defaultChecked={true} value={tempAvailableClient[0].MaconomyAccountID} onChange={this.SelectClient.bind(this, tempAvailableClient[0].MaconomyAccountID, tempAvailableClient[0].SocialName)} />;
                    tempAvailableClientsArray[index] = tempAvailableClient[0];
                }
            } else {
                let deSelectClient = tempAssignedClients.filter((assignedClient) => { return assignedClient.MaconomyAccountID === macId });
                if (deSelectClient.length > 0) {
                    let selectedIndex = tempAssignedClients.indexOf(deSelectClient[0]);
                    tempAssignedClients.splice(selectedIndex, 1);
                }
                if (tempAvailableClient.length > 0) {
                    let index = tempAvailableClientsArray.indexOf(tempAvailableClient[0]);
                    tempAvailableClientsArray[index].Action = <Checkbox key={tempAvailableClient[0].MaconomyAccountID} defaultChecked={false} value={tempAvailableClient[0].MaconomyAccountID} onChange={this.SelectClient.bind(this, tempAvailableClient[0].MaconomyAccountID, tempAvailableClient[0].SocialName)} />;
                    tempAvailableClientsArray[index] = tempAvailableClient[0];
                }
            }
            if (this.props.data !== null && this.props.data !== undefined) {
                this.RendorSelectedClientsList(tempAssignedClients);
            }
            this.setState({
                availableClientsArray: tempAvailableClientsArray,
                assignedClientsArray: tempAssignedClients
            });
        } catch (error) {
            console.log("select client", error);
        }
    }

    private RendorSelectedClientsList(tempSelectedClients) {
        // <summary>Rendor selected clientslist div.</summary>
        const selectedClientsContainer = document.querySelector('#selectedClientsDiv');
        let selectedClientsDiv: any;

        if (this.isRequest9) {
            selectedClientsDiv = (
                <ul className="list-group text-left">
                    {tempSelectedClients.length > 0 ?
                        tempSelectedClients.map(client => {
                            return (
                                <li className="list-group-item">
                                    <strong> {client.MaconomyAccountID} </strong> - {client.SocialName}
                                </li>
                            )
                        })
                        : ''}
                </ul>
            );
        } else {
            const previousAssignedClients = this.state.previousAssignedClients;
            selectedClientsDiv = (
                <ul className="list-group text-left">
                    {previousAssignedClients.length > 0 ?
                        previousAssignedClients.map(client => {
                            let tempClient = tempSelectedClients.filter((assignedClient) => { return assignedClient.MaconomyAccountID === client.MaconomyAccountID });
                            let backgroundColor = tempClient.length > 0 ? "list-group-item" : "list-group-item list-group-item-danger";

                            return (
                                <li className={backgroundColor}>
                                    <strong>{client.MaconomyAccountID}</strong> - {client.SocialName}
                                </li>
                            )
                        })
                        : ''}

                    {tempSelectedClients.length > 0 ?
                        tempSelectedClients.map(client => {
                            let tempClient = previousAssignedClients.filter((assignedClient) => { return assignedClient.MaconomyAccountID === client.MaconomyAccountID });
                            return (
                                tempClient.length > 0 ?
                                    null :
                                    <li className="list-group-item list-group-item-success">
                                        <strong>{client.MaconomyAccountID}</strong> - {client.SocialName}
                                    </li>
                            )
                        })
                        : ''}
                </ul>
            );
        }

        ReactDOM.render(selectedClientsDiv, selectedClientsContainer);
    }

    private async _BackClick() {
        /// <summary>Back button event.</summary>
        await this.props.dataChange("commonSectionData", this.state);
        await this.props.backStep();
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperation()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    private async SaveDataOperation() {
        // <summary>validate and save form data</summary>
        if (await this.ValidateCommonSection() === false) {
            return false;
        }
        await this.SaveData();
        return true;
    }

    private async ValidateCommonSection() {
        /// <summary>Validate client selected or not from list.</summary>
        let error = this.state.errors;
        error.selectClient = this.state.assignedClientsArray.length > 0 ? "" : strings.SelectClientMsg;
        this.setState({ errors: error });
        let valid = error.selectClient.length > 0 ? false : true;
        return valid;
    }

    private GetAssignedClientsMacIds(): string {
        /// <summary>Generate string of assigned clients's MaconomyAccountID</summary>
        let tempAssignedClient = this.state.assignedClientsArray;
        let selectedClientsMacIds = [];
        let selectedClientsMacIdsString = '';

        for (let client = 0; client < tempAssignedClient.length; client++) {
            selectedClientsMacIds.push(tempAssignedClient[client].MaconomyAccountID);
        }
        selectedClientsMacIdsString = selectedClientsMacIds.join(',');
        return selectedClientsMacIdsString;
    }

    private async SaveData() {
        // <summary>Save common section data in request list</summary>
        try {
            this.setState({ loading: true });
            var tempData = {
                Child: await this.GetAssignedClientsMacIds()
            };

            if (this.props.itemID > 0) {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
                });
            }
        } catch (error) {
            console.log("save data", error);
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

    //rutvik change
    private async _SaveClick() {
        await setTimeout(() => {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }, 1000);
    }

    private async _SubmitClick() {
        /// <summary>Submit button event.</summary>
        if (await this.ValidateCommonSection()) {
            try {
                this.setState({ loading: true });
                this.requestorID = await Utils.GetCurrentUserId(this.objWeb);

                this.submitData.body = {
                    'RequestID': this.props.itemID.toString(),
                    'Folder': this.props.approvalData.folderPath,
                    'FolderContribute': '',
                    'UpdateReqRead': Constants.EVERYONE_ID.toString(),
                    'UpdateRequestID': this.props.approvalData.updateRequestDataID
                };

                this.submitData.notificationBody = {
                    'RequestID': Utils.GenerateRequestID(this.props.itemID),
                    'RequestUrl': this.props.context.pageContext.web.absoluteUrl + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + this.props.itemID.toString(),
                    'Approval': '',
                    'Comments': '',
                    'Stage': '',
                    'CurrentApprover': '',
                    'Requestor': this.props.approvalData.requestorID.toString(),
                    'RequestType': Constants.REQUESTTYPE_OPTIONS.filter(x => x.text === this.props.approvalData.requestType)[0].key,
                    'OtherCompanyApprovers': '',
                };

                ///Check any changes or not in assigned clients.
                if (!this.isRequest9) {
                    if (this.state.assignedClientsArray.length === this.state.previousAssignedClients.length) {
                        let isAnyUpdate: boolean = false;

                        for (let client = 0; client < this.state.previousAssignedClients.length; client++) {
                            let elementPresent = this.state.assignedClientsArray.filter((assignedClient) => { return assignedClient.MaconomyAccountID === this.state.previousAssignedClients[client].MaconomyAccountID });
                            if (elementPresent.length === 0) {
                                isAnyUpdate = true;
                                break;
                            }
                        }

                        if (isAnyUpdate === false) {
                            let errors = this.state.errors;
                            errors.noUpdate = strings.NoChildUpdate;
                            this.setState({
                                errors: errors,
                                loading: false
                            });
                            return;
                        }
                    }

                    // Check Maconomy Id is present or not
                    let updateRequestDataXML = `<View>
                        <ViewFields>
                            <FieldRef Name="ID"></FieldRef>
                            <FieldRef Name="MaconomyAccountID"></FieldRef>
                        </ViewFields>
                        <RowLimit>1</RowLimit>
                        <Query>
                            <Where>
                                <Eq><FieldRef Name="MaconomyAccountID" /><Value Type="Text">`+ this.props.approvalData.maconomyAccountID + `</Value></Eq>
                            </Where>
                        </Query>
                        </View>`;

                    // let upateRequestData = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME, updateRequestDataXML);
                    var tempItems = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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
                        if (item.MaconomyAccountID == this.props.approvalData.maconomyAccountID && isAccessLevelPresent) {
                            tempDataArray.push(item);
                        }
                    });

                    var upateRequestData = tempDataArray;

                    if (upateRequestData === undefined || upateRequestData === null) {
                        let error = this.state.errors;
                        error.approvalData = strings.NoMaconomyData_Msg;
                        this.setState({ errors: error, loading: false });
                        return;
                    } else {
                        let error = this.state.errors;
                        error.approvalData = '';
                        this.setState({ errors: error });
                    }
                }

                ///Check for selected client proceed with other request or not.
                let viewXMLRequestData = `<View>
                <ViewFields>
                    <FieldRef Name="ID"></FieldRef>
                    <FieldRef Name="RequestType"></FieldRef>
                    <FieldRef Name="Status"></FieldRef>
                    <FieldRef Name="Child"></FieldRef>
                    <FieldRef Name="Submitted"></FieldRef>
                    <FieldRef Name="RequestID"></FieldRef>
                </ViewFields>
                <Query>
                    <Where>
                        <And>
                            <And>
                                <Eq><FieldRef Name="Status"/><Value Type="Text">Open</Value></Eq>
                                <Eq><FieldRef Name="Submitted" /><Value Type="Boolean">1</Value></Eq>
                            </And>
                            <And>
                                <Or>
                                    <Eq><FieldRef Name="RequestType" /><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[2].text + `</Value></Eq>
                                    <Eq><FieldRef Name="RequestType" /><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[4].text + `</Value></Eq>
                                </Or>
                                <IsNotNull><FieldRef Name="Child"></FieldRef></IsNotNull>
                            </And>
                        </And>
                    </Where>
                </Query>
                </View>`;

                // let requestItem = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXMLRequestData });
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
                    if ((tempItem.Submitted == true && tempItem.Status == "Open") && (tempItem.Child != null && (tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[2].text || tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[4].text)) && isAccessLevelPresent) {
                        tempArray.push(tempItem);
                    }
                });

                let requestItem = tempArray;

                if (requestItem.length > 0) {
                    let duplicateSelectedClientsMsgArray = [];
                    let requestsArray = [];

                    let allSelectedMacIds = [];

                    requestItem.forEach(element => {
                        if (Utils.CheckRequiredField(element["Child"]) !== false) {
                            requestsArray.push({
                                requestID: element["RequestID"],
                                Child: element["Child"]
                            });
                        }

                        let tempIds = element["Child"].split(',');
                        for (let count = 0; count < tempIds.length; count++) {
                            allSelectedMacIds.push(tempIds[count]);
                        }
                    });
                    allSelectedMacIds = allSelectedMacIds.filter(function (item, index, inputArray) {
                        return inputArray.indexOf(item) == index;
                    });

                    let tempAssignedClient = this.state.assignedClientsArray;
                    let tempMacId = [];
                    let tempMacIdString = '';
                    let duplicateSelectedClients = [];

                    for (let client = 0; client < tempAssignedClient.length; client++) {
                        tempMacId = allSelectedMacIds.filter((macId) => { return macId === tempAssignedClient[client].MaconomyAccountID });
                        if (tempMacId.length > 0) {
                            tempMacIdString = tempMacId[0];
                            duplicateSelectedClients.push(tempMacIdString);
                        }
                    }
                    let errors = this.state.errors;
                    if (duplicateSelectedClients.length > 0 && this.props.itemID === 0) {
                        for (let client = 0; client < duplicateSelectedClients.length; client++) {
                            let duplicateRequests = requestsArray.filter((request) => {
                                const tempChildArray = request.Child.split(',');
                                tempMacId = tempChildArray.filter((child) => { return child === duplicateSelectedClients[client] });
                                return tempMacId.length > 0
                            });

                            if (duplicateRequests.length > 0) {
                                let tempReqIds = [];
                                for (let dupReq = 0; dupReq < duplicateRequests.length; dupReq++) {
                                    tempReqIds.push(duplicateRequests[dupReq].requestID);
                                }
                                duplicateSelectedClientsMsgArray.push(duplicateSelectedClients[client] + ' - Request ID: ' + tempReqIds.join(','));
                            }
                        }

                        errors.approvalData = strings.Valid_Req_Submit_SelectedClients + duplicateSelectedClientsMsgArray.join(', ');
                        this.setState({
                            errors: errors,
                            loading: false
                        });
                        return;
                    } else {
                        errors.approvalData = '';
                        this.setState({ errors: errors });
                    }
                }

                // Get selected clients macIds in string 
                let selectedClientsMacIdsString = await this.GetAssignedClientsMacIds();
                this.submitData.data = {
                    Submitted: true,
                    SubmittedDate: new Date(Date.now()),
                    Child: selectedClientsMacIdsString,
                    Status: strings.Status[0],
                    //rutvik change
                    //CR change - 25/10/2021 - start
                    StatusIndicator: "Submitted"
                    //CR change - 25/10/2021 - end
                };

                let returnData = await Utils.GetSubmitDetails(this.submitData, strings, this.props.approvalData, this.requestorID, this.objWeb, this.serverRelativeURL, this.state.requestorid); //shraddha task 4

                if (returnData !== null) {
                    this.submitData = returnData;
                    let errors = this.state.errors;
                    errors.approvalData = "";
                    this.setState({ errors: errors });
                } else {
                    let errorsObj = this.state.errors;
                    errorsObj.approvalData = strings.ApprovalNotFoundMsg;
                    this.setState({ errors: errorsObj, loading: false });
                    return;
                }

                //rutvik task 9
                var queryParameters = new UrlQueryParameterCollection(window.location.href);
                if (queryParameters.getValue("itemID")) {
                    let id: number = parseInt(queryParameters.getValue("itemID"));
                    let currentUSerID = await Utils.GetCurrentUserId(this.objWeb);
                    if (this.props.listData.RequestorId === currentUSerID) {
                        let recordSaved = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.filter(`ID eq ${this.props.listData.ID}`).getAll();
                        if (recordSaved.length !== 0) {
                            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.UPDATEREQUESTLISTLEVEL1).items.getById(this.props.listData.ID).recycle();
                        }
                    }
                }

                if (this.props.itemID > 0) {
                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(this.submitData.data).then((res) => {
                    });
                }

                if (!this.props.itemSubmitted || returnData !== null) { //shraddha change
                    //await Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.body), this.props.permissionMSFlowUrl);                    
                    // Jaymin Change	
                    var tempBody = {
                        Title: this.props.itemID.toString(),
                        FolderPath: this.props.approvalData.folderPath === undefined ? "" : this.props.approvalData.folderPath.toString(),
                        FolderContribute: this.submitData.body["FolderContribute"].concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                        UpdateReqRead: Constants.EVERYONE_ID.toString(),
                        UpdateRequestID: this.props.approvalData.updateRequestDataID === undefined ? "" : this.props.approvalData.updateRequestDataID.toString(),
                        FolderRead: this.submitData.body["FolderRead"],
                        ReqRead: this.submitData.body["ReqRead"],
                        ReqContribute: this.submitData.body["ReqContribute"].concat(',', Constants.FHDUserGroupID) //R FHD change 19-9-2023
                    };
                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);
                    await Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.notificationBody), this.props.sendNotificationMSFlowUrl);
                }
                setTimeout(() => {
                    window.location.href = this.props.context.pageContext.web.absoluteUrl;
                }, 1000);
            } catch (e) {
                console.log("submit request:", e);
                this.setState({ loading: false });
            }
        }
    }
}