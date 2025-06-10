import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFoundDisplay = ({ onGoHome }) => {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-8"
            >
              <ApperIcon name="AlertCircle" className="w-24 h-24 text-surface-400 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-surface-300 mb-8">
              The page you're looking for doesn't exist.
            </p>
            
            <Button onClick={onGoHome}>
              Go Home
            </Button>
          </motion.div>
        </div>
      );
    };

NotFoundDisplay.propTypes = {
  onGoHome: PropTypes.func.isRequired,
};

export default NotFoundDisplay;