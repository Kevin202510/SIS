<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    public function index()
    {
        $customers=Customers::whereNull('deleted_at')->get();
        return response()->json($customers);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $customers=Customers::create($input); 
        return response()->json($customers);
    }

    public function update(Request $request, Customers $customer)
    {
        $input = $request->all();
        $customer->update($input);
        return response()->json($customer, 200);
    }

    public function list()
    { 
        $customers= Customers::whereNull('deleted_at')
                        ->orderby('id', 'desc')
                        ->get();
        return response()->json($customers);
    }

    public function destroy(Customers $customer)
    {
        $customer->deleted_at = Carbon::now();
        $customer->update();
        return response()->json(array('success'=>true));
    }
}
