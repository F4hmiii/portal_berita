import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "@/Components/Navbar";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        };
        Inertia.patch("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card w-full lg:w-96 bg-white shadow-xl m-4 rounded-lg">
                <div className="p-4 text-2xl font-semibold text-gray-800">EDIT BERITA</div>
                <div className="card-body">
                    <input
                        type="text"
                        placeholder="Judul"
                        className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                        onChange={(e) => setTitle(e.target.value)}
                        defaultValue={props.myNews.title}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={props.myNews.description}
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                        onChange={(e) => setCategory(e.target.value)}
                        defaultValue={props.myNews.category}
                    />
                    <button
                        className="btn btn-primary m-2 w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-200"
                        onClick={handleSubmit}
                    >
                        Perbarui..
                    </button>
                </div>
            </div>
        </div>
    );
}