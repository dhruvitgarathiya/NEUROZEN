// import { use, useState,useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/userProvider";



// export default function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();
//   const { user, setUser , setProfile, profile } = useUser();

//   // Redirect to home if user is already logged in

//   // Validation Schema
//   const validationSchema = Yup.object({
//     name: !isLogin ? Yup.string().required("Name is required") : Yup.string(),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//     confirmPassword: !isLogin ? Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm Password is required') : Yup.string(),
//   });

//   // Handle Form Submission
//   const handleSubmit = async (values) => {
//     const endpoint = isLogin ? "/api/user/login" : "/api/user/signup";
//     const response = await fetch(`http://localhost:8080${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });
  
//     const data = await response.json();
  
//     setUser(data.user);
//     console.log("Response Data:", data);
  
//     if (response.ok) {
//       localStorage.setItem("token", data.token.token);
//       console.log("Token:", data.token.token);
//       const userId = data.user._id;
//       console.log("User ID:", userId);
  
//       try {
//         const profileResponse = await fetch(
//           `http://localhost:8080/api/user-profiles/user/${userId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${data.token.token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
  
//         if (!profileResponse.ok) throw new Error("Failed to fetch profile");
  
//         const profileData = await profileResponse.json();
//         console.log("Profile Data:", profileData);
//         setProfile(profileData);
  
//         // Navigate based on profile data
//         if (profile) {
//           navigate("/home");
//         } else {
//           navigate("/profile");
//         }
//       } catch (error) {
//         console.log("Error fetching user profile:", error);
//         navigate("/profile"); // If there's an error fetching profile, go to profile setup
//       }
//     } else {
//       console.log("Login/Signup failed.");
//       navigate("/profile");
//     }
//   };
  
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4">
//       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700">{isLogin ? "Welcome Back!" : "Join NEUROZEN"}</h1>
//           <p className="text-gray-600 mt-2">{isLogin ? "Your well-being starts here. Let's focus on a better you!" : "Sign up and take a step towards a healthier mind & body."}</p>
//         </div>

//         <Formik
//           initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form className="space-y-4">
//             {!isLogin && (
//               <div>
//                 <label className="block text-gray-700 font-semibold">Name</label>
//                 <Field name="name" type="text" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
//                 <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//             )}

//             <div>
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <Field name="email" type="email" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold">Password</label>
//               <Field name="password" type="password" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {!isLogin && (
//               <div>
//                 <label className="block text-gray-700 font-semibold">Confirm Password</label>
//                 <Field name="confirmPassword" type="password" className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
//                 <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
//             >
//               {isLogin ? "Login" : "Sign Up"}
//             </button>
//           </Form>
//         </Formik>

//         <p className="mt-6 text-center text-gray-700">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-green-600 font-semibold ml-1"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setProfile } = useUser();

  const validationSchema = Yup.object({
    name: !isLogin ? Yup.string().required("Name is required") : Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: !isLogin ? Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required') : Yup.string(),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const endpoint = isLogin ? "/api/user/login" : "/api/user/signup";
    
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login/Signup failed.");

      setUser(data.user);
      localStorage.setItem("token", data.token.token);
      const userId = data.user._id;

      // Fetch Profile
      const profileResponse = await fetch(
        `http://localhost:8080/api/user-profiles/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileResponse.ok) throw new Error("Failed to fetch profile");

      const profileData = await profileResponse.json();
      setProfile(profileData);

      navigate(profileData ? "/home" : "/profile");
    } catch (error) {
      console.log("Error:", error);
      navigate("/profile"); // Navigate to profile setup on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700">
            {isLogin ? "Welcome Back!" : "Join NEUROZEN"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Your well-being starts here. Let's focus on a better you!"
              : "Sign up and take a step towards a healthier mind & body."}
          </p>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
                disabled={loading || isSubmitting}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  loading || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-700 text-white hover:opacity-90"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm2 5.292A7.964 7.964 0 014 12H2c0 2.53.98 4.84 2.708 6.576l1.292-1.284z"></path>
                    </svg>
                    {isLogin ? "Logging in..." : "Signing up..."}
                  </div>
                ) : (
                  isLogin ? "Login" : "Sign Up"
                )}
              </button>
            </Form>
          )}
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
