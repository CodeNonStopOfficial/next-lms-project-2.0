"use client";
import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Underline,
  VideoIcon,
  Videotape,
} from "lucide-react";

interface iAppProps {
  editor: Editor | null;
}
export function MenubarTwo({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border border-input border-t-0 bg-card p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("image")}
                  onPressedChange={() => {
                    const url = window.prompt("Enter image URL");

                    if (!url) return;

                    editor.chain().focus().setImage({ src: url }).run();
                  }}
                  className={cn(
                    editor.isActive("image") &&
                      "border bg-muted text-muted-foreground",
                  )}
                >
                  <ImageIcon className="h-4 w-4" />
                </Toggle>
              }
            ></TooltipTrigger>

            <TooltipContent>
              <p>Insert Image</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("youtube")}
                  onPressedChange={() => {
                    const url = window.prompt("Enter Video URL");

                    if (!url) return;

                    editor.commands.setYoutubeVideo({
                      src: url,
                      width: Math.max(320),
                      height: Math.max(180),
                    });
                  }}
                  className={cn(
                    editor.isActive("youtube") &&
                      "border bg-muted text-muted-foreground",
                  )}
                >
                  <VideoIcon className="h-4 w-4" />
                </Toggle>
              }
            ></TooltipTrigger>

            <TooltipContent>
              <p>Insert Youtube Video</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("twitch")}
                  onPressedChange={() => {
                    const url = window.prompt("Enter Twitch URL");

                    if (!url) return;

                    editor.commands.setTwitchVideo({
                      src: url,
                      width: Math.max(320),
                      height: Math.max(380),
                    });
                  }}
                  className={cn(
                    editor.isActive("twitch") &&
                      "border bg-muted text-muted-foreground",
                  )}
                >
                  <Videotape className="h-4 w-4" />
                </Toggle>
              }
            ></TooltipTrigger>

            <TooltipContent>
              <p>Insert Twitch Video</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("underline")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()
                  }
                  className={cn(
                    editor.isActive("underline") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Underline />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
