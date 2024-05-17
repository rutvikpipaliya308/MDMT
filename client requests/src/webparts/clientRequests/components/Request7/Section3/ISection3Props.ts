import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IDropdownProperties } from '../../IDropdownProperties';

export interface ISection3Props {
    nextStep: any;
    backStep: any;
    data: any;
    section2Data: any;
    dataChange: any;
    itemID: number;
    itemSubmitted: boolean;
    listData: any;
    context: WebPartContext;
    requestType: string;
    contactCompanyNo?: string;
    listOfEditableFields: any;
    accessLevel?: string;
    isFHDUser: boolean; //r fhd change
    CountryOfCompany?: string; //rutvik 13-3-24
}

export interface ISection3State {
    loading: boolean;
    dpCountry: IDropdownProperties;
    dpCurrency: IDropdownProperties;
    dpSector: IDropdownProperties;
    //dpClientStatus: IDropdownProperties;
    dpClientType: IDropdownProperties;
    dpExcludedFromClientInvoiceReminder: IDropdownProperties;
    tbxSocialName: string;
    tbxLegalNameInArabic: string; //rutvik 13-3-24
    tbxLine2: string;
    tbxZipcode: string;
    tbxPostal: string;
    tbxCountryArea: string;
    tbxClientAttenName: string;
    tbxEmail: string;
    tbxFinanceEmail: string; //rutvik 28-3-24
    tbxPhoneNo: string;
    tbxCompanyRegNo: string;
    errors?: any;
    tbxContactComNo?: string;
    itemID: number;
    //shraddha 09-08-22 item 4
    currentUserid: any;
    requestorid: any;
    //shraddha end
    tbxArabicLine1: string, //rutvik 13-3-24
    tbxArabicLine2: string,
    // tbxArabicZipcode: string,
    tbxArabicPostal: string,
    tbxArabicCountryArea: string,//end
    Boolean3Value: boolean; //rutvik 28-3-24
}