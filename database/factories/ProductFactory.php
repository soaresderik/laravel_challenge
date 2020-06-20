<?php

use App\Product;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Product::class, function (Faker $faker) {

    $price = random_int(1000, 100000);
    $categories = ["eshop", "shoes", "sweaters", "t-shirt", "tops", "bags"];

    return [
        'name' => $faker->city,
        'ref' => $faker->unique()->ean8,
        'description' => $faker->text(550),
        'image' => json_encode(
            [
            "https://api.adorable.io/avatars/260/$faker->word",
            "https://api.adorable.io/avatars/260/$faker->word",
            "https://api.adorable.io/avatars/260/$faker->word"
            ]
        ),
        'quantity' =>  random_int(1, 8),
        'price_ht' =>  $price,
        'price_ttc' =>  $price + random_int(100, 10000),
        'category' => json_encode([$categories[array_rand($categories)], $categories[array_rand($categories)]]),
        'is_active' => random_int(0, 1),
    ];
});
