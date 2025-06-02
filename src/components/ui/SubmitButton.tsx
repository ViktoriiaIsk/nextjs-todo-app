"use client";

import { useActionState } from "react";
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

  return (
    <div className="flex flex-col gap-2">
      <Button 
        type="submit" 
        disabled={pending || isPending}
        formAction={action}
      >
        {(pending || isPending) ? "Adding..." : "Add"}
      </Button>
      
      {/* Show feedback from useActionState */}
      {state?.message && (
        <div className={`text-sm px-3 py-2 rounded-md ${
          state.success 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {state.message}
        </div>
      )}
    </div>
  );
}
