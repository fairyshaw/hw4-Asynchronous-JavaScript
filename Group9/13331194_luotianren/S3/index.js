$ = function(id) {
	return document.getElementById(id);
}

$$ = function(selector) {
	return document.querySelectorAll(selector);
}

window.onload = function() {
	reset();

	var at = $$(".icon")[0];

	at.onclick = function() {
		buttonClick(0);
	}

	at.onmouseout = reset;
}

function buttonClick(i) {
	var buttons = $$(".button");

	if (i == buttons.length) {
		// $("info").innerHTML = getSum();
		// $("info").classList.add("disable");
		// $("info").classList.remove("enable");
		return;
	};

	buttons[i].children[0].style.visibility = "visible";
	buttons[i].children[0].innerHTML = "...";

	buttons[i].classList.remove("enable");
	buttons[i].classList.add("disable");

	lock(buttons);

	ajaxHandler(buttons[i], i);

	setTimeout(unlock, 1000, buttons);

	buttonClick(++i);
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

function ajaxHandler(target, i) {
	var xmlhttp = window.XMLHttpRequest ?
	              new XMLHttpRequest() :
	              new ActiveXObject('Microsot.XMLHTTP');

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 &&
			xmlhttp.status     == 200)
			setNum(target, xmlhttp.responseText);
	}

	xmlhttp.open("GET","/"+i.toString(),true);
	xmlhttp.send();
}

function lock(buttons) {
	// var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].children[0].style.visibility != "visible") {
			buttons[i].classList.remove("enable");
			buttons[i].classList.add("disable");
		}
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
		$("info").innerHTML = getSum();
		// $("info").classList.add("enable");
		// $("info").classList.remove("disable");
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