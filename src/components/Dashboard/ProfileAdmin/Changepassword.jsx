import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { passwordReset } from '../../../api/auth'; // Implement this function in your API
import LeftBar from './../../Dashboard/LeftBar';
import Navbar from './../../Dashboard/NavBar';

function Changepassword() {
    const { token } = useParams(); // Get the token from the URL parameters
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('The email is required'),
        password: yup.string().required('The password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'The passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await passwordReset(values);
                toast.success('Password changed successfully');
                setTimeout(() => {
                    navigate('/ProfileEditor');
                }, 2000);
                console.log(values);
            } catch (error) {
                toast.error('There was an error changing the password');
                console.error(error);
            }
        },
    });

    useEffect(() => {
        setPasswordsMatch(formik.values.password === formik.values.confirmPassword);
    }, [formik.values.password, formik.values.confirmPassword]);

    const [isLeftBarVisible, setIsLeftBarVisible] = useState(false);

    const handleLeftBarVisibilityChange = (isVisible) => {
        setIsLeftBarVisible(isVisible);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600">
            <div className="flex h-screen overflow-hidden flex-1">
                <LeftBar onVisibilityChange={handleLeftBarVisibilityChange} />
                <div className={`w-full transition-all duration-300 ${isLeftBarVisible ? 'ml-44' : ''}`}>
                    <Navbar />
                    <ToastContainer />
                    <div className="flex w-2/5  mx-auto justify-center items-center mt-20">
                        <div className="p-6 bg-white rounded-3xl shadow-2xl w-4/5 bg-gradient-to-r from-violet-600 to-rose-500">
                            <h2 className="text-5xl font-black text-center mb-2 text-white">Change Password</h2>
                            <form onSubmit={formik.handleSubmit} className="py-10 flex flex-col space-y-6">
                                <div>
                                    <label className="text-lg font-bold text-white block mb-4 mx-4">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                        placeholder="Email"
                                    />
                                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                </div>
                                <div>
                                    <label className="text-lg font-bold text-white block mb-4 mx-4">New password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3 border border-cyan-300 rounded-full bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                        placeholder="New password"
                                    />
                                    {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                </div>
                                <div>
                                    <label className="text-lg font-bold text-white block mb-4 mx-4">Confirm password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3 border border-cyan-300 rounded-full mb-2 bg-pink-100 placeholder-gray-450 focus:outline-sky-600 focus:border-sky-950 focus:bg-slate-200"
                                        placeholder="Confirm password"
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                                </div>
                                {error && <div className="text-red-500">{error}</div>}
                                <button
                                    className={`w-48 text-center block mt-10 mx-auto py-2 font-medium text-white rounded-full text-xl ${passwordsMatch ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled:opacity-50`}
                                    type="submit"
                                    disabled={!formik.isValid || !passwordsMatch}
                                >
                                    Change password
                                </button>
                            </form>
                            <div className="text-center">
                                <Link
                                    to="/ProfileEditor"
                                    className="text-white hover:bg-gradient-to-r from-green-600 to-green-500 shadow-lg shadow-red-300 font-semibold inline-flex space-x-1 items-center"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Return to Settings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Changepassword;
