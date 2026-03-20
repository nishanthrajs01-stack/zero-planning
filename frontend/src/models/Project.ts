import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  userId: string;
  name: string;
  description: string;
  type: string;
  client: boolean;
  status: "ideation" | "spec" | "architecture" | "building" | "deployed" | "paused";
  techStackPreference: string[];
  estimatedTimeline: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    client: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["ideation", "spec", "architecture", "building", "deployed", "paused"],
      default: "ideation",
    },
    techStackPreference: [{ type: String }],
    estimatedTimeline: { type: String },
    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
