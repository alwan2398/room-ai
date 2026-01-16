"use client";

import { AiPromptInputProps } from "@/types/InputPrompt";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group";
import { cn } from "@/lib/utils";
import { CornerDownLeftIcon, Loader2 } from "lucide-react";
import { Spinner } from "../ui/spinner";

const AiPromptInput = ({
  className,
  promptText,
  setPromptText,
  onSubmit,
  isLoading,
  hideSubmitButton = false,
}: AiPromptInputProps) => {
  return (
    <div className="bg-background">
      <InputGroup
        className={cn(
          "min-h-[172px] bg-background rounded-3xl",
          className && className,
        )}
      >
        <InputGroupTextarea
          className="text-base! py-2.5"
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
              onClick={onSubmit}
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
