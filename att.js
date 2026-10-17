/* Shared attendance + notices UI for fees.html (staff) and teacher.html.
   Needs these globals from the host page: $, api, esc, toast */
(function () {
  var css = document.createElement('style');
  css.textContent = '.ag{display:flex;gap:6px}.ab{width:42px;height:38px;padding:0;border-radius:10px;font-weight:700;color:var(--mute)}' +
    '.ab.P.on{background:rgba(74,222,128,.2);color:#4ade80;border-color:#4ade80}.ab.A.on{background:rgba(251,113,133,.2);color:#fb7185;border-color:#fb7185}.ab.L.on{background:rgba(251,191,36,.2);color:#fbbf24;border-color:#fbbf24}' +
    '.sumbar{display:flex;gap:18px;font-size:13px;color:var(--mute);margin:10px 4px 16px;flex-wrap:wrap}.sumbar b{color:#fff}' +
    '.nf{padding:16px 0;border-bottom:1px solid var(--line)}.nf:last-child{border:0}.nf h5{margin:0 0 4px;font-size:15px}.nf p{margin:6px 0 0;font-size:14px;color:#cfcfd8;white-space:pre-wrap}' +
    '.pbar{height:6px;background:rgba(255,255,255,.08);border-radius:9px;overflow:hidden;min-width:70px}.pbar i{display:block;height:100%;background:#4ade80}';
  document.head.appendChild(css);

  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  var ini = function (n) { return String(n).trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); };

  window.AttUI = {
    mount: function (box, role) {
      var S = {}, list = [];
      box.innerHTML = '<div class="tools"><input type="date" id="atD" value="' + today() + '" style="max-width:190px"><select id="atC" style="max-width:170px"></select>' +
        '<button class="sm" id="atP">All present</button><button class="sm" id="atR">Monthly report</button></div>' +
        '<div class="glass" style="padding:8px 20px"><div id="atL"></div></div><div class="sumbar" id="atS"></div>' +
        '<div class="tools"><label class="chk" style="display:flex;gap:8px;align-items:center;color:var(--mute);font-size:13px"><input type="checkbox" id="atN" style="width:auto"> WhatsApp the parents of absent students</label>' +
        '<button class="p" id="atSave" style="margin-left:auto">Save attendance</button></div><div id="atRep"></div>';
      var D = box.querySelector('#atD'), C = box.querySelector('#atC');
      function sumbar() {
        var p = 0, a = 0, l = 0; list.forEach(function (s) { var v = S[s.id]; if (v === 'P') p++; else if (v === 'A') a++; else if (v === 'L') l++; });
        box.querySelector('#atS').innerHTML = '<span>Present <b style="color:#4ade80">' + p + '</b></span><span>Absent <b style="color:#fb7185">' + a + '</b></span><span>Late <b style="color:#fbbf24">' + l + '</b></span><span>Total <b>' + list.length + '</b></span>';
      }
      function draw() {
        box.querySelector('#atL').innerHTML = list.length ? list.map(function (s) {
          return '<div class="li"><div class="who"><div class="av" style="background:rgba(124,92,255,.18);color:#b9a8ff">' + esc(ini(s.name)) + '</div><div>' + esc(s.name) + '<div class="lb">Roll ' + esc(s.roll_no || '-') + '</div></div></div>' +
            '<div class="ag" data-id="' + s.id + '">' + ['P', 'A', 'L'].map(function (k) { return '<button class="ab ' + k + (S[s.id] === k ? ' on' : '') + '" data-k="' + k + '">' + k + '</button>'; }).join('') + '</div></div>';
        }).join('') : '<div class="empty">' + (C.value || role === 'teacher' ? 'No students in this class.' : 'Choose a class to start.') + '</div>';
        sumbar();
      }
      async function load() {
        try {
          var d = await api('/api/attendance?date=' + D.value + '&class=' + encodeURIComponent(C.value));
          if (role === 'teacher') { C.innerHTML = '<option>' + esc(d.class || 'No class') + '</option>'; C.disabled = true; }
          else if (!C.options.length) { C.innerHTML = '<option value="">Select class</option>' + d.classes.map(function (c) { return '<option>' + esc(c) + '</option>'; }).join(''); }
          list = d.students; S = {}; var any = false;
          list.forEach(function (s) { if (s.status) { S[s.id] = s.status; any = true; } });
          if (!any) list.forEach(function (s) { S[s.id] = 'P'; });
          draw();
        } catch (e) { toast(e.message); }
      }
      box.querySelector('#atL').addEventListener('click', function (e) {
        var b = e.target.closest('.ab'); if (!b) return;
        var id = b.parentNode.dataset.id; S[id] = b.dataset.k;
        [].forEach.call(b.parentNode.children, function (x) { x.classList.toggle('on', x === b); }); sumbar();
      });
      box.querySelector('#atP').onclick = function () { list.forEach(function (s) { S[s.id] = 'P'; }); draw(); };
      D.onchange = load; C.onchange = load;
      box.querySelector('#atSave').onclick = async function () {
        if (!list.length) return toast('No students to save');
        try {
          var r = await api('/api/attendance', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ date: D.value, class: C.value, notify: box.querySelector('#atN').checked, records: list.map(function (s) { return { student_id: s.id, status: S[s.id] || 'P' }; }) }) });
          toast('Saved. ' + r.present + ' present, ' + r.absent + ' absent' + (r.alerts ? ', ' + r.alerts + ' parents alerted' : ''));
        } catch (e) { toast(e.message); }
      };
      box.querySelector('#atR').onclick = async function () {
        try {
          var r = await api('/api/attendance/report?month=' + D.value.slice(0, 7) + '&class=' + encodeURIComponent(C.value));
          box.querySelector('#atRep').innerHTML = '<h4 style="margin:24px 0 10px">Report for ' + D.value.slice(0, 7) + (C.value ? ' / Class ' + esc(C.value) : '') + '</h4><div class="tbl glass"><table><thead><tr><th>Student</th><th>Class</th><th class="rt">Present</th><th class="rt">Absent</th><th class="rt">Late</th><th>Attendance</th></tr></thead><tbody>' +
            r.rows.map(function (s) { var t = s.p + s.a + s.l, pc = t ? Math.round((s.p + s.l) / t * 100) : 0; return '<tr><td>' + esc(s.name) + '</td><td>' + esc(s.class) + '</td><td class="rt">' + s.p + '</td><td class="rt r">' + s.a + '</td><td class="rt">' + s.l + '</td><td><div style="display:flex;gap:8px;align-items:center"><div class="pbar"><i style="width:' + pc + '%"></i></div>' + (t ? pc + '%' : '-') + '</div></td></tr>'; }).join('') + '</tbody></table></div>';
        } catch (e) { toast(e.message); }
      };
      load();
    }
  };

  window.NoticeUI = {
    mount: function (box, role) {
      box.innerHTML = '<div class="glass box" style="padding:22px;margin-bottom:16px"><h4 style="margin:0 0 14px">New notice</h4>' +
        '<input id="nT" placeholder="Title, e.g. Holiday on Monday"><textarea id="nB" rows="3" placeholder="Message" style="width:100%;margin-top:10px;background:rgba(0,0,0,.45);border:1px solid var(--line);color:#fff;padding:13px;border-radius:10px;font:inherit"></textarea>' +
        '<div class="tools" style="margin:10px 0 0">' + (role === 'staff' ? '<select id="nA" style="max-width:180px"><option value="all">Everyone</option><option value="parents">Parents</option><option value="teachers">Teachers</option></select><input id="nC" placeholder="Class (optional)" style="max-width:170px">' : '<span class="lb" style="align-self:center">Goes to parents of your class</span>') +
        '<button class="p" id="nP" style="margin-left:auto">Post notice</button></div></div><div class="glass" style="padding:6px 22px" id="nL"></div>';
      async function load() {
        try {
          var d = await api('/api/notices');
          box.querySelector('#nL').innerHTML = d.notices.length ? d.notices.map(function (n) {
            return '<div class="nf"><div style="display:flex;justify-content:space-between;gap:10px"><h5>' + esc(n.title) + '</h5>' + (role !== 'parent' ? '<button class="sm" data-d="' + n.id + '">Delete</button>' : '') + '</div>' +
              '<div class="lb">' + esc(n.author_name || '') + ' / ' + esc(n.audience) + (n.class ? ' / Class ' + esc(n.class) : '') + ' / ' + new Date(n.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-IN') + '</div>' + (n.body ? '<p>' + esc(n.body) + '</p>' : '') + '</div>';
          }).join('') : '<div class="empty">No notices yet.</div>';
        } catch (e) { toast(e.message); }
      }
      box.querySelector('#nP').onclick = async function () {
        try {
          await api('/api/notices', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ title: box.querySelector('#nT').value, body: box.querySelector('#nB').value, audience: role === 'staff' ? box.querySelector('#nA').value : 'parents', class: role === 'staff' ? box.querySelector('#nC').value : '' }) });
          box.querySelector('#nT').value = ''; box.querySelector('#nB').value = ''; toast('Notice posted'); load();
        } catch (e) { toast(e.message); }
      };
      box.querySelector('#nL').addEventListener('click', async function (e) {
        var b = e.target.closest('[data-d]'); if (!b || !confirm('Delete this notice?')) return;
        try { await api('/api/notices/' + b.dataset.d, { method: 'DELETE' }); load(); } catch (er) { toast(er.message); }
      });
      load();
    },
    render: function (el, list) {
      el.innerHTML = list.length ? list.map(function (n) { return '<div class="nf"><h5>' + esc(n.title) + '</h5><div class="lb">' + esc(n.author_name || '') + ' / ' + new Date(n.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-IN') + '</div>' + (n.body ? '<p>' + esc(n.body) + '</p>' : '') + '</div>'; }).join('') : '<div class="empty">No notices yet.</div>';
    }
  };
})();
