import mongoose, { Document, Schema, Types } from "mongoose";

interface ILink extends Document {
  hash: string;
  userId: Types.ObjectId;
}

const linkSchema = new Schema<ILink>({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const LinkModel = mongoose.model<ILink>("Link", linkSchema);
