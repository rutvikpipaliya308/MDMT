import * as React from 'react';
import { IDuplicationCheckState, IDuplicationcheckProps } from './IDuplicationCheckProps';
export default class DuplicationCheck extends React.Component<IDuplicationcheckProps, IDuplicationCheckState> {
    private serverRelativeURL;
    private objWeb;
    private isRequest9;
    constructor(props: IDuplicationcheckProps);
    componentWillMount(): void;
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IDuplicationcheckProps>;
    private LoadData;
    private checkIfFieldDisabled;
    private ValidateDuplicationSection;
    private SaveData;
    private _onTbxChange;
    private _NextClick;
    private _BackClick;
    private _DeleteRequest;
    private _SaveForLaterClick;
    private SaveDataOperations;
}
//# sourceMappingURL=DuplicationCheck.d.ts.map