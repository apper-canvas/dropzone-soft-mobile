import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import StatCard from '@/components/molecules/StatCard';
import ProgressBar from '@/components/molecules/ProgressBar';
import { formatFileSize } from '@/utilities/fileUtils';

const UploadStatisticsSection = ({ session }) => {
  const completionRate = session.totalFiles > 0 ? (session.completedFiles / session.totalFiles) * 100 : 0;
  const uploadRate = session.totalSize > 0 ? (session.uploadedSize / session.totalSize) * 100 : 0;

  const stats = [
    {
      id: 'total-files',
      label: 'Total Files',
      value: session.totalFiles,
      iconName: 'Files',
      iconGradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'completed-files',
      label: 'Completed',
      value: session.completedFiles,
      iconName: 'CheckCircle',
      iconGradient: 'from-success to-green-600'
    },
    {
      id: 'total-size',
      label: 'Total Size',
      value: formatFileSize(session.totalSize),
      iconName: 'HardDrive',
      iconGradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'uploaded-size',
      label: 'Uploaded',
      value: formatFileSize(session.uploadedSize),
      iconName: 'Upload',
      iconGradient: 'from-primary to-secondary'
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
          
          <ProgressBar progress={completionRate} gradient="bg-gradient-to-r from-success to-green-600" />
          
          <div className="flex justify-between text-sm">
            <span className="text-surface-300">Data: {formatFileSize(session.uploadedSize)} / {formatFileSize(session.totalSize)}</span>
            <span className="text-surface-300">{uploadRate.toFixed(1)}%</span>
          </div>
          
          <ProgressBar progress={uploadRate} gradient="bg-gradient-to-r from-primary to-secondary" delay={0.2} />
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.id} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
};

UploadStatisticsSection.propTypes = {
  session: PropTypes.shape({
    totalFiles: PropTypes.number.isRequired,
    completedFiles: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    uploadedSize: PropTypes.number.isRequired,
  }).isRequired,
};

export default UploadStatisticsSection;