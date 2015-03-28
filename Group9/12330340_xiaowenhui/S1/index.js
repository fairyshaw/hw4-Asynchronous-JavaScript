window.onload = function() {
    click();
    out();
}

/**
 * Each button's click function
 */
function click() {
    list = document.getElementsByClassName("button");

    for (var i = 0; i < list.length; i++) {
        list[i].onclick = function(i) {
            return function() {
                list[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
                
                unread = list[i].getElementsByClassName("unread");
                unread[0].style.visibility = "visible";

                setTimeout(getRandom, 3, unread[0], list[i]);
            }
        }(i);
    }
}

/**
 * The mouse moves out the @+: 
 * Change the buttons' style
 * Reset the buttons' content and the result box's content
 * The mouse moves over @+:
 * Change the buttons into blue
 */
function out() {
    apb = document.getElementsByClassName("apb")[0];

    apb.onmouseout = function() {
        list = document.getElementsByClassName("button");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgba(118, 118, 118, 0.8)";

            unread = list[i].getElementsByClassName("unread")[0];
            unread.style.visibility = "hidden";

            num = unread.getElementsByTagName("div")[0];
            num.innerHTML = "...";

            list[i].onclick = function(i) {
                return function() {
                    list[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
                
                    unread = list[i].getElementsByClassName("unread");
                    unread[0].style.visibility = "visible";

                    setTimeout(getRandom, 3, unread[0], list[i]);
                }
            }(i);
        }

        info = document.getElementById("info-bar");
        info.innerHTML = "";
    }

    apb.onmouseover = function() {
        list = document.getElementsByClassName("button");
        for (var i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
        }
    }
}

function getRandom(unread, list) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        num = unread.getElementsByTagName("div")[0];
        button = document.getElementsByTagName("li");

        /**
         * When waiting: change other buttons' style (except those already have gained the value)
         */
        if (xmlhttp.readyState != 4) {
            num.innerHTML = "...";

            for (var i = 0; i < button.length; i++) {
                if (button[i] != list) {
                    button[i].style.backgroundColor = "rgba(118, 118, 118, 0.8)";
                    button[i].onclick = function() {};
                }
            }

        /**
         * When result comes: turn the current button into gray and display the result
         */
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var flag = 0;
            info = document.getElementById("info-bar");

            num.innerHTML = xmlhttp.responseText;

            for (var i = 0; i < button.length; i++) {
                visited = button[i].getElementsByClassName("unread")[0];

                if (button[i] != list && visited.style.visibility == "hidden"){
                    button[i].style.backgroundColor = "rgba(48, 63, 159, 1)";
                    button[i].onclick = function(i) {
                        return function() {
                            button[i].style.backgroundColor = "rgba(48, 63, 159, 1)";

                            unread = button[i].getElementsByClassName("unread");
                            unread[0].style.visibility = "visible";

                            setTimeout(getRandom, 3, unread[0], button[i]);
                        }
                    }(i);
                } else {
                    flag++; // to judge whether we can calculate the sum
                    button[i].style.backgroundColor = "rgba(118, 118, 118, 0.8)";
                    button[i].onclick = function() {};
                }
            }

            /**
             * Calculate sum
             */
            if (flag == 5) {
                info.style.backgroundColor = "rgba(48, 63, 159, 1)";
                info.onclick = function() {
                    var sum = 0;

                    button = document.getElementsByTagName("li");
                    for (var i = 0; i < button.length; i++) {
                        num = button[i].getElementsByClassName("num")[0];
                        sum += new Number(num.innerHTML);
                    }

                    info.innerHTML = sum;

                    info.style.backgroundColor = "rgba(118, 118, 118, 0.8)";
                    info.onclick = function() {};
                }
            } else if (flag < 5) {
                info.style.backgroundColor = "rgba(118, 118, 118, 0.8)";
                info.onclick = function() {};
            }
        }
    }
    xmlhttp.open("GET",'http://localhost:3000/',true);
    xmlhttp.send(null);
}