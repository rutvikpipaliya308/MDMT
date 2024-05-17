import * as strings from 'ClientRequestsWebPartStrings';
import { css } from "@emotion/core";

export const MASTERLIST_INTERNALNAME: string = "Mac_Companies";
export const CUSTOMERCARD_INTERNALNAME: string = "CustomerCard";
export const CONTACTCOMPANY_INTERNALANAME: string = "ContactCompany";
export const COMPANYCUSTOMERCARD_INTERNALNAME: string = "CompanyCustomerCard";
export const REQUESTS_INTERNALNAME: string = "Requests";
export const ATTACHMENTS_INTERNALNAME: string = "Attachments";
export const APPROVERMASTER_INTERNALNAME: string = "ApproverMaster";
export const DISPLAY_CLIENTREQUEST_PAGE_URL: string = '/sitepages/displayclientrequest.aspx';
export const UPDATEREQUESTDATA_INTERNALANAME: string = "UpdateRequestData";
export const MACONOMYEDITABLEFIELDSINTERNALNAME = "ManageEditableFields"

export const DUEDILQUESTIONSURL: string = "/Lists/DueDiligenceQuestions";
export const DUEDILOPTIONSURL: string = "/Lists/DueDiligenceOptions";
export const DUEDILIGENCEURL: string = "/Lists/DueDiligenceChecks";

// Changes start - 27/12/2021
export const USERACCESSLEVEL_INTERNALNAME = "UserAccessLevel";
// Changes end - 27/12/2021

export const CLIENTIDTYPE_INTERNALNAME: string = "ClientIDType";//Shraddha test 7
//Shraddha 29-09-22 after test change
export const SPECIALCHARACTERSLISTNAME: string = "/Lists/ExcludedCharacters";
//Shraddha test 7
export const SAUDI_COMPANY = ["310", "315", "225"];


//rutvik 13-3-2024
export const SAUDI_ARABIA_COUNTRY = "Saudi Arabia";
export const SAUDI_ARABIA_COUNTRY_OF_COMPANY = "saudi_arabia";

//rutvik task 9
export const UPDATEREQUESTLISTLEVEL1: string = "UpdatedRequestLevel1";
//end

// Jaymin Change	
export const PERMISSIONFLOWTRIGGERLISTURL: string = "PermissionFlowTrigger";

//error log changes
export const ERRORLIST = "Errors";

//change start - 25-1-22
// export const TESTUSERACCESSLEVEL = "/Lists/TestUserAccessLevel";
export const ACCESSLEVELRANGE = "/Lists/AccessLevelRange";
//change end - 25-1-22

export const DUEDILIGENCENAME: string = "Due Diligence Checks";

export const EVERYONE_ID: number = 9; //tatva, dev, test
// export const EVERYONE_ID: number = 8; //PROD

//R FHD change 19-9-23
export const FHDUserGroupID: string = "552"; //Dev site
// export const FHDUserGroupID: string = "498"; //Test site
// export const FHDUserGroupID: string = "1461"; //Prod site

//R FHD change 20-9-2023
export const FHDUSERS: string = 'FHDUsers';

export const REQUESTTYPE_OPTIONS = [{ key: '7', text: strings.RequestType[0] },
{ key: '8', text: strings.RequestType[1] },
{ key: '9', text: strings.RequestType[2] },
{ key: '10', text: strings.RequestType[3] },
{ key: '11', text: strings.RequestType[4] },
{ key: '12', text: strings.RequestType[5] },
{ key: '13', text: strings.RequestType[6] }]; //rutvik task 6

export const REQ7_SECTION_OPTIONS = [{ key: "1", text: strings.RequestSections[0] },
{ key: "2", text: strings.RequestSections[1] },
{ key: "3", text: strings.RequestSections[2] },
{ key: "4", text: strings.RequestSections[3] },
{ key: "5", text: strings.RequestSections[4] },
{ key: "6", text: strings.RequestSections[5] }];

export const REQ8_SECTION_OPTIONS = [{ key: "1", text: strings.RequestSections[6] },
{ key: "2", text: strings.RequestSections[1] },
{ key: "3", text: strings.RequestSections[2] },
{ key: "4", text: strings.RequestSections[3] },
{ key: "5", text: strings.RequestSections[4] },
{ key: "6", text: strings.RequestSections[5] }];

export const REQ9_SECTION_OPTIONS = [{ key: "1", text: strings.Request9Sections[0] },
{ key: "2", text: strings.Request9Sections[1] },
{ key: "3", text: strings.Request9Sections[2] }];

export const REQ11_SECTION_OPTIONS = [{ key: "1", text: strings.Request11Sections[0] },
{ key: "2", text: strings.Request11Sections[1] }];

export const CLSCOL: string = "col";
export const CLSCOLACTIVE: string = "col active";
export const CLSCOLSAVE: string = "col active save";

export const LOADING_CSS = css`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-color: #ca5010;`;

export const LOADER_COLOR = "#ca5010";


export const INVALID_FILE_EXTENSIONS = ["exe", "js", "ps1", "msg"]; //rutvik change

export const GULF_COMPANIES = ["300", "305", "310", "320"];
export const EMIRATE_COMPANIES = ["300", "305"];
export const INDIA_COMPANY = "330";

//rutvik 4-7 24
export const ITALIAN_COMPANY = "225";
//endr

export const MASTER_DROPDOWNS_7_8 = [{ key: "dpCountry", name: "Country" },
{ key: "dpCurrency", name: "Currency" },
{ key: "dpClientType", name: "Client type" },
//{ key: "dpClientStatus", name: "Client status" },
{ key: "dpSector", name: "Sector" }];


//rutvik 29-3-24
//For Request 7, 8 and 12
export const EXCLUDEFROMCLIENTINVOICEREMINDER = [
  { key: strings.strNo, text: strings.strNo },
  { key: strings.strYes, text: strings.strYes },
];

//rutvik task 6
export const MASTER_DROPDOWNS_REQ13 = [{ key: "dpCurrency", name: "Currency" }];

export const CLIENTUPDATE_SECTIONS = [{ key: "1", text: strings.ClientUpdateSections[0] },
{ key: "2", text: strings.ClientUpdateSections[1] },
{ key: "3", text: strings.ClientUpdateSections[2] },
];

//rutvik task 6
export const CLIENTCREATIONWITHCURRENCY_SECTION = [{ key: "1", text: strings.ClientCreaionWithCurrency[0] },
{ key: "2", text: strings.ClientCreaionWithCurrency[1] },
{ key: "3", text: strings.ClientCreaionWithCurrency[2] },
];
//rend

export const COMPANYCLIENTUPDATE_SECTIONS = [{ key: "1", text: strings.CompanyClientUpdateSections[0] },
{ key: "2", text: strings.CompanyClientUpdateSections[1] },
{ key: "3", text: strings.CompanyClientUpdateSections[2] },
{ key: "4", text: strings.CompanyClientUpdateSections[3] }
];

export const MASTER_DROPDOWNS = [
  { key: "dpDefaultTaxCode", name: "Default Tax code", required: true },
  { key: "dpPaymentTerms", name: "Payment Terms", required: true },
  { key: "dpWithholdingTaxType", name: "Withholding Tax Type", required: false },
  { key: "dpEmirate", name: "Emirate", required: false },
  { key: "dpPlaceofSupply", name: "Place of supply", required: false },
  { key: "dpGSTRegistrationType", name: "GST Registration Type", required: false },
];

export const WHITE: string = "white";
export const YELLOW: string = "yellow";
export const RED: string = "red";

export const REQUESTVIEWXML = `<ViewFields>
<FieldRef Name="MaconomyAccountID"></FieldRef>
<FieldRef Name="ContactCompanyNo"></FieldRef>
<FieldRef Name="Title"></FieldRef>
<FieldRef Name="LegalName"></FieldRef>
<FieldRef Name="Company"></FieldRef>
<FieldRef Name="Office"></FieldRef>
<FieldRef Name="WorkflowType"></FieldRef>
<FieldRef Name="Line1"></FieldRef>
<FieldRef Name="Line2"></FieldRef>
<FieldRef Name="Zipcode"></FieldRef>
<FieldRef Name="Postal_District_City"></FieldRef>
<FieldRef Name="Country_Area_Region"></FieldRef>
<FieldRef Name="ClientAttentionName"></FieldRef>
<FieldRef Name="Country"></FieldRef>
<FieldRef Name="Email"></FieldRef>
<FieldRef Name="PhoneNo"></FieldRef>
<FieldRef Name="Sector"></FieldRef>
<FieldRef Name="Currency"></FieldRef>
<FieldRef Name="CompanyRegistrationNo"></FieldRef>
<FieldRef Name="TaxRegistrationNo"></FieldRef>
<FieldRef Name="CIN"></FieldRef>
<FieldRef Name="DefaultTaxCode"></FieldRef>
<FieldRef Name="PaymentTerms"></FieldRef>
<FieldRef Name="DeliveryMethod"></FieldRef>
<FieldRef Name="WithholdingTaxType"></FieldRef>
<FieldRef Name="Emirate"></FieldRef>
<FieldRef Name="PlaceofSupply"></FieldRef>
<FieldRef Name="GSTRegistrationType"></FieldRef>
<FieldRef Name="TDSTaxRate"></FieldRef>
<FieldRef Name="ClientStatus"></FieldRef>
<FieldRef Name="ClientType"></FieldRef>
<FieldRef Name="FolderPath"></FieldRef>
<FieldRef Name="Submitted"></FieldRef>
<FieldRef Name="SubmittedDate"></FieldRef>
<FieldRef Name="Status"></FieldRef>
<FieldRef Name="Stage1Status"></FieldRef>
<FieldRef Name="Stage2Status"></FieldRef>
<FieldRef Name="Stage3Status"></FieldRef>
<FieldRef Name="Stage1Approver"></FieldRef>
<FieldRef Name="Stage1_sub_approver"></FieldRef>
<FieldRef Name="Stage2Approver"></FieldRef>
<FieldRef Name="Stage2_sub_approver"></FieldRef>
<FieldRef Name="Stage3Approver"></FieldRef>
<FieldRef Name="Stage3_sub_approver"></FieldRef>
<FieldRef Name="RequestType"></FieldRef>
<FieldRef Name="Stage1Comments"></FieldRef>
<FieldRef Name="Stage2Comments"></FieldRef>
<FieldRef Name="Stage3Comments"></FieldRef>
<FieldRef Name="Child"></FieldRef>
</ViewFields>
`;

export const listOfEditableFields = [
  { key: "dpCompany", value: "Company", openable: true },
  { key: "txtSocialName", value: "Social Name", openable: true },
  { key: "tbxlegalName", value: "Legal Name", openable: true },
  { key: "tbxLine1", value: "Line 1", openable: true },
  { key: "tbxTaxRegNo", value: "Tax Registration No", openable: true },
  { key: "tbxBankAccountNo", value: "Bank Account No", openable: true },
  { key: "tbxSwift", value: "SWIFT/BIC", openable: true },
  { key: "tbxBeneficiaryAccountName", value: "Beneficiary Account Name", openable: true },
  { key: "tbxTaxRegistrationNo", value: "Tax Registration No", openable: true },
  { key: "tbxTaxRegistrationNumber", value: "Tax Registration No", openable: true },
  { key: "tbxSocialName", value: "Social Name", openable: true },
  { key: "tbxCompanyRegNo", value: "Company Registration No", openable: true },
  { key: "tbxCompanyRegistrationNumber", value: "Company Registration No", openable: true },
  { key: "tbxLine2", value: "Line 2", openable: true },
  { key: "tbxZipcode", value: "Zip Code", openable: true },
  { key: "tbxPostal", value: "Postal District/City", openable: true },
  { key: "tbxPostalDistrictCity", value: "Postal District/City", openable: true },
  { key: "tbxCountryArea", value: "County/Area/Region", openable: true },
  { key: "tbxCountryAreaRegion", value: "County/Area/Region", openable: true },
  { key: "dpCountry", value: "Country", openable: true },
  { key: "tbxClientAttenName", value: "Client Attention Name", openable: true },
  { key: "tbxClientAttentionName", value: "Client Attention Name", openable: true },
  { key: "tbxEmail", value: "Email Address", openable: true },
  { key: "tbxPhoneNo", value: "Phone No", openable: true },
  { key: "dpCurrency", value: "Currency", openable: true },
  { key: "dpSector", value: "Sector", openable: true },
  { key: "dpClientType", value: "Client Type", openable: true },
  { key: "dpClientStatus", value: "Client Status", openable: true },
  { key: "dpPaymentTerms", value: "Payment Terms", openable: true },
  { key: "dpPaymentMode", value: "Payment Mode", openable: true },
  { key: "tbxInstructions", value: "Instructions", openable: true },
  { key: "dpDeliveryMethod", value: "Delivery Method", openable: true },
  { key: "tbxTDSRate", value: "TDS Rate %", openable: true },
  { key: "tbxTDSTaxRate", value: "TDS Rate %", openable: true },
  { key: "dpDefaultTaxCode", value: "Default Tax Code", openable: true },
  { key: "tbxBeneficiaryAccName", value: "Beneficiary Account Name", openable: true },
  { key: "tbxIBAN", value: "IBAN", openable: true },
  { key: "tbxSwiftBIC", value: "SWIFT/BIC", openable: true },
  { key: "tbxBankAccNo", value: "Bank Account No", openable: true },
  { key: "tbxSortCode", value: "Sort Code / ABA / Routing No", openable: true },
  { key: "tbxPaymentTransID", value: "Payment Transaction ID", openable: true },
  { key: "lblUSSpecInfo", value: "US Specific Information", openable: true },
  { key: "tbxBankName", value: "Bank Name", openable: true },
  { key: "tbxBankAddress", value: "Bank Address", openable: true },
  { key: "dp1099Reporting", value: "1099 Reporting", openable: true },
  { key: "dpDisclosable", value: "Disclosable", openable: true },
  { key: "dpWithHoldingTax", value: "Withholding Tax Type", openable: true },
  { key: "dpWithholdingTaxType", value: "Withholding Tax Type", openable: true },
  { key: "dpEmirate", value: "Emirate", openable: true },
  { key: "dpPlaceOfSupply", value: "Place of Supply", openable: true },
  { key: "dpHSNCode", value: "Default HSN Code", openable: true },
  { key: "dpGSTRegType", value: "GST Registration Type", openable: true },
  { key: "dpGSTRegistrationType", value: "GST Registration Type", openable: true },
  { key: "dpTDSApplicable", value: "TDS Applicable", openable: true },
  { key: "tbxCIN", value: "CIN", openable: true },
  { key: "tbxPAN", value: "PAN", openable: true },
  { key: "tbxMSME", value: "MSME", openable: true },
  { key: "dpCorporateNonCorporate", value: "Corporate/Non-Corporate", openable: true }
];