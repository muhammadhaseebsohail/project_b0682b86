Here is an example of an API endpoint for deploying a game to a server.

First, let's define the Pydantic models:

```python
from pydantic import BaseModel

class DeployRequest(BaseModel):
    game_name: str
    server_address: str
    server_port: int

class DeployResponse(BaseModel):
    status: str
    message: str
```

The `DeployRequest` model validates the incoming request data: `game_name`, `server_address`, and `server_port`. The `DeployResponse` model will be used to structure the JSON response from the server.

Next, let's create the service layer:

```python
import logging

def deploy_game(game_name: str, server_address: str, server_port: int) -> DeployResponse:
    try:
        # Code to deploy the game to a server goes here.
        # This is a placeholder and will depend on your specific deployment process.
        logging.info(f"Deploying {game_name} to {server_address}:{server_port}")
        
        # If deployment is successful:
        return DeployResponse(status="success", message=f"Game {game_name} has been successfully deployed.")
    except Exception as e:
        logging.error(f"Failed to deploy {game_name} due to {e}")
        return DeployResponse(status="failure", message=str(e))
```

This service function `deploy_game` takes in the game's name and server's address and port, deploys the game, and returns a `DeployResponse`. Error handling and logging are included.

Finally, let's define the FastAPI endpoint:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/deploy", response_model=DeployResponse)
async def deploy(request: DeployRequest):
    """
    Deploy a game to the specified server.

    - **game_name**: The name of the game to be deployed
    - **server_address**: The address of the server where the game will be deployed
    - **server_port**: The port to use for deployment on the server
    """

    response = deploy_game(request.game_name, request.server_address, request.server_port)
    
    if response.status == "failure":
        raise HTTPException(status_code=400, detail=response.message)

    return response
```

This FastAPI application provides a POST endpoint at `/deploy` that accepts a `DeployRequest` and returns a `DeployResponse`. It uses the FastAPI's built-in exception handling to throw an HTTP 400 error if the deployment fails.

This endpoint also includes a docstring that will be used to generate OpenAPI documentation. The CORS middleware is included to allow requests from any origin, which can be restricted as necessary.