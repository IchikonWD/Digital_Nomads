import Mongoose from 'mongoose';

const CitiesSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ratings: {
      internetConnection: {
        type: Number,
        required: true,
      },
      overallSafety: {
        type: Number,
        required: true,
      },
      coworkingSpace: {
        type: Number,
        required: true,
      },
    },
    review: {
      type: String,
      required: true,
    },
    city: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Cities',
      required: true,
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cities = Mongoose.model('Cities', CitiesSchema);
const Review = Mongoose.model('Review', ReviewSchema);

export { Cities, Review };
