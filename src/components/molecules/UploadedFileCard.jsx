import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import { formatFileSize, getFileIcon, getFileTypeColor } from '@/utilities/fileUtils';

const UploadedFileCard = ({ file, onRemove, index }) => {
  return (
    <motion.div
      key={file.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-4 hover:bg-surface-700/50 transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
            bg-gradient-to-br ${getFileTypeColor(file.type)}
          `}>
            <ApperIcon name={getFileIcon(file.type)} className="w-6 h-6 text-white" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">
              {file.name}
            </h4>
            <div className="flex items-center gap-4 text-sm text-surface-400">
              <span>{formatFileSize(file.size)}</span>
              {file.uploadedAt && (
                <span>
                  {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {file.url && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(file.url, '_blank')}
              className="p-2 hover:bg-primary/20 rounded-lg transition-colors duration-200"
              title="View file"
            >
              <ApperIcon name="ExternalLink" className="w-4 h-4 text-primary" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(file.id)}
            className="p-2 hover:bg-error/20 rounded-lg transition-colors duration-200"
            title="Remove file"
          >
            <ApperIcon name="Trash2" className="w-4 h-4 text-error" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

UploadedFileCard.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    uploadedAt: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default UploadedFileCard;