<?php

namespace App\Http\Controllers;

use App\Models\NewsLetter;
use Illuminate\Http\Request;

class NewsLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $email = $request->input('email');
       if(NewsLetter::where('email', $email)->exists())
       {
           return response()->json(
               [
                   'status' => false,
                   'message' => 'A user with this email already exists!'
               ], 409
           );
       }

        $subscribe = NewsLetter::create([
            'email' => $request->email
        ]);
        if($subscribe){
            return response()->json([
                'success' => true,
                'subscribe' => $subscribe,
            ],200);
        }else{
            return response()->json([
                'success' => false,
            ],412);
        }
    }
    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

    }

}
