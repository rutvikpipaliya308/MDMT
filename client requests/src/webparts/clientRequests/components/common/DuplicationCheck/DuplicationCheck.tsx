import * as React from 'react';
import { IDuplicationCheckState, IDuplicationcheckProps } from './IDuplicationCheckProps';
import * as strings from 'ClientRequestsWebPartStrings';

import ClipLoader from "react-spinners/ClipLoader";
import { Icon, Label } from 'office-ui-fabric-react';
import { Web } from 'sp-pnp-js';
import DataTable from 'react-data-table-component';

import CardFooter from '../CardFooter/CardFooter';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import DataTableExtensions from 'react-data-table-component-extensions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

require('../../../js/bootstrap.bundle.min.js');
require('../../../css/bootstrap.min.css');

const Columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        sortable: false,
        width: '80px'
    },
    {
        name: strings.DuplicationcheckHeader[0],
        selector: 'MaconomyAccountID',
        sortable: true,
        minWidth: '120px'
    },
    {
        name: strings.DuplicationcheckHeader[8],
        selector: 'Currency',
        sortable: true,
    },
    {
        name: strings.DuplicationcheckHeader[1],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[2],
        selector: 'LegalName',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[3],
        selector: 'Line1',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[4],
        selector: 'Line2',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[5],
        selector: 'Zipcode',
        sortable: true,
        wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[6],
        selector: 'Postal_District_City',
        sortable: true,
        wrap: true,
        minWidth: '150px'
    },
    {
        name: strings.DuplicationcheckHeader[7],
        selector: 'Country',
        sortable: true,
        wrap: true,
    },
    {
        name: strings.DuplicationcheckHeader[9],
        selector: 'TaxRegistrationNo',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DuplicationcheckHeader[10],
        selector: 'Status',
        sortable: true,
    }
];

const Request9_columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        sortable: false,
        width: '80px'
    },
    {
        name: strings.DuplicationcheckHeader[0],
        selector: 'MaconomyAccountID',
        sortable: true,
        minWidth: '120px',
        maxWidth: '150px'
    },
    {
        name: strings.DuplicationcheckHeader[1],
        selector: 'SocialName',
        sortable: true,
        wrap: true,
    }
];

export default class DuplicationCheck extends React.Component<IDuplicationcheckProps, IDuplicationCheckState> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private isRequest9: boolean = this.props.approvalData.requestType === strings.RequestType[2];

    constructor(props: IDuplicationcheckProps) {
        super(props);
        this.state = {
            mainLoading: false,
            requestsArray: [],
            loading: false,
            tbxlegalName: '',
            tbxLine1: '',
            tbxSocialName: '',
            tbxTaxRegNo: '',
            chkTestDuplicate: '',
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                tbxlegalName: '',
                tbxLine1: '',
                tbxTaxRegNo: '',
                tbxSocialName: '',
            },
            itemID: 0
        };
    }

    public componentWillMount() {
        /// <summary>Bind data.</summary>
        if (this.props.listData !== null) {
            this.setState({
                tbxLine1: this.props.listData["Line1"],
                tbxTaxRegNo: this.props.listData["TaxRegistrationNo"],
                tbxlegalName: this.props.listData["LegalName"] === "-" ? '' : this.props.listData["LegalName"], //rutvik
                tbxSocialName: this.props.listData["Title"]
            });
        }
        if (this.props.data !== null) {
            this.setState({ ...this.props.data });
        }
        this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
    }

    public async componentDidMount() {
        /// <summary>Bind datatable.</summary>
        if (this.isRequest9) {
            this.LoadData();
        } else {
            if (Utils.CheckRequiredField(this.state.tbxLine1) && Utils.CheckRequiredField(this.state.tbxTaxRegNo) && Utils.CheckRequiredField(this.state.tbxlegalName)) {
                this.LoadData();
            }
        }

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //Shraddha 08-08-22 item 4 end
    }

    public render(): React.ReactElement<IDuplicationcheckProps> {
        return (
            <div className="container-fluid" style={{ position: "relative" }}>
                {/* <!-- card-primary ===================== --> */}
                <div className="loading-css" style={{ display: this.state.mainLoading ? "block" : "none" }}>
                    <ClipLoader
                        css={Constants.LOADING_CSS}
                        size={50}
                        color={Constants.LOADER_COLOR}
                        loading={this.state.mainLoading}
                    />
                </div>
                <div className="card-primary">
                    <div className="card-header">
                        <h3 className="">{strings.Section2Title}</h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        {/* <!-- Name ====================================== --> */}
                        {this.isRequest9 ?
                            <div className="row">
                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <label>{strings.Lbl_SocialName}<sub>*</sub></label>
                                    <input id="tbxSocialName" disabled={this.checkIfFieldDisabled("tbxSocialName")} className="form-control" type="text" value={this.state.tbxSocialName} onChange={this._onTbxChange.bind(this)} onKeyUp={this.LoadData.bind(this)} />
                                    {this.state.errors.tbxSocialName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage" >{this.state.errors.tbxSocialName} </Label>
                                    </span> : null}
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <h6>{strings.Lbl_Name}</h6>
                                    <label>{strings.Lbl_LegalName}<sub>*</sub></label>
                                    <input id="tbxlegalName" disabled={this.checkIfFieldDisabled("tbxlegalName")} className="form-control" type="text" value={this.state.tbxlegalName} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} onKeyUp={this.LoadData.bind(this)} />
                                    {this.state.errors.tbxlegalName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage" >{this.state.errors.tbxlegalName} </Label>
                                    </span> : null}
                                </div>

                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <h6>{strings.Lbl_Address}</h6>
                                    <label>{strings.Lbl_Line1}<sub>*</sub></label>
                                    <input id="tbxLine1" disabled={this.checkIfFieldDisabled("tbxLine1")} className="form-control" type="text" value={this.state.tbxLine1} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} onKeyUp={this.LoadData.bind(this)} />
                                    {this.state.errors.tbxLine1.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage" >{this.state.errors.tbxLine1} </Label>
                                    </span> : null}
                                </div>

                                <div className="form-group col-sm-6 col-md-6 col-lg-4">
                                    <h6>{strings.Lbl_TaxInformation}</h6>
                                    <label>{strings.Lbl_TaxRegNo}<sub>*</sub></label>
                                    <input id="tbxTaxRegNo" disabled={this.checkIfFieldDisabled("tbxTaxRegNo")} className="form-control" type="text" value={this.state.tbxTaxRegNo} placeholder="" maxLength={255} onChange={this._onTbxChange.bind(this)} onKeyUp={this.LoadData.bind(this)} />
                                    {this.state.errors.tbxTaxRegNo.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage" >{this.state.errors.tbxTaxRegNo} </Label>
                                    </span> : null}
                                </div>
                            </div>
                        }
                        <div className="grid-table" style={{ position: "relative" }}>
                            <div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
                                <ClipLoader
                                    css={Constants.LOADING_CSS}
                                    size={50}
                                    color={Constants.LOADER_COLOR}
                                    loading={this.state.loading}
                                />
                            </div>
                            <DataTableExtensions
                                data={this.state.requestsArray}
                                columns={this.isRequest9 ? Request9_columns : Columns}
                                print={false}
                                export={false}
                                filterHidden={false}>
                                <DataTable
                                    className="table"
                                    data={this.state.requestsArray}
                                    columns={this.isRequest9 ? Request9_columns : Columns}
                                    responsive={true}
                                    pagination={true}
                                    paginationComponentOptions={{ noRowsPerPage: true }}
                                    paginationPerPage={10}
                                    noHeader={true}
                                    persistTableHead={true}
                                    noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordMSG}</label></div>}
                                    sortIcon={<Icon iconName="SortDown" />}
                                    noContextMenu={true}
                                />
                            </DataTableExtensions>
                        </div>
                    </div>
                    <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} nextBtnMethod={this._NextClick.bind(this)} cancelReqMethod={this._DeleteRequest.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
                </div>
            </div>);
    }

    private async LoadData() {
        /// <summary>Fetch data for datatable.</summary>
        this.setState({ loading: true });
        let viewXML = `<View>
                        <ViewFields>
                        <FieldRef Name="ID"></FieldRef>
                        <FieldRef Name="Title"></FieldRef>
                        <FieldRef Name="MaconomyAccountID"></FieldRef>
                        <FieldRef Name="LegalName"></FieldRef>
                        <FieldRef Name="Line1"></FieldRef>
                        <FieldRef Name="Line2"></FieldRef>
                        <FieldRef Name="Zipcode"></FieldRef>
                        <FieldRef Name="Postal_District_City"></FieldRef>
                        <FieldRef Name="Country"></FieldRef>
                        <FieldRef Name="Currency"></FieldRef>
                        <FieldRef Name="TaxRegistrationNo"></FieldRef>
                        <FieldRef Name="Status"></FieldRef>
                        </ViewFields>
                        <RowLimit>5000</RowLimit><Query><Where>`;

        viewXML += this.props.approvalData.requestType === strings.RequestType[2] ?
            `<And>
                <Eq><FieldRef Name="CustomerType"/><Value Type="Text">parent client</Value></Eq>
                <Contains><FieldRef Name="Title"/><Value Type="Text">`+ this.state.tbxSocialName + `</Value></Contains>
            </And>`
            :
            `<And>
                <Or>
					<And>
						<Neq><FieldRef Name="TaxRegistrationNo" /><Value Type="Text">Not Applicable</Value></Neq>	
						<IsNotNull><FieldRef Name='TaxRegistrationNo' /></IsNotNull> 
					</And>
					<Or>
						<And>
							<Neq><FieldRef Name="LegalName" /><Value Type="Text">Not Applicable</Value></Neq>	
							<IsNotNull><FieldRef Name='LegalName' /></IsNotNull> 
						</And>
						<And>
							<Neq><FieldRef Name="Line1" /><Value Type="Text">Not Applicable</Value></Neq>	
							<IsNotNull><FieldRef Name='Line1' /></IsNotNull> 
						</And>
					</Or>	
				</Or>
            <And> 
                <Eq><FieldRef Name="CustomerType"/><Value Type="Text">legal client</Value></Eq>
                <Or>
                    <Or>
                        <Contains><FieldRef Name="LegalName"/><Value Type="Text">`+ this.state.tbxlegalName + `</Value></Contains>
                        <Contains><FieldRef Name="Line1"/><Value Type="Text">`+ this.state.tbxLine1 + `</Value></Contains>
                    </Or>
                   <Contains><FieldRef Name="TaxRegistrationNo"/><Value Type="Text">`+ this.state.tbxTaxRegNo + `</Value></Contains>
                </Or>
            </And>
            </And>`;

        viewXML += `</Where><OrderBy><FieldRef Name='Title' Ascending='True'></FieldRef></OrderBy></Query></View>`;

        // var data = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: viewXML });

        var tempData = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
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

            if (this.props.approvalData.requestType === strings.RequestType[2]) {
                if (item.CustomerType == "parent client" && isAccessLevelPresent) {
                    if (item.Title != null && item.Title != undefined && item.Title.trim() != "") {
                        if ((this.state.tbxSocialName.trim() != "") && (item.Title.toString().toLowerCase().indexOf(this.state.tbxSocialName.toLowerCase()) > -1)) {
                            tempArray.push(item);
                        }
                    }
                }
            }
            else {
                if ((item.CustomerType == "legal client") && isAccessLevelPresent) {
                    if (((item.TaxRegistrationNo != null) && (item.TaxRegistrationNo != 'Not Applicable')) || ((item.LegalName != null) && (item.LegalName != 'Not Applicable')) || ((item.Line1 != null) && (item.Line1 != 'Not Applicable'))) {
                        let regNo = item.TaxRegistrationNo ? item.TaxRegistrationNo.toLowerCase() : "";
                        let line1 = item.Line1 ? item.Line1.toLowerCase() : "";
                        let legalName = item.LegalName ? item.LegalName.toLowerCase() : "";

                        if ((this.state.tbxTaxRegNo.trim() != "" && regNo.toString().indexOf(this.state.tbxTaxRegNo.toLowerCase().trim()) > -1) || ((this.state.tbxlegalName.trim() != "" && legalName.toString().indexOf(this.state.tbxlegalName.toLowerCase().trim()) > -1) || (this.state.tbxLine1.trim() != "" && line1.toString().indexOf(this.state.tbxLine1.toLowerCase().trim()) > -1))) {
                            tempArray.push(item);
                        }
                    }
                }
            }
        });

        tempArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));

        var data = tempArray

        if (data !== null) {
            let tempValueArray = [];
            data.forEach(async element => {
                let reqType: string;
                if (this.isRequest9) {
                    reqType = 'pcl';
                } else {
                    reqType = 'cl';
                }

                tempValueArray.push({

                    Link: <a onClick={(e) => { e.preventDefault(); window.open(this.serverRelativeURL + Constants.DISPLAY_CLIENTREQUEST_PAGE_URL + "?itemID=" + element['ID'] + "&rqType=" + reqType, '_blank') }} href=''>{strings.Grid_LinkHeader}</a>,
                    MaconomyAccountID: element["MaconomyAccountID"],
                    SocialName: element["Title"], LegalName: element["LegalName"], Line1: element["Line1"], Line2: element["Line2"], Zipcode: element["Zipcode"], Postal_District_City: element["Postal_District_City"], Country: element["Country"], Currency: element["Currency"], TaxRegistrationNo: element["TaxRegistrationNo"], Status: element["Status"]
                });
            });
            this.setState({ requestsArray: tempValueArray });
        }
        this.setState({ loading: false });
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


    private ValidateDuplicationSection(): boolean {
        /// <summary>Validate section 2.</summary>
        let errors = this.state.errors;
        if (this.isRequest9) {
            errors.tbxSocialName = (Utils.CheckRequiredField(this.state.tbxSocialName) === false) ? strings.CantLeaveBlankMsg : "";
        }
        else {
            errors.tbxLine1 = (Utils.CheckRequiredField(this.state.tbxLine1) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxTaxRegNo = (Utils.CheckRequiredField(this.state.tbxTaxRegNo) === false) ? strings.CantLeaveBlankMsg : "";
            errors.tbxlegalName = (Utils.CheckRequiredField(this.state.tbxlegalName) === false) ? strings.CantLeaveBlankMsg : "";
        }
        this.setState({ errors: errors });
        let valid = true;
        Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null; });
        return valid;
    }

    private async SaveData() {
        /// <summary>Save data in list.</summary>
        try {
            this.setState({ mainLoading: true });
            var tempData = null;
            if (this.isRequest9) {
                tempData = {
                    Title: Utils.TrimData(this.state.tbxSocialName),
                };
            }
            else {
                tempData = {
                    Line1: Utils.TrimData(this.state.tbxLine1),
                    LegalName: Utils.TrimData(this.state.tbxlegalName),
                    TaxRegistrationNo: Utils.TrimData(this.state.tbxTaxRegNo),
                    RequestID: Utils.GenerateRequestID(this.props.itemID)
                };
            }

            if (this.props.itemID > 0) {
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
                });
            }
        } catch (error) {
            console.log("duplication save data", error);
            //error log change
            let errordata = {
                Title: new Date(),
                Errors: error,
                RequestID: this.props.itemID
            }
            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata);
            //error log change end
            this.setState({ mainLoading: false });
        }

    }

    private _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>Textbox change event.</summary>

        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });

        //rutvik validate change
        let errors = this.state.errors;
        if (id === "tbxlegalName") errors.tbxlegalName = '';
        if (id === "tbxLine1") errors.tbxLine1 = '';
        if (id === "tbxTaxRegNo") errors.tbxTaxRegNo = '';
        if (id === "tbxSocialName") errors.tbxSocialName = '';
        this.setState({ errors: errors });
        //end

    }

    private async _NextClick() {
        /// <summary>Next button click event.</summary>
        this.setState({ mainLoading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            this.setState({ mainLoading: false }, () => {
                this.props.dataChange("DuplicationSectionData", this.state);
                this.props.nextStep();
            });
        } else {
            this.setState({ mainLoading: false }); //9-2-23
        }
    }

    private async _BackClick() {
        /// <summary>Back button click event.</summary>       
        this.props.dataChange("DuplicationSectionData", this.state);
        this.props.backStep();
    }

    private async _DeleteRequest(event: React.MouseEvent<HTMLElement>) {
        /// <summary>Delete request and documents folder from list.<summary>
        try {
            if (window.confirm(strings.DeleteConfirmationRequest)) {
                this.setState({ mainLoading: true });
                // Delete request.
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).recycle();
                // Delete folder from Attachments.
                if (!this.isRequest9) {
                    await this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).recycle();
                }
                window.location.href = this.props.context.pageContext.web.absoluteUrl;
            }
        } catch (error) {
            this.setState({ mainLoading: false });
            console.log("_DeleteRequest(DuplocationCheck.tsx)-->", error);
        }
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

        if (this.ValidateDuplicationSection() === false) {
            return false;
        }
        await this.SaveData();
        return true;
    }
}