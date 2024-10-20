export const validateCity = (city) => {
  const validCities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  if (!validCities.includes(city)) {
    throw new AppError(
      `Invalid city: ${city}. Valid cities are: ${validCities.join(", ")}`,
      400
    );
  }
};

export const validateDateRange = (startDate, endDate) => {
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    throw new AppError("Start date cannot be after end date", 400);
  }
};
