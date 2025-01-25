const NewsLists = ({ news }) => {
    const renderNews = (news) => {
        return news.map((data, i) => (
            <div
                key={i}
                className="card bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate y-1"
            >
                <figure>
                    <img
                        src="https://picsum.photos/400/225"
                        alt="News"
                        className="w-full h-48 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-white">
                        {data.title}
                        <div className="badge badge-secondary">BARU</div>
                    </h2>
                    <p className="text-gray-300">{data.description}</p>
                    <div className="card-actions justify-end mt-4">
                        <div className="badge badge-primary">
                            {data.category}
                        </div>
                        <div className="badge badge-outline text-gray-300">
                            {data.author}
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const noNews = () => (
        <div className="text-center text-gray-400">
            Saat ini belum ada berita tersedia
        </div>
    );

    return !news || news.length === 0 ? noNews() : renderNews(news);
};

export default NewsLists;
