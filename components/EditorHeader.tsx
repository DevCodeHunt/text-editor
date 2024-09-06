import IconButton from "./IconButton";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Brush,
  Code,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";
import Dropdown from "./Dropdown";
import { ColorPicker, useColor, type IColor } from "react-color-palette";
import "react-color-palette/css";
import { MutableRefObject, useCallback, useMemo, useState } from "react";
import useGoogleFonts from "@/hooks/useGoogleFonts";
import UploadImage from "./UploadImage";
import useToggle from "@/hooks/useToggle";
import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

const headerOptions = [
  { label: "Header 1", value: "Header 1" }, // H1
  { label: "Header 2", value: "Header 2" }, // H2
  { label: "Header 3", value: "Header 3" }, // H3
  { label: "Header 4", value: "Header 4" }, // H4
  { label: "Header 5", value: "Header 5" }, // H5
  { label: "Header 6", value: "Header 6" }, // H6
  { label: "Normal", value: "Normal" },
];

type EditorHedaerProps = {
  editor: Editor;
};

const EditorHeader = ({ editor }: EditorHedaerProps) => {
  const [color, setColor] = useColor("#000000");
  const [highLightColor, setHighLightColor] = useColor("");
  const [textColor, setTextColor] = useState("#000000");
  const [font, setFont] = useState("Poppins");
  const [headerOption, setHeaderOption] = useState("Normal");
  const googleFonts = useGoogleFonts();
  const toggleImage = useToggle();
  const toggleHightlight = useToggle();
  const toggleColorPalette = useToggle();

  const fonts = useMemo(() => {
    return googleFonts.slice().map((font) => ({
      value: font,
      label: font,
    }));
  }, [googleFonts]);

  const onChangeComplete = (color: IColor) => {
    setTextColor(color.hex);
    editor.chain().focus().setColor(color.hex).run();
    toggleColorPalette.toggleState();
  };

  const onHighlightChangeComplete = (color: IColor) => {
    editor.chain().focus().toggleHighlight({ color: color.hex }).run();
    toggleHightlight.toggleState();
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const loadFont = (fontFamily: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}&display=swap`;
    document.head.appendChild(link);
  };

  const handleFontChange = (selectedFont: string) => {
    setFont(selectedFont);
    loadFont(selectedFont)
    editor.chain().focus().setFontFamily(selectedFont).run(); // Set the font family dynamically
  };

  const handleHeaderChange = (header: string) => {
    setHeaderOption(header);
    if (header === "Normal") {
      editor.commands.setParagraph();
      return;
    }
    let level: Level;
    switch (header) {
      case "Header 1":
        level = 1;
        break;
      case "Header 2":
        level = 2;
        break;
      case "Header 3":
        level = 3;
        break;
      case "Header 4":
        level = 4;
        break;
      case "Header 5":
        level = 5;
        break;
      default:
        level = 6;
        break;
    }
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="p-2 border-b flex items-center gap-2 flex-wrap relative">
      <Dropdown options={fonts} value={font} setValue={handleFontChange} />
      <Dropdown
        options={headerOptions}
        value={headerOption}
        setValue={handleHeaderChange}
      />
      <div
        ref={toggleHightlight.toggleRef as MutableRefObject<HTMLDivElement>}
        onClick={toggleHightlight.toggleState}
        className="relative"
      >
        <IconButton icon={Brush} onClick={() => {}} />
        {toggleHightlight.toggle && (
          <div className="absolute top-10 z-10">
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              height={100}
              color={highLightColor}
              onChange={setHighLightColor}
              onChangeComplete={onHighlightChangeComplete}
            />
          </div>
        )}
      </div>

      <div
        ref={toggleColorPalette.toggleRef as MutableRefObject<HTMLDivElement>}
        onClick={toggleColorPalette.toggleState}
        className="relative"
      >
        <IconButton icon={Baseline} onClick={() => {}} color={textColor} />
        {toggleColorPalette.toggle && (
          <div className="absolute top-10 z-10">
            <ColorPicker
              hideInput={["rgb", "hsv"]}
              height={100}
              color={color}
              onChange={setColor}
              onChangeComplete={onChangeComplete}
            />
          </div>
        )}
      </div>
      <IconButton
        icon={Bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <IconButton
        icon={Italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <IconButton
        icon={Underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <IconButton
        icon={Strikethrough}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      />
      <IconButton
        icon={Code}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <IconButton icon={Link} onClick={setLink} />
      <div
        ref={toggleImage.toggleRef as MutableRefObject<HTMLDivElement>}
        onClick={toggleImage.toggleState}
        className="relative"
      >
        <IconButton icon={Image} onClick={() => {}} />
        {toggleImage.toggle && (
          <UploadImage editor={editor} onClose={toggleImage.toggleState} />
        )}
      </div>
      <IconButton
        icon={List}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <IconButton
        icon={ListOrdered}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      />
      <IconButton
        icon={AlignLeft}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />
      <IconButton
        icon={AlignRight}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />
      <IconButton
        icon={AlignCenter}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />
      <IconButton
        icon={AlignJustify}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      />
      <IconButton
        icon={Quote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
      />
    </div>
  );
};

export default EditorHeader;
