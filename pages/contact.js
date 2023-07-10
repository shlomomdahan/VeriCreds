import Head from 'next/head'
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { getSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = (props) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState('');

    // const [noOfVerifications, setNoOfVerifications] = useState(0);
    const [dynamicAction, setDynamicAction] = useState('homepage');
    // const [actionToChange, setActionToChange] = useState('');

    const clickHandler = useCallback(async () => {
        if (!executeRecaptcha) {
            return;
        }

        const result = await executeRecaptcha('dynamicAction');

        setToken(result);
        // setNoOfVerifications(noOfVerifications => noOfVerifications + 1);
    }, [dynamicAction, executeRecaptcha]);

    useEffect(() => {
        if (!executeRecaptcha || !dynamicAction) {
            return;
        }

        let handleReCaptchaVerify;
        handleReCaptchaVerify = async () => {
            const token = await executeRecaptcha(dynamicAction);
            setToken(token);
            // setNoOfVerifications(noOfVerifications => noOfVerifications + 1);
        };

        handleReCaptchaVerify();
    }, [executeRecaptcha, dynamicAction]);

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();

        if (!executeRecaptcha) {
          console.log("Execute recaptcha not yet available");
          return;
        }

        executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
            console.log(gReCaptchaToken, "response Google reCaptcha server");
            setToken(gReCaptchaToken);
            submitEnquiryForm(gReCaptchaToken);
        });

        setLoading(false);

        }, [executeRecaptcha, email, subject, message, token]
    );

    const submitEnquiryForm = async (gReCaptchaToken) => {

        await axios.post("/api/contactUs", {
            email: email,
            subject: subject,
            message: message,
            gReCaptchaToken: gReCaptchaToken,
        }, {
            // headers: {
            //     Accept: "application/x-www-form-urlencoded",
            //     "Content-Type": "application/x-www-form-urlencoded",
            // }
        }).then(async (res) => {
            console.log(res);
            console.log(res.data);
            setLoading(true);
            if (res.data.status !== "error") {
                toast.success("Message sent successfully");
            } else {
                toast.error("An error occurred while sending the message");
            }
        });
    };

    return (
        <>
            <Head>
                <title>VeriCreds | Contact</title>
                <meta name="description" content="VeriCreds app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col h-screen">
                <div className="topbar bg-gray-200 top-0">
                    <Topbar />
                </div>
                <div className="flex flex-grow">
                    <div className="sidebar w-64 bg-gray-100 flex-shrink-0">
                        <Sidebar />
                    </div>
                    <div className="content flex-grow bg-white p-6">
                        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                        <form
                          onSubmit={handleSubmitForm}
                          className="space-y-4"
                        >
                            <input
                                onChange={(e) => {
                                    setEmail(e?.target?.value)
                                }}
                                value={email}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <input
                                onChange={(e) => {
                                    setSubject(e?.target?.value)
                                }}
                                value={subject}
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <textarea
                                onChange={(e) => {
                                    setMessage(e?.target?.value);
                                }}
                                value={message}
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                required
                            />
                            <button
                              type="submit"
                              disabled={loading}
                              className={`py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                Send Message
                            </button>
                            {token && <p>Token: {token}</p>}
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} />
        </>
    );
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.user
        }
    }
}

export default Contact;
