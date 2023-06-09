<?php

use Illuminate\Database\Seeder;

class InvoicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('invoices')->insert([
            [
                'customer_id' => 1,
                'invoice_number' => '12345',
                'invoice_date' => '2023-06-09',
                'product_detail' => '[{"product_name":"MOUSE","product_price":200,"product_quantity":2,"product_sub_total":400}]',
            ]
        ]);
    }
}
