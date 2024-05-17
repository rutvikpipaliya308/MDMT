import * as React from 'react';
import { IClientRequestsProps, IClientRequestsState } from './IClientRequestsProps';
import "@pnp/polyfill-ie11";
import 'core-js/es6/array';
import 'es6-map/implement';
export default class ClientRequests extends React.Component<IClientRequestsProps, IClientRequestsState> {
    private objWeb;
    constructor(props: IClientRequestsProps);
    render(): React.ReactElement<IClientRequestsProps>;
    componentDidMount(): Promise<void>;
    private LoadRequestComponent;
}
//# sourceMappingURL=ClientRequests.d.ts.map