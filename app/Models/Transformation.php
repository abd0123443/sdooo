<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transformation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'tag',
        'image'
    ];
}
