window.onload = function() {
	activation();
	getNumbers();
}

var pan = 0;
var count = 0;
var answ = 0;
function getRandomNumber(circle, flag, i) {
	console.log(i);
	var buttons = document.getElementsByTagName("ul");
	var lis = buttons[1].getElementsByTagName("li");
	var xmlHttpReg = null;
	xmlHttpReg = new XMLHttpRequest();
    if (xmlHttpReg != null) {
        xmlHttpReg.open("get", "/"+String(i), true);
        xmlHttpReg.send();
        xmlHttpReg.onreadystatechange = function(){
        	if (xmlHttpReg.readyState==4 && xmlHttpReg.status == 200) {
            	circle.innerHTML=(xmlHttpReg.responseText);
            	for (var i = 0; i < 5; i++) {
            		lis[i].style.backgroundColor = "#234991";
            	}
            	count++;
            	answ += parseInt(circle.innerHTML);
            	if (count == 5) {
            		var buttons = document.getElementsByTagName("ul");
            		buttons[0].getElementsByTagName("li")[0].getElementsByTagName("span")[0].innerHTML = answ;
            	}
            }
        };
    }
}

function getNumbers() {
	var buttons = document.getElementsByTagName("ul");
	var lis = buttons[1].getElementsByTagName("li");
	var ans = buttons[0].getElementsByTagName("li")[0];
	var atplus = document.getElementById("button");
	var flag = [];
	var isclicked = [];
	var sum = 0;
	atplus.onclick = function(){
		for (var i = 0; i < 5; i++) {
			lis[i].style.backgroundColor = "#234991";
			flag[i] = 1;
		}
		for (var i = 0; i < 5; i++) {
				var circle = lis[i].getElementsByTagName("span")[0];
				circle.style.display = "inline";
				circle.innerHTML = "...";
				getRandomNumber(circle, flag, i);
		}
	};


}

function activation() {
	var buttons = document.getElementById("button");
	buttons.onmouseover = function() {
		document.getElementById("area").className = "at-plus-container-block";
		this.id = "button_hover";
	};
	var area = document.getElementById("area");
	area.onmouseleave = function() {
		location.reload();
	};
	var area = document.getElementById("area"); 
}