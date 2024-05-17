import * as React from 'react';
import { ISection1Props, ISection1State } from './ISection1Props';
import * as strings from 'ClientRequestsWebPartStrings';

import ClipLoader from "react-spinners/ClipLoader";
import { Web } from 'sp-pnp-js';

import CardFooter from '../../common/CardFooter/CardFooter';
import CompanySection from '../../common/CompanySection/CompanySection';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';

export default class Section1 extends React.Component<ISection1Props, ISection1State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private companySectionRef: any;

    constructor(props: ISection1Props) {
        super(props);
        this.state = {
            dpCompany: '',
            countryOfCompany: '', //rutvik 13-3-24
            loading: true,
            rbtnWorkflowType: 'Standard',
            requestor: 0,
            itemID: 0,
            office: '',
            folderPath: '',
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
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
                countryOfCompany: this.props.listData["CountryOfCompany"], //rutvik 13-3-24
                rbtnWorkflowType: this.props.listData["WorkflowType"],
                folderPath: this.props.listData["FolderPath"],

            });
        }


        if (this.props.data !== null) {
            this.setState({ ...this.props.data });
        }
        if (this.props.data === null || this.props.data === undefined) {
            this.setState({ loading: false });
        }

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
                <div className="card-primary card-responsible text-center d-table w-auto m-auto" style={{ position: "relative" }}>
                    <div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
                        <ClipLoader
                            css={Constants.LOADING_CSS}
                            size={50}
                            color={Constants.LOADER_COLOR}
                            loading={this.state.loading}
                        />
                    </div>
                    {/* <!-- card-header ======================== --> */}
                    <div className="card-header">
                        <h3 className="border-0 pl-0">{strings.Sec1Question}
                        </h3>
                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body">
                        <CompanySection ref={this.companySectionRef} isDisable={this.checkIfFieldDisabled("dpCompany")} {...this.props} dpCompany={this.state.dpCompany} countryOfCompany={this.state.countryOfCompany} isWorkflowTypeNeeded={true} rbtnWorkflowType={this.state.rbtnWorkflowType} setLoader={this.SetLoader.bind(this)} requestType={strings.RequestType[0]} accessLevel={this.props.accessLevel} />
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
                RequestorId: this.props.listData != null || this.props.listData != undefined ? this.props.listData.RequestorId : this.state.requestor, //R 29-3-23 exception vendor,
                Office: this.state.office,
                WorkflowType: data.rbtnWorkflowType,
                RequestID: Utils.GenerateRequestID(this.state.itemID),
                Status: strings.Status[0],
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
                    FolderContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID), //FHD change 19-9-23
                    ReqRead: "",
                    ReqContribute: this.state.requestor.toString().concat(',', Constants.FHDUserGroupID) //FHD change 19-9-23
                };

                // Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);	
                await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);

                //Utils.CallMSFlow(this.props.context, body, this.props.permissionMSFlowUrl);
            }
        } catch (error) {
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
        finally {

        }
    }

    private SetLoader(status: boolean) {
        if (this.props.data !== null && this.props.data !== undefined) {
            this.setState({ loading: status });
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
                });
                await this.props.dataChange("countryOfCompany", this.state.countryOfCompany); //rutvik 13-3-2024
                this.props.nextStep();
            });
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
        if (data === null) {
            this.setState({ loading: false }); //9-2-23
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
}