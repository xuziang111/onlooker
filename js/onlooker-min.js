function disableMouseDrag(e){e.stopPropagation()}function showWindow(e,t){const n=onlookerData[t];document.getElementById("record-win-title").innerText=e.title;const o=document.getElementById("record-win-content");o.innerHTML="";for(let e=0;e<n.length;e++){let t=n[e],r=document.createElement("a");r.className="record-item",r.href=t.link,r.target="_blank";for(let e=0;e<t.livers.length;e++){let n=onlookerData[t.livers[e]],o=document.createElement("img");o.className="record-item-avatar",o.src=n.avatar,o.alt=n.name,r.append(o)}let c=document.createElement("div");c.className="record-item-text";let l=document.createElement("span");l.className="record-item-title",l.innerText=t.title,c.append(l);let i=document.createElement("span");i.className="record-item-subtitle",i.innerText=t.subtitle,c.append(i),r.append(c),o.append(r)}window.location.hash="#record-win"}document.addEventListener("DOMContentLoaded",(function(){const e=document.body;e.scrollTo(0,(e.scrollHeight-e.clientHeight)/2),e.style.cursor="grab";let t={top:0,left:0,x:0,y:0};const n=function(n){const o=n.clientX-t.x,r=n.clientY-t.y;e.scrollTop=t.top-r,e.scrollLeft=t.left-o},o=function(){e.style.cursor="grab",e.style.removeProperty("user-select"),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)};e.addEventListener("mousedown",(function(r){e.style.cursor="grabbing",e.style.userSelect="none",t={left:e.scrollLeft,top:e.scrollTop,x:r.clientX,y:r.clientY},document.addEventListener("mousemove",n),document.addEventListener("mouseup",o)})),-1===document.cookie.indexOf("onlookerNoticed")&&(window.location.hash="#steam-record-win",document.cookie="onlookerNoticed=1; expires=Fri, 31 Dec 9999 23:59:59 GMT")}));