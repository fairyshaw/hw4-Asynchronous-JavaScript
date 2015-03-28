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
		reset();
		// buttonClick(0);
		var arr = new Array();
		for (var i = 0; i < 5; i++) arr[i] = false;
		var A = new Array();
		var i = 0;
		$("info").style.fontSize = "20px";
		$("info").innerHTML = "<br/><br/>";
		while (i < 5) {
			var randomNum = getRandomNumber(4);
			if (!arr[randomNum]) {
				arr[randomNum] = true;
				A[i] = randomNum;

				if (i > 0) $("info").innerHTML += "->";
				// if (i == 2) $("info").innerHTML += '\n';
				$("info").innerHTML += getAlpha(randomNum);
				// console.log(randomNum);

				i++;
			}
		}
		setTimeout(buttonClick, 100, 0, A);
	}

	at.onmouseout = reset;
}

function getAlpha(a) {
	if      (a == 0) return 'A';
	else if (a == 1) return 'B';
	else if (a == 2) return 'C';
	else if (a == 3) return 'D';
	else             return 'E';
}


function getRandomNumber(limit) {
  return Math.round(Math.random() * limit);
}

function buttonClick(i, A) {
	var buttons = $$(".button");
	if (i >= buttons.length) {
		if (checkButtonsAllClicked()) {
			$("info").style.fontSize = "130px";
			$("info").innerHTML = getSum();
			// $("info").classList.add("enable");
			// $("info").classList.remove("disable");
		}
		return;
	}
	if (buttons[ A[i] ].style.visibility == "visible") return;
	// if (buttons[ A[i] ].classList.toString().indexOf("disable") >= 0) return;

	buttons[ A[i] ].children[0].style.visibility = "visible";
	buttons[ A[i] ].children[0].innerHTML = "...";

	// buttons[ A[i] ].classList.remove("enable");
	// buttons[ A[i] ].classList.add("disable");
	buttons[ A[i] ].className = buttons[ A[i] ].className.toString().replace("enable", "disable");

	setTimeout(lock, 100, buttons);

	ajaxHandler(buttons[ A[i] ], i, A, function() { buttonClick(i+1, A); });

	setTimeout(unlock, 100, buttons);
}

function reset() {
	var lisSpan = $$(".unread");
	for (var i = 0; i < lisSpan.length; i++) {
		lisSpan[i].style.visibility = "collapse";
		lisSpan[i].parentNode.classList.remove("disable");
		lisSpan[i].parentNode.classList.add("enable");
		lisSpan[i].innerHTML == "...";
	}

	$("info").innerHTML = "  ";
	$("info").classList.add("disable");
	$("info").classList.remove("enable");
}

function ajaxHandler(target, i, A, Func) {
	var xmlhttp = window.XMLHttpRequest ?
	              new XMLHttpRequest() :
	              new ActiveXObject('Microsot.XMLHTTP');

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 &&
			xmlhttp.status     == 200)
			setNum(i, xmlhttp.responseText, A, Func);
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

function setNum(target, num, A, Func) {
	var buttons = $$(".button");
	for (var i = 0; i < buttons.length; i++) {
		if (A[target] == i) {
			buttons[i].children[0].innerHTML = parseInt(num);
			// console.log(buttons[i]);
			unlock(buttons);
			break;
		}
	}

	// console.log(buttons[A[target]]);

	setTimeout(Func, 300);
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