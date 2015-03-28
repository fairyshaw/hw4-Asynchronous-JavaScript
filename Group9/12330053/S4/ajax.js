/**
 * Created by air on 15/3/26.
 */
document.onload = loaded();

/**
 * @fn loaded
 * @parm 无
 * @brief 对整个页面的初始化，包括给按钮添加click事件
 */
function loaded() {
    var ul = document.getElementById("control-ring");
    ul.setAttribute("onclick", "clickAjax()");
    var apb = document.getElementsByClassName("apb");
    apb[0].setAttribute("onclick", "robot4()");
}

/**
 * @fn CallRandom
 * @param target 用户点击的按钮element
 * @constructor
 * @brief 用于申请XHR并且向服务器发送请求
 */
function CallRandom(target) {
    var XHR;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        XHR = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            showNum(XHR.responseText, target);
            enableOtherBtn(target);
        }
    }
    XHR.open("GET", "/", true);
    XHR.send();
}

/**
 * @fn clickAjax
 * @param e 点击的event
 * @brief 事件委托函数，
 */
function clickAjax(e){
    e = e || window.event;
    var target = e.target;//缓存DOM对象，防止多次寻找
    if(target.parentNode.id != "control-ring"){
        target = target.parentNode;
    }
    var unread =target.getElementsByClassName("unread");
    if(unread.length >= 1){
        return;
    }

    var returnNum = document.createElement("div");
    returnNum.setAttribute("class","unread");
    returnNum.innerHTML = "...";
    target.appendChild(returnNum);

    disableOtherBtn(target);
    CallRandom(target);
}

/**
 * @fn showNum
 * @param n 异步返回值
 * @param target 用户点击的按钮element
 * @brief 在点击的按钮右上方添加返回值
 */
function showNum(n,target){
    var returnNum = target.getElementsByClassName("unread");
    if(returnNum[0]) {
        returnNum[0].innerHTML = n;
    }
    if(isAllReturned()){
        var bigBtn = document.getElementsByClassName("info");
        bigBtn = bigBtn[0];
        bigBtn.style.backgroundColor = "rgba(61,40,166,1)";
        bigBtn.setAttribute("onclick","calculate()");
    }
}


/**
 * @fn calculate
 * @brief  计算五个按钮中的数值，并显示在大气泡上
 */
function calculate(){
    var parent = document.getElementById("control-ring");
    var children = parent.getElementsByTagName("li");
    var len = children.length;
    var sum = 0;
    for (var c = 0;c<len;c++) {
        var unread = children[c].getElementsByClassName("unread");
        if (unread.length != 0) {
            sum = sum + parseInt(unread[0].innerHTML);
        }
    }
    var result = document.getElementById("cal-result");
    result.innerHTML = sum;
    var bigBtn = document.getElementsByClassName("info");
    bigBtn = bigBtn[0];
    bigBtn.style.backgroundColor = "grey";
    bigBtn.removeAttribute("onclick");
}

/**
 * @fn  disableOtherBtn
 * @param target DOM对象，用户点击的按钮
 * @brief 把除target以外的按钮全部灭活
 */
function disableOtherBtn(target){
    target.style.backgroundColor = "rgba(61,40,166,1)";
    var ul = document.getElementById("control-ring");
    ul.removeAttribute("onclick");
    var parent = target.parentNode;
    var children = parent.getElementsByTagName("li");
    var len = children.length;
    for (var c = 0;c<len;c++){
        if (children[c] != target){
            children[c].style.backgroundColor = "grey";
        }
    }
}

/**
 * @fn enableOtherBtn
 * @param target DOM对象，用户点击的按钮
 * @brief 把除target以外的按钮全部激活
 */
function enableOtherBtn(target){
    var children = document.getElementById("control-ring").getElementsByTagName("li");
    var len = children.length;
    for (var c = 0;c<len;c++){
        if(children[c] == target){
            target.style.backgroundColor = "grey";
        }else {
            var unread =children[c].getElementsByClassName("unread");
            if(unread.length < 1){
                children[c].style.backgroundColor = "rgba(61,40,166,1)";
            }
        }
    }
    var ul = document.getElementById("control-ring");
    ul.setAttribute("onclick","clickAjax()");
}

/**
 * @fn isAllReturned
 * @returns {boolean}true为真
 * @brief 检测是否五个按钮都已经获得返回值了
 */
function isAllReturned(){
    var parent = document.getElementById("control-ring");
    var children = parent.getElementsByTagName("li");
    var len = children.length;
    for (var c = 0;c<len;c++){
        var unread =children[c].getElementsByClassName("unread");
        if(unread.length < 1){
            return false;
        }else{
            if(unread[0].innerHTML == "..."){
                return false;
            }
        }
    }
    return true;
}

/**
 * @fn reset
 * @brief 重置
 */
function reset(){
    var ul = document.getElementById("control-ring");

    var unread =document.getElementsByClassName("unread");
    var len = unread.length;
    for (var c = 0;c<len;c++) {
        unread[0].parentNode.removeChild(unread[0]);//把集合中的第一个元素去掉
    }


    ul.setAttribute("onclick","clickAjax()");

    var children = document.getElementById("control-ring").getElementsByTagName("li");
    var len = children.length;
    for (var c = 0;c<len;c++){
        children[c].style.backgroundColor = "rgba(61,40,166,1)";
    }

    var bigBtn = document.getElementsByClassName("info");
    bigBtn = bigBtn[0];
    bigBtn.style.backgroundColor = "grey";
    bigBtn.removeAttribute("onclick");

    var result = document.getElementById("cal-result");
    result.innerHTML = '';
}

var seq = [];
function robot4(){
    //用于生成随机数
    while(1) {
        var ok = true;
        var cur = Math.floor(Math.random() * 5 + 1);
        for(var x in seq){
            if (seq[x] == cur) {
                ok = false;
                break;
            }
        }
        if (ok){
            seq.push(cur);
        }
        if(seq.length == 5){
            break;
        }
    }
    var bigBtn = document.getElementsByClassName("info");
    bigBtn = bigBtn[0];
    var viewSeq = document.createElement("p");
    var s = '';
    var array = ['A','B','C','D','E'];
    for(var c = 0;c<5;c++){
        s = s + array[seq[c]-1];
    }
    viewSeq.innerHTML = s;
    viewSeq.setAttribute("class","upperBubble")
    bigBtn.appendChild(viewSeq);

    robot4Ajax(0);
}

function robot4Ajax(num){
    var children = document.getElementById("control-ring").getElementsByTagName("li");
    var target = children[seq[num]-1];//seq中的序列为1-5，但数组为1-4
    var unread =target.getElementsByClassName("unread");
    if(unread.length >= 1){
        return;
    }

    var returnNum = document.createElement("div");
    returnNum.setAttribute("class","unread");
    returnNum.innerHTML = "...";
    target.appendChild(returnNum);

    disableOtherBtn(target);
    robot4CallRandom(num);
}

function robot4CallRandom(num){

    var children = document.getElementById("control-ring").getElementsByTagName("li");
    var target = children[seq[num]-1];//seq中的序列为1-5，但数组为1-4
    var XHR;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        XHR = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }

    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            showNum(XHR.responseText, target);
            enableOtherBtn(target);
            var children = document.getElementById("control-ring").getElementsByTagName("li");
            if (num != 4) {
                robot4Ajax(num + 1)
            }else{
                calculate();
            }
        }
    }
    XHR.open("GET", "/", true);
    XHR.send();
}
