"use client"
import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Code2Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface iAppProps {
  editor: Editor | null;
}
export function Menubar({ editor }: iAppProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                  }
                  className={cn(
                    editor.isActive("bold") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Bold />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                  }
                  className={cn(
                    editor.isActive("italic") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Italic />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                  }
                  className={cn(
                    editor.isActive("strike") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Strikethrough />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Strike</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { level: 1 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading1Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 2 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { leve: 2 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading2Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 3 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { leve: 3 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading3Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 4 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { leve: 4 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading4Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 4</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 5 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { leve: 5 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading5Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 5</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 6 })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                  }
                  className={cn(
                    editor.isActive("heading", { leve: 6 }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Heading6Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Heading 6</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletlist")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={cn(
                    editor.isActive("bulletlist") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <ListIcon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={cn(
                    editor.isActive("orderedList") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <ListOrdered />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={cn(
                    editor.isActive({ textAlign: "left" }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <AlignLeft />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={cn(
                    editor.isActive({ textAlign: "right" }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <AlignRight />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={cn(
                    editor.isActive({ textAlign: "center" }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <AlignCenter />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align center</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "justify" })}
                  onPressedChange={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  className={cn(
                    editor.isActive({ textAlign: "justify" }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <AlignJustify />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align justify</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() =>
                    editor.chain().focus().toggleTextAlign("right").run()
                  }
                  className={cn(
                    editor.isActive({ textAlign: "right" }) &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <AlignCenterHorizontal />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Align Toggle</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("codeBlock")}
                  onPressedChange={() =>
                    editor.chain().focus().setCodeBlock().run()
                  }
                  className={cn(
                    editor.isActive("codeBlock") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Code2 />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Code</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Toggle
                  size="sm"
                  pressed={editor.isActive("codeBlock")}
                  onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                  }
                  className={cn(
                    editor.isActive("codeBlock") &&
                      "bg-muted text-muted-foreground border",
                  )}
                >
                  <Code2Icon />
                </Toggle>
              }
            ></TooltipTrigger>
            <TooltipContent>Toggle</TooltipContent>
          </Tooltip>
        </div>
        <div className="w-px h-6 bg-border mx-2"></div>
        <div className="flex flex-wrap gap-2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <Undo />
                </Button>
              }
            ></TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <Redo />
                </Button>
              }
            ></TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
