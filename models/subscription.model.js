import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP"], // Add more currencies as needed
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: ["sport", "entertainment", "education", "health", "other"],
      required: [true, "Category is required"],
    },
    paymentType: {
      type: String,
      required: [true, "Payment type is required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Index for faster lookups
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (v) {
          // Ensure start date is not in the future
          return v <= Date.now();
        },
        message: (props) =>
          `Start date ${props.value} cannot be in the future!`,
      },
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (v) {
          // Ensure end date is after start date
          return v > this.startDate;
        },
        message: (props) =>
          `End date ${props.value} must be after the start date!`,
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

subscriptionSchema.pre("save", function (next) {
  if (!this.endDate) {
    const renewalPeriods = {
      weekly: 7,
      monthly: 28,
      yearly: 365,
    };
    // Set renewal date to end date if not provided
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(
      this.endDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.endDate < new Date()) {
    this.status = "inactive"; // Automatically set status to inactive if end date is in the past
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
