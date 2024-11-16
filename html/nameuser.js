let loginPage = {
    users: [], // מערך שיש בו מידע על המשתמשים
   
    inputFields: { // אובייקט שמכיל את כל השדות הקלט בדף
        name: {
            element: document.querySelector('#myName'), // אלמנט השדה להזנת השם
            options: [] // מערך שמכיל אפשרויות קודמות שהוזנו לשדה
        },
        lastName: {
            element: document.querySelector('#myLastName'),// אלמנט השדה להזנת שם המשפחה
            options: []
        },
        email: {
            element: document.querySelector('#myEmail'),// אלמנט השדה להזנת כתובת הדוא"ל
            options: []
        },
        phone: {
            element: document.querySelector('#myPhone'),// אלמנט השדה להזנת מספר הטלפון
            options: []
        },
        password: {
            element: document.querySelector('#myPassword'),// אלמנט השדה להזנת הסיסמה
            options: []
        }
    },
    login: document.querySelector('.signupbtn'),// אלמנט הכפתור להתחברות או הרישום

    init: function() { // פונקציה המאתחלת את הדף
        this.login.addEventListener('click', this.loginUser.bind(this));
        this.loadPreviousOptions();
        this.setupInputFields();
    },

    loginUser: function(event) { // פונקציה המתבצעת בעת לחיצה על הכפתור להתחברות או הרישום
        event.preventDefault(); // מונע מלעבור לקישור אחר
 // קבלת ערכי השדות המוזנים על ידי המשתמש
        let userName = this.inputFields.name.element.value;
        let userLastName = this.inputFields.lastName.element.value;
        let userEmail = this.inputFields.email.element.value;
        let userPhone = this.inputFields.phone.element.value;
        let userPassword = this.inputFields.password.element.value;

        let str = localStorage.getItem('gameuser');// קבלת המידע השמור בקובץ המקומי gameuser
        if (str !== null) { // בדיקה אם יש מידע שמור
            this.users = JSON.parse(str);// טעינת המשתמשים מהמידע השמור
            let userFound = false;
 // חיפוש האם המשתמש קיים במערכת על ידי עבור כל משתמש במערך
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].name === userName && this.users[i].lastName === userLastName &&
                    this.users[i].email === userEmail && this.users[i].phone === userPhone &&
                    this.users[i].password === userPassword) {
                    document.querySelector('#anounce').innerText = 'ברוך שובך';
                    userFound = true;
                    break;
                }
            }
// אם המשתמש לא נמצא, נוסיף אותו כמשתמש חדש
            if (!userFound) {
                this.addNewUser(userName, userLastName, userEmail, userPhone, userPassword);
            }
        } else { // אם אין מידע שמור, נוסיף את המשתמש כמשתמש חדש
            this.addNewUser(userName, userLastName, userEmail, userPhone, userPassword);
        }
    },

    addNewUser: function(name, lastName, email, phone, password) { // הוספת משתמש חדש למערכת
        let user = {
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        };
        this.users.push(user);// הוספת המשתמש למערך המשתמשים
        localStorage.setItem('gameuser', JSON.stringify(this.users));
        document.querySelector('#anounce').innerText = 'נרשמת בהצלחה';
    },

    loadPreviousOptions: function() {//פונקציה שבודקת האם הקלט קיים באפשרויות אם לא מוסיף אותו לאפשרויות
        let storedOptions = localStorage.getItem('inputOptions');
        if (storedOptions !== null) {
            let options = JSON.parse(storedOptions);
            for (let fieldName in options) {
                if (fieldName in this.inputFields) {
                    this.inputFields[fieldName].options = options[fieldName];
                }
            }
        }
    },

    saveOptions: function() {
        let options = {};
        for (let fieldName in this.inputFields) {
            options[fieldName] = this.inputFields[fieldName].options;
        }
        localStorage.setItem('inputOptions', JSON.stringify(options));
    },

    setupInputFields: function() {
        for (let fieldName in this.inputFields) {
            let field = this.inputFields[fieldName];
            field.element.addEventListener('input', function() {
                let value = field.element.value;
                if (!field.options.includes(value)) {
                    field.options.push(value);
                    this.saveOptions();
                }
            }.bind(this));
        }
    }
};

loginPage.init();// קריאה לפונקציה init שמאתחלת את הדף