It seems you have asked for FastAPI backend code but mentioned "Node.js" and "Express.js" in the requirements. These are commonly used for implementing backend services in JavaScript, not Python. I will proceed with implementing this in FastAPI and Python as per your initial request.

Here is a FastAPI implementation of a high score system with a simple in-memory database:

First, let's define our Pydantic models:

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

Next, we need to setup our FastAPI application and in-memory database:

```python
from fastapi import FastAPI, HTTPException
from typing import Dict

app = FastAPI()
high_scores: Dict[str, Score] = {}
```

Now, let's create the endpoints:

```python
@app.post("/score", response_model=ScoreResponse, status_code=201)
async def add_score(score: Score):
    """
    Create a new score entry
    """
    if score.player_name in high_scores:
        if score.score > high_scores[score.player_name].score:
            high_scores[score.player_name] = score
    else:
        high_scores[score.player_name] = score

    sorted_scores = sorted(high_scores.values(), key=lambda x: x.score, reverse=True)
    rank = sorted_scores.index(high_scores[score.player_name]) + 1
    return {**score.dict(), "rank": rank}


@app.get("/score/{player_name}", response_model=ScoreResponse)
async def get_score(player_name: str):
    """
    Get score and rank of a player
    """
    if player_name not in high_scores:
        raise HTTPException(status_code=404, detail="Score not found")
    sorted_scores = sorted(high_scores.values(), key=lambda x: x.score, reverse=True)
    rank = sorted_scores.index(high_scores[player_name]) + 1
    return {**high_scores[player_name].dict(), "rank": rank}
```

Here we have two endpoints:

1. POST /score: This endpoint accepts a JSON body with a player_name and a score. It adds the score to our in-memory database (or updates it if it's higher than the existing score for the user). It then calculates the user's rank and returns it along with the score and player_name.

2. GET /score/{player_name}: This endpoint retrieves a player's score and rank in the high score list by their name. If the player does not exist, it returns a 404 error.

Remember, this is a simple implementation and stores data in memory, so all data will be lost when the application restarts. For a more persistent solution, you'd want to look into using a real database.