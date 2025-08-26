<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all(['id', 'name', 'description', 'image', 'pdf_file']);
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image',
            'pdf_file' => 'nullable|mimes:pdf', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }


        $imagePath = $request->file('image')->store('categories_images', 'public');


        $pdfPath = $request->file('pdf_file') ? $request->file('pdf_file')->store('categories_pdfs', 'public') : null;

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath,
            'pdf_file' => $pdfPath,
        ]);

        return response()->json(['message' => 'Category created successfully', 'data' => $category]);
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image',
            'pdf_file' => 'nullable|mimes:pdf',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }


        if ($request->file('image')) {
            if ($category->image && Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }
            $category->image = $request->file('image')->store('categories_images', 'public');
        }


        if ($request->file('pdf_file')) {
            if ($category->pdf_file && Storage::disk('public')->exists($category->pdf_file)) {
                Storage::disk('public')->delete($category->pdf_file);
            }
            $category->pdf_file = $request->file('pdf_file')->store('categories_pdfs', 'public');
        }

        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'data' => $category]);
    }

    public function destroy(Request $request, Category $category)
    {

        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }


        if ($category->pdf_file && Storage::disk('public')->exists($category->pdf_file)) {
            Storage::disk('public')->delete($category->pdf_file);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
