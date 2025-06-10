import fileItemsData from '../mockData/fileItems.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FileItemService {
  constructor() {
    this.data = [...fileItemsData];
  }

  async getAll() {
    await delay(300);
    return [...this.data];
  }

  async getById(id) {
    await delay(200);
    const item = this.data.find(file => file.id === id);
    if (!item) {
      throw new Error('File not found');
    }
    return { ...item };
  }

  async create(fileData) {
    await delay(250);
    const newFile = {
      id: Date.now().toString(),
      name: fileData.name,
      size: fileData.size,
      type: fileData.type,
      uploadProgress: fileData.uploadProgress || 0,
      status: fileData.status || 'pending',
      uploadedAt: fileData.uploadedAt || null,
      url: fileData.url || null,
      createdAt: new Date().toISOString()
    };

    this.data.push(newFile);
    return { ...newFile };
  }

  async update(id, updates) {
    await delay(150);
    const index = this.data.findIndex(file => file.id === id);
    if (index === -1) {
      throw new Error('File not found');
    }

    this.data[index] = { ...this.data[index], ...updates };
    return { ...this.data[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.data.findIndex(file => file.id === id);
    if (index === -1) {
      throw new Error('File not found');
    }

    const deletedFile = this.data[index];
    this.data.splice(index, 1);
    return { ...deletedFile };
  }

  async getByStatus(status) {
    await delay(200);
    return this.data.filter(file => file.status === status).map(file => ({ ...file }));
  }

  async updateProgress(id, progress) {
    await delay(100);
    return this.update(id, { uploadProgress: progress });
  }
}

export default new FileItemService();