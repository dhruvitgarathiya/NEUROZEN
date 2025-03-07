const { google } = require("googleapis");
const { oAuth2Client } = require("../config/google.config");

const getFitnessData = async (req, res) => {
  console.log(req);

  try {
    const fitness = google.fitness({
      version: "v1",
      auth: oAuth2Client,
    });

    if (!req.body.userProfileData) {
      return res.status(400).json({
        success: false,
        message: "User profile data not found. Please authenticate first."
      });
    }

    const userName = req.body.userProfileData.displayName;
    const profilePhoto = req.body.userProfileData.profilePhotoUrl;
    const userId = req.body.userProfileData.userID;

    const sevenDaysInMillis = 14 * 24 * 60 * 60 * 1000;
    const startTimeMillis = Date.now() - sevenDaysInMillis;
    const endTimeMillis = Date.now() + 24 * 60 * 60 * 1000;

    const response = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [
          { dataTypeName: "com.google.step_count.delta" },
          { dataTypeName: "com.google.blood_glucose" },
          { dataTypeName: "com.google.blood_pressure" },
          { dataTypeName: "com.google.heart_rate.bpm" },
          { dataTypeName: "com.google.weight" },
          { dataTypeName: "com.google.height" },
          { dataTypeName: "com.google.sleep.segment" },
          { dataTypeName: "com.google.body.fat.percentage" },
          { dataTypeName: "com.google.menstruation" },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis,
        endTimeMillis,
      },
    });

    const formattedData = formatFitnessData(response.data.bucket);

    console.log("Fitness data fetched successfully!");
    res.status(200).json({
      success: true,
      data: {
        userName,
        profilePhoto,
        userId,
        fitnessData: formattedData
      }
    });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch fitness data",
      error: error.message
    });
  }
};

const formatFitnessData = (fitnessData) => {
  const formattedData = [];

  fitnessData.forEach((data) => {
    const date = new Date(parseInt(data.startTimeMillis));
    const formattedDate = date.toDateString();

    const formattedEntry = {
      date: formattedDate,
      step_count: 0,
      glucose_level: 0,
      blood_pressure: [],
      heart_rate: 0,
      weight: 0,
      height_in_cms: 0,
      sleep_hours: 0,
      body_fat_in_percent: 0,
      menstrual_cycle_start: "",
    };

    data.dataset.forEach((mydataset) => {
      const point = mydataset.point;
      if (point && point.length > 0) {
        const value = point[0].value;
        processDataPoint(mydataset.dataSourceId, value, mydataset.point[0], formattedEntry);
      }
    });

    formattedData.push(formattedEntry);
  });

  return formattedData;
};

const processDataPoint = (dataSourceId, value, point, formattedEntry) => {
  switch (dataSourceId) {
    case "derived:com.google.step_count.delta:com.google.android.gms:aggregated":
      formattedEntry.step_count = value[0]?.intVal || 0;
      break;
    case "derived:com.google.blood_glucose.summary:com.google.android.gms:aggregated":
      formattedEntry.glucose_level = processGlucoseLevel(point);
      break;
    case "derived:com.google.blood_pressure.summary:com.google.android.gms:aggregated":
      formattedEntry.blood_pressure = processBloodPressure(point);
      break;
    case "derived:com.google.heart_rate.summary:com.google.android.gms:aggregated":
      formattedEntry.heart_rate = processHeartRate(point);
      break;
    case "derived:com.google.weight.summary:com.google.android.gms:aggregated":
      formattedEntry.weight = value[0]?.fpVal || 0;
      break;
    case "derived:com.google.height.summary:com.google.android.gms:aggregated":
      formattedEntry.height_in_cms = value[0]?.fpVal * 100 || 0;
      break;
    case "derived:com.google.sleep.segment:com.google.android.gms:merged":
      formattedEntry.sleep_hours = point?.value || 0;
      break;
    case "derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated":
      formattedEntry.body_fat_in_percent = processBodyFat(point);
      break;
    case "derived:com.google.menstruation:com.google.android.gms:aggregated":
      formattedEntry.menstrual_cycle_start = point?.value[0]?.intVal || 0;
      break;
  }
};

const processGlucoseLevel = (point) => {
  let glucoseLevel = 0;
  if (point?.value?.length > 0) {
    point.value.forEach((data) => {
      if (data.fpVal) {
        glucoseLevel = data.fpVal * 10;
      }
    });
  }
  return glucoseLevel;
};

const processBloodPressure = (point) => {
  let finalData = [0, 0];
  if (point?.value?.length > 0) {
    point.value.forEach((data) => {
      if (data.fpVal) {
        if (data.fpVal > 100) {
          finalData[0] = data.fpVal;
        } else if (data.fpVal < 100) {
          finalData[1] = data.fpVal;
        }
      }
    });
  }
  return finalData;
};

const processHeartRate = (point) => {
  let heartData = 0;
  if (point?.value?.length > 0) {
    point.value.forEach((data) => {
      if (data.fpVal) {
        heartData = data.fpVal;
      }
    });
  }
  return heartData;
};

const processBodyFat = (point) => {
  let bodyFat = 0;
  if (point?.value?.length > 0) {
    bodyFat = point.value[0].fpVal;
  }
  return bodyFat;
};

module.exports = {
  getFitnessData
};