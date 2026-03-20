import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Web App', 'Mobile App', 'Backend API', 'Full-Stack', 'Automation', 'Platform'] },
  techStackPreference: [String],
  estimatedTimeline: String,
  priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'] },
  status: { type: String, enum: ['ideation', 'spec', 'architecture', 'building', 'deployed', 'paused'], default: 'ideation' },
}, { timestamps: true });

projectSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('Project', projectSchema);
