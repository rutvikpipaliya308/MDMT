import * as React from 'react';
import { IParentClientCommonSectionProps, IParentClientCommonSectionState } from './IParentClientCommonSectionProps';
export default class ParentClientCommonSection extends React.Component<IParentClientCommonSectionProps, IParentClientCommonSectionState> {
    private serverRelativeURL;
    private objWeb;
    private isRequest9;
    private requestorID;
    private submitData;
    constructor(props: IParentClientCommonSectionProps);
    componentWillMount(): Promise<void>;
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IParentClientCommonSectionProps>;
    private GetRequest9AvailableClientsXML;
    private GetRequest11AvailableClientsXML;
    private BindAvailableClientsGridData;
    private BindAssignedClients;
    private SelectClient;
    private RendorSelectedClientsList;
    private _BackClick;
    private _SaveForLaterClick;
    private SaveDataOperation;
    private ValidateCommonSection;
    private GetAssignedClientsMacIds;
    private SaveData;
    private _SaveClick;
    private _SubmitClick;
}
//# sourceMappingURL=ParentClientCommonSection.d.ts.map