import { model, Schema } from 'mongoose'

export const Question = model('Question', new Schema({
  title: {
    type: String,
    required: true,
  },
  responses: {
    required: true,
    type: [{
      title: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    }],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  }
}))
