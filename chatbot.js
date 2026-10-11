/* Chat widget. Add before </body>:
   <script src="/chatbot.js" defer></script>
   Then set WORKER_URL below to your Worker URL. */
(function () {
  const WORKER_URL = "https://still-fog-837mychatbot.aryanmishra8920.workers.dev";
  const COLOR = "#1a56db";
  const history = [];

  const css = `
  #cb-btn{position:fixed;right:18px;bottom:18px;width:56px;height:56px;border-radius:50%;border:0;background:${COLOR};color:#fff;font-size:26px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:99999}
  #cb-box{position:fixed;right:18px;bottom:86px;width:340px;max-width:calc(100vw - 36px);height:480px;max-height:calc(100vh - 110px);background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:system-ui,sans-serif}
  #cb-head{background:${COLOR};color:#fff;padding:12px 14px;font-weight:600}
  #cb-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f5f6f8}
  .cb-m{padding:8px 12px;border-radius:12px;max-width:85%;font-size:14px;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}
  .cb-u{align-self:flex-end;background:${COLOR};color:#fff}
  .cb-a{align-self:flex-start;background:#fff;color:#111;border:1px solid #e3e5e8}
  #cb-in{display:flex;border-top:1px solid #e3e5e8}
  #cb-in input{flex:1;border:0;padding:12px;font-size:14px;outline:none}
  #cb-in button{border:0;background:none;color:${COLOR};font-weight:600;padding:0 14px;cursor:pointer}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "cb-btn";
  btn.textContent = "💬";
  btn.setAttribute("aria-label", "Open chat");

  const box = document.createElement("div");
  box.id = "cb-box";
  box.innerHTML = `<div id="cb-head">Chat with Mayhemic</div>
    <div id="cb-msgs"></div>
    <form id="cb-in"><input placeholder="Type your message..." autocomplete="off"><button>Send</button></form>`;

  document.body.append(btn, box);
  const msgs = box.querySelector("#cb-msgs");
  const form = box.querySelector("#cb-in");
  const input = form.querySelector("input");

  function add(text, who) {
    const d = document.createElement("div");
    d.className = "cb-m " + (who === "user" ? "cb-u" : "cb-a");
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  add("Hi! Namaste! Ask me anything, in any language.", "bot");

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    if (box.style.display === "flex") input.focus();
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    add(text, "user");
    history.push({ role: "user", content: text });
    const wait = add("...", "bot");
    try {
      const r = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const { reply } = await r.json();
      wait.textContent = reply;
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      wait.textContent = "Connection error. Please try again.";
    }
    msgs.scrollTop = msgs.scrollHeight;
  };
})();
