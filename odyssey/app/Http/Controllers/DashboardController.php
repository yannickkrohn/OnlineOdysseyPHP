<?php

    namespace App\Http\Controllers;

    use App\Models\GamePass;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use App\Models\User;

    class DashboardController extends Controller
    {

        public function load(Request $request)
        {
            $gamePasses = GamePass::getAllGamePassesForUser();
            return view('dashboard', compact('gamePasses'));
        }
    }
