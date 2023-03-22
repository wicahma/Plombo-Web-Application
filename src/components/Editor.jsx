import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorComponent = (props) => {
  const [value, setValue] = useState();
  const [limit, setLimit] = useState(false);
  const [size, setSize] = useState();

  const handleLimit = (e) => {
    const sizes = new Blob([e]).size / 1000000;
    setSize(sizes);
    if (sizes < props.maxDesc) {
      props.value(e);
      setValue(e);
      setLimit(false);
    } else {
      setLimit(true);
    }
  };
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "direction",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "clean",
  ];
  const modules = {
    toolbar: [
      [{ font: [] }, { header: [1, 2, 3, false] }],
      [{ align: [] }],
      [("bold", "italic", "underline", "strike", "blockquote")],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <>
      <ReactQuill
        value={value}
        onChange={(e) => handleLimit(e)}
        modules={modules}
        formats={formats}
        placeholder="Masukkan Isi dari Artikel anda disini..."
      />
      <div className="col-sm-12 d-flex flex-wrap justify-content-between mt-2">
        <div>
          <p className="editor-size-counter">
            Size : {size} / {props.maxDesc} Mb
          </p>
        </div>

        {limit && (
          <div>
            <p className="editor-message-limit">
              input sudah melebihi limit, anda tidak bisa menambahkan deskripsi
              lagi.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default EditorComponent;
