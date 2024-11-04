<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function getUserFavorites(Request $request)
    {
        $id = \auth('sanctum')->id();
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $favorites = $user->favorites; // This uses the 'favorites' relationship defined in the User model

        return response()->json($favorites);
    }
    public function addFavorite(Request $request){
        $id = \auth('sanctum')->id();
        $request->validate([
//            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
        ]);

        $user = User::find($id);

        // Check if the property is already in the user's favorites
        if ($user->favorites()->where('property_id', $request->property_id)->exists()) {
            return response()->json(['message' => 'Property is already in favorites'], 409);
        }

        // Attach the property to the user's favorites
        $user->favorites()->attach($request->property_id);

        return response()->json(['message' => 'Property added to favorites'], 201);
    }
    public function removeFavorite(Request $request){
        $id = \auth('sanctum')->id();
        $request->validate([
//            'user_id' => 'required|exists:users,id',
            'property_id' => 'required|exists:properties,id',
        ]);
        $user = User::find($id);
        if (!$user->favorites()->where('property_id', $request->property_id)->exists()) {
            return response()->json(['message' => 'Property not found in favorites'], 404);
        }

        // Detach the property from the user's favorites
        $user->favorites()->detach($request->property_id);

        return response()->json(['message' => 'Property removed from favorites'], 200);
    }

    public function checkIsItIn(Request $request)
    {
        $id = \auth('sanctum')->id();
        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);
        $user = User::find($id);
        if ($user->favorites()->where('property_id', $request->property_id)->exists()) {
            return response()->json(['status' => true], 200);
        } else {
            return response()->json(['status' => false], 200);
        }

    }

}
