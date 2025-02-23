import mongoose, { Document, Schema, Types } from "mongoose";

interface IContent extends Document {
  link?: string;
  type: "text" | "image" | "video";
  title: string;
  tag: Types.ObjectId[];
  userId: Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
  link: {
    type: String,
  },
  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tag: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ContentModel = mongoose.model<IContent>("Content", contentSchema);
