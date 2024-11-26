<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{

    public function definition():array
    {
        return [
            'title' => $this->faker->word(),
            'user_id' => User::inRandomOrder()->first()->id,
            'description' => $this->faker->paragraph(),
            'size' => $this->faker->numberBetween(20,300),
            'city' => $this->faker->city(),
            'street' => $this->faker->streetName(),
            'house_number' => $this->faker->buildingNumber(),
            'rooms'=>$this->faker->numberBetween(1,5),
            'bathroom_count' => $this ->faker->numberBetween(1,3),
            'floor'=>$this->faker->numberBetween(1,10),
            'building_material'=>$this->faker->randomElement(['brick', 'wood', 'farrow-concrete']),
            'type'=>$this->faker->randomElement(['flat', 'house']),
            'plot_size'=>$this->faker->numberBetween(1,2000),
            'garage'=>$this->faker->boolean(),
            'facing'=>$this->faker->randomElement(['N','W','S','E']),
            'price'=>$this->faker->randomFloat(10,100000, 50000000),
            'hasPicture' =>false,
        ];
    }
}
