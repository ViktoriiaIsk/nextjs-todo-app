"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { addTodoWithState } from "@/server-actions";

interface ActionState {
  message: string;
  success: boolean;
}

interface SubmitButtonProps {
  formAction?: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}

export default function SubmitButton({ formAction = addTodoWithState }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const [state, action, isPending] = useActionState(formAction, { message: "", success: false });
  const formRef = useRef<HTMLFormElement | null>(null);

  // Clear form and reset state after successful submission
  useEffect(() => {
    if (state.success && !isPending) {
      // Find the form element and reset it
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.reset();
      }
    }
  }, [state.success, isPending]);

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
      
      {/* Show only error messages */}
      {state?.message && !state.success && (
        <div className="text-sm px-3 py-2 rounded-md bg-red-50 text-red-700 border border-red-200 break-words">
          {state.message}
        </div>
      )}
    </div>
  );
}
