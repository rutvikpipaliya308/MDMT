import * as React from 'react';
import { IRequest10Props, IRequest10State } from './IRequest10Props';
export declare const listOfEditableFields: {
    key: string;
    value: string;
    openable: boolean;
}[];
export default class Request10 extends React.Component<IRequest10Props, IRequest10State> {
    private serverRelativeURL;
    private objWeb;
    private isAccessLevelPresentForUser;
    constructor(props: IRequest10Props);
    componentWillMount(): Promise<void>;
    private getEditableFields;
    render(): React.ReactElement<IRequest10Props>;
    private RenderSections;
    private dataChange;
    private NextStep;
    private BackStep;
}
//# sourceMappingURL=Request10.d.ts.map