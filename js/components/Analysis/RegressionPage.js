import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-react-router';
import styles from './Analysis.sass';

import AnalysisSidebar from './AnalysisSidebar';
import RegressionView from './RegressionView';

export class RegressionPage extends Component {
  render() {
    return (
      <div className={ `${styles.fillContainer} ${styles.regressionContainer}` }>
        <AnalysisSidebar selectedTab="regression"/>
        <RegressionView />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { pushState })(RegressionPage);