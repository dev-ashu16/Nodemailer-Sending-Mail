// import axios from "axios";
// import { useState } from 'react';
// export default function EmailForm() {
//   const [to, setTo] = useState("");  
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       console.log("submitting from with:", {from: "taxiiodishaa@gmail.com", to , subject, message});
//       try {
//         await axios.post("http://localhost:3030/api/send", {
//           from: "taxiiodishaa@gmail.com", 
//           to,
//           subject,
//           message
//         });
//         alert("Email sent!");
//       } catch(err) {
//         alert(err);
//       }
//     };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="email"
//         placeholder="To"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}  
//       />
//       <input
//         type="text"
//         placeholder="Subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}  
//       />
//       <textarea 
//         rows="3"
//         placeholder="Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}  
//       ></textarea>
//       <button type="submit">Send Email</button>
//     </form>
//   )
// }

import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function EmailForm() {
  const formik = useFormik({
    initialValues: {
      to: "",
      subject: "",
      message: ""
    },
    validationSchema: Yup.object({
      to: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      subject: Yup.string()
        .max(100, "Subject must be 100 characters or less")
        .required("Subject is required"),
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required")
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await axios.post("http://localhost:3030/api/send", {
          from: "taxiiodishaa@gmail.com", 
          to: values.to,
          subject: values.subject,
          message: values.message
        });
        alert("Email sent successfully!");
      } catch (err) {
        setFieldError("to", "Failed to send email. Please check the email address and try again.");
      }
      setSubmitting(false);
    }
  });

  return (
    <form 
      onSubmit={formik.handleSubmit} 
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Send an Email</h2>
      
      <div className="mb-4">
        <input 
          type="email"
          placeholder="To"
          {...formik.getFieldProps('to')}
          className={`w-full p-2 border ${formik.touched.to && formik.errors.to ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-blue-500`}
          aria-describedby="toHelp"
        />
        {formik.touched.to && formik.errors.to ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.to}</div>
        ) : (
          <div id="toHelp" className="text-gray-500 text-sm mt-1">Enter the recipient's email address.</div>
        )}
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Subject"
          {...formik.getFieldProps('subject')}
          className={`w-full p-2 border ${formik.touched.subject && formik.errors.subject ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-blue-500`}
          aria-describedby="subjectHelp"
        />
        {formik.touched.subject && formik.errors.subject ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.subject}</div>
        ) : (
          <div id="subjectHelp" className="text-gray-500 text-sm mt-1">Enter the email subject (up to 100 characters).</div>
        )}
      </div>
      
      <div className="mb-4">
        <textarea 
        rows={4}
          placeholder="Message"
          {...formik.getFieldProps('message')}
          className={`w-full p-2 border ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-blue-500`}
          aria-describedby="messageHelp"
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
        ) : (
          <div id="messageHelp" className="text-gray-500 text-sm mt-1">Type your message (minimum 10 characters).</div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={formik.isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        {formik.isSubmitting ? "Sending..." : "Send Email"}
      </button>
    </form>
  )
}
