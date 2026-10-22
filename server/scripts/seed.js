import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

dotenv.config({ quiet: true });

const seed = async () => {
  await connectDB();

  const accounts = [
    {
      firstname: "Admin",
      lastname: "User",
      email: "admin@healthbooker.com",
      password: "admin123",
      isAdmin: true,
    },
    {
      firstname: "David",
      lastname: "Doctor",
      email: "doctor@healthbooker.com",
      password: "doctor123",
      isDoctor: true,
      status: "accepted",
      mobile: 1234567890,
    },
    {
      firstname: "Peter",
      lastname: "Patient",
      email: "user@healthbooker.com",
      password: "user12345",
    },
  ];

  for (const account of accounts) {
    const exists = await User.findOne({ email: account.email });
    if (exists) {
      console.log(`Skip existing: ${account.email}`);
      continue;
    }
    const hashedPass = await bcrypt.hash(account.password, 10);
    const user = await User.create({ ...account, password: hashedPass });
    console.log(`Created: ${account.email}`);

    if (account.isDoctor) {
      await Doctor.create({
        userId: user._id,
        specialization: "Cardiologist",
        experience: 8,
        fees: 100,
        isDoctor: true,
      });
      console.log("  -> doctor profile created");
    }
  }

  await mongoose.disconnect();
  console.log("Seed done");
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
