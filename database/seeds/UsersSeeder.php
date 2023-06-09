<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'role_id' => 1,
                'fname' => 'kevin felix',
                'mname' => 'felix',
                'lname' => 'caluag',
                'address' => 'Bago General Tinio NE',
                'DOB' => '2001-01-13',
                'contact' => '09261364720',
                'isApproved' => 1,
                'email' => 'developer@gmail.com',
                'password' => Hash::make("password"),
            ],
            [
                'role_id' => 2,
                'fname' => 'Administrator',
                'mname' => 'administrator',
                'lname' => 'Administrator',
                'contact' => '09261364730',
                'address' => 'Bago General Tinio NE',
                'DOB' => '2001-01-13',
                'isApproved' => 1,
                'email' => 'administrator@gmail.com',
                'password' => Hash::make("password"),
            ],
            [
                'role_id' => 3,
                'fname' => 'Manager',
                'mname' => 'manager',
                'lname' => 'Manager',
                'address' => 'Bago General Tinio NE',
                'DOB' => '2001-01-13',
                'contact' => '09261364620',
                'isApproved' => 1,
                'email' => 'manager@gmail.com',
                'password' => Hash::make("password"),
            ],
            [
                'role_id' => 4,
                'fname' => 'Staff',
                'mname' => 'staff', 
                'lname' => 'Staff',
                'address' => 'Bago General Tinio NE',
                'DOB' => '2001-01-13',
                'contact' => '09223364720',
                'isApproved' => 1,
                'email' => 'staff@gmail.com',
                'password' => Hash::make("password"),
            ]
        ]);
    }
}
