import uploadSessionData from '../mockData/uploadSession.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UploadSessionService {
  constructor() {
    this.currentSession = { ...uploadSessionData };
  }

  async getCurrentSession() {
    await delay(200);
    return { ...this.currentSession };
  }

  async updateSession(updates) {
    await delay(150);
    this.currentSession = { ...this.currentSession, ...updates };
    return { ...this.currentSession };
  }

  async resetSession() {
    await delay(200);
    this.currentSession = {
      totalFiles: 0,
      completedFiles: 0,
      totalSize: 0,
      uploadedSize: 0,
      startTime: new Date().toISOString()
    };
    return { ...this.currentSession };
  }

  async getUploadStats() {
    await delay(200);
    const session = { ...this.currentSession };
    const completionRate = session.totalFiles > 0 ? (session.completedFiles / session.totalFiles) * 100 : 0;
    const uploadRate = session.totalSize > 0 ? (session.uploadedSize / session.totalSize) * 100 : 0;
    
    return {
      ...session,
      completionRate,
      uploadRate
    };
  }
}

export default new UploadSessionService();