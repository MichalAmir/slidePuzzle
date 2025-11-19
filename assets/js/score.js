(function () {
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = '../../assets/css/score.css'; 
  document.head.appendChild(styleLink);

  if (document.getElementById('siteHeader')) return;

  const container = document.createElement('div');
  container.id = 'siteHeader';
  container.className = 'site-header';

  container.innerHTML = `
    <div class="profile-card" id="siteProfile">
      <div class="avatar" id="userAvatar">?</div>
      <div class="info">
        <div class="details">
          <div class="points"><span class="points-number" id="pointsNumber">0</span> pts</div>
        </div>
        <div class="progress-row">
          <div class="progress-level"><div class="progress" id="progressFill"></div></div>
          <div class="level-right" id="userLevel">Lvl 1</div>
        </div>
      </div>
      <div class="actions">
        <button id="primaryAction" class="btn-primary">Profile</button>
      </div>
    </div>

    <div class="profile-modal-overlay" id="profileModal">
      <div class="profile-modal">
        <div class="modal-header">
          <div class="modal-avatar" id="modalAvatar">?</div>
          <div>
            <div class="modal-username" id="modalName">Not connected</div>
            <div style="font-size:13px;color:#666" id="modalEmail"></div>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-row"><div>Points</div><div><span id="modalPoints">0</span> pts</div></div>
          <div class="modal-row"><div>Level</div><div id="modalLevel">Lvl 1</div></div>
          <div style="margin-top:10px">
            <div style="font-size:13px;color:#928888;margin-bottom:6px">Progress</div>
            <div style="background:#f3f3f3;border-radius:6px;height:8px;overflow:hidden">
              <div id="modalProgress" style="height:100%;background:linear-gradient(90deg,#f0c420,#ff8a65);width:0%"></div>
            </div>
          </div>
          <div style="text-align:center">
            <button id="modalLogoutBtn" class="btn-logout-modal">Logout</button>
          </div>
        </div>
        <div class="modal-actions">
          <button class="half" id="closeModalBtn">Close</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const getScores = () => {
    try {
      return JSON.parse(localStorage.getItem('slidePuzzleScores') || '{}');
    } catch {
      return {};
    }
  };

  const fmt = (n) => (Number(n) || 0).toLocaleString();

  function updateHeader() {
    const email = localStorage.getItem('slidePuzzleUser');
    const avatar = document.getElementById('userAvatar');
    const scoreEl = document.getElementById('pointsNumber');
    const levelEl = document.getElementById('userLevel');
    const progressFill = document.getElementById('progressFill');
    const primaryBtn = document.getElementById('primaryAction');

    if (email) {
      const scores = getScores();
      const total = scores[email] || 0;
      let display = email;
      try {
        const users = JSON.parse(localStorage.getItem('gameuser') || '[]');
        const u = users.find((x) => x.email === email);
        if (u && u.name) display = u.name.split(' ')[0];
      } catch { }

      avatar.textContent = display.charAt(0).toUpperCase();
      scoreEl.textContent = fmt(total);
      levelEl.textContent = `Lvl ${Math.floor(total / 100) + 1}`;
      progressFill.style.width = `${Math.min(100, total % 100)}%`;
      primaryBtn.textContent = 'Profile';
      primaryBtn.onclick = showProfileModal;
    } else {
      avatar.textContent = '?';
      scoreEl.textContent = '0';
      levelEl.textContent = 'Lvl 1';
      progressFill.style.width = '0%';
      primaryBtn.textContent = 'Login';

      primaryBtn.onclick = () => {
        window.location.href = '../../pages/nameuser.html'; 
      };
    }
  }

  function showProfileModal() {
    const email = localStorage.getItem('slidePuzzleUser');
    const modal = document.getElementById('profileModal');
    const scores = getScores();
    const total = scores[email] || 0;

    let display = email;
    try {
      const users = JSON.parse(localStorage.getItem('gameuser') || '[]');
      const u = users.find((x) => x.email === email);
      if (u && u.name) display = u.name;
    } catch { }

    document.getElementById('modalAvatar').textContent = display.charAt(0).toUpperCase();
    document.getElementById('modalName').textContent = display;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalPoints').textContent = fmt(total);
    document.getElementById('modalLevel').textContent = `Lvl ${Math.floor(total / 100) + 1}`;
    document.getElementById('modalProgress').style.width = `${Math.min(100, total % 100)}%`;

    document.getElementById('modalLogoutBtn').onclick = () => {
      localStorage.removeItem('slidePuzzleUser');
      hideProfileModal();
      location.reload();
    };

    modal.style.display = 'flex';
  }

  function hideProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
  }

  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) closeBtn.onclick = hideProfileModal;

  updateHeader();
  window.addEventListener('storage', updateHeader);
})();
