import mongoose, { Document, Schema, Types } from 'mongoose';
import { LeadStatus, LeadSource, ExperienceLevel } from '../types';

interface Note {
  text: string;
  addedBy: Types.ObjectId;
  addedAt: Date;
}

export interface ILead extends Document {
  studentName: string;
  dateOfBirth: Date;
  school: string;
  fatherName: string;
  fatherMobile: string;
  motherName: string;
  motherMobile: string;
  address: string;
  email: string;
  photo?: string;
  aadharCard?: string;
  age?: number;
  location: string;
  preferredLocation: string;
  experienceLevel: ExperienceLevel;
  message: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo?: Types.ObjectId;
  notes: Note[];
  followUpDate?: Date;
  submittedAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    school: {
      type: String,
      required: [true, 'School name is required'],
      trim: true,
      maxlength: [200, 'School name cannot exceed 200 characters']
    },
    fatherName: {
      type: String,
      required: [true, 'Father name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    fatherMobile: {
      type: String,
      required: [true, 'Father mobile number is required'],
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    motherName: {
      type: String,
      required: [true, 'Mother name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    motherMobile: {
      type: String,
      required: [true, 'Mother mobile number is required'],
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      maxlength: [500, 'Address cannot exceed 500 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    photo: {
      type: String,
      trim: true
    },
    aadharCard: {
      type: String,
      trim: true
    },
    age: {
      type: Number,
      min: [3, 'Age must be at least 3'],
      max: [100, 'Age cannot exceed 100']
    },
    location: {
      type: String,
      trim: true
    },
    preferredLocation: {
      type: String,
      trim: true
    },
    experienceLevel: {
      type: String,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: '{VALUE} is not a valid experience level'
      },
      default: 'Beginner'
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'Contacted', 'Enrolled', 'Rejected'],
        message: '{VALUE} is not a valid status'
      },
      default: 'New'
    },
    source: {
      type: String,
      enum: {
        values: ['Website', 'Referral', 'School'],
        message: '{VALUE} is not a valid source'
      },
      default: 'Website'
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: [
      {
        text: {
          type: String,
          required: true,
          trim: true
        },
        addedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    followUpDate: {
      type: Date
    },
    submittedAt: {
      type: Date,
      default: Date.now
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
leadSchema.index({ email: 1 });
leadSchema.index({ fatherMobile: 1 });
leadSchema.index({ motherMobile: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ submittedAt: -1 });
leadSchema.index({ followUpDate: 1 });
leadSchema.index({ studentName: 'text', fatherName: 'text', motherName: 'text' });

const Lead = mongoose.model<ILead>('Lead', leadSchema);

export default Lead;
