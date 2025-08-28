<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'category_id'
    ];
    public function category(){
        return $this->belongsTo(category::class);
    }
}
