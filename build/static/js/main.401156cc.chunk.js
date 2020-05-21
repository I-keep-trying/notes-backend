(this["webpackJsonpreact-boilerplate"]=this["webpackJsonpreact-boilerplate"]||[]).push([[0],{18:function(e,t,n){e.exports=n(43)},23:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),c=n.n(o),u=(n(23),n(1)),l=n.n(u),i=n(4),s=n(16),m=n(17),f=n(2),p=n(5),d=n.n(p),v=null,b={getAll:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/notes");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,d.a.post("/api/notes",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(i.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{Authorization:v}},e.next=3,d.a.patch("".concat("/api/notes","/").concat(t),{id:n.id,important:n.important},a).catch((function(e){return console.log("Errors:",e)}));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),deleteNote:function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,d.a.delete("".concat("/api/notes","/").concat(t.id),n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){v="bearer ".concat(e)}},h={login:function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(e){var t=e.handleSubmit,n=e.handleUsernameChange,a=e.handlePasswordChange,o=e.username,c=e.password;return r.a.createElement("div",null,r.a.createElement("h2",null,"Login"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"username",r.a.createElement("input",{value:o,onChange:n})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"password",value:c,onChange:a})),r.a.createElement("button",{type:"submit"},"login")))},g=Object(a.forwardRef)((function(e,t){var n=Object(a.useState)(!1),o=Object(f.a)(n,2),c=o[0],u=o[1],l={display:c?"none":""},i={display:c?"":"none"},s=function(){u(!c),c&&t.current.focus()};return Object(a.useImperativeHandle)(t,(function(){return{toggleVisibility:s}})),r.a.createElement("div",null,r.a.createElement("div",{style:l},r.a.createElement("button",{onClick:s},e.buttonLabel)),r.a.createElement("div",{style:i},e.children,r.a.createElement("button",{onClick:s},"cancel")))})),O=Object(a.forwardRef)((function(e){e.onSubmit,e.handleChange;var t=e.value,n=e.user,o=e.ref,c=Object(a.useState)(""),u=Object(f.a)(c,2),l=u[0],i=u[1],s=Object(a.useState)([]),m=Object(f.a)(s,2),p=m[0],d=m[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Create a new note"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:l,user:{username:n.username,name:n.name},date:(new Date).toISOString(),important:Math.random()<.5};b.create(t).then((function(e){d(p.concat(e)),i("")})).catch((function(e){})),i("")}},r.a.createElement("input",{value:t,onChange:function(e){i(e.target.value)},ref:o}),r.a.createElement("button",{type:"submit"},"save")))})),w=(n(42),function(e){var t=e.note,n=(e.user,e.toggleImportance),a=e.deleteNote,o=t.important?"make not important":"make important",c=JSON.stringify(t.user.name);return r.a.createElement("li",null,"Important? ",t.important.toString(),"::: ",t.content,r.a.createElement("button",{onClick:n},o),r.a.createElement("button",{value:t.id,onClick:function(){return a(t)}},"Delete"),r.a.createElement("br",null),"Created by: ",c)}),j=function(e){var t=e.errorMessage,n=e.text;return null===t?null:"OK"===t.status?r.a.createElement("div",{text:n,className:"notify"},t.text):r.a.createElement("div",{text:n,className:"error"},t.text)},S=function(){var e=Object(a.useState)([]),t=Object(f.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),u=Object(f.a)(c,2),p=u[0],d=u[1],v=Object(a.useState)(!0),S=Object(f.a)(v,2),x=S[0],y=S[1],k=Object(a.useState)(null),C=Object(f.a)(k,2),N=C[0],I=C[1],T=Object(a.useState)(""),A=Object(f.a)(T,2),D=A[0],P=A[1],z=Object(a.useState)(""),J=Object(f.a)(z,2),M=J[0],U=J[1],K=Object(a.useState)(null),L=Object(f.a)(K,2),R=L[0],W=L[1],B=Object(a.useState)(!1),H=Object(f.a)(B,2),V=H[0],X=H[1],$={display:V?"none":""},q={display:V?"":"none"},F=function(){X(!V)},G=Object(a.useRef)();Object(a.useEffect)((function(){V&&G.current.focus()}),[V]),Object(a.useEffect)((function(){b.getAll().then((function(e){o(e)}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedNoteappUser");if(e){var t=JSON.parse(e);W(t),b.setToken(t.token)}}),[]);var Q=function(e){I(e),setTimeout((function(){I(null)}),3e3)},Y=x?n:n.filter((function(e){return!0===e.important})),Z=function(e){e.preventDefault();var t={content:p,user:{username:R.username,name:R.name},date:(new Date).toISOString(),important:Math.random()<.5};b.create(t).then((function(e){o(n.concat(e)),Q({text:"Note successfully added",status:"OK"}),d("")})).catch((function(e){Q({text:e.response.data.error})})),d("")},_=function(e){var t=n.indexOf(e),a=e.user.name,r=R.name;a===r&&(b.deleteNote(e).then((function(){Q({text:"Note id: ".concat(e.id," deleted"),status:"OK"}),setTimeout((function(){I(null)}),3e3)})),n.splice(t,1),o(Object(s.a)(n))),a!==r?(Q({text:"".concat(r," not authorized")}),setTimeout((function(){I(null)}),3e3)):null===R&&(Q({text:"Who are you?"}),setTimeout((function(){I(null)}),3e3))},ee=function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h.login({username:D,password:M});case 4:n=e.sent,window.localStorage.setItem("loggedNoteappUser",JSON.stringify(n)),b.setToken(n.token),W(n),P(""),U(""),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),Q({text:e.t0.response.data.error});case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(i.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),window.localStorage.removeItem("loggedNoteappUser"),W(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null," NOTES APP EXPERIMENT"),r.a.createElement(g,{buttonLabel:"new note"},r.a.createElement(O,{onSubmit:Z,value:p,handleChange:function(e){d(e.target.value)},ref:G})),r.a.createElement("h1",null," NOTES APP"),r.a.createElement(j,{errorMessage:N}),null===R?r.a.createElement("div",null,r.a.createElement(g,{buttonLabel:"login"},r.a.createElement(E,{username:D,password:M,handleUsernameChange:function(e){var t=e.target;return P(t.value)},handlePasswordChange:function(e){var t=e.target;return U(t.value)},handleSubmit:ee}))):r.a.createElement("div",null,r.a.createElement("p",null,R.name," is logged in"," ",r.a.createElement("button",{onClick:te},"logout")),r.a.createElement("div",null,r.a.createElement("div",{style:$},r.a.createElement("button",{onClick:F},"new note")),r.a.createElement("div",{style:q},r.a.createElement("h2",null,"Create a new note"),r.a.createElement("form",{onSubmit:Z},r.a.createElement("input",{value:p,onChange:function(e){d(e.target.value)},ref:G}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement("button",{onClick:F},"cancel")))),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return y(!x)}},"show ",x?"important":"all")),r.a.createElement("ul",null,Y.map((function(e){return r.a.createElement(w,{key:e.id,note:e,user:R,toggleImportance:function(){return function(e){var t=n.find((function(t){return t.id===e})),a=t.user.name,r=R.name,c=Object(m.a)({},t,{important:!t.important}),u=Y.map((function(t){return t.id!==e?t:c}));if(a!==r)return o(Y),void Q({text:" '".concat(r,"' is not authorized to change this note ")});b.update(e,c).then((function(){o(u),Q({text:"the importance of note '".concat(t.id,"' has been changed to ").concat(c.important.toString()," "),status:"OK"})})).catch((function(e){console.log("error",e),I({text:"the note '".concat(t.content,"' was already deleted from server")}),setTimeout((function(){I(null)}),5e3)}))}(e.id)},deleteNote:_})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.401156cc.chunk.js.map