const loginPage = {
  users: [],
  inputFields: {
    name: { element: document.getElementById('myName'), options: [] },
    lastName: { element: document.getElementById('myLastName'), options: [] },
    email: { element: document.getElementById('myEmail'), options: [] },
    phone: { element: document.getElementById('myPhone'), options: [] },
    password: { element: document.getElementById('myPassword'), options: [] },
  },
  login: document.querySelector('.signupbtn'),

  init() {
    if (this.login) {
      this.login.addEventListener('click', this.loginUser.bind(this));
    }
    this.loadPreviousOptions();
    this.setupInputFields();
  },

  async loginUser(event) {
    event.preventDefault();
    this.clearAllErrors();

    const btn = this.login;
    btn.disabled = true;

    const userName = this.inputFields.name.element.value.trim();
    const userLastName = this.inputFields.lastName.element.value.trim();
    const userEmail = this.inputFields.email.element.value.trim().toLowerCase();
    const userPhone = this.inputFields.phone.element.value.trim();
    const userPassword = this.inputFields.password.element.value.trim();

    if (!this.validateEmail(userEmail)) return this.setFieldError('email', 'Please enter a valid email address.', btn);
    if (!this.isValidName(userName)) return this.setFieldError('name', 'First name must contain at least 2 letters.', btn);
    if (!this.isValidName(userLastName)) return this.setFieldError('lastName', 'Last name must contain at least 2 letters.', btn);
    if (!this.isValidPhone(userPhone)) return this.setFieldError('phone', 'Phone number must start with 05 and contain 10 digits.', btn);
    if (!this.isValidPassword(userPassword)) return this.setFieldError('password', 'Password must be at least 6 characters long and include a letter and a number.', btn);

    try {
      const enteredHash = await this.hashPassword(userPassword);
      let stored = localStorage.getItem('gameuser');
      this.users = stored ? JSON.parse(stored) : [];

      const existing = this.users.find(u =>
        u.email?.toLowerCase() === userEmail &&
        u.name?.toLowerCase() === userName.toLowerCase() &&
        u.lastName?.toLowerCase() === userLastName.toLowerCase() &&
        u.phone === userPhone
      );

      if (existing) {
        const matchPassword = existing.password === enteredHash || existing.password === userPassword;
        if (matchPassword) {
          existing.password = enteredHash;
          localStorage.setItem('gameuser', JSON.stringify(this.users));
          localStorage.setItem('slidePuzzleUser', userEmail);
          this.ensureUserScore(userEmail);
          this.showRegistrationMessage('Welcome back!', userName || userEmail);
          return;
        } else {
          return this.setFieldError('password', 'Incorrect password. Please try again.', btn);
        }
      }

      await this.addNewUser(userName, userLastName, userEmail, userPhone, userPassword);
    } catch (e) {
      console.error('Login process failed:', e);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      btn.disabled = false;
    }
  },

  async addNewUser(name, lastName, email, phone, password) {
    const users = JSON.parse(localStorage.getItem('gameuser') || '[]');
    const exists = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    if (exists) {
      this.setFieldError('email', 'This email is already registered. Please sign in or use a different one.');
      return;
    }

    const hashed = await this.hashPassword(password);
    const user = { name, lastName, email, phone, password: hashed };
    users.push(user);
    localStorage.setItem('gameuser', JSON.stringify(users));
    localStorage.setItem('slidePuzzleUser', email);
    this.ensureUserScore(email);
    this.showRegistrationMessage('Successfully registered!', name || email);
  },

  setupInputFields() {
    for (let field in this.inputFields) {
      const fieldObj = this.inputFields[field];
      fieldObj.element.addEventListener('input', () => {
        const value = fieldObj.element.value;
        if (!fieldObj.options.includes(value)) {
          fieldObj.options.push(value);
          this.saveOptions();
        }
      });
    }
  },

  loadPreviousOptions() {
    try {
      const options = JSON.parse(localStorage.getItem('inputOptions') || '{}');
      for (let field in options) {
        if (this.inputFields[field]) {
          this.inputFields[field].options = options[field];
        }
      }
    } catch (e) { }
  },

  saveOptions() {
    const options = {};
    for (let field in this.inputFields) {
      options[field] = this.inputFields[field].options;
    }
    localStorage.setItem('inputOptions', JSON.stringify(options));
  },

  validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
  isValidName(name) { return /^[a-zA-Zא-ת]{2,30}$/.test(name); },
  isValidPhone(phone) { return /^05\d{8}$/.test(phone); },
  isValidPassword(password) { return /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password); },

  async hashPassword(password) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return password;
    }
  },

  ensureUserScore(email) {
    const key = 'slidePuzzleScores';
    const scores = JSON.parse(localStorage.getItem(key) || '{}');
    if (!(email in scores)) {
      scores[email] = 0;
      localStorage.setItem(key, JSON.stringify(scores));
    }
  },

  setFieldError(fieldId, message, button) {
    const el = document.getElementById(`error-${fieldId}`);
    if (el) el.textContent = message;
    if (button) button.disabled = false;
  },

  clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(e => e.textContent = '');
  },

  showRegistrationMessage(message, displayName) {
    if (document.getElementById('reg-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'reg-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      opacity: 0,
      transition: 'opacity 220ms',
    });

    const card = document.createElement('div');
    Object.assign(card.style, {
      width: 'min(95%,520px)',
      background: '#fff',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    });

    const title = document.createElement('h2');
    title.textContent = message;

    const info = document.createElement('p');
    info.textContent = displayName;

    const btn = document.createElement('button');
    btn.textContent = 'Continue';
    Object.assign(btn.style, {
      padding: '10px 16px',
      borderRadius: '6px',
      background: 'linear-gradient(90deg,#1976d2,#42a5f5)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    });

    btn.addEventListener('click', () => {
      window.location.href = '../../index.html';
    });

    card.append(title, info, btn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '1'; }, 20);
  }
};

window.addEventListener('DOMContentLoaded', () => loginPage.init());
