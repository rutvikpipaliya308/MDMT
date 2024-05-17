import * as React from 'react';
import { ISection1Props, ISection1State } from './ISection1Props';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";
import { Web } from 'sp-pnp-js';
import DataTable from 'react-data-table-component';
import { Icon, Label } from 'office-ui-fabric-react';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import DataTableExtensions from 'react-data-table-component-extensions';
import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

const columns = [
    {
        name: strings.Req8_GridHeader[0],
        selector: 'Action',
        maxWidth: '80px',
        width: '80px'
    },
    {
        name: strings.Req8_GridHeader[1],
        selector: 'ClientCompanyNo',
        sortable: true,
        minWidth: '180px',

    },
    {
        name: strings.Req8_GridHeader[2],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
        minWidth: '200px',

    },
    {
        name: strings.Req8_GridHeader[3],
        selector: 'Country',
        sortable: true,
        wrap: true,
        minWidth: '200px',

    },
    {
        name: strings.Req8_GridHeader[4],
        selector: 'ClientContact',
        sortable: true,
        minWidth: '200px',
        wrap: true,

    },
    {
        name: strings.Req8_GridHeader[5],
        selector: 'Phone',
        sortable: true,
        wrap: true,
        minWidth: '150px',

    },
    {
        name: strings.Req8_GridHeader[6],
        selector: 'Email',
        sortable: true,
        wrap: true,
        minWidth: '200px',

    },
    {
        name: strings.Req8_GridHeader[7],
        selector: 'ClientRelationMgr',
        sortable: true,
        minWidth: '220px',
        wrap: true,

    },
    {
        name: strings.Req8_GridHeader[8],
        selector: 'Sector',
        sortable: true,
        wrap: true,
        minWidth: '200px',
    },
    //rutvik 20-7 25
    // {
    //     name: strings.Req8_GridHeader[9],
    //     selector: 'ClientStatus',
    //     sortable: true,
    //     wrap: true,
    //     minWidth: '120px',
    // },
    //endr
    {
        name: strings.Req8_GridHeader[10],
        selector: 'ClientType',
        sortable: true,
        wrap: true,
        minWidth: '120px',
    }
];

export default class Section1 extends React.Component<ISection1Props, ISection1State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private companySectionRef: any;

    constructor(props: ISection1Props) {
        super(props);
        this.state = {
            requestsArray: [],
            selectCompanyContactNo: '',
            dpCompany: '',
            loading: true,
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            currentUserid: '',
            requestorid: '',
            countryOfCompany: '', //rutvik 13-3-24
            errors: {
                selectCompanyContact: '',
                requestExists: '',
                noMaconomyData: ''
            },
        };
        this.companySectionRef = React.createRef<CompanySection>();
    }

    public async componentWillMount() {
        if (this.props.data === null || this.props.data === undefined) {
            this.setState({
                requestor: await Utils.GetCurrentUserId(this.objWeb),
                office: await Utils.GetCurrentUserOffice(this.objWeb, this.props.context),
            });

            if (this.props.companyNo !== null || this.props.companyNo !== undefined) {
                this.setState({
                    selectCompanyContactNo: this.props.companyNo
                });
            }
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
                countryOfCompany: this.props.listData["CountryOfCompany"], //rutvik 13-3-24
                rbtnWorkflowType: this.props.listData["WorkflowType"],
                folderPath: this.props.listData["FolderPath"],
                selectCompanyContactNo: this.props.listData["ContactCompanyNo"],

            });
        }

        if (this.props.data !== null) {
            this.setState({ ...this.props.data });
        }

        await this.LoadData();

        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //Shraddha 08-08-22 item 4 end
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
                        <CompanySection isDisable={this.checkIfFieldDisabled("dpCompany")} ref={this.companySectionRef} {...this.props} dpCompany={this.state.dpCompany} isWorkflowTypeNeeded={true} rbtnWorkflowType={this.state.rbtnWorkflowType} setLoader={this.SetLoader.bind(this)} requestType={strings.RequestType[1]} accessLevel={this.props.accessLevel} countryOfCompany={this.state.countryOfCompany} />

                        {this.props.companyNo ? null : <div className="card-header text-center"><h3 className="border-0 pl-0">{strings.Lbl_SelectCompanyContact}</h3></div>}
                        {this.props.companyNo ? null : <div className="grid-table" style={{ position: "relative", }}>
                            <DataTableExtensions
                                data={this.state.requestsArray}
                                columns={columns}
                                print={false}
                                export={false}
                                filterHidden={false}>
                                <DataTable
                                    className="table"
                                    data={this.state.requestsArray}
                                    columns={columns}
                                    responsive={true}
                                    pagination={true}
                                    paginationComponentOptions={{ noRowsPerPage: true }}
                                    paginationPerPage={10}
                                    noHeader={true}
                                    persistTableHead={true}
                                    noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordMSG}</label></div>}
                                    sortIcon={<Icon iconName="SortDown" />}
                                    onChangePage={this.selectRadio.bind(this)}
                                    onSort={this.selectRadio.bind(this)}
                                    noContextMenu={true}
                                />
                            </DataTableExtensions>
                        </div>}
                        {this.state.errors.selectCompanyContact.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage text-left" >{this.state.errors.selectCompanyContact} </Label>
                        </span> : null}
                        {this.state.selectCompanyContactNo !== '' && this.state.selectCompanyContactNo !== null ?
                            <div className="alert alert-warning mt-3" role="alert">  <Label className="text-left" >{strings.YouHaveSelectedText} <strong>{this.state.selectCompanyContactNo}</strong> - {this.state.requestsArray.filter((e) => { return e.ClientCompanyNo === this.state.selectCompanyContactNo })[0] !== undefined ? this.state.requestsArray.filter((e) => { return e.ClientCompanyNo === this.state.selectCompanyContactNo })[0].SocialName : ''} </Label></div> : ""}

                        {/* Show error message for request is already exists or not */}
                        {Utils.CheckRequiredField(this.state.errors.requestExists) === true ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.requestExists} </Label>
                        </div> : null}

                        {this.state.errors.noMaconomyData !== '' && this.state.selectCompanyContactNo === '' ? <div className="alert alert-danger mt-3" role="alert">
                            <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.noMaconomyData} </Label>
                        </div> : null}

                    </div>
                    {/* <!-- card-footer========================= --> */}
                    <CardFooter {...this.props} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div>
            </div>);
    }

    private checkIfFieldDisabled(tagID) {
        let listOfEditableFieldsSection1 = this.props.listOfEditableFields;

        //Shraddha 08-08-22 item 4
        let currentuser = this.state.currentUserid;
        let requestorid = this.state.requestorid;

        if (this.props.itemSubmitted) { //R fhd change 20-9
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


    private SetLoader(status: boolean) {
        //<summary>set loader value from parameter</summary>
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
        }
    }

    private async LoadData() {
        /// <summary>Fetch data for datatable.</summary>
        this.setState({ loading: true });
        let viewXML = `<View>
                        <ViewFields>
                        <FieldRef Name="ID"></FieldRef>
                        <FieldRef Name="Title"></FieldRef>
                        <FieldRef Name="MaconomyAccountID"></FieldRef>
                        <FieldRef Name="Country"></FieldRef>
                        <FieldRef Name="ClientAttentionName"></FieldRef>
                        <FieldRef Name="PhoneNo"></FieldRef>
                        <FieldRef Name="Email"></FieldRef>
                        <FieldRef Name="ClientRelationshipMgr"></FieldRef>
                        <FieldRef Name="Sector"></FieldRef>                        
                        <FieldRef Name="ClientType"></FieldRef>
                        <FieldRef Name="ClientCompanyNo"></FieldRef>
                        </ViewFields>
                        <RowLimit>5000</RowLimit><Query><Where>
                        <And>
                            <IsNull><FieldRef Name="MaconomyAccountID"></FieldRef></IsNull>
                            <IsNotNull><FieldRef Name="ClientCompanyNo"></FieldRef></IsNotNull>
                        </And>    
                        </Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>`;

        // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CONTACTCOMPANY_INTERNALANAME).getItemsByCAMLQuery({ ViewXml: viewXML });
        var tempData = await this.objWeb.lists.getByTitle(Constants.CONTACTCOMPANY_INTERNALANAME).items.select().getAll();
        let tempArray = [];
        tempData.filter((item) => {
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
            if (item.MaconomyAccountID == null && item.ClientCompanyNo != null && isAccessLevelPresent) {
                tempArray.push(item);
            }
        });

        tempArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
        var data = tempArray;

        if (data !== null) {
            let tempValueArray = [];
            await data.forEach(async element => {
                var canEditGrid = false;
                if (this.props.listData) {
                    if (this.props.listData.Submitted) {
                        canEditGrid = true;
                    }
                }
                tempValueArray.push({
                    Action: <input type="radio" disabled={canEditGrid} className="companyClient" checked={this.state.selectCompanyContactNo === element['ClientCompanyNo']} name="companyClient" value={element['ClientCompanyNo']} onClick={this.SelectCompanyContact.bind(this, element['ClientCompanyNo'])} ></input>,
                    MaconomyAccountID: element["MaconomyAccountID"],
                    SocialName: element["Title"],
                    Country: element["Country"],
                    ClientContact: element["ClientAttentionName"],
                    Phone: element["PhoneNo"],
                    Email: element["Email"],
                    ClientRelationMgr: element["ClientRelationshipMgr"],
                    Sector: element["Sector"],
                    //rutvik 20-7 25
                    //ClientStatus: element["ClientStatus"],
                    //endr
                    ClientType: element["ClientType"],
                    MacID: element['MaconomyAccountID'],
                    ClientCompanyNo: element["ClientCompanyNo"]
                });
            });
            this.setState({ ...this.state, requestsArray: tempValueArray });

            if (this.props.listData !== null && this.props.data === null) {

                let upateRequestData = this.state.requestsArray.filter((client) => { return client.ClientCompanyNo === this.props.listData["ContactCompanyNo"] })[0];
                if (upateRequestData === undefined || upateRequestData === null) {
                    let error = this.state.errors;
                    error.noMaconomyData = strings.NoMaconomyContactCompanyClient_Msg[0] + this.props.listData["ContactCompanyNo"] + strings.NoMaconomyContactCompanyClient_Msg[1];
                    this.setState({ errors: error, selectCompanyContactNo: '' });
                } else {
                    let error = this.state.errors;
                    error.noMaconomyData = '';
                    this.setState({ errors: error });
                }
            }
        }
        this.setState({ loading: false });
    }

    private SelectCompanyContact(companyContactNo: string): void {
        // <summary>Event called on select SelectCompanyContact.</summary>
        let errors = this.state.errors;
        errors.noMaconomyData = '';
        this.setState({
            ...this.state,
            selectCompanyContactNo: companyContactNo,
            errors: errors
        }, () => {
            this.selectRadio();
        });

        //rutvik validate change        
        errors.selectCompanyContact = '';
        this.setState({ errors: errors });
        //end
    }

    private selectRadio(): void {
        // <summary>Event called on page change.</summary>
        let tempCompanyArray = this.state.requestsArray;
        for (let company = 0; company < tempCompanyArray.length; company++) {
            if (tempCompanyArray[company].ClientCompanyNo === this.state.selectCompanyContactNo) {
                tempCompanyArray[company].Action = <input type="radio" className="companyClient" checked={true} name="companyClient" value={tempCompanyArray[company].ClientCompanyNo} onClick={this.SelectCompanyContact.bind(this, tempCompanyArray[company].ClientCompanyNo)} ></input>;
            }
            else {
                tempCompanyArray[company].Action = <input type="radio" className="companyClient" checked={false} name="companyClient" value={tempCompanyArray[company].ClientCompanyNo} onClick={this.SelectCompanyContact.bind(this, tempCompanyArray[company].ClientCompanyNo)} ></input>;
            }
        }
        this.setState({
            requestsArray: cloneDeep(tempCompanyArray),
        });

    }

    private async SaveData(data: any) {
        /// <summary>Save data in list.</summary>
        try {
            //change start - 25-1-22
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
                CountryOfCompany: data.countryOfCompany, //rutvik 13-3-24
                RequestType: Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text,
                RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor, //R 29-3-23 exception vendor
                Office: this.state.office,
                WorkflowType: data.rbtnWorkflowType,
                RequestID: Utils.GenerateRequestID(this.state.itemID),
                Status: strings.Status[0],
                ContactCompanyNo: this.state.selectCompanyContactNo,
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

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update(tempData).then((res) => {
                });
            } else {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.add(tempData).then(async (res) => {
                    this.setState({
                        itemID: res.data.Id,
                    });
                });
                let folderPath: string = await Utils.CreateAttachmentFolder(this.objWeb, this.serverRelativeURL, this.state.itemID);

                this.setState({ folderPath: folderPath });

                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.state.itemID).update({ RequestID: Utils.GenerateRequestID(this.state.itemID), FolderPath: folderPath, }).then((res) => {
                });

                const body: string = JSON.stringify({
                    'RequestID': this.state.itemID.toString(),
                    'Folder': folderPath,
                    'FolderRead': '',
                    'FolderContribute': this.state.requestor.toString(),
                    'ReqRead': '',
                    'ReqContribute': this.state.requestor.toString()
                });

                //jaymin change
                var tempBody = {
                    Title: this.state.itemID.toString(),
                    FolderPath: folderPath,
                    FolderRead: "",
                    FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                    ReqRead: "",
                    ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID) //R FHD change 19-9-2023
                };

                // Utils.CallMSFlow(this.props.context, body, Constants.PERMISSION_MSFLOW_URL);
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
                    "contactCompanyNo": this.state.selectCompanyContactNo
                });
                await this.props.dataChange("countryOfCompany", this.state.countryOfCompany); //rutvik 13-3-2024
                this.props.nextStep();
            });
        } else {
            this.setState({ loading: false }); //9-2-23
        }
    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button click event.</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    private async SaveDataOperations() {
        /// <summary>Validate and save data operations.</summary>
        let data = this.companySectionRef.current.ValidateCompanySection();
        let errors = this.state.errors;
        Utils.CheckRequiredField(this.state.selectCompanyContactNo) === false ? errors.selectCompanyContact = strings.Valid_Req8GridMsg : errors.selectCompanyContact = '';

        this.setState({ errors: errors });

        if (data === null || Utils.CheckRequiredField(this.state.selectCompanyContactNo) === false) {
            return false;
        }
        if (Utils.CheckRequiredField(this.state.errors.noMaconomyData) === true) {
            return false;
        }
        if (await this.CheckIsRequestExists() === true) {
            return false;
        }
        this.setState({
            dpCompany: data.dpCompany,
            countryOfCompany: data.countryOfCompany, //rutvik 13-3-24
            rbtnWorkflowType: data.rbtnWorkflowType,
        });
        await this.SaveData(data);
        return true;
    }

    private async CheckIsRequestExists() {
        let req8XML: string = `<View>
        <ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="Title"></FieldRef>
            <FieldRef Name="ContactCompanyNo"></FieldRef>
            <FieldRef Name="RequestID"></FieldRef>
            <FieldRef Name="RequestType"></FieldRef>
            <FieldRef Name="Status"></FieldRef>
        </ViewFields>
        <RowLimit>1</RowLimit>
        <Query>
            <Where>
                <And>
                    <And>
                        <Eq><FieldRef Name="Status"/><Value Type="Text">Open</Value></Eq>
                        <Eq><FieldRef Name="Submitted"/><Value Type="Boolean">1</Value></Eq>
                    </And>
                    <And>
                        <Eq><FieldRef Name="ContactCompanyNo"/><Value Type="Text">`+ this.state.selectCompanyContactNo + `</Value></Eq>
                        <Eq><FieldRef Name="RequestType"/><Value Type="Text">`+ Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text + `</Value></Eq>
                    </And>
                </And>
            </Where>
        </Query>
        </View>`;

        // let item = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME, req8XML);
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
            if (tempItem.Status == "Open" && tempItem.Submitted == true && tempItem.ContactCompanyNo == this.state.selectCompanyContactNo && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.key === this.props.requestType; })[0].text && isAccessLevelPresent) {
                tempArray.push(tempItem);
            }
        });

        let item = tempArray[0];
        let errors = this.state.errors;
        // if (item !== null && item !== undefined) {
        if (item !== null && item !== undefined && (this.props.listData === null || (this.props.listData != null && this.props.listData.Submitted === false))) {
            errors.requestExists = strings.ClientRequest_RunningMode[0] + item.RequestID + strings.ClientRequest_RunningMode[1];
            this.setState({ errors: errors, loading: false });
            return true;
        } else {
            errors.requestExists = '';
            this.setState({ errors: errors });
            return false;
        }
    }
}