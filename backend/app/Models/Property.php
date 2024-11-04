<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;
    protected $fillable=[
        'title',
        'user_id',
        'description',
        'size',
        'city',
        'street',
        'house_number',
        'rooms',
        'bathroom_count',
        'floor',
        'building_material',
        'type',
        'plot_size',
        'garage',
        'facing',
        'price',
        'hasPicture'
    ];

    public static function select(string $string)
    {
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites', 'property_id', 'user_id');
    }
}
