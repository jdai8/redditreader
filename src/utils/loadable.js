import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const loadable = Component => props => {

    if (props.data.length === 0) {
        return <LinearProgress />

    } else {
        return <Component {...props} />
    }
}

export default loadable;
