/* Mayhemic chat widget. Add before </body>:
   <script src="/chatbot.js" defer></script> */
(function () {
  const WORKER_URL = "https://still-fog-837mychatbot.aryanmishra8920.workers.dev";
  const WEB3FORMS_KEY = "96892b45-7fc5-4a01-88e6-cb1a2880a3ca"; // public key, safe in website code
  const COLOR = "#1a56db";
  const history = [];

  const css = `
  #cb-btn{position:fixed;right:18px;bottom:18px;width:56px;height:56px;border-radius:50%;border:0;background:${COLOR};color:#fff;font-size:26px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);z-index:99999}
  #cb-box{position:fixed;right:18px;bottom:86px;width:340px;max-width:calc(100vw - 36px);height:480px;max-height:calc(100vh - 110px);background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:system-ui,sans-serif}
  #cb-head{background:${COLOR};color:#fff;padding:12px 14px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:8px}
  #cb-lead-btn{background:rgba(255,255,255,.2);color:#fff;border:0;border-radius:8px;padding:5px 10px;font-size:12px;cursor:pointer}
  #cb-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f5f6f8}
  .cb-m{padding:8px 12px;border-radius:12px;max-width:85%;font-size:14px;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}
  .cb-u{align-self:flex-end;background:${COLOR};color:#fff}
  .cb-a{align-self:flex-start;background:#fff;color:#111;border:1px solid #e3e5e8}
  #cb-in{display:flex;border-top:1px solid #e3e5e8}
  #cb-in input{flex:1;border:0;padding:12px;font-size:14px;outline:none}
  #cb-in button{border:0;background:none;color:${COLOR};font-weight:600;padding:0 14px;cursor:pointer}
  #cb-lead{display:none;flex:1;flex-direction:column;gap:10px;padding:14px;background:#f5f6f8;overflow-y:auto}
  #cb-lead p{margin:0;font-size:13px;color:#333}
  #cb-lead input,#cb-lead textarea{border:1px solid #cfd3d8;border-radius:8px;padding:10px;font-size:14px;font-family:inherit;outline:none}
  #cb-lead textarea{min-height:90px;resize:vertical}
  #cb-lead .cb-send{background:${COLOR};color:#fff;border:0;border-radius:8px;padding:11px;font-size:14px;font-weight:600;cursor:pointer}
  #cb-lead .cb-back{background:none;border:0;color:${COLOR};cursor:pointer;font-size:13px}
  #cb-lead-status{font-size:13px}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "cb-btn";
  btn.textContent = "💬";
  btn.setAttribute("aria-label", "Open chat");

  const box = document.createElement("div");
  box.id = "cb-box";
  box.innerHTML = `<div id="cb-head"><span>Chat with Mayhemic</span><button id="cb-lead-btn" type="button">Leave a message</button></div>
    <div id="cb-msgs"></div>
    <form id="cb-in"><input placeholder="Type your message..." autocomplete="off"><button>Send</button></form>
    <form id="cb-lead">
      <p>Want to talk to Aryan? Leave your details and he will contact you.</p>
      <input name="name" placeholder="Your name" required>
      <input name="contact" placeholder="Your phone number or email" required>
      <textarea name="message" placeholder="What do you need?" required></textarea>
      <input name="botcheck" style="display:none" tabindex="-1" autocomplete="off">
      <button class="cb-send" type="submit">Send message</button>
      <div id="cb-lead-status"></div>
      <button class="cb-back" type="button">Back to chat</button>
    </form>`;

  document.body.append(btn, box);
  const msgs = box.querySelector("#cb-msgs");
  const form = box.querySelector("#cb-in");
  const input = form.querySelector("input");
  const lead = box.querySelector("#cb-lead");
  const leadBtn = box.querySelector("#cb-lead-btn");
  const status = box.querySelector("#cb-lead-status");

  function showLead(on) {
    lead.style.display = on ? "flex" : "none";
    msgs.style.display = on ? "none" : "flex";
    form.style.display = on ? "none" : "flex";
    status.textContent = "";
  }

  function add(text, who) {
    const d = document.createElement("div");
    d.className = "cb-m " + (who === "user" ? "cb-u" : "cb-a");
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  add("Hi! Namaste! Ask me anything, in any language. To talk to Aryan directly, tap \"Leave a message\" at the top.", "bot");

  btn.onclick = () => {
    box.style.display = box.style.display === "flex" ? "none" : "flex";
    if (box.style.display === "flex") input.focus();
  };

  leadBtn.onclick = () => showLead(true);
  lead.querySelector(".cb-back").onclick = () => showLead(false);

  lead.onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(lead);
    if (f.get("botcheck")) return;
    status.style.color = "#333";
    status.textContent = "Sending...";
    const chat = history.map((m) => (m.role === "user" ? "Visitor: " : "Bot: ") + m.content).join("\n").slice(-1500);
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New message from Mayhemic website chat",
          from_name: "Mayhemic Chatbot",
          name: f.get("name"),
          contact: f.get("contact"),
          message: f.get("message"),
          chat_so_far: chat || "(no chat yet)",
        }),
      });
      const data = await r.json();
      if (data.success) {
        status.style.color = "#0a7a2f";
        status.textContent = "Thank you! Your message was sent. Aryan will contact you soon.";
        lead.reset();
      } else {
        throw new Error("fail");
      }
    } catch (err) {
      status.style.color = "#b00020";
      status.textContent = "Could not send. Please email mayhemic.9@gmail.com";
    }
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
