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
    isFHDUser: boolean;
    CountryOfCompany?: string;
}
export interface ISection3State {
    loading: boolean;
    dpCountry: IDropdownProperties;
    dpCurrency: IDropdownProperties;
    dpSector: IDropdownProperties;
    dpClientType: IDropdownProperties;
    dpExcludedFromClientInvoiceReminder: IDropdownProperties;
    tbxSocialName: string;
    tbxLegalNameInArabic: string;
    tbxLine2: string;
    tbxZipcode: string;
    tbxPostal: string;
    tbxCountryArea: string;
    tbxClientAttenName: string;
    tbxEmail: string;
    tbxFinanceEmail: string;
    tbxPhoneNo: string;
    tbxCompanyRegNo: string;
    errors?: any;
    tbxContactComNo?: string;
    itemID: number;
    currentUserid: any;
    requestorid: any;
    tbxArabicLine1: string;
    tbxArabicLine2: string;
    tbxArabicPostal: string;
    tbxArabicCountryArea: string;
    Boolean3Value: boolean;
}
//# sourceMappingURL=ISection3Props.d.ts.map