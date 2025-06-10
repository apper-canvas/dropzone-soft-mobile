import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const FileUploadProgress = ({ file, onCancel }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'Table';
    if (type.includes('zip') || type.includes('rar')) return 'Archive';
    return 'File';
  };

  const getFileTypeColor = (type) => {
    if (type.startsWith('image/')) return 'from-blue-500 to-blue-600';
    if (type.includes('pdf')) return 'from-red-500 to-red-600';
    if (type.includes('word') || type.includes('document')) return 'from-blue-500 to-blue-700';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'from-green-500 to-green-600';
    if (type.includes('zip') || type.includes('rar')) return 'from-purple-500 to-purple-600';
    return 'from-gray-500 to-gray-600';
  };

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

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-surface-300">
            {file.uploadProgress}% complete
          </span>
          <span className="text-surface-400">
            {file.status === 'uploading' ? 'Uploading...' : 'Processing...'}
          </span>
        </div>
        
        <div className="w-full bg-surface-700 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${file.uploadProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploadProgress;