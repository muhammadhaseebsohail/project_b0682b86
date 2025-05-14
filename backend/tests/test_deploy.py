Here is how you would test the FastAPI endpoint for deploying a game to a server:

```python
import pytest
from fastapi.testclient import TestClient
from main import app, deploy_game
from pydantic import ValidationError

client = TestClient(app)

def test_deploy_success():
    response = client.post(
        "/deploy",
        json={
            "game_name": "test_game",
            "server_address": "127.0.0.1",
            "server_port": 8080
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "status": "success", 
        "message": "Game test_game has been successfully deployed."
    }

def test_deploy_failure():
    response = client.post(
        "/deploy",
        json={
            "game_name": "test_game",
            "server_address": "bad_address",
            "server_port": 8080
        },
    )
    assert response.status_code == 400
    assert "detail" in response.json()

def test_deploy_data_validation():
    response = client.post(
        "/deploy",
        json={
            "game_name": "test_game",
            "server_address": 12345,  # should be a string
            "server_port": "8080"  # should be an int
        },
    )
    assert response.status_code == 422  # Unprocessable Entity

def test_deploy_edge_cases():
    # Test with a server port that's out of range
    response = client.post(
        "/deploy",
        json={
            "game_name": "test_game",
            "server_address": "127.0.0.1",
            "server_port": 70000  # out of range
        },
    )
    assert response.status_code == 400
    assert "detail" in response.json()
```

In this example, we're using FastAPI's built-in TestClient to make requests to our API.

- `test_deploy_success()` tests a successful deployment.
- `test_deploy_failure()` tests a deployment with an invalid server address. The exact error message will depend on the deployment process.
- `test_deploy_data_validation()` tests the Pydantic data validation. If the request data does not match the `DeployRequest` model, FastAPI will automatically return a 422 Unprocessable Entity response.
- `test_deploy_edge_cases()` tests an edge case where the server port is out of range. Depending on the deployment process, this might cause an error or be silently ignored.