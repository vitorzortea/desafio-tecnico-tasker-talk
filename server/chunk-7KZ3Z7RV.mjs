import './polyfills.server.mjs';
import{k as n}from"./chunk-SB72VVK3.mjs";var i=(()=>{let t=class t{constructor(){}setItem(e,r){this.changeStorage("setItem",e,r)}getItem(e){return this.changeStorage("getItem",e)}removeItem(e){this.changeStorage("removeItem",e)}clear(){this.changeStorage("clear")}changeStorage(e,r,a){return typeof window<"u"?{setItem:()=>sessionStorage.setItem(r||"",a||""),getItem:()=>sessionStorage.getItem(r||""),removeItem:()=>sessionStorage.removeItem(r||""),clear:()=>sessionStorage.clear()}[e]():null}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=n({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();export{i as a};
