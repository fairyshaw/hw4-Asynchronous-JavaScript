$ = function(id) {
	return document.getElementById(id);
}

$$ = function(selector) {
	return document.querySelectorAll(selector);
}

window.onload = function() {
	reset();

	var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(i) {
			return function() {
				if (buttons[i].style.visibility == "visible") return;
				if (buttons[i].classList.toString().indexOf("disable") >= 0) return;

				buttons[i].children[0].style.visibility = "visible";
				buttons[i].children[0].innerHTML = "...";

				buttons[i].classList.remove("enable");
				buttons[i].classList.add("disable");

				setTimeout(lock, 100, buttons);

				ajaxHandler(buttons[i]);

				setTimeout(unlock, 100, buttons);
			}
		}(i);
	}

	$("info").onclick = function() {
		if ($("info").innerHTML == " ") {
			$("info").innerHTML = getSum();
			$("info").classList.add("disable");
			$("info").classList.remove("enable");
		}
	}

	$("info-bar").onmouseout = reset;
}

function reset() {
	var lisSpan = $$(".unread");
	for (var i = 0; i < lisSpan.length; i++) {
		lisSpan[i].style.visibility = "collapse";
		lisSpan[i].parentNode.classList.remove("disable");
		lisSpan[i].parentNode.classList.add("enable");
	}

	$("info").innerHTML = "  ";
	$("info").classList.add("disable");
	$("info").classList.remove("enable");
}

function ajaxHandler(target) {
	var xmlhttp = window.XMLHttpRequest ?
	              new XMLHttpRequest() :
	              new ActiveXObject('Microsot.XMLHTTP');

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 &&
			xmlhttp.status     == 200)
			setNum(target, xmlhttp.responseText);
	}

	xmlhttp.open("GET","/",true);
	xmlhttp.send();
}

function lock(buttons) {
	// var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("enable");
		buttons[i].classList.add("disable");
	}
}
function unlock(buttons) {
	// var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].children[0].style.visibility != "visible") {
			buttons[i].classList.remove("disable");
			buttons[i].classList.add("enable");
		}
	}
}

function setNum(target, num) {
	var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		if (target == buttons[i]) {
			buttons[i].children[0].innerHTML = num;
			break;
		}
	}
	if (checkButtonsAllClicked()) {
		$("info").innerHTML = " ";
		$("info").classList.add("enable");
		$("info").classList.remove("disable");
	}
}

function checkButtonsAllClicked() {
	var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].children[0].innerHTML == "...") return false;
	}
	return true;
}

function getSum() {
	var buttons = $$(".button");
	var sum = 0;
	for (var i = 0; i < buttons.length; i++) {
		sum += parseInt(buttons[i].children[0].innerHTML);
	}
	return sum;
}