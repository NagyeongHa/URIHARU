import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import theme from "../styles/theme";

function TextEditor({ content, setContent }) {
  // 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
  const toolbarOptions = [
    // ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
  ];
  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    // "link",
    // "image",
    // "video",
    "width",
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <Div>
      <ReactQuill
        theme='snow'
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder='내용을 입력해주세요'
      />
    </Div>
  );
}

const Div = styled.div`
  .ql-container {
    height: 42vw;
    font-family: inherit;
    font-size: 1.1rem;

    @media ${theme.device.mobile} {
      height: 100vw;
      font-size: 1.2rem;
    }

    @media ${theme.device.tablet} {
      height: 75vw;
    }
  }

  .ql-editor {
    line-height: 2.2rem;
  }

  .quill {
    width: 72%;
    margin: 1rem auto 3rem auto;

    @media ${theme.device.mobile} {
      width: 96vw;
    }
  }
`;
export default TextEditor;
