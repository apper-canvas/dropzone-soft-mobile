import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import FileUploadCard from '@/components/molecules/FileUploadCard';
import UploadedFileCard from '@/components/molecules/UploadedFileCard';
import DropZoneDisplay from '@/components/molecules/DropZoneDisplay';

import { fileItemService, uploadSessionService } from '@/services';

const ACCEPTED_FILE_TYPES = {
  'image/jpeg': '.jpg,.jpeg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/zip': '.zip',
  'application/x-rar-compressed': '.rar'
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const FileUploadSection = ({ onSessionUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const validateFile = (file) => {
    if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
      return `File type "${file.type}" is not supported. Please upload: images, PDFs, documents, or archives.`;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum limit of 50MB.`;
    }
    
    return null;
  };

  const createRippleEffect = (event) => {
    const rect = dropZoneRef.current.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = 60;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('absolute', 'rounded-full', 'bg-white/30', 'animate-ripple', 'pointer-events-none');

    dropZoneRef.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const simulateUpload = async (file) => {
    const fileItem = await fileItemService.create({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading'
    });

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += Math.random() * 15 + 5) {
      const currentProgress = Math.min(progress, 100);
      const updatedFile = await fileItemService.update(fileItem.id, {
        uploadProgress: currentProgress,
        status: currentProgress === 100 ? 'completed' : 'uploading'
      });

      setUploadingFiles(prev => 
        prev.map(f => f.id === fileItem.id ? updatedFile : f)
      );

      if (currentProgress < 100) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
      }
    }

    // Move to completed files
    const completedFile = await fileItemService.update(fileItem.id, {
      status: 'completed',
      uploadedAt: new Date().toISOString(),
      url: `https://example.com/files/${fileItem.id}`
    });

    setUploadingFiles(prev => prev.filter(f => f.id !== fileItem.id));
    setUploadedFiles(prev => [completedFile, ...prev]);

    // Update session
    const currentSession = await uploadSessionService.getCurrentSession();
    const updatedSession = await uploadSessionService.updateSession({
      completedFiles: currentSession.completedFiles + 1,
      uploadedSize: currentSession.uploadedSize + file.size
    });
    onSessionUpdate(updatedSession);

    toast.success(`${file.name} uploaded successfully!`);
  };

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    // Validate files
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    // Show validation errors
    errors.forEach(error => {
      toast.error(error);
    });

    if (validFiles.length === 0) return;

    // Create initial file items
    const newFileItems = await Promise.all(
      validFiles.map(file => fileItemService.create({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: 'uploading'
      }))
    );

    setUploadingFiles(prev => [...prev, ...newFileItems]);

    // Update session
    const currentSession = await uploadSessionService.getCurrentSession();
    const updatedSession = await uploadSessionService.updateSession({
      totalFiles: currentSession.totalFiles + validFiles.length,
      totalSize: currentSession.totalSize + validFiles.reduce((sum, file) => sum + file.size, 0)
    });
    onSessionUpdate(updatedSession);

    // Start uploads
    validFiles.forEach((file, index) => {
      setTimeout(() => simulateUpload(file), index * 200);
    });

    toast.success(`Started uploading ${validFiles.length} file(s)`);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragging(false);
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);
    
    createRippleEffect(e);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemoveFile = async (fileId) => {
    try {
      await fileItemService.delete(fileId);
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      toast.success("File removed successfully");
    } catch (error) {
      toast.error("Failed to remove file");
    }
  };

  const handleCancelUpload = async (fileId) => {
    try {
      await fileItemService.delete(fileId);
      setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
      toast.success("Upload cancelled");
    } catch (error) {
      toast.error("Failed to cancel upload");
    }
  };

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      {/* Drop Zone */}
      <motion.div
        ref={dropZoneRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative overflow-hidden cursor-pointer rounded-2xl p-12 text-center transition-all duration-300
          glass border-2 border-dashed hover:scale-[1.02]
          ${isDragging 
            ? 'border-primary animate-pulse-border bg-gradient-to-br from-primary/10 to-secondary/10' 
            : 'border-surface-600 hover:border-secondary/50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept={Object.values(ACCEPTED_FILE_TYPES).join(',')}
          onChange={handleFileSelect}
        />

        <DropZoneDisplay isDragging={isDragging} acceptedFileTypes={ACCEPTED_FILE_TYPES} />
      </motion.div>

      {/* Active Uploads */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
              <ApperIcon name="Upload" className="w-5 h-5 text-primary" />
              Uploading Files
            </h3>
            <div className="space-y-3">
              {uploadingFiles.map(file => (
                <FileUploadCard
                  key={file.id}
                  file={file}
                  onCancel={() => handleCancelUpload(file.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-heading font-semibold text-white flex items-center gap-2">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-success" />
              Completed Files
            </h3>
            <div className="space-y-3 max-w-full overflow-hidden">
              {uploadedFiles.map((file, index) => (
                <UploadedFileCard
                  key={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {uploadingFiles.length === 0 && uploadedFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ApperIcon name="FileText" className="w-16 h-16 text-surface-500 mx-auto mb-4" />
          <p className="text-surface-400">
            No files uploaded yet. Start by dropping some files above!
          </p>
        </motion.div>
      )}
    </div>
  );
};

FileUploadSection.propTypes = {
  onSessionUpdate: PropTypes.func.isRequired,
};

export default FileUploadSection;