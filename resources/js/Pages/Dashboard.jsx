import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        Inertia.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get("/news");
        }
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Form Tambah Berita */}
                    <div className="p-6 bg-white shadow-xl rounded-lg mb-8">
                        {isNotif && (
                            <div className="alert alert-info shadow-lg mb-4 bg-blue-50 text-blue-800">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="stroke-current flex-shrink-0 w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="ml-2">
                                        {props.flash.message}
                                    </span>
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Kategori"
                            className="m-2 input input-bordered w-full bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                        <button
                            className="btn btn-primary m-2 w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-200"
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </button>
                    </div>

                    {/* Daftar Berita */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {props.myNews && props.myNews.length > 0 ? (
                            props.myNews.map((news, i) => (
                                <div
                                    key={i}
                                    className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="card-body">
                                        <h2 className="card-title text-gray-800">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                Baru
                                            </div>
                                        </h2>
                                        <p className="text-gray-600">
                                            {news.description}
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <div className="badge badge-primary">
                                                {news.category}
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("edit.news")}
                                                    method="get"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                    className="hover:text-purple-500"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("delete.news")}
                                                    method="delete"
                                                    data={{ id: news.id }}
                                                    as="button"
                                                    className="hover:text-red-500"
                                                >
                                                    Hapus
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">
                                Aduh beritamu belum ada disini...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}