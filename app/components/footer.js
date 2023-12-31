import React from 'react';
import Link from 'next/link';

function footer() {
  return (
    <>
    <div className="">
        <hr className="w-24 h-px mx-auto my-4 bg-neutral-400 border-0 rounded md:my-10 "/>
        <div className="mb-10 mx-12 sm:mx-56 flex justify-between">
            <div className="flex space-x-2 ">
                <Link href="https://www.instagram.com/joobyrumi/" target="_blank" rel="noopener noreferrer">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </Link>
                {/* <Link href="/">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="m0,167.9c0,-54.5 38.884,-88 101.06,-88l64.373,0l0,-79.9l80.567,0l0,251l-145.24,0c-61.877,0 -100.76,-32.2 -100.76,-83.1zm85,-2.7c0,20.9 12.653,31.8 36.96,31.8l43.04,0l0,-64l-42.64,0c-24.31,0 -37.36,11 -37.36,32.2zm682,-0.1c0,54.5 -38.884,88 -101.06,88l-64.373,0l0,79.9l-80.567,0l0,-251l145.24,0c61.877,0 100.76,32.2 100.76,83.1zm-85,2.7c0,-20.9 -12.668,-31.8 -37.007,-31.8l-42.993,0l0,64l42.693,0c24.34,0 37.307,-11 37.307,-32.2zm613,-2.7c0,54.5 -38.884,88 -101.06,88l-64.373,0l0,79.9l-80.567,0l0,-251l145.24,0c61.876,0 100.76,32.2 100.76,83.1zm-85,2.7c0,-20.9 -12.668,-31.8 -37.007,-31.8l-42.993,0l0,64l42.693,0c24.34,0 37.307,-11 37.307,-32.2zm-419,-1.2c0,-60.996 48.8,-93.6 116,-93.6s116,32.604 116,93.6c0,60.993 -48.8,94.4 -116,94.4c-67.2,-0.1 -116,-33.407 -116,-94.4zm153,-0.95c0,-29.733 -14.9,-44.65 -37.5,-44.65s-37.5,14.917 -37.5,44.65c0,29.332 14.9,45.35 37.5,45.35c22.7,-0.1 37.5,-16.018 37.5,-45.35zm-450,4.262c0,-60.994 -39.23,-97.912 -110.102,-97.912c-68.078,0 -111.898,36.918 -111.898,94.702c0,58.488 43.422,93.298 115.79,93.298c45.52,0 82.253,-17.054 101.618,-44.743l-57.696,-21.067c-9.982,10.935 -25.055,16.954 -40.926,16.954c-23.857,0 -40.427,-9.63 -44.72,-25.983c-0.3,-1.102 -0.5,-2.106 -0.698,-3.31l148.632,0l0,-11.938l0,-0.001zm-148,-25.913c1.902,-19.814 15.62,-32 39.45,-32c23.832,0 37.55,12.88 37.55,32l-77,0z" />
                    </svg>
                </Link> */}
            </div>
            <div>
                <p className="text-xs">&copy; joobyrumi, all rights reserved</p>
            </div>
            <div>
                <Link href="/policies/faq" className="text-sm">FAQ</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default footer