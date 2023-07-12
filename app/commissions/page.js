import React from "react";
import Link from 'next/link';
import ContactForm from "./ContactForm";

function Commissions(){

  return (
    <>
    <div className="grid place-items-center">
        <p className="text-center text-4xl mt-10">Custom Commission Request</p>
        <p className="text-center text-base mt-5 w-3/4 sm:w-1/2"> 
          ✧.* Commission for custom pieces are currently open! *.✧
            <br/> 
          Send me an <a href="mailto:joobyrumi@gmail.com" className="transition duration-150 border-b-2 border-transparent hover:border-pink-300 hover:text-pink-300">email</a> or send a pm to my Instagram <a href="https://www.instagram.com/joobyrumi/" className="transition duration-150 border-b-2 border-transparent hover:border-pink-300 hover:text-pink-300">@joobyrumi</a>.
            <br/>
          Otherwise, fill out a request below!
        </p>
        <ContactForm/>
    </div>
    </>
  )
};
export default Commissions;