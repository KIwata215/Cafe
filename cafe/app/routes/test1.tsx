import { SetStateAction, useState } from "react";
import { Link } from "@remix-run/react";

export default function Test1() {
  // useStateを使ってフォームの入力値を管理
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");

  // 入力値が変更されたときの処理
  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setInputText(event.target.value);
    setError("");  // エラーメッセージをリセット
  };

  // フォームの送信時にテキストが空でないかをチェック
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!inputText.trim()) {
      setError("テキストは必須です");
      return;
    }

    // フォームが正しい場合、遷移
    // 入力後にフォームを送信するためのリンク
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">テキストを入力してください:</label>
        <input
          id="textInput"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="ここに入力"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 入力後にフォームを送信するためのリンク */}
        <button type="submit">Go to Test Page</button>
      </form>

      {inputText.trim() && (
        <Link to={`/`}>
          <button>Go to Test Page</button>
        </Link>
      )}
    </div>
  );
}