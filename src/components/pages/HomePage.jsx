import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { uploadSessionService } from '@/services';
import PageHeading from '@/components/molecules/PageHeading';
import LoaderSkeleton from '@/components/molecules/LoaderSkeleton';
import UploadStatisticsSection from '@/components/organisms/UploadStatisticsSection';
import FileUploadSection from '@/components/organisms/FileUploadSection';

const HomePage = () => {
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
    return <LoaderSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <PageHeading
          title="DropZone Pro"
          subtitle="Upload and manage your files with professional-grade tools and real-time progress tracking"
        />

        {uploadSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <UploadStatisticsSection session={uploadSession} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FileUploadSection onSessionUpdate={handleSessionUpdate} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;