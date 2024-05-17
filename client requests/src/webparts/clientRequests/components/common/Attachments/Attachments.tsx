import * as React from 'react';
import { IAttachmentProps, IAttachmentState, IDocumentDetails, IApprover, ISubmitData } from './IAttachmentsProps';
import * as strings from 'ClientRequestsWebPartStrings';
import { cloneDeep, uniq, isEqual } from '@microsoft/sp-lodash-subset';
import { Web, util } from 'sp-pnp-js';
import ClipLoader from "react-spinners/ClipLoader";
import { initializeIcons, Icon, Label } from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import DataTable from 'react-data-table-component';
import { FileTypeIcon, IconType } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import CardFooter from '../CardFooter/CardFooter';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import DataTableExtensions from 'react-data-table-component-extensions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import * as English from "is-english";

initializeIcons();

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 800 } },
};

const dialogContentProps = {
    type: DialogType.normal,
    title: strings.BtnAddDocumentText,
};

const columns = [
    {
        name: strings.Grid_LinkHeader,
        selector: 'Link',
        width: '80px',

    },
    {
        name: strings.DocumentNameHeader,
        selector: 'DocName',
        wrap: true,
        minWidth: '200px',
        sortable: true,

    },
    {
        name: strings.DocumentDescriptionHeader,
        selector: 'Description',
        sortable: true,
        wrap: true,
        minWidth: '200px'
    },
    {
        name: strings.DocumentTypeHeader,
        selector: 'Doctype',
        minWidth: '150px'
    },
    {
        name: strings.DocumentSizeHeader,
        selector: 'FileSize',
        sortable: true,
        minWidth: '200px'
    },
    {
        name: strings.DeleteHeader,
        selector: 'Delete',
    }
];

export default class Section5 extends React.Component<IAttachmentProps, IAttachmentState> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private rows_selected = [];
    private requestorID;

    private submitData: ISubmitData = {
        data: '',
        approverContribute: [],
        approverRead: [],
        notificationApprovers: [],
        body: '',
        notificationBody: '',
    };

    constructor(props: IAttachmentProps) {
        super(props);
        this.state = {
            mainLoading: false,
            hiddenDialog: true,
            docDescription: '',
            fileInputLable: strings.Lbl_ChooseFile,
            documentsArray: [],
            loading: true,
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                fpDocument: '',
                tbxDescription: '',
                approvalData: '',
            },
            toggledClearRows: false,
            //shraddha task 10
            validationmsg: [],
            //Shraddha 29-09-22 after test
            specialChar: [],
            charString: '',
            isFHDUser: false //R fhd change 20-9-2023
        };
    }

    public render(): React.ReactElement<IAttachmentProps> {
        return (
            <div className="container-xl" style={{ position: "relative" }}>
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
                    {/* <!-- card-header ======================== --> */}
                    <div className="card-header">
                        <div className="row justify-content-between">
                            <div className="col-auto">
                                <h3 className="mb-2">{strings.AttachmentTitle}
                                </h3>
                            </div>
                            <div className="col-auto">

                                <button type="button" className="btn btn-icon btn-secondary mb-2" onClick={this._onBtnDeleteClick.bind(this)}>
                                    <img className="icon" src={require('../../../images/ic-delete.svg')} alt="" /><span>{strings.BtnDeleteText}</span>
                                </button>
                                <button type="button" className="btn btn-primary ml-2 mb-2" onClick={() => this.setState({
                                    hiddenDialog: false,
                                    docDescription: '',
                                    fileInputLable: strings.Lbl_ChooseFile,
                                    errors: {
                                        fpDocument: '',
                                        tbxDescription: '',
                                        approvalData: '',
                                    },
                                })}>
                                    <em>+</em><span>{strings.BtnAddDocumentText}</span>
                                </button>
                            </div>
                        </div>

                    </div>
                    {/* <!-- card-body ===================================== --> */}
                    <div className="card-body" style={{ position: "relative" }}>
                        <div className="loading-css" style={{ height: this.state.loading ? '100%' : '0' }}>
                            <ClipLoader
                                css={Constants.LOADING_CSS}
                                size={50}
                                color={Constants.LOADER_COLOR}
                                loading={this.state.loading}
                            />
                        </div>

                        {/* shraddha task 10 */}
                        <div><p>{this.state.validationmsg}</p></div>

                        {/* <!-- Grid Table ============================--> */}
                        <div className="table-responsive grid-table">
                            <DataTableExtensions
                                data={this.state.documentsArray}
                                columns={columns}
                                print={false}
                                export={false}
                                filterHidden={false}>
                                <DataTable
                                    className="table"
                                    data={this.state.documentsArray}
                                    columns={columns}
                                    responsive={true}
                                    pagination={true}
                                    paginationPerPage={10}
                                    persistTableHead={true}
                                    paginationComponentOptions={{ noRowsPerPage: true }}
                                    selectableRows
                                    noHeader={true}
                                    sortIcon={<Icon iconName="SortDown" />}
                                    noContextMenu={true}
                                    noDataComponent={<div className="nodatadiv"><label className="nodata">{strings.NoRecordMSG}</label></div>}
                                    onSelectedRowsChange={this.SelectDocument.bind(this)}
                                    clearSelectedRows={this.state.toggledClearRows}
                                />
                            </DataTableExtensions>
                        </div>
                        {this.state.errors.approvalData !== undefined && this.state.errors.approvalData.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.approvalData}</Label>
                        </span> : null}
                    </div>
                    {/* <!-- card-footer========================= --> */}

                    {/* shraddha task 4 */}
                    {/* R fhd change 20-9-2023 */}
                    {(this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid && !this.state.isFHDUser) ?
                        <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} saveItemBtnMethod={this._SaveClick.bind(this)}
                        >
                        </CardFooter>
                        :
                        <CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} submitBtnMethod={this._SubmitClick.bind(this)}
                        >
                        </CardFooter>
                    }
                </div>
                <Dialog
                    hidden={this.state.hiddenDialog}
                    onDismiss={() => this.setState({ hiddenDialog: true })}
                    dialogContentProps={dialogContentProps}
                    modalProps={modelProps}
                >
                    <div className="form-group">
                        <label>{strings.lblDocument}<sub>*</sub></label>
                        {/* <input type="file" name="fileinput" id="fileinput" className="form-control"></input> */}
                        <div className="custom-file">
                            <input type="file" name="fileinput" className="custom-file-input" id="fileinput" onChange={this._onFpChange.bind(this)} />
                            <label className="custom-file-label" htmlFor="fileinput">{this.state.fileInputLable}</label>
                        </div>
                        {this.state.errors.fpDocument.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.fpDocument} </Label>
                        </span> : null}
                    </div>
                    <div className="form-group">
                        <label>{strings.lblDescription}<sub>*</sub></label>
                        <input className="form-control"
                            maxLength={255} type="text"
                            id="docDescription"
                            value={this.state.docDescription}
                            onChange={this._onInputChange.bind(this)}
                        />
                        {this.state.errors.tbxDescription.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.tbxDescription} </Label>
                        </span> : null}
                    </div>
                    <DialogFooter>
                        <button type="button" className="btn btn-primary mb-1" onClick={this._onSaveClick.bind(this)}> {strings.DialogBtnSaveText} </button>
                        <button type="button" className="btn btn-secondary ml-2 mb-1" style={{ color: "black" }} onClick={this._onDialogCancelClick.bind(this)}>{strings.DialogBtnCancelText} </button>
                    </DialogFooter>
                </Dialog>

                {/* <!-- card-primary end===================== --> */}
            </div>);
    }

    //Validation message SHRADDHA 16-07-2022 
    public async componentDidMount() {
        /// <summary>Bind data.</summary>
        var tempItems = await this.objWeb.lists.getByTitle("ValidationMessage").items.filter(`Title eq 'Documents'`).select("ValidationMessage").getAll();
        this.setState({ validationmsg: tempItems[0].ValidationMessage });
        await this.BindDocumentData();

        //Shraddha 08-08-22 item 4
        var itemid = this.props.itemID;
        var tempRequestorId = await this.objWeb.lists.getByTitle("Requests").items.filter(`ID eq ${itemid}`).select("RequestorId").getAll();

        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //Shraddha 08-08-22 item 4 end

        //Shraddha 29-09-22 after test changes
        await this.objWeb.getList(this.serverRelativeURL + Constants.SPECIALCHARACTERSLISTNAME).items.select("Title").getAll().then(item => {
            this.setState({ specialChar: item });
            var charstring = "";
            item.forEach(char => {
                if (charstring != "") {
                    charstring = charstring + "," + char.Title;
                } else {
                    charstring = char.Title;
                }
            })
            this.setState({ charString: charstring });
        });

        //R FHD change 20-9-2023
        var currentUPN = await Utils.GetUserUPNFromGraphAPI(this.props.context);
        let FHDUser = await this.objWeb.lists.getByTitle(Constants.FHDUSERS).items
            .filter(`Email eq '${currentUPN.toLowerCase()}'`)
            .getAll();

        let isCurrentFHDUser: boolean = FHDUser.length > 0 ? true : false;
        this.setState({ isFHDUser: isCurrentFHDUser });
        //end
    }

    private async _onBtnDeleteClick() {
        /// <summary>this method calls on delete button click</summary>
        try {
            if (this.rows_selected.length > 0) {
                if (confirm(strings.DeleteConfirmMsg)) {
                    this.setState({ loading: true });
                    for (let i = 0; i < this.rows_selected.length; i++) {
                        await this.objWeb.getFileByServerRelativePath(this.rows_selected[i].RelativeURL).recycle();
                        await this.DeleteFile(this.rows_selected[i].DocName); //rutvik task 7
                    }
                    await this.SaveNoOfFiles(-this.rows_selected.length);
                    await this.BindDocumentData();
                }
            }
        }
        catch (error) {
            console.log("_onBtnDeleteClick(Attachments.tsx)--->", error);
        }
    }

    private _onFpChange(event: React.ChangeEvent<HTMLInputElement>) {
        /// <summary>call on file input change event</summary>
        let filename: string = event.target.files.length > 0 ? event.target.files[0].name : strings.Lbl_ChooseFile;
        this.setState({ fileInputLable: filename });

        let errors = this.state.errors;

        if (Utils.CheckSpecialChar(this.state.specialChar, filename)) {
            errors.fpDocument = strings.SpecialChar + this.state.charString;
        }
        //rutvik 14-3-23 march CR #F
        else if (!English(filename)) {
            errors.fpDocument = strings.FileNameInEnglish;
        }
        else if (filename.split('.').length > 2) {
            errors.fpDocument = strings.NotAllowedTwoDots; //dec CR
        }
        else {
            errors.fpDocument = '';
        }

    }

    private async BindDocumentData() {
        /// <summary>Get documents from library and bind in html table</summary>
        try {
            if (this.props.approvalData.folderPath !== null && this.props.approvalData.folderPath.length > 0) {
                let docArray: IDocumentDetails[] = [];
                await this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).files.select("ServerRelativeUrl", "Name", "Length", "ListItemAllFields/File_x0020_Type").expand("ListItemAllFields").orderBy('Name').get().then(async (docs) => {

                    for (let i = 0; i < docs.length; i++) {
                        await this.objWeb.getFileByServerRelativePath(docs[i]['ServerRelativeUrl']).getItem().then((objfile) => {
                            docArray.push({
                                Link: <a onClick={(e) => { e.preventDefault(); window.open(docs[i]['ServerRelativeUrl'] + "?web=1"), '_blank' }} href=''>{strings.Grid_LinkHeader}</a>,
                                DocName: docs[i]['Name'],
                                FileSize: Number((docs[i]['Length'] / 1048576).toFixed(2)),
                                Description: objfile['Description'],
                                RelativeURL: docs[i]['ServerRelativeUrl'],
                                Id: objfile['Id'],
                                Doctype: <FileTypeIcon type={IconType.image} path={docs[i]['ServerRelativeUrl']} />,
                                Delete: <button className='btn icon-link btn-outline-secondary btnDelete' onClick={this.DeleteDocument.bind(this, docs[i]['ServerRelativeUrl'], docs[i]['Name'])} value={docs[i]['ServerRelativeUrl']}>
                                    <img src={require('../../../images/delete-s.svg')} alt='Delete' /></button>
                            });
                        });
                    }

                    this.setState({
                        documentsArray: cloneDeep(docArray),
                        toggledClearRows: !this.state.toggledClearRows,
                        docDescription: '',
                    });
                }).catch((error) => {
                    throw error + 'Client_Attachment_BindDocumentData_getAllFileNames/Details';
                });
            }
        }
        catch (error) {
            await Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error);
            console.log("BindDocumentData(Attachments.tsx)--->", error);
        }

        finally {
            this.setState({ loading: false });
        }
    }

    private _onDialogCancelClick() {
        /// <summary>execute when click on cancel button from dialog</summary>
        try {
            this.setState({
                hiddenDialog: true,
                docDescription: '',
            });
        }
        catch (error) {
            console.log("_onDialogCancelClick(Attachments.tsx)--->", error);
        }
    }

    private async DeleteDocument(ev, docURL, FileName) {
        /// <summary>Delete document from library</summary>
        try {
            if (confirm(strings.DeleteConfirmMsg)) {
                this.setState({ loading: true });
                //rutvik pc changes, docurl and filename
                await this.objWeb.getFileByServerRelativePath(FileName.currentTarget.value).recycle().then(async () => {
                    await this.SaveNoOfFiles(-1);
                    await this.DeleteFile(docURL); //rutvik task 7
                    this.BindDocumentData();
                });
            }
        }
        catch (error) {
            this.setState({ loading: false });
            await Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error + 'Client_Attachment_DeleteDocument');
            console.log("DeleteDocument(Attachments.tsx)--->", error);
        }
    }

    //Shraddha Mehta 12-07-22 item 10 (validation for file name) 
    private ValidateSection5(): boolean {
        /// <summary>validate section data.</summary>
        try {
            let errors = this.state.errors;
            let objfile = (document.querySelector("#fileinput") as HTMLInputElement).files[0];

            if (objfile === null || objfile === undefined) { errors.fpDocument = strings.CantLeaveBlankMsg }
            else if (objfile !== null || objfile !== undefined) {
                var newFileName = objfile.name;
                //var match = (new RegExp('[~#%\&{}+\|]|\\.\\.|^\\.|\\.$')).test(newFileName);
                if (Utils.CheckSpecialChar(this.state.specialChar, newFileName)) {
                    errors.fpDocument = strings.SpecialChar + this.state.charString;
                }
                //rutvik 14-3-23 march CR #F
                else if (!English(newFileName)) {
                    errors.fpDocument = strings.FileNameInEnglish;
                }
                else if (newFileName.split('.').length > 2) {
                    errors.fpDocument = strings.NotAllowedTwoDots; //dec CR
                }
                else if (objfile.size > 5242880) { errors.fpDocument = strings.Valid_Filesize }
                else if (Constants.INVALID_FILE_EXTENSIONS.indexOf(objfile.name.substring(objfile.name.lastIndexOf('.') + 1).trim().toLowerCase()) > -1) {
                    errors.fpDocument = strings.Valid_FileType;
                }
                //rutvik 10-5-24
                else if(objfile.name.substring(objfile.name.lastIndexOf('.') + 1).trim().toLowerCase() === 'jpg'){
                    errors.fpDocument = strings.Jpg_File_Not_Allowed;
                }
                //rutvik 25-4-24
                else if (this.containsNonASCII(newFileName)) {
                    errors.fpDocument = strings.NotContainsNonASCIILatters
                }
                else { errors.fpDocument = "" };
            }
            else { errors.fpDocument = "" };
            errors.tbxDescription = (Utils.CheckRequiredField(this.state.docDescription) === false) ? strings.CantLeaveBlankMsg : "";
            this.setState({ errors: errors });
            let valid = true;
            Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null; });
            return valid;
        }
        catch (error) {
            console.log("ValidateSection5(Attachments.tsx)--->", error);
        }

    }

    //Check for non-ASCII value in filename
    private containsNonASCII(filename: string) {
        for (let i = 0; i < filename.length; i++) {
            if (filename.charCodeAt(i) > 127) {
                return true;
            }
        }
        return false;
    }

    private async SelectDocument(docURL) {
        /// <summary>method call on checkbox select Deselect</summary>
        try {
            this.rows_selected = docURL.selectedRows;
        }
        catch (error) {
            console.log("SelectDocument(Attachments.tsx)--->", error);
        }
    }

    private _onInputChange(ev) {
        /// <summary>method call on input text value change</summary>
        this.setState({ ...this.state, [ev.target.id]: ev.target.value });

        //rutvik validate change
        let errors = this.state.errors;
        if (ev.target.id === "docDescription") errors.tbxDescription = '';
        this.setState({ errors: errors });
        //end

    }

    private async _onSaveClick() {
        /// <summary>save document in document library. execute on save button click</summary>
        try {
            if (this.ValidateSection5()) {
                this.setState({
                    loading: true,
                    errors: {
                        fpDocument: '',
                        tbxDescription: ''
                    },
                    fileInputLable: strings.Lbl_ChooseFile,
                    hiddenDialog: true
                });
                let isFileExist = true;
                let objfile = (document.querySelector("#fileinput") as HTMLInputElement).files[0];
                var tempfile = this.state.documentsArray.filter(x => x.DocName === objfile.name);
                if (tempfile.length > 0) {
                    isFileExist = confirm(strings.FileOverrideConfirmMsg);
                }
                if (isFileExist) {
                    if (objfile.size <= 10485760) {
                        await this.objWeb.getFolderByServerRelativeUrl(this.props.approvalData.folderPath).files.add(objfile.name, objfile, true).then(async f => {
                            await f.file.getItem().then(async item => {
                                //rutvik pc changes
                                await this.objWeb.getList(this.serverRelativeURL + "/" + Constants.ATTACHMENTS_INTERNALNAME).items.getById(item["ID"])
                                    .update({
                                        Description: this.state.docDescription,
                                        Title: objfile.name,
                                        FileFromAttachment: true
                                    }).then((res) => { }).catch((error) => {
                                        throw error + 'Client_Attachment_onSaveClick_updateFileDetails';
                                    });

                                if (tempfile.length === 0) {
                                    await this.SaveNoOfFiles(1);
                                    await this.SaveFileNames(objfile.name); //rutvik task 7
                                }

                            }).catch(async (error) => {
                                throw error + 'Client_Attachment_onSaveClick_GetFiles';
                            });
                        }).catch(async (error) => {
                            throw error + 'Client_Attachment_onSaveClick_addFiles';
                        });
                    }

                    await this.BindDocumentData();
                }
                else {
                    this.setState({ loading: false });
                }
            }
        }
        catch (error) {
            this.setState({ loading: false });
            await Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error);
            console.log("_onSaveClick(Attachments.tsx)--->", error);
        }
    }

    private _BackClick() {
        /// <summary>Back button event.</summary>
        this.props.backStep();
    }

    private async _SubmitClick() {
        /// <summary>Submit button event.</summary>

        //change 10-5-23 submit and save button click change
        this.setState({ mainLoading: true });
        var itemid = this.props.itemID;
        var tempRequestorId = await this.objWeb.lists.getByTitle("Requests").items.filter(`ID eq ${itemid}`).select("RequestorId").getAll();

        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : tempRequestorId[0].RequestorId.toString();

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });

        //applied if else condition for check submit or save button - 10-5-2023
        if (this.props.itemSubmitted && this.state.currentUserid !== this.state.requestorid && !this.state.isFHDUser) { //R fhd change 20-9-2023
            setTimeout(() => {
                window.location.href = this.props.context.pageContext.web.absoluteUrl;
            }, 1000);
        } else {
            try {
                this.setState({ mainLoading: true });

                let errors = this.state.errors;
                if (this.state.documentsArray.length > 0) {
                    errors.approvalData = '';
                    this.setState({ errors: errors });
                } else {
                    errors.approvalData = strings.NoDocumentsAddedMsg;
                    this.setState({
                        errors: errors,
                        mainLoading: false
                    });
                    return;
                }

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

                this.submitData.data = {
                    Submitted: true,
                    SubmittedDate: new Date(Date.now()),

                    //CR change - 27/10/2021 - start
                    StatusIndicator: "Submitted",
                    //CR change - 27/10/2021 - end,

                    //R fhd change 20-9-2023
                    SubmittedByFHDUser: this.state.isFHDUser,
                    SubmittedById: this.state.currentUserid

                };

                /// Check for duplicate company contact request in running mode. - Request8
                if (this.props.approvalData.requestType === strings.RequestType[1]) {
                    let req8XML: string = `<View><ViewFields>
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
                <Eq><FieldRef Name="Status"/><Value Type="Text">Open</Value></Eq>
                <And>
                <Eq><FieldRef Name="Submitted"/><Value Type="Boolean">1</Value></Eq>
                    <And>
                    <Eq><FieldRef Name="ContactCompanyNo"/><Value Type="Text">`+ this.props.approvalData.contactCompanyNo + `</Value></Eq>
                    <Eq><FieldRef Name="RequestType"/><Value Type="Text">`+ Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.text === this.props.approvalData.requestType; })[0].text + `</Value></Eq>
                    </And>
                    </And>
                </And>    
                </Where>
                </Query></View>`;

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
                        if (tempItem.Status == "Open" && tempItem.Submitted == true && tempItem.ContactCompanyNo == this.props.approvalData.contactCompanyNo && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS.filter((e) => { return e.text === this.props.approvalData.requestType; })[0].text && isAccessLevelPresent) {
                            tempArray.push(tempItem);
                        }
                    });

                    let item = tempArray[0];
                    let errors = this.state.errors;
                    if (item !== null && item !== undefined && this.props.itemID === 0) {
                        errors.approvalData = strings.ClientRequest_RunningMode[0] + item.RequestID + strings.ClientRequest_RunningMode[1];
                        this.setState({ errors: errors, mainLoading: false });
                        return;
                    }
                    else {
                        errors.approvalData = '';
                        this.setState({ errors: errors });
                    }


                }

                ///Check for duplicate legal client update request in running mode. - Request10
                if (this.props.approvalData.requestType === strings.RequestType[3]) {
                    try {
                        ///Check for data is updated or not for legal client update request.
                        if (isEqual(this.props.requestJson, this.props.clientJson)) {
                            let errorsObj = this.state.errors;

                            errorsObj.approvalData = strings.NoUpdateMsg;
                            this.setState({
                                errors: errorsObj,
                                mainLoading: false
                            });
                            return;

                        }
                        else {

                            let viewXML = `<view>
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
                                        <Neq><FieldRef Name="ID"></FieldRef><Value Type="Number">`+ this.props.itemID + `</Value></Neq>
                                    <And>
                                    <Eq><FieldRef Name="Status"></FieldRef><Value Type="Choice">`+ strings.Status[0] + `</Value></Eq>
                                <And>
                                    <And>
                                        <Eq><FieldRef Name="MaconomyAccountID"></FieldRef><Value Type="Text">`+ this.props.approvalData.maconomyAccountID + `</Value></Eq>
                                        <Eq><FieldRef Name="RequestType"></FieldRef><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[3].text + `</Value></Eq>
                                    </And>
                                <Eq><FieldRef Name="Submitted"/><Value Type="Boolean">1</Value></Eq>
                                </And>
                            </And>
                        </And>
                        </Where>
                    </Query>
                    </view>
                    `;

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
                                if (tempItem.ID != this.props.itemID && tempItem.Status == strings.Status[0] && tempItem.MaconomyAccountID == this.props.approvalData.maconomyAccountID && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[3].text && isAccessLevelPresent) {
                                    tempArray.push(tempItem);
                                }
                            });

                            let requestData = tempArray[0];
                            let errorsObj = this.state.errors;

                            if (requestData !== null && requestData !== undefined && this.props.itemID === 0) {
                                errorsObj.approvalData = strings.ClientRequest_RunningMode[0] + requestData.RequestID + strings.ClientRequest_RunningMode[1];
                                this.setState({ errors: errorsObj, mainLoading: false });
                                return;
                            } else {
                                errorsObj.approvalData = '',
                                    this.setState({ errors: errorsObj });
                            }

                            // get OtherCompanyApprovers to send notification
                            //get company numbers
                            let companyViewXML = `<View><ViewFields>
                        <FieldRef Name='Company' />
                        <FieldRef Name='MaconomyAccountID' />
                        </ViewFields>
                        <Query>
                        <Where>
                        <And>
                            <Eq>
                                <FieldRef Name='MaconomyAccountID' />
                                <Value Type='Text'>${this.props.approvalData.maconomyAccountID}</Value>
                            </Eq>
                            <Neq>
                            <FieldRef Name='Company' />
                            <Value Type='Text'>${this.props.approvalData.company.split('-')[0].trim()}</Value>
                         </Neq>
                        </And>
                        </Where>
                        </Query></View>`;
                            // var companyData = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.COMPANYCUSTOMERCARD_INTERNALNAME).getItemsByCAMLQuery({ ViewXml: companyViewXML });
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
                                if (item.MaconomyAccountID == this.props.approvalData.maconomyAccountID && item.Company != this.props.approvalData.company.split('-')[0].trim() && isAccessLevelPresent) {
                                    tempDataArray.push(item);
                                }
                            });

                            var companyData = tempDataArray;
                            if (companyData !== null && companyData.length > 0) {
                                let stage1Apprvers: Array<any> = [];

                                for (let company = 0; company < companyData.length; company++) {
                                    //get first stage approvers of company                                
                                    let approverViewXML = `<View>
                                 <ViewFields>
                                <FieldRef Name='Stage1_required' />
                                <FieldRef Name='Stage1_approver' />
                                <FieldRef Name='Stage1_sub_approver' />
                                <FieldRef Name='stage2_required' />
                                <FieldRef Name='stage2_approver' />
                                <FieldRef Name='stage2_sub_approver' />
                                <FieldRef Name='stage3_required' />
                                <FieldRef Name='stage3_approver' />
                                <FieldRef Name='stage3_sub_approver' />
                                <FieldRef Name='ID' />
                                <FieldRef Name='WorkflowType' />
                                <FieldRef Name='RequestType' />
                                <FieldRef Name='Title' />
                                </ViewFields>
                                <RowLimit>1</RowLimit>
                                <Query>
                                <Where>
                                    <And>
                                        <BeginsWith>
                                            <FieldRef Name='Title' />
                                            <Value Type='Text'>${companyData[company].Company}</Value>
                                            </BeginsWith>
                                        <And>
                                            <Eq>
                                            <FieldRef Name='WorkflowType' />
                                            <Value Type='Choice'>${this.props.approvalData.workflowType}</Value>
                                            </Eq>
                                            <Eq>
                                            <FieldRef Name='RequestType' />
                                            <Value Type='Choice'>${this.props.approvalData.requestType}</Value>
                                            </Eq>
                                        </And>
                                    </And>
                                </Where>
                                </Query>
                                </View>`
                                    let approverData = await Utils.GetSingleListData(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.APPROVERMASTER_INTERNALNAME, approverViewXML);

                                    if (approverData !== null && approverData !== undefined) {
                                        if (approverData.Stage1_required) {
                                            stage1Apprvers.indexOf(approverData.Stage1_approverId) === -1 ? stage1Apprvers.push(approverData.Stage1_approverId) : null;
                                            stage1Apprvers.indexOf(approverData.Stage1_sub_approverId) === -1 ? stage1Apprvers.push(approverData.Stage1_sub_approverId) : null;
                                        }
                                        else if (!approverData.Stage1_required && approverData.stage2_required) {
                                            stage1Apprvers.indexOf(approverData.stage2_approverId) === -1 ? stage1Apprvers.push(approverData.stage2_approverId) : null;
                                            stage1Apprvers.indexOf(approverData.stage2_sub_approverId) === -1 ? stage1Apprvers.push(approverData.stage2_sub_approverId) : null;
                                        }
                                        else if (!approverData.Stage1_required && !approverData.stage2_required && approverData.stage3_required) {
                                            stage1Apprvers.indexOf(approverData.stage3_approverId) === -1 ? stage1Apprvers.push(approverData.stage3_approverId) : null;
                                            stage1Apprvers.indexOf(approverData.stage3_sub_approverId) === -1 ? stage1Apprvers.push(approverData.stage3_sub_approverId) : null;
                                        }
                                    }
                                }
                                stage1Apprvers = stage1Apprvers.filter(x => x != this.requestorID);
                                this.submitData.notificationBody["OtherCompanyApprovers"] = stage1Apprvers.join(',');
                            }

                        }
                    } catch (error) {
                        console.log(error);
                    }
                }


                ///Check for duplicate company client update request in running mode. - Request12
                if (this.props.approvalData.requestType === strings.RequestType[5]) {
                    try {

                        let isAnyUpdate: boolean = false;

                        //rutvik 2-4-24 change add new field names
                        let fieldNameArray = ["ClientAttentionName", "Email", "PhoneNo", "DefaultTaxCode", "PaymentTerms", "FinanceEmail", "ExcludeFromClientInvoiceReminder"];
                        let gulfFieldNameArray = ["WithholdingTaxType", "Emirate"];
                        let indiaFieldNameArray = ["PlaceofSupply", "GSTRegistrationType", "CIN", "TDSTaxRate"];
                        let italianFieldNameArray = ["CustomerRemark4", "CustomerRemark5", "CustomerRemark8"];//Shraddha test 8

                        let saudiFieldNameArray = ["CustomerRemark7", "ClientIDType"];//Shraddha test 7

                        for (let count = 0; count < fieldNameArray.length; count++) {
                            if (this.props.requestJson[fieldNameArray[count]] !== this.props.clientJson[fieldNameArray[count]]) {
                                isAnyUpdate = true;
                                break;
                            }
                        }

                        if (Constants.GULF_COMPANIES.indexOf(this.props.approvalData.company.split('-')[0].trim()) > -1 && isAnyUpdate === false) {
                            for (let count = 0; count < gulfFieldNameArray.length; count++) {
                                if (this.props.requestJson[gulfFieldNameArray[count]] !== this.props.clientJson[gulfFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }

                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.INDIA_COMPANY && isAnyUpdate === false) {
                            for (let count = 0; count < indiaFieldNameArray.length; count++) {
                                if (this.props.requestJson[indiaFieldNameArray[count]] !== this.props.clientJson[indiaFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        //rutvik 12-7 24
                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.ITALIAN_COMPANY && isAnyUpdate === false) {
                            for (let count = 0; count < italianFieldNameArray.length; count++) {
                                if (this.props.requestJson[italianFieldNameArray[count]] !== this.props.clientJson[italianFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        //endr

                        //Shraddha test 7
                        if (this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[0] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[1] || this.props.approvalData.company.split('-')[0].trim() === Constants.SAUDI_COMPANY[2] && isAnyUpdate === false) {
                            for (let count = 0; count < saudiFieldNameArray.length; count++) {
                                if (this.props.requestJson[saudiFieldNameArray[count]] !== this.props.clientJson[saudiFieldNameArray[count]]) {
                                    isAnyUpdate = true;
                                    break;
                                }
                            }
                        }
                        //end shraddha test7

                        let errorsObj = this.state.errors;

                        if (isAnyUpdate === false) {
                            errorsObj.approvalData = strings.NoUpdateMsg;
                            this.setState({
                                errors: errorsObj,
                                mainLoading: false
                            });
                            return;
                        }

                        let viewXML = `<view>
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
                                        <Eq><FieldRef Name="MaconomyAccountID"></FieldRef><Value Type="Text">`+ this.props.clientJson["MaconomyAccountID"] + `</Value></Eq>
                                        <Eq><FieldRef Name="RequestType"></FieldRef><Value Type="Choice">`+ Constants.REQUESTTYPE_OPTIONS[5].text + `</Value></Eq>
                                    </And>
                                </And>
                            </Where>
                        </Query>
                        </view>
                        `;

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
                            if (tempItem.Submitted == true && tempItem.Status == strings.Status[0] && tempItem.MaconomyAccountID == this.props.clientJson["MaconomyAccountID"] && tempItem.RequestType == Constants.REQUESTTYPE_OPTIONS[5].text && isAccessLevelPresent) {
                                tempArray.push(tempItem);
                            }
                        });

                        let requestData = tempArray[0];

                        if (requestData !== null && requestData !== undefined && this.props.itemID === 0) {
                            errorsObj.approvalData = strings.ClientRequest_RunningModeReq12[0] + requestData.RequestID + strings.ClientRequest_RunningModeReq12[1];
                            this.setState({ errors: errorsObj, mainLoading: false });
                            return;
                        } else {
                            errorsObj.approvalData = '',
                                this.setState({ errors: errorsObj });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                //shraddha task 4
                let returnData = await Utils.GetSubmitDetails(this.submitData, strings, this.props.approvalData, this.requestorID, this.objWeb, this.serverRelativeURL, this.state.requestorid);

                if (returnData !== null) {
                    this.submitData = returnData;
                    let errors = this.state.errors;
                    errors.approvalData = "";
                    this.setState({ errors: errors });
                }
                else {
                    let errorsObj = this.state.errors;
                    errorsObj.approvalData = strings.ApprovalNotFoundMsg;
                    this.setState({ errors: errorsObj, mainLoading: false });
                    return;
                }

                if (this.props.itemID > 0) {
                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(this.submitData.data).then((res) => {
                    });
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

                if (!this.props.itemSubmitted || returnData !== null) { //shraddha change for submit button
                    //await Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.body), this.props.permissionMSFlowUrl);

                    // Jaymin change	
                    var tempBody = {
                        Title: this.props.itemID.toString(),
                        FolderPath: this.props.approvalData.folderPath === undefined ? "" : this.props.approvalData.folderPath.toString(),
                        FolderContribute: this.submitData.body["FolderContribute"].concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                        UpdateReqRead: Constants.EVERYONE_ID.toString(),
                        UpdateRequestID: this.props.approvalData.updateRequestDataID === undefined ? "" : this.props.approvalData.updateRequestDataID.toString(),
                        FolderRead: this.submitData.body["FolderRead"],
                        ReqRead: this.submitData.body["ReqRead"],
                        ReqContribute: this.submitData.body["ReqContribute"].concat(',', Constants.FHDUserGroupID), //R FHD change 19-9-2023,
                        IsSubmitted: true //R 30-3
                    };
                    //jaymin change               	
                    await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.PERMISSIONFLOWTRIGGERLISTURL).items.add(tempBody);
                    await Utils.CallMSFlow(this.props.context, JSON.stringify(this.submitData.notificationBody), this.props.sendNotificationMSFlowUrl);
                }
                setTimeout(() => {
                    window.location.href = this.props.context.pageContext.web.absoluteUrl;
                }, 1000);

            } catch (e) {
                this.setState({ mainLoading: false });
            }
        }

    }

    //rutvik change
    private async _SaveClick() {
        setTimeout(() => {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }, 1000);
    }

    private async SaveNoOfFiles(NoOfFiles: number) {
        //Save number of files in requests list.

        //CR change - 27/10/2021 - start
        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
            .update({ NoOfAttachedDocs: this.state.documentsArray.length + NoOfFiles })
            .then((res) => { }).catch(async (error) => {
                throw error + 'Client_Attachment_SaveNoOfFiles_RequestList';
            });
        //CR change - 27/10/2021 - end
    }

    //rutvik task 7
    private async SaveFileNames(FileName: string) {
        try {
            var Files = {
                AttachmentFileNames: ""
            };
            let FileNames: any = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("AttachmentFileNames").get()
                .catch(async (error) => {
                    throw error + 'Client_Attachment_saveFileNames_getfilesnames_RequestLists';
                });

            if (FileNames.AttachmentFileNames == null) {
                Files.AttachmentFileNames = FileName;
            } else {
                Files.AttachmentFileNames = FileNames.AttachmentFileNames.concat(",", FileName);
            }

            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
                .update(Files).then((res) => { }).catch(async (error) => {
                    throw error + 'Client_Attachment_saveFileNames_updatefilesnames_RequestLists';
                });
        }
        catch (error) {
            this.setState({ loading: false });
            await Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error);
            console.log("SaveFileNames(Attachments.tsx)--->", error);
        }
    }

    //rutvik task 7
    private async DeleteFile(filename: string) {
        try {
            let FileNameString = {
                AttachmentFileNames: ""
            }
            let FileNames = await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("AttachmentFileNames,NoOfAttachedDocs").get();

            if (FileNames.AttachmentFileNames !== null) {
                if (FileNames.NoOfAttachedDocs == 1) {
                    FileNameString.AttachmentFileNames = FileNames.AttachmentFileNames.replace(filename, "");
                } else {
                    FileNameString.AttachmentFileNames = FileNames.AttachmentFileNames.replace("," + filename, "");
                }
            }
            await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID)
                .update(FileNameString).then((res) => { }).catch((error) => {
                    throw error + 'Client_attachment_DeleteFile_UpdateFileString';
                });

        }
        catch (error) {
            this.setState({ loading: false });
            await Utils.AddErrorLogs(this.serverRelativeURL, this.objWeb, this.props.itemID, error);
            console.log("DeleteFileNames(Attachments.tsx)--->", error);
        }

    }

}