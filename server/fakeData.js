import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import cities from './data/cities.js';
import User from './models/userSchema.js';
import Cities from './models/citySchema.js';
import connectDB from './config/mongodb.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Cities.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdCities = await Cities.insertMany(cities);

    console.log(
      colors.green(
        `${createdUsers.length} users and ${createdCities.length} cities created!`
      )
    );
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Cities.deleteMany();
    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
