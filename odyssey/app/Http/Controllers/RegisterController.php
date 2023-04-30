<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use App\Models\User;
    use Illuminate\Support\Str;

    class RegisterController extends Controller
    {

        public function load(Request $request)
        {
            return view('signup');
        }

        public function store()
        {
            $this->validate(request(), [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'api_token' => Str::random(60),
            ]);

            $user = User::create(request(['name', 'email', 'password']));

            auth()->login($user);

            return redirect()->to('/games');
        }
    }
