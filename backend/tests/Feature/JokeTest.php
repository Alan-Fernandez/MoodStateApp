<?php

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authenticated user can fetch a random joke', function () {
    Http::fake([
        'geek-jokes.sameerkumar.website/*' => Http::response(['joke' => 'This is a funny joke'], 200),
    ]);

    $user = User::factory()->create();
    $token = auth()->guard('api')->login($user);

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->getJson('/api/jokes/random');

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'joke' => 'This is a funny joke',
                'source' => 'Geek Joke API'
            ]
        ]);
});

test('unauthenticated user cannot fetch a random joke', function () {
    $response = $this->getJson('/api/jokes/random');

    $response->assertStatus(401);
});

test('handles external api failure gracefully', function () {
    Http::fake([
        'geek-jokes.sameerkumar.website/*' => Http::response(null, 500),
    ]);

    $user = User::factory()->create();
    $token = auth()->guard('api')->login($user);

    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->getJson('/api/jokes/random');

    $response->assertStatus(503)
        ->assertJsonStructure(['error']);
});
