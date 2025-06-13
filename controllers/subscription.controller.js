import Subscription from "./../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send({ status: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    console.log(req);
    if (req.params.id !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    const subscriptions = await Subscription.find({ userId: req.params.id });

    res.status(200).json({ status: true, subscriptions });
  } catch (error) {
    next(error);
  }
};
