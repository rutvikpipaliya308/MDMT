import * as React from 'react';
import { ICompanySectionProps, ICompanySectionState } from './ICompanySectionProps';
import * as strings from 'ClientRequestsWebPartStrings';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon, Label } from 'office-ui-fabric-react';
import { isEqual } from '@microsoft/sp-lodash-subset';
import { Web } from 'sp-pnp-js';
import * as Utils from '../../Utils';
import * as Constants from '../../../Constants';

export default class CardFooter extends React.Component<ICompanySectionProps, ICompanySectionState> {
    private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
    private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;

    constructor(props: ICompanySectionProps) {
        super(props);
        this.state = {
            dpCompanyOptions: [],
            dpCompany: '',
            countryOfCompany: '', //Rutvik 13-3-24
            companyValuesWithCountry: '', //rutvik 13-3-24
            rbtnWorkflowType: 'Standard',
            currentCompanyAccessLevel: '', //Rutvik 17-1-24
            companyAccessLevelCompare: '', //Rutvik 17-1-24
            errors: {
                dpCompany: '',
                rbtnWorkflowType: ''
            }
        };
    }

    public componentWillReceiveProps(newProps: ICompanySectionProps) {
        if (!isEqual(this.props.dpCompany, newProps.dpCompany)) {
            this.setState({
                dpCompany: Utils.CheckRequiredField(newProps.dpCompany) === false ? '' : (this.state.dpCompanyOptions.filter(x => x.text === newProps.dpCompany).length > 0 ? this.state.dpCompanyOptions.filter(x => x.text === newProps.dpCompany)[0].text : ''),

            });
        }

        //rutvik 13-3-24
        if (!isEqual(this.props.countryOfCompany, newProps.countryOfCompany)) {
            this.setState({
                countryOfCompany: newProps.countryOfCompany
            });
        }

        if (!isEqual(this.props.rbtnWorkflowType, newProps.rbtnWorkflowType)) {
            this.setState({
                rbtnWorkflowType: newProps.rbtnWorkflowType
            });
        }
    }

    public async componentWillMount() {
        this.props.setLoader(true);
        let options = await Utils.GetMasterListItems(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company');

        //Rutvik 22-2-23 - compare email UPN insted of email 
        //var currentUserEmail = this.props.context.pageContext.user.email;
        let currentUserEmail = await Utils.GetUserUPNFromGraphAPI(this.props.context);
        //end

        let companyNumberArray = [];
        let filteredOptions = [];
        let companyNumberArrayRange = [];
        let tempcompanyNumberArrayRange = [];
        await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.USERACCESSLEVEL_INTERNALNAME).items.select("CompanyNumber", "Email", "CompanyNumberRange").getAll().then(async (record) => {
            if (record != null) {
                record.filter((tempItem) => {
                    if (tempItem.Email != null) {
                        if (tempItem.Email.toLowerCase() === currentUserEmail.toLowerCase()) {
                            if (tempItem.CompanyNumber != null) {
                                companyNumberArray = tempItem.CompanyNumber.split(',');
                            }
                            if (tempItem.CompanyNumberRange != null) {
                                tempItem.CompanyNumberRange = tempItem.CompanyNumberRange.split(',');
                                tempItem.CompanyNumberRange.forEach(element => {
                                    tempcompanyNumberArrayRange = element.split('-');
                                    companyNumberArrayRange = companyNumberArrayRange.concat(tempcompanyNumberArrayRange);
                                });
                            }
                        }
                    }
                })
            }
        })

        options.filter((tempItem) => {
            if (tempItem["text"] !== null) {
                let accessLevelArrayFromItem = [];
                let accesslevelfound = false;
                accessLevelArrayFromItem = tempItem["text"].split('-');
                if (companyNumberArray.length != 0) {
                    companyNumberArray.forEach(element => {
                        if (accessLevelArrayFromItem[0].trim() == element.trim() && accesslevelfound != true) {
                            filteredOptions.push(tempItem);
                            accesslevelfound = true;
                        }
                    });
                }

                if (!accesslevelfound && companyNumberArrayRange.length >= 2) {
                    for (let i = 0; i < companyNumberArrayRange.length - 1; i++) {
                        let accessLevel = parseInt(accessLevelArrayFromItem[0].trim());
                        let lowerRange = parseInt(companyNumberArrayRange[i]);
                        let upperRange = parseInt(companyNumberArrayRange[i + 1]);
                        if (accessLevel >= lowerRange && accessLevel <= upperRange && accesslevelfound != true) {
                            filteredOptions.push(tempItem);
                            accesslevelfound = true;
                        }
                        i = i + 1;
                    }

                }
            }
        });


        filteredOptions.length > 0 ? this.setState({
            dpCompanyOptions: filteredOptions.filter(x => x.IncludeInList === true)
        }) : [];

        //rutvik 13-3-24 , add countryOfCompany
        this.setState({ dpCompany: this.props.dpCompany, countryOfCompany: this.props.countryOfCompany, rbtnWorkflowType: this.props.rbtnWorkflowType }, () => {
            this.props.setLoader(false);
        });

    }

    public async componentDidMount() {
        try {
            let Companiesvalues = await Utils.GetDropDownValuesForCompany(this.objWeb, this.props.context.pageContext.web.serverRelativeUrl + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, 'Company');
            this.setState({ companyValuesWithCountry: Companiesvalues });
        } catch (error) {
            console.log("CompanySection/ComponentDidMount-->", error);
        }
    }

    public render(): React.ReactElement<ICompanySectionProps> {
        return (
            <div className="m-auto" style={{ maxWidth: '500px' }}>
                <React.Fragment>
                    <div className="form-group text-left">
                        <label>{strings.CompanyFieldLabel}<sub>*</sub></label>
                        <Dropdown disabled={this.props.isDisable !== undefined ? (this.props.isDisable === true ? true : false) : false} id="dpCompany" placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCompany} options={this.state.dpCompanyOptions} onChange={this._onDpChange.bind(this)} />
                        {this.state.errors.dpCompany.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage" >{this.state.errors.dpCompany} </Label>
                        </span> : null}
                    </div>

                    {/* {this.props.isWorkflowTypeNeeded ? <React.Fragment>
                        <div className="card-header text-center">
                            <h3 className="border-0 pl-0">{strings.ReqType_TXT}</h3>
                        </div>
                        <ul className="option-toolbar form-row">
                            <li className="col-6">
                                <div className="custom-control custom-radio">
                                    <input disabled={this.props.isDisable !== undefined ? (this.props.isDisable === true ? true : false) : false} type="radio" id="standard" value={strings.WorkflowType[0]} name="workflow-type" className="custom-control-input" checked={this.state.rbtnWorkflowType === strings.WorkflowType[0]} onChange={this._onRadioBtnChange.bind(this)} defaultChecked />
                                    <label className="custom-control-label" htmlFor={strings.WorkflowType[0].toLocaleLowerCase()}>
                                        <span className="icon"><img src={require('../../../images/standard.svg')} alt={strings.WorkflowType[0]} /></span>{strings.WorkflowType[0]}</label>
                                </div>
                            </li>
                            <li className="col-6">
                                <div className="custom-control custom-radio">
                                    <input disabled={this.props.isDisable !== undefined ? (this.props.isDisable === true ? true : false) : false} type="radio" id="emergency" value={strings.WorkflowType[1]} checked={this.state.rbtnWorkflowType === strings.WorkflowType[1]} name="workflow-type" className="custom-control-input" onChange={this._onRadioBtnChange.bind(this)} />
                                    <label className="custom-control-label" htmlFor={strings.WorkflowType[1].toLocaleLowerCase()}>
                                        <span className="icon"><img src={require('../../../images/emergency.svg')} alt={strings.WorkflowType[1]} /></span>{strings.WorkflowType[1]}</label>
                                </div>
                            </li>
                        </ul>
                        {this.state.errors.rbtnWorkflowType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
                            <Label className="errormessage text-left">{this.state.errors.rbtnWorkflowType} </Label>
                        </span> : null}
                    </React.Fragment> : null} */}
                </React.Fragment>
            </div>
        );
    }

    public ValidateCompanySection() {
        /// <summary>Validate Company Section.</summary>
        let errors = this.state.errors;
        if ((this.props.requestType === strings.RequestType[3] || this.props.requestType === strings.RequestType[4] || this.props.requestType === strings.RequestType[5]) && this.props.itemID > 0 && Utils.CheckRequiredField(this.state.dpCompany) === false) {
            errors.dpCompany = "";
        }
        else {
            errors.dpCompany = (Utils.CheckRequiredField(this.state.dpCompany) === false) ? strings.CantLeaveBlankMsg : "";
        }
        this.props.isWorkflowTypeNeeded ?
            errors.rbtnWorkflowType = (Utils.CheckRequiredField(this.state.rbtnWorkflowType) === false) ? strings.SelectAnyOptionMsg : ""
            : "";

        this.setState({ errors: errors });
        let valid: boolean = true;
        Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null; });
        let returnObj = null;
        if (valid) {
            returnObj = {};
            returnObj["dpCompany"] = this.state.dpCompany;
            returnObj["countryOfCompany"] = this.state.countryOfCompany; //rutvik 13-3-24
            this.props.isWorkflowTypeNeeded ? returnObj["rbtnWorkflowType"] = this.state.rbtnWorkflowType
                : "";

        }
        return returnObj;
    }

    private async _onDpChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption) {
        /// <summary>Event called on dropdown value change.</summary>


        //rutvik 13-3-24
        let coutryOfSelectedCompany = this.state.companyValuesWithCountry.filter(x => x.key === item.text);

        //rutvik 13-3-24
        this.setState({ ...this.state, [event.target.id]: item.text, countryOfCompany: coutryOfSelectedCompany[0].Country });

        //17-1-24 R - Jan24 CR change rutvik
        if (this.props.requestType === strings.RequestType[3] || this.props.requestType === strings.RequestType[6]) {
            let SelectedCompany = item.text.split('-')[0].trim();
            let accessLevels = this.props.accessLevel.split(',');

            //If there is multiple access levels
            if (accessLevels.length > 1) {
                let accessLevelRangeItems = await this.objWeb.lists.getByTitle('AccessLevelRange').items.select().getAll();
                accessLevelRangeItems.forEach((item) => {
                    if (Number(SelectedCompany) >= item.LowerRange && Number(SelectedCompany) <= item.UpperRange) {
                        this.setState({ currentCompanyAccessLevel: item.AccessLevel });
                        return true;
                    }
                })

                if (this.state.companyAccessLevelCompare !== this.state.currentCompanyAccessLevel) {
                    this.props.setCurrentCompanyAccessLevel(this.state.currentCompanyAccessLevel);
                    this.setState({ companyAccessLevelCompare: this.state.currentCompanyAccessLevel });
                }

            } else {
                this.setState({ currentCompanyAccessLevel: this.props.accessLevel });
            }
        }

        if (this.props.setSelectedCompany !== undefined) {
            this.props.setSelectedCompany(item.text);
        }

        //rutvik validate change
        let errors = this.state.errors;
        errors.dpCompany = '';
        this.setState({ errors: errors });
    }

    private _onRadioBtnChange(event: React.ChangeEvent<HTMLDivElement>) {
        /// <summary>execute when trip type changes</summary
        this.setState({ rbtnWorkflowType: event.target["value"] });
    }
}