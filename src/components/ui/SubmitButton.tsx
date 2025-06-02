"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { addTodoWithState } from "@/server-actions";

interface ActionState {
  message?: string;
  error?: string;
}

interface SubmitButtonProps {
  formAction?: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}

export default function SubmitButton({ formAction = addTodoWithState }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [state, action, isPending] = useActionState(formAction, { message: "", error: "" });

  // Clear form after successful submission
  useEffect(() => {
    if (state.message && !state.error && !isPending) {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.reset();
      }
    }
  }, [state.message, state.error, isPending]);

  return (
    <div className="flex flex-col gap-2">
      <Button 
        type="submit" 
        disabled={pending || isPending}
        formAction={action}
        className="whitespace-nowrap"
      >
        {(pending || isPending) ? "Adding..." : "Add"}
      </Button>
      
      {/* Show error messages */}
      {state?.error && (
        <div className="text-sm px-3 py-2 rounded-md bg-red-50 text-red-700 border border-red-200 break-words">
          {state.error}
        </div>
      )}
    </div>
  );
}
