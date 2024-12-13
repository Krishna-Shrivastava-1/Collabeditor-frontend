import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

// Make sure the URL here matches your server's running port
const socket = io("https://collabeditor-7nzq.onrender.com");

const Editor = () => {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  useEffect(() => {
    socket.on('load-document', (document) => {
      setContent(document);
    });
  
    socket.on("receive-changes", (delta) => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.updateContents(delta);
      }
    });
  
    // Socket should stay open until component is unmounted
    return () => {
      // Optional: Disconnect if needed after a user disconnects
      socket.off("load-document"); // Remove the listener
      socket.off("receive-changes"); // Remove the listener
    };
  }, []); // Dependency array ensures it runs only once
  

  const handleChange = (value, delta, source) => {
    setContent(value);
    if (source === "user") {
      socket.emit("send-changes", delta);
    }
  };

  return (
    <div className='cont'>
      <ReactQuill className='editor'
        ref={quillRef}
        value={content}
        onChange={(content, delta, source) => handleChange(content, delta, source)}
        theme='snow'
      />
    </div>
  );
};

export default Editor;
