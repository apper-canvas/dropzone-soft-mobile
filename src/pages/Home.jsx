import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import UploadStats from '../components/UploadStats';
import { uploadSessionService } from '../services';

const Home = () => {
  const [uploadSession, setUploadSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      try {
        const session = await uploadSessionService.getCurrentSession();
        setUploadSession(session);
      } catch (error) {
        console.error('Failed to load upload session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const handleSessionUpdate = (newSession) => {
    setUploadSession(newSession);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto p-6">
          <div className="h-8 bg-surface-700 rounded w-1/3 mx-auto"></div>
          <div className="h-64 bg-surface-700 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-surface-700 rounded"></div>
            <div className="h-24 bg-surface-700 rounded"></div>
            <div className="h-24 bg-surface-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            DropZone Pro
          </h1>
          <p className="text-surface-300 text-lg max-w-2xl mx-auto">
            Upload and manage your files with professional-grade tools and real-time progress tracking
          </p>
        </motion.div>

        {/* Upload Statistics */}
        {uploadSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UploadStats session={uploadSession} />
          </motion.div>
        )}

        {/* Main Upload Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MainFeature onSessionUpdate={handleSessionUpdate} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;