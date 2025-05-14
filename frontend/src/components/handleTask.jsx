Here is an example of a React component that might be used in a system to track tasks related to testing a game on various modern web browsers. This example uses TypeScript interfaces for prop type checking, and Material-UI for styling. Note that this is a simplified example and might need to be adjusted based on your specific needs and application setup.

```jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@material-ui/core';

interface TaskProps {
  task: string;
  requirements: string[];
}

/**
 * TaskCard component
 * @param {string} task - The task description.
 * @param {string[]} requirements - An array of strings, each one specifying a requirement for the task.
 */
const TaskCard: React.FC<TaskProps> = ({ task, requirements }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTask = async () => {
    setIsLoading(true);
    // Here, include the logic for handling the task
    // For instance, you could make a request to an API
    // After the operation is finished, set loading to false
    setIsLoading(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{task}</Typography>
        {requirements.map((requirement, index) => (
          <Typography key={index}>{requirement}</Typography>
        ))}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={handleTask}>
            Start Task
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
```

This component displays the task and its requirements, and includes a button to start the task. While the task is running, a loading spinner is displayed. Note that this component doesn't actually implement any cross-browser testing - it just simulates the process of starting a task and waiting for it to finish. The actual logic for running the task would need to be implemented in the `handleTask` function.

Also note that this code assumes that you have @material-ui/core installed in your project. If you don't, you can install it with `npm install @material-ui/core`, or you can replace the Material-UI components with equivalent components from another library or your own custom components.