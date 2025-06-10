import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import ProgressBar from '@/components/molecules/ProgressBar';
import { formatFileSize, getFileIcon, getFileTypeColor } from '@/utilities/fileUtils';

const FileUploadCard = ({ file, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            bg-gradient-to-br ${getFileTypeColor(file.type)}
          `}>
            <ApperIcon name={getFileIcon(file.type)} className="w-5 h-5 text-white" />
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-white font-medium truncate">
              {file.name}
            </p>
            <p className="text-surface-400 text-sm">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="p-2 hover:bg-surface-700 rounded-lg transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-4 h-4 text-surface-400 hover:text-white" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-surface-300">
            {file.uploadProgress}% complete
          </span>
          <span className="text-surface-400">
            {file.status === 'uploading' ? 'Uploading...' : 'Processing...'}
          </span>
        </div>
        
        <ProgressBar
          progress={file.uploadProgress}
          gradient="bg-gradient-to-r from-primary to-secondary"
          className="h-2"
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </ProgressBar>
      </div>
    </motion.div>
  );
};

FileUploadCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    uploadProgress: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FileUploadCard;