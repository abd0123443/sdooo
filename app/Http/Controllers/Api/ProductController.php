<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(['products' => Product::with('category')->get()]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'Material' => 'required|string',
            'Finish_Options' => 'required|string',
            'Glass_Type' => 'required|string',
            'Lock_System' => 'required|string',
            'Security_Rating' => 'required|string',
            'Standard_Size' => 'required|string',
            'Hardware' => 'required|string',
            'Warranty' => 'required|string',
            'category_id' => 'required|string|exists:categories,id',
            'image' => 'required|image'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
        $imagePath = $request->file('image')->store('products_images', 'public');
        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'Material' => $request->Material,
            'Finish_Options' => $request->Finish_Options,
            'Glass_Type' => $request->Glass_Type,
            'Lock_System' => $request->Lock_System,
            'Security_Rating' => $request->Security_Rating,
            'Standard_Size' => $request->Standard_Size,
            'Hardware' => $request->Hardware,
            'Warranty' => $request->Warranty,
            'category_id' => $request->category_id,
            'image' => $imagePath,
        ]);
        return response()->json(['message' => 'add product successfully', 'data' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'Material' => 'required|string',
            'Finish_Options' => 'required|string',
            'Glass_Type' => 'required|string',
            'Lock_System' => 'required|string',
            'Security_Rating' => 'required|string',
            'Standard_Size' => 'required|string',
            'Hardware' => 'required|string',
            'Warranty' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'image' => 'nullable'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('products_images', 'public');
            $product->image = $imagePath;
        }
        $product->title = $request->title;
        $product->description = $request->description;
        $product->Material = $request->Material;
        $product->Finish_Options = $request->Finish_Options;
        $product->Glass_Type = $request->Glass_Type;
        $product->Lock_System = $request->Lock_System;
        $product->Security_Rating = $request->Security_Rating;
        $product->Standard_Size = $request->Standard_Size;
        $product->Hardware = $request->Hardware;
        $product->Warranty = $request->Warranty;
        $product->category_id = $request->category_id;
        $product->save();
        return response()->json(['message' => 'Edit successfully']);
    }

    public function destroy(Request $request, Product $product)
    {
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->json(['message' => 'product deleted successfully']);
    }
}
