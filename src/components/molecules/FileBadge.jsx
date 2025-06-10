import PropTypes from 'prop-types';
import { getFileTypeColor } from '@/utilities/fileUtils';

const FileBadge = ({ type }) => {
  // Extract common file extensions for display
  let displayText = type.split('/')[1];
  if (displayText && displayText.includes(';')) {
    displayText = displayText.split(';')[0]; // Handle cases like 'image/jpeg;base64'
  }
  if (displayText && displayText.includes('+')) {
    displayText = displayText.split('+')[0]; // Handle cases like 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }
  displayText = displayText ? displayText.toUpperCase() : 'UNKNOWN';

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r text-white
        ${getFileTypeColor(type)}
      `}
    >
      {displayText}
    </span>
  );
};

FileBadge.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FileBadge;