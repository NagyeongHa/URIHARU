function TextEdit() {
  //   const [title, setTitle] = useState();
  return (
    <>
      <div>
        <span>제목</span>
        <input type='text' name='title' />
      </div>
      <div>
        <span>작성자</span>
        <input type='text' name='writer' />
      </div>
      <div>
        <span>내용</span>
        <textarea type='text' name='contents' cols='30' rows='10'/>
      </div>
      <button type="submit">확인</button>
    </>
  );
}

export default TextEdit;
