import * as React from 'react';
import { IRequest13Props, IRequest13State } from './IRequest13Props';
export declare const listOfEditableFields: {
    key: string;
    value: string;
    openable: boolean;
}[];
export default class Request13 extends React.Component<IRequest13Props, IRequest13State> {
    private serverRelativeURL;
    private objWeb;
    private isAccessLevelPresentForUser;
    constructor(props: IRequest13Props);
    componentWillMount(): Promise<void>;
    private getEditableFields;
    render(): React.ReactElement<IRequest13Props>;
    private RenderSections;
    private dataChange;
    private NextStep;
    private BackStep;
}
//# sourceMappingURL=Request13.d.ts.map