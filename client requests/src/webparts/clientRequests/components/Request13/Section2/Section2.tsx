import * as React from 'react';
import { ISection2Props, ISection2State, IClientDetail } from './ISection2Props';
import { util, Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import { Dropdown, IDropdownOption, Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";

export default class Section2 extends React.Component<ISection2Props, ISection2State> {
	private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
	private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
	//private requestJson: any = null;
	//private clientJson: any = null;
	constructor(props: ISection2Props) {
		super(props);

		this.state = {
			loading: true,
			clientDetail: '',
			lblSocialName: '',
			lblLegalName: '',
			lblLine1: '',
			lblLine2: '',
			lblZipCode: '',
			lblPostal: '',
			lblCountyArea: '',
			lblCompanyRegNo: '',
			lblCountry: '',
			lblCurrency: '',
			lblTaxRegistrationNo: '',
			lblDefaultTaxCode: '',
			lblCompany: '',
			lblEmail: '',
			lblPhoneNo: '',
			lblCIN: '',
			lblPaymentTerms: '',
			lblWithHoldingTax: '',
			lblEmirate: '',
			lblPlaceOfSupply: '',
			lblGSTRegType: '',
			lblAccessLevel: '',
			lblClientAttentionName: '',
			lblInstruction: '',
			lblDeliverymethod: '',
			lblSector: '',
			lblClientStatus: '',
			lblClientType: '',
			lblParentClient: '',
			lblCustomerRemark4: '',
			lblCustomerRemark5: '',
			lblCustomerRemark7: '',
			lblCustomerRemark8: '',
			lblClientIDType: '',
			//rutvik employee dp change 3-3-23
			lblClientLead: '',
			lblCommercialManager: '',
			lblBiller: '',
			lblProjectAnalyst: '',
			lblResourceManager: '',
			dpClientIDType: { value: '', options: [] },
			dpCurrency: { value: '', options: [] },
			tbxCompanyRegistrationNumber: '',
			dpSector: { value: '', options: [] },
			dpClientType: { value: '', options: [] },
			requestor: '',
			currentUserid: '',
			requestorid: '',
			errors: {
				dpCurrency: '',
				selectedClient: '',
				tbxCompanyRegistrationNumber: '',
				clientRecordInProgress: ''
			},
			itemID: 0
		};
	}

	public async componentWillMount() {
		/// <summary>Bind data for read only and edit mode.</summary>		
		await this.BindData();//rutvik change
		await this.GetClient();

		//shraddha test 7
		await this.getClientIDTypeOptions();

		if (this.props.data === null || this.props.data === undefined) {
			await this.BindData();
		}

		if (this.props.listData !== null) {

			if (this.props.listData.Title !== null) {
				if (this.state.lblSocialName !== this.props.data["Title"]) {

				} else {
					this.setState({
						dpCurrency: Utils.GetDropdownStateValue(this.props.listData.Currency === null ? this.props.listData.Currency : this.props.listData.Currency.toUpperCase(), this.state.dpCurrency),
						tbxCompanyRegistrationNumber: this.props.listData.CompanyRegistrationNo,
						//dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData.ClientIDType === null ? this.props.listData.ClientIDType : this.props.listData.ClientIDType.toUpperCase(), this.state.dpClientIDType),
					});
				}

			} else {
				await this.SetTextboxValue();
			}
		} else {
			await this.SetTextboxValue();
		}

		if (this.props.data !== null && this.props.data !== undefined) {
			if (this.state.lblSocialName !== this.props.data["lblSocialName"]) {

			}
			else {
				if (this.props.data !== null && this.props.data !== undefined) {
					this.setState({ ...this.props.data });
				}
			}
		}

		this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
		this.setState({ loading: false });
	}

	//shraddha test 7
	public async getClientIDTypeOptions() {
		try {
			let ClientIDTypeOptions = this.state.dpClientIDType;
			let ClientTypeOption: any = [];
			let IsRequiredOptions: any = [];
			await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.CLIENTIDTYPE_INTERNALNAME).items.select("Title", "KSAClientDescription").getAll().then(async (record) => {
				record.filter((tempitem) => {
					if (tempitem.Title != null) {
						var obj1 = { 'key': (tempitem.Title + " - " + tempitem.KSAClientDescription), 'text': (tempitem.Title + " - " + tempitem.KSAClientDescription) };
						ClientTypeOption.push(obj1);
					}
				})
			})

			ClientIDTypeOptions.options = ClientTypeOption;
			await this.setState({
				dpClientIDType: ClientIDTypeOptions
			})

			this.setState({ loading: false });

		} catch (error) {
			console.log("getClientIDTypeOptions(Section4.tsx)--->", error);

		}

	}

	public render(): React.ReactElement<ISection2Props> {

		//document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;

		document.querySelector('#dpCurrency') !== null ? ((document.querySelector('#dpCurrency') as HTMLElement).querySelector(`#dpCurrency > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCurrency.value) !== '' && Utils.TrimData(this.state.dpCurrency.value) !== this.state.lblCurrency ? "yellow" : "white" : null;

		//document.querySelector('#dpClientIDType') !== null ? ((document.querySelector('#dpClientIDType') as HTMLElement).querySelector(`#dpClientIDType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== Utils.TrimData(this.state.clientDetail.lblClientIDType) ? Constants.YELLOW : Constants.WHITE : null;//Shraddha test 7

		//document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;

		//document.querySelector('#dpSector') !== null ? ((document.querySelector('#dpSector') as HTMLElement).querySelector(`#dpSector > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpSector.value) !== '' && Utils.TrimData(this.state.dpSector.value) !== this.state.clientDetail.lblSector ? "yellow" : "white" : null;

		//document.querySelector('#dpClientStatus') !== null ? ((document.querySelector('#dpClientStatus') as HTMLElement).querySelector(`#dpClientStatus > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientStatus.value) !== '' && Utils.TrimData(this.state.dpClientStatus.value) !== this.state.clientDetail.lblClientStatus ? "yellow" : "white" : null;

		//document.querySelector('#dpClientType') !== null ? ((document.querySelector('#dpClientType') as HTMLElement).querySelector(`#dpClientType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientType.value) !== '' && Utils.TrimData(this.state.dpClientType.value) !== this.state.clientDetail.lblClientType ? "yellow" : "white" : null;

		return (
			<div className="container-xl" style={{ position: "relative" }}>
				<div className="loading-css" style={{ display: this.state.loading ? "block" : "none" }}>
					<ClipLoader
						css={Constants.LOADING_CSS}
						size={50}
						color={Constants.LOADER_COLOR}
						loading={this.state.loading}
					/>
				</div>
				<div className="card-primary">
					<div className="card-header">
						<h3 className="">{strings.UpdateFields_Title}</h3>
					</div>
					<div className="card-body">

						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_Name}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_SocialName}</label>
										<p>{this.state.lblSocialName !== null ? this.state.lblSocialName : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_LegalName}</label>
										<p>{this.state.lblLegalName !== null ? this.state.lblLegalName : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								{/* <h6>{strings.Lbl_Name}</h6>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_SocialName}<sub>*</sub></label>
										<input id="tbxSocialName" disabled={this.checkIfFieldDisabled("tbxSocialName")} maxLength={255} className="form-control" type="text" value={this.state.tbxSocialName} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxSocialName) !== '' && Utils.TrimData(this.state.tbxSocialName) !== this.state.clientDetail.lblSocialName ? "yellow" : "white" }} />
										{this.state.errors.tbxSocialName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxSocialName} </Label>
										</span> : null}
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_LegalName}<sub>*</sub></label>
										<input id="tbxLegalName" disabled={this.checkIfFieldDisabled("tbxLegalName")} maxLength={255} className="form-control" type="text" value={this.state.tbxLegalName} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxLegalName) !== '' && Utils.TrimData(this.state.tbxLegalName) !== this.state.clientDetail.lblLegalName ? "yellow" : "white" }} />
										{this.state.errors.tbxLegalName.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxLegalName} </Label>
										</span> : null}
									</div>
								</div> */}
							</div>
						</div>

						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_Address}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_Line1}</label>
										<p>{this.state.lblLine1 !== null ? this.state.lblLine1 : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Line2}</label>
										<p>{this.state.lblLine2 !== null ? this.state.lblLine2 : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								{/* <h6>{strings.Lbl_Address}</h6>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Line1}<sub>*</sub></label>
										<input id="tbxLine1" disabled={this.checkIfFieldDisabled("tbxLine1")} maxLength={255} className="form-control" type="text" value={this.state.tbxLine1} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxLine1) !== '' && Utils.TrimData(this.state.tbxLine1) !== this.state.clientDetail.lblAddressLine1 ? "yellow" : "white" }} />
										{this.state.errors.tbxLine1.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxLine1} </Label>
										</span> : null}
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Line2}</label>
										<input id="tbxLine2" disabled={this.checkIfFieldDisabled("tbxLine2")} maxLength={255} className="form-control" type="text" value={this.state.tbxLine2} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxLine2) !== Utils.TrimData(this.state.clientDetail.lblAddressLine2) ? "yellow" : "white" }} />
									</div>
								</div> */}
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_ZipCode}</label>
										<p>{this.state.lblZipCode !== null ? this.state.lblZipCode : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Postal}</label>
										<p>{this.state.lblPostal !== null ? this.state.lblPostal : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								{/* <div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_ZipCode}</label>
										<input id="tbxZipcode" disabled={this.checkIfFieldDisabled("tbxZipcode")} maxLength={255} className="form-control" type="text" value={this.state.tbxZipcode} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxZipcode) !== Utils.TrimData(this.state.clientDetail.lblZipcode) ? "yellow" : "white" }} />
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Postal}<sub>*</sub></label>
										<input id="tbxPostalDistrictCity" disabled={this.checkIfFieldDisabled("tbxPostalDistrictCity")} maxLength={255} className="form-control" type="text" value={this.state.tbxPostalDistrictCity} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxPostalDistrictCity) !== '' && Utils.TrimData(this.state.tbxPostalDistrictCity) !== this.state.clientDetail.lblPostalDistrictCity ? "yellow" : "white" }} />
										{this.state.errors.tbxPostalDistrictCity.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxPostalDistrictCity} </Label>
										</span> : null}
									</div>
								</div> */}
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_CountryArea}</label>
										<p>{this.state.lblCountyArea !== null ? this.state.lblCountyArea : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Country}</label>
										<p>{this.state.lblCountry !== null ? this.state.lblCountry : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								{/* <div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_CountryArea}</label>
										<input id="tbxCountryAreaRegion" disabled={this.checkIfFieldDisabled("tbxCountryAreaRegion")} maxLength={255} className="form-control" type="text" value={this.state.tbxCountryAreaRegion} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCountryAreaRegion) !== Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion) ? "yellow" : "white" }} />
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Country}<sub>*</sub></label>
										<Dropdown id="dpCountry" disabled={this.checkIfFieldDisabled("dpCountry")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCountry.value} options={this.state.dpCountry.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpCountry.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpCountry} </Label>
										</span> : null}
									</div>
								</div> */}
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_GeneralInfo}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_Currency}</label>
										<p>{this.state.lblCurrency !== null ? this.state.lblCurrency : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_CompanyRegNo}</label>
										<p>{this.state.lblCompanyRegNo !== null ? this.state.lblCompanyRegNo : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Sector}</label>
										<p>{this.state.lblSector !== null ? this.state.lblSector : strings.EmptyData}</p>
									</div>
									{/* //rutvik 20-7 25 */}
									{/* <div className="form-group col-6">
										<label>{strings.Lbl_ClientStatus}</label>
										<p>{this.state.clientDetail.lblClientStatus !== null ? this.state.clientDetail.lblClientStatus : strings.EmptyData}</p>
									</div> */}
									<div className="form-group col-6">
										<label>{strings.Lbl_ClientType}</label>
										<p>{this.state.lblClientType !== null ? this.state.lblClientType : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<h6>{strings.Lbl_GeneralInfo}</h6>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Currency}<sub>*</sub></label>
										<Dropdown id="dpCurrency" disabled={this.checkIfFieldDisabled("dpCurrency")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCurrency.value} options={this.state.dpCurrency.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpCurrency.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpCurrency} </Label>
										</span> : null}
									</div>
									{this.state.lblCompanyRegNo == "" ?
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CompanyRegNo}<sub>*</sub></label>
											<input id="tbxCompanyRegistrationNumber" disabled={this.checkIfFieldDisabled("tbxCompanyRegistrationNumber")} maxLength={255} className="form-control" type="email"
												style={{ backgroundColor: (Utils.TrimData(this.state.tbxCompanyRegistrationNumber) !== Utils.TrimData(this.state.lblCompanyRegNo)) ? Constants.YELLOW : Constants.WHITE }} value={this.state.tbxCompanyRegistrationNumber} onChange={this._onTbxChange.bind(this)} placeholder="" />
											{this.state.errors.tbxCompanyRegistrationNumber.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCompanyRegistrationNumber} </Label>
											</span> : null}
										</div> : ""
									}

									{/* <div className="form-group col-sm-6">
										<label>{strings.Lbl_Sector}<sub>*</sub></label>
										<Dropdown id="dpSector" disabled={this.checkIfFieldDisabled("dpSector")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpSector.value} options={this.state.dpSector.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpSector.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpSector} </Label>
										</span> : null}
									</div> */}
									{/* //rutvik 20-7 25 */}
									{/* <div className="form-group col-sm-6">
										<label>{strings.Lbl_ClientStatus}<sub>*</sub></label>
										<Dropdown id="dpClientStatus" disabled={this.checkIfFieldDisabled("dpClientStatus")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientStatus.value} options={this.state.dpClientStatus.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpClientStatus.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpClientStatus} </Label>
										</span> : null}
									</div> */}
									{/* <div className="form-group col-sm-6">
										<label>{strings.Lbl_ClientType}<sub>*</sub></label>
										<Dropdown id="dpClientType" disabled={this.checkIfFieldDisabled("dpClientType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientType.value} options={this.state.dpClientType.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpClientType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpClientType} </Label>
										</span> : null}
									</div> */}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_TaxInformation}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_TaxRegNo}</label>
										<p>{this.state.lblTaxRegistrationNo !== null ? this.state.lblTaxRegistrationNo : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								{/* <h6>{strings.Lbl_TaxInformation}</h6>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_TaxRegNo}<sub>*</sub></label>
										<input id="tbxTaxRegistrationNumber" disabled={this.checkIfFieldDisabled("tbxTaxRegistrationNumber")} maxLength={255} className="form-control" type="text" value={this.state.tbxTaxRegistrationNumber} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== '' && Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== this.state.clientDetail.lblTaxRegistrationNo ? "yellow" : "white" }} />
										{this.state.errors.tbxTaxRegistrationNumber.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxTaxRegistrationNumber} </Label>
										</span> : null}
									</div>

								</div> */}
							</div>
						</div>
						{/* rutvik 6-7 24 */}
						{parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.ITALIAN_COMPANY) ?
							<div className="row">
								<div className="col-md-5 col-lg-6 form-info">
									<h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark4}</label>
											<p>{this.state.lblCustomerRemark4 !== null ? this.state.lblCustomerRemark4 : strings.EmptyData}</p>
										</div>
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark5}</label>
											<p>{this.state.lblCustomerRemark5 !== null ? this.state.lblCustomerRemark5 : strings.EmptyData}</p>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark8}</label>
											<p>{this.state.lblCustomerRemark8 !== null ? this.state.lblCustomerRemark8 : strings.EmptyData}</p>
										</div>
									</div>
								</div>

								<div className="col-md-7 col-lg-6">
									{/* <h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
									<div className="row">
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark4}<sub>*</sub></label>
											<input id="tbxCustomerRemark4" maxLength={255} className="form-control" type="text" value={this.state.tbxCustomerRemark4} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark4) !== '' && Utils.TrimData(this.state.tbxCustomerRemark4) !== this.state.clientDetail.lblCustomerRemark4 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark4.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark4} </Label>
											</span> : null}
										</div>
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark5}<sub>*</sub></label>
											<input id="tbxCustomerRemark5" maxLength={255} className="form-control" type="text" value={this.state.tbxCustomerRemark5} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark5) !== '' && Utils.TrimData(this.state.tbxCustomerRemark5) !== this.state.clientDetail.lblCustomerRemark5 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark5.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark5} </Label>
											</span> : null}
										</div>
									</div> */}
								</div>
							</div> : null}

						{(parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[0]) || parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[1]) || parseInt(this.props.approvalData.company.split('-')[0].trim()) === parseInt(Constants.SAUDI_COMPANY[2])) ?
							<div className="row">
								<div className="col-md-5 col-lg-6 form-info">
									<h6>{strings.Lbl_SaudiSpecificData}</h6>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark7}</label>
											<p>{this.state.clientDetail.lblCustomerRemark7 !== null ? this.state.clientDetail.lblCustomerRemark7 : strings.EmptyData}</p>
										</div>
										<div className="form-group col-6">
											<label>{strings.Lbl_ClientIDType}</label>
											<p>{this.state.clientDetail.ClientIDType !== null ? Utils.GetClientIDTypeDescription(this.state.clientDetail.ClientIDType, this.state.dpClientIDType) : strings.EmptyData}</p>
										</div>
									</div>
								</div>
								<div className="col-md-7 col-lg-6">
									{/* <h6>{strings.Lbl_SaudiSpecificData}</h6>
									<div className="row">
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark7}<sub>*</sub></label>
											<input id="tbxCustomerRemark7" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark7")} className="form-control" type="text" value={this.state.tbxCustomerRemark7} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark7) !== '' && Utils.TrimData(this.state.tbxCustomerRemark7) !== this.state.clientDetail.lblCustomerRemark7 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark7.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark7} </Label>
											</span> : null}
										</div>

									</div> */}
									{/* {/ Shraddha test 7 /} */}
								</div>
							</div> : null}

					</div>
					{
						this.state.errors.clientRecordInProgress.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
							<Label className="errormessage text-left" >{this.state.errors.clientRecordInProgress} </Label>
						</span> : null
					}
					{
						this.state.errors.selectedClient.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
							<Label className="errormessage text-left" >{this.state.errors.selectedClient} </Label>
						</span> : null
					}
					<CardFooter {...this.props} backBtnMethod={this._BackClick.bind(this)} nextBtnMethod={this._NextClick.bind(this)} saveForLaterBtnMethod={this._SaveForLaterClick.bind(this)} />
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

	public async componentDidMount() {
		this.forceUpdate();

		//rutvik 6-7 24		
		// var companyNumber = [];
		// await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("Company").get().then((data) => {
		// 	companyNumber = data.Company.split('-');
		// 	var number = parseInt(companyNumber[0].trim());
		// 	this.setState({ tbxCompany: number });
		// });
		//endr

		//Shraddha 08-08-22 item 4
		var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
		var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

		this.setState({ currentUserid: currentUserID });
		this.setState({ requestorid: requestoridd });
		//Shraddha 08-08-22 item 4 end

	}

	private async _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
		/// <summary>On texbox value change set value into state property.</summary>
		event.preventDefault();
		const { id, value } = event.target;
		this.setState({ ...this.state, [id]: value });

		//rutvik validate change
		let errors = this.state.errors;
		if (id === "tbxCompanyRegistrationNumber") errors.tbxCompanyRegistrationNumber = '';
		this.setState({ errors: errors });
		//end

	}

	private async BindData() {
		/// <summary>Bind DropDown list.</summary>

		var tempStateObj = {};
		for (var i = 0; i < Constants.MASTER_DROPDOWNS_REQ13.length; i++) {
			let options = await Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS_REQ13[i].name);
			var tempObj = this.state[Constants.MASTER_DROPDOWNS_REQ13[i].key];
			tempObj.options = options;
			options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS_REQ13[i].key] = tempObj : [];
		}

	}

	private async _onDropDownChange(event: React.ChangeEvent<HTMLDivElement>, item: IDropdownOption) {
		/// <summary>On DropDown change set state property of dropdown.</summary>
		try {
			var tempObj = this.state[event.target.id];
			tempObj.value = item.text;
			this.setState({ ...this.state, [event.target.id]: tempObj });

			//rutvik validate change
			let errors = this.state.errors;
			if (event.target.id === "dpCurrency") errors.dpCurrency = '';
			this.setState({ errors: errors });
			//end			

		} catch (error) {
			console.log("OnCompany change", error);
		}
	}

	private async GetClient() {
		/// <summary>Fetch client data to display in read only mode.</summary>
		try {
			var data = this.props.selectedClientData;

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
				if ((item.CustomerType == "legal client") && isAccessLevelPresent && item.MaconomyAccountID === this.props.approvalData.maconomyAccountID) {
					tempArray.push(item);
				}
			}
			);

			let item = tempArray[0];

			if (item !== null && item !== undefined) {
				let isListDataExists = false;

				if (this.props.listData !== null && this.props.listData !== undefined) {
					if (this.props.listData["MaconomyAccountID"].toLocaleLowerCase() == this.props.approvalData.maconomyAccountID.toLocaleLowerCase()) {
						isListDataExists = true;
						//this.state.dpCurrency.value = this.props.listData["Currency"];
					}
				}

				if (isListDataExists) {
					this.setState({
						lblSocialName: Utils.TrimData(item["Title"]),
						lblLegalName: Utils.TrimData(item["LegalName"]),
						lblLine1: Utils.TrimData(item["Line1"]),
						lblLine2: Utils.TrimData(item["Line2"]),
						lblZipCode: Utils.TrimData(item["Zipcode"]),
						lblPostal: Utils.TrimData(item["Postal_District_City"]),
						lblCountyArea: Utils.TrimData(item["Country_Area_Region"]),
						lblCountry: Utils.TrimData(item["Country"]),
						lblCompanyRegNo: Utils.TrimData(item["CompanyRegistrationNo"]),

						lblCurrency: Utils.TrimData(item["Currency"]),
						lblTaxRegistrationNo: Utils.TrimData(item["TaxRegistrationNo"]),
						lblDefaultTaxCode: Utils.TrimData(item["DefaultTaxCode"]),
						lblCompany: this.props.approvalData.company,
						lblEmail: Utils.TrimData(item["Email"]),
						lblPhoneNo: Utils.TrimData(item["PhoneNo"]),
						lblCIN: Utils.TrimData(item["CIN"]),
						lblPaymentTerms: Utils.TrimData(item["PaymentTerms"]),
						lblWithHoldingTax: Utils.TrimData(item["WithholdingTaxType"]),
						lblEmirate: Utils.TrimData(item["Emirate"]),
						lblPlaceOfSupply: Utils.TrimData(item["PlaceofSupply"]),
						lblGSTRegType: Utils.TrimData(item["GSTRegistrationType"]),
						lblAccessLevel: Utils.TrimData(item["AccessLevel"]),

						lblClientAttentionName: Utils.TrimData(item["ClientAttentionName"]),
						lblInstruction: Utils.TrimData(item["Instructions"]),
						lblDeliverymethod: Utils.TrimData(item["DeliveryMethod"]),
						lblSector: Utils.TrimData(item["Sector"]),
						lblClientStatus: Utils.TrimData(item["ClientStatus"]),
						lblClientType: Utils.TrimData(item["ClientType"]),
						lblParentClient: Utils.TrimData(item["ParentClient"]),
						lblCustomerRemark4: Utils.TrimData(item["CustomerRemark4"]),
						lblCustomerRemark5: Utils.TrimData(item["CustomerRemark5"]),
						tbxCompanyRegistrationNumber: this.props.listData["CompanyRegistrationNo"],
						lblClientIDType: Utils.GetClientIDTypeDescription(item["ClientIDType"], this.state.dpClientIDType),
						lblCustomerRemark8: Utils.TrimData(item["CustomerRemark8"]),
						lblCustomerRemark7: Utils.TrimData(item["CustomerRemark7"]),
						//rutvik employee dp change 3-3-23
						lblClientLead: Utils.TrimData(item["ClientLead"]),
						lblCommercialManager: Utils.TrimData(item["CommercialManager"]),
						lblBiller: Utils.TrimData(item["Biller"]),
						lblProjectAnalyst: Utils.TrimData(item["ProjectAnalyst"]),
						lblResourceManager: Utils.TrimData(item["ResourceManager"]),
					});
					this.state.dpCurrency.value = this.props.listData["Currency"];
				}
				else {
					this.setClientValue(item);
				}
				item = null;
				tempArray = [];
			}

		} catch (error) {
			console.log("ClientData--->", error);
		}
	}

	private setClientValue(item) {
		this.setState({
			lblSocialName: Utils.TrimData(item["Title"]),
			lblLegalName: Utils.TrimData(item["LegalName"]),
			lblLine1: Utils.TrimData(item["Line1"]),
			lblLine2: Utils.TrimData(item["Line2"]),
			lblZipCode: Utils.TrimData(item["Zipcode"]),
			lblPostal: Utils.TrimData(item["Postal_District_City"]),
			lblCountyArea: Utils.TrimData(item["Country_Area_Region"]),
			lblCountry: Utils.TrimData(item["Country"]),
			lblCompanyRegNo: Utils.TrimData(item["CompanyRegistrationNo"]),

			lblCurrency: Utils.TrimData(item["Currency"]),
			lblTaxRegistrationNo: Utils.TrimData(item["TaxRegistrationNo"]),
			lblDefaultTaxCode: Utils.TrimData(item["DefaultTaxCode"]),
			lblCompany: this.props.approvalData.company,
			lblEmail: Utils.TrimData(item["Email"]),
			lblPhoneNo: Utils.TrimData(item["PhoneNo"]),
			lblCIN: Utils.TrimData(item["CIN"]),
			lblPaymentTerms: Utils.TrimData(item["PaymentTerms"]),
			lblWithHoldingTax: Utils.TrimData(item["WithholdingTaxType"]),
			lblEmirate: Utils.TrimData(item["Emirate"]),
			lblPlaceOfSupply: Utils.TrimData(item["PlaceofSupply"]),
			lblGSTRegType: Utils.TrimData(item["GSTRegistrationType"]),
			lblAccessLevel: Utils.TrimData(item["AccessLevel"]),

			lblClientAttentionName: Utils.TrimData(item["ClientAttentionName"]),
			lblInstruction: Utils.TrimData(item["Instructions"]),
			lblDeliverymethod: Utils.TrimData(item["DeliveryMethod"]),
			lblSector: Utils.TrimData(item["Sector"]),
			lblClientStatus: Utils.TrimData(item["ClientStatus"]),
			lblClientType: Utils.TrimData(item["ClientType"]),
			lblParentClient: Utils.TrimData(item["ParentClient"]),
			lblCustomerRemark4: Utils.TrimData(item["CustomerRemark4"]),
			lblCustomerRemark5: Utils.TrimData(item["CustomerRemark5"]),
			tbxCompanyRegistrationNumber: Utils.TrimData(item["CompanyRegistrationNo"]),
			lblCustomerRemark8: Utils.TrimData(item["CustomerRemark8"]),
			lblCustomerRemark7: Utils.TrimData(item["CustomerRemark7"]),
			lblClientIDType: Utils.GetClientIDTypeDescription(item["ClientIDType"], this.state.dpClientIDType),
			//rutvik employee dp change 3-3-23
			lblClientLead: Utils.TrimData(item["ClientLead"]),
			lblCommercialManager: Utils.TrimData(item["CommercialManager"]),
			lblBiller: Utils.TrimData(item["Biller"]),
			lblProjectAnalyst: Utils.TrimData(item["ProjectAnalyst"]),
			lblResourceManager: Utils.TrimData(item["ResourceManager"]),

			dpCurrency: Utils.GetDropdownStateValue(
				Utils.GetSelectedDropdownValue(Utils.TrimData(item["Currency"]), this.state.dpCurrency), this.state.dpCurrency),

		});
	}


	private async _BackClick() {
		/// <summary>Back button click event.</summary>
		await this.props.dataChange("section2Data", this.state); //rutvik change
		this.props.backStep();
	}

	private async _NextClick() {
		/// <summary>Next button click event.</summary>
		this.setState({ loading: true }); //9-2-23
		if (await this.saveDataOperation()) {
			// this.clientJson = {
			// 	SocialName: Utils.TrimData(this.state.clientDetail.lblSocialName),
			// 	LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
			// 	Line1: Utils.TrimData(this.state.clientDetail.lblAddressLine1),
			// 	Line2: Utils.TrimData(this.state.clientDetail.lblAddressLine2),
			// 	Zipcode: Utils.TrimData(this.state.clientDetail.lblZipcode),
			// 	PostalDistrictCity: Utils.TrimData(this.state.clientDetail.lblPostalDistrictCity),
			// 	Country: Utils.TrimData(this.state.clientDetail.lblCountry),
			// 	Currency: Utils.TrimData(this.state.clientDetail.lblCurrency),
			// 	CountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion),
			// 	CompanyRegistrationNumber: Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber),
			// 	Sector: Utils.TrimData(this.state.clientDetail.lblSector),
			// 	//rutvik 20-7 25
			// 	//ClientStatus: Utils.TrimData(this.state.clientDetail.lblClientStatus),
			// 	//endr
			// 	ClientType: Utils.TrimData(this.state.clientDetail.lblClientType),
			// 	TaxRegistrationNo: Utils.TrimData(this.state.clientDetail.lblTaxRegistrationNo),
			// 	//rutvik 6-7 24
			// 	CustomerRemark4: Utils.TrimData(this.state.clientDetail.lblCustomerRemark4),
			// 	CustomerRemark5: Utils.TrimData(this.state.clientDetail.lblCustomerRemark5),
			// 	//endr
			// };
			// this.requestJson = {
			// 	SocialName: this.state.tbxSocialName,
			// 	LegalName: this.state.tbxLegalName,
			// 	Line1: this.state.tbxLine1,
			// 	Line2: this.state.tbxLine2 === null ? "" : this.state.tbxLine2,
			// 	Zipcode: this.state.tbxZipcode === null ? "" : this.state.tbxZipcode,
			// 	PostalDistrictCity: this.state.tbxPostalDistrictCity,
			// 	Country: this.state.dpCountry.value,
			// 	Currency: this.state.dpCurrency.value,
			// 	CountryAreaRegion: this.state.tbxCountryAreaRegion === null ? "" : this.state.tbxCountryAreaRegion,
			// 	CompanyRegistrationNumber: this.state.tbxCompanyRegistrationNumber === null ? "" : this.state.tbxCompanyRegistrationNumber,
			// 	Sector: this.state.dpSector.value,
			// 	//rutvik 20-7 25
			// 	//ClientStatus: this.state.dpClientStatus.value,
			// 	//endr
			// 	ClientType: this.state.dpClientType.value,
			// 	TaxRegistrationNo: this.state.tbxTaxRegistrationNumber,
			// 	//rutvik 6-7 24
			// 	CustomerRemark4: this.state.tbxCustomerRemark4,
			// 	CustomerRemark5: this.state.tbxCustomerRemark5
			// 	//endr
			// };

			this.setState({ loading: false }, async () => {
				await this.props.dataChange("section2Data", this.state);
				//await this.props.dataChange("requestJson", this.requestJson);
				//await this.props.dataChange("clientJson", this.clientJson);
				await this.props.nextStep();
			});
		} else {
			this.setState({ loading: false }); //9-2-23
		}
	}

	private async _SaveForLaterClick() {
		/// <summary>Save for later button click event.</summary>
		this.setState({ loading: true }); //9-2-23
		if (await this.saveDataOperation()) {
			window.location.href = this.props.context.pageContext.web.absoluteUrl;
		}
	}

	private async validationSection2() {
		/// <summary>Validate required fields available or not.</summary>
		let errors = this.state.errors;

		errors.dpCurrency = (Utils.CheckRequiredField(this.state.dpCurrency.value) === false) ? strings.CantLeaveBlankMsg : "";
		if (this.state.lblCompanyRegNo == "") {
			errors.tbxCompanyRegistrationNumber = (Utils.CheckRequiredField(this.state.tbxCompanyRegistrationNumber) === false) ? strings.CantLeaveBlankMsg : "";
			this.setState({ loading: false }); //9-2-2023
		}

		await this.validateClientCurrency();
		//await this.validateClientCurrencyCompany();
		await this.validateRequestInProgress();

		this.setState({ errors: errors });
		let valid = true;
		Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null });
		return valid;
	}

	private async validateClientCurrency() {
		//Can not create vendor with same currency
		let errors = this.state.errors;
		if (Utils.CheckRequiredField(this.state.dpCurrency.value) !== false) {
			// let data = await Services.GetSingleListData(this.objWeb, this.props.objContext.pageContext.web.serverRelativeUrl + CommonConstants.COMPANYVENDORLISTURL, viewXML);
			var tempData = await this.objWeb.lists.getByTitle(Constants.CUSTOMERCARD_INTERNALNAME).items.select().getAll();
			let tempArray = [];
			tempData.filter((item) => {
				let isAccessLevelPresent: boolean = false;
				if (item.AccessLevel === this.state.lblAccessLevel) {
					isAccessLevelPresent = true;
				} else {
					if (item["AccessLevel"] !== null && this.state.lblAccessLevel !== null) {
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
				if (item.MaconomyAccountID == this.props.approvalData.maconomyAccountID && item.Currency == this.state.dpCurrency.value && isAccessLevelPresent) {
					tempArray.push(item);
				}
			});

			let data;
			data = tempArray[0];

			if (data != null) {
				errors.selectedClient = strings.ClientAlreadyExist + data["MaconomyAccountID"] + "  & Currency : " + data["Currency"];
			}
			else {
				errors.selectedClient = '';
			}
		}
	}

	private async validateRequestInProgress() {
		let errors = this.state.errors;
		// let data = await Services.GetSingleListData(this.objWeb, this.props.objContext.pageContext.web.serverRelativeUrl + CommonConstants.COMPANYVENDORLISTURL, viewXML);
		var tempData = await this.objWeb.lists.getByTitle(Constants.REQUESTS_INTERNALNAME).items.select().getAll();
		let tempArray = [];
		tempData.filter((item) => {
			let isAccessLevelPresent: boolean = false;
			if (item.AccessLevel === this.state.lblAccessLevel) {
				isAccessLevelPresent = true;
			} else {
				if (item["AccessLevel"] !== null && this.state.lblAccessLevel !== null) {
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
			if ((item.StatusIndicator == "Submitted" || item.StatusIndicator == "Partially Approved") && item.Title == this.state.lblSocialName && item.Currency == this.state.dpCurrency.value && isAccessLevelPresent && item.ID !== this.props.itemID) {
				tempArray.push(item);
			}
		});

		let data;
		data = tempArray[0];

		if (data != null) {
			errors.clientRecordInProgress = strings.ClientInProgressString1 + this.state.lblSocialName + " with Currency : " + data["Currency"] + strings.ClientInProgressString1;
		}
		else {
			errors.clientRecordInProgress = '';
		}
	}

	private async saveData() {
		/// <summary>Save data in list.</summary>
		try {
			this.setState({
				loading: true
			}, async () => {

				var tempData = {
					Title: Utils.TrimData(this.state.lblSocialName),
					LegalName: Utils.TrimData(this.state.lblLegalName),
					Line1: Utils.TrimData(this.state.lblLine1),
					Line2: Utils.TrimData(this.state.lblLine2),
					Zipcode: Utils.TrimData(this.state.lblZipCode),
					Postal_District_City: Utils.TrimData(this.state.lblPostal),
					Country_Area_Region: Utils.TrimData(this.state.lblCountyArea),
					Country: this.state.lblCountry,
					Currency: this.state.dpCurrency.value,
					CompanyRegistrationNo: this.state.lblCompanyRegNo == "" ? this.state.tbxCompanyRegistrationNumber : Utils.TrimData(this.state.lblCompanyRegNo),
					ClientType: this.state.lblClientType,
					TaxRegistrationNo: Utils.TrimData(this.state.lblTaxRegistrationNo),
					DefaultTaxCode: Utils.TrimData(this.state.lblDefaultTaxCode),
					Email: Utils.TrimData(this.state.lblEmail),
					PhoneNo: Utils.TrimData(this.state.lblPhoneNo),
					CIN: Utils.TrimData(this.state.lblCIN),
					PaymentTerms: Utils.TrimData(this.state.lblPaymentTerms),
					WithholdingTaxType: Utils.TrimData(this.state.lblWithHoldingTax),
					Emirate: Utils.TrimData(this.state.lblEmirate),
					PlaceofSupply: Utils.TrimData(this.state.lblPlaceOfSupply),
					GSTRegistrationType: Utils.TrimData(this.state.lblGSTRegType),
					AccessLevel: Utils.TrimData(this.state.lblAccessLevel),

					ClientAttentionName: Utils.TrimData(this.state.lblClientAttentionName),
					Instructions: Utils.TrimData(this.state.lblInstruction),
					DeliveryMethod: Utils.TrimData(this.state.lblDeliverymethod),
					Sector: Utils.TrimData(this.state.lblSector),
					ClientStatus: Utils.TrimData(this.state.lblClientStatus),
					// ParentClient: Utils.TrimData(this.state.lblParentClient),
					CustomerRemark4: Utils.TrimData(this.state.lblCustomerRemark4),
					CustomerRemark5: Utils.TrimData(this.state.lblCustomerRemark5),
					CustomerRemark8: Utils.TrimData(this.state.lblCustomerRemark8),
					CustomerRemark7: Utils.TrimData(this.state.lblCustomerRemark7),
					ClientIDType: Utils.SplitData(this.state.lblClientIDType),
					//rutvik employee dp change 3-3-23
					ClientLead: this.state.lblClientLead,
					CommercialAnalyst: this.state.lblCommercialManager,
					Biller: this.state.lblBiller,
					ProjectAnalyst: this.state.lblProjectAnalyst,
					ResourceManager: this.state.lblResourceManager
				};

				if (this.props.itemID > 0) {
					await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then((res) => {
					});
				}

			});
		} catch (error) {
			this.setState({ loading: false });
			//error log change
			let errordata = {
				Title: new Date(),
				Errors: error,
				RequestID: this.props.itemID
			}
			await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.ERRORLIST).items.add(errordata);
			//error log change end
			console.log("Save Data--->", error);
		}
	}

	private async saveDataOperation() {
		/// <summary>Validate and save data operations.</summary>
		try {
			if (await this.validationSection2() === false) {
				return false;
			}
			await this.saveData();
			return true;
		} catch (error) {
			console.log("Save Data Operation--->", error);
		}
	}

	private SetTextboxValue() {
		this.setState({
			// tbxSocialName: this.state.clientDetail.lblSocialName,
			// tbxLegalName: this.state.clientDetail.lblLegalName,
			// tbxLine1: this.state.clientDetail.lblAddressLine1,
			// tbxLine2: this.state.clientDetail.lblAddressLine2,
			// tbxZipcode: this.state.clientDetail.lblZipcode,
			// tbxPostalDistrictCity: this.state.clientDetail.lblPostalDistrictCity,
			// tbxCountryAreaRegion: this.state.clientDetail.lblCountryAreaRegion,
			// tbxCompanyRegistrationNumber: this.state.clientDetail.lblCompanyRegistrationNumber,
			// tbxTaxRegistrationNumber: this.state.clientDetail.lblTaxRegistrationNo,
			// dpCountry: Utils.GetDropdownStateValue(this.state.clientDetail.lblCountry, this.state.dpCountry),
			dpCurrency: Utils.GetDropdownStateValue(this.state.clientDetail.lblCurrency === null ? this.state.lblCurrency : this.state.lblCurrency.toUpperCase(), this.state.dpCurrency),
			//dpClientIDType: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientIDType === null ? this.state.lblClientIDType : this.state.lblClientIDType.toUpperCase(), this.state.dpClientIDType),
			// dpSector: Utils.GetDropdownStateValue(this.state.clientDetail.lblSector, this.state.dpSector),
			// //rutvik 20-7 25
			// //dpClientStatus: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientStatus, this.state.dpClientStatus),
			// //endr
			// dpClientType: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientType, this.state.dpClientType),
			// tbxCustomerRemark4: this.state.clientDetail.lblCustomerRemark4,
			// tbxCustomerRemark5: this.state.clientDetail.lblCustomerRemark5
		});
	}
}