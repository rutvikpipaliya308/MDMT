import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ReactPortal } from "react";

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
    countryOfCompany?: string; //rutvik 13-3-24
}

export interface ICompanySectionState {
    dpCompany: string;
    dpCompanyOptions: any;
    rbtnWorkflowType: string;
    errors?: any;
    currentCompanyAccessLevel: string; //rutvik 17-1-24
    companyAccessLevelCompare: string; //rutvik 17-1-24
    countryOfCompany: string; //rutvik 13-3-24
    companyValuesWithCountry: any; //rutvik 13-3-24
}