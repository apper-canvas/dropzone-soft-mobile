import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PageHeading = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-center"
    >
      <h1 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-surface-300 text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
};

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageHeading;