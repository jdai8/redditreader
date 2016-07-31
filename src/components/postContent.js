import React from 'react';

function PostContent(props) {
  if (props.media && props.media.oembed) {
    return (
      <div
        style={props.style}
        dangerouslySetInnerHTML={{
          __html: props.media.oembed.html,
        }}
      />
    );
  } else if (props.html) {
    return (
      <div
        style={Object.assign({ padding: 15 }, props.style)}
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}
      />
    );
  } else if (props.preview) {
    return (
      <div >
        {props.preview.images.map((image, i) => (
          <img
            key={i}
            style={Object.assign({
              maxWidth: '100%',
              maxHeight: '100%',
            }, props.style)}
            src={image.variants.gif ?
              image.variants.gif.source.url :
              image.source.url
            }
            alt="toast"
          />
        ))}
      </div>
    );
  }

  console.log('not a selftext or an image'); // eslint-disable-line
  return <div></div>;
}

PostContent.propTypes = {
  html: React.PropTypes.string,
  preview: React.PropTypes.object,
  media: React.PropTypes.object,
  style: React.PropTypes.object,
};

export default PostContent;
