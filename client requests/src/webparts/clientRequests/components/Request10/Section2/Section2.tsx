import * as React from 'react';
import { ISection2Props, ISection2State, IClientDetail } from './ISection2Props';
import { Web } from 'sp-pnp-js';
import * as Constants from '../../../Constants';
import * as Utils from '../../Utils';
import { Dropdown, IDropdownOption, Icon, Label } from 'office-ui-fabric-react';
import CardFooter from '../../common/CardFooter/CardFooter';
import * as strings from 'ClientRequestsWebPartStrings';
import ClipLoader from "react-spinners/ClipLoader";

export default class Section2 extends React.Component<ISection2Props, ISection2State> {
	private serverRelativeURL: string = this.props.context.pageContext.web.serverRelativeUrl;
	private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);
	private requestJson: any = null;
	private clientJson: any = null;
	constructor(props: ISection2Props) {
		super(props);

		this.state = {
			loading: true,
			clientDetail: '',
			tbxSocialName: '',
			tbxLegalName: '',
			tbxLine1: '',
			tbxLine2: '',
			tbxZipcode: '',
			tbxTaxRegistrationNumber: '',
			tbxCustomerRemark4: '',
			tbxCustomerRemark5: '',
			tbxCompany: null,
			tbxCustomerRemark8: '',
			tbxCustomerRemark7: '',
			dpClientIDType: { value: '', options: [] },
			tbxPostalDistrictCity: '',
			dpCountry: { value: '', options: [] },
			tbxCountryAreaRegion: '',
			tbxCompanyRegistrationNumber: '',
			dpSector: { value: '', options: [] },
			dpClientType: { value: '', options: [] },
			requestor: '',
			currentUserid: '',
			requestorid: '',
			//rutvik 13-3-24
			tbxLegalNameInArabic: '',
			tbxArabicLine1: '',
			tbxArabicLine2: '',
			// tbxArabicZipCode: '',
			tbxArabicPostalDistrict: '',
			tbxArabicCountryAreaRegion: '',
			errors: {
				tbxSocialName: '',
				tbxLegalName: '',
				tbxLine1: '',
				tbxPostalDistrictCity: '',
				tbxTaxRegistrationNumber: '',
				tbxCustomerRemark4: '',
				tbxCustomerRemark5: '',
				tbxCustomerRemark8: '',
				tbxCustomerRemark7: '',
				dpClientIDType: '',
				dpCountry: '',
				dpSector: '',
				dpClientType: '',
				//rutvik 13-3-24
				tbxLegalNameInArabic: '',
				tbxArabicLine1: '',
				tbxArabicLine2: '',
				// tbxArabicZipCode: '',
				tbxArabicPostalDistrict: '',
				tbxArabicCountryAreaRegion: '',
				tbxZipcode: ''
			},
			itemID: 0
		};
	}

	public async componentWillMount() {
		/// <summary>Bind data for read only and edit mode.</summary>		
		if (this.props.data === null || this.props.data === undefined) {
			await this.BindData();
		}
		//shraddha test 7
		await this.getClientIDTypeOptions();

		await this.GetClient();

		if (this.props.listData !== null) {

			if (this.props.listData.Title !== null) {
				this.setState({
					tbxSocialName: this.props.listData.Title,
					tbxLegalName: this.props.listData.LegalName,
					tbxLine1: this.props.listData.Line1,
					tbxLine2: this.props.listData.Line2,
					tbxZipcode: this.props.listData.Zipcode,
					tbxPostalDistrictCity: this.props.listData.Postal_District_City,
					tbxCountryAreaRegion: this.props.listData.Country_Area_Region,
					tbxCompanyRegistrationNumber: this.props.listData.CompanyRegistrationNo,
					tbxTaxRegistrationNumber: this.props.listData.TaxRegistrationNo,
					dpCountry: Utils.GetDropdownStateValue(this.props.listData.Country, this.state.dpCountry),
					//dpCurrency: Utils.GetDropdownStateValue(this.props.listData.Currency === null ? this.props.listData.Currency : this.props.listData.Currency.toUpperCase(), this.state.dpCurrency),
					dpSector: Utils.GetDropdownStateValue(this.props.listData.Sector, this.state.dpSector),
					//rutvik 20-7 25
					//dpClientStatus: Utils.GetDropdownStateValue(this.props.listData.ClientStatus, this.state.dpClientStatus),
					//endr
					dpClientType: Utils.GetDropdownStateValue(this.props.listData.ClientType, this.state.dpClientType),
					tbxCustomerRemark4: this.props.listData.CustomerRemark4,
					tbxCustomerRemark5: this.props.listData.CustomerRemark5,
					tbxCustomerRemark8: this.props.listData.CustomerRemark8,
					tbxCustomerRemark7: this.props.listData.CustomerRemark7,
					//rutvik 13-3-24
					tbxLegalNameInArabic: this.props.listData.LegalNameInArabic,
					tbxArabicLine1: this.props.listData.ArabicLine1,
					tbxArabicLine2: this.props.listData.ArabicLine2,
					// tbxArabicZipCode: this.props.listData.ArabicZipCode,
					tbxArabicPostalDistrict: this.props.listData.ArabicPostalDistrict,
					tbxArabicCountryAreaRegion: this.props.listData.ArabicCountryAreaRegion,
					//end
					dpClientIDType: Utils.GetDropdownStateValueClientIDType(this.props.listData["ClientIDType"], this.state.dpClientIDType),//Shraddha test 7
				});
			} else {
				await this.SetTextboxValue();
			}
		} else {
			await this.SetTextboxValue();
		}

		if (this.props.data !== null && this.props.data !== undefined) {
			this.setState({ ...this.props.data });
		}
		this.props.itemID > 0 ? this.setState({ itemID: this.props.itemID }) : null;
		this.setState({ loading: false });

		//Shraddha 08-08-22 item 4
		var currentUserID = await Utils.GetCurrentUserId(this.objWeb);
		var requestoridd = (this.props.listData != null || this.props.listData != undefined) ? this.props.listData.RequestorId : "";

		this.setState({ currentUserid: currentUserID });
		this.setState({ requestorid: requestoridd });
		//Shraddha 08-08-22 item 4 end
	}

	public render(): React.ReactElement<ISection2Props> {

		document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;

		//document.querySelector('#dpCurrency') !== null ? ((document.querySelector('#dpCurrency') as HTMLElement).querySelector(`#dpCurrency > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCurrency.value) !== '' && Utils.TrimData(this.state.dpCurrency.value) !== this.state.clientDetail.lblCurrency ? "yellow" : "white" : null;

		document.querySelector('#dpCountry') !== null ? ((document.querySelector('#dpCountry') as HTMLElement).querySelector(`#dpCountry > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpCountry.value) !== '' && Utils.TrimData(this.state.dpCountry.value) !== this.state.clientDetail.lblCountry ? "yellow" : "white" : null;

		document.querySelector('#dpSector') !== null ? ((document.querySelector('#dpSector') as HTMLElement).querySelector(`#dpSector > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpSector.value) !== '' && Utils.TrimData(this.state.dpSector.value) !== this.state.clientDetail.lblSector ? "yellow" : "white" : null;

		//document.querySelector('#dpClientStatus') !== null ? ((document.querySelector('#dpClientStatus') as HTMLElement).querySelector(`#dpClientStatus > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientStatus.value) !== '' && Utils.TrimData(this.state.dpClientStatus.value) !== this.state.clientDetail.lblClientStatus ? "yellow" : "white" : null;

		document.querySelector('#dpClientType') !== null ? ((document.querySelector('#dpClientType') as HTMLElement).querySelector(`#dpClientType > span`) as HTMLElement).style.backgroundColor = Utils.TrimData(this.state.dpClientType.value) !== '' && Utils.TrimData(this.state.dpClientType.value) !== this.state.clientDetail.lblClientType ? "yellow" : "white" : null;

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
										<p>{this.state.clientDetail.lblSocialName !== null ? this.state.clientDetail.lblSocialName : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_LegalName}</label>
										<p>{this.state.clientDetail.lblLegalName !== null ? this.state.clientDetail.lblLegalName : strings.EmptyData}</p>
									</div>
								</div>
								{this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_LegalNameInArabic}</label>
											<p>{this.state.clientDetail.lblLegalNameInArabic !== null ? this.state.clientDetail.lblLegalNameInArabic : strings.EmptyData}</p>
										</div>
									</div> : null}
							</div>
							<div className="col-md-7 col-lg-6">
								<h6>{strings.Lbl_Name}</h6>
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
								</div>
								{this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
									<div className="row">
										<div className="form-group col-sm-6">
											<label className='arabic-right-text'>{strings.Lbl_LegalNameInArabic}<sub>*</sub></label>
											<input id="tbxLegalNameInArabic" disabled={this.checkIfFieldDisabled("tbxLegalNameInArabic")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxLegalNameInArabic} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxLegalNameInArabic) !== '' && Utils.TrimData(this.state.tbxLegalNameInArabic) !== this.state.clientDetail.lblLegalNameInArabic ? "yellow" : "white" }} />
											{this.state.errors.tbxLegalNameInArabic.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxLegalNameInArabic} </Label>
											</span> : null}
										</div>
									</div> : null}
							</div>
						</div>

						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_Address}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_Line1}</label>
										<p>{this.state.clientDetail.lblAddressLine1 !== null ? this.state.clientDetail.lblAddressLine1 : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Line2}</label>
										<p>{this.state.clientDetail.lblAddressLine2 !== null ? this.state.clientDetail.lblAddressLine2 : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<h6>{strings.Lbl_Address}</h6>
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
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_ZipCode}</label>
										<p>{this.state.clientDetail.lblZipcode !== null ? this.state.clientDetail.lblZipcode : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Postal}</label>
										<p>{this.state.clientDetail.lblPostalDistrictCity !== null ? this.state.clientDetail.lblPostalDistrictCity : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_ZipCode}{this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ? <sub>*</sub> : null}</label>
										<input id="tbxZipcode" disabled={this.checkIfFieldDisabled("tbxZipcode")} maxLength={255} className="form-control" type="text" value={this.state.tbxZipcode} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxZipcode) !== Utils.TrimData(this.state.clientDetail.lblZipcode) ? "yellow" : "white" }} />
										{this.state.errors.tbxZipcode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxZipcode} </Label>
										</span> : null}
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Postal}<sub>*</sub></label>
										<input id="tbxPostalDistrictCity" disabled={this.checkIfFieldDisabled("tbxPostalDistrictCity")} maxLength={255} className="form-control" type="text" value={this.state.tbxPostalDistrictCity} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxPostalDistrictCity) !== '' && Utils.TrimData(this.state.tbxPostalDistrictCity) !== this.state.clientDetail.lblPostalDistrictCity ? "yellow" : "white" }} />
										{this.state.errors.tbxPostalDistrictCity.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxPostalDistrictCity} </Label>
										</span> : null}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_CountryArea}</label>
										<p>{this.state.clientDetail.lblCountryAreaRegion !== null ? this.state.clientDetail.lblCountryAreaRegion : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Country}</label>
										<p>{this.state.clientDetail.lblCountry !== null ? this.state.clientDetail.lblCountry : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<div className="row">
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
								</div>
							</div>
						</div>

						{/* rutvik 14-3-24 */}
						{this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY ?
							<>
								<div className="row">
									<div className="col-md-5 col-lg-6 form-info">
										<h6>{strings.Lbl_ArabicAddress}</h6>
										<div className="row">
											<div className="form-group col-6">
												<label>{strings.Lbl_ArabicLine1}</label>
												<p>{this.state.clientDetail.lblArabicLine1 !== null ? this.state.clientDetail.lblArabicLine1 : strings.EmptyData}</p>
											</div>
											<div className="form-group col-6">
												<label>{strings.Lbl_ArabicLine2}</label>
												<p>{this.state.clientDetail.lblArabicLine2 !== null ? this.state.clientDetail.lblArabicLine2 : strings.EmptyData}</p>
											</div>
										</div>
									</div>
									<div className="col-md-7 col-lg-6">
										<h6>{strings.Lbl_ArabicAddress}</h6>
										<div className="row">
											<div className="form-group col-sm-6">
												<label className='arabic-right-text'>{strings.Lbl_ArabicLine1}<sub>*</sub></label>
												<input id="tbxArabicLine1" disabled={this.checkIfFieldDisabled("tbxArabicLine1")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxArabicLine1} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxArabicLine1) !== '' && Utils.TrimData(this.state.tbxArabicLine1) !== this.state.clientDetail.lblArabicLine1 ? "yellow" : "white" }} />
												{this.state.errors.tbxArabicLine1.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
													<Label className="errormessage" >{this.state.errors.tbxArabicLine1} </Label>
												</span> : null}
											</div>
											<div className="form-group col-sm-6">
												<label className='arabic-right-text'>{strings.Lbl_ArabicLine2}<sub>*</sub></label>
												<input id="tbxArabicLine2" disabled={this.checkIfFieldDisabled("tbxArabicLine2")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxArabicLine2} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxArabicLine2) !== Utils.TrimData(this.state.clientDetail.lblArabicLine2) ? "yellow" : "white" }} />
												{this.state.errors.tbxArabicLine2.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
													<Label className="errormessage" >{this.state.errors.tbxArabicLine2} </Label>
												</span> : null}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-5 col-lg-6 form-info">
										<div className="row">
											{/* <div className="form-group col-6">
												<label>{strings.Lbl_ArabicZipCode}</label>
												<p>{this.state.clientDetail.lblArabicZipCode !== null ? this.state.clientDetail.lblArabicZipCode : strings.EmptyData}</p>
											</div> */}
											<div className="form-group col-6">
												<label>{strings.Lbl_ArabicPostal}</label>
												<p>{this.state.clientDetail.lblArabicPostalDistrict !== null ? this.state.clientDetail.lblArabicPostalDistrict : strings.EmptyData}</p>
											</div>
										</div>
									</div>
									<div className="col-md-7 col-lg-6">
										<div className="row">
											{/* <div className="form-group col-sm-6">
												<label className='arabic-right-text'>{strings.Lbl_ArabicZipCode}{this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY ? <sub>*</sub> : null}</label>
												<input id="tbxArabicZipCode" disabled={this.checkIfFieldDisabled("tbxArabicZipCode")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxArabicZipCode} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxArabicZipCode) !== Utils.TrimData(this.state.clientDetail.lblArabicZipCode) ? "yellow" : "white" }} />
												{this.state.errors.tbxArabicZipCode.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
													<Label className="errormessage" >{this.state.errors.tbxArabicZipCode} </Label>
												</span> : null}
											</div> */}
											<div className="form-group col-sm-6">
												<label className='arabic-right-text'>{strings.Lbl_ArabicPostal}<sub>*</sub></label>
												<input id="tbxArabicPostalDistrict" disabled={this.checkIfFieldDisabled("tbxArabicPostalDistrict")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxArabicPostalDistrict} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxArabicPostalDistrict) !== '' && Utils.TrimData(this.state.tbxArabicPostalDistrict) !== this.state.clientDetail.lblArabicPostalDistrict ? "yellow" : "white" }} />
												{this.state.errors.tbxArabicPostalDistrict.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
													<Label className="errormessage" >{this.state.errors.tbxArabicPostalDistrict} </Label>
												</span> : null}
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-5 col-lg-6 form-info">
										<div className="row">
											<div className="form-group col-6">
												<label>{strings.Lbl_ArabicCountryArea}</label>
												<p>{this.state.clientDetail.lblArabicCountryAreaRegion !== null ? this.state.clientDetail.lblArabicCountryAreaRegion : strings.EmptyData}</p>
											</div>
										</div>
									</div>
									<div className="col-md-7 col-lg-6">
										<div className="row">
											<div className="form-group col-sm-6">
												<label className='arabic-right-text'>{strings.Lbl_ArabicCountryArea}</label>
												<input id="tbxArabicCountryAreaRegion" disabled={this.checkIfFieldDisabled("tbxArabicCountryAreaRegion")} maxLength={255} dir="rtl" className="form-control" type="text" value={this.state.tbxArabicCountryAreaRegion} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxArabicCountryAreaRegion) !== Utils.TrimData(this.state.clientDetail.lblArabicCountryAreaRegion) ? "yellow" : "white" }} />
											</div>
										</div>
									</div>
								</div>
							</> : null}

						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_GeneralInfo}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_Currency}</label>
										<p>{this.state.clientDetail.lblCurrency !== null ? this.state.clientDetail.lblCurrency : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_CompanyRegNo}</label>
										<p>{this.state.clientDetail.lblCompanyRegistrationNumber !== null ? this.state.clientDetail.lblCompanyRegistrationNumber : strings.EmptyData}</p>
									</div>
									<div className="form-group col-6">
										<label>{strings.Lbl_Sector}</label>
										<p>{this.state.clientDetail.lblSector !== null ? this.state.clientDetail.lblSector : strings.EmptyData}</p>
									</div>
									{/* //rutvik 20-7 25 */}
									{/* <div className="form-group col-6">
										<label>{strings.Lbl_ClientStatus}</label>
										<p>{this.state.clientDetail.lblClientStatus !== null ? this.state.clientDetail.lblClientStatus : strings.EmptyData}</p>
									</div> */}
									<div className="form-group col-6">
										<label>{strings.Lbl_ClientType}</label>
										<p>{this.state.clientDetail.lblClientType !== null ? this.state.clientDetail.lblClientType : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<h6>{strings.Lbl_GeneralInfo}</h6>
								<div className="row">
									{/* <div className="form-group col-sm-6">
										<label>{strings.Lbl_Currency}<sub>*</sub></label>
										<Dropdown id="dpCurrency" disabled={this.checkIfFieldDisabled("dpCurrency")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpCurrency.value} options={this.state.dpCurrency.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpCurrency.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpCurrency} </Label>
										</span> : null}
									</div> */}
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_CompanyRegNo}</label>
										<input id="tbxCompanyRegistrationNumber" disabled={this.checkIfFieldDisabled("tbxCompanyRegistrationNumber")} maxLength={255} className="form-control" type="email" value={this.state.tbxCompanyRegistrationNumber} onChange={this._onTbxChange.bind(this)} placeholder="" style={{ backgroundColor: Utils.TrimData(this.state.tbxCompanyRegistrationNumber) !== Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber) ? "yellow" : "white" }} />
									</div>
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_Sector}<sub>*</sub></label>
										<Dropdown id="dpSector" disabled={this.checkIfFieldDisabled("dpSector")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpSector.value} options={this.state.dpSector.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpSector.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpSector} </Label>
										</span> : null}
									</div>
									{/* //rutvik 20-7 25 */}
									{/* <div className="form-group col-sm-6">
										<label>{strings.Lbl_ClientStatus}<sub>*</sub></label>
										<Dropdown id="dpClientStatus" disabled={this.checkIfFieldDisabled("dpClientStatus")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientStatus.value} options={this.state.dpClientStatus.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpClientStatus.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpClientStatus} </Label>
										</span> : null}
									</div> */}
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_ClientType}<sub>*</sub></label>
										<Dropdown id="dpClientType" disabled={this.checkIfFieldDisabled("dpClientType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientType.value} options={this.state.dpClientType.options} onChange={this._onDropDownChange.bind(this)} />
										{this.state.errors.dpClientType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.dpClientType} </Label>
										</span> : null}
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-5 col-lg-6 form-info">
								<h6>{strings.Lbl_TaxInformation}</h6>
								<div className="row">
									<div className="form-group col-6">
										<label>{strings.Lbl_TaxRegNo}</label>
										<p>{this.state.clientDetail.lblTaxRegistrationNo !== null ? this.state.clientDetail.lblTaxRegistrationNo : strings.EmptyData}</p>
									</div>
								</div>
							</div>
							<div className="col-md-7 col-lg-6">
								<h6>{strings.Lbl_TaxInformation}</h6>
								<div className="row">
									<div className="form-group col-sm-6">
										<label>{strings.Lbl_TaxRegNo}<sub>*</sub></label>
										<input id="tbxTaxRegistrationNumber" disabled={this.checkIfFieldDisabled("tbxTaxRegistrationNumber")} maxLength={255} className="form-control" type="text" value={this.state.tbxTaxRegistrationNumber} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== '' && Utils.TrimData(this.state.tbxTaxRegistrationNumber) !== this.state.clientDetail.lblTaxRegistrationNo ? "yellow" : "white" }} />
										{this.state.errors.tbxTaxRegistrationNumber.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
											<Label className="errormessage" >{this.state.errors.tbxTaxRegistrationNumber} </Label>
										</span> : null}
									</div>

								</div>
							</div>
						</div>
						{this.state.tbxCompany === parseInt(Constants.ITALIAN_COMPANY) ?
							<div className="row">
								<div className="col-md-5 col-lg-6 form-info">
									<h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark4}</label>
											<p>{this.state.clientDetail.lblCustomerRemark4 !== null ? this.state.clientDetail.lblCustomerRemark4 : strings.EmptyData}</p>
										</div>
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark5}</label>
											<p>{this.state.clientDetail.lblCustomerRemark5 !== null ? this.state.clientDetail.lblCustomerRemark5 : strings.EmptyData}</p>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark8}</label>
											<p>{this.state.clientDetail.lblCustomerRemark8 !== null ? this.state.clientDetail.lblCustomerRemark8 : strings.EmptyData}</p>
										</div>

									</div>
								</div>

								<div className="col-md-7 col-lg-6">
									<h6>{strings.Lbl_ItalianInvoiceExtension}</h6>
									<div className="row">
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark4}<sub>*</sub></label>
											<input id="tbxCustomerRemark4" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark4")} className="form-control" type="text" value={this.state.tbxCustomerRemark4} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark4) !== '' && Utils.TrimData(this.state.tbxCustomerRemark4) !== this.state.clientDetail.lblCustomerRemark4 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark4.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark4} </Label>
											</span> : null}
										</div>
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark5}<sub>*</sub></label>
											<input id="tbxCustomerRemark5" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark5")} className="form-control" type="text" value={this.state.tbxCustomerRemark5} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark5) !== '' && Utils.TrimData(this.state.tbxCustomerRemark5) !== this.state.clientDetail.lblCustomerRemark5 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark5.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark5} </Label>
											</span> : null}
										</div>
									</div>
									{/* {/ Shraddha test 8 /} */}
									<div className="row">
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark8}<sub>*</sub></label>
											<input id="tbxCustomerRemark8" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark8")} className="form-control" type="text" value={this.state.tbxCustomerRemark8} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark8) !== '' && Utils.TrimData(this.state.tbxCustomerRemark8) !== this.state.clientDetail.lblCustomerRemark8 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark8.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark8} </Label>
											</span> : null}
										</div>
									</div>

								</div>
							</div> : null}
						{(this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[0]) || this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[1]) || this.state.tbxCompany === parseInt(Constants.SAUDI_COMPANY[2])) ?
							<div className="row">
								<div className="col-md-5 col-lg-6 form-info">
									<h6>{strings.Lbl_SaudiSpecificData}</h6>
									<div className="row">
										<div className="form-group col-6">
											<label>{strings.Lbl_CustomerRemark7}</label>
											<p>{this.state.clientDetail.lblCustomerRemark7 !== null ? this.state.clientDetail.lblCustomerRemark7 : strings.EmptyData}</p>
										</div>
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_ClientIDType}</label>
											<p>{this.state.clientDetail.ClientIDType !== null ? Utils.GetClientIDTypeDescription(this.state.clientDetail.ClientIDType, this.state.dpClientIDType) : strings.EmptyData}</p>
										</div>
									</div>
								</div>
								<div className="col-md-7 col-lg-6">
									<h6>{strings.Lbl_SaudiSpecificData}</h6>
									<div className="row">
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_CustomerRemark7}</label>
											<input id="tbxCustomerRemark7" maxLength={255} disabled={this.checkIfFieldDisabled("tbxCustomerRemark7")} className="form-control" type="text" value={this.state.tbxCustomerRemark7} placeholder="" onChange={this._onTbxChange.bind(this)} style={{ backgroundColor: Utils.TrimData(this.state.tbxCustomerRemark7) !== '' && Utils.TrimData(this.state.tbxCustomerRemark7) !== this.state.clientDetail.lblCustomerRemark7 ? "yellow" : "white" }} />
											{this.state.errors.tbxCustomerRemark7.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.tbxCustomerRemark7} </Label>
											</span> : null}
										</div>
										<div className="form-group col-sm-6">
											<label>{strings.Lbl_ClientIDType}</label>
											<Dropdown id="dpClientIDType" disabled={this.checkIfFieldDisabled("dpClientIDType")} placeholder={strings.dpPlaceHolder} selectedKey={this.state.dpClientIDType.value} options={this.state.dpClientIDType.options} onChange={this._onDropDownChange.bind(this)}
												style={{ backgroundColor: Utils.TrimData(this.state.dpClientIDType.value) !== '' && Utils.TrimData(this.state.dpClientIDType.value) !== this.state.clientDetail.lblClientIDType ? "yellow" : "white" }} />
											{this.state.errors.dpClientIDType.length > 0 ? <span> <Icon iconName='error' className="erroricon" />
												<Label className="errormessage" >{this.state.errors.dpClientIDType} </Label>
											</span> : null}
										</div>
									</div>
								</div>
							</div> : null}
					</div>
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
		var companyNumber = [];
		await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).select("Company").get().then((data) => {
			companyNumber = data.Company.split('-');
			var number = parseInt(companyNumber[0].trim());
			this.setState({ tbxCompany: number });
		});
		//endr

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

	private async _onTbxChange(event: React.ChangeEvent<HTMLInputElement>) {
		/// <summary>On texbox value change set value into state property.</summary>
		event.preventDefault();
		const { id, value } = event.target;
		this.setState({ ...this.state, [id]: value });

		//rutvik validate change
		let errors = this.state.errors;
		if (id === "tbxSocialName") errors.tbxSocialName = '';
		if (id === "tbxLegalName") errors.tbxLegalName = '';
		if (id === "tbxLine1") errors.tbxLine1 = '';
		if (id === "tbxPostalDistrictCity") errors.tbxPostalDistrictCity = '';
		if (id === "tbxTaxRegistrationNumber") errors.tbxTaxRegistrationNumber = '';
		if (id === "tbxCustomerRemark4") errors.tbxCustomerRemark4 = '';
		if (id === "tbxCustomerRemark5") errors.tbxCustomerRemark5 = '';
		if (id === "tbxCustomerRemark8") errors.tbxCustomerRemark8 = '';

		//rutvik 13-3-24
		if (id === "tbxZipcode") errors.tbxZipcode = "";
		if (id === "tbxLegalNameInArabic") errors.tbxLegalNameInArabic = "";
		if (id === "tbxArabicLine1") errors.tbxArabicLine1 = "";
		if (id === "tbxArabicLine2") errors.tbxArabicLine2 = "";
		if (id === "tbxArabicPostalDistrict") errors.tbxArabicPostalDistrict = "";
		// if (id === "tbxArabicZipCode") errors.tbxArabicZipCode = "";
		//end

		this.setState({ errors: errors });
		//end					

	}

	private async BindData() {
		/// <summary>Bind DropDown list.</summary>

		var tempStateObj = {};
		// Shraddha 12-08-22 item 28 
		var cur = "Currency";

		for (var i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {


			// Shraddha 12-08-22 item 28 
			if (Constants.MASTER_DROPDOWNS_7_8[i].name !== cur) {
				let options = await Utils.GetMasterListItems(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, Constants.MASTER_DROPDOWNS_7_8[i].name);
				var tempObj = this.state[Constants.MASTER_DROPDOWNS_7_8[i].key];
				tempObj.options = options;
				options.length > 0 ? tempStateObj[Constants.MASTER_DROPDOWNS_7_8[i].key] = tempObj : [];
			}
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
			if (event.target.id === "dpCountry") errors.dpCountry = '';
			if (event.target.id === "dpSector") errors.dpSector = '';
			if (event.target.id === "dpClientType") errors.dpClientType = '';

			//rutvik 13-3-324
			if (event.target.id === "dpCountry" && this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
				if (item.text !== Constants.SAUDI_ARABIA_COUNTRY) {
					// errors.tbxArabicZipCode = "";
					errors.tbxZipcode = "";
				}
			}

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
			if (data !== null) {
				data.Country = await Utils.GetMaconomyDataFromKey(this.objWeb, this.serverRelativeURL + "/Lists/" + Constants.MASTERLIST_INTERNALNAME, data.Country);
				this.setState({
					clientDetail: {
						lblSocialName: data.Title,
						lblLegalName: data.LegalName,
						lblAddressLine1: data.Line1,
						lblAddressLine2: data.Line2,
						lblZipcode: data.Zipcode,
						lblPostalDistrictCity: data.Postal_District_City,
						lblCountry: data.Country,
						lblCurrency: data.Currency,
						lblCountryAreaRegion: data.Country_Area_Region,
						lblCompanyRegistrationNumber: data.CompanyRegistrationNo,
						lblSector: data.Sector,
						lblClientType: data.ClientType,
						lblTaxRegistrationNo: data.TaxRegistrationNo,
						lblCustomerRemark4: data.CustomerRemark4,
						lblCustomerRemark5: data.CustomerRemark5,
						lblCustomerRemark8: data.CustomerRemark8,
						lblCustomerRemark7: data.CustomerRemark7,
						lblClientIDType: data.ClientIDType,
						//rutvik employee dp change 3-3-23
						lblClientLead: data.ClientLead,
						lblCommercialManager: data.CommercialManager,
						lblBiller: data.Biller,
						lblProjectAnalyst: data.ProjectAnalyst,
						lblResourceManager: data.ResourceManager,
						//rutvik 13-3-24
						lblLegalNameInArabic: data.LegalNameInArabic,
						lblArabicLine1: data.ArabicLine1,
						lblArabicLine2: data.ArabicLine2,
						// lblArabicZipCode: data.ArabicZipCode,
						lblArabicPostalDistrict: data.ArabicPostalDistrict,
						lblArabicCountryAreaRegion: data.ArabicCountryAreaRegion
						//end
					}
				});
			}
		} catch (error) {
			console.log("ClientData--->", error);
		}
	}

	private async _BackClick() {
		/// <summary>Back button click event.</summary>
		await this.props.dataChange("section2Data", this.state);
		this.props.backStep();
	}

	private async _NextClick() {
		/// <summary>Next button click event.</summary>
		this.setState({ loading: true }); //9-2-23
		if (await this.saveDataOperation()) {
			this.clientJson = {
				SocialName: Utils.TrimData(this.state.clientDetail.lblSocialName),
				LegalName: Utils.TrimData(this.state.clientDetail.lblLegalName),
				Line1: Utils.TrimData(this.state.clientDetail.lblAddressLine1),
				Line2: Utils.TrimData(this.state.clientDetail.lblAddressLine2),
				Zipcode: Utils.TrimData(this.state.clientDetail.lblZipcode),
				PostalDistrictCity: Utils.TrimData(this.state.clientDetail.lblPostalDistrictCity),
				Country: Utils.TrimData(this.state.clientDetail.lblCountry),
				Currency: Utils.TrimData(this.state.clientDetail.lblCurrency),
				CountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblCountryAreaRegion),
				CompanyRegistrationNumber: Utils.TrimData(this.state.clientDetail.lblCompanyRegistrationNumber),
				Sector: Utils.TrimData(this.state.clientDetail.lblSector),
				ClientType: Utils.TrimData(this.state.clientDetail.lblClientType),
				TaxRegistrationNo: Utils.TrimData(this.state.clientDetail.lblTaxRegistrationNo),
				CustomerRemark4: Utils.TrimData(this.state.clientDetail.lblCustomerRemark4),
				CustomerRemark5: Utils.TrimData(this.state.clientDetail.lblCustomerRemark5),
				CustomerRemark8: Utils.TrimData(this.state.clientDetail.lblCustomerRemark8),
				CustomerRemark7: Utils.TrimData(this.state.clientDetail.lblCustomerRemark7),
				ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
				//rutvik 13-3-24
				LegalNameInArabic: Utils.TrimData(this.state.clientDetail.lblLegalNameInArabic),
				ArabicLine1: Utils.TrimData(this.state.clientDetail.lblArabicLine1),
				ArabicLine2: Utils.TrimData(this.state.clientDetail.lblArabicLine2),
				// ArabicZipCode: Utils.TrimData(this.state.clientDetail.lblArabicZipCode),
				ArabicPostalDistrict: Utils.TrimData(this.state.clientDetail.lblArabicPostalDistrict),
				ArabicCountryAreaRegion: Utils.TrimData(this.state.clientDetail.lblArabicCountryAreaRegion)
				//end

			};
			this.requestJson = {
				SocialName: this.state.tbxSocialName,
				LegalName: this.state.tbxLegalName,
				Line1: this.state.tbxLine1,
				Line2: this.state.tbxLine2 === null ? "" : this.state.tbxLine2,
				Zipcode: this.state.tbxZipcode === null ? "" : this.state.tbxZipcode,
				PostalDistrictCity: this.state.tbxPostalDistrictCity,
				Country: this.state.dpCountry.value,
				CountryAreaRegion: this.state.tbxCountryAreaRegion === null ? "" : this.state.tbxCountryAreaRegion,
				CompanyRegistrationNumber: this.state.tbxCompanyRegistrationNumber === null ? "" : this.state.tbxCompanyRegistrationNumber,
				Sector: this.state.dpSector.value,
				ClientType: this.state.dpClientType.value,
				TaxRegistrationNo: this.state.tbxTaxRegistrationNumber,
				CustomerRemark4: this.state.tbxCustomerRemark4,
				CustomerRemark5: this.state.tbxCustomerRemark5,
				CustomerRemark8: this.state.tbxCustomerRemark8,
				CustomerRemark7: this.state.tbxCustomerRemark7,
				ClientIDType: this.state.dpClientIDType.value,
				//rutvik 13-3-24
				LegalNameInArabic: this.state.tbxLegalNameInArabic === null ? "" : this.state.tbxLegalNameInArabic,
				ArabicLine1: this.state.tbxArabicLine1 === null ? "" : this.state.tbxArabicLine1,
				ArabicLine2: this.state.tbxArabicLine2 === null ? "" : this.state.tbxArabicLine2,
				// ArabicZipCode: this.state.tbxArabicZipCode === null ? "" : this.state.tbxArabicZipCode,
				ArabicPostalDistrict: this.state.tbxArabicPostalDistrict === null ? "" : this.state.tbxArabicPostalDistrict,
				ArabicCountryAreaRegion: this.state.tbxArabicCountryAreaRegion === null ? "" : this.state.tbxArabicCountryAreaRegion,
				//end

			};

			this.setState({ loading: false }, async () => {
				await this.props.dataChange("section2Data", this.state);
				await this.props.dataChange("requestJson", this.requestJson);
				await this.props.dataChange("clientJson", this.clientJson);
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
		let requestData = ['tbxSocialName', 'tbxLegalName', 'tbxLine1', 'tbxPostalDistrictCity', 'tbxTaxRegistrationNumber'];
		let clientDataDropDown = ['lblCountry', 'lblClientType', 'lblSector']; //shraddhas task 28

		for (let i = 0; i < requestData.length; i++) {
			if (Utils.CheckRequiredField(this.state[requestData[i]]) === false) {
				errors[requestData[i]] = strings.CantLeaveBlankMsg;
			} else {
				errors[requestData[i]] = "";
			}
		}

		this.state.dpCountry.value

		//rutvik 13-3-24 & 28-3-24 validiation of zipcode
		if (this.props.CountryOfCompany === Constants.SAUDI_ARABIA_COUNTRY_OF_COMPANY) {
			if (this.state.dpCountry.value === Constants.SAUDI_ARABIA_COUNTRY) {
				// errors.tbxArabicZipCode = (Utils.CheckRequiredField(this.state.tbxArabicZipCode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxArabicZipCode) === false) ? strings.ZipCodeValidationString : "";

				errors.tbxZipcode = (Utils.CheckRequiredField(this.state.tbxZipcode) === false) ? strings.CantLeaveBlankMsg : (Utils.CheckZipCodeValidationForSaudiCompany(this.state.tbxZipcode) === false) ? strings.ZipCodeValidationString : "";
			} else {
				// errors.tbxArabicZipCode = "";
				errors.tbxZipcode = "";
			}

			errors.tbxLegalNameInArabic = (Utils.CheckRequiredField(this.state.tbxLegalNameInArabic) === false) ? strings.CantLeaveBlankMsg : "";
			errors.tbxArabicLine1 = (Utils.CheckRequiredField(this.state.tbxArabicLine1) === false) ? strings.CantLeaveBlankMsg : "";
			errors.tbxArabicLine2 = (Utils.CheckRequiredField(this.state.tbxArabicLine2) === false) ? strings.CantLeaveBlankMsg : "";
			errors.tbxArabicPostalDistrict = (Utils.CheckRequiredField(this.state.tbxArabicPostalDistrict) === false) ? strings.CantLeaveBlankMsg : "";
		} else {
			errors.tbxLegalNameInArabic = "";
			errors.tbxArabicLine1 = "";
			errors.tbxArabicLine2 = "";
			errors.tbxArabicPostalDistrict = "";
			// errors.tbxArabicZipCode = "";
		}
		//end

		//rutvik 6-7 24
		if (this.state.tbxCompany === parseInt(Constants.ITALIAN_COMPANY)) {
			errors.tbxCustomerRemark4 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark4) === false) ? strings.CantLeaveBlankMsg : "";
			errors.tbxCustomerRemark5 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark5) === false) ? strings.CantLeaveBlankMsg : "";
			errors.tbxCustomerRemark8 = (Utils.CheckRequiredField(this.state.tbxCustomerRemark8) === false) ? strings.CantLeaveBlankMsg : "";//Shraddha test 8
		}
		else {
			errors.tbxCustomerRemark4 = "";
			errors.tbxCustomerRemark5 = "";
			errors.tbxCustomerRemark8 = "";
		}
		//end r

		// Shraddha 12-08-22 item 28 
		var cur = "Currency";

		for (var i = 0; i < Constants.MASTER_DROPDOWNS_7_8.length; i++) {

			// Shraddha 12-08-22 item 28 
			if (Constants.MASTER_DROPDOWNS_7_8[i].name !== cur) {
				errors[Constants.MASTER_DROPDOWNS_7_8[i].key] = (Utils.CheckRequiredField(this.state[Constants.MASTER_DROPDOWNS_7_8[i].key].value) === false) ? ((Utils.CheckRequiredField(this.state.clientDetail[clientDataDropDown[i]]) === false) ? strings.CantLeaveBlankMsg : "") : "";
			}
		}

		this.setState({ errors: errors });
		let valid = true;
		Object.keys(errors).forEach((key) => { errors[key].length > 0 ? valid = false : null });
		return valid;
	}

	private async saveData() {
		/// <summary>Save data in list.</summary>
		try {
			this.setState({
				loading: true
			}, async () => {

				var tempData = {
					Title: Utils.TrimData(this.state.tbxSocialName),
					LegalName: Utils.TrimData(this.state.tbxLegalName),
					Line1: Utils.TrimData(this.state.tbxLine1),
					Line2: Utils.TrimData(this.state.tbxLine2),
					Zipcode: Utils.TrimData(this.state.tbxZipcode),
					Postal_District_City: Utils.TrimData(this.state.tbxPostalDistrictCity),
					Country_Area_Region: Utils.TrimData(this.state.tbxCountryAreaRegion),
					Country: this.state.dpCountry.value,
					Currency: this.state.clientDetail.lblCurrency, //new change 22-11
					CompanyRegistrationNo: Utils.TrimData(this.state.tbxCompanyRegistrationNumber),
					Sector: this.state.dpSector.value,
					ClientType: this.state.dpClientType.value,
					TaxRegistrationNo: Utils.TrimData(this.state.tbxTaxRegistrationNumber),
					CustomerRemark4: Utils.TrimData(this.state.tbxCustomerRemark4),
					CustomerRemark5: Utils.TrimData(this.state.tbxCustomerRemark5),
					CustomerRemark8: Utils.TrimData(this.state.tbxCustomerRemark8),
					CustomerRemark7: Utils.TrimData(this.state.tbxCustomerRemark7),
					ClientIDType: Utils.SplitData(this.state.dpClientIDType.value),
					//rutvik employee dp change 3-3-23
					ClientLead: this.state.clientDetail.lblClientLead,
					CommercialAnalyst: this.state.clientDetail.lblCommercialManager,
					Biller: this.state.clientDetail.lblBiller,
					ProjectAnalyst: this.state.clientDetail.lblProjectAnalyst,
					ResourceManager: this.state.clientDetail.lblResourceManager,
					//rutvik 13-3-24
					LegalNameInArabic: Utils.TrimData(this.state.tbxLegalNameInArabic),
					ArabicLine1: Utils.TrimData(this.state.tbxArabicLine1),
					ArabicLine2: Utils.TrimData(this.state.tbxArabicLine2),
					// ArabicZipCode: Utils.TrimData(this.state.tbxArabicZipCode),
					ArabicPostalDistrict: Utils.TrimData(this.state.tbxArabicPostalDistrict),
					ArabicCountryAreaRegion: Utils.TrimData(this.state.tbxArabicCountryAreaRegion)
					//end

				};

				if (this.props.itemID > 0) {
					await this.objWeb.getList(this.serverRelativeURL + "/Lists/" + Constants.REQUESTS_INTERNALNAME).items.getById(this.props.itemID).update(tempData).then(async (res) => {
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
			tbxSocialName: this.state.clientDetail.lblSocialName,
			tbxLegalName: this.state.clientDetail.lblLegalName,
			tbxLine1: this.state.clientDetail.lblAddressLine1,
			tbxLine2: this.state.clientDetail.lblAddressLine2,
			tbxZipcode: this.state.clientDetail.lblZipcode,
			tbxPostalDistrictCity: this.state.clientDetail.lblPostalDistrictCity,
			tbxCountryAreaRegion: this.state.clientDetail.lblCountryAreaRegion,
			tbxCompanyRegistrationNumber: this.state.clientDetail.lblCompanyRegistrationNumber,
			tbxTaxRegistrationNumber: this.state.clientDetail.lblTaxRegistrationNo,
			dpCountry: Utils.GetDropdownStateValue(this.state.clientDetail.lblCountry, this.state.dpCountry),
			//dpCurrency: Utils.GetDropdownStateValue(this.state.clientDetail.lblCurrency === null ? this.state.clientDetail.lblCurrency : this.state.clientDetail.lblCurrency.toUpperCase(), this.state.dpCurrency),
			dpSector: Utils.GetDropdownStateValue(this.state.clientDetail.lblSector, this.state.dpSector),
			//rutvik 20-7 25
			//dpClientStatus: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientStatus, this.state.dpClientStatus),
			//endr
			dpClientType: Utils.GetDropdownStateValue(this.state.clientDetail.lblClientType, this.state.dpClientType),
			tbxCustomerRemark4: this.state.clientDetail.lblCustomerRemark4,
			tbxCustomerRemark5: this.state.clientDetail.lblCustomerRemark5,
			tbxCustomerRemark8: this.state.clientDetail.lblCustomerRemark8,
			tbxCustomerRemark7: this.state.clientDetail.lblCustomerRemark7,
			//rutvik 13-3-24
			tbxLegalNameInArabic: this.state.clientDetail.lblLegalNameInArabic,
			tbxArabicLine1: this.state.clientDetail.lblArabicLine1,
			tbxArabicLine2: this.state.clientDetail.lblArabicLine2,
			// tbxArabicZipCode: this.state.clientDetail.lblArabicZipCode,
			tbxArabicPostalDistrict: this.state.clientDetail.lblArabicPostalDistrict,
			tbxArabicCountryAreaRegion: this.state.clientDetail.lblArabicCountryAreaRegion,
			//end
			dpClientIDType: this.state.clientDetail.lblClientIDType !== '' ? Utils.GetDropdownStateValueClientIDType(this.state.clientDetail.lblClientIDType, this.state.dpClientIDType) : this.state.dpClientIDType,
		});
	}
}