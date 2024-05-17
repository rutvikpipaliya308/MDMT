import * as React from 'react';
import { IDueDiligenceProps, IDueDiligenceState } from './IDueDiligenceProps';
import * as strings from 'ClientRequestsWebPartStrings';
import * as CommonConstants from '../../../Constants';
import * as Utils from '../../Utils';
import { Web } from 'sp-pnp-js';
import ClipLoader from "react-spinners/ClipLoader";
import CardFooter from '../CardFooter/CardFooter';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { IDropdownProperties } from '../../IDropdownProperties';

export default class DueDiligence extends React.Component<IDueDiligenceProps, IDueDiligenceState> {
    private questions = [];
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);

    constructor(props: IDueDiligenceProps) {
        super(props);

        this.state = {
            dpDDOptions: [{ questionKey: '', key: '' }],
            loading: true,
            rbtnWorkflowType: "Standard",
            itemID: 0,
            folderPath: '',
            questions: [],
            //Shraddha 09-08-22 item 4
            currentUserid: '',
            requestorid: '',
            //Shraddha end
            errors: {
                dpDDOptions: '',
                rbtnWorkflowType: ''
            },
            requestType: ''
        };
    }

    public async componentWillMount() {
        this.setState({ loading: true });

        if (this.props.requestType === "7") {
            await this.setState({ requestType: strings.RequestType[0] });
        } else if (this.props.requestType === "8") {
            await this.setState({ requestType: strings.RequestType[1] });
        }

        await this.getDueDiligenceQuestions();

        this.props.itemID > 0 ? await this.setState({ itemID: this.props.itemID }) : null;

        await this.ShowHideDependentQuestions();

        await this.setState({ loading: false });

        //Shraddha 08-08-22 item 4
        var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
        var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

        this.setState({ currentUserid: currentUserID });
        this.setState({ requestorid: requestoridd });
        //end
    }

    private async ShowHideDependentQuestions() {
        let tempQuestions = this.state.questions;

        tempQuestions = this.state["questions"];
        let replacedTempQuestions = this.state["questions"];
        let tempQuestion;
        let selectedAnswerKey;
        let tempQuestionOptions;
        let selectedAnswerText = [];

        let rh = this;

        tempQuestions.some(function (tempItem, i) {
            if (tempItem.IsDependentOnQuestion) {
                tempQuestion = tempItem.DependentQuestionID ? tempQuestions.filter(x => x.key === tempItem.DependentQuestionID)[0] : "";
                selectedAnswerKey = tempQuestion ? tempQuestion.selectedAnswers : [];
                tempQuestionOptions = tempQuestion ? tempQuestion.options.options : [];
                if (selectedAnswerKey.length > 0) {
                    let tempAnswerArray = [];
                    selectedAnswerKey.map((item) => {
                        tempAnswerArray.push(tempQuestionOptions.filter(x => x.key === item)[0].text);
                    });
                    selectedAnswerText = tempAnswerArray;
                }
                if (selectedAnswerText.length > 0) {
                    let index;
                    index = selectedAnswerText.filter((item) => item === tempItem.DependentQuestionAnswer).length;
                    if (index == 0) {
                        let tempArray = rh.state['dpDDOptions'];
                        tempArray.filter(x => x.questionKey === tempItem.key.toString())[0].key = "";
                        rh.setState({ dpDDOptions: tempArray });
                    }
                    replacedTempQuestions[i].isActive = index > 0 ? true : false;
                    replacedTempQuestions[i].IsRequired = index > 0 ? true : false;
                }
                else {
                    replacedTempQuestions[i].isActive = false;
                    replacedTempQuestions[i].IsRequired = false;
                }
            }
        });
        this.setState({ questions: replacedTempQuestions });
    }

    public render(): React.ReactElement<IDueDiligenceProps> {
        return (
            <div>
                <div className="container-fluid">
                    {/* <!-- card-primary ===================== --> */}
                    <div className="card-primary" style={{ position: "relative" }}>
                        <div className="loading-css" style={{ height: this.state.loading ? "100%" : "0%" }}>
                            <ClipLoader
                                css={CommonConstants.LOADING_CSS}
                                size={50}
                                color={CommonConstants.LOADER_COLOR}
                                loading={this.state.loading}
                            />
                        </div>
                        {/* <!-- card-header ======================== --> */}
                        <div className="card-header">
                            <h3 className="">{strings.DueDiligenceTitle}
                            </h3>
                        </div>
                        {/* <!-- card-body ===================================== --> */}
                        <div className="card-body">
                            {this.state.questions.map(question => (
                                <div className="form-group text-left">
                                    {question.isActive ? <label>{question.text}{question.IsRequired === true ? <sub>*</sub> : null}</label> : ""}
                                    {question.isActive ? <Dropdown id={question.dprdwnID} disabled={this.checkIfFieldDisabled(question.dprdwnID)} placeholder={strings.dpPlaceHolder} onChange={this.handleChange.bind(this)}
                                        defaultSelectedKeys={question.options.options.filter(x => x.IsDefault === true).length > 0 ? question.options.options.filter(x => x.IsDefault === true)[0].key : ""}
                                        defaultSelectedKey={question.options.options.filter(x => x.IsDefault === true).length > 0 ? question.options.options.filter(x => x.IsDefault === true)[0].key : ""}
                                        selectedKey={question.selectedAnswers.length > 0 ? question.selectedAnswers : []}
                                        selectedKeys={question.selectedAnswers.length > 0 ? question.selectedAnswers : []}
                                        multiSelect={question.IsMultiSelect} options={question.options.options} /> : ""}
                                    {question.isActive && question.errorMsg.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                                        <Label className="errormessage text-left" >{question.errorMsg} </Label>
                                    </span> : null}
                                    {question.isActive ? <label>{question.options.value}</label> : ""}
                                </div>
                            ))}
                        </div>

                        {/* <!-- card-footer========================= --> */}
                        <CardFooter
                            {...this.props}
                            nextBtnMethod={this._NextClick.bind(this)}
                            saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)}
                            backBtnMethod={this._BackClick.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private checkIfFieldDisabled(tagID) {
        let listOfEditableFieldsSection1 = this.props.listOfEditableFields;

        //Shraddha 08-08-22 item 4
        let currentuser = this.state.currentUserid;
        let requestorid = this.state.requestorid;

        if (this.props.itemSubmitted && currentuser !== requestorid && !this.props.isFHDUser) { //R fhd change 20-9
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

    private handleChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption): void {
        // <summary>Event called on dropdown value change.</summary>
        try {
            var tempObj = this.state["dpDDOptions"];

            //New Change Start - 02/06/2021
            this.SetSelectedAnswer(tempObj, item["questionkey"], item["key"], item["selected"]).then((arr) => {
                this.setState({ ...this.state, dpDDOptions: arr });
            });
            //New Change End - 02/06/2021
            this.ShowHideDependentQuestions();

            //rutvik validate change            
            let tempQuestions = this.state.questions;
            let changeDp = tempQuestions.filter(x => x.key === item["questionkey"])[0];
            if (changeDp.selectedAnswers.length > 0 && changeDp.errorMsg !== "") {
                changeDp.errorMsg = '';
            }
            this.setState({ ...this.state, questions: tempQuestions });
            //end
        }
        catch (error) {
            console.log("handleChange(Section1.tsx)--->", error);
        }
    }

    private async getDueDiligenceQuestions() {
        let viewXML = `<View><ViewFields>
            <FieldRef Name="ID"></FieldRef>
            <FieldRef Name="Question"></FieldRef>
            <FieldRef Name="Sequence"></FieldRef>
            <FieldRef Name="IsMultiSelect"></FieldRef>
            <FieldRef Name="IsRequired"></FieldRef>
            <FieldRef Name="IsDependentOnQuestion"></FieldRef>
            <FieldRef Name="DependentQuestionID"></FieldRef>
            <FieldRef Name="DependentQuestionAnswer"></FieldRef>
            <FieldRef Name="IsFinanceDue"></FieldRef>
            </ViewFields>
            <RowLimit>4999</RowLimit>
            <Query><Where>
            <And>
                <Eq><FieldRef Name="IsActive"/><Value Type="Integer">1</Value></Eq>
                <Eq><FieldRef Name="RequestType"/><Value Type="Text">${this.state.requestType}</Value></Eq>                
            </And>    
          </Where>
          <OrderBy><FieldRef Name="Sequence" Ascending="True" /></OrderBy>
          </Query>
            </View>`;
        var data = await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILQUESTIONSURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');

        if (data) {
            for (var i = 0; i < data.length; i++) {
                //rutvik 27-6 23
                if (data[i]["IsFinanceDue"] !== true) {
                    var options = await this.GetDueDiligenceOptions(data[i]["ID"]);
                    this.state.dpDDOptions.push({ questionKey: data[i]["ID"].toString(), key: null });
                    this.questions.push({
                        key: data[i]["ID"],
                        text: data[i]["Question"],
                        IsMultiSelect: data[i]["IsMultiSelect"],
                        IsRequired: data[i]["IsRequired"],
                        options: options,
                        errorMsg: "",
                        selectedAnswers: [],
                        dprdwnID: "dpDDOptions" + i,
                        isActive: true,
                        IsDependentOnQuestion: data[i]["IsDependentOnQuestion"] ? data[i]["IsDependentOnQuestion"] : false,
                        DependentQuestionID: data[i]["DependentQuestionIDId"] ? data[i]["DependentQuestionIDId"] : 0,
                        DependentQuestionAnswer: data[i]["DependentQuestionAnswer"] ? data[i]["DependentQuestionAnswer"] : "",
                    });
                }
                //end r
            }
        }

        await this.setState({ questions: this.questions });

        await this.CheckRequestAvailable();
    }

    private async GetDueDiligenceOptions(questionID: number) {
        // <summary>get maconomy data from sharepoint list</summary>

        try {
            let viewXML = `<View>
        <ViewFields>
        <FieldRef Name="ID"></FieldRef> 
        <FieldRef Name="Title"></FieldRef> 
        <FieldRef Name="IsDefault"></FieldRef> 
        <FieldRef Name="Sequence"></FieldRef> 
        <FieldRef Name="IsActive"></FieldRef></ViewFields>
        <RowLimit>1000</RowLimit>
        <Query>
            <Where>
                <And>
                    <Eq><FieldRef Name="IsActive"/><Value Type="Integer">1</Value></Eq>
                    <Eq><FieldRef Name="QuestionID"  LookupId="TRUE"/><Value Type="Lookup">`+ questionID + `</Value></Eq>
                </And>
            </Where>
            <OrderBy><FieldRef Name='Sequence' Ascending='True'></FieldRef></OrderBy>
        </Query>
        </View>`;

            var data = await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILOPTIONSURL).getItemsByCAMLQuery({ ViewXml: viewXML }, 'FieldValuesAsText');
            var tempoptions = [];

            if (data) {
                for (var i = 0; i < data.length; i++) {
                    tempoptions.push({
                        questionkey: questionID,
                        key: data[i]["ID"],
                        text: data[i]["Title"],
                        IsDefault: data[i]["IsDefault"]
                    });
                }
            }
            let options: IDropdownProperties = { value: '', options: [] };
            var tempObj = options;
            tempObj.options = tempoptions;
            options = tempObj;
            return options;
        }
        catch (error) {
            console.log("GetMaconomyData (Services.ts)--->", error);
        }
    }

    private async CheckRequestAvailable() {
        //Check request is new or open in edit mode
        let tempArray = this.state.dpDDOptions;

        if (this.props.data === null || this.props.data === undefined) {
            // await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
            //     .items
            //     .filter(`Title eq '${this.props.itemID}'`)
            //     .get().then(async (data) => {
            var tempData = await this.objWeb.lists.getByTitle(CommonConstants.DUEDILIGENCENAME).items.select().getAll();
            let tempArray1 = [];
            tempData.filter((item) => {
                if (item.Title == this.props.itemID) {
                    tempArray1.push(item);
                }
            });

            let data;
            data = tempArray1;
            if (data.length > 0) {
                await data.forEach(async element => {
                    if (element["AnswersId"] != null) {
                        let tempAnswers = element["AnswersId"];
                        await tempAnswers.forEach(async ele => {
                            await this.SetSelectedAnswer(tempArray, +element.QuestionId, +ele, true).then((arr) => {
                                tempArray = arr;
                            });
                        });
                    }
                });
            } else {
                await this.state.questions.forEach(async element => {
                    await element.options.options.forEach(async ele => {
                        if (ele.IsDefault) {
                            await this.SetSelectedAnswer(tempArray, ele.questionkey, ele.key, true).then((arr) => {
                                tempArray = arr;
                            });
                        }
                    });
                });
            }

            await this.setState({ dpDDOptions: tempArray });
            // });
        } else {
            await this.props.data.questions.forEach(async element => {
                await element.selectedAnswers.forEach(async ele => {
                    await this.SetSelectedAnswer(tempArray, +element.key, +ele, true).then((arr) => {
                        tempArray = arr;
                    });
                });
            });

            await this.setState({ dpDDOptions: tempArray });
        }
    }

    private async SetSelectedAnswer(arr, questionKey, key, selected) {
        //Set selected answers in state
        let tempValue = this.state.questions.filter(x => x.key === +questionKey)[0];
        let tempQuestions = this.state.questions;

        if (tempValue.IsMultiSelect) {
            let uniqueArray = [];
            let tempArray = [];

            if (arr.filter(x => x.questionKey === questionKey.toString())[0].key !== null) {
                tempArray = arr.filter(x => x.questionKey === questionKey.toString())[0].key.split(',');
            }
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i] === null || tempArray[i] === "" || tempArray[i] === 0) {
                    tempArray.splice(i, 1);
                }
            }

            if (selected === true) {
                tempArray.push(key.toString());

                for (let i = 0; i < tempArray.length; i++) {
                    if (uniqueArray.indexOf(tempArray[i]) === -1) {
                        uniqueArray.push(tempArray[i]);
                    }
                }
            } else {
                for (let i = 0; i < tempArray.length; i++) {
                    if (tempArray[i] === key.toString()) {
                        tempArray.splice(i, 1);
                    }
                }

                for (let i = 0; i < tempArray.length; i++) {
                    if (uniqueArray.indexOf(tempArray[i]) === -1) {
                        uniqueArray.push(tempArray[i]);
                    }
                }
            }
            arr.filter(x => x.questionKey === questionKey.toString())[0].key = uniqueArray.join(',');
            tempQuestions.filter(x => x.key === Number(questionKey))[0].selectedAnswers = uniqueArray.map(i => Number(i));
        } else {
            arr.filter(x => x.questionKey === questionKey.toString())[0].key = key.toString();
            let tempKey = [key];
            tempQuestions.filter(x => x.key === Number(questionKey))[0].selectedAnswers = tempKey.map(i => Number(i));
        }

        // this.questions = tempQuestions;
        await this.setState({ questions: tempQuestions });
        return arr;
    }

    private ValidateDueDiligence(): boolean {
        //Validate due diligence
        let valid: boolean = true;
        let tempQuestions = this.state.questions;

        tempQuestions.forEach((ele) => {
            if (ele.IsRequired) {
                let tempKey = this.state.dpDDOptions.filter(x => x.questionKey === ele.key.toString())[0].key;

                if (tempKey === "" || tempKey === null) {
                    ele.errorMsg = strings.CantLeaveBlankMsg;
                    valid = false;
                } else {
                    ele.errorMsg = "";
                }
            }
        });

        this.setState({ questions: tempQuestions });
        return valid;
    }

    private async _NextClick() {
        // <summary>Call on next button click</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            this.setState({ loading: false }, async () => {
                await this.props.dataChange("dueDiligenceData", this.state);
                await this.props.dataChange("itemID", this.state.itemID);
                this.props.nextStep();
            })
        } else {
            this.setState({ loading: false }); //9-2-23
        }
    }

    private async _BackClick() {
        await this.props.dataChange("dueDiligenceData", this.state);
        await this.props.backStep();
    }

    private async _SaveForLaterClick() {
        // <summary>Call on save for later click</summary>
        this.setState({ loading: true }); //9-2-23
        if (await this.SaveDataOperations()) {
            window.location.href = this.props.context.pageContext.web.absoluteUrl;
        }
    }

    private async SaveDataOperations() {
        // <summary>validate and save form data</summary>
        if (await this.ValidateDueDiligence() === false) {
            return false;
        }
        await this.SaveData();
        return true;
    }

    private async SaveData() {
        //Save data into list
        try {
            this.setState({ loading: true });
            let tempArray = this.state.dpDDOptions;

            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].questionKey !== "" && tempArray[i].questionKey !== '' && tempArray[i].questionKey !== null) {
                    var tempData = {
                        Title: this.props.itemID.toString(),
                        QuestionId: Number(Utils.TrimData(tempArray[i].questionKey)),
                        AnswersId: { results: tempArray[i].key.toString().split(',').map(Number) }
                    };

                    // await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                    //     .items
                    //     .filter(`Title eq '${this.props.itemID}' and QuestionId eq '${+Number(tempArray[i].questionKey)}'`)
                    //     .get().then(async (data) => {
                    var tempData1 = await this.objWeb.lists.getByTitle(CommonConstants.DUEDILIGENCENAME).items.select().getAll();
                    let tempArray1 = [];
                    tempData1.filter((item) => {
                        if (item.Title == this.props.itemID && item.QuestionId == Number(tempArray[i].questionKey)) {
                            tempArray1.push(item);
                        }
                    });

                    let data;
                    data = tempArray1;
                    if (await data.length > 0) {
                        await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                            .items
                            .getById(data[0].ID)
                            .update({ AnswersId: { results: tempArray[i].key.toString().split(',').map(Number) } }).then(async (res) => {
                            });
                    } else {
                        await this.objWeb.getList(this.props.context.pageContext.web.serverRelativeUrl + CommonConstants.DUEDILIGENCEURL)
                            .items
                            .add(tempData).then(async (res) => {
                            });
                    }
                    // });
                }
            }

        } catch (error) {
            this.setState({ loading: false });
            console.log("SaveData(DueDiligence) --->", error);
        }
    }
}