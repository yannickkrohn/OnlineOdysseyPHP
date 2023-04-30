<?php

    namespace App\Http\Middleware;

    use App\Models\User;
    use Closure;

    class Odyssey
    {
        public function handle($request, Closure $next)
        {
            $token = $request->bearerToken();
            $user = User::where('api_token', $token)->first();
            if ($user) {
                auth()->login($user);
                return $next($request);
            }
            return response([
                'message' => 'Unauthenticated'
            ], 403);
        }
    }
