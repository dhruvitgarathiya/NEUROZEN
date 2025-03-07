import { use, useState,useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";



export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user, setUser , setProfile, profile } = useUser();

  // Redirect to home if user is already logged in

  useEffect(() => {
  if (user !== null) {
    navigate("/home");
  }
}, [user, navigate]);

  // Validation Schema
  const validationSchema = Yup.object({
    name: !isLogin ? Yup.string().required("Name is required") : Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: !isLogin ? Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required') : Yup.string(),
  });

  // Handle Form Submission
  const handleSubmit = async (values) => {
    const endpoint = isLogin ? "/api/user/login" : "/api/user/signup";
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Include confirmPassword in the request body
    });

    const data = await response.json();

    setUser(data.user);

    console.log("Response Data:", data);

    if (response.ok) {
      localStorage.setItem("token", data.token.token);
      console.log("Token:", data.token.token);
      const userId = data.user._id;
      console.log("User ID:", userId);
      const profileResponse = await fetch(`http://localhost:8080/api/user-profiles/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${data.token.token}`,
          "Content-Type": "application/json",
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfile(profileData);

        if (profileData) {
          navigate("/home");
        } else {
          navigate("/profile");
        }
      } else {
        navigate("/profile");
      }

    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700">{isLogin ? "Welcome Back!" : "Join NEUROZEN"}</h1>
          <p className="text-gray-600 mt-2">{isLogin ? "Your well-being starts here. Let's focus on a better you!" : "Sign up and take a step towards a healthier mind & body."}</p>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold">Name</label>
                <Field name="name" type="text" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-semibold">Email</label>
              <Field name="email" type="email" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold">Password</label>
              <Field name="password" type="password" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700 font-semibold">Confirm Password</label>
                <Field name="confirmPassword" type="password" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </Form>
        </Formik>

        <p className="mt-6 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-semibold ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}