import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICardFooterProps {
    nextBtnMethod?: any;
    backBtnMethod?: any;
    saveForLaterBtnMethod?: any;
    submitBtnMethod?: any;
    saveItemBtnMethod?: any;
    cancelReqMethod?: any;
    context: WebPartContext;
}
export interface ICardFooterState {

}