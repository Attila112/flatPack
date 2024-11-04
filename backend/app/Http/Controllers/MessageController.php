<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Services\MessageService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    protected MessageService $messageService;

    public function __construct()
    {
        $this->messageService = new MessageService();
    }

    public function newMessage(Request $request){
      $id_user_from = \auth('sanctum')->id();
       $message = $this->messageService->newMessage($request, $id_user_from);

       if($message){
           return response()->json([
               'success' => true,
               'message' => $message,
           ],200);
       }else{
           return response()->json([
               'success' => false,
           ],412);
       }

    }
    public function getMessages(){
        $userID = \auth('sanctum')->id();
       $messages[] = $this->messageService->getAllMessage($userID);
       if($messages){
           return response()->json([
               'success' => true,
               'messages' => $messages,
           ],200);
       }else{
           return response()->json([
               'success' => false,
               'messages' => 'No messages',
           ],404);
       }
    }

  public function getConversation(Request $request){
        $id_user_from = \auth('sanctum')->id();
       $conversation = $this->messageService->getConversation($id_user_from, $request);
       if($conversation){
           return response()->json([
               'success' => true,
               'conversation' => $conversation,
           ],200);
       }else{
           return response()->json([
               'success' => false,
               'messages' => 'No messages',
           ],404);
       }
  }

}
