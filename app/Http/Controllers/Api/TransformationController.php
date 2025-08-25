<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TransformationController extends Controller
{
    public function index()
    {
        return response()->json(['transformations' => Transformation::all()]);
    }

    public function store(Request $request)
    {
        $valedator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'tag' => 'required|string',
            'image' => 'required|image'
        ]);
        if ($valedator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $valedator->errors()
            ], 422);
        }
        $imagePath = $request->file('image')->store('transformations_images', 'public');
        $transformation = Transformation::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'tag' => $request->tag,
            'image' => $imagePath
        ]);
        return response()->json(['message' => 'add transformation successfully', 'data' => $transformation]);
    }

    public function update(Request $request, Transformation $transformation)
    {
        $valedator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'tag' => 'required|string',
            'image' => 'nullable'
        ]);
        if ($valedator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $valedator->errors()
            ], 422);
        }
        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('transformations_images', 'public');
            $transformation->image = $imagePath;
        }
        $transformation->title = $request->title;
        $transformation->description = $request->description;
        $transformation->location = $request->location;
        $transformation->tag = $request->tag;
        $transformation->save();
        return response()->json(['message' => 'Edit successfully']);
    }

    public function destroy(Request $request, Transformation $transformation)
    {
        if ($transformation->image && Storage::disk('public')->exists($transformation->image)) {
            Storage::disk('public')->delete($transformation->image);
        }
        $transformation->delete();
        return response()->json(['message' => 'transformation deleted successfully']);
    }
}
