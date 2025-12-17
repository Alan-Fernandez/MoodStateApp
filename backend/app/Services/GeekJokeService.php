<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\ConnectionException;

class GeekJokeService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.geek_jokes.url', env('GEEK_JOKES_API_URL', 'https://geek-jokes.sameerkumar.website/api'));
    }

    /**
     * Fetch a random joke from the external API.
     *
     * @return array|null
     */
    public function getRandomJoke(): ?array
    {
        try {
            $response = Http::withoutVerifying()->timeout(5)->get($this->baseUrl, [
                'format' => 'json'
            ]);

            if ($response->successful()) {
                return [
                    'joke' => $response->json('joke'),
                    'source' => 'Geek Joke API'
                ];
            }

            return null;
        } catch (ConnectionException $e) {
            // Log error or handle timeout
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
