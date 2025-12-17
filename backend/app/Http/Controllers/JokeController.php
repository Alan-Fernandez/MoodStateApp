<?php

namespace App\Http\Controllers;

use App\Services\GeekJokeService;
use App\Http\Resources\JokeResource;
use Illuminate\Http\JsonResponse;

class JokeController extends Controller
{
    protected GeekJokeService $jokeService;

    public function __construct(GeekJokeService $jokeService)
    {
        $this->jokeService = $jokeService;
    }

    /**
     * Get a random geek joke.
     *
     * @return JokeResource|JsonResponse
     */
    public function random()
    {
        $joke = $this->jokeService->getRandomJoke();

        if (!$joke) {
            return response()->json([
                'error' => 'Unable to fetch a joke at this time. Please try again later.'
            ], 503);
        }

        return new JokeResource($joke);
    }
}
