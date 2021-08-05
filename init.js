var usersArray;
var currentUser;
var soundtrack;
var modal;

$(document).ready(function () {
    $("#welcomeLabel").click(function () {
        $("#welcomeDiv").show();
        $("#registerDiv").hide();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").hide();
        $("#gameFinishedDiv").hide();
        $("#header1").show();
        $("#footer").show();

        soundtrack.pause();
        soundtrack.load();
    });

    $("#regBtn").click(function () {
        $("#welcomeDiv").hide();
        $("#registerDiv").show();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").hide();
        $("#gameFinishedDiv").hide();
        $("#header1").show();
        $("#footer").show();

        soundtrack.pause();
        soundtrack.load();
    });

    $("#registerLabel").click(function () {
        $("#welcomeDiv").hide();
        $("#registerDiv").show();
        $("#loginDiv").hide();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").hide();
        $("#gameFinishedDiv").hide();
        $("#header1").show();
        $("#footer").show();

        soundtrack.pause();
        soundtrack.load();
    });

    $("#loginBtn").click(function () {
        $("#welcomeDiv").hide();
        $("#registerDiv").hide();
        $("#loginDiv").show();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").hide();
        $("#gameFinishedDiv").hide();
        $("#header1").show();
        $("#footer").show();

        soundtrack.pause();
        soundtrack.load();
    });

    $("#loginLabel").click(function () {
        $("#welcomeDiv").hide();
        $("#registerDiv").hide();
        $("#loginDiv").show();
        $("#settingsDiv").hide();
        $("#aboutDiv").hide();
        $("#gameDiv").hide();
        $("#gameFinishedDiv").hide();
        $("#header1").show();
        $("#footer").show();

        soundtrack.pause();
        soundtrack.load();
    });

    var user = {username:"a", password:"a", firstName: "a", lastName: "a", email: "a@a.com", birthdate: "0/0/0000" };
    usersArray = new Array(user);

    soundtrack = document.getElementById("soundtrack");

    modal = document.getElementById('myModal');

    $('body').keydown(function (e) {
        if (e.keyCode == 27) {
            closeModal();
        }
        console.log(e);
    });

    var e = $.Event("keydown", {
        keyCode: 27
    });

    $('#escape').click(function () {
        $("body").trigger(e);
    });
    //alert(array.length);
    /*function iframeRef(frameRef) {
        return frameRef.contentWindow
            ? frameRef.contentWindow.document
            : frameRef.contentDocument
    }

    var inside = iframeRef(document.getElementById('welcomeFrame'))
    var btn = inside.getElementById("regBtn");
    btn.value = "Hide Filter";
    */

    /*
    var iframe = document.getElementById("welcomeFrame");
    var elmnt = iframe.contentWindow.document.getElementsByTagName("H1")[0];
    elmnt.style.display = "none";
    elmnt.click(function () {
        iframe.style.display = "none";
    });
    */

    /*
    var iBody = $("welcomeFrame").contents().find("body").html();
    var myContent = iBody.getElementById("regBtn");
    alert();
    myContent.hide
    */

    /*
    $('#welcomeFrame').contents().find('#regBtn').click(function () {
        alert("hi");
        $(this).text("hi");
    })*/

    /*
    var iframe = document.getElementById("welcomeFrame");
    var btn = iframe.contentWindow.document.getElementById('regBtn');
    alert(btn);
    */



});