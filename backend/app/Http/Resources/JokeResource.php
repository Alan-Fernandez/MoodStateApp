<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JokeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'joke' => $this->resource['joke'],
            'source' => $this->resource['source'],
            'fetched_at' => now()->toIso8601String(),
        ];
    }
}
