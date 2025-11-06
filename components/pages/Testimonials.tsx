// import React, { useState } from 'react';
// import { Testimonial, TestimonialCategory } from '../../types';

// interface TestimonialsProps {
//   onTestimonialSubmit: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
// }

// const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialSubmit }) => {
//   const [formData, setFormData] = useState({ name: '', category: 'student' as TestimonialCategory, message: '' });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//    const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert('Please upload a picture.');
//       return;
//     }

//     setIsSubmitting(true);
//     const reader = new FileReader();
//     reader.readAsDataURL(imageFile);

//     reader.onloadend = () => {
//       const imageBase64 = reader.result as string;

//       // Send data to EmailJS
//       emailjs.send(
//   'service_loh252g',
//   'template_2kwzox7',
//   {
//     form_type: 'Testimonial Form', // Specify the form type
//     full_name: formData.name,
//     guardian_name: '', // Not applicable for testimonial
//     dob: '',           // Not applicable for testimonial
//     grade: '',         // Not applicable for testimonial
//     previous_school: '', // Not applicable
//     address: '',       // Not applicable
//     whatsapp_number: '', // Not applicable
//     email: '',         // If you want to collect email, include it in your form
//     category: formData.category,
//     message: formData.message,
//     image_url: imageBase64 || 'N/A',
//   },
//   'aJzbYEK498ObnVkKR'
// )

//         .then(
//           () => {
//             alert('✅ Testimonial submitted successfully!');
//             onTestimonialSubmit({ ...formData, imageUrl: imageBase64 });
//             setFormData({ name: '', category: 'student', message: '' });
//             setImageFile(null);
//             setImagePreview(null);
//           },
//           (error) => {
//             console.error('EmailJS Error:', error);
//             alert('❌ Failed to send testimonial. Try again.');
//           }
//         )
//         .finally(() => setIsSubmitting(false));
//     };

//     reader.onerror = () => {
//       setIsSubmitting(false);
//       alert('Failed to read image file.');
//     };
//   };


//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">Share Your Experience</h2>
//           <p className="mt-4 text-lg text-gray-600">
//             We'd love to hear from you! Your story can inspire future students and parents.
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="label-style">Your Full Name</label>
//                 <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="input-field" />
//               </div>
//               <div>
//                 <label htmlFor="category" className="label-style">I am a...</label>
//                 <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="input-field">
//                   <option value="student">Student</option>
//                   <option value="parent">Parent</option>
//                   <option value="alumni">Alumni</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="message" className="label-style">Your Message</label>
//               <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="input-field" placeholder="Share your thoughts about our school..."/>
//             </div>
//              <div>
//                 <label htmlFor="picture" className="label-style">Your Picture</label>
//                 <div className="mt-2 flex items-center gap-x-3">
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
//                   ) : (
//                     <svg className="h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                   <input id="picture" name="picture" type="file" onChange={handleFileChange} required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-school-blue hover:file:bg-violet-100" accept="image/*" />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Please upload a clear, friendly photo of yourself.</p>
//              </div>
//             <div className="pt-4 text-center text-sm text-gray-500">
//               <p>Your submission will be reviewed by our principal before being published on the website.</p>
//             </div>
//             <div className="pt-4 flex justify-end">
//               <button type="submit" disabled={isSubmitting} className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
//                 {isSubmitting ? 'Submitting...' : 'Submit My Testimonial'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <style>{`
//         .input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; transition: border-color 0.2s; background-color: #f9fafb; }
//         .input-field:focus { outline: none; border-color: #0D244F; ring: 1; ring-color: #0D244F; }
//         .label-style { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
//       `}</style>
//     </div>
//   );
// };

// export default Testimonials;














// import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { Testimonial, TestimonialCategory } from '../../types';

// interface TestimonialsProps {
//   onTestimonialSubmit: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
// }

// const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: 'student' as TestimonialCategory,
//     message: ''
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert('Please upload a picture.');
//       return;
//     }

//     setIsSubmitting(true);
//     const reader = new FileReader();
//     reader.readAsDataURL(imageFile);

//     reader.onloadend = () => {
//       const imageBase64 = reader.result as string;

//       // Send data to EmailJS
//       emailjs.send(
//   'service_loh252g',
//   'template_2kwzox7',
//   {
//     form_type: 'Testimonial Form', // Specify the form type
//     full_name: formData.name,
//     guardian_name: '', // Not applicable for testimonial
//     dob: '',           // Not applicable for testimonial
//     grade: '',         // Not applicable for testimonial
//     previous_school: '', // Not applicable
//     address: '',       // Not applicable
//     whatsapp_number: '', // Not applicable
//     email: '',         // If you want to collect email, include it in your form
//     category: formData.category,
//     message: formData.message,
//     image_url: imageBase64 || 'N/A',
//   },
//   'aJzbYEK498ObnVkKR'
// )

//         .then(
//           () => {
//             alert('✅ Testimonial submitted successfully!');
//             onTestimonialSubmit({ ...formData, imageUrl: imageBase64 });
//             setFormData({ name: '', category: 'student', message: '' });
//             setImageFile(null);
//             setImagePreview(null);
//           },
//           (error) => {
//             console.error('EmailJS Error:', error);
//             alert('❌ Failed to send testimonial. Try again.');
//           }
//         )
//         .finally(() => setIsSubmitting(false));
//     };

//     reader.onerror = () => {
//       setIsSubmitting(false);
//       alert('Failed to read image file.');
//     };
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
//             Share Your Experience
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             We'd love to hear from you! Your story can inspire future students and parents.
//           </p>
//         </div>

//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="label-style">
//                   Your Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="category" className="label-style">
//                   I am a...
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   required
//                   className="input-field"
//                 >
//                   <option value="student">Student</option>
//                   <option value="parent">Parent</option>
//                   <option value="alumni">Alumni</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="message" className="label-style">
//                 Your Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={5}
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 required
//                 className="input-field"
//                 placeholder="Share your thoughts about our school..."
//               />
//             </div>

//             <div>
//               <label htmlFor="picture" className="label-style">
//                 Your Picture
//               </label>
//               <div className="mt-2 flex items-center gap-x-3">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="h-24 w-24 rounded-full object-cover"
//                   />
//                 ) : (
//                   <svg
//                     className="h-24 w-24 text-gray-300"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 )}

//                 <input
//                   id="picture"
//                   name="picture"
//                   type="file"
//                   onChange={handleFileChange}
//                   required
//                   className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
//                   file:rounded-full file:border-0 file:text-sm file:font-semibold 
//                   file:bg-violet-50 file:text-school-blue hover:file:bg-violet-100"
//                   accept="image/*"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 Please upload a clear, friendly photo of yourself.
//               </p>
//             </div>

//             <div className="pt-4 text-center text-sm text-gray-500">
//               <p>Your submission will be reviewed by our principal before being published.</p>
//             </div>

//             <div className="pt-4 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit My Testimonial'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <style>{`
//         .input-field {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           transition: border-color 0.2s;
//           background-color: #f9fafb;
//         }
//         .input-field:focus {
//           outline: none;
//           border-color: #0D244F;
//           ring: 1;
//           ring-color: #0D244F;
//         }
//         .label-style {
//           display: block;
//           margin-bottom: 6px;
//           font-weight: 500;
//           color: #374151;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Testimonials;
















// // Testimonials.tsx
// import React, { useRef, useState } from 'react';
// import { Testimonial, TestimonialCategory } from '../../types';
// import emailjs from '@emailjs/browser';

// const EMAILJS_SERVICE_ID = 'service_loh252g';
// const EMAILJS_TEMPLATE_ID = 'template_2kwzox7';
// const EMAILJS_PUBLIC_KEY = 'aJzbYEK498ObnVkKR';

// // initialize EmailJS
// emailjs.init(EMAILJS_PUBLIC_KEY);

// interface TestimonialsProps {
//   onTestimonialSubmit: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
// }

// const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialSubmit }) => {
//   const formRef = useRef<HTMLFormElement | null>(null);
//   const [formData, setFormData] = useState({ name: '', category: 'student' as TestimonialCategory, message: '' });
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);

//       // set preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);

//       // set hidden image_url to "attached" so template shows that a file is included
//       const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
//       if (imageUrlInput) imageUrlInput.value = 'attached';
//     } else {
//       setImageFile(null);
//       setImagePreview(null);
//       const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
//       if (imageUrlInput) imageUrlInput.value = '';
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert('Please upload a picture.');
//       return;
//     }

//     if (!formRef.current) {
//       alert('Form not ready. Try again.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await emailjs.sendForm(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         formRef.current,
//         EMAILJS_PUBLIC_KEY
//       );

//       if (res && (res.status === 200 || res.text === 'OK' || res.status === undefined)) {
//         alert('✅ Testimonial submitted successfully!');

//         // Call parent with same shape as before but imageUrl indicates attachment
//         onTestimonialSubmit({ name: formData.name, category: formData.category, message: formData.message, imageUrl: 'attached' });

//         // reset form and local state
//         formRef.current.reset();
//         setFormData({ name: '', category: 'student', message: '' });
//         setImageFile(null);
//         setImagePreview(null);
//       } else {
//         console.warn('EmailJS unexpected response:', res);
//         alert('❌ Submission sent but received unexpected response. Check console.');
//       }
//     } catch (error) {
//       console.error('EmailJS Error:', error);
//       alert('❌ Failed to send testimonial. Try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="py-20 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">Share Your Experience</h2>
//           <p className="mt-4 text-lg text-gray-600">
//             We'd love to hear from you! Your story can inspire future students and parents.
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-xl shadow-lg">
//           <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
//             {/* Hidden fields to match EmailJS template names */}
//             <input type="hidden" name="form_type" value="Testimonial Form" />
//             <input type="hidden" name="guardian_name" value="" />
//             <input type="hidden" name="dob" value="" />
//             <input type="hidden" name="grade" value="" />
//             <input type="hidden" name="previous_school" value="" />
//             <input type="hidden" name="address" value="" />
//             <input type="hidden" name="whatsapp_number" value="" />
//             <input type="hidden" name="email" value="" />
//             <input type="hidden" name="password" value=""/>
//             <input type="hidden" name="confirmPassword" value=""/>
//             <input type="hidden" name="childStudentIds" value="" />
//             <input type="hidden" name="category" value={formData.category} />
//             {/* <input type="hidden" name="message" value={formData.message} /> */}
//             {/* image_url will be set to "attached" on file select */}
//             {/* <input type="hidden" name="image_url" defaultValue="" /> */}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="name" className="label-style">Your Full Name</label>
//                 <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="input-field" />
//               </div>
//               <div>
//                 <label htmlFor="category" className="label-style">I am a...</label>
//                 <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="input-field">
//                   <option value="student">Student</option>
//                   <option value="parent">Parent</option>
//                   <option value="alumni">Alumni</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="message" className="label-style">Your Message</label>
//               <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="input-field" placeholder="Share your thoughts about our school..." />
//             </div>
//              <div>
//                 <label htmlFor="attachment" className="label-style">Your Picture</label>
//                 <div className="mt-2 flex items-center gap-x-3">
//                   {imagePreview ? (
//                     <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
//                   ) : (
//                     <svg className="h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                       <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                   <input id="attachment" name="attachment" type="file" onChange={handleFileChange} required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-school-blue hover:file:bg-violet-100" accept="image/*" />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Please upload a clear, friendly photo of yourself.</p>
//              </div>
//             <div className="pt-4 text-center text-sm text-gray-500">
//               <p>Your submission will be reviewed by our principal before being published on the website.</p>
//             </div>
//             <div className="pt-4 flex justify-end">
//               <button type="submit" disabled={isSubmitting} className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
//                 {isSubmitting ? 'Submitting...' : 'Submit My Testimonial'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <style>{`
//         .input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; transition: border-color 0.2s; background-color: #f9fafb; }
//         .input-field:focus { outline: none; border-color: #0D244F; ring: 1; ring-color: #0D244F; }
//         .label-style { display: block; margin-bottom: 6px; font-weight: 500; color: #374151; }
//       `}</style>
//     </div>
//   );
// };

// export default Testimonials;













// Testimonials.tsx
import React, { useRef, useState } from 'react';
import { Testimonial, TestimonialCategory } from '../../types';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_loh252g';
const EMAILJS_TEMPLATE_ID = 'template_2kwzox7';
const EMAILJS_PUBLIC_KEY = 'aJzbYEK498ObnVkKR';

// initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface TestimonialsProps {
  onTestimonialSubmit: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialSubmit }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({ full_name: '', category: 'student' as TestimonialCategory, message: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // set hidden image_url to "attached" so template shows that a file is included
      const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
      if (imageUrlInput) imageUrlInput.value = 'attached';
    } else {
      setImageFile(null);
      setImagePreview(null);
      const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
      if (imageUrlInput) imageUrlInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please upload a picture.');
      return;
    }

    if (!formRef.current) {
      alert('Form not ready. Try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      if (res && (res.status === 200 || res.text === 'OK' || res.status === undefined)) {
        alert('✅ Testimonial submitted successfully!');

        // Call parent — imageUrl = 'attached' indicates admin will receive attachment
        onTestimonialSubmit({ name: formData.full_name, category: formData.category, message: formData.message, imageUrl: 'attached' });

        // reset form and local state
        formRef.current.reset();
        setFormData({ full_name: '', category: 'student', message: '' });
        setImageFile(null);
        setImagePreview(null);
      } else {
        console.warn('EmailJS unexpected response:', res);
        alert('❌ Submission sent but received unexpected response. Check console.');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('❌ Failed to send testimonial. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!imageFile) {
//     alert("Please upload a picture.");
//     return;
//   }

//   if (!formRef.current) {
//     alert("Form not ready. Try again.");
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     // 1) Send admin notification (form + attachment)
//     const res = await emailjs.sendForm(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       formRef.current,
//       EMAILJS_PUBLIC_KEY
//     );

//     if (res && (res.status === 200 || res.text === "OK" || res.status === undefined)) {
//       // Notify parent that testimonial was received (imageUrl = 'attached' indicates admin got it)
//       onTestimonialSubmit({
//         name: formData.full_name,
//         category: formData.category,
//         message: formData.message,
//         imageUrl: "attached",
//       });

//       // 2) Send welcome/acknowledgement email to the sender (if they provided an email)
//       if (formData.email && formData.email.trim().length > 0) {
//         try {
//           await emailjs.send(
//             EMAILJS_SERVICE_ID,
//             template_sepkrab,
//             {
//               full_name: formData.full_name,
//               form_type: "Testimonial",
//               email: formData.email,
//             },
//             EMAILJS_PUBLIC_KEY
//           );
//           // optional feedback
//           alert("✅ Testimonial submitted and confirmation email sent!");
//         } catch (welcomeErr) {
//           console.error("Failed to send welcome email:", welcomeErr);
//           alert("⚠️ Testimonial submitted, but confirmation email failed.");
//         }
//       } else {
//         alert("✅ Testimonial submitted successfully!");
//       }

//       // Reset form UI + local state
//       formRef.current.reset();
//       setFormData({ full_name: "", category: "student", message: "" });
//       setImageFile(null);
//       setImagePreview(null);
//     } else {
//       console.warn("EmailJS unexpected response:", res);
//       alert("❌ Submission sent but received unexpected response. Check console.");
//     }
//   } catch (error) {
//     console.error("EmailJS Error:", error);
//     alert("❌ Failed to send testimonial. Try again.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };






  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">Share Your Experience</h2>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Your story can inspire future students and parents.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Hidden fields matching your EmailJS template — only necessary fields included */}
            <input type="hidden" name="form_type" value="Testimonial Form" />
            <input type="hidden" name="guardian_name" value="" />
            <input type="hidden" name="dob" value="" />
            <input type="hidden" name="grade" value="" />
            <input type="hidden" name="previous_school" value="" />
            <input type="hidden" name="address" value="" />
            <input type="hidden" name="whatsapp_number" value="" />
            <input type="hidden" name="email" value="" />
            {/* image_url will be set to "attached" on file select */}
            <input type="hidden" name="image_url" defaultValue="" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="label-style">Your Full Name</label>
                <input id="name" name="full_name" type="text" value={formData.full_name} onChange={handleInputChange} required className="input-field" />
              </div>
              <div>
                <label htmlFor="category" className="label-style">I am a...</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="input-field">
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="alumni">Alumni</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="label-style">Your Message</label>
              <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="input-field" placeholder="Share your thoughts about our school..." />
            </div>
             <div>
                <label htmlFor="attachment" className="label-style">Your Picture</label>
                <div className="mt-2 flex items-center gap-x-3">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-full object-cover" />
                  ) : (
                    <svg className="h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <input id="attachment" name="attachment" type="file" onChange={handleFileChange} required className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-school-blue hover:file:bg-violet-100" accept="image/*" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Please upload a clear, friendly photo of yourself.</p>
             </div>
            <div className="pt-4 text-center text-sm text-gray-500">
              <p>Your submission will be reviewed by our principal before being published on the website.</p>
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
                {isSubmitting ? 'Submitting...' : 'Submit My Testimonial'}
              </button>
            </div>
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

export default Testimonials;
