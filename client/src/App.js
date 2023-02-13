import React from "react";
// Main Page
import Hero from "./components/hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Best from "./components/best/Best";
import Featured from "./components/featured/Featured";
import Footer from "./components/footer/Footer";
// Navbar Links
import Search from "./components/Search.js"
import About from "./components/About.js"
import Contact from "./components/Contact.js"


import { createBrowserRouter, RouterProvider } from "react-router-dom";


// const App = () => {
//     return (
//         <>
//             <Navbar />
//             <Hero />
//             <Best />
//             <Featured />
//             <Footer/>
//         </>
//     )
// }

const router = createBrowserRouter([
    {
        path: '/',
        element: [<Navbar/>,
        <Hero />,
        <Best />,
        <Featured />,
        <Footer />]
    },
    {
        path: '/search',
        element: [< Navbar />, <Search/>]
    },
    {
        path: '/about',
        element: [< Navbar />, <About/>]
    },
    {
        path: '/contact',
        element: [< Navbar />, <Contact/>]
    },{
        path : '*',
        element :<h1>Page Not Found!</h1>
    }

])

const App = () => {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}

export default App;