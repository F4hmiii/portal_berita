<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Query dasar untuk mengambil berita
        $query = News::query();

        // Filter berdasarkan kategori
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Filter berdasarkan penulis
        if ($request->has('author') && $request->author) {
            $query->where('author', $request->author);
        }

        // Filter berdasarkan pencarian
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Paginasi dan pengurutan berdasarkan ID terbaru
        $news = new NewsCollection($query->orderByDesc('id')->paginate(9));

        // Render halaman homepage dengan data yang diperlukan
        return Inertia::render('Homepage', [
            'title' => "Portal Berita Terkini",
            'description' => "Selamat Datang Di News Portal Berita",
            'news' => $news,
            'categories' => News::distinct()->pluck('category'),
            'authors' => News::distinct()->pluck('author'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        // Simpan berita baru
        News::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'author' => auth()->user()->email,
        ]);

        return redirect()->back()->with('message', 'Berita berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        // Ambil berita yang dibuat oleh pengguna yang sedang login
        $myNews = News::where('author', auth()->user()->email)->get();

        return Inertia::render('Dashboard', [
            'myNews' => $myNews,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
        ]);

        // Update berita
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);

        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Hapus berita
        $news = News::find($request->id);
        $news->delete();

        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
}