import{b as O,c,e as P,f as w,h as b,i as E,j as _,k as S,m as N,q as F,s as T,t as j,u as I}from"./chunk-TKRXU44K.js";import{a as y}from"./chunk-GJILKU6X.js";import"./chunk-XIAWWUNQ.js";import{a as z}from"./chunk-ICX3IGPV.js";import{N as f,Z as x,ab as M,da as o,e as G,ea as n,fa as a,ka as C,mb as v,q as l,qb as u,ta as r,v as s,w as p}from"./chunk-GCTQJGLF.js";var k=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=s({type:t,selectors:[["app-auth"]],decls:14,vars:0,consts:[[1,"mb-3"],["src","assets/svg/logo.svg","alt","Tasker Talk"],["src","assets/svg/isometrico.svg","alt","Ilustra\xE7\xE3o com modelo de aplica\xE7\xF5es"]],template:function(i,d){i&1&&(o(0,"div")(1,"h1",0),a(2,"img",1),n(),a(3,"router-outlet"),n(),o(4,"div"),a(5,"img",2),o(6,"span")(7,"h2"),r(8,"Muito al\xE9m do 'Hello, World!'"),n(),o(9,"p"),r(10,"Um Gerenciador de tarefas t\xE3o intuitivo que at\xE9 um "),o(11,"strong"),r(12,"FRONT-END"),n(),r(13," faz em 3 dias"),n()()())},dependencies:[v],styles:["[_nghost-%COMP%]{display:flex;align-items:stretch;width:100%;gap:20px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;align-self:stretch}[_nghost-%COMP%] > [_ngcontent-%COMP%]:first-child{flex:1 0 0}[_nghost-%COMP%] > [_ngcontent-%COMP%]:first-child > h1[_ngcontent-%COMP%]{max-width:280px;width:100%;padding:10px}[_nghost-%COMP%] > [_ngcontent-%COMP%]:first-child > h1[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%] > [_ngcontent-%COMP%]:last-child{flex:.5 0 200px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;color:var(--surface-0);text-align:center;background:linear-gradient(162deg,#fff0 40%,#ffffffb3 50%),linear-gradient(259deg,var(--primary-900) 0%,var(--primary-400) 100%);background-blend-mode:overlay}[_nghost-%COMP%] > [_ngcontent-%COMP%]:last-child   h2[_ngcontent-%COMP%]{text-transform:uppercase;max-width:450px;text-shadow:3px 3px 8px var(--primary-900);font-size:1.5rem;line-height:1.15em;margin:-.2em auto .1em;letter-spacing:1px}[_nghost-%COMP%] > [_ngcontent-%COMP%]:last-child   p[_ngcontent-%COMP%]{max-width:400px;text-shadow:1px 1px 1px var(--primary-700),-1px -1px 1px var(--primary-500),0px 0px 5px var(--primary-900),0px 0px 9px var(--surface-900);font-weight:500;line-height:1.2em;opacity:.8;font-size:1.2em}[_nghost-%COMP%] > [_ngcontent-%COMP%]:last-child   img[_ngcontent-%COMP%]{max-height:80%;max-width:100%;margin-bottom:-5%}"]});let e=t;return e})();var h=G(z());var D=(()=>{let t=class t{constructor(m,i){this.auth=m,this.fb=i,this.ifb=i,this.form=this.ifb.group({email:["",[c.email,c.required]],password:["",[c.required]]})}login(){if(this.form.valid){let m=this.form.value;this.auth.login(m.email,m.password)&&h.default.fire({text:"Foi!",icon:"success"})}else h.default.fire({text:"O formul\xE1rio de login deve ser respondido corretamente.",icon:"error"})}};t.\u0275fac=function(i){return new(i||t)(f(y),f(S))},t.\u0275cmp=s({type:t,selectors:[["app-login"]],decls:17,vars:1,consts:[[1,"d-flex","f-wrap","g-1","mb-2",3,"ngSubmit","formGroup"],[1,"mb-3","mt-2","text-lg","font-semibold"],[1,"flex","flex-column","gap-2"],["for","email1",1,"block","text-900","font-medium","mb-1"],["formControlName","email","id","email1","type","text","placeholder","Email address","pInputText","",1,"w-full"],["for","password1",1,"block","text-900","font-medium","mb-1"],["formControlName","password","id","password1","type","password","placeholder","Password","pInputText","",1,"w-full"],["pButton","","label","Entrar","icon","pi pi-user",1,"w-full","mt-2","mb-3"],[1,"font-medium","ml-1","text-cyan-500","cursor-pointer"]],template:function(i,d){i&1&&(o(0,"form",0),C("ngSubmit",function(){return d.login()}),o(1,"p",1),r(2,"Bem vindo, fa\xE7a seu login"),n(),o(3,"div",2)(4,"div")(5,"label",3),r(6,"E-mail:"),n(),a(7,"input",4),n(),o(8,"div")(9,"label",5),r(10,"Senha:"),n(),a(11,"input",6),n(),a(12,"button",7),o(13,"p"),r(14,"N\xE3o tem uma conta? "),o(15,"a",8),r(16,"Registre agora"),n()()()()),i&2&&x("formGroup",d.form)},dependencies:[b,O,P,w,E,_,j,F],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;max-width:350px}[_nghost-%COMP%]   form[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   form[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]:after{content:"";display:block;width:150px;height:4px;margin-top:2px;background-color:var(--cyan-500);border-radius:2px}[_nghost-%COMP%]     .p-inputtext{padding:calc(var(--font-size) * .8)}']});let e=t;return e})();var R=[{path:"",pathMatch:"full",redirectTo:"login"},{path:"",component:k,children:[{path:"login",component:D}]}],B=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=p({type:t}),t.\u0275inj=l({imports:[u.forChild(R),u]});let e=t;return e})();var lt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=p({type:t}),t.\u0275inj=l({imports:[M,B,N,I,T]});let e=t;return e})();export{lt as AuthModule};
