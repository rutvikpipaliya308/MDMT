import * as React from 'react';
import { IRequest11Props, IRequest11State } from './IRequest11Props';
import * as strings from 'ClientRequestsWebPartStrings';

import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { Web, PermissionKind } from 'sp-pnp-js';
import ClipLoader from "react-spinners/ClipLoader";

import * as Utils from '../Utils';
import * as Constants from './../../Constants';
import Section1 from './Section1/Section1';
import ParentClientCommonSection from '../common/ParentClientCommonSection/ParentClientCommonSection';

export default class Request11 extends React.Component<IRequest11Props, IRequest11State> {
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private isAccessLevelPresentForUser: boolean = true;

    constructor(props: IRequest11Props) {
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
            itemSubmitted: false
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

    public render(): React.ReactElement<IRequest11Props> {
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
                            {strings.RequestType[4]}
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
                                        {Constants.REQ11_SECTION_OPTIONS.map((item, i) => (
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
        /// <summary>Render section for request 11.</summary>
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
                return <Section1 {...this.props} itemID={this.state.itemID} listData={this.state.listData} data={this.state.section1Data} dataChange={this.dataChange.bind(this)} nextStep={this.NextStep.bind(this)} itemSubmitted={this.state.itemSubmitted} accessLevel={this.state.accessLevel} />;
            case 2:
                return <ParentClientCommonSection {...this.props} itemID={this.state.itemID} listData={this.state.listData} data={this.state.commonSectionData} dataChange={this.dataChange.bind(this)} approvalData={this.state.approvalData} backStep={this.BackStep.bind(this)} section1Data={this.state.section1Data} itemSubmitted={this.state.itemSubmitted} accessLevel={this.state.accessLevel} />;
        }
    }

    private dataChange(id: string, value: any) {
        /// <summary>Method to be called to set state in request11.</summary>
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