import * as React from 'react';
import { IRequest12Props, IRequest12State } from './IRequest12Props';
export declare const listOfEditableFields: {
    key: string;
    value: string;
    openable: boolean;
}[];
export default class Request12 extends React.Component<IRequest12Props, IRequest12State> {
    private serverRelativeURL;
    private objWeb;
    private isAccessLevelPresentForUser;
    constructor(props: IRequest12Props);
    componentWillMount(): Promise<void>;
    private getEditableFields;
    render(): React.ReactElement<IRequest12Props>;
    private RenderSections;
    private dataChange;
    private NextStep;
    private BackStep;
}
//# sourceMappingURL=Request12.d.ts.map