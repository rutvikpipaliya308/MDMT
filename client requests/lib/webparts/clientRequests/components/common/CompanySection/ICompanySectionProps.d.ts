import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ICompanySectionProps {
    context: WebPartContext;
    dpCompany: string;
    isWorkflowTypeNeeded: boolean;
    rbtnWorkflowType?: string;
    setSelectedCompany?: any;
    isDisable?: any;
    setLoader?: any;
    requestType: string;
    itemID: number;
    accessLevel?: string;
    setCurrentCompanyAccessLevel?: any;
    countryOfCompany?: string;
}
export interface ICompanySectionState {
    dpCompany: string;
    dpCompanyOptions: any;
    rbtnWorkflowType: string;
    errors?: any;
    currentCompanyAccessLevel: string;
    companyAccessLevelCompare: string;
    countryOfCompany: string;
    companyValuesWithCountry: any;
}
//# sourceMappingURL=ICompanySectionProps.d.ts.map