import React, { useState } from 'react';
import { Link } from 'react-router'; // ✅ FIX: use react-router-dom, not react-router
import { Heart } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js'
import { signup } from '../lib/api.js';

const SignUpPage = () => {
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const queryClient = useQueryClient();

    const { mutate: signupMutation, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });

        },
    });

    const handleSignup = (e) => {
        e.preventDefault();
        signupMutation(signupData);
    };

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="valentine">
            <div className="border border-neutral/20 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-md overflow-hidden">

                {/* FORM SECTION */}
                <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">

                    {/* HEADER */}
                    <div className="mb-6 flex items-center gap-2">
                        <Heart className="size-9 text-rose-500" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            UBae
                        </span>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error.response.data.message || "Signup failed"}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div>
                            <h2 className="text-xl font-medium">Sign up</h2>
                            <p className="text-sm text-neutral/70 mt-1">
                                Meet new people at your university.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {/* FULL NAME */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. alishba"
                                    className="input input-bordered w-full"
                                    value={signupData.fullName}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, fullName: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            {/* EMAIL */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">University Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="yourname@uni.edu.pk"
                                    className="input input-bordered w-full"
                                    value={signupData.email}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    className="input input-bordered w-full"
                                    value={signupData.password}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* TERMS */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input type="checkbox" className="checkbox checkbox-sm" required />
                                <span className="text-xs">
                                    I agree to the terms and privacy policy.
                                </span>
                            </label>
                        </div>

                        <button className="btn btn-primary w-full" type="submit">
                            {isPending ? (
                                <>
                                    <span className="loading loading-spinner loading-xs"></span>
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                        <div className="text-center mt-4 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>

                {/* IMAGE SECTION */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-rose-50 items-center justify-center">
                    <div className="max-w-md p-10">
                        <img
                            src="/i.png"
                            alt="University community"
                            className="w-full h-auto rounded-xl shadow"
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-medium text-neutral">
                                connect with differnt peoples
                            </h3>
                            <p className="text-sm text-neutral/60 mt-1">
                                connect with different language background
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;
