'use client';

import React from 'react'
import { useState, useEffect } from 'react';

function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleOnSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = {}
        Array.from(e.currentTarget.elements).forEach(field => {
            if (!field.name) return;
            formData[field.name] = field.value;
        });
        fetch("/api/contact", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.ok) {
                console.log("Message Sent Successfully");
                setLoading(false);

                //reset form
                e.target.name.value = "";
                e.target.email.value = "";
                e.target.option.value = "";
                e.target.budget.value = "";
                e.target.message.value = "";

                setSuccess(true);
                setTimeout(function () {
                    setSuccess(false);
                }, 10000);
            }
        }).catch((error)=> {
            console.log("Error Sending Message: " + error)
            setLoading(false);
        })
        console.log(formData);
    }

  return (
    <>
    <form method="post" className="w-3/4 sm:w-96" onSubmit={handleOnSubmit}>
        <div className="py-12">
            <div className="mt-8">
                <div className="grid grid-cols-1 gap-6">
                    {success ? <div><p className="text-center font-bold text-pink-400">Your request has been sent! We will get back to you as soon as possible!</p></div> : null}

                    <label htmlFor="name" className="">
                        <span className="text-gray-700">Full name</span>
                        <input
                        name="name"
                        required
                        type="text"
                        className="input-section"
                        placeholder=""
                        />  
                    </label>

                    <label htmlFor="email" className="">
                        <span className="text-gray-700">Email address</span>
                        <input
                        name="email"
                        required
                        type="email"
                        className="input-section"
                        placeholder=""
                        />
                    </label>

                    <label htmlFor="option" className="">
                        <span className="text-gray-700">Options</span>
                        <select
                        name="option"
                        required
                        type="text"
                        className="input-section"
                        // placeholder=""
                        >  
                        <option value="bracelet">Bracelet</option>
                        <option value="necklace">Necklace</option>
                        <option value="anklet">Anklet</option>
                        <option valaue="earings">Earings</option>
                        <option valaue="chrochet">A Set (specify in Message below)</option>
                        <option value="other">Other (specify in Message below)</option>
                        </select>
                    </label>

                    <label htmlFor="budget" className="">
                        <span className="text-gray-700">Budget <br></br></span>
                        <span className="text-sm text-gray-500">For example, $10-20, $30-40, etc.</span>
                        <input
                        name="budget"
                        required
                        type="text"
                        className="input-section"
                        placeholder=""
                        />  
                    </label>

                    <label htmlFor="message" className="">
                        <span className="text-gray-700">Message <br></br></span>
                        <span className="text-sm w-24 text-gray-500">Please indicate styles/inspirations and color palette. List any questions or concerns here as well!</span>
                        <textarea
                        name="message"
                        required
                        minLength={10}
                        maxLength={500}
                        className="input-section"
                        rows="3"
                        ></textarea>
                    </label>

                    <button 
                    type="submit"
                    disabled={loading}
                    className="place-self-center w-24 bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded-full disabled:bg-pink-400/50">Submit</button>
                </div>
            </div>
        </div>
        </form>
    </>
  )
}

export default ContactForm