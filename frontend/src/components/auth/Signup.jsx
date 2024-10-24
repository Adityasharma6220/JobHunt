import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("firstname", input.firstname);
        formData.append("lastname", input.lastname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto p-4'>
                <form onSubmit={submitHandler} className='w-full md:w-3/4 lg:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    
                    {/* First Name */}
                    <div className='my-2'>
                        <Label>First Name *</Label>
                        <Input
                            type="text"
                            value={input.firstname}
                            name="firstname"
                            onChange={changeEventHandler}
                            placeholder="Aditya"
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Last Name */}
                    <div className='my-2'>
                        <Label>Last Name *</Label>
                        <Input
                            type="text"
                            value={input.lastname}
                            name="lastname"
                            onChange={changeEventHandler}
                            placeholder="Sharma"
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Email */}
                    <div className='my-2'>
                        <Label>Email *</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="aditya@gmail.com"
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Phone Number */}
                    <div className='my-2'>
                        <Label>Phone Number *</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Password */}
                    <div className='my-2'>
                        <Label>Password *</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="*****"
                            required
                            className='w-full'
                        />
                    </div>

                    {/* Role Selection & File Upload */}
                    <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                        <RadioGroup className="flex flex-col md:flex-row items-start md:items-center gap-4 my-5 w-full">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    id="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    id="r2"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="domesticworker"
                                    checked={input.role === 'domesticworker'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    id="r3"
                                />
                                <Label htmlFor="r3">Domestic</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Signup
                            </Button>
                        )
                    }

                    <span className='text-sm'>
                        Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup;
