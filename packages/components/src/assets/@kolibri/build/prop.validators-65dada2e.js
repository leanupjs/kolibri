/*!
 * KoliBri - the accessible web component library
 */
import{g as e,a as t,I as n,L as r}from"./dev.utils-2cf8d1a6.js";import{s as o,f as i}from"./index.m-0a218bb8.js";import{d as a}from"./a11y.tipps-aa545fdc.js";import{p as l,a as s}from"./register-65f59344.js";const c=(e,t)=>{t.forEach((t=>{!1===e.has(t)&&e.add(t)}))},u=(e,t=document)=>{if(t instanceof Document||t instanceof HTMLElement||t instanceof ShadowRoot){const o=new Set;c(o,t.querySelectorAll(e));const r=t.querySelectorAll('[class*="hydrated"]');for(let t=0;t<r.length;t++){const n=r[t].shadowRoot;c(o,u(e,"object"==typeof n&&null!==n?n:r[t]))}return Array.from(o)}throw new Error("The parameter document for the method querySelectorAll is not type of Document, HTMLElement or ShadowRoot.")},f=(e,t=document)=>{if(t instanceof Document||t instanceof HTMLElement||t instanceof ShadowRoot){let o=t.querySelector(e);if(null===o){const r=t.querySelectorAll('[class*="hydrated"]');for(let t=0;t<r.length;t++){const n=r[t].shadowRoot;if(o=f(e,"object"==typeof n&&null!==n?n:r[t]),null!==o)break}}return o}throw new Error("The parameter document for the method querySelector is not type of Document, HTMLElement or ShadowRoot.")};var d=m;function m(e){var t=v(e);return 3==t.length?t.concat(255):(t[3]=Math.round(t[3]),t)}function v(e){return"string"==typeof e?("red"==(t=e=e.toLowerCase())?[255,0,0]:"green"==t?[0,255,0]:"blue"==t?[0,0,255]:"black"==t?[0,0,0]:"white"==t?[255,255,255]:"cyan"==t?[0,255,255]:"gray"==t||"grey"==t?[128,128,128]:"magenta"==t||"pink"==t?[255,0,255]:"yellow"==t?[255,255,0]:void 0)||function(e){var t=e.replace(/^#/,""),o=t.length;if(3==o||4==o){var r=y(t[0]),n=y(t[1]),a=y(t[2]),l=3==o?255:y(t[3]);if(isNaN(r)||isNaN(n)||isNaN(a)||isNaN(l))return;return[r,n,a,l]}}(e)||function(e){var t=e.replace(/^#/,""),o=t.length;if(6==o||8==o){var r=y(t.slice(0,2)),n=y(t.slice(2,4)),a=y(t.slice(4,6)),l=6==o?255:y(t.slice(6,8));if(isNaN(r)||isNaN(n)||isNaN(a)||isNaN(l))return;return[r,n,a,l]}}(e)||function(e){if("rgb("==e.substr(0,4)){var t=(e=e.match(/^rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number),o=p(t[0],!0),r=p(t[1],!0),n=p(t[2],!0);if(-1!=o&&-1!=r&&-1!=n)return[o,r,n,255]}}(e)||function(e){if("rgba("==e.substr(0,5)){var t=(e=e.match(/^rgba\(([^)]+)\)/)[1]).split(/ *, */).map(Number),o=p(t[0],!0),r=p(t[1],!0),n=p(t[2],!0),a=p(255*t[3]);if(-1!=o&&-1!=r&&-1!=n&&-1!=a)return[o,r,n,a]}}(e)||[0,0,0,255]:function(e){if("[object Object]"===Object.prototype.toString.call(e)&&Object.getPrototypeOf(e)===Object.getPrototypeOf({})){var t=p(null!=e.r?e.r:null!=e.red?e.red:0,!0),o=p(null!=e.g?e.g:null!=e.green?e.green:0,!0),r=p(null!=e.b?e.b:null!=e.blue?e.blue:0,!0),n=p(null!=e.a?e.a:null!=e.alpha?e.alpha:255,!0);if(-1!=t&&-1!=o&&-1!=r&&-1!=n)return[t,o,r,n]}}(e)||function(e){if(Array.isArray(e)&&(3==e.length||4==e.length)){var t=p(e[0],!0),o=p(e[1],!0),r=p(e[2],!0),n=p(null!=e[3]?e[3]:255,!0);if(-1!=t&&-1!=o&&-1!=r&&-1!=n)return[t,o,r,n]}}(e)||function(e){if("number"==typeof e&&Math.floor(e)==e&&e<=4294967295&&e>=0)return[e>>16&255,e>>8&255,255&e,e>>24&255]}(e)||[0,0,0,255];var t}function h(e){var t=e.toString(16);return 1==t.length?"0"+t:t}function y(e){return 1==e.length?parseInt(e+e,16):parseInt(e,16)}function p(e,t){return"number"!=typeof e||!0===t&&Math.floor(e)!==e?-1:e>=0&&e<=255?e:-1}d.arr=m,d.obj=function(e){var t=v(e);return{r:t[0],g:t[1],b:t[2],a:3==t.length?255:Math.round(t[3])}},d.css=function(e){var t=v(e);return 3==t.length&&t.push(255),255==t[3]?"rgb("+t[0]+", "+t[1]+", "+t[2]+")":0==t[3]?"rgba("+t[0]+", "+t[1]+", "+t[2]+", 0)":"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+String(t[3]/255).substr(1)+")"},d.hex=function(e){3==(a=v(e)).length&&a.push(255);var t=255==a[3],o=h(a[0]),r=h(a[1]),n=h(a[2]),a=h(Math.round(a[3])),l=function(e,t,o,r){var n=["ff","00","11","22","33","44","55","66","77","88","99","aa","bb","cc","dd","ee"];return-1!=n.indexOf(e)&&-1!=n.indexOf(t)&&-1!=n.indexOf(o)&&-1!=n.indexOf(r)}(o,r,n,a);return t?l?"#"+o.charAt(0)+r.charAt(0)+n.charAt(0):"#"+o+r+n:l?"#"+o.charAt(0)+r.charAt(0)+n.charAt(0)+a.charAt(0):"#"+o+r+n+a},d.num=function(e){var t=v(e);return 3==t.length?t.push(255):t[3]=Math.round(t[3]),(t[3]<<24>>>0|t[0]<<16|t[1]<<8|t[2])>>>0};const b=/\[object Object\]/,g=(e,t)=>{"string"==typeof e&&b.test(e)||t()},w=(e,t)=>{"string"==typeof e&&""===e||t()},S=(e,t,o,r={})=>{var n,a;void 0===e.nextHooks&&(e.nextHooks=new Map),void 0===e.nextState&&(e.nextState=new Map),e.nextState.get(t)!==o&&(e.nextHooks.get(t)instanceof Map==0&&e.nextHooks.set(t,new Map),"function"==typeof r.afterPatch&&(null===(n=e.nextHooks.get(t))||void 0===n||n.set("afterPatch",r.afterPatch)),"function"==typeof r.beforePatch&&(null===(a=e.nextHooks.get(t))||void 0===a||a.set("beforePatch",r.beforePatch)),e.nextState.set(t,o),(e=>{var t,o,r;null===(t=e.nextHooks)||void 0===t||t.forEach(((t,o)=>{var r;const n=t.get("beforePatch");"function"==typeof n&&n(null===(r=e.nextState)||void 0===r?void 0:r.get(o),e.nextState,e,o)})),(null===(o=e.nextState)||void 0===o?void 0:o.size)>0&&(e.state=Object.assign(Object.assign({},e.state),Object.fromEntries(e.nextState)),delete e.nextState,null===(r=e.nextHooks)||void 0===r||r.forEach(((t,o)=>{const r=t.get("afterPatch");"function"==typeof r&&r(e.state[o],e.state,e,o)}))),delete e.nextHooks})(e))},N=(e,t,o,r,n,l={})=>{!o(n)||void 0!==(null==l?void 0:l.allowNull)&&!1!==(null==l?void 0:l.allowNull)&&null!==n?void 0!==(null==l?void 0:l.defaultValue)||void 0===(null==l?void 0:l.required)||!1===(null==l?void 0:l.required)?S(e,t,null==l?void 0:l.defaultValue,null==l?void 0:l.hooks):(!0===l.allowNull&&r.add(null),!0!==l.required&&r.add(void 0),((e,t,o,r)=>{a(`[${e.constructor.name}] Der Property-Wert (${o}) für '${t}' ist nicht valide. Folgende Werte sind erlaubt: ${Array.from(r).join(", ")}`)})(e,t,n,r)):S(e,t,n,null==l?void 0:l.hooks)},M=(e,t,o,r)=>{N(e,t,(e=>"boolean"==typeof e),new Set(["Boolean {true, false}"]),o,r)},E=(e,t,o,r)=>{N(e,t,(e=>"string"==typeof e&&e.length>=("number"==typeof(null==r?void 0:r.minLength)?null==r?void 0:r.minLength:1)),new Set(["String (nicht leer)"]),o,r)},j=(e,t,o,r)=>{N(e,t,(e=>"number"==typeof e&&(void 0===(null==r?void 0:r.min)||"number"==typeof(null==r?void 0:r.min)&&e>=r.min)&&(void 0===(null==r?void 0:r.max)||"number"==typeof(null==r?void 0:r.max)&&e<=r.max)),new Set(["Number"]),o,r)},k=(e,t,o,r,n=(e=>e==e),l={})=>{w(r,(()=>{g(r,(()=>{void 0===r&&(r=[]);try{if("string"==typeof r&&(r=O(r)),Array.isArray(r)){const a=r.find((e=>!o(e)));void 0===a&&n(r)?S(e,t,r,l.hooks):g(a,(()=>{throw console.log(a),new Error("↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.")}))}else g(r,(()=>{throw new Error("↑ Das Schema für das Property (_options) ist nicht valide. Der Wert wird nicht geändert.")}))}catch(e){a("Known bug: Zeichenkettenliste (string[])")}}))}))},D=e=>{try{return JSON.stringify(e).replace(/"/g,"'")}catch(e){throw new Error("↑ Das JSON konnte nicht in einen String umgewandelt werden. Es wird ein stringifizierbares JSON erwartet.")}},O=e=>{try{return JSON.parse(e)}catch(t){try{return JSON.parse(e.replace(/'/g,'"'))}catch(e){throw new Error("↑ Der JSON-String konnte nicht geparsed werden. Achten Sie darauf, dass einfache Anführungszeichen im Text maskiert werden (&#8216;).")}}},T=e=>"boolean"==typeof e?!0===e?"true":"false":void 0,H=e=>"string"==typeof e?e:T(e),L=(t,o)=>f(t,o||e()),C=(t,o)=>u(t,o||e());let P=null;const A=()=>(P=P||{backgroundColor:"#00000000",color:"#00000000",domNode:e().body,level:"Fail",score:1},P),$=/(\d+, ){3}0\)/,B=(e,t=A())=>{const n=getComputedStyle(e),a=$.test(n.backgroundColor)?t.backgroundColor:d.hex(n.backgroundColor),l=$.test(n.color)?t.color:d.hex(n.color),s=o(a,l),c={backgroundColor:a,color:l,domNode:e,level:i(s),score:s};return s<4.5&&r.error(["Color-Contrast-Error",{backgroundColor:c.backgroundColor,color:c.color,level:c.level,score:c.score},c.domNode]),c},J=(e,t=A())=>{t.domNode instanceof HTMLElement&&(t=B(t.domNode,t));const o=t.domNode.querySelector(e);if(null===o){const o=t.domNode.querySelectorAll('[class="hydrated"]');for(let r=0;r<o.length&&(t.domNode=o[r],null===(t=J(e,t)).domNode);r++);return t}return B(o,t)},K=(e,o=window)=>{e instanceof HTMLElement?(o.scrollTo({behavior:"smooth",top:e.getBoundingClientRect().top+t().pageYOffset-50}),e.focus()):a("Das HTMLElement ist nicht valide, zu dem gescrollt werden soll.")},x=(e,t)=>{if((e instanceof Document||e instanceof HTMLElement||e instanceof ShadowRoot)&&"string"==typeof t){a("Bei der Methode querySelectorAll wurden die Parameter document, selector in selector, document getauscht, da der Parameter selector nicht, allerdings der Parameter document optional sein kann.");const o=`${t}`;t=e,e=o}if("string"==typeof e){const o=L(e,t);o instanceof HTMLElement?K(o):a(`Es konnte kein HTMLElement mit dem Selector (${e}) gefunden werden, zu dem gescrollt werden soll.`)}else a("Der Selector ist nicht valide, zu dem gescrollt werden soll.")};class z{static queryHtmlElementColors(e,t,o=!1,n=!0){let a=null;if(!0===o||!1===z.executionLock)if(!1===o&&(z.cache.clear(),z.cache.set(t.domNode,t),z.executionLock=!0,!0===n&&r.debug("[KoliBriUtils] Color contrast analysis started...")),e===t.domNode)a=t;else{const o=new Set;if(t.domNode.shadowRoot){const e=t.domNode.shadowRoot.children;for(let t=0;t<e.length;t++)o.add(e[t])}const r=t.domNode;if("function"==typeof r.assignedNodes){const e=r.assignedNodes();for(let t=0;t<e.length;t++)e[t]instanceof HTMLElement&&o.add(e[t])}const n=t.domNode.children;for(let e=0;e<n.length;e++)o.add(n[e]);const l=Array.from(o);for(let o=0;o<l.length;o++){let r=z.cache.get(l[o]);void 0===r&&(r=B(l[o],t)),z.cache.set(l[o],r);const n=z.queryHtmlElementColors(e,r,!0,!1);if(null!==n){a=n;break}}}else r.debug("[KoliBriUtils] Call aborted because a color contrast analysis is currently being executed.");return!1===o&&(!0===n&&r.debug(`[KoliBriUtils] Color contrast analysis finished (${z.cache.size} DOM elements are analysed).`),z.executionLock=!1,z.cache.clear()),a}}z.executionLock=!1,z.cache=new Map;class R{}R.keyStore=new class extends n{constructor(){super(...arguments),this.store=new Map}register(e,t){return this.store.set(e,t),this}get(e){if(this.store.has(e))return this.store.get(e);throw new Error(`No value for key '${e}' in KoliBri-Store found.`)}},R.patchTheme=l,R.patchThemeTag=s,R.querySelector=L,R.querySelectorAll=C,R.scrollByHTMLElement=K,R.scrollBySelector=x,R.stringifyJson=D;export{R as K,N as a,M as b,k as c,j as d,w as e,T as f,x as g,z as h,B as i,C as j,L as k,J as l,H as m,D as n,g as o,O as p,d as r,S as s,E as w};