import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from './ApperIcon';

const FileList = ({ files, onRemove }) => {
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

  if (files.length === 0) {
    return (
      <div className="text-center py-8">
        <ApperIcon name="Files" className="w-12 h-12 text-surface-500 mx-auto mb-3" />
        <p className="text-surface-400">No files uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-full overflow-hidden">
      {files.map((file, index) => (
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
      ))}
    </div>
  );
};

export default FileList;