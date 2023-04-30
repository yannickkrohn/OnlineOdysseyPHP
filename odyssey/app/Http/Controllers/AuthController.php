<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use App\Models\User;

    class AuthController extends Controller
    {
        public function login(Request $request)
        {
            // Validate the form data
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            // Attempt to authenticate the user
            if (Auth::attempt([
                'email' => $request->email,
                'password' => $request->password,
            ], true)) {
                // Authentication passed...
                return redirect()->intended('dashboard');
            }

            // Authentication failed...
            return redirect()->back()->withErrors(['email' => 'These credentials do not match our records.']);
        }

        public function load(Request $request)
        {
            return view('login');

        }

        public function destroy()
        {
            auth()->logout();

            return redirect()->to('/');
        }


    }
