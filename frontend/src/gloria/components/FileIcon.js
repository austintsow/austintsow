import React from 'react';

const FileIcon = ({ type, thumbnail }) => {
  if (thumbnail) {
    // Show photo thumbnail for images
    return (
      <img
        src={thumbnail}
        alt=""
        className="file-icon"
        loading="lazy"
      />
    );
  }

  // Show markdown icon for README.md
  return (
    <div className="markdown-icon">
      <span>.md</span>
    </div>
  );
};

export default FileIcon;
