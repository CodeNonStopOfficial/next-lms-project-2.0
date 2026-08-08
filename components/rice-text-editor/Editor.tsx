"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Menubar } from "./Menubar";
import { all, createLowlight } from "lowlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { MenubarTwo } from "./Menubartwo";
import Twitch from "@tiptap/extension-twitch";
import { Youtube } from "@tiptap/extension-youtube";

export default function RiceTextEditor({ field }: { field: any }) {
  const lowlight = createLowlight(all);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: "language-",
        defaultLanguage: "plaintext",
        enableTabIndentation: true,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      Image.configure({
        resize: {
          enabled: true,
          directions: ["top", "bottom", "left", "right"],
          minWidth: 25,
          minHeight: 25,
          alwaysPreserveAspectRatio: true,
        },
      }),

      Twitch.configure({
        allowFullscreen: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] px-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none [&_p]:my-0",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "<p>Hello World</p>",
    immediatelyRender: false,
  });

  return (
    <div className="w-full max-h-150 overflow-y-scroll rounded-lg border border-input dark:bg-input/30">
      <div className="sticky top-0 z-50">
        <Menubar editor={editor} />
        <MenubarTwo editor={editor} />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
