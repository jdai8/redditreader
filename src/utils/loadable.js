import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

function loadable(Component) {

  function load(props) {
    if (props.data.length === 0) {
      return <LinearProgress />;
    }
    return <Component {...props} />;
  }

  load.propTypes = {
    data: React.PropTypes.object,
  };

  return load;
}

export default loadable;
