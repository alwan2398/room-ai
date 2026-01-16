export interface TogglePlatformProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}