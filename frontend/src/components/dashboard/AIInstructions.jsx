
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import React, { useRef, useState } from "react";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

import {
  Undo2,
  Redo2,
  ChevronDown,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Eraser,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

function AiInstructions() {
  const [headingOpen, setHeadingOpen] = useState(false);
  const fileInputRef = useRef(null);
  const editor = useEditor({
    extensions: [

      StarterKit,

      Link.configure({
        openOnClick: false,
      }),

      TextStyle,
      Color,
      Image.configure({
        resize: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

    ],

    content: '',

    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const buttonClass =
    "flex h-8 w-8 items-center justify-center rounded text-gray-600 hover:bg-gray-100";

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = () => {
    const html = editor.getHTML();

    console.log("AI Instructions:", html);
  };

  // =========================================================
  // RESET
  // =========================================================

const handleReset = () => {
  editor
    .chain()
    .focus()
    .clearContent()
    .run();
};

  // =========================================================
  // UNDO
  // =========================================================

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  // =========================================================
  // REDO
  // =========================================================

  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  // =========================================================
  // LINK
  // =========================================================

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL:",
      previousUrl || "https://"
    );

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  // =========================================================
// IMAGE
// =========================================================

const addImage = () => {
  fileInputRef.current?.click();
};

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  // Only allow image files
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file.");
    event.target.value = "";
    return;
  }

  // Create temporary browser URL
  const imageUrl = URL.createObjectURL(file);

  editor
    .chain()
    .focus()
    .setImage({
      src: imageUrl,
    })
    .run();

  // Allow selecting the same image again
  event.target.value = "";
};

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

        <div className="border-b border-gray-200 px-4 py-3 text-left">
        <h2 className="text-sm font-semibold text-gray-800">
            AI Instructions
        </h2>
        </div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 px-3 py-2">

        {/* ===================================================
            UNDO
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={handleUndo}
          className={buttonClass}
          title="Undo"
        >
          <Undo2 size={17} />
        </button>

        {/* ===================================================
            REDO
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={handleRedo}
          className={buttonClass}
          title="Redo"
        >
          <Redo2 size={17} />
        </button>

        <div className="mx-1 h-5 w-px bg-gray-200" />

       {/* ===================================================
          HEADING DROPDOWN
      =================================================== */}

      <div className="relative">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setHeadingOpen((prev) => !prev);
          }}
          className="flex h-8 items-center gap-1 rounded px-2 text-sm text-gray-600 hover:bg-gray-100"
          title="Heading"
        >
          H
          <ChevronDown size={14} />
        </button>

        {headingOpen && (
          <div className="absolute left-0 top-9 z-50 w-40 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
            
            {/* Normal Text */}
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();

                editor
                  .chain()
                  .focus()
                  .setParagraph()
                  .run();

                setHeadingOpen(false);
              }}
              className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
            >
              Normal Text
            </button>

            {/* Heading 1 */}
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();

                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level })
                    .run();

                  setHeadingOpen(false);
                }}
                className={`block w-full rounded px-3 py-2 text-left hover:bg-gray-100 ${
                  level === 1
                    ? "text-xl font-bold"
                    : level === 2
                    ? "text-lg font-bold"
                    : level === 3
                    ? "text-base font-semibold"
                    : "text-sm font-medium"
                }`}
              >
                Heading {level}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===================================================
        TEXT ALIGNMENT
      =================================================== */}

      <div className="flex items-center gap-1">
        {/* Left */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .setTextAlign("left")
              .run();
          }}
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200"
              : ""
          }`}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>

        {/* Center */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .setTextAlign("center")
              .run();
          }}
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : ""
          }`}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>

        {/* Right */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .setTextAlign("right")
              .run();
          }}
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200"
              : ""
          }`}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
      </div>

        {/* ===================================================
            COLOR
        =================================================== */}

        <label
          className="relative flex h-8 cursor-pointer items-center gap-1 rounded px-2 hover:bg-gray-100"
          title="Text color"
        >
          <div className="h-5 w-5 rounded border border-gray-300 bg-black" />

          <ChevronDown size={14} />

          <input
            type="color"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={(event) => {
              editor
                .chain()
                .focus()
                .setColor(event.target.value)
                .run();
            }}
          />
        </label>

        <div className="mx-1 h-5 w-px bg-gray-200" />

        {/* ===================================================
            BOLD
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleBold()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("bold")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Bold"
        >
          <Bold size={17} />
        </button>

        {/* ===================================================
            ITALIC
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleItalic()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("italic")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Italic"
        >
          <Italic size={17} />
        </button>

        {/* ===================================================
            UNDERLINE
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("underline")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Underline"
        >
          <UnderlineIcon size={17} />
        </button>

        {/* ===================================================
            STRIKETHROUGH
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleStrike()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("strike")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Strikethrough"
        >
          <Strikethrough size={17} />
        </button>

        {/* ===================================================
            CODE
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleCode()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("code")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Code"
        >
          <Code size={17} />
        </button>

        {/* ===================================================
            CLEAR FORMATTING
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .clearNodes()
              .unsetAllMarks()
              .run();
          }}
          className={buttonClass}
          title="Clear formatting"
        >
          <Eraser size={17} />
        </button>

        {/* ===================================================
            BULLET LIST
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("bulletList")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Bullet list"
        >
          <List size={18} />
        </button>

        {/* ===================================================
            NUMBERED LIST
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run();
          }}
          className={`${buttonClass} ${
            editor.isActive("orderedList")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Numbered list"
        >
          <ListOrdered size={18} />
        </button>

        {/* ===================================================
            LINK
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            addLink();
          }}
          className={`${buttonClass} ${
            editor.isActive("link")
              ? "bg-gray-200 text-gray-900"
              : ""
          }`}
          title="Add link"
        >
          <LinkIcon size={17} />
        </button>

       {/* ===================================================
            IMAGE
        =================================================== */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            addImage();
          }}
          className={buttonClass}
          title="Add image"
        >
          <ImageIcon size={17} />
        </button>

        {/* ===================================================
            BLOCKQUOTE
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run();
          }}
          className={`flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 ${
            editor.isActive("blockquote")
              ? "bg-gray-200 text-gray-900"
              : "text-gray-600"
          }`}
          title="Blockquote"
        >
          <Quote size={17} />
        </button>

        {/* ===================================================
            HORIZONTAL RULE
        =================================================== */}

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();

            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run();
          }}
          className={buttonClass}
          title="Horizontal line"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* =====================================================
          EDITOR
      ===================================================== */}

      <div className="min-h-[200px] px-4 py-3">
        <EditorContent editor={editor} />
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex justify-end gap-2 border-t border-gray-200 px-4 py-3">

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AiInstructions;

