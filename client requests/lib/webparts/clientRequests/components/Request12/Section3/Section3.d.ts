import { ISection3Props, ISection3State } from './ISection3Props';
import * as React from 'react';
export default class Section3 extends React.Component<ISection3Props, ISection3State> {
    private serverRelativeURL;
    private objWeb;
    private requestJson;
    private clientJson;
    constructor(props: ISection3Props);
    componentWillMount(): Promise<void>;
    getClientIDTypeOptions(): Promise<void>;
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<ISection3Props>;
    private checkIfFieldDisabled;
    private BindDefaultTaxCode;
    private DropDownColorChange;
    private BindData;
    private _OnDropDownChange;
    private _onTbxChange;
    private ValidateSection3;
    private _BackClick;
    private _NextClick;
    private _SaveForLaterClick;
    private SaveData;
    private SaveDataOperation;
    private SetTextBoxValue;
}
//# sourceMappingURL=Section3.d.ts.map