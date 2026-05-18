import mongoose, { Document, Schema } from 'mongoose';

export interface ILocation extends Document {
  area: string;
  places: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    area: {
      type: String,
      required: [true, 'Area name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Area name cannot exceed 100 characters']
    },
    places: [
      {
        type: String,
        trim: true
      }
    ],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes
locationSchema.index({ area: 1 }, { unique: true });
locationSchema.index({ displayOrder: 1 });
locationSchema.index({ isActive: 1 });

const Location = mongoose.model<ILocation>('Location', locationSchema);

export default Location;
