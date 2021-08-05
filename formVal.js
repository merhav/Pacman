var validated;

function validate() {
    validated = true;

    var username = $("#form_username").val();
    var password = $("#form_pass").val();
    var repPassWord = $("#form_repPass").val();
    var fname = $("#form_firstName").val();
    var lname = $("#form_lastName").val();
    var email = $("#form_email").val();
    var date = $("#form_date").val();

    checkFill(username, password, repPassWord, fname, lname, email, date);
    checkPassword(password);
    checkRepPassword(password, repPassWord);
    checkFirstName(fname);
    checkLastName(lname);
    checkEmail(email);
    checkUsername(username);

    if (validated) {
        var user = { username: username, password: password, firstName: fname, lastName: lname, email: email, birthdate: date };
        usersArray[usersArray.length] = user;

        currentUser = user;
        $("#welcomeDiv").hide();
        $("#registerDiv").hide();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#settingsDiv").show();
    }
}

function checkUsername(username) {
    var i;
    for (i = 0; i < usersArray.length; i++) {
        if (usersArray[i].username == username) {
            alert("Username exists, please choose another username");
            validated = false;
        }
    }
}

function checkEmail(email) {
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!pattern.test(email)) {
        alert("Wrong email input");
        validated = false;
    }
}

function checkPassword(password) {
    var pattern = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    var regex = new RegExp(pattern);
    if (!regex.test(password)) {
        alert("Wrong password input:" + "\n" + "-Password must be at least 8 characters" + "\n" + 
            "-Password must contain both letters and numbers");
        validated = false;
    }
}

function checkRepPassword(password, repPassword) {
    if (password != repPassword) {
        alert("Passwords don't match");
        validated = false;
    }
}

function checkFirstName(fname) {
    var pattern = /^[a-zA-Z]*$/;
    if (!pattern.test(fname)) {
        alert("Wrong email input - use only alphabetic letters");
        validated = false;
    }
}

function checkFirstName(fname) {
    var pattern = /^[a-zA-Z]*$/;
    if (!pattern.test(fname)) {
        alert("Wrong first name input - use only alphabetic letters");
        validated = false;
    }
}

function checkLastName(lname) {
    var pattern = /^[a-zA-Z]*$/;
    if (!pattern.test(lname)) {
        alert("Wrong last name input - use only alphabetic letters");
        validated = false;
    }
}

function checkFill(username, password, repPassWord, fname, lname, email, date) {
    if (username == '' || password == '' || repPassWord == '' || fname == '' || lname == '' || email == '' || date == ''){
        alert("Please fill in all fields");
        validated = false;
    }
}

function login() {
    var username = $("#login_username").val();
    var password = $("#login_pass").val();
    var userFound = false;

    var i;
    for (i = 0; i < usersArray.length; i++) {
        if (usersArray[i].username == username) {
            if (usersArray[i].password == password) {
                userFound = true;
                currentUser = usersArray[i];
            }
        }
    }

    if (userFound) {
        $("#welcomeDiv").hide();
        $("#registerDiv").hide();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#settingsDiv").show();
        $("#gameFinishedDiv").hide();
    }
    else {
        alert("Username or Password incorrect");
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomSettings() {
    document.getElementById("pacdot_num_settings").value = randomNumber(50, 91);
    document.getElementById("5color").value = getRandomColor();
    document.getElementById("15color").value = getRandomColor();
    document.getElementById("25color").value = getRandomColor();

    document.getElementById("timeSetting").value = Math.floor(Math.random()*100 + 61);
    document.getElementById("monsterSetting").value = randomNumber(1, 4);
}

function validateSettings() {
    var pacDots_num = $("#pacdot_num_settings").val();
    var time = $("#timeSetting").val();
    var monsters_num = $("#monsterSetting").val();

    if (pacDots_num == '' || pacDots_num < 50 || pacDots_num > 90) {
        alert("Wrong pacDots input");
        return false;
    }

    if (time == '' || time < 60) {
        alert("Wrong time input");
        return false;
    }

    if (monsters_num == '' || monsters_num < 1 || monsters_num > 3) {
        alert("Wrong number of monsters input");
        return false;
    }

    return true;
}

