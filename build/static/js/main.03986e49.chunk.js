(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(38)},18:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),o=t.n(u),c=(t(18),t(2)),i=t(3),l=t.n(i),m="/api/persons",s=function(){return l.a.get(m).then(function(e){return e.data})},f=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e,n){return l.a.put(m+"/"+e,n).then(function(e){return e.data})},v=function(e){return l.a.delete(m+"/"+e).then(function(e){return e.data})},h=function(e){var n=e.filterText,t=e.filter;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))},p=function(e){return r.a.createElement("form",{onSubmit:e.savePerson},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:e.newPhone,onChange:e.handlePhoneChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},E=function(e){var n=e.person,t=e.remove;return r.a.createElement("div",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:function(){return t(n)}},"poista"))},b=function(e){var n=e.persons,t=e.filterText,a=e.removePerson;return r.a.createElement("div",null,n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e){return r.a.createElement(E,{key:e.name,person:e,remove:function(e){return a(e)}})}))},g=function(e){var n=e.message,t=e.style;return null===n||""===n.trim()?null:r.a.createElement("div",{className:"notification "+t},n)},w=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),i=Object(c.a)(o,2),l=i[0],m=i[1],E=Object(a.useState)(""),w=Object(c.a)(E,2),j=w[0],y=w[1],O=Object(a.useState)(""),P=Object(c.a)(O,2),C=P[0],k=P[1],N=Object(a.useState)({msg:"",style:null}),S=Object(c.a)(N,2),T=S[0],x=S[1];Object(a.useEffect)(function(){s().then(function(e){return u(e)})},[]);var L=function(e){x({msg:e,style:null}),setTimeout(function(){return x({msg:"",style:null})},2e3)},J=function(e){x({msg:e,style:"error"}),setTimeout(function(){return x({msg:"",style:null})},2e3)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(g,{message:T.msg,style:T.style}),r.a.createElement(h,{filterText:C,filter:function(e){return k(e.target.value)}}),r.a.createElement("h2",null,"lis\xe4\xe4 uusi"),r.a.createElement(p,{savePerson:function(e){return function(e){e.preventDefault();var n=t.find(function(e){return e.name===l});n?window.confirm("".concat(l," on jo luettelossa, korvataanko vanha numero uudella?"))&&d(n.id,{name:l,number:j}).then(function(e){u(t.map(function(n){return n.id===e.id?e:n})),L("Muutettiin henkil\xf6n ".concat(l," puhelinnumeroa"))}).catch(function(e){return J("".concat(l," on jo poistettu"))}):(f({name:l,number:j}).then(function(e){return u(t.concat(e))}),L("Lis\xe4ttiin ".concat(l)),m(""),y(""))}(e)},newName:l,handleNameChange:function(e){return m(e.target.value)},newPhone:j,handlePhoneChange:function(e){return y(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(b,{persons:t,filterText:C,removePerson:function(e){return n=e,void(window.confirm("Poistetaanko ".concat(n.name,"?"))&&v(n.id).then(function(){u(t.filter(function(e){return e.id!==n.id})),L("Poistettu ".concat(n.name))}).catch(function(e){return J("".concat(n.name," on jo poistettu"))}));var n}}))};o.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.03986e49.chunk.js.map