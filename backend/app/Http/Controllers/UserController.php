<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function getUserNameAndEmail($user_id){
        $id = $user_id;

        $user = User::select('id', 'name', 'email')->where('id', $id)->first();

        return response()->json(
            [
                'status' => true,
                'user' => $user,
                'id' => $id
            ]
        );
    }

    function userLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255|',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'The password as least 6 character',
                    'errors' => $validator->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Email or password isn\'t correct!'
                    ],
                    401
                );
            }

            $user = User::where('email', $request->email)->first();

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Login successful!',
                    'token' => $user->createToken('API TOKEN', ['server-update'])->plainTextToken,
                    'username' => $user->name,
                    'id' => $user->id
                ], 200
            );
        } catch (\Throwable $th) {

            Log::error($th->getMessage());

            return response()->json(
                [
                    'status' => false,
                    'message' => "Server side error!"
                ], 500
            );
        }


    }
    public function registerUser(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('username');
        $password = $request->input('password');

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        if (User::where('email', $email)->exists()) {
            return response()->json(
                [
                'status' => false,
                'message' => 'A user with this email already exists!'
                ], 409
            );
        }

        $newUser = User::create(['name' => $name, 'email' => $email, 'password' => $password]);

        return response()->json([
            'status' => true,
            'message' => 'Registration successful!',
            'newUserId' => $newUser->id,
            'token' => $newUser->createToken('API TOKEN', ['server-update'])->plainTextToken
            ],201);
    }

    public function userLogout(Request $request) {
        if (Auth::check()) {
            // Get the currently authenticated user's token (Passport or Sanctum)
            $token = $request->user()->currentAccessToken();

            if ($token) {
                $token->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Logout successful!'
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'Token not found!'
            ], 401);
        }

        return response()->json([
            'status' => false,
            'message' => 'User wasn\'t authenticated'
        ], 401);
    }


}
