<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class IncidentController extends Controller {

    /**
    * Responds to requests to GET /books
    */
    public function getIndex() {
        $incidents = DB::table('DOIT_TaxTitleActive')->get();
            return response()->json($incidents);
    }

    public function getShow(){
        $incidents = DB::table('DOIT_TaxTitleActive')->get();
        return view('incidents.show');
    }

}
