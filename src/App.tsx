import TodoList from "./components/TodoList";
import { TaskProvider } from "./hooks/useTaskState";

function App() {
  return (
    <TaskProvider>
      <TodoList />
    </TaskProvider>
  );
}

export default App;
