import mongoose from "mongoose";
import {
  register,
  login,
  getProfile,
  updateProfile,
  findNearbyPharmacies,
} from "../controller/authController.js"; // Note: .js extension is required in ESM
import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";
import Customer from "../models/Customer.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";



jest.mock("../models/User");
jest.mock("../models/Pharmacy");
jest.mock("../models/Customer");

describe("User Controller", () => {
  beforeAll(() => {
    // Mock mongoose methods like connect, save, etc.
    mongoose.connect = jest.fn();
  });

  afterAll(() => {
    // Restore all mocks (Jest automatically handles this but you can also manually clear mocks)
    jest.restoreAllMocks();
  });

  describe("createUser", () => {
    it("should create a new customer", async () => {
      const mockUser = {
        name: "John Doe",
        email: "john@example.com",
        role: "customer",
      };
      User.findOne.mockResolvedValue(null); // No existing user with this email

      const newUser = await register(mockUser);

      expect(newUser).toHaveProperty("name", "John Doe");
      expect(newUser).toHaveProperty("email", "john@example.com");
      expect(newUser).toHaveProperty("role", "customer");
    });

    it("should throw an error if the user already exists", async () => {
      User.findOne.mockResolvedValue(true); // User already exists with the email

      try {
        await register({ email: "john@example.com" });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("User already exists");
      }
    });
  });

  describe("loginUser", () => {
    it("should login the user and return access token", async () => {
      const mockUser = {
        _id: "123",
        email: "john@example.com",
        role: "customer",
        comparePassword: jest.fn().mockResolvedValue(true),
        toObject: jest.fn().mockReturnValue({
          _id: "123",
          email: "john@example.com",
          role: "customer",
        }),
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign = jest.fn().mockReturnValue("mock-access-token");

      const res = { cookie: jest.fn() };

      const response = await login(
        { email: "john@example.com", password: "password123" },
        res
      );

      expect(response).toHaveProperty("user");
      expect(response).toHaveProperty("access_Token");
      expect(res.cookie).toHaveBeenCalledWith(
        "refreshToken",
        expect.any(String),
        expect.any(Object)
      );
    });

    it("should throw an error for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null); // User not found

      try {
        await login({
          email: "invalid@example.com",
          password: "wrongpassword",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Invalid credentials");
      }
    });
  });

  describe("getUserProfile", () => {
    it("should return the user's profile with orders and reviews for customer", async () => {
      const mockUser = { _id: "123", role: "customer" };

      User.findById.mockResolvedValue(mockUser);
      // Mock orders and reviews retrieval
      Order.find = jest.fn().mockResolvedValue([]);
      Review.find = jest.fn().mockResolvedValue([]);

      const profile = await getProfile("123");

      expect(profile).toHaveProperty("orders");
      expect(profile).toHaveProperty("reviews");
    });
  });

  describe("updateUser", () => {
    it("should update user data", async () => {
      const mockUser = { _id: "123", name: "John Doe" };

      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      const updatedUser = await updateProfile("123", { name: "Jane Doe" });

      expect(updatedUser).toHaveProperty("name", "Jane Doe");
    });

    it("should throw an error if user not found", async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      try {
        await updateProfile("123", { name: "Jane Doe" });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("User not found");
      }
    });
  });

  describe("getNearbyPharmacies", () => {
    it("should return pharmacies within a certain distance", async () => {
      const mockPharmacies = [{ name: "Pharmacy A" }, { name: "Pharmacy B" }];
      Pharmacy.find.mockResolvedValue(mockPharmacies);

      const pharmacies = await findNearbyPharmacies({
        latitude: 40.7128,
        longitude: -74.006,
      });

      expect(pharmacies).toHaveLength(2);
      expect(pharmacies[0]).toHaveProperty("name", "Pharmacy A");
    });

    it("should throw an error if latitude or longitude is missing", async () => {
      try {
        await findNearbyPharmacies({ latitude: 40.7128 });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe("Latitude and longitude are required");
      }
    });
  });
});
