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
