import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import FileBadge from '@/components/molecules/FileBadge';

const DropZoneDisplay = ({ isDragging, acceptedFileTypes }) => {
  const displayFileTypes = Object.entries(acceptedFileTypes).slice(0, 6);

  return (
    <motion.div
      animate={isDragging ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="relative">
        <motion.div
          animate={isDragging ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          className={`
            w-20 h-20 mx-auto rounded-full flex items-center justify-center
            ${isDragging 
              ? 'bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25' 
              : 'bg-gradient-to-br from-surface-700 to-surface-600'
            }
          `}
        >
          <ApperIcon 
            name={isDragging ? "Download" : "Upload"} 
            className="w-8 h-8 text-white" 
          />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-heading font-semibold text-white">
          {isDragging ? "Drop files here" : "Drag & drop files"}
        </h3>
        <p className="text-surface-300">
          or click to browse your computer
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap justify-center gap-2">
          {displayFileTypes.map(([type, ext]) => (
            <FileBadge key={type} type={type} />
          ))}
        </div>
        <p className="text-surface-400 text-sm">
          Maximum file size: 50MB
        </p>
      </div>
    </motion.div>
  );
};

DropZoneDisplay.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  acceptedFileTypes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DropZoneDisplay;