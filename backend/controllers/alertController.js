import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {
    const { city } = req.params;
    const { acknowledged } = req.query;

    const query = { city };
    if (acknowledged !== undefined) {
      query.acknowledged = acknowledged === "true";
    }

    const alerts = await Alert.find(query).sort({ timestamp: -1 }).limit(50);

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acknowledgeAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const alert = await Alert.findByIdAndUpdate(
      id,
      { acknowledged: true },
      { new: true }
    );
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
