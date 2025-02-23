import mongoose, { Document } from "mongoose";

interface Itag extends Document {
  title: string;
}

const tagSchema = new mongoose.Schema<Itag>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export const TagModel = mongoose.model<Itag>("Tag", tagSchema);
