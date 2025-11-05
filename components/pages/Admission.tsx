// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Grade, AdmissionApplication } from '../../types';

// interface AdmissionProps {
//   onAdmissionSubmit: (application: Omit<AdmissionApplication, 'id' | 'submissionDate'>) => void;
// }

// const Admission: React.FC<AdmissionProps> = ({ onAdmissionSubmit }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     guardianName: '',
//     dob: '',
//     grade: Grade.PlayGroup,
//     previousSchool: '',
//     address: '',
//     whatsappNumber: '',
//     email: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     onAdmissionSubmit(formData);

//     try {
//       const imageUrls: string[] = [];
//       for (const file of images) {
//         const reader = new FileReader();
//         const result = await new Promise<string>((resolve, reject) => {
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//         imageUrls.push(result);
//       }

//       await emailjs.send(
//   'service_loh252g',
//   'template_2kwzox7',
//   {
//     form_type: 'Admission Form',
//     full_name: formData.fullName,
//     guardian_name: formData.guardianName,
//     dob: formData.dob,
//     grade: formData.grade,
//     previous_school: formData.previousSchool || 'N/A',
//     address: formData.address,
//     whatsapp_number: formData.whatsappNumber,
//     email: formData.email,
//     category: '',       // Not applicable
//     message: '',        // Not applicable
//     image_url: imageUrls.join(', ') || 'N/A',
//   },
//   'aJzbYEK498ObnVkKR'
// );


//       alert('Admission form submitted successfully! Details have been sent to your email.');
//     } catch (error) {
//       alert('Failed to send admission form. Please try again.');
//       console.error(error);
//     }
//   };


//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">Online Admission Application</h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Take the first step towards joining our school community. Please fill out the form below.
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div><label htmlFor="fullName" className="label-style">Student's Full Name</label><input id="fullName" name="fullName" type="text" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label htmlFor="guardianName" className="label-style">Parent/Guardian's Name</label><input id="guardianName" name="guardianName" type="text" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label htmlFor="dob" className="label-style">Date of Birth</label><input id="dob" name="dob" type="date" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label htmlFor="grade" className="label-style">Grade Applying For</label><select id="grade" name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">{Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}</select></div>
//               <div><label htmlFor="whatsappNumber" className="label-style">WhatsApp Number</label><input id="whatsappNumber" name="whatsappNumber" type="tel" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label htmlFor="email" className="label-style">Email Address</label><input id="email" name="email" type="email" onChange={handleInputChange} required className="input-field" /></div>
//             </div>
//             <div><label htmlFor="previousSchool" className="label-style">Previous School (if any)</label><input id="previousSchool" name="previousSchool" type="text" onChange={handleInputChange} className="input-field" /></div>
//             <div><label htmlFor="address" className="label-style">Full Residential Address</label><textarea id="address" name="address" rows={3} onChange={handleInputChange} required className="input-field" /></div>
//             <div className="pt-4 flex justify-end">
//               <button type="submit" className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors">Submit Application</button>
//             </div>
//           </form>
//         </div>
//       </div>
//        <style>{`
//         .input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; transition: border-color 0.2s; background-color: #f9fafb; }
//         .input-field:focus { outline: none; border-color: #0D244F; ring: 1; ring-color: #0D244F; }
//         .label-style { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
//        `}</style>
//     </div>
//   );
// };

// export default Admission;












// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Grade, AdmissionApplication } from '../../types';

// interface AdmissionProps {
//   onAdmissionSubmit: (application: Omit<AdmissionApplication, 'id' | 'submissionDate'>) => void;
// }

// const Admission: React.FC<AdmissionProps> = ({ onAdmissionSubmit }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     guardianName: '',
//     dob: '',
//     grade: Grade.PlayGroup,
//     previousSchool: '',
//     address: '',
//     whatsappNumber: '',
//     email: '',
//   });
//   const [images, setImages] = useState<File[]>([]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImages(Array.from(e.target.files));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     onAdmissionSubmit(formData);

//     try {
//       const imageUrls: string[] = [];
//       for (const file of images) {
//         const reader = new FileReader();
//         const result = await new Promise<string>((resolve, reject) => {
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//         imageUrls.push(result);
//       }

//       await emailjs.send(
//   'service_loh252g',
//   'template_2kwzox7',
//   {
//     form_type: 'Admission Form',
//     full_name: formData.fullName,
//     guardian_name: formData.guardianName,
//     dob: formData.dob,
//     grade: formData.grade,
//     previous_school: formData.previousSchool || 'N/A',
//     address: formData.address,
//     whatsapp_number: formData.whatsappNumber,
//     email: formData.email,
//     category: '',       // Not applicable
//     message: '',        // Not applicable
//     image_url: imageUrls.join(', ') || 'N/A',
//   },
//   'aJzbYEK498ObnVkKR'
// );


//       alert('Admission form submitted successfully! Details have been sent to your email.');
//     } catch (error) {
//       alert('Failed to send admission form. Please try again.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">Online Admission Application</h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Take the first step towards joining our school community. Please fill out the form below.
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div><label className="label-style">Student's Full Name</label><input name="fullName" type="text" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label className="label-style">Parent/Guardian's Name</label><input name="guardianName" type="text" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label className="label-style">Date of Birth</label><input name="dob" type="date" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label className="label-style">Grade Applying For</label>
//                 <select name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">
//                   {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
//                 </select>
//               </div>
//               <div><label className="label-style">WhatsApp Number</label><input name="whatsappNumber" type="tel" onChange={handleInputChange} required className="input-field" /></div>
//               <div><label className="label-style">Email Address</label><input name="email" type="email" onChange={handleInputChange} required className="input-field" /></div>
//             </div>
//             <div><label className="label-style">Previous School (if any)</label><input name="previousSchool" type="text" onChange={handleInputChange} className="input-field" /></div>
//             <div><label className="label-style">Full Residential Address</label><textarea name="address" rows={3} onChange={handleInputChange} required className="input-field" /></div>
//             <div><label className="label-style">Upload Images (optional)</label><input type="file" multiple onChange={handleImageChange} accept="image/*" className="input-field" /></div>
//             <div className="pt-4 flex justify-end">
//               <button type="submit" className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors">Submit Application</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admission;









// // Admission.tsx
// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Grade, AdmissionApplication } from "../../types";

// interface AdmissionProps {
//   onAdmissionSubmit: (application: Omit<AdmissionApplication, "id" | "submissionDate">) => void;
// }

// const Admission: React.FC<AdmissionProps> = ({ onAdmissionSubmit }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     guardianName: "",
//     dob: "",
//     grade: Grade.PlayGroup,
//     previousSchool: "",
//     address: "",
//     whatsappNumber: "",
//     email: "",
//   });

//   // NEW: files state to hold uploaded images
//   const [images, setImages] = useState<File[]>([]);
//   const [sending, setSending] = useState(false);
//   const [statusMessage, setStatusMessage] = useState<string>("");

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const fileList = Array.from(e.target.files);
//     setImages(fileList);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatusMessage("");
//     setSending(true);

//     try {
//       // convert images to base64 (if any)
//       const imageUrls: string[] = [];
//       for (const file of images) {
//         const reader = new FileReader();
//         const result = await new Promise<string>((resolve, reject) => {
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.onerror = () => reject(new Error("Failed to read file"));
//           reader.readAsDataURL(file);
//         });
//         imageUrls.push(result);
//       }

//       // send via EmailJS (you used send with public key as 4th arg; preserving that)
//       const res = await emailjs.send(
//         "service_loh252g",
//         "template_2kwzox7",
//         {
//           form_type: "Admission Form",
//           full_name: formData.fullName,
//           guardian_name: formData.guardianName,
//           dob: formData.dob,
//           grade: formData.grade,
//           previous_school: formData.previousSchool || "N/A",
//           address: formData.address,
//           whatsapp_number: formData.whatsappNumber,
//           email: formData.email,
//           category: "", // Not applicable
//           message: "", // Not applicable
//           // keep image_url readable in the email; if many images it's a comma list of base64 strings
//           image_url: imageUrls.length ? imageUrls.join(", ") : "N/A",
//         },
//         "aJzbYEK498ObnVkKR"
//       );

//       // check response status if available
//       if (res && (res.status === 200 || res.text === "OK")) {
//         // Only notify parent / update app after successful send
//         onAdmissionSubmit(formData);

//         setStatusMessage("Admission form submitted successfully. Details sent to admin email.");
//         // reset form + files
//         setFormData({
//           fullName: "",
//           guardianName: "",
//           dob: "",
//           grade: Grade.PlayGroup,
//           previousSchool: "",
//           address: "",
//           whatsappNumber: "",
//           email: "",
//           password: "",
//             confirmPassword: "",
//             childStudentIds: "",
//         });
//         setImages([]);
//         // If you want to also clear any file input element in DOM, React will re-render and file input value will be empty if you use key or ref. Below is simple and works visually.
//       } else {
//         console.error("EmailJS unexpected response:", res);
//         setStatusMessage("Submission sent but received unexpected response. Check console for details.");
//       }
//     } catch (error) {
//       console.error("Failed to send admission form:", error);
//       setStatusMessage("Failed to send admission form. Please try again.");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
//             Online Admission Application
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Take the first step towards joining our school community. Please fill out the form below.
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="fullName" className="label-style">
//                   Student's Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="guardianName" className="label-style">
//                   Parent/Guardian's Name
//                 </label>
//                 <input
//                   id="guardianName"
//                   name="guardianName"
//                   type="text"
//                   value={formData.guardianName}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="dob" className="label-style">
//                   Date of Birth
//                 </label>
//                 <input
//                   id="dob"
//                   name="dob"
//                   type="date"
//                   value={formData.dob}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="grade" className="label-style">
//                   Grade Applying For
//                 </label>
//                 <select
//                   id="grade"
//                   name="grade"
//                   value={formData.grade}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 >
//                   {Object.values(Grade).map((g) => (
//                     <option key={g} value={g}>
//                       {g}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="whatsappNumber" className="label-style">
//                   WhatsApp Number
//                 </label>
//                 <input
//                   id="whatsappNumber"
//                   name="whatsappNumber"
//                   type="tel"
//                   value={formData.whatsappNumber}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="label-style">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="previousSchool" className="label-style">
//                 Previous School (if any)
//               </label>
//               <input
//                 id="previousSchool"
//                 name="previousSchool"
//                 type="text"
//                 value={formData.previousSchool}
//                 onChange={handleInputChange}
//                 className="input-field"
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="label-style">
//                 Full Residential Address
//               </label>
//               <textarea
//                 id="address"
//                 name="address"
//                 rows={3}
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="input-field"
//               />
//             </div>

//             {/* NEW: file input for image uploads */}
//             <div>
//               <label htmlFor="attachments" className="label-style">
//                 Upload image(s) (optional)
//               </label>
//               <input
//                 id="attachments"
//                 name="attachments"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 multiple
//                 onChange={handleFilesChange}
//                 className="input-field"
//               />
//               {images.length > 0 && (
//                 <p className="text-sm mt-2">{images.length} file(s) selected</p>
//               )}
//             </div>

//             <div className="pt-4 flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
//                 disabled={sending}
//               >
//                 {sending ? "Sending..." : "Submit Application"}
//               </button>
//             </div>

//             {statusMessage && <div className="mt-4 text-center">{statusMessage}</div>}
//           </form>
//         </div>
//       </div>

//       <style>{`
//         .input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; transition: border-color 0.2s; background-color: #f9fafb; }
//         .input-field:focus { outline: none; border-color: #0D244F; ring: 1; ring-color: #0D244F; }
//         .label-style { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
//        `}</style>
//     </div>
//   );
// };

// export default Admission;










// Admission.tsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Grade, AdmissionApplication } from "../../types";

const EMAILJS_SERVICE_ID = "service_loh252g";
const EMAILJS_TEMPLATE_ID = "template_2kwzox7";
const EMAILJS_PUBLIC_KEY = "aJzbYEK498ObnVkKR";

// initialize EmailJS once (safe to call)
emailjs.init(EMAILJS_PUBLIC_KEY);

interface AdmissionProps {
  onAdmissionSubmit: (application: Omit<AdmissionApplication, "id" | "submissionDate">) => void;
}

const Admission: React.FC<AdmissionProps> = ({ onAdmissionSubmit }) => {
  // note: input names below must match EmailJS template variable names
  const [formData, setFormData] = useState({
    full_name: "",
    guardian_name: "",
    dob: "",
    grade: Grade.PlayGroup,
    previous_school: "",
    address: "",
    whatsapp_number: "",
    email: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // set hidden image_url to "attached" when any files are selected
    const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
    if (imageUrlInput) {
      imageUrlInput.value = e.target.files && e.target.files.length ? "attached" : "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    setSending(true);

    if (!formRef.current) {
      setStatusMessage("Form not ready.");
      setSending(false);
      return;
    }

    try {
      const res = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      if (res && (res.status === 200 || res.text === "OK" || res.status === undefined)) {
        // convert formData shape to the app shape expected by parent callback
        onAdmissionSubmit({
          fullName: formData.full_name,
          guardianName: formData.guardian_name,
          dob: formData.dob,
          grade: formData.grade,
          previousSchool: formData.previous_school,
          address: formData.address,
          whatsappNumber: formData.whatsapp_number,
          email: formData.email,
        });

        setStatusMessage("Admission form submitted successfully. Details sent to admin email.");
        // reset form UI
        formRef.current.reset();
        setFormData({
          full_name: "",
          guardian_name: "",
          dob: "",
          grade: Grade.PlayGroup,
          previous_school: "",
          address: "",
          whatsapp_number: "",
          email: "",
        });
      } else {
        console.error("EmailJS unexpected response:", res);
        setStatusMessage("Submission sent but received unexpected response. Check console for details.");
      }
    } catch (error) {
      console.error("Failed to send admission form:", error);
      setStatusMessage("Failed to send admission form. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
            Online Admission Application
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Take the first step towards joining our school community. Please fill out the form below.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Hidden template fields */}
            <input type="hidden" name="form_type" value="Admission Form" />
            <input type="hidden" name="category" value="" />
            <input type="hidden" name="message" value="" />
            {/* image_url will be set to "attached" when user picks files */}
            <input type="hidden" name="image_url" defaultValue="" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="label-style">
                  Student's Full Name
                </label>
                <input
                  id="fullName"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="guardianName" className="label-style">
                  Parent/Guardian's Name
                </label>
                <input
                  id="guardianName"
                  name="guardian_name"
                  type="text"
                  value={formData.guardian_name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="dob" className="label-style">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="grade" className="label-style">
                  Grade Applying For
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  {Object.values(Grade).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="whatsappNumber" className="label-style">
                  WhatsApp Number
                </label>
                <input
                  id="whatsappNumber"
                  name="whatsapp_number"
                  type="tel"
                  value={formData.whatsapp_number}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="email" className="label-style">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="previousSchool" className="label-style">
                Previous School (if any)
              </label>
              <input
                id="previousSchool"
                name="previous_school"
                type="text"
                value={formData.previous_school}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="address" className="label-style">
                Full Residential Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="attachments" className="label-style">
                Upload image(s) (optional)
              </label>
              <input
                id="attachments"
                name="attachment"
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleFilesChange}
                className="input-field"
              />
              {/* user feedback for selected files is optional — EmailJS will attach them */}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
                disabled={sending}
              >
                {sending ? "Sending..." : "Submit Application"}
              </button>
            </div>

            {statusMessage && <div className="mt-4 text-center">{statusMessage}</div>}
          </form>
        </div>
      </div>

      <style>{`
        .input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; transition: border-color 0.2s; background-color: #f9fafb; }
        .input-field:focus { outline: none; border-color: #0D244F; ring: 1; ring-color: #0D244F; }
        .label-style { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
       `}</style>
    </div>
  );
};

export default Admission;
