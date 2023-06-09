<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'mname', 'lname', 'address', 'DOB', 'contact', 'email', 'password', 'isApproved', 'role_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'DOB' => 'date:M-d-Y',
    ];

    protected $appends = [
        'fullName',
        'roleName',
        'statusName',
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

    public function getRoleNameAttribute()
    { 
        if($this->role){
            return $this->role->display_name;
        }
    }

    public function getstatusNameAttribute()
    { 
        $status="Approved";
        
        if($this->isApproved==0){
            $status = "Not Approved";
        }
        return $status;
    }

    public function role(){return $this->belongsTo(Roles::class);}
}
