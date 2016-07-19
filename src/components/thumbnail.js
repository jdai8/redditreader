import React from 'react';
import Avatar from 'material-ui/Avatar';

const style = {
  borderRadius: 2,
  marginRight: 16,
};

function Thumbnail(props) {

  const avatarProps = {};
  if (props.src === 'nsfw') {
    avatarProps.children = '!!!';

  } else if (props.src.indexOf('http') !== -1) {
    avatarProps.src = props.src;

  } else {
    const firstWordChar = Math.max(props.title.search(/\w/), 0);
    avatarProps.children = props.title.charAt(firstWordChar);
  }

  return (
    <Avatar
      style={style}
      size={70}
      {...avatarProps}
    />
  );
}

Thumbnail.propTypes = {
  title: React.PropTypes.string,
  src: React.PropTypes.string,
};

export default Thumbnail;
