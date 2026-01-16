export interface AiPromptInputProps {
    className?: string;
    promptText: string;
    setPromptText: (text: string) => void;
    onSubmit?: () => void;
    isLoading?: boolean;
    hideSubmitButton?: boolean;
}