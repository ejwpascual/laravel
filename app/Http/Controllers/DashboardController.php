<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    private $stripe;

    public function __construct()
    {
        $this->stripe = new \Stripe\StripeClient( env( 'STRIPE_SECRET' ) );
    }

    public function dashboard()
    {
        $profile = $this->getCustomer();
        return Inertia::render('Dashboard', [
            'customer' => $profile,
        ]);
    }

    public function getCustomer()
    {
        $customer_id = Auth::user()->stripe_id;
        $stripe = $this->stripe;
        $customer = $stripe->customers->retrieve(  $customer_id, [] );
        $balance = $stripe->customers->retrieveCashBalance( $customer_id, [] );
        $profile = array(
            'balance'  => number_format( (float) ( isset($balance['available']['usd']) ? $balance['available']['usd'] : 0 ) * 0.01 , 2, '.', '' ),
            'name'     => $customer['name'],
        );
        return $profile;
    }

    public function fund()
    {
        $request = request()->post();
        $stripe = $this->stripe;
        $fund = $stripe->testHelpers->customers->fundCashBalance(
            Auth::user()->stripe_id,
            [
                'amount' => $request['amount'] * 100,
                'currency' => 'usd',
            ]
        );
        return redirect("/dashboard");
    }
}
