<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Hash, Carbon\Carbon;

class UsersController extends Controller
{
    public function index()
    {
        $users=User::whereNull('deleted_at')->get();
        return response()->json($users);
    }

    public function index1()
    {
        $users=User::whereNotNull('deleted_at')->where('isApproved',0)->get();
        return response()->json($users);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $users=User::create($input); 
        return response()->json($users);
    }

    public function update(Request $request, User $user)
    {
        $input = $request->all();
        $user->update($input);
        return response()->json($user, 200);
    }

    public function updatestatus(Request $request,User $user)
    {
        if($request->isApproved==="1"){
            $user->isApproved = $request->isApproved;
        }else{
            $user->isApproved = $request->isApproved;
            $user->deleted_at = Carbon::now();
        }
        $user->update();
        return response()->json(array('success'=>true));
    }

    public function recover(User $user)
    {
        $user->deleted_at = NULL;
        $user->update();
        return response()->json(array('success'=>true));
    }

    public function destroy(User $user)
    {
        $user->deleted_at = Carbon::now();
        $user->update();
        return response()->json(array('success'=>true));
    }
}
