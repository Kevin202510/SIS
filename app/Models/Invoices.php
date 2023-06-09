<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    protected $fillable = [
        'invoice_number', 'customer_id', 'product_detail','invoice_date'
    ];

    protected $casts = [
        'invoice_date' => 'date:M-d-Y',
        'product_detail' => 'object',
    ];

    protected $appends = [
        'fullName',
    ];

    public function getFullNameAttribute()
    { 
        if($this->customer){
            return $this->customer->fullName;
        }
    }

    public function customer(){return $this->belongsTo(Customers::class);}
}
