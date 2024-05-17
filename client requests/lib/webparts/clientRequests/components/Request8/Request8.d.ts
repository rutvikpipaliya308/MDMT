import * as React from 'react';
import { IRequest8Props, IRequest8State } from './IRequest8Props';
export default class Request8 extends React.Component<IRequest8Props, IRequest8State> {
    private serverRelativeURL;
    private objWeb;
    private isAccessLevelPresentForUser;
    constructor(props: IRequest8Props);
    componentWillMount(): Promise<void>;
    render(): React.ReactElement<IRequest8Props>;
    private getEditableFields;
    private RenderSections;
    private dataChange;
    private NextStep;
    private BackStep;
    private getDueDiligenceQuestions;
}
//# sourceMappingURL=Request8.d.ts.map