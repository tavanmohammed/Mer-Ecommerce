import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/analytics", protectRoute, adminRoute, async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();

    // fix: define endDate first, then compute startDate
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // return points using { name, sales, revenue } to match your chart
    const dailySales = await getDailySalesData(startDate, endDate);
    const dailySalesData = dailySales.map(d => ({
      name: d.date,          // chart expects "name" on the X axis
      sales: d.sales,
      revenue: d.revenue,
    }));

    res.json({ analyticsData, dailySalesData });
  } catch (error) {
    console.error("Error in /analytics route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
