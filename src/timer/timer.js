function clock() {
  var d = new Date();
  var h = (""+d.getHours("hh")).split("");
  var m = (""+d.getMinutes("mm")).split("");
  var s = (""+d.getSeconds("ss")).split("");
  
  if(h.length == 1) { h.unshift("0") }
  if(m.length == 1) { m.unshift("0") }
  if(s.length == 1) { s.unshift("0") }
  
  function addClass(el, n) {
    var newClass = 'time-' + n;
    
    if(el.classList) {
      el.setAttribute("class", newClass);
    }
  }
  
  addClass(d1, h[0]);
  addClass(d2, h[1]);
  addClass(d3, m[0]);
  addClass(d4, m[1]);
  addClass(d5, s[0]);
  addClass(d6, s[1]);
}

setInterval('clock()', 1000);