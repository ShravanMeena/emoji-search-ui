import ClipboardJS from "clipboard";

import React, { useState } from "react";
import { emojiData } from "./emojiData";

var clipboard = new ClipboardJS(".btn");

export default function App() {
  const [text, setText] = useState("");
  const [emojis, setEmojis] = useState(emojiData);

  const searchEmoji = (e) => {
    const filteredEmojis = emojiData?.filter((emoji) => {
      if (emoji.title?.toLowerCase().includes(e.target.value?.toLowerCase())) {
        return true;
      }
      if (emoji.keywords.includes(e.target.value)) {
        return true;
      }
      return false;
    });

    console.log(text);
    setEmojis(filteredEmojis);
    setText(e.target.value);
  };
  return (
    <div style={{ padding: 100 }}>
      <input
        type="text"
        placeholder="Search emoji..."
        onChange={(e) => searchEmoji(e)}
      />

      <div>
        {emojis?.map((item, index) => {
          return (
            <p data-clipboard-target="#foo">
              {item.symbol} : {item.keywords}
              <button
                class="btn"
                onClick={() => {
                  clipboard.on("success", function (e) {
                    e.clearSelection();
                  });
                }}
                data-clipboard-text={item.symbol}
              >
                Copy to clipboard
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}
