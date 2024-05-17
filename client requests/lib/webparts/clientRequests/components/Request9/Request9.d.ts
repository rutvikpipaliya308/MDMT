import * as React from 'react';
import { IRequest9Props, IRequest9State } from './IRequest9Props';
export declare const listOfEditableFields: {
    key: string;
    value: string;
    openable: boolean;
}[];
export default class Request9 extends React.Component<IRequest9Props, IRequest9State> {
    private serverRelativeURL;
    private objWeb;
    private isAccessLevelPresentForUser;
    constructor(props: IRequest9Props);
    componentWillMount(): Promise<void>;
    private getEditableFields;
    render(): React.ReactElement<IRequest9Props>;
    private dataChange;
    private NextStep;
    private BackStep;
    private RenderSections;
}
//# sourceMappingURL=Request9.d.ts.map