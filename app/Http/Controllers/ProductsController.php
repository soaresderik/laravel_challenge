<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Product;


class ProductsController extends Controller
{
    public function main() {
        return view('main');
    }

    public function index(Request $request) {
       return Product::where('name', 'like', '%'.$request->query('term').'%')
                        ->orWhere('ref', 'like', '%'.$request->query('term').'%')
                        ->orderBy('created_at', 'desc')
                        ->paginate($request->query('count') ?: 10);
    }

    public function show($id) {
        return Product::find($id);
    }

    public function update(Request $request, $id) {
        $validator =  Validator::make($request->all(),[
            'name' => 'required|max:255',
            'ref' => 'required',
            'category' => 'required',
            'description' => 'required',
            'quantity' => 'required|integer',
            'price_ht' => 'required|integer',
            'price_ttc' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        return Product::where('id', $id)->update($request->only([
            'name',
            'ref',
            'category',
            'quantity',
            'description',
            'price_ht',
            'price_ttc',
            'is_active',
        ]));

    }
}
