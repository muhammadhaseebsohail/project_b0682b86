The Pydantic models for the request and response have already been defined in the previous code snippet. Here they are again for reference:

```python
from pydantic import BaseModel
from typing import Optional

class Score(BaseModel):
    player_name: str
    score: int

class ScoreResponse(BaseModel):
    player_name: str
    score: int
    rank: Optional[int]
```

The `Score` model is used for the request body of the POST /score endpoint. It requires a `player_name` and a `score`.

The `ScoreResponse` model is used for the response body of both the POST /score and GET /score/{player_name} endpoints. It includes the `player_name`, `score`, and `rank` of the player. The `rank` is optional because it may not be available if the player doesn't exist.

These models are used as follows in the endpoints:

```python
from fastapi import FastAPI, HTTPException
from typing import Dict

app = FastAPI()
high_scores: Dict[str, Score] = {}

@app.post("/score", response_model=ScoreResponse, status_code=201)
async def add_score(score: Score):
    # ... (omitted for brevity)

@app.get("/score/{player_name}", response_model=ScoreResponse)
async def get_score(player_name: str):
    # ... (omitted for brevity)
```

In both endpoints, we specify the response model with the `response_model` parameter. This tells FastAPI to automatically convert the returned data to the specified model and also helps with generating the OpenAPI schema for these endpoints.

In the POST /score endpoint, the `Score` model is used to define the type of the request body. This enables FastAPI to automatically parse and validate the request body as a `Score` instance. If the request body doesn't match the `Score` model, FastAPI will automatically return a 422 Unprocessable Entity response with details about the validation errors.