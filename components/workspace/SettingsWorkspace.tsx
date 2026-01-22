"use client";

import { THEME_LIST } from "@/constant/ThemesConst";
import { ChevronUp, Edit, LogOut, Check, X } from "lucide-react";
import { getThemePalette } from "@/lib/themePalette";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef, useEffect } from "react";
import EditWorkspace from "./EditWorkspace";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectTitle } from "@/actions/project-actions";
import { toast } from "sonner";

interface SettingsWorkspaceProps {
  projectId: string;
  initialTitle: string;
}

const SettingsWorkspace = ({ projectId, initialTitle }: SettingsWorkspaceProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Better Auth session
  const { data: session, isPending: isSessionLoading } = useSession();

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Update project title mutation with optimistic updates
  const updateTitleMutation = useMutation({
    mutationFn: async (newTitle: string) => {
      const result = await updateProjectTitle({ projectId, newTitle });
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onMutate: async (newTitle: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["project", projectId] });

      // Snapshot the previous value
      const previousTitle = title;

      // Optimistically update the title
      setTitle(newTitle);

      // Return context with previous value
      return { previousTitle };
    },
    onError: (error, _newTitle, context) => {
      // Rollback to previous title
      if (context?.previousTitle) {
        setTitle(context.previousTitle);
      }
      toast.error(error.message || "Gagal mengubah judul");
    },
    onSuccess: () => {
      toast.success("Judul berhasil diubah");
    },
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const handleSaveTitle = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      toast.error("Judul minimal 3 karakter");
      return;
    }
    if (trimmedTitle === initialTitle) {
      setIsEditing(false);
      return;
    }
    updateTitleMutation.mutate(trimmedTitle);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveTitle();
    } else if (e.key === "Escape") {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setTitle(initialTitle);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name?: string | null) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-[300px] bg-gray-950 h-[90vh] p-5 border-r border-gray-800 hidden md:block">
      <div className="my-5 flex flex-col gap-y-6">
        {/* Editable Project Title */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={handleKeyDown}
                className="h-7 text-sm font-semibold bg-gray-900 border-gray-700"
                disabled={updateTitleMutation.isPending}
              />
              <button
                onClick={handleSaveTitle}
                className="text-green-500 hover:text-green-400"
                disabled={updateTitleMutation.isPending}
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-red-500 hover:text-red-400"
                disabled={updateTitleMutation.isPending}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-sm text-white truncate max-w-[200px]">
                {title}
              </h2>
              <Edit
                className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsEditing(true)}
              />
            </>
          )}
        </div>

        {/* Themes Color */}
        <div className="space-y-3 flex flex-col h-full overflow-hidden border-b pb-4">
          <h2 className="font-semibold text-sm">Themes Color</h2>

          <ScrollArea className="h-[280px] pr-3">
            <div className="space-y-3">
              {THEME_LIST.map((theme) => {
                const palette = getThemePalette(theme.style);

                return (
                  <div
                    key={theme.id}
                    className={`flex flex-col rounded-lg px-3 py-2 hover:bg-gray-800 cursor-pointer border ${
                      selectedTheme === theme.id
                        ? "border-blue-500 bg-gray-800"
                        : "border-gray-700"
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <span className="text-sm text-gray-100 font-mono">
                      {theme.name}
                    </span>

                    <div className="flex items-center gap-1">
                      {palette.map((color, idx) => (
                        <div
                          key={idx}
                          className="h-3 w-3 rounded-full border border-black/10 mt-3 line-clamp-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Input edit with AI */}
        <div className="border-b pb-4">
          <EditWorkspace />
        </div>

        {/* User Profile with Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="border border-gray-800 p-2 rounded-lg flex items-center gap-2 relative cursor-pointer hover:bg-gray-900 transition-colors">
              <Avatar className="h-9 w-9">
                {session?.user?.image && (
                  <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
                )}
                <AvatarFallback className="bg-gray-700 text-white text-xs">
                  {getUserInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="font-semibold text-sm text-white truncate">
                  {isSessionLoading ? "Loading..." : session?.user?.name || "Guest"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {isSessionLoading ? "" : session?.user?.email || ""}
                </p>
              </div>
              <ChevronUp className="text-white h-4 w-4 shrink-0" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SettingsWorkspace;
