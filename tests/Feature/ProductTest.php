<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;

    /** @test */
    public function root_is_running()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }


    /** @test */
    public function get_one_product()
    {
        $product = factory(\App\Product::class)->create([
            'id' => 1,
            'name' => 'Product Name',
            'ref' => '123456',
            'description' => 'A short description',
            'image' => json_encode(
                [
                "https://api.adorable.io/avatars/260/abc",
                "https://api.adorable.io/avatars/260/abc",
                "https://api.adorable.io/avatars/260/abc"
                ]
            ),
            'quantity' =>  1,
            'price_ht' =>  456,
            'price_ttc' =>  789,
            'category' => json_encode(["eshop", "shoes", "sweaters", "t-shirt", "tops", "bags"]),
            'is_active' => 1,
        ]);

        $response = $this->call("GET", "/api/products/$product->id");

        $response->assertStatus(200)->assertJsonFragment(['name' => 'Product Name']);
    }

    /** @test */
    public function get_many_products()
    {
        factory(\App\Product::class, 50)->create();

        $response = $this->call("GET", "/api/products");

        $response->assertStatus(200)->assertJsonFragment(['total' => 50]);
    }

    /** @test */
    public function update_one_product()
    {
        $product = factory(\App\Product::class)->create([
            'id' => 1,
            'name' => 'Product Name',
            'ref' => '123456',
            'description' => 'A short description',
            'image' => json_encode(
                [
                "https://api.adorable.io/avatars/260/abc",
                "https://api.adorable.io/avatars/260/abc",
                "https://api.adorable.io/avatars/260/abc"
                ]
            ),
            'quantity' =>  1,
            'price_ht' =>  456,
            'price_ttc' =>  789,
            'category' => json_encode(["eshop", "shoes", "sweaters", "t-shirt", "tops", "bags"]),
            'is_active' => 1,
        ]);

        $product->name = 'Updated Product';

        $this->call("PUT", "/api/products/$product->id", $product->toArray());
        $response = $this->call("GET", "/api/products/$product->id");

        $response->assertStatus(200)->assertJsonFragment(['name' => 'Updated Product']);
    }

    /** @test */
    public function validation_error_when_try_update_missing_params()
    {
        $response = $this->call("PUT", "/api/products/1", []);
        $response->assertStatus(400);
    }
}
