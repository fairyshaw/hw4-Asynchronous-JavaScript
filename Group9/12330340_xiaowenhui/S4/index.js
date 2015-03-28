window.onload = function() {
    Click();
    out();
}

var t, t1;

/* Click @+ */
function Click() {
    apb = document.getElementsByClassName("apb")[0];

    apb.onclick = function() {
        list = document.getElementsByTagName("li");

        /* Get the random sequence of clicking buttons */
        var seq = [];
        for (var i = 0; i < 5; i++) {
            if (i == 0) {
                seq[i] = Math.round(Math.random() * 4);
            } else {
                var now = Math.round(Math.random() * 4);
                while (scan(now, seq)) {
                    now = Math.round(Math.random() * 4);
                }
                seq[i] = now;
            }
        }

        /* Click button */
        var i = 0;
        clickButton(i, list, seq);
    }
}

/* Help judge whether the random sequence is repeated */
function scan(now, seq) {
    for (var i = 0; i < seq.length; i++) {
        if (now == seq[i] || now < 0)
            return true;
    }
    return false;
}

/* The robot click buttons */
function clickButton(i, list, seq) {
    //list[i].style.backgroundColor = "rgba(48, 63, 159, 1)";

    unread = list[seq[i]].getElementsByClassName("unread");
    unread[0].style.visibility = "visible";

    getRandom(i, seq[i], list, seq);
}

/* Get the random number and click next button */
function getRandom(k, i, list, seq) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        num = list[i].getElementsByClassName("num")[0];

        if (xmlhttp.readyState != 4) {
            num.innerHTML = "...";

            for (var j = 0; j < list.length; j++) {
                if (i != j) list[j].style.backgroundColor = "rgba(118, 118, 118, 0.8)";
            } 
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            num.innerHTML = xmlhttp.responseText;

            for (var j = 0; j < list.length; j++) {
                unread = list[j].getElementsByClassName("unread")[0];

                if (unread.style.visibility != "visible")
                    list[j].style.backgroundColor = "rgba(48, 63, 159, 1)";
                else
                    list[j].style.backgroundColor = "rgba(118, 118, 118, 0.8)";
            }

            if (k+1 <= seq.length-1) {
                t=setTimeout(clickButton, 2000, k+1, list, seq);
            }

            calcSum(k, list, seq);
        }
    }
    xmlhttp.open("GET",'http://localhost:3000/',true);
    xmlhttp.send(null);
}

/* Calculate the random numbers' sum */
function calcSum(i, list, seq) {
    if (i == seq.length - 1) {
        info = document.getElementById("info-bar");
        var sum = 0;

        info.style.backgroundColor = "rgba(48, 63, 159, 1)";

        for (var j = 0; j < list.length; j++) {
            num = list[j].getElementsByClassName("num")[0];
            sum += new Number(num.innerHTML);
        }

        t1=setTimeout(display, 1000, sum);
    }
}

/* Display the sum of those random numbers */
function display(sum) {
    info = document.getElementById("info-bar");
    info.innerHTML = sum;
    info.style.backgroundColor = "rgba(118, 118, 118, 0.8)";
}

function out() {
    apb = document.getElementsByClassName("apb")[0];

    /**
     * The mouse moves out the @+: 
     * Change the buttons' style
     * Reset the buttons' content and the result box's content
     */
    apb.onmouseout = function() {
        list = document.getElementsByClassName("button");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgba(118, 118, 118, 0.8)";

            unread = list[i].getElementsByClassName("unread")[0];
            unread.style.visibility = "hidden";

            num = unread.getElementsByTagName("div")[0];
            num.innerHTML = "...";
        }

        info = document.getElementById("info-bar");
        info.innerHTML = "";

        clearTimeout(t);
        clearTimeout(t1);
    }

    /**
     * The mouse moves over @+:
     * Change the buttons into blue
     */
    apb.onmouseover = function() {
        list = document.getElementsByClassName("button");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
        }
    }
}