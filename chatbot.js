/* Mayhemic website assistant
   HOW TO KEEP IT UP TO DATE: edit the KB list below (answers and keywords) and the two lines under it.
   Each entry: k = words people may type, a = the reply, c = suggestion buttons shown after the reply.
   Replies support **bold** and [link text](#section-or-url). */
(function () {
  'use strict';
  var UPDATED = '2026-10-17';
  var EMAIL = 'mayhemic.9@gmail.com';
  var PORTAL = '/fees.html';

  var KB = [
    { id: 'hello', k: ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good evening', 'good afternoon'],
      a: 'Hello! I am the Mayhemic assistant. I can tell you about our school platform, what teachers and parents get, security, and how to get started. What would you like to know?',
      c: ['What do you build?', 'Teacher portal', 'Parent portal', 'Pricing'] },
    { id: 'about', k: ['what is mayhemic', 'about mayhemic', 'about', 'company', 'who are you', 'what do you do', 'what does mayhemic do', 'startup'],
      a: 'Mayhemic is a new company from Lucknow, India, building SaaS and automation tools that give people their time back. Our first product is a **school platform** that replaces paper registers, fee cards and circulars.',
      c: ['What do you build?', 'Who is the founder?', 'What is coming next?'] },
    { id: 'founder', k: ['founder', 'ceo', 'aryan', 'who built', 'who made', 'who created', 'owner', 'behind mayhemic'],
      a: 'Mayhemic was started by **Aryan Mishra**, Founder and CEO, based in Lucknow. It is his first company and he is building it one careful step at a time.',
      c: ['What do you build?', 'Contact'] },
    { id: 'product', k: ['product', 'what do you build', 'what are you building', 'platform', 'erp', 'school software', 'school management', 'mayhemic fees', 'features', 'what can it do', 'what does it do'],
      a: 'Our **school platform** is in early access. It has three logins:\n**School office:** fees, receipts, students, attendance reports, notices, and login management.\n**Teachers:** attendance, class list, homework, marks, remarks and notices.\n**Parents:** fees, attendance, homework, marks, remarks and notices.\nThe goal is simple: no more paper registers.',
      c: ['Fee features', 'Attendance', 'Teacher portal', 'Parent portal'] },
    { id: 'fees', k: ['fee', 'fees', 'payment', 'receipt', 'dues', 'pending', 'discount', 'collect', 'fee card', 'fee features'],
      a: 'The fee side lets the school office:\n- record payments (cash, UPI or cheque) and print a receipt in one click\n- see collected, pending and class-wise dues on one dashboard\n- add a charge or reduce a student\'s fee with a reason (for example a sibling discount)\n- void a wrongly entered payment\n- import hundreds of students from a CSV file\n- edit or delete a student\nParents can see their child\'s fee status and payment history.',
      c: ['Import students', 'Parent portal', 'WhatsApp reminders'] },
    { id: 'attendance', k: ['attendance', 'register', 'present', 'absent', 'bunk', 'roll call', 'daily register'],
      a: 'Teachers mark attendance for their class in a few taps. Everyone starts as present, so only absent and late students need a tap. Teachers can edit past days, see a monthly report with percentages, and download it as a CSV. Students below 75% show in red. Parents see attendance in their portal. Automatic WhatsApp alerts to parents of absent students are built in and switch on once WhatsApp is connected.',
      c: ['Teacher portal', 'WhatsApp reminders', 'Parent portal'] },
    { id: 'teacher', k: ['teacher', 'teachers', 'staff login', 'teacher portal', 'teacher login', 'class teacher'],
      a: 'The **teacher portal** has:\n- Home: today\'s attendance status, students below 75%, and a 7-day attendance chart\n- Attendance: mark, edit past days, monthly report\n- My class: student list with one-tap call or WhatsApp to parents\n- Homework: post with subject and due date\n- Marks: create an exam and enter marks with a check against the maximum\n- Remarks: short notes on a student that the parent can see\n- Notices to parents of the class\nEach teacher sees only their own class.',
      c: ['Parent portal', 'How do logins work?', 'Security'] },
    { id: 'parent', k: ['parent', 'parents', 'guardian', 'parent portal', 'parent login', 'my child', 'my son', 'my daughter'],
      a: 'Parents get their own login and see, for each child: fee total, paid and pending, payment history, attendance this month with a 30-day strip, homework, exam marks, teacher remarks, and school notices. If a parent has two children in the school, both show on one login.',
      c: ['How do logins work?', 'Teacher portal', 'Security'] },
    { id: 'marks', k: ['marks', 'enter marks', 'exam marks', 'exam', 'result', 'results', 'homework', 'assignment', 'report card', 'grades', 'test'],
      a: 'Teachers post **homework** (subject, details, due date) and enter **exam marks** per subject. Marks are checked against the maximum, and the class average, highest, lowest and pass rate show instantly. Parents see both in their portal. **Printable report cards** are planned next.',
      c: ['What is coming next?', 'Teacher portal', 'Parent portal'] },
    { id: 'notices', k: ['notice', 'notices', 'circular', 'announcement', 'announcements', 'holiday'],
      a: 'The school office can post notices to everyone, only parents, or only teachers, and can target one class. Teachers can post to the parents of their own class. This replaces paper circulars.',
      c: ['Teacher portal', 'Parent portal'] },
    { id: 'login', k: ['login', 'log in', 'sign in', 'how do parents login', 'how to login', 'how do i login', 'parents login', 'teacher login', 'password', 'account', 'credentials', 'username', 'user id', 'access', 'forgot', 'reset'],
      a: 'Logins are created for you, nobody signs up on their own:\n- Mayhemic creates the school office login.\n- The school office creates teacher logins and generates parent logins in one click. A parent\'s login ID is their phone number.\nEveryone signs in on the same page: [School login](' + PORTAL + '). Teachers and parents can change their own password after logging in. If a password is forgotten, the school office can reset it.',
      c: ['Security', 'Get early access'] },
    { id: 'security', k: ['secure', 'security', 'safe', 'privacy', 'data', 'hack', 'protect', 'encrypted', 'confidential'],
      a: 'Security basics: passwords are stored hashed (never in plain text), a login locks for 15 minutes after 5 wrong tries, and every role sees only what it should: a teacher sees only their class and a parent sees only their own children. Each school\'s data is kept separate from other schools. Deleted students are hidden from every screen.',
      c: ['How do logins work?', 'Contact'] },
    { id: 'whatsapp', k: ['whatsapp', 'reminder', 'reminders', 'sms', 'alert', 'alerts', 'notification', 'message parents'],
      a: 'WhatsApp is **coming soon**. The platform is already built for fee reminders, receipts on WhatsApp, a daily summary to the director, and absent-student alerts to parents. They switch on after WhatsApp Business approval, which is in progress. Until then everything else works normally.',
      c: ['Attendance', 'Fee features', 'What is coming next?'] },
    { id: 'pricing', k: ['price', 'pricing', 'cost', 'how much', 'charges', 'plan', 'plans', 'subscription', 'free', 'kitna', 'daam', 'paisa', 'rate', 'fees kitni'],
      a: 'Pricing is not announced yet because we are in early access. Schools that join early get to shape it with us. Tell us about your school through the [contact form](#contact) or email ' + EMAIL + ' and we will come back to you.',
      c: ['Get early access', 'Contact'] },
    { id: 'start', k: ['early access', 'get started', 'start', 'demo', 'try', 'trial', 'join', 'sign up', 'signup', 'want to use', 'book', 'interested', 'pilot'],
      a: 'Great! The easiest way is to write to us: use the [contact form](#contact) or email ' + EMAIL + ' with your school name, number of students and city. We will set up a login so you can try it with your own data. Already have a login? Use [School login](' + PORTAL + ').',
      c: ['Pricing', 'Import students', 'Security'] },
    { id: 'import', k: ['import', 'csv', 'excel', 'existing data', 'migrate', 'upload', 'add students', 'bulk', 'spreadsheet'],
      a: 'You can add hundreds of students at once by uploading a CSV file (any Excel sheet can be saved as CSV). Columns: name, class, roll_no, parent_name, parent_phone, total_fee. Duplicates are skipped automatically, and the portal gives you a sample file to copy.',
      c: ['Fee features', 'Get early access'] },
    { id: 'delete', k: ['delete', 'remove', 'edit', 'change', 'correct', 'mistake', 'wrong entry', 'undo'],
      a: 'The school office can edit a student, delete a student, add or reduce a fee with a reason, and void a wrong payment. Teachers can edit past attendance and delete their own notices, homework, exams and remarks.',
      c: ['Fee features', 'Teacher portal'] },
    { id: 'mobile', k: ['app', 'mobile', 'android', 'iphone', 'ios', 'phone', 'download', 'play store'],
      a: 'There is nothing to install. The platform works in the browser on any phone, tablet or computer. A separate mobile app is not available yet.',
      c: ['Teacher portal', 'Parent portal'] },
    { id: 'language', k: ['hindi', 'language', 'languages', 'english', 'hinglish'],
      a: 'The portal is in English right now. If Hindi would help your school, please tell us through the [contact form](#contact).',
      c: ['Get early access', 'Contact'] },
    { id: 'roadmap', k: ['coming next', 'roadmap', 'future', 'upcoming', 'soon', 'planned', 'next feature', 'timetable', 'salary', 'payroll', 'upi', 'online payment', 'what is coming'],
      a: 'Planned next:\n- WhatsApp reminders, receipts and absent alerts\n- Printable report cards\n- Online fee payment by UPI\n- Timetable\n- Staff leave and salary\nTell us what your school needs most through the [contact form](#contact), it decides what we build first.',
      c: ['Get early access', 'WhatsApp reminders'] },
    { id: 'who', k: ['who is it for', 'which schools', 'cbse', 'icse', 'state board', 'small school', 'big school', 'suitable', 'for schools'],
      a: 'It is built for Indian schools that still run on paper registers, fee cards and circulars, from small private schools to larger ones. It does not depend on the board.',
      c: ['What do you build?', 'Get early access'] },
    { id: 'internet', k: ['offline', 'internet', 'no network', 'wifi'],
      a: 'The platform needs an internet connection, since everything is saved online. It works on a normal mobile connection.',
      c: ['Mobile app', 'Security'] },
    { id: 'contact', k: ['contact', 'email', 'reach', 'phone number', 'call', 'talk to', 'human', 'support', 'help', 'address', 'location', 'where are you'],
      a: 'You can reach Aryan and the team at **' + EMAIL + '** or use the [contact form](#contact) on this page. We are based in Lucknow, India.',
      c: ['Get early access', 'Pricing'] },
    { id: 'bot', k: ['are you ai', 'are you a bot', 'are you human', 'chatgpt', 'robot', 'who am i talking'],
      a: 'I am the Mayhemic website assistant. I answer from a fixed set of information about Mayhemic. For anything I do not know, a person will answer at ' + EMAIL + '.',
      c: ['What do you build?', 'Contact'] },
    { id: 'thanks', k: ['thanks', 'thank you', 'thx', 'shukriya', 'dhanyavad', 'bye', 'goodbye', 'ok thanks'],
      a: 'You are welcome! If you want to try the platform with your school, the [contact form](#contact) is the quickest way.',
      c: ['Get early access'] }
  ];

  var FALLBACK = 'I do not have an answer for that yet. A person can help: write to ' + EMAIL + ' or use the [contact form](#contact).';
  var FALLBACK_CHIPS = ['What do you build?', 'Pricing', 'Get early access', 'Contact'];

  function answer(q) {
    q = String(q || '').toLowerCase().replace(/[^a-z0-9\s'\-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!q) return null;
    var best = null, bs = 0;
    KB.forEach(function (e) {
      var s = 0;
      e.k.forEach(function (w) {
        var hit = w.length <= 3 ? new RegExp('(^|\\s)' + w + '(\\s|$)').test(q) : q.indexOf(w) > -1;
        if (hit) s += w.length >= 7 ? 3 : w.length >= 4 ? 2 : 1;
      });
      if (s > bs) { bs = s; best = e; }
    });
    return best ? { a: best.a, c: best.c, id: best.id } : { a: FALLBACK, c: FALLBACK_CHIPS, id: 'fallback' };
  }

  var Core = { KB: KB, answer: answer, UPDATED: UPDATED };
  if (typeof document === 'undefined') { if (typeof module !== 'undefined') module.exports = Core; return; }
  window.MayhemicBot = Core;

  /* ---------- UI ---------- */
  var css = document.createElement('style');
  css.textContent =
    '#mxb{position:fixed;right:22px;bottom:22px;width:62px;height:62px;border-radius:50%;border:0;background:#fff;color:#040406;cursor:pointer;z-index:80;display:grid;place-items:center;box-shadow:0 14px 40px rgba(122,159,255,.45);transition:transform .25s}' +
    '#mxb:hover{transform:scale(1.07)}#mxb svg{width:28px;height:28px}' +
    '#mxp{position:fixed;right:22px;bottom:96px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 124px));z-index:86;display:none;flex-direction:column;background:rgba(10,10,16,.96);border:1px solid rgba(255,255,255,.16);border-radius:22px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.6);backdrop-filter:blur(16px);color:#fff;font-family:Manrope,Arial,sans-serif}' +
    '#mxp.on{display:flex;animation:mxin .3s cubic-bezier(.16,1,.3,1)}@keyframes mxin{from{opacity:0;transform:translateY(16px) scale(.97)}}' +
    '#mxp header{position:static;opacity:1;transform:none;display:flex;align-items:center;gap:12px;padding:16px 18px;background:linear-gradient(135deg,rgba(124,92,255,.35),rgba(0,212,255,.15));border-bottom:1px solid rgba(255,255,255,.12)}' +
    '#mxp header b{font-family:Unbounded,sans-serif;letter-spacing:.14em;font-size:13px}#mxp header small{display:block;font-size:12px;color:rgba(255,255,255,.7);margin-top:2px}' +
    '#mxp .dot{width:9px;height:9px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80}#mxp header button{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1}' +
    '#mxm{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}' +
    '.mxu,.mxa{max-width:86%;padding:11px 14px;border-radius:16px;font-size:14px;line-height:1.55;animation:mxin .25s both}' +
    '.mxa{background:rgba(255,255,255,.08);border-bottom-left-radius:4px;align-self:flex-start}.mxu{background:#fff;color:#040406;border-bottom-right-radius:4px;align-self:flex-end;font-weight:600}' +
    '.mxa a{color:#9fd0ff}.mxa b{color:#fff}.mxa .ty{display:inline-flex;gap:5px;padding:4px 0}.mxa .ty i{width:7px;height:7px;border-radius:50%;background:#fff;animation:bn 1s infinite}' +
    '.mxa .ty i:nth-child(2){animation-delay:.15s}.mxa .ty i:nth-child(3){animation-delay:.3s}' +
    '#mxc{display:flex;gap:8px;flex-wrap:wrap;padding:0 16px 10px}#mxc button{background:transparent;border:1px solid rgba(255,255,255,.28);color:#cfe6ff;border-radius:20px;padding:7px 13px;font-size:12.5px;cursor:pointer;font-family:inherit;transition:.2s}#mxc button:hover{background:#fff;color:#040406}' +
    '#mxf{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.12)}#mxf input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:12px;padding:12px;font:inherit;font-size:14px}' +
    '#mxf input:focus{outline:none;border-color:#9fd0ff}#mxf button{background:#fff;color:#040406;border:0;border-radius:12px;padding:0 16px;font-weight:700;cursor:pointer;font-family:inherit}' +
    '@media(max-width:520px){#mxp{right:12px;bottom:92px;height:min(70vh,560px)}}';
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.id = 'mxb'; btn.setAttribute('aria-label', 'Chat with Mayhemic');
  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  btn.innerHTML = ICON_CHAT;

  var panel = document.createElement('div');
  panel.id = 'mxp'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Mayhemic assistant');
  panel.innerHTML = '<header><span class="dot"></span><div><b>MAYHEMIC</b><small>Ask about our school platform</small></div><button aria-label="Close">&times;</button></header>' +
    '<div id="mxm"></div><div id="mxc"></div><form id="mxf"><input id="mxi" placeholder="Type your question" autocomplete="off" maxlength="200"><button type="submit">Send</button></form>';
  document.body.appendChild(panel);
  document.body.appendChild(btn);

  var msgs = panel.querySelector('#mxm'), chips = panel.querySelector('#mxc'), input = panel.querySelector('#mxi'), started = false, busy = false;

  function fmt(t) {
    t = String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, a, u) { return '<a href="' + u + '"' + (u.charAt(0) === '#' ? '' : ' target="_blank" rel="noopener"') + '>' + a + '</a>'; });
    t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/^- /gm, '&bull; ').replace(/\n/g, '<br>');
    return t;
  }
  function add(cls, html) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d; }
  function setChips(list) {
    chips.innerHTML = '';
    (list || []).forEach(function (t) { var b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.onclick = function () { ask(t); }; chips.appendChild(b); });
  }
  function ask(q) {
    if (busy || !String(q).trim()) return;
    busy = true; add('mxu', fmt(q)); input.value = ''; chips.innerHTML = '';
    var r = answer(q), t = add('mxa', '<span class="ty"><i></i><i></i><i></i></span>');
    setTimeout(function () { t.innerHTML = fmt(r.a); setChips(r.c); msgs.scrollTop = msgs.scrollHeight; busy = false; }, 550);
  }
  function open() {
    panel.classList.add('on'); btn.innerHTML = ICON_X;
    if (!started) {
      started = true;
      var h = new Date().getHours(), g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
      add('mxa', fmt(g + '! Welcome to Mayhemic. Ask me what we are building, how it helps teachers and parents, or how to get started.'));
      setChips(['What do you build?', 'Teacher portal', 'Parent portal', 'Pricing', 'Get early access']);
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function close() { panel.classList.remove('on'); btn.innerHTML = ICON_CHAT; }
  btn.onclick = function () { panel.classList.contains('on') ? close() : open(); };
  panel.querySelector('header button').onclick = close;
  panel.querySelector('#mxf').onsubmit = function (e) { e.preventDefault(); ask(input.value); };
  panel.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[href^="#"]'); if (a) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
