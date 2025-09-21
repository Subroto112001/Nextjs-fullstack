import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENTION = {
  width: 1080,
  height: 1920,
} as const;

export interface Ivideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  transformation: {
    height: number;
    width: number;
    quality?: number;
  };
}

const videoSchema = new Schema<Ivideo>(
  { 
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENTION.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENTION.width,
      },
      quality: {
        type: Number,
          min: 1,
        max: 100
      }
  }},
  {
    timestamps: true,
  }
);


const Video = models?.Video || model<Ivideo>("Video", videoSchema);
export default Video
