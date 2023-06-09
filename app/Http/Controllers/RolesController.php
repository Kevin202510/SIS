<?php

namespace App\Http\Controllers;

use App\Roles;
use Illuminate\Http\Request;
use Hash, Carbon\Carbon;

class RolesController extends Controller
{
    public function index()
    {
        $roles=Roles::whereNull('deleted_at')->get();
        return response()->json($roles);
    }

    public function list()
    { 
        $roles= Roles::where('display_name','!=', 'Developer')
                    ->whereNull('deleted_at')
                        ->orderby('id', 'desc')
                        ->get();
        return response()->json($roles);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $roles=Roles::create($input); 
        return response()->json($roles);
    }

    public function update(Request $request, Roles $role)
    {
        $input = $request->all();
        $role->update($input);
        return response()->json($role, 200);
    }

    public function destroy(Roles $role)
    {
        $role->deleted_at = Carbon::now();
        $role->update();
        return response()->json(array('success'=>true));
    }
}
