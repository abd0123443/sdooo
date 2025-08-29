<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transformation;
use Illuminate\Http\Request;
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
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'work' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $transformation = Transformation::create([
                'name' => $request->name,
                'description' => $request->description,
                'work' => $request->work,
            ]);

            return response()->json(['message' => 'Add Customer Review successfully', 'data' => $transformation]);
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
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'work' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $transformation->update([
                'name' => $request->name,
                'description' => $request->description,
                'work' => $request->work,
            ]);

            return response()->json(['message' => 'Edit successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Transformation $transformation)
    {
        $transformation->delete();
        return response()->json(['message' => 'Customer Review deleted successfully']);
    }
}
