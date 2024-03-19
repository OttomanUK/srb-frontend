import React, { useState } from 'react';
import Sidebar from '../components/resuseable_components/Sidebar';
import Header from '../components/resuseable_components/Header';
import { TERipple } from "tw-elements-react";
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner';
import { useDispatch } from 'react-redux'; // Import useDispatch for Redux dispatch

function Query() {
    const [formValues, setFormValues] = useState({
        hostName: '',
        address: '',
        userName: '',
        password: '',
        query1: '',
        query2: '',
        contamination: 0.05,
        MinCluster: 10,
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', formValues);

        try {
            const a = await dispatch(login(formValues));
            const b = a && (await dispatch(getUserRole()));

            if (b) navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Oops! Something went wrong.');
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <WelcomeBanner greeting='Load Latest Data' />
                <form onSubmit={handleSubmit} className="w-full max-w-lg px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        {Object.keys(formValues).map((key, index) => (
                            <div key={index} className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
                                </label>
                                <input onChange={handleChange} value={formValues[key]} name={key} className="appearance-none block w-full bg-gray-200 text-gray-700 dark:text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id={key} type="text" />
                            </div>
                        ))}
                    </div>
                    <div className="mb-12 mt-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                            <button
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="submit"
                                style={{
                                    background: "linear-gradient(to right, #009739, #006a33, #005c2e, #004726)",
                                }}
                            >
                                Run Query
                            </button>
                        </TERipple>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Query;
