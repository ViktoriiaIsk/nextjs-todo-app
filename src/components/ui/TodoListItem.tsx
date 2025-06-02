import { Todo } from "@/types";
import { deleteTodo, toggleTodo } from "@/server-actions";
import { Button } from "@/components/ui/button";

export default function TodoListItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center justify-between gap-4 border border-border bg-card shadow-sm p-4 rounded-lg transition-all hover:shadow-md hover:bg-accent">
      <form action={toggleTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <input type="hidden" name="checked" value={(!todo.checked).toString()} />
        <button
          type="submit"
          className="mr-2 text-xl focus:outline-none focus:ring-2 focus:ring-ring rounded transition-all hover:bg-accent hover:scale-110"
          aria-label={todo.checked ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.checked ? "✅" : "⬜"}
        </button>
      </form>

      <span className={`flex-1 text-base text-card-foreground ${todo.checked ? "line-through text-muted-foreground" : ""}`}>
        {todo.task}
      </span>

      <form action={deleteTodo}>
        <input type="hidden" name="id" value={todo.id} />
        <Button variant="destructive" size="sm" className="ml-2 shadow-sm hover:shadow-md transition-all">
          Remove
        </Button>
      </form>
    </li>
  );
}
