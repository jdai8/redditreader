import React from 'react';

import ImageContent from './imageContent';

function PostContent(props) {

  if (props.data.media && props.data.media.oembed) {
    // media
    return (
      <div
        style={props.style}
        dangerouslySetInnerHTML={{
          __html: props.data.media.oembed.html,
        }}
      />
    );

  } else if (props.data.selftext_html) {
    // self post
    return (
      <div
        style={Object.assign({ padding: 20 }, props.style)}
        dangerouslySetInnerHTML={{
          __html: props.data.selftext_html,
        }}
      />
    );

  } else if (props.data.preview) {
    // image
    return (
      <div
        style={props.style}
      >
        {props.data.preview.images.map((image, i) => (
          <ImageContent
            key={i} image={image} alt={props.data.title}
          />
        ))}
      </div>
    );
  }

  console.log('not a selftext or an image'); // eslint-disable-line
  return false;
}

PostContent.propTypes = {
  data: React.PropTypes.object,
  style: React.PropTypes.object,
};

export default PostContent;
