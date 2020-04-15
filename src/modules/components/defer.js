/* eslint-disable max-classes-per-file */
import React from 'react';
import * as PropTypes from 'prop-types';


export class Defer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const { mounted } = this.state;
    const { children } = this.props;

    if (mounted) {
      return children;
    }

    return null;
  }
}

Defer.displayName = 'Defer';

Defer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};

function defer(Component) {
  class DeferHOC extends React.Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
      mounted: false,
    };

    componentDidMount() {
      this.setState({
        mounted: true,
      });
    }

    render() {
      return <Component mounted={this.state.mounted} {...this.props} />;
    }
  }

  DeferHOC.displayName = 'DeferHOC';

  return DeferHOC;
}

export default defer;
