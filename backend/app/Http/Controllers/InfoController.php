<?php

namespace App\Http\Controllers;

use App\Models\Info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
 public function infoMail(Request $request){
     $request->validate([
         'name' => 'required',
         'email' => 'required',
         'message' => 'required'
     ]);

     $mail = Info::create([
         'name' => $request->name,
         'email' => $request->email,
         'message' => $request->message
     ]);

     if($mail){
         return response()->json([
             'success' => true,
             'mail' => $mail,
         ],200);
     }else{
         return response()->json([
             'success' => false,
         ],412);
     }
 }
}
