"use client";

import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Blockquote from "@tiptap/extension-blockquote";
import Text from "@tiptap/extension-text";
import Image from "@tiptap/extension-image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorHeader from "./EditorHeader";
import { all, createLowlight } from "lowlight";
import Highlight from "@tiptap/extension-highlight";
const lowlight = createLowlight(all);

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Blockquote,
      Bold,
      Italic,
      Underline,
      Strike,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      TextStyle,
      Image,
      Color,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        autolink: true,
      }),
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],

    content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>

        <p>
          I like lists. Let’s add one:
        </p>
        <ul>
          <li>This is a bullet list.</li>
          <li>And it has three list items.</li>
          <li>Here is the third one.</li>
        </ul>
        <p>
          Do you want to see one more? I bet! Here is another one:
        </p>
        <ol>
          <li>That’s a different list, actually it’s an ordered list.</li>
          <li>It also has three list items.</li>
          <li>And all of them are numbered.</li>
        </ol>
        <p>
          Lists would be nothing without list items.
        </p>

        <p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
        <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
        <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
        <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
        <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
        <p><span style="font-family: var(--title-font-family)">Then there are CSS variables, the new hotness.</span></p>


        <blockquote>
          Nothing is impossible, the word itself says “I’m possible!”
        </blockquote>
        <p>Audrey Hepburn</p>

        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-2xl w-full bg-white rounded-md my-20">
      <EditorHeader editor={editor} />
      <EditorContent editor={editor} />{" "}
    </div>
  );
};

export default Tiptap;
