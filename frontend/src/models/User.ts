import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  googleId?: string;
  avatar?: string;
  createdAt: Date;
  preferences: {
    defaultTechStack: string[];
    theme: "light" | "dark";
    defaultProjectType: string;
  };
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
    preferences: {
      defaultTechStack: [{ type: String }],
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      defaultProjectType: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
