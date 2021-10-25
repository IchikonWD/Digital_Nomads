import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    ocupation: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    selectedCountry: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
    },
    cluster: {
      type: Number,
      required: false,
    },
    interests: {
      burguers: {
        type: Boolean,
        required: false,
      },
      mediterranean: {
        type: Boolean,
        required: false,
      },
      indian: {
        type: Boolean,
        required: false,
      },
      sushi: {
        type: Boolean,
        required: false,
      },
      italian: {
        type: Boolean,
        required: false,
      },
      chinese: {
        type: Boolean,
        required: false,
      },
      drinks: {
        type: Boolean,
        required: false,
      },
      coffee: {
        type: Boolean,
        required: false,
      },
      sunsets: {
        type: Boolean,
        required: false,
      },
      parties: {
        type: Boolean,
        required: false,
      },
      surf: {
        type: Boolean,
        required: false,
      },
      fitness: {
        type: Boolean,
        required: false,
      },
      volley: {
        type: Boolean,
        required: false,
      },
      paddle: {
        type: Boolean,
        required: false,
      },
      climbing: {
        type: Boolean,
        required: false,
      },
      running: {
        type: Boolean,
        required: false,
      },
      football: {
        type: Boolean,
        required: false,
      },
      trecking: {
        type: Boolean,
        required: false,
      },
      museums: {
        type: Boolean,
        required: false,
      },
      bookstores: {
        type: Boolean,
        required: false,
      },
      theaters: {
        type: Boolean,
        required: false,
      },
      movies: {
        type: Boolean,
        required: false,
      },
      guidedVisits: {
        type: Boolean,
        required: false,
      },
      concerts: {
        type: Boolean,
        required: false,
      },
      parks: {
        type: Boolean,
        required: false,
      },
      ruralTourism: {
        type: Boolean,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = Mongoose.model('User', userSchema);

export default User;
