import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).send({
      success: true,
      message: "all users",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    res.status(200).send({
      success: true,
      message: "user found",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
