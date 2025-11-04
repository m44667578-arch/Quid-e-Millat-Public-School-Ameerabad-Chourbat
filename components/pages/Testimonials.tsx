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
//       const imageUrl = reader.result as string;
//       onTestimonialSubmit({ ...formData, imageUrl });
//       setIsSubmitting(false);
//     };
//     reader.onerror = () => {
//       setIsSubmitting(false);
//       alert('Failed to read file.');
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














import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Testimonial, TestimonialCategory } from '../../types';

interface TestimonialsProps {
  onTestimonialSubmit: (testimonial: Omit<Testimonial, 'id' | 'status'>) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'student' as TestimonialCategory,
    message: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please upload a picture.');
      return;
    }

    setIsSubmitting(true);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = () => {
      const imageBase64 = reader.result as string;

      // Send data to EmailJS
      emailjs
        .send(
          'service_loh252g', // your service ID
          'template_2kwzox7', // your template ID
          {
            full_name: formData.name,
            role: formData.category,
            message: formData.message,
            image_base64: imageBase64
          },
          'aJzbYEK498ObnVkKR' // your public key
        )
        .then(
          () => {
            alert('✅ Testimonial submitted successfully!');
            onTestimonialSubmit({ ...formData, imageUrl: imageBase64 });
            setFormData({ name: '', category: 'student', message: '' });
            setImageFile(null);
            setImagePreview(null);
          },
          (error) => {
            console.error('EmailJS Error:', error);
            alert('❌ Failed to send testimonial. Try again.');
          }
        )
        .finally(() => setIsSubmitting(false));
    };

    reader.onerror = () => {
      setIsSubmitting(false);
      alert('Failed to read image file.');
    };
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-school-blue sm:text-4xl">
            Share Your Experience
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Your story can inspire future students and parents.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="label-style">
                  Your Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="category" className="label-style">
                  I am a...
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="alumni">Alumni</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="label-style">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Share your thoughts about our school..."
              />
            </div>

            <div>
              <label htmlFor="picture" className="label-style">
                Your Picture
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-24 w-24 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <input
                  id="picture"
                  name="picture"
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:text-sm file:font-semibold 
                  file:bg-violet-50 file:text-school-blue hover:file:bg-violet-100"
                  accept="image/*"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Please upload a clear, friendly photo of yourself.
              </p>
            </div>

            <div className="pt-4 text-center text-sm text-gray-500">
              <p>Your submission will be reviewed by our principal before being published.</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-school-blue text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Submit My Testimonial'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.2s;
          background-color: #f9fafb;
        }
        .input-field:focus {
          outline: none;
          border-color: #0D244F;
          ring: 1;
          ring-color: #0D244F;
        }
        .label-style {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
