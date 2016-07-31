import React from 'react';

function fitResolution(image) {

  const maxHeight = window.innerHeight * (3 / 4);
  image.resolutions.push(image.source);

  return image.resolutions.reverse().find(i => i.height < maxHeight);
}

function ImageContent(props) {
  return (
    <img
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      src={fitResolution(props.image.variants.gif || props.image).url}
      alt={props.alt}
    />
  );
}

ImageContent.propTypes = {
  image: React.PropTypes.object,
  alt: React.PropTypes.string,
};

export default ImageContent;
