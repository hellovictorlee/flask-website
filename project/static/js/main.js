function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function emailvalidate() {
    var $emailresult = $("#emailresult");
    var email = $("#email").val();
    $emailresult.text("");

    if (!validateEmail(email)) {
        $emailresult.text(email + " is not valid :(");
        $emailresult.css("color", "red");
    }
    return false;
}

function namevalidate() {
    var $nameresult = $("#nameresult");
    var name = $("#name").val();
    $nameresult.text("");

    if (name == "") {
        $nameresult.text("Name can't be empty :(");
        $nameresult.css("color", "red");
    }
}

function messagevalidate() {
    var $messageresult = $("#messageresult");
    var message = $("#message").val();
    $messageresult.text("");

    if (message == "") {
        $messageresult.text("Message can't be empty :(");
        $messageresult.css("color", "red");
    }
}
