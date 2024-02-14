import React, { useState } from "react";
import { TERipple } from "tw-elements-react";

export default function Register(){
    const customControlStyles = base => ({
        height: 5,
        minHeight: 5
    });
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedOption, setSelectedOption] = useState('staff');

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
      };

    const handleEmailChange = (event) => {
    setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    };

    const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform signup logic here using the collected data
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Selected Country:', selectedCountry);
    };
    return (
        <div className="flex flex-wrap justify-center h-screen items-center text-neutral-800 dark:text-neutral-200">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div>
                    <div>
                        <div className="md:mx-6 md:p-12">
                            {/* <!--Logo--> */}
                            <div className="text-center">
                                <h4 className="mb-2 mt-1 pb-1 text-xl font-semibold">
                                    Sindh Revenue Board
                                </h4>
                                <img
                                    className="mx-auto w-48 mb-6"
                                    src="src\images\srb-logo.png"
                                    alt="logo"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="text-center">
                                    <p className="mb-12 pb-1 text-2xl font-semibold">Account Creation</p>
                                </div>
                                    {/* <!--Username input--> */}
                                <div className="text-center flex flex-row">
                                    <div>
                                        <p>Enter username</p>
                                        <input type="text"
                                            className="mb-4 mx-5"
                                            required
                                        />
                                    </div>
                                {/* <!--Password input--> */}
                                    <div>
                                        <p>Enter email</p>
                                        <input
                                            type="email"
                                            className="mb-5 mx-5"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="text-center flex flex-row">
                                    <div>
                                        <p>Enter password</p>
                                            <input
                                                type="email"
                                                className="mb-5 mx-5"
                                                required
                                            />
                                    </div>
                                    <div>
                                        <p>Enter phone number</p>
                                            <input
                                                type="tel"
                                                className="mb-5 mx-5"
                                                required
                                            />
                                    </div>
                                </div>
                                <label>
                                    <input
                                    className="ml-5 mr-2"
                                    type="radio"
                                    value="staff"
                                    checked={selectedOption === 'staff'}
                                    onChange={handleOptionChange}
                                    />
                                    <p className="mr-5 inline">Staff</p>
                                </label>

                                <label>
                                    <input
                                    className="mr-2"
                                    type="radio"
                                    value="management"
                                    checked={selectedOption === 'management'}
                                    onChange={handleOptionChange}
                                    />
                                    Management
                                </label>
                                

                                {/* <!--Submit button--> */}
                                <div className="mb-12 mt-12 pb-1 pt-1 text-center">
                                    <TERipple rippleColor="light" className="w-full">
                                    <button
                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                        type="button"
                                        style={{
                                        background:
                                            "linear-gradient(to right, #009739, #006a33, #005c2e, #004726)",
                                        }}
                                    >
                                        Create Account
                                    </button>
                                    </TERipple>

                                </div>

                                {/* <!--Register button--> */}
                                <div className="flex items-center justify-center pb-6">
                                    <p className="mb-0 mr-2">Have an account?</p>
                                    <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    >
                                        Login
                                    </button>
                                    </TERipple>
                                </div>
                            </form>
                        </div>
                        </div>

                        {/* <!-- Right column container with background and description--> */}
                        {/* <div
                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                        style={{
                            background:
                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                        }}
                        >
                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                            <h4 className="mb-6 text-xl font-semibold">
                            We are more than just a company
                            </h4>
                            <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                        </div> */}
                    </div>
            </div>
        </div>
    );
}