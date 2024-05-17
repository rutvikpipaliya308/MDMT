import * as React from 'react';
import styles from './ClientRequests.module.scss';
import { IClientRequestsProps, IClientRequestsState } from './IClientRequestsProps';
import Request7 from './Request7/Request7';
import Request8 from './Request8/Request8';
import Request9 from './Request9/Request9';
import Request10 from './Request10/Request10';
import Request11 from './Request11/Request11';
import Request12 from './Request12/Request12';
import Request13 from './Request13/Request13';
import "@pnp/polyfill-ie11";
import 'core-js/es6/array';
import 'es6-map/implement';
import { Web } from 'sp-pnp-js';

require('../js/bootstrap.bundle.min.js');

require('../css/bootstrap.min.css');
require('../css/style.css');
require('../css/dev-style.css');

export default class ClientRequests extends React.Component<IClientRequestsProps, IClientRequestsState> {
  private objWeb: Web = new Web(this.props.context.pageContext.web.absoluteUrl);

  constructor(props: IClientRequestsProps) {
    super(props);
    this.state = {
      currentDate: null,
      isInMaintenance: false,
      displayMessage: ""
    };
  }

  public render(): React.ReactElement<IClientRequestsProps> {
    return (
      <>
        {this.state.isInMaintenance === false ?
          <div className={styles.clientRequests}>
            {this.LoadRequestComponent(this.props.requestType)}
          </div> :
          <div className={styles.clientRequests}>
            <div className={styles.container + " container-fluid"}>
              <h2>{this.state.currentDate}</h2>
              <div id='richText' className={styles.richtext}></div>
            </div>
          </div>}
      </>
    );
  }

  public async componentDidMount() {
    let date = new Date().toLocaleDateString();
    this.setState({ currentDate: date });
    var tempData = await this.objWeb.lists.getByTitle('IsInMaintenance').items.select('Maintenance,DisplayMessage').getAll();

    if (tempData[0].Maintenance == true) {
      this.setState({ isInMaintenance: true });
      this.setState({ displayMessage: tempData[0].DisplayMessage }, () => { document.getElementById('richText').innerHTML = this.state.displayMessage });
    }
  }

  private LoadRequestComponent(reqType: string) {
    /// <summary>Load request form component as per selection from property pane.</summary>
    switch (reqType) {
      case "7":
        return <Request7 {...this.props} />;
      case "8":
        return <Request8 {...this.props} />;
      case "9":
        return <Request9 {...this.props} />;
      case "10":
        return <Request10 {...this.props} />;
      case "11":
        return <Request11 {...this.props} />;
      case "12":
        return <Request12 {...this.props} />;
      case "13":
        return <Request13 {...this.props} />;
      default:
        return <Request7 {...this.props} />;
    }
  }
}
