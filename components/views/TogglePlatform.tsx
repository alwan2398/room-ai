import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TogglePlatformProps } from "@/types/TogglePlatform";
import { Monitor, Smartphone } from "lucide-react";

const TogglePlatform = ({ value, setValue, disabled }: TogglePlatformProps) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <ToggleGroup
        type="single"
        value={value || ""}
        onValueChange={(val) => {
          if (val) setValue(val);
        }}
        className="bg-muted p-1 rounded-xl gap-1"
      >
        <ToggleGroupItem
          value="application"
          disabled={disabled}
          className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm transition-all duration-200 px-4 py-2 hover:bg-background/50 data-[state=on]:hover:bg-background cursor-pointer"
        >
          <Smartphone className="size-4" /> Aplikasi
        </ToggleGroupItem>

        <ToggleGroupItem
          value="website"
          disabled={disabled}
          className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm transition-all duration-200 px-4 py-2 hover:bg-background/50 data-[state=on]:hover:bg-background cursor-pointer"
        >
          <Monitor className="size-4" /> Website
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TogglePlatform;
