import { Head, Link, useForm } from "@inertiajs/react";
import Avatar from "react-avatar";

const Navbar = ({ user, categories, authors }) => {
    const { data, setData, post, processing } = useForm({
        search: "",
        category: "",
        author: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("news.index"), {
            preserveScroll: true,
            data: {
                search: data.search,
                category: data.category,
                author: data.author,
            },
        });
    };

    return (
        <div className="navbar bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 text-white shadow-lg">
            <div className="flex-1">
                <Link
                    href="/"
                    className="btn btn-ghost normal-case text-xl hover:text-purple-300 transition-colors"
                >
                    Berita baru nih
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <form
                    method="GET"
                    action="/"
                    className="flex items-center space-x-2"
                >
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        name="category"
                        className="select select-bordered bg-gray-700 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Kategori</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                        name="author"
                        className="select select-bordered bg-gray-700 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Penulis</option>
                        {authors.map((author) => (
                            <option key={author} value={author}>
                                {author}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="btn btn-primary text-sm px-4 py-2"
                    >
                        Cari
                    </button>
                </form>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex="0"
                        className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition-colors"
                    >
                        <div className="w-10 rounded-full">
                            <Avatar
                                name={user ? user.name : "Guest"}
                                size="40"
                                round={true}
                                color="#6D28D9"
                                fgColor="#FFFFFF"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex="0"
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-gray-800 rounded-box w-52 text-white"
                    >
                        {!user ? (
                            <>
                                <li>
                                    <Link
                                        href={route("login")}
                                        as="button"
                                        className="hover:bg-gray-700"
                                    >
                                        Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("register")}
                                        as="button"
                                        className="hover:bg-gray-700"
                                    >
                                        Registrasi
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        as="button"
                                        className="justify-between hover:bg-gray-700"
                                    >
                                        Dashboard
                                        <span className="badge badge-primary">
                                            New
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="hover:bg-gray-700"
                                    >
                                        Keluar
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
