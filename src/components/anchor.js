import React from 'react';
import Radium from 'radium';

const style = {
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

function Anchor(props) {
  return (
    <a
      href={props.href}
      target="_blank"
      style={style}
    >
      {props.children}
    </a>
  );
}

Anchor.propTypes = {
  href: React.PropTypes.string,
  children: React.PropTypes.string,
};

export default Radium(Anchor);
