"use client";

import { useEffect, useMemo, useState } from "react";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import Twitch from "@tiptap/extension-twitch";
import Image from "@tiptap/extension-image";
import { common, createLowlight } from "lowlight";
import parse from "html-react-parser";
const lowlight = createLowlight(common);

interface RenderDescriptionProps {
  json: JSONContent;
}

export function RenderDescription({ json }: RenderDescriptionProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const output = useMemo(() => {
    if (!mounted) return "";
    return generateHTML(json, [
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
    ]);
  }, [json, mounted]);
  if (!mounted) return null;
  return (
    // <div
    //   className="prose prose-neutral dark:prose-invert max-w-none"
    //   dangerouslySetInnerHTML={{ __html: output }}
    // />
    <div className="prose dark:prose-invert prose-li:marker:text-primary">
      {parse(output)}
    </div>
  );
}
