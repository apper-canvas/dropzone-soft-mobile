import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, gradient, delay, className, children }) => {
  return (
    <div className={`w-full bg-surface-700 rounded-full h-3 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className={`h-full ${gradient} rounded-full relative overflow-hidden`}
      >
        {children}
      </motion.div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  gradient: PropTypes.string.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};

ProgressBar.defaultProps = {
  delay: 0,
  className: '',
  children: null,
};

export default ProgressBar;