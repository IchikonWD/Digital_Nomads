import Mongoose from 'mongoose';

const reviewSchema = new Mongoose.Schema(
  {
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
        type: Boolean,
        required: true,
      },
    },
    comment: {
      type: String,
      required: true,
    },
    city: {
      type: Mongoose.Schema.Types.String,
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
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: false,
    },
    internetConnectionRating: {
      type: Number,
      required: false,
    },
    overallSafetyRating: {
      type: Number,
      required: false,
    },
    coworkingSpaceRating: {
      type: Number,
      required: false,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cities = Mongoose.model('Cities', CitiesSchema);

export default Cities;
