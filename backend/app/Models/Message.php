<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';
    protected $fillable = [
        'id_user_from',
        'id_user_to',
        'id_property',
        'title',
        'message',
    ];
    public $timestamps = true;

    public function sender()
    {
        return $this->belongsTo(User::class, 'id_user_from');
    }
    public function recipient()
    {
        return $this->belongsTo(User::class, 'id_user_to');
    }
}
