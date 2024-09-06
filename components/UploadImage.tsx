import { Editor } from "@tiptap/react";
import React, { useCallback, useRef } from "react";

type UploadImageProps = {
  editor: Editor;
  onClose: () => void;
};
const UploadImage = ({ editor, onClose }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      editor
        .chain()
        .focus()
        .setImage({ src: URL.createObjectURL(file) })
        .run();
        onClose()
    },
    [editor, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const inputValue = inputRef.current?.value || "";
        editor.chain().focus().setImage({ src: inputValue }).run();
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        onClose()
      }
    },
    [editor, onClose]
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-9 z-10 bg-white rounded-md p-4 w-[300px]"
    >
      <label htmlFor="mediaFile" className="cursor-pointer">
        Upload From Computer
        <input type="file" id="mediaFile" hidden onChange={handleFileUpload} />
      </label>
      <div className="divider-x my-3"></div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Paste your url here..."
        id="mediaUrl"
        onKeyDown={handleKeyDown}
        className="border rounded-md text-sm  w-full py-2 px-2 border-gray-300 outline-none"
      />
    </div>
  );
};

export default UploadImage;
