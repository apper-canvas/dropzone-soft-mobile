import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const UploadStats = ({ session }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completionRate = session.totalFiles > 0 ? (session.completedFiles / session.totalFiles) * 100 : 0;
  const uploadRate = session.totalSize > 0 ? (session.uploadedSize / session.totalSize) * 100 : 0;

  const stats = [
    {
      id: 'total-files',
      label: 'Total Files',
      value: session.totalFiles,
      icon: 'Files',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'completed-files',
      label: 'Completed',
      value: session.completedFiles,
      icon: 'CheckCircle',
      gradient: 'from-success to-green-600'
    },
    {
      id: 'total-size',
      label: 'Total Size',
      value: formatFileSize(session.totalSize),
      icon: 'HardDrive',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'uploaded-size',
      label: 'Uploaded',
      value: formatFileSize(session.uploadedSize),
      icon: 'Upload',
      gradient: 'from-primary to-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-heading font-semibold text-white mb-4">
          Upload Progress
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-surface-300">Files: {session.completedFiles} / {session.totalFiles}</span>
            <span className="text-surface-300">{completionRate.toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-surface-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-success to-green-600 rounded-full"
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-surface-300">Data: {formatFileSize(session.uploadedSize)} / {formatFileSize(session.totalSize)}</span>
            <span className="text-surface-300">{uploadRate.toFixed(1)}%</span>
          </div>
          
          <div className="w-full bg-surface-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${uploadRate}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-xl p-4 text-center"
          >
            <div className={`
              w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${stat.gradient}
            `}>
              <ApperIcon name={stat.icon} className="w-6 h-6 text-white" />
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-heading font-bold text-white">
                {stat.value}
              </p>
              <p className="text-surface-400 text-sm">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UploadStats;