<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'ref', 'quantity',
        'category', 'price_ht', 'price_ttc',
         'is_active'
    ];

    protected $guarded = ['created_at', 'updated_at'];
}
