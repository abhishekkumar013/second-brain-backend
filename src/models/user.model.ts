import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

interface IUser extends Document {
  username: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateJwtToken(): string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = function (): string {
  return Jwt.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
};

export const UserModel = mongoose.model<IUser>("User", userSchema);
