var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as strings from 'ClientRequestsWebPartStrings';
import { css } from "@emotion/core";
export var MASTERLIST_INTERNALNAME = "Mac_Companies";
export var CUSTOMERCARD_INTERNALNAME = "CustomerCard";
export var CONTACTCOMPANY_INTERNALANAME = "ContactCompany";
export var COMPANYCUSTOMERCARD_INTERNALNAME = "CompanyCustomerCard";
export var REQUESTS_INTERNALNAME = "Requests";
export var ATTACHMENTS_INTERNALNAME = "Attachments";
export var APPROVERMASTER_INTERNALNAME = "ApproverMaster";
export var DISPLAY_CLIENTREQUEST_PAGE_URL = '/sitepages/displayclientrequest.aspx';
export var UPDATEREQUESTDATA_INTERNALANAME = "UpdateRequestData";
export var MACONOMYEDITABLEFIELDSINTERNALNAME = "ManageEditableFields";
export var DUEDILQUESTIONSURL = "/Lists/DueDiligenceQuestions";
export var DUEDILOPTIONSURL = "/Lists/DueDiligenceOptions";
export var DUEDILIGENCEURL = "/Lists/DueDiligenceChecks";
// Changes start - 27/12/2021
export var USERACCESSLEVEL_INTERNALNAME = "UserAccessLevel";
// Changes end - 27/12/2021
export var CLIENTIDTYPE_INTERNALNAME = "ClientIDType"; //Shraddha test 7
//Shraddha 29-09-22 after test change
export var SPECIALCHARACTERSLISTNAME = "/Lists/ExcludedCharacters";
//Shraddha test 7
export var SAUDI_COMPANY = ["310", "315", "225"];
//rutvik 13-3-2024
export var SAUDI_ARABIA_COUNTRY = "Saudi Arabia";
export var SAUDI_ARABIA_COUNTRY_OF_COMPANY = "saudi_arabia";
//rutvik task 9
export var UPDATEREQUESTLISTLEVEL1 = "UpdatedRequestLevel1";
//end
// Jaymin Change	
export var PERMISSIONFLOWTRIGGERLISTURL = "PermissionFlowTrigger";
//error log changes
export var ERRORLIST = "Errors";
//change start - 25-1-22
// export const TESTUSERACCESSLEVEL = "/Lists/TestUserAccessLevel";
export var ACCESSLEVELRANGE = "/Lists/AccessLevelRange";
//change end - 25-1-22
export var DUEDILIGENCENAME = "Due Diligence Checks";
export var EVERYONE_ID = 9; //tatva, dev, test
// export const EVERYONE_ID: number = 8; //PROD
//R FHD change 19-9-23
export var FHDUserGroupID = "552"; //Dev site
// export const FHDUserGroupID: string = "498"; //Test site
// export const FHDUserGroupID: string = "1461"; //Prod site
//R FHD change 20-9-2023
export var FHDUSERS = 'FHDUsers';
export var REQUESTTYPE_OPTIONS = [{ key: '7', text: strings.RequestType[0] },
    { key: '8', text: strings.RequestType[1] },
    { key: '9', text: strings.RequestType[2] },
    { key: '10', text: strings.RequestType[3] },
    { key: '11', text: strings.RequestType[4] },
    { key: '12', text: strings.RequestType[5] },
    { key: '13', text: strings.RequestType[6] }]; //rutvik task 6
export var REQ7_SECTION_OPTIONS = [{ key: "1", text: strings.RequestSections[0] },
    { key: "2", text: strings.RequestSections[1] },
    { key: "3", text: strings.RequestSections[2] },
    { key: "4", text: strings.RequestSections[3] },
    { key: "5", text: strings.RequestSections[4] },
    { key: "6", text: strings.RequestSections[5] }];
export var REQ8_SECTION_OPTIONS = [{ key: "1", text: strings.RequestSections[6] },
    { key: "2", text: strings.RequestSections[1] },
    { key: "3", text: strings.RequestSections[2] },
    { key: "4", text: strings.RequestSections[3] },
    { key: "5", text: strings.RequestSections[4] },
    { key: "6", text: strings.RequestSections[5] }];
export var REQ9_SECTION_OPTIONS = [{ key: "1", text: strings.Request9Sections[0] },
    { key: "2", text: strings.Request9Sections[1] },
    { key: "3", text: strings.Request9Sections[2] }];
export var REQ11_SECTION_OPTIONS = [{ key: "1", text: strings.Request11Sections[0] },
    { key: "2", text: strings.Request11Sections[1] }];
export var CLSCOL = "col";
export var CLSCOLACTIVE = "col active";
export var CLSCOLSAVE = "col active save";
export var LOADING_CSS = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  border-color: #ca5010;"], ["\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  border-color: #ca5010;"])));
export var LOADER_COLOR = "#ca5010";
export var INVALID_FILE_EXTENSIONS = ["exe", "js", "ps1", "msg"]; //rutvik change
export var GULF_COMPANIES = ["300", "305", "310", "320"];
export var EMIRATE_COMPANIES = ["300", "305"];
export var INDIA_COMPANY = "330";
//rutvik 4-7 24
export var ITALIAN_COMPANY = "225";
//endr
export var MASTER_DROPDOWNS_7_8 = [{ key: "dpCountry", name: "Country" },
    { key: "dpCurrency", name: "Currency" },
    { key: "dpClientType", name: "Client type" },
    //{ key: "dpClientStatus", name: "Client status" },
    { key: "dpSector", name: "Sector" }];
//rutvik 29-3-24
//For Request 7, 8 and 12
export var EXCLUDEFROMCLIENTINVOICEREMINDER = [
    { key: strings.strNo, text: strings.strNo },
    { key: strings.strYes, text: strings.strYes },
];
//rutvik task 6
export var MASTER_DROPDOWNS_REQ13 = [{ key: "dpCurrency", name: "Currency" }];
export var CLIENTUPDATE_SECTIONS = [{ key: "1", text: strings.ClientUpdateSections[0] },
    { key: "2", text: strings.ClientUpdateSections[1] },
    { key: "3", text: strings.ClientUpdateSections[2] },
];
//rutvik task 6
export var CLIENTCREATIONWITHCURRENCY_SECTION = [{ key: "1", text: strings.ClientCreaionWithCurrency[0] },
    { key: "2", text: strings.ClientCreaionWithCurrency[1] },
    { key: "3", text: strings.ClientCreaionWithCurrency[2] },
];
//rend
export var COMPANYCLIENTUPDATE_SECTIONS = [{ key: "1", text: strings.CompanyClientUpdateSections[0] },
    { key: "2", text: strings.CompanyClientUpdateSections[1] },
    { key: "3", text: strings.CompanyClientUpdateSections[2] },
    { key: "4", text: strings.CompanyClientUpdateSections[3] }
];
export var MASTER_DROPDOWNS = [
    { key: "dpDefaultTaxCode", name: "Default Tax code", required: true },
    { key: "dpPaymentTerms", name: "Payment Terms", required: true },
    { key: "dpWithholdingTaxType", name: "Withholding Tax Type", required: false },
    { key: "dpEmirate", name: "Emirate", required: false },
    { key: "dpPlaceofSupply", name: "Place of supply", required: false },
    { key: "dpGSTRegistrationType", name: "GST Registration Type", required: false },
];
export var WHITE = "white";
export var YELLOW = "yellow";
export var RED = "red";
export var REQUESTVIEWXML = "<ViewFields>\n<FieldRef Name=\"MaconomyAccountID\"></FieldRef>\n<FieldRef Name=\"ContactCompanyNo\"></FieldRef>\n<FieldRef Name=\"Title\"></FieldRef>\n<FieldRef Name=\"LegalName\"></FieldRef>\n<FieldRef Name=\"Company\"></FieldRef>\n<FieldRef Name=\"Office\"></FieldRef>\n<FieldRef Name=\"WorkflowType\"></FieldRef>\n<FieldRef Name=\"Line1\"></FieldRef>\n<FieldRef Name=\"Line2\"></FieldRef>\n<FieldRef Name=\"Zipcode\"></FieldRef>\n<FieldRef Name=\"Postal_District_City\"></FieldRef>\n<FieldRef Name=\"Country_Area_Region\"></FieldRef>\n<FieldRef Name=\"ClientAttentionName\"></FieldRef>\n<FieldRef Name=\"Country\"></FieldRef>\n<FieldRef Name=\"Email\"></FieldRef>\n<FieldRef Name=\"PhoneNo\"></FieldRef>\n<FieldRef Name=\"Sector\"></FieldRef>\n<FieldRef Name=\"Currency\"></FieldRef>\n<FieldRef Name=\"CompanyRegistrationNo\"></FieldRef>\n<FieldRef Name=\"TaxRegistrationNo\"></FieldRef>\n<FieldRef Name=\"CIN\"></FieldRef>\n<FieldRef Name=\"DefaultTaxCode\"></FieldRef>\n<FieldRef Name=\"PaymentTerms\"></FieldRef>\n<FieldRef Name=\"DeliveryMethod\"></FieldRef>\n<FieldRef Name=\"WithholdingTaxType\"></FieldRef>\n<FieldRef Name=\"Emirate\"></FieldRef>\n<FieldRef Name=\"PlaceofSupply\"></FieldRef>\n<FieldRef Name=\"GSTRegistrationType\"></FieldRef>\n<FieldRef Name=\"TDSTaxRate\"></FieldRef>\n<FieldRef Name=\"ClientStatus\"></FieldRef>\n<FieldRef Name=\"ClientType\"></FieldRef>\n<FieldRef Name=\"FolderPath\"></FieldRef>\n<FieldRef Name=\"Submitted\"></FieldRef>\n<FieldRef Name=\"SubmittedDate\"></FieldRef>\n<FieldRef Name=\"Status\"></FieldRef>\n<FieldRef Name=\"Stage1Status\"></FieldRef>\n<FieldRef Name=\"Stage2Status\"></FieldRef>\n<FieldRef Name=\"Stage3Status\"></FieldRef>\n<FieldRef Name=\"Stage1Approver\"></FieldRef>\n<FieldRef Name=\"Stage1_sub_approver\"></FieldRef>\n<FieldRef Name=\"Stage2Approver\"></FieldRef>\n<FieldRef Name=\"Stage2_sub_approver\"></FieldRef>\n<FieldRef Name=\"Stage3Approver\"></FieldRef>\n<FieldRef Name=\"Stage3_sub_approver\"></FieldRef>\n<FieldRef Name=\"RequestType\"></FieldRef>\n<FieldRef Name=\"Stage1Comments\"></FieldRef>\n<FieldRef Name=\"Stage2Comments\"></FieldRef>\n<FieldRef Name=\"Stage3Comments\"></FieldRef>\n<FieldRef Name=\"Child\"></FieldRef>\n</ViewFields>\n";
export var listOfEditableFields = [
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
var templateObject_1;
//# sourceMappingURL=Constants.js.map