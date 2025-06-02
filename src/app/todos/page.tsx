import type { Metadata } from 'next'
import { getTodos } from "@/server-actions";
import TodoListItem from "@/components/ui/TodoListItem";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Manage your tasks efficiently',
}

function TodoListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-16 bg-muted rounded-md"></div>
        </div>
      ))}
    </div>
  );
}

async function TodoList() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default async function TodosPage() {
  return (
    <div className="min-h-[60vh] flex items-start justify-center py-10 bg-background">
      <Card className="w-full max-w-xl shadow-lg rounded-xl border border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-card-foreground">
            📝 My Todo List
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Organize your tasks and boost productivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="flex flex-col sm:flex-row gap-2">
            <Input 
              name="task" 
              placeholder="What needs to be done?" 
              className="flex-1 border-border bg-background text-foreground"
              minLength={1}
              maxLength={100}
            />
            <SubmitButton />
          </form>
          <TodoList />
        </CardContent>
      </Card>
    </div>
  );
}
