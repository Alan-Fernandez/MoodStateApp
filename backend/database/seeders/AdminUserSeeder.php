<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!User::where('email', 'cliente@incuca.com.br')->exists()) {
            User::create([
                'name' => 'Admin Client',
                'email' => 'cliente@incuca.com.br',
                'password' => Hash::make('seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga'),
            ]);
        }
    }
}
