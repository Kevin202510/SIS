<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{

    protected $fillable = [
        'fname', 'mname', 'lname', 'address', 'contact',
    ];

    protected $appends = [
        'fullName',
    ];

    public function getFullNameAttribute()
    {
        if($this->mname!==null){
            $fn=$this->fname.' '.$this->mname.' '.$this->lname;
        }else{
            $fn=$this->fname.' '.$this->lname;
        }
        return  strtoupper($fn);
    }
}
