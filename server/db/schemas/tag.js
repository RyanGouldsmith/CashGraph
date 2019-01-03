import Mongoose from 'mongoose';

const TagName = ['HOLIDAY', 'FOOD', 'TRAVEL', 'ENTERTAINMENT'];
const TagColour = ['GREEN', 'RED', 'BLUE'];

export const TagSchema = new Mongoose.Schema({
  name: {
    type: String,
    enum: TagName,
  },
  colour: {
    type: String,
    enum: TagColour,
  },
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
