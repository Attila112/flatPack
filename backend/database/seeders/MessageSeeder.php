<?php

namespace Database\Seeders;

use App\Models\Message;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;


class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            Message::create([
                'id_user_from' => $faker->numberBetween(1, 10),
                'id_user_to' => $faker->numberBetween(1, 10),
                'title' => $faker->sentence(),
                'message' => $faker->paragraph(),
            ]);
        }
    }
}
