import { model, Schema } from 'mongoose'

export const Survey = model('Survey', new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Question',
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  }
}))
