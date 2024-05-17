import * as React from 'react';
import { ISection2Props, ISection2State } from './ISection2Props';
export default class Section2 extends React.Component<ISection2Props, ISection2State> {
    private serverRelativeURL;
    private objWeb;
    private requestJson;
    private clientJson;
    constructor(props: ISection2Props);
    componentWillMount(): Promise<void>;
    render(): React.ReactElement<ISection2Props>;
    private checkIfFieldDisabled;
    componentDidMount(): Promise<void>;
    getClientIDTypeOptions(): Promise<void>;
    private _onTbxChange;
    private BindData;
    private _onDropDownChange;
    private GetClient;
    private _BackClick;
    private _NextClick;
    private _SaveForLaterClick;
    private validationSection2;
    private saveData;
    private saveDataOperation;
    private SetTextboxValue;
}
//# sourceMappingURL=Section2.d.ts.map