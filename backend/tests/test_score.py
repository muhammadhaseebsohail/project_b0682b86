Sure, here are the unit tests using pytest and FastAPI's TestClient:

```python
from fastapi.testclient import TestClient
import pytest
from main import app, high_scores
from pydantic import ValidationError 

client = TestClient(app)

def test_add_score():
    response = client.post("/score", json={"player_name": "test", "score": 100})
    assert response.status_code == 201
    assert response.json() == {"player_name": "test", "score": 100, "rank": 1}

def test_get_score():
    response = client.get("/score/test")
    assert response.status_code == 200
    assert response.json() == {"player_name": "test", "score": 100, "rank": 1}

def test_get_score_not_found():
    response = client.get("/score/nonexistent")
    assert response.status_code == 404

def test_add_score_validation():
    response = client.post("/score", json={"player_name": "test2", "score": "invalid"})
    assert response.status_code == 422

def test_add_score_edge_case():
    response = client.post("/score", json={"player_name": "test", "score": 200})
    assert response.status_code == 201
    assert response.json() == {"player_name": "test", "score": 200, "rank": 1}

    response = client.get("/score/test")
    assert response.status_code == 200
    assert response.json() == {"player_name": "test", "score": 200, "rank": 1}

    response = client.get("/score/nonexistent")
    assert response.status_code == 404
```

Here's a breakdown of the tests:

- `test_add_score`: Tests that a score can be added successfully and that the rank is calculated correctly.
- `test_get_score`: Tests that a score can be retrieved successfully.
- `test_get_score_not_found`: Tests that trying to retrieve a score for a non-existent player returns a 404.
- `test_add_score_validation`: Tests that trying to add a score with invalid data (in this case, a non-integer score) returns a 422 validation error.
- `test_add_score_edge_case`: Tests the scenario where a player's score is updated with a higher score, and the rank is updated correctly. Also tests that trying to retrieve a score for a non-existent player still returns a 404 after other scores have been added.