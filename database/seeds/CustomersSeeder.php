<?php

use Illuminate\Database\Seeder;

class CustomersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('customers')->insert([
            [
                'fname' => 'customer 1',
                'mname' => 'felix',
                'lname' => 'caluag',
                'address' => 'Bago General Tinio NE',
                'contact' => '09261364720',
            ],
            [
                'fname' => 'customer 2',
                'mname' => 'felix',
                'lname' => 'caluag',
                'address' => 'Bago General Tinio NE',
                'contact' => '09261364720',
            ],
            [
                'fname' => 'customer 3',
                'mname' => 'felix',
                'lname' => 'caluag',
                'address' => 'Bago General Tinio NE',
                'contact' => '09261364720',
            ],
        ]);
    }
}
