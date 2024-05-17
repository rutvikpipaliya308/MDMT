import * as React from 'react';
import { ICompanySectionProps, ICompanySectionState } from './ICompanySectionProps';
export default class CardFooter extends React.Component<ICompanySectionProps, ICompanySectionState> {
    private objWeb;
    private serverRelativeURL;
    constructor(props: ICompanySectionProps);
    componentWillReceiveProps(newProps: ICompanySectionProps): void;
    componentWillMount(): Promise<void>;
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<ICompanySectionProps>;
    ValidateCompanySection(): any;
    private _onDpChange;
    private _onRadioBtnChange;
}
//# sourceMappingURL=CompanySection.d.ts.map