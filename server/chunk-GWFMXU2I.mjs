import './polyfills.server.mjs';
import{a as l}from"./chunk-7KZ3Z7RV.mjs";import{a as p}from"./chunk-3MPO3T63.mjs";import{a as h,b as n}from"./chunk-3ZXJO6FQ.mjs";import{Nb as f,d as g,k as m,n as i}from"./chunk-SB72VVK3.mjs";import{g as d}from"./chunk-VVCT4QZE.mjs";var a=d(p());var S=(()=>{let t=class t{constructor(r,e,s){this.storage=r,this.crud=e,this.router=s,this.LoggingIn=!1}login(r,e){return this.LoggingIn?!1:(this.LoggingIn=!0,sessionStorage.clear(),this.crud.get("users",{email:r}).pipe(g(s=>{let o=s[0];if(o.password!==e)return a.default.fire({icon:"error",text:"E-mail ou senha incorreto",timer:2e4}),!1;let c=Math.random().toString(36).substr(2);return this.crud.post(`users/${o.id}/sessions`,{token:c}).pipe(g(I=>(this.storage.setItem("JWT_Fake",c),n.token=c,this.router.navigateByUrl(""),!0))).subscribe({error:()=>(a.default.fire({icon:"error",text:"Algo deu errado! tente novamente mais tarde",timer:2e4}),!1)})})).subscribe({next:()=>(this.LoggingIn=!1,!0),error:()=>(this.LoggingIn=!1,a.default.fire({icon:"error",text:"E-mail ou senha incorreto",timer:2e4}),!1)}))}getCurrentUser(){let r=n?.token||this.storage.getItem("JWT_Fake");return{}}logOut(){let r=n?.token||this.storage.getItem("JWT_Fake");this.crud.get("sessions",{token:r}).subscribe({next:e=>{let s=e.find(o=>o.token===r);s?.id&&this.crud.delete(`users/${s.UserId}/sessions`,s.id).subscribe({error:o=>{console.log(o)}})},error:e=>{console.log(e)}}),this.storage.clear(),this.router.navigate(["/auth"])}};t.\u0275fac=function(e){return new(e||t)(i(l),i(h),i(f))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let u=t;return u})();export{S as a};