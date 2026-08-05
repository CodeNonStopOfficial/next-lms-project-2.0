"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Menubar } from "./Menubar";
import { CodeBlock } from "@tiptap/extension-code-block";
import { all, createLowlight } from "lowlight";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import { MenubarTwo } from "./Menubartwo";
import Twitch from "@tiptap/extension-twitch";
import { Youtube } from "@tiptap/extension-youtube";
import { Underline } from "@tiptap/extension-underline";

export function RiceTextEditor({ field }: { field: any }) {
  const lowlight = createLowlight(all);
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Document,
      Image,
      Twitch,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: "language-",
        defaultLanguage: "plaintext",
        enableTabIndentation: true,
        HTMLAttributes: {
          class:
            "rounded-xl bg-zinc-950 text-zinc-100 p-4 my-6 overflow-x-auto font-mono text-2xl",
        },
      }),
      Youtube.configure({
        controls: false,
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
    immediatelyRender: false
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <MenubarTwo editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
