<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'Material',
        'Finish_Options',
        'Glass_Type',
        'Lock_System',
        'Security_Rating',
        'Standard_Size',
        'Hardware',
        'Warranty',
        'category_id'
    ];
    public function category(){
        return $this->belongsTo(Category::class);
    }
}
