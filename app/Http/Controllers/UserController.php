<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('can:create-classrooms')->only(['store']);
        // $this->middleware('can:edit-classrooms')->only(['edit']);
        // $this->middleware('can:delete-classrooms')->only(['destroy']);
    }

    public function index(): Response
    {
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleNames()->first(), // or ->getRoleNames() if multiple
            ];
        });
    
        return Inertia::render('Users', [
            'users' => $users
        ]);
    }
}
