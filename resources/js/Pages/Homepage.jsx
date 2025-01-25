import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import NewsLists from "@/Components/Homepage/NewsLists";
import Paginator from "@/Components/Homepage/Paginator";

export default function Homepage(props) {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 animate-gradient">
            <Head title={props.title} />
            <Navbar user={props.auth.user} categories={props.categories} authors={props.authors} />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {props.title}
                    </h1>
                    <p className="text-lg text-gray-300">{props.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsLists news={props.news.data} />
                </div>
                <div className="flex justify-center mt-8">
                    <Paginator meta={props.news.meta} />
                </div>
            </div>
        </div>
    );
}