import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ id, label, value, iconName, iconGradient, index }) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="glass rounded-xl p-4 text-center"
    >
      <div className={`
        w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center
        bg-gradient-to-br ${iconGradient}
      `}>
        <ApperIcon name={iconName} className="w-6 h-6 text-white" />
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-heading font-bold text-white">
          {value}
        </p>
        <p className="text-surface-400 text-sm">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

StatCard.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconName: PropTypes.string.isRequired,
  iconGradient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default StatCard;