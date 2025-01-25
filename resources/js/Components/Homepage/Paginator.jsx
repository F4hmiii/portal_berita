import { Head, Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {meta.links.map((link, index) => {
                // Periksa apakah ini halaman aktif
                const isActive = link.active;

                return (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        className={`px-4 py-2 rounded-md text-sm ${
                            isActive
                                ? "bg-purple-700 text-white font-bold"
                                : "bg-gray-700 text-white hover:bg-gray-600 transition duration-200"
                        } ${
                            !link.url
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }`}
                        disabled={!link.url}
                    >
                        {/* Gunakan label link untuk menampilkan angka */}
                        {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
                    </Link>
                );
            })}
        </div>
    );
};

export default Paginator;
