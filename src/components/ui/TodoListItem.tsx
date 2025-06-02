import { Todo } from "@/types";
import { deleteTodo, toggleTodo } from "@/server-actions";
import { Button } from "@/components/ui/button";

export default function TodoListItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border bg-card shadow-sm p-4 rounded-lg transition-all hover:shadow-md hover:bg-accent">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <form action={toggleTodo}>
          <input type="hidden" name="id" value={todo.id} />
          <input type="hidden" name="checked" value={(!todo.checked).toString()} />
          <button
            type="submit"
            className="text-xl focus:outline-none focus:ring-2 focus:ring-ring rounded transition-all hover:bg-accent hover:scale-110 flex-shrink-0"
            aria-label={todo.checked ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.checked ? "✅" : "⬜"}
          </button>
        </form>

        <span className={`text-base text-card-foreground break-words flex-1 min-w-0 ${todo.checked ? "line-through text-muted-foreground" : ""}`}>
          {todo.task}
        </span>
      </div>

      <form action={deleteTodo} className="flex-shrink-0">
        <input type="hidden" name="id" value={todo.id} />
        <Button variant="destructive" size="sm" className="shadow-sm hover:shadow-md transition-all whitespace-nowrap">
          Remove
        </Button>
      </form>
    </li>
  );
}
