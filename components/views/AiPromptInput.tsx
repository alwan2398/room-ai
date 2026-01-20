"use client";

import { AiPromptInputProps } from "@/types/InputPrompt";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { cn } from "@/lib/utils";
import { CornerDownLeftIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useSession } from "@/lib/auth-client";
import { useAuthStore } from "@/store/useAuthStore";

const AiPromptInput = ({
  className,
  promptText,
  setPromptText,
  onSubmit,
  isLoading,
  hideSubmitButton = false,
}: AiPromptInputProps) => {
  const { data: session } = useSession();
  const { openAuthModal } = useAuthStore();

  const handleSubmit = () => {
    if (!session) {
      openAuthModal("signup");
      return;
    }
    console.log("Proceed to generation");
    onSubmit?.();
  };

  return (
    <div className="bg-background rounded-3xl">
      <InputGroup
        className={cn(
          "min-h-[172px] bg-background rounded-3xl cursor-text",
          className && className,
        )}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          e.currentTarget.querySelector("textarea")?.focus();
        }}
      >
        <InputGroupTextarea
          className="text-base! py-2.5 focus:placeholder-transparent"
          placeholder="Masukkan Prompt Anda..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
        <InputGroupAddon
          className="flex items-center justify-end"
          align="block-end"
        >
          {!hideSubmitButton && (
            <InputGroupButton
              variant="default"
              size="sm"
              className=""
              disabled={!promptText?.trim() || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  Buat
                  <CornerDownLeftIcon className="size-4" />
                </>
              )}
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default AiPromptInput;
