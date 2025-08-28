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
        try {
            $valedator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'work' => 'required|string',
            ]);
            if ($valedator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $valedator->errors()
                ], 422);
            }
            $transformation = Transformation::create([
                'name' => $request->name,
                'description' => $request->description,
                'work' => $request->work,

            ]);
            return response()->json(['message' => 'add Customer Review successfully', 'data' => $transformation]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Transformation $transformation)
    {
        try {
            $valedator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'work' => 'required|string',
            ]);
            if ($valedator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $valedator->errors()
                ], 422);
            }

            $transformation->name = $request->name;
            $transformation->description = $request->description;
            $transformation->work = $request->work;
            $transformation->save();
            return response()->json(['message' => 'Edit successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, Transformation $transformation)
    {

        $transformation->delete();
        return response()->json(['message' => 'Customer Review deleted successfully']);
    }
}
