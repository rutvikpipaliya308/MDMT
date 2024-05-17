import * as React from 'react';
import { ICardFooterProps, ICardFooterState } from './ICardFooterProps';
import * as strings from 'ClientRequestsWebPartStrings';

export default class CardFooter extends React.Component<ICardFooterProps, ICardFooterState> {
    private siteURL: string = this.props.context.pageContext.web.absoluteUrl;

    public render(): React.ReactElement<ICardFooterProps> {
        return (<div className="card-footer">
            <div className="row justify-content-between">
                <div className="col-auto">
                    {this.props.backBtnMethod ?
                        <button className="btn btn-icon btn-secondary mb-1" onClick={this._BackClick.bind(this)}>
                            <img className="icon" src={require('../../../images/back-arrow.svg')} alt="back" />
                            <span>{strings.BtnBackText}</span>
                        </button>
                        : ""}
                    {this.props.cancelReqMethod ?
                        <p className="d-inline-block ml-2"> <button onClick={this._CancelRequest.bind(this)} className="btn btn-secondary text-black mb-1"><span className="cancle-link-btn">{strings.Lbl_CancelRequest}</span> </button></p> : ""}

                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-secondary mb-1" onClick={this._CancelClick.bind(this)}>
                        <span>{strings.BtnCancelText}</span>
                    </button>
                    {this.props.saveForLaterBtnMethod ?
                        <button type="button" className="btn btn-secondary ml-2 mb-1" onClick={this._SaveForLaterClick.bind(this)}>
                            <span>{strings.BtnSaveForLaterText}</span>
                        </button>
                        : ""}
                    {this.props.nextBtnMethod ?
                        <button className="btn btn-icon-right btn-primary ml-2 mb-1" onClick={this._NextClick.bind(this)}>
                            <span>{strings.BtnNextText}</span>
                            <img className="icon" src={require('../../../images/next-arrow.svg')} alt="Next" />
                        </button>
                        : ""}
                    {this.props.submitBtnMethod ?
                        <button type="button" className="btn btn-primary ml-2 mb-1" onClick={this._SubmitClick.bind(this)}>
                            <span>{strings.BtnSubmitText}</span>
                        </button>
                        : ""}
                    {this.props.saveItemBtnMethod ?
                        <button type="button" className="btn btn-primary ml-2 mb-1" onClick={this._SaveItemClick.bind(this)}>
                            <span>{strings.BtnSaveItemText}</span>
                        </button>
                        : ""}
                </div>
            </div>
        </div>);
    }

    private _NextClick() {
        /// <summary>Next button event.</summary>
        this.props.nextBtnMethod();
    }

    private async _BackClick() {
        /// <summary>Back button event.</summary>
        await this.props.backBtnMethod();
    }

    private async _CancelClick() {
        /// <summary>Cancel button event.</summary>
        window.location.href = this.siteURL;
    }

    private async _CancelRequest() {
        /// <summary>Cancel request event.</summary>
        await this.props.cancelReqMethod();

    }

    private async _SaveForLaterClick() {
        /// <summary>Save for later button event.</summary>
        await this.props.saveForLaterBtnMethod();
    }

    private async _SubmitClick() {
        /// <summary>Submit button event.</summary>
        await this.props.submitBtnMethod();
    }
    
    private _SaveItemClick() {
        /// <summary>Submit button event.</summary>
        this.props.saveItemBtnMethod();
    }
}
