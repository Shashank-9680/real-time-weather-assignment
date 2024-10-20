import Summary from "../models/Summary.js";

export const getDailySummary = async (req, res) => {
  try {
    const { city } = req.params;
    const { date } = req.query;

    const query = { city };
    if (date) {
      const queryDate = new Date(date);
      queryDate.setHours(0, 0, 0, 0);
      query.date = queryDate;
    }

    const summary = await Summary.find(query).sort({ date: -1 }).limit(7);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
