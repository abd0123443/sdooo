<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aboute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class AbouteController extends Controller
{
    public function index(){
        $about = Aboute::all();
        return response()->json(['aboutes' => $about]);
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'image' => 'nullable|image',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
        $imagePath = null;
        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('aboutes_images', 'public');
        }
        $aboute = Aboute::create([
            'description' => $request->description,
            'image' => $imagePath,
        ]);
        return response()->json(['message' => 'Add Customer Review successfully', 'data' => $aboute]);
    }

    public function update(Request $request, Aboute $aboute){
                $validator = Validator::make($request->all(), [
            'description' => 'nullable|string',
            'image' => 'nullable|image',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }
         $imagePath = $aboute->image;
        if ($request->file('image')) {
            if ($aboute->image && Storage::disk('public')->exists($aboute->image)) {
                Storage::disk('public')->delete($aboute->image);
            }
            $imagePath= $request->file('image')->store('aboutes_images', 'public');
        }
        $aboute->description = $request->description;
        $aboute->image = $imagePath;
        $aboute->save();
        return response()->json(['message' => 'Edit successfully']);
    }
    public function destroy(Aboute $aboute){
        if ($aboute->image){
            Storage::disk('public')->delete($aboute->image);
        }
        $aboute->delete();
        return response()->json(['message' => 'Customer Review deleted successfully']);
        }
}

