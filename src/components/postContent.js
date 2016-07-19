import React from 'react';

function PostContent(props) {
  if (props.html) {
    return (
      <div
        expandable
        dangerouslySetInnerHTML={{
          __html: props.html,
        }}
      />
    );
  } else if (props.preview) {
    return (
      <div expandable >
        {props.preview.images.map(image => (
          <img
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            src={image.source.url} alt="toast"
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
};

export default PostContent;
