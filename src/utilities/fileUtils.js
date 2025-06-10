export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type.includes('pdf')) return 'FileText';
  if (type.includes('word') || type.includes('document')) return 'FileText';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'Table';
  if (type.includes('zip') || type.includes('rar')) return 'Archive';
  return 'File';
};

export const getFileTypeColor = (type) => {
  if (type.startsWith('image/')) return 'from-blue-500 to-blue-600';
  if (type.includes('pdf')) return 'from-red-500 to-red-600';
  if (type.includes('word') || type.includes('document')) return 'from-blue-500 to-blue-700';
  if (type.includes('excel') || type.includes('spreadsheet')) return 'from-green-500 to-green-600';
  if (type.includes('zip') || type.includes('rar')) return 'from-purple-500 to-purple-600';
  return 'from-gray-500 to-gray-600';
};