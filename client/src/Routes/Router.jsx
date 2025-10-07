import React from "react";
import Layout from "../components/Layout";
import Home from "../pages/home";
import AddNotes from "../pages/AddNotes";
import Book from "../pages/Book";
import Auth from "../Authentication/Auth";
import ProtectedRoute from "./ProtectedRoute";

const Router =[
    {
        element:(
        <ProtectedRoute>
        <Layout/>
        </ProtectedRoute>),
        path:"/",
        children:[
            {
                element:<Home/>,
                index:true,
            },
            {
                element:<AddNotes/>,
                path:"add-books",
            },
            {
                element:<Book/>,
                path:"books",
            }
        ]
    },
    {
        element:<Auth/>,
        path:"auth",
    }
]
export default Router;