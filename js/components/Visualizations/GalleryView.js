import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-react-router';

import { fetchSpecsIfNeeded } from '../../actions/VisualizationActions';
import styles from './visualizations.sass';

import Visualization from './Visualization';

export class GalleryView extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { specSelector, project } = this.props;

    if (specSelector.datasetId) {
      this.props.fetchSpecsIfNeeded(project.properties.id, specSelector.datasetId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { specSelector, project } = this.props;
    if (specSelector.datasetId !== nextProps.specSelector.datasetId) {
      this.props.fetchSpecsIfNeeded(project.properties.id, nextProps.specSelector.datasetId);
    }
  }

  handleClick(specId) {
    this.props.pushState(null, `/projects/${this.props.project.properties.id}/visualizations/builder/${ specId }`);
  }

  render() {
    return (
      <div className={ styles.specsContainer }>
        { this.props.specs.items.map((spec) =>
          <div className={ styles.blockContainer } key={ spec.id }>
            <Visualization
              containerClassName="block"
              visualizationClassName="specsContainer"
              spec={ spec }
              data={ spec.data.visualize }
              onClick={ this.handleClick }
              isMinimalView={ true }
              showHeader={ true } />
          </div>
        )}
      </div>
    );
  }
}

GalleryView.propTypes = {
  project: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
  specSelector: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { project, specs, specSelector } = state;
  return {
    project,
    specs,
    specSelector
  }
}

export default connect(mapStateToProps, { pushState, fetchSpecsIfNeeded })(GalleryView);
