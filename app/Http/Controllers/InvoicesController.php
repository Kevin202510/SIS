<?php

namespace App\Http\Controllers;

use App\Models\Invoices;
use Illuminate\Http\Request;

class InvoicesController extends Controller
{
    public function index()
    {
        $invoices=Invoices::whereNull('deleted_at')->get();
        return response()->json($invoices);
    }

    public function index2()
    {
        $chars = "003232303232023232023456789";
        srand((double)microtime()*1000000);
        $i = 0;
        $pass = '' ;
        while ($i <= 5) {

            $num = rand() % 33;

            $tmp = substr($chars, $num, 1);

            $pass = $pass . $tmp;

            $i++;

        }
        $finalcode='SIS-'.$pass;
        return view('invoicesmanagement.invoices.index',["invoice_number"=>$finalcode]);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $invoices=Invoices::create($input); 
        return response()->json($invoices);
    }

    public function update(Request $request, Invoices $invoice)
    {
        $input = $request->all();
        $invoice->update($input);
        return response()->json($invoice, 200);
    }

    public function destroy(Invoices $invoice)
    {
        $invoice->deleted_at = Carbon::now();
        $invoice->update();
        return response()->json(array('success'=>true));
    }
}
