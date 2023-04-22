import { model, Schema } from 'mongoose'

export const UserSurvey = model('UserSurvey', new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true
  },
  totalAnswers: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  questions: [{
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
    userResponse: {
      type: Number,
      required: true,
    }
  }],
  percent: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}))
