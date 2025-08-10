import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsData = async () => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();

  const salesAgg = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: 1 }, totalRevenue: { $sum: "$totalAmount" } } }
  ]);

  const { totalSales = 0, totalRevenue = 0 } = salesAgg[0] || {};
  return { users, products, totalSales, totalRevenue };
};

export const getDailySalesData = async (startDate, endDate) => {
  const daily = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const dates = getDatesInRange(startDate, endDate);
  return dates.map(date => {
    const found = daily.find(d => d._id === date);
    return { date, sales: found?.sales || 0, revenue: found?.revenue || 0 };
  });
};

function getDatesInRange(startDate, endDate) {
  const out = [];
  const cur = new Date(startDate);
  while (cur <= endDate) {
    out.push(cur.toISOString().split("T")[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}
