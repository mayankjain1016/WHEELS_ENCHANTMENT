import mongoose, { Document, Schema } from 'mongoose';
import { SettingType, SettingCategory } from '../types';

export interface ISetting extends Document {
  key: string;
  value: any;
  type: SettingType;
  category: SettingCategory;
  description: string;
  updatedAt: Date;
}

const settingSchema = new Schema<ISetting>(
  {
    key: {
      type: String,
      required: [true, 'Setting key is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    value: {
      type: Schema.Types.Mixed,
      required: [true, 'Setting value is required']
    },
    type: {
      type: String,
      enum: {
        values: ['text', 'number', 'boolean', 'json'],
        message: '{VALUE} is not a valid type'
      },
      default: 'text'
    },
    category: {
      type: String,
      enum: {
        values: ['general', 'contact', 'social', 'seo'],
        message: '{VALUE} is not a valid category'
      },
      default: 'general'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    }
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Indexes
settingSchema.index({ key: 1 }, { unique: true });
settingSchema.index({ category: 1 });

const Setting = mongoose.model<ISetting>('Setting', settingSchema);

export default Setting;
