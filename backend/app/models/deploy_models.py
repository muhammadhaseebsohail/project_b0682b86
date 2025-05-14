The provided code already includes all the necessary Pydantic models, service layer function, and FastAPI endpoint as per the prompt's requirements. Here's the complete code for better readability:

First, the necessary imports:

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
```

Then, define the Pydantic models:

```python
class DeployRequest(BaseModel):
    game_name: str
    server_address: str
    server_port: int

class DeployResponse(BaseModel):
    status: str
    message: str
```

Next, the service layer function:

```python
def deploy_game(game_name: str, server_address: str, server_port: int) -> DeployResponse:
    try:
        # Code to deploy the game to a server goes here.
        logging.info(f"Deploying {game_name} to {server_address}:{server_port}")
        
        # If deployment is successful:
        return DeployResponse(status="success", message=f"Game {game_name} has been successfully deployed.")
    except Exception as e:
        logging.error(f"Failed to deploy {game_name} due to {e}")
        return DeployResponse(status="failure", message=str(e))
```

Finally, the FastAPI endpoint:

```python
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