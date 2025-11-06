// import React, { useState } from 'react';
// import { AuthModalState, User, UserType, AdminRole, Grade } from '../../types';
//import emailjs from "@emailjs/browser";
// interface AuthModalProps {
//     modalState: AuthModalState;
//     onClose: () => void;
//     onLoginSuccess: (user: User) => void;
//     onRegister: (newUser: Omit<User, 'id'>) => void;
//     approvedUsers: User[];
// }

// // Hardcoded secret values as per requirements
// const SCHOOL_MASTER_CODE = 'QMPS-512&786';
// const PRINCIPAL_NUMBER = '923555371125';
// const MOCK_PRINCIPAL_FULL_NAME = 'Principal QMPS';
// const MOCK_PRINCIPAL_EMAIL = 'principalqmps@gmail.com';
// const MOCK_PRINCIPAL_PASSWORD = 'principal512@512';

// const AuthModal: React.FC<AuthModalProps> = ({ modalState, onClose, onLoginSuccess, onRegister, approvedUsers }) => {
//     const [formData, setFormData] = useState<any>({ grade: Grade.PlayGroup });
//     const [error, setError] = useState<string>('');
//     const [adminRole, setAdminRole] = useState<AdminRole>('staff');
    
//     const { mode, userType } = modalState;

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (mode === 'register') {
//             if (formData.password !== formData.confirmPassword) {
//                 setError("Passwords do not match.");
//                 return;
//             }
            
//             const newUser: Omit<User, 'id'> = {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 password: formData.password,
//                 userType: userType as UserType,
//                 grade: userType === 'student' ? formData.grade : undefined,
//                 childStudentIds: userType === 'parent' ? formData.childStudentIds.split(',').map((s: string) => s.trim()) : undefined,
//             };
//             onRegister(newUser);
//         } else { // Login mode
//             if (userType === 'admin') {
//                 if (adminRole === 'principal') {
//                     if (formData.fullName === MOCK_PRINCIPAL_FULL_NAME &&
//                         formData.email === MOCK_PRINCIPAL_EMAIL &&
//                         formData.password === MOCK_PRINCIPAL_PASSWORD &&
//                         formData.schoolMasterCode === SCHOOL_MASTER_CODE &&
//                         formData.principalNumber === PRINCIPAL_NUMBER) {
//                         onLoginSuccess({ id: 'principal-01', fullName: MOCK_PRINCIPAL_FULL_NAME, email: MOCK_PRINCIPAL_EMAIL, userType: 'principal' });
//                     } else {
//                         setError('Invalid Principal credentials.');
//                     }
//                 } else { // staff login
//                     const user = approvedUsers.find(u => u.userType === 'admin' && u.email === formData.email && u.password === formData.password);
//                     if (user && formData.schoolMasterCode === SCHOOL_MASTER_CODE) {
//                         onLoginSuccess(user);
//                     } else {
//                         setError('Invalid credentials or account not approved.');
//                     }
//                 }
//             } else if (userType === 'parent') { // Parent login
//                  const user = approvedUsers.find(u =>
//                     u.userType === 'parent' &&
//                     u.email === formData.email &&
//                     u.password === formData.password
//                 );
//                 if (user) {
//                     onLoginSuccess(user);
//                 } else {
//                     setError('Invalid credentials or account not approved.');
//                 }
//             }
//             else { // Student login
//                 const user = approvedUsers.find(u =>
//                     u.userType === 'student' &&
//                     u.email === formData.email &&
//                     u.studentId === formData.studentId &&
//                     u.password === formData.password
//                 );
//                 if (user) {
//                     onLoginSuccess(user);
//                 } else {
//                     setError('Invalid credentials or account not approved.');
//                 }
//             }
//         }
//     };
    
//     const renderTitle = () => {
//         const action = mode === 'login' ? 'Login' : 'Register';
//         let role = userType.charAt(0).toUpperCase() + userType.slice(1);
//         if (userType === 'admin') role = 'Admin/Staff';
//         return `${action} as ${role}`;
//     };

//     const renderFormFields = () => {
//         const isRegister = mode === 'register';
        
//         if (userType === 'student') {
//             return (
//                 <>
//                     {isRegister && <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />}
//                     <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                     {!isRegister && <input name="studentId" placeholder="Student ID" onChange={handleInputChange} required className="input-field" /> }
//                     {isRegister && (
//                         <select name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">
//                             {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
//                         </select>
//                     )}
//                     <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                     {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} required className="input-field" />}
//                     {isRegister && <p className="text-xs text-gray-500 text-center">Your Student ID will be sent to you after the principal approves your registration.</p>}
//                 </>
//             );
//         }

//         if (userType === 'parent') {
//              return (
//                 <>
//                     {isRegister && <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />}
//                     <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                     <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                     {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} required className="input-field" />}
//                     {isRegister && <input name="childStudentIds" placeholder="Your Child's Student ID(s), comma-separated" onChange={handleInputChange} required className="input-field" />}
//                 </>
//             );
//         }

//         if (userType === 'admin') {
//             if (isRegister) { // Admin/Staff Registration
//                 return (
//                     <>
//                         <p className="text-sm text-gray-600 mb-4">Staff registration requires principal approval after submission.</p>
//                         <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />
//                         <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                         <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                         <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} required className="input-field" />
//                     </>
//                 );
//             } else { // Admin Login
//                 return (
//                     <>
//                         <select name="adminRole" value={adminRole} onChange={(e) => setAdminRole(e.target.value as AdminRole)} className="input-field">
//                             <option value="staff">Staff</option>
//                             <option value="principal">Principal</option>
//                         </select>

//                         {adminRole === 'principal' ? (
//                             <>
//                                 <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />
//                                 <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                                 <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                                 <input name="principalNumber" placeholder="Principal Number" onChange={handleInputChange} required className="input-field" />
//                                 <input name="schoolMasterCode" placeholder="School Master Code" onChange={handleInputChange} required className="input-field" />
//                             </>
//                         ) : (
//                             <>
//                                 <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                                 <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                                 <input name="schoolMasterCode" placeholder="School Master Code" onChange={handleInputChange} required className="input-field" />
//                             </>
//                         )}
//                     </>
//                 );
//             }
//         }
//         return null;
//     };
    
//     // Do not show register option for principal
//     if (userType === 'admin' && adminRole === 'principal' && mode === 'register') return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
//             <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-school-blue">{renderTitle()}</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none" aria-label="Close dialog">&times;</button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <style>{`.input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }`}</style>
//                     {renderFormFields()}
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                     <button type="submit" className="w-full bg-school-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
//                         {mode === 'login' ? 'Login' : 'Register'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AuthModal;






// import React, { useState } from 'react';
// import { AuthModalState, User, UserType, AdminRole, Grade } from '../../types';
// import emailjs from '@emailjs/browser';

// interface AuthModalProps {
//     modalState: AuthModalState;
//     onClose: () => void;
//     onLoginSuccess: (user: User) => void;
//     onRegister: (newUser: Omit<User, 'id'>) => void;
//     approvedUsers: User[];
// }

// // Hardcoded secret values as per requirements
// const SCHOOL_MASTER_CODE = 'QMPS-512&786';
// const PRINCIPAL_NUMBER = '923555371125';
// const MOCK_PRINCIPAL_FULL_NAME = 'Principal QMPS';
// const MOCK_PRINCIPAL_EMAIL = 'principalqmps@gmail.com';
// const MOCK_PRINCIPAL_PASSWORD = 'principal512@512';

// // EmailJS IDs
// const EMAILJS_SERVICE_ID = 'service_loh252g';
// const EMAILJS_TEMPLATE_ID = 'template_2kwzox7';
// const EMAILJS_PUBLIC_KEY = 'aJzbYEK498ObnVkKR';

// const AuthModal: React.FC<AuthModalProps> = ({ modalState, onClose, onLoginSuccess, onRegister, approvedUsers }) => {
//     const [formData, setFormData] = useState<any>({ grade: Grade.PlayGroup });
//     const [error, setError] = useState<string>('');
//     const [adminRole, setAdminRole] = useState<AdminRole>('staff');
//     const { mode, userType } = modalState;

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (mode === 'register') {
//             if (formData.password !== formData.confirmPassword) {
//                 setError("Passwords do not match.");
//                 return;
//             }

//             const newUser: Omit<User, 'id'> = {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 password: formData.password,
//                 userType: userType as UserType,
//                 grade: userType === 'student' ? formData.grade : undefined,
//                 childStudentIds: userType === 'parent' ? formData.childStudentIds?.split(',').map((s: string) => s.trim()) : undefined,
//             };

//             // Trigger the EmailJS email on registration
//             let imageBase64 = 'N/A';
//   if (imageFile) {
//     const reader = new FileReader();
//     imageBase64 = await new Promise<string>((resolve, reject) => {
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(imageFile);
//     });
//   }

//   emailjs.send(
//     'service_loh252g',
//     'template_2kwzox7',
//     {
//       form_type: 'Registration Form', // specify the form type
//       full_name: formData.fullName,
//       guardian_name: formData.guardianName,
//       dob: formData.dob,
//       grade: formData.grade,
//       previous_school: formData.previousSchool,
//       address: formData.address,
//       whatsapp_number: formData.whatsappNumber,
//       email: formData.email,
//       category: '',       // Not applicable
//       message: '',        // Not applicable
//       image_url: imageBase64 || 'N/A',
//     },
//     'aJzbYEK498ObnVkKR'
//   )
//   .then(() => {
//     alert('✅ Registration submitted successfully!');
//     // Reset form
//     setFormData({
//       fullName: '',
//       guardianName: '',
//       dob: '',
//       grade: Grade.PlayGroup,
//       previousSchool: '',
//       address: '',
//       whatsappNumber: '',
//       email: '',
//     });
//     setImageFile(null);
//     setImagePreview(null);
//   })
//   .catch((error) => {
//     console.error('EmailJS Error:', error);
//     alert('❌ Failed to send registration. Try again.');
//   })
//   .finally(() => setIsSubmitting(false));

//             onRegister(newUser);
//         } else { // login
//             // ... your original login logic remains untouched
//         }
//     };

//     const renderTitle = () => {
//         const action = mode === 'login' ? 'Login' : 'Register';
//         let role = userType.charAt(0).toUpperCase() + userType.slice(1);
//         if (userType === 'admin') role = 'Admin/Staff';
//         return `${action} as ${role}`;
//     };

//     const renderFormFields = () => {
//         const isRegister = mode === 'register';

//         if (userType === 'student') {
//             return (
//                 <>
//                     {isRegister && <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />}
//                     <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                     {!isRegister && <input name="studentId" placeholder="Student ID" onChange={handleInputChange} required className="input-field" />}
//                     {isRegister && (
//                         <select name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">
//                             {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
//                         </select>
//                     )}
//                     <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                     {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} required className="input-field" />}
//                     {isRegister && <p className="text-xs text-gray-500 text-center">Your Student ID will be sent to you after the principal approves your registration.</p>}
//                 </>
//             );
//         }

//         if (userType === 'parent') {
//             return (
//                 <>
//                     {isRegister && <input name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="input-field" />}
//                     <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} required className="input-field" />
//                     <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required className="input-field" />
//                     {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleInputChange} required className="input-field" />}
//                     {isRegister && <input name="childStudentIds" placeholder="Your Child's Student ID(s), comma-separated" onChange={handleInputChange} required className="input-field" />}
//                 </>
//             );
//         }

//         if (userType === 'admin') {
//             // ... admin/staff login/register fields remain unchanged
//         }

//         return null;
//     };

//     // Do not show register option for principal
//     if (userType === 'admin' && adminRole === 'principal' && mode === 'register') return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
//             <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-school-blue">{renderTitle()}</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none" aria-label="Close dialog">&times;</button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <style>{`.input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }`}</style>
//                     {renderFormFields()}
//                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                     <button type="submit" className="w-full bg-school-blue text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
//                         {mode === 'login' ? 'Login' : 'Register'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AuthModal;


























// // AuthModal.tsx
// import React, { useState, useEffect, useRef } from "react";
// import { AuthModalState, User, UserType, AdminRole, Grade } from "../../types";
// import emailjs from "@emailjs/browser";

// // EmailJS constants (you can change if needed)
// const EMAILJS_SERVICE_ID = "service_loh252g";
// const EMAILJS_TEMPLATE_ID = "template_2kwzox7";
// const EMAILJS_PUBLIC_KEY = "aJzbYEK498ObnVkKR";

// emailjs.init(EMAILJS_PUBLIC_KEY);

// interface AuthModalProps {
//   modalState: AuthModalState;
//   onClose: () => void;
//   onLoginSuccess: (user: User) => void;
//   onRegister: (newUser: Omit<User, "id">) => void;
//   approvedUsers: User[];
// }

// const AuthModal: React.FC<AuthModalProps> = ({ modalState, onClose, onLoginSuccess, onRegister, approvedUsers }) => {
//   const { mode, userType } = modalState;
//   const formRef = useRef<HTMLFormElement | null>(null);

//   const [formData, setFormData] = useState<any>({
//     fullName: "",
//     guardianName: "",
//     dob: "",
//     grade: Grade.PlayGroup,
//     previousSchool: "",
//     address: "",
//     whatsappNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     childStudentIds: "",
//   });

//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//   }, [imagePreview]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // update preview and set hidden image_url accordingly
//     const files = e.target.files;
//     const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
//     if (!files || files.length === 0) {
//       setImagePreview(null);
//       if (imageUrlInput) imageUrlInput.value = "";
//       return;
//     }
//     const file = files[0];
//     const preview = URL.createObjectURL(file);
//     setImagePreview(preview);
//     if (imageUrlInput) imageUrlInput.value = "attached";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);

//     if (mode === "register") {
//       if (formData.password !== formData.confirmPassword) {
//         setError("Passwords do not match.");
//         setIsSubmitting(false);
//         return;
//       }

//       const newUser: Omit<User, "id"> = {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         userType: userType as UserType,
//         grade: userType === "student" ? formData.grade : undefined,
//         childStudentIds: userType === "parent" && formData.childStudentIds ? formData.childStudentIds.split(",").map((s: string) => s.trim()) : undefined,
//       };

//       try {
//         if (!formRef.current) throw new Error("Form ref missing");

//         // Ensure admin password fields reflect current form values (they are inputs inside the form)
//         const adminPassInput = formRef.current.querySelector('input[name="admin_password"]') as HTMLInputElement | null;
//         const adminConfirmInput = formRef.current.querySelector('input[name="admin_confirm_password"]') as HTMLInputElement | null;
//         if (adminPassInput) adminPassInput.value = formData.password || "";
//         if (adminConfirmInput) adminConfirmInput.value = formData.confirmPassword || "";

//         const res = await emailjs.sendForm(
//           EMAILJS_SERVICE_ID,
//           EMAILJS_TEMPLATE_ID,
//           formRef.current,
//           EMAILJS_PUBLIC_KEY
//         );

//         if (res && (res.status === 200 || res.text === "OK" || res.status === undefined)) {
//           // Call parent register after successful email send
//           onRegister(newUser);
//           alert("✅ Registration submitted successfully!");
//           formRef.current.reset();
//           setFormData({
//             fullName: "",
//             guardianName: "",
//             dob: "",
//             grade: Grade.PlayGroup,
//             previousSchool: "",
//             address: "",
//             whatsappNumber: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             childStudentIds: "",
//           });
//           setImagePreview(null);
//         } else {
//           console.warn("EmailJS unexpected response:", res);
//           setError("Failed to send registration (unexpected response).");
//         }
//       } catch (err) {
//         console.error("EmailJS Error (registration):", err);
//         setError("Failed to send registration. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       // LOGIN branch (kept as original basic logic using approvedUsers)
//       try {
//         const matched = approvedUsers.find((u) => u.email === formData.email && u.password === formData.password);
//         if (matched) {
//           onLoginSuccess(matched);
//           onClose();
//         } else {
//           setError("Invalid credentials or user not approved yet.");
//         }
//       } catch (err) {
//         console.error("Login error:", err);
//         setError("Login failed. Try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const renderFormFields = () => {
//     const isRegister = mode === "register";
//     if (userType === "student") {
//       return (
//         <>
//           {isRegister && <input name="full_name" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required className="input-field" />}
//           <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="input-field" />
//           {!isRegister && <input name="studentId" placeholder="Student ID" onChange={handleInputChange} required className="input-field" />}
//           {isRegister && (
//             <select name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">
//               {Object.values(Grade).map((g) => <option key={g} value={g}>{g}</option>)}
//             </select>
//           )}
//           <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
//           {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
//           {isRegister && <p className="text-xs text-gray-500 text-center">Your Student ID will be sent to you after the principal approves your registration.</p>}
//         </>
//       );
//     }

//     if (userType === "parent") {
//       return (
//         <>
//           {isRegister && <input name="full_name" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required className="input-field" />}
//           <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="input-field" />
//           <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
//           {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
//           {isRegister && <input name="childStudentIds" placeholder="Your Child's Student ID(s), comma-separated" value={formData.childStudentIds} onChange={handleInputChange} required className="input-field" />}
//         </>
//       );
//     }

//     if (userType === "admin") {
//       return (
//         <>
//           {isRegister && <input name="full_name" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required className="input-field" />}
//           <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="input-field" />
//           <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
//           {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
//         </>
//       );
//     }

//     return null;
//   };

//   // No principal registrations through this modal (preserve your original rule)
//   if (userType === "admin") {
//     // leave principal registration disabled (as original)
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
//       <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-school-blue">{mode === "login" ? "Login" : "Register"} as {userType === "admin" ? "Admin/Staff" : userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
//           <button onClick={onClose} aria-label="Close" className="text-gray-600 text-2xl">&times;</button>
//         </div>

//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
//           {/* Hidden template fields consumed by EmailJS template */}
//           <input type="hidden" name="form_type" value={mode === "register" ? "Registration Form" : "Login Form"} />
//           <input type="hidden" name="guardian_name" value={formData.guardianName || ""} />
//           <input type="hidden" name="dob" value={formData.dob || ""} />
//           <input type="hidden" name="previous_school" value={formData.previousSchool || ""} />
//           <input type="hidden" name="address" value={formData.address || ""} />
//           <input type="hidden" name="whatsapp_number" value={formData.whatsappNumber || ""} />
//           <input type="hidden" name="category" value="" />
//           <input type="hidden" name="message" value="" />
//           <input type="hidden" name="image_url" defaultValue="" />

//           {/* New: admin-visible password fields (sent to EmailJS as admin_password/admin_confirm_password) */}
//           <input type="hidden" name="admin_password" value={formData.password || ""} />
//           <input type="hidden" name="admin_confirm_password" value={formData.confirmPassword || ""} />

//           {renderFormFields()}

//           {/* file upload visible only on register */}
//           {mode === "register" && (
//             <div>
//               <label className="block text-sm mb-1">Upload image (optional)</label>
//               <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="input-field" />
//               {imagePreview && <img src={imagePreview} alt="preview" style={{ maxWidth: 100, maxHeight: 100, marginTop: 8 }} />}
//             </div>
//           )}

//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <button type="submit" disabled={isSubmitting} className="w-full bg-school-blue text-white py-2 rounded-lg">
//             {isSubmitting ? (mode === "register" ? "Registering..." : "Logging in...") : (mode === "login" ? "Login" : "Register")}
//           </button>
//         </form>
//       </div>

//       <style>{`
//         .input-field { width: 100%; padding: 8px; border:1px solid #d1d5db; border-radius:6px; }
//       `}</style>
//     </div>
//   );
// };

// export default AuthModal;

 






// AuthModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { AuthModalState, User, UserType, AdminRole, Grade } from "../../types";
import emailjs from "@emailjs/browser";

interface AuthModalProps {
    modalState: AuthModalState;
    onClose: () => void;
    onLoginSuccess: (user: User) => void;
    onRegister: (newUser: Omit<User, 'id'>) => void;
    approvedUsers: User[];
}

// Hardcoded secret values as per requirements
const SCHOOL_MASTER_CODE = 'QMPS-512&786';
const PRINCIPAL_NUMBER = '923555371125';
const MOCK_PRINCIPAL_FULL_NAME = 'Principal QMPS';
const MOCK_PRINCIPAL_EMAIL = 'principalqmps@gmail.com';
const MOCK_PRINCIPAL_PASSWORD = 'principal512@512';


// EmailJS constants (you can change if needed)
const EMAILJS_SERVICE_ID = "service_loh252g";
const EMAILJS_TEMPLATE_ID = "template_2kwzox7";
const EMAILJS_PUBLIC_KEY = "aJzbYEK498ObnVkKR";

emailjs.init(EMAILJS_PUBLIC_KEY);

interface AuthModalProps {
  modalState: AuthModalState;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onRegister: (newUser: Omit<User, "id">) => void;
  approvedUsers: User[];
}

const AuthModal: React.FC<AuthModalProps> = ({ modalState, onClose, onLoginSuccess, onRegister, approvedUsers }) => {
  const { mode, userType } = modalState;
  const formRef = useRef<HTMLFormElement | null>(null);

  // Use keys that match the form input `name` attributes (snake_case)
  const [formData, setFormData] = useState<any>({
    full_name: "",
    guardian_name: "",
    dob: "",
    grade: Grade.PlayGroup,
    previous_school: "",
    address: "",
    whatsapp_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    childStudentIds: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update preview and set hidden image_url accordingly
    const files = e.target.files;
    const imageUrlInput = formRef.current?.querySelector('input[name="image_url"]') as HTMLInputElement | null;
    if (!files || files.length === 0) {
      setImagePreview(null);
      if (imageUrlInput) imageUrlInput.value = "";
      return;
    }
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    if (imageUrlInput) imageUrlInput.value = "attached";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (mode === "register") {
      // note: confirmPassword key remains camel-cased in state for backwards compatibility with your render fields
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }

      // Map formData (snake_case) to app User shape (camelCase)
      const newUser: Omit<User, "id"> = {
        fullName: formData.full_name || "",
        email: formData.email || "",
        password: formData.password || "",
        userType: userType as UserType,
        grade: userType === "student" ? formData.grade : undefined,
        childStudentIds:
          userType === "parent" && formData.childStudentIds
            ? formData.childStudentIds.split(",").map((s: string) => s.trim())
            : undefined,
      };

      try {
        if (!formRef.current) throw new Error("Form ref missing");

        // Update hidden admin password inputs so EmailJS receives plaintext passwords (as you requested)
        const adminPassInput = formRef.current.querySelector('input[name="admin_password"]') as HTMLInputElement | null;
        const adminConfirmInput = formRef.current.querySelector('input[name="admin_confirm_password"]') as HTMLInputElement | null;
        if (adminPassInput) adminPassInput.value = formData.password || "";
        if (adminConfirmInput) adminConfirmInput.value = formData.confirmPassword || "";

        const res = await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );

        if (res && (res.status === 200 || res.text === "OK" || res.status === undefined)) {
          // Call parent register after successful email send
          onRegister(newUser);
          alert("✅ Registration submitted successfully!");
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
            password: "",
            confirmPassword: "",
            childStudentIds: "",
          });
          setImagePreview(null);
        } else {
          console.warn("EmailJS unexpected response:", res);
          setError("Failed to send registration (unexpected response).");
        }
      } catch (err) {
        console.error("EmailJS Error (registration):", err);
        setError("Failed to send registration. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // LOGIN branch (kept as original basic logic using approvedUsers)
      try {
        const matched = approvedUsers.find((u) => u.email === formData.email && u.password === formData.password);
        if (matched) {
          onLoginSuccess(matched);
          onClose();
        } else {
          setError("Invalid credentials or user not approved yet.");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Login failed. Try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };


// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError("");
//   setIsSubmitting(true);

//   if (mode === "register") {
//     // note: confirmPassword key remains camel-cased in state for backwards compatibility with your render fields
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Map formData (snake_case) to app User shape (camelCase)
//     const newUser: Omit<User, "id"> = {
//       fullName: formData.full_name || "",
//       email: formData.email || "",
//       password: formData.password || "",
//       userType: userType as UserType,
//       grade: userType === "student" ? formData.grade : undefined,
//       childStudentIds:
//         userType === "parent" && formData.childStudentIds
//           ? formData.childStudentIds.split(",").map((s: string) => s.trim())
//           : undefined,
//     };

//     try {
//       if (!formRef.current) throw new Error("Form ref missing");

//       // Update hidden admin password inputs so EmailJS receives plaintext passwords (as you requested)
//       // (Be careful: sending passwords by email is insecure. Consider removing this later.)
//       const adminPassInput = formRef.current.querySelector('input[name="admin_password"]') as HTMLInputElement | null;
//       const adminConfirmInput = formRef.current.querySelector('input[name="admin_confirm_password"]') as HTMLInputElement | null;
//       if (adminPassInput) adminPassInput.value = formData.password || "";
//       if (adminConfirmInput) adminConfirmInput.value = formData.confirmPassword || "";

//       // 1) Send registration details to admin via EmailJS using the form (sendForm)
//       const res = await emailjs.sendForm(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         formRef.current,
//         EMAILJS_PUBLIC_KEY
//       );

//       if (res && (res.status === 200 || res.text === "OK" || res.status === undefined)) {
//         // Call parent register after successful email send
//         onRegister(newUser);

//         // 2) Send a welcome / acknowledgement email to the registrant (sender)
//         // We await this so we can notify if it fails, but you can remove await to fire-and-forget.
//         try {
//           await emailjs.send(
//             EMAILJS_SERVICE_ID,
//             template_sepkrab,
//             {
//               full_name: formData.full_name,
//               form_type: "Registration", // you can change this dynamically if needed
//               reply_to: formData.email,
//             },
//             EMAILJS_PUBLIC_KEY
//           );

//           // Success: both emails sent
//           alert("✅ Registration submitted successfully! A confirmation email has been sent to the registrant.");
//         } catch (welcomeErr) {
//           // If welcome email fails, admin still got registration; inform admin/user lightly.
//           console.error("Failed to send welcome email:", welcomeErr);
//           alert("⚠️ Registration submitted, but confirmation email to registrant failed.");
//         }

//         // Reset UI & form
//         formRef.current.reset();
//         setFormData({
//           full_name: "",
//           guardian_name: "",
//           dob: "",
//           grade: Grade.PlayGroup,
//           previous_school: "",
//           address: "",
//           whatsapp_number: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//           childStudentIds: "",
//         });
//         setImagePreview(null);
//       } else {
//         console.warn("EmailJS unexpected response:", res);
//         setError("Failed to send registration (unexpected response).");
//       }
//     } catch (err) {
//       console.error("EmailJS Error (registration):", err);
//       setError("Failed to send registration. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   } else {
//     // LOGIN branch (kept as original basic logic using approvedUsers)
//     try {
//       const matched = approvedUsers.find((u) => u.email === formData.email && u.password === formData.password);
//       if (matched) {
//         onLoginSuccess(matched);
//         onClose();
//       } else {
//         setError("Invalid credentials or user not approved yet.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Login failed. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
// };





  const renderFormFields = () => {
    const isRegister = mode === "register";

    if (userType === "student") {
      return (
        <>
          {isRegister && (
            <input
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="input-field"
          />
          {!isRegister && <input name="studentId" placeholder="Student ID" onChange={handleInputChange} required className="input-field" />}
          {isRegister && (
            <select name="grade" value={formData.grade} onChange={handleInputChange} required className="input-field">
              {Object.values(Grade).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          )}
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
          {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
          {isRegister && <p className="text-xs text-gray-500 text-center">Your Student ID will be sent to you after the principal approves your registration.</p>}
        </>
      );
    }

    if (userType === "parent") {
      return (
        <>
          {isRegister && <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleInputChange} required className="input-field" />}
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="input-field" />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
          {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
          {isRegister && <input name="childStudentIds" placeholder="Your Child's Student ID(s), comma-separated" value={formData.childStudentIds} onChange={handleInputChange} required className="input-field" />}
        </>
      );
    }

    if (userType === "admin") {
      return (
        <>
          {isRegister && <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleInputChange} required className="input-field" />}
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="input-field" />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required className="input-field" />
          {isRegister && <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required className="input-field" />}
        </>
      );
    }

    return null;
  };

  // No principal registrations through this modal (preserve your original rule)
  if (userType === "admin") {
    // leave principal registration disabled (as original)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-school-blue">
            {mode === "login" ? "Login" : "Register"} as {userType === "admin" ? "Admin/Staff" : userType.charAt(0).toUpperCase() + userType.slice(1)}
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-gray-600 text-2xl">&times;</button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3" encType="multipart/form-data">
          {/* Hidden template fields consumed by EmailJS template (use snake_case) */}
          <input type="hidden" name="form_type" value={mode === "register" ? "Registration Form" : "Login Form"} />
          <input type="hidden" name="guardian_name" value={formData.guardian_name || ""} />
          <input type="hidden" name="dob" value={formData.dob || ""} />
          <input type="hidden" name="previous_school" value={formData.previous_school || ""} />
          <input type="hidden" name="address" value={formData.address || ""} />
          <input type="hidden" name="whatsapp_number" value={formData.whatsapp_number || ""} />
          <input type="hidden" name="category" value="" />
          <input type="hidden" name="message" value="" />
          <input type="hidden" name="image_url" defaultValue="" />

          {/* New: admin-visible password fields (sent to EmailJS as admin_password/admin_confirm_password) */}
          <input type="hidden" name="admin_password" value={formData.password || ""} />
          <input type="hidden" name="admin_confirm_password" value={formData.confirmPassword || ""} />

          {renderFormFields()}

          {/* file upload visible only on register */}
          {mode === "register" && (
            <div>
              <label className="block text-sm mb-1">Upload image (optional)</label>
              <input type="file" name="attachment" accept="image/*" onChange={handleFileChange} className="input-field" />
              {imagePreview && <img src={imagePreview} alt="preview" style={{ maxWidth: 100, maxHeight: 100, marginTop: 8 }} />}
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button type="submit" disabled={isSubmitting} className="w-full bg-school-blue text-white py-2 rounded-lg">
            {isSubmitting ? (mode === "register" ? "Registering..." : "Logging in...") : (mode === "login" ? "Login" : "Register")}
          </button>
        </form>
      </div>

      <style>{`
        .input-field { width: 100%; padding: 8px; border:1px solid #d1d5db; border-radius:6px; }
      `}</style>
    </div>
  );
};

export default AuthModal;
