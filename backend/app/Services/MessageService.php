<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Message;
class MessageService
{
    public function newMessage(Request $request, $id){
        $request->validate([
            'id_user_to' => 'required',
            'title' => 'required|max:255',
            'message' => 'required',
            'id_property'=> 'required'
        ]);

        $message = Message::create([
            'id_user_from'=>$id,
            'id_user_to'=>$request->id_user_to,
            'id_property'=>$request->id_property,
            'title'=>$request->title,
            'message'=>$request->message
        ]);
        return $message;
    }

    public function getAllMessage($id_user_to){
       return Message::all()->where('id_user_to',$id_user_to)->orderBy('created_at','DESC');
    }

    public function getConversation($user1, Request $request){
        $request->validate([
            'id_user_to' => 'required',
            'id_property'=> 'required'
        ]);
            $user2 = $request->id_user_to;
        $conversation = Message::where('id_property', $request->propertyID)
            ->where(function ($query) use($user1, $user2){
                $query->where('id_user_from', $user1)
                      ->where('id_user_to', $user2);
        } )
            ->orWhere(function ($query) use($user1, $user2){
                $query->where('id_user_from', $user2)
                    ->where('id_user_to', $user1);

            })
            ->orderBy('created_at', 'asc')->get();
        return $conversation;
    }

}
