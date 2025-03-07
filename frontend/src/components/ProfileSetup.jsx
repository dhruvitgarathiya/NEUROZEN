import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Brain, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    age: Yup.number().required("Age is required").min(12, "Must be at least 12"),
    gender: Yup.string().required("Gender is required"),
    healthGoals: Yup.array().min(1, "Select at least one health goal"),
    activityLevel: Yup.string().required("Select activity level"),
    stressLevel: Yup.string().required("Select stress level"),
    dietPreference: Yup.string().required("Diet preference is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  });

  const healthGoals = [
    { value: "Weight Loss", label: "Lose Weight", icon: Dumbbell },
    { value: "Muscle Gain", label: "Gain Muscle", icon: HeartPulse },
    { value: "Mental Health", label: "Improve Mental Health", icon: Brain },
    { value: "General Fitness", label: "Boost Energy", icon: Zap },
  ];

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.userId;
    
  
    if (!userId) {
      console.log(decodedToken);
      console.error("User ID not found!");
      return;
    }
  
    const updatedValues = {
      ...values,
      userId, // ✅ Send userId directly
    };
  
    console.log("Final Payload:", updatedValues);
  
    const response = await fetch("http://localhost:8080/api/user-profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedValues),
    });
  
    const data = await response.json();
    console.log("Response Data:", data);
  
    if (response.ok) {
      alert("Profile setup complete! 🎉");
      navigate("/home");
    } else {
      alert(data.message || "Something went wrong");
    }
  };
  ;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-green-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-700">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Let's personalize your wellness journey! 🌱</p>
        </div>

        <Formik
          initialValues={{
            age: "",
            gender: "",
            healthGoals: [],
            activityLevel: "",
            stressLevel: "",
            dietPreference: "",
            state: "",
            city: "",         
            country: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold">Age</label>
                  <Field name="age" type="number" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Gender</label>
                  <Field as="select" name="gender" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="block text-gray-700 font-semibold">Your Health Goals</label>
                <div className="grid grid-cols-2 gap-4">
                  {healthGoals.map((goal) => (
                    <Field name="healthGoals" key={goal.value}>
                      {({ field, form }) => {
                        const selectedGoals = field.value || []; // Ensure it's an array
                        const isChecked = selectedGoals.includes(goal.value);

                        return (
                          <div
                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                              isChecked ? "bg-green-200 border-green-500" : "border-green-300 hover:bg-green-100"
                            }`}
                            onClick={() => {
                              const newHealthGoals = isChecked
                                ? selectedGoals.filter((item) => item !== goal.value) // Remove if already selected
                                : [...selectedGoals, goal.value]; // Add if not selected

                              form.setFieldValue("healthGoals", newHealthGoals);
                            }}
                          >
                            {goal.icon && <goal.icon className={`w-6 h-6 ${isChecked ? "text-green-700" : "text-green-500"}`} />}
                            <span className="text-gray-700 font-medium">{goal.label}</span>
                          </div>
                        );
                      }}
                    </Field>
                  ))}
                </div>
                <ErrorMessage name="healthGoals" component="div" className="text-red-500 text-sm mt-1" />
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold">Height</label>
                  <Field name="height" type="number" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="height" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Weight</label>
                  <Field name="weight" type="number" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">Activity Level</label>
                  <Field as="select" name="activityLevel" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </Field>
                  <ErrorMessage name="activityLevel" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">Average Stress Experience</label>
                  <Field as="select" name="stressLevel" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">Select</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Severe">Severe</option>
                  </Field>
                  <ErrorMessage name="stressLevel" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </>
            )}

            {step === 4 && (
              <div className="flex items-center justify-center flex-col">
                <div>
                  <label className="block text-gray-700 font-semibold">Diet Preference</label>
                  <Field as="select" name="dietPreference" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">Select</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non vegetarian">Non Vegetarian</option>
                  </Field>
                  <ErrorMessage name="dietPreference" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">State</label>
                  <Field name="state" type="text" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">City</label>
                  <Field name="city" type="text" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold">Country</label>
                  <Field name="country" type="text" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            )}


            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button type="button" className="px-5 py-2 text-white bg-gray-400 rounded-lg font-semibold flex items-center" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  className="px-5 py-2 text-white bg-green-500 rounded-lg font-semibold flex items-center"
                  onClick={() => setStep(step + 1)}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button type="submit" className="px-5 py-2 text-white bg-green-700 rounded-lg font-semibold flex items-center">
                  <Check className="w-4 h-4 mr-1" /> Submit
                </button>
              )}

            </div>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
}