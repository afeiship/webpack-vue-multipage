webpackJsonp([1],[function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var r=n(2),i=o(r),u=n(3),s=o(u),c=n(16),a=o(c);i.default.use(s.default),i.default.config.debug=!0,console.log(a.default),console.log("Auth page vue app initial!"),new i.default({el:"#auth-app",components:{app:a.default}})},,,function(t,e){/*!
	 * vue-resource v0.9.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */
"use strict";function n(t){this.state=et,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(t){e.reject(t)}}function o(t,e){t instanceof ot?this.promise=t:this.promise=new ot(t.bind(e)),this.context=e}function r(t){ut=t.util,it=t.config.debug||!t.config.silent}function i(t){"undefined"!=typeof console&&it&&console.warn("[VueResource warn]: "+t)}function u(t){"undefined"!=typeof console&&console.error(t)}function s(t,e){return ut.nextTick(t,e)}function c(t){return t.replace(/^\s*|\s*$/g,"")}function a(t){return"string"==typeof t}function f(t){return t===!0||t===!1}function p(t){return"function"==typeof t}function l(t){return null!==t&&"object"==typeof t}function h(t){return l(t)&&Object.getPrototypeOf(t)==Object.prototype}function d(t){return"undefined"!=typeof FormData&&t instanceof FormData}function m(t,e,n){var r=o.resolve(t);return arguments.length<2?r:r.then(e,n)}function v(t,e,n){return n=n||{},p(n)&&(n=n.call(e)),b(t.bind({$vm:e,$options:n}),t,{$options:n})}function y(t,e){var n,o;if("number"==typeof t.length)for(n=0;n<t.length;n++)e.call(t[n],t[n],n);else if(l(t))for(o in t)t.hasOwnProperty(o)&&e.call(t[o],t[o],o);return t}function b(t){var e=st.slice.call(arguments,1);return e.forEach(function(e){x(t,e,!0)}),t}function g(t){var e=st.slice.call(arguments,1);return e.forEach(function(e){for(var n in e)void 0===t[n]&&(t[n]=e[n])}),t}function w(t){var e=st.slice.call(arguments,1);return e.forEach(function(e){x(t,e)}),t}function x(t,e,n){for(var o in e)n&&(h(e[o])||ct(e[o]))?(h(e[o])&&!h(t[o])&&(t[o]={}),ct(e[o])&&!ct(t[o])&&(t[o]=[]),x(t[o],e[o],n)):void 0!==e[o]&&(t[o]=e[o])}function T(t,e){var n=e(t);return a(t.root)&&!n.match(/^(https?:)?\//)&&(n=t.root+"/"+n),n}function j(t,e){var n=Object.keys(S.options.params),o={},r=e(t);return y(t.params,function(t,e){n.indexOf(e)===-1&&(o[e]=t)}),o=S.params(o),o&&(r+=(r.indexOf("?")==-1?"?":"&")+o),r}function E(t,e,n){var o=O(t),r=o.expand(e);return n&&n.push.apply(n,o.vars),r}function O(t){var e=["+","#",".","/",";","?","&"],n=[];return{vars:n,expand:function(o){return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(t,r,i){if(r){var u=null,s=[];if(e.indexOf(r.charAt(0))!==-1&&(u=r.charAt(0),r=r.substr(1)),r.split(/,/g).forEach(function(t){var e=/([^:\*]*)(?::(\d+)|(\*))?/.exec(t);s.push.apply(s,P(o,u,e[1],e[2]||e[3])),n.push(e[1])}),u&&"+"!==u){var c=",";return"?"===u?c="&":"#"!==u&&(c=u),(0!==s.length?u:"")+s.join(c)}return s.join(",")}return A(i)})}}}function P(t,e,n,o){var r=t[n],i=[];if(C(r)&&""!==r)if("string"==typeof r||"number"==typeof r||"boolean"==typeof r)r=r.toString(),o&&"*"!==o&&(r=r.substring(0,parseInt(o,10))),i.push(U(e,r,$(e)?n:null));else if("*"===o)Array.isArray(r)?r.filter(C).forEach(function(t){i.push(U(e,t,$(e)?n:null))}):Object.keys(r).forEach(function(t){C(r[t])&&i.push(U(e,r[t],t))});else{var u=[];Array.isArray(r)?r.filter(C).forEach(function(t){u.push(U(e,t))}):Object.keys(r).forEach(function(t){C(r[t])&&(u.push(encodeURIComponent(t)),u.push(U(e,r[t].toString())))}),$(e)?i.push(encodeURIComponent(n)+"="+u.join(",")):0!==u.length&&i.push(u.join(","))}else";"===e?i.push(encodeURIComponent(n)):""!==r||"&"!==e&&"?"!==e?""===r&&i.push(""):i.push(encodeURIComponent(n)+"=");return i}function C(t){return void 0!==t&&null!==t}function $(t){return";"===t||"&"===t||"?"===t}function U(t,e,n){return e="+"===t||"#"===t?A(e):encodeURIComponent(e),n?encodeURIComponent(n)+"="+e:e}function A(t){return t.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t)),t}).join("")}function R(t){var e=[],n=E(t.url,t.params,e);return e.forEach(function(e){delete t.params[e]}),n}function S(t,e){var n,o=this||{},r=t;return a(t)&&(r={url:t,params:e}),r=b({},S.options,o.$options,r),S.transforms.forEach(function(t){n=_(t,n,o.$vm)}),n(r)}function _(t,e,n){return function(o){return t.call(n,o,e)}}function M(t,e,n){var o,r=ct(e),i=h(e);y(e,function(e,u){o=l(e)||ct(e),n&&(u=n+"["+(i||o?u:"")+"]"),!n&&r?t.add(e.name,e.value):o?M(t,e,u):t.add(u,e)})}function k(t){return new o(function(e){var n=new XDomainRequest,o=function(o){var r=t.respondWith(n.responseText,{status:n.status,statusText:n.statusText});e(r)};t.abort=function(){return n.abort()},n.open(t.method,t.getUrl(),!0),n.timeout=0,n.onload=o,n.onerror=o,n.ontimeout=function(){},n.onprogress=function(){},n.send(t.getBody())})}function I(t,e){!f(t.crossOrigin)&&H(t)&&(t.crossOrigin=!0),t.crossOrigin&&(ht||(t.client=k),delete t.emulateHTTP),e()}function H(t){var e=S.parse(S(t));return e.protocol!==lt.protocol||e.host!==lt.host}function L(t,e){t.emulateJSON&&h(t.body)&&(t.body=S.params(t.body),t.headers["Content-Type"]="application/x-www-form-urlencoded"),d(t.body)&&delete t.headers["Content-Type"],h(t.body)&&(t.body=JSON.stringify(t.body)),e(function(t){var e=t.headers["Content-Type"];if(a(e)&&0===e.indexOf("application/json"))try{t.data=t.json()}catch(e){t.data=null}else t.data=t.text()})}function q(t){return new o(function(e){var n,o,r=t.jsonp||"callback",i="_jsonp"+Math.random().toString(36).substr(2),u=null;n=function(n){var r=0;"load"===n.type&&null!==u?r=200:"error"===n.type&&(r=404),e(t.respondWith(u,{status:r})),delete window[i],document.body.removeChild(o)},t.params[r]=i,window[i]=function(t){u=JSON.stringify(t)},o=document.createElement("script"),o.src=t.getUrl(),o.type="text/javascript",o.async=!0,o.onload=n,o.onerror=n,document.body.appendChild(o)})}function J(t,e){"JSONP"==t.method&&(t.client=q),e(function(e){"JSONP"==t.method&&(e.data=e.json())})}function N(t,e){p(t.before)&&t.before.call(this,t),e()}function D(t,e){t.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(t.method)&&(t.headers["X-HTTP-Method-Override"]=t.method,t.method="POST"),e()}function X(t,e){t.method=t.method.toUpperCase(),t.headers=at({},z.headers.common,t.crossOrigin?{}:z.headers.custom,z.headers[t.method.toLowerCase()],t.headers),e()}function W(t,e){var n;t.timeout&&(n=setTimeout(function(){t.abort()},t.timeout)),e(function(t){clearTimeout(n)})}function B(t){return new o(function(e){var n=new XMLHttpRequest,o=function(o){var r=t.respondWith("response"in n?n.response:n.responseText,{status:1223===n.status?204:n.status,statusText:1223===n.status?"No Content":c(n.statusText),headers:F(n.getAllResponseHeaders())});e(r)};t.abort=function(){return n.abort()},n.open(t.method,t.getUrl(),!0),n.timeout=0,n.onload=o,n.onerror=o,t.progress&&("GET"===t.method?n.addEventListener("progress",t.progress):/^(POST|PUT)$/i.test(t.method)&&n.upload.addEventListener("progress",t.progress)),t.credentials===!0&&(n.withCredentials=!0),y(t.headers||{},function(t,e){n.setRequestHeader(e,t)}),n.send(t.getBody())})}function F(t){var e,n,o,r={};return y(c(t).split("\n"),function(t){o=t.indexOf(":"),n=c(t.slice(0,o)),e=c(t.slice(o+1)),r[n]?ct(r[n])?r[n].push(e):r[n]=[r[n],e]:r[n]=e}),r}function G(t){function e(e){return new o(function(o){function s(){n=r.pop(),p(n)?n.call(t,e,c):(i("Invalid interceptor of type "+typeof n+", must be a function"),c())}function c(e){if(p(e))u.unshift(e);else if(l(e))return u.forEach(function(n){e=m(e,function(e){return n.call(t,e)||e})}),void m(e,o);s()}s()},t)}var n,r=[V],u=[];return l(t)||(t=null),e.use=function(t){r.push(t)},e}function V(t,e){var n=t.client||B;e(n(t))}function z(t){var e=this||{},n=G(e.$vm);return g(t||{},e.$options,z.options),z.interceptors.forEach(function(t){n.use(t)}),n(new vt(t)).then(function(t){return t.ok?t:o.reject(t)},function(t){return t instanceof Error&&u(t),o.reject(t)})}function K(t,e,n,o){var r=this||{},i={};return n=at({},K.actions,n),y(n,function(n,u){n=b({url:t,params:e||{}},o,n),i[u]=function(){return(r.$http||z)(Q(n,arguments))}}),i}function Q(t,e){var n,o=at({},t),r={};switch(e.length){case 2:r=e[0],n=e[1];break;case 1:/^(POST|PUT|PATCH)$/i.test(o.method)?n=e[0]:r=e[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, body], got "+e.length+" arguments"}return o.body=n,o.params=at({},o.params,r),o}function Y(t){Y.installed||(r(t),t.url=S,t.http=z,t.resource=K,t.Promise=o,Object.defineProperties(t.prototype,{$url:{get:function(){return v(t.url,this,this.$options.url)}},$http:{get:function(){return v(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}},$promise:{get:function(){var e=this;return function(n){return new t.Promise(n,e)}}}}))}var Z=0,tt=1,et=2;n.reject=function(t){return new n(function(e,n){n(t)})},n.resolve=function(t){return new n(function(e,n){e(t)})},n.all=function(t){return new n(function(e,o){function r(n){return function(o){u[n]=o,i+=1,i===t.length&&e(u)}}var i=0,u=[];0===t.length&&e(u);for(var s=0;s<t.length;s+=1)n.resolve(t[s]).then(r(s),o)})},n.race=function(t){return new n(function(e,o){for(var r=0;r<t.length;r+=1)n.resolve(t[r]).then(e,o)})};var nt=n.prototype;nt.resolve=function(t){var e=this;if(e.state===et){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var o=t&&t.then;if(null!==t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(t){return void(n||e.reject(t))}e.state=Z,e.value=t,e.notify()}},nt.reject=function(t){var e=this;if(e.state===et){if(t===e)throw new TypeError("Promise settled with itself.");e.state=tt,e.value=t,e.notify()}},nt.notify=function(){var t=this;s(function(){if(t.state!==et)for(;t.deferred.length;){var e=t.deferred.shift(),n=e[0],o=e[1],r=e[2],i=e[3];try{t.state===Z?r("function"==typeof n?n.call(void 0,t.value):t.value):t.state===tt&&("function"==typeof o?r(o.call(void 0,t.value)):i(t.value))}catch(t){i(t)}}})},nt.then=function(t,e){var o=this;return new n(function(n,r){o.deferred.push([t,e,n,r]),o.notify()})},nt.catch=function(t){return this.then(void 0,t)};var ot=window.Promise||n;o.all=function(t,e){return new o(ot.all(t),e)},o.resolve=function(t,e){return new o(ot.resolve(t),e)},o.reject=function(t,e){return new o(ot.reject(t),e)},o.race=function(t,e){return new o(ot.race(t),e)};var rt=o.prototype;rt.bind=function(t){return this.context=t,this},rt.then=function(t,e){return t&&t.bind&&this.context&&(t=t.bind(this.context)),e&&e.bind&&this.context&&(e=e.bind(this.context)),new o(this.promise.then(t,e),this.context)},rt.catch=function(t){return t&&t.bind&&this.context&&(t=t.bind(this.context)),new o(this.promise.catch(t),this.context)},rt.finally=function(t){return this.then(function(e){return t.call(this),e},function(e){return t.call(this),ot.reject(e)})};var it=!1,ut={},st=[],ct=Array.isArray,at=Object.assign||w,ft=document.documentMode,pt=document.createElement("a");S.options={url:"",root:null,params:{}},S.transforms=[R,j,T],S.params=function(t){var e=[],n=encodeURIComponent;return e.add=function(t,e){p(e)&&(e=e()),null===e&&(e=""),this.push(n(t)+"="+n(e))},M(e,t),e.join("&").replace(/%20/g,"+")},S.parse=function(t){return ft&&(pt.href=t,t=pt.href),pt.href=t,{href:pt.href,protocol:pt.protocol?pt.protocol.replace(/:$/,""):"",port:pt.port,host:pt.host,hostname:pt.hostname,pathname:"/"===pt.pathname.charAt(0)?pt.pathname:"/"+pt.pathname,search:pt.search?pt.search.replace(/^\?/,""):"",hash:pt.hash?pt.hash.replace(/^#/,""):""}};var lt=S.parse(location.href),ht="withCredentials"in new XMLHttpRequest,dt=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},mt=function(){function t(e,n){var o=n.url,r=n.headers,i=n.status,u=n.statusText;dt(this,t),this.url=o,this.body=e,this.headers=r||{},this.status=i||0,this.statusText=u||"",this.ok=i>=200&&i<300}return t.prototype.text=function(){return this.body},t.prototype.blob=function(){return new Blob([this.body])},t.prototype.json=function(){return JSON.parse(this.body)},t}(),vt=function(){function t(e){dt(this,t),this.method="GET",this.body=null,this.params={},this.headers={},at(this,e)}return t.prototype.getUrl=function(){return S(this)},t.prototype.getBody=function(){return this.body},t.prototype.respondWith=function(t,e){return new mt(t,at(e||{},{url:this.getUrl()}))},t}(),yt={"X-Requested-With":"XMLHttpRequest"},bt={Accept:"application/json, text/plain, */*"},gt={"Content-Type":"application/json;charset=utf-8"};z.options={},z.headers={put:gt,post:gt,patch:gt,delete:gt,custom:yt,common:bt},z.interceptors=[N,W,D,L,J,X,I],["get","delete","head","jsonp"].forEach(function(t){z[t]=function(e,n){return this(at(n||{},{url:e,method:t}))}}),["post","put","patch"].forEach(function(t){z[t]=function(e,n,o){return this(at(o||{},{url:e,method:t,body:n}))}}),K.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},delete:{method:"DELETE"}},"undefined"!=typeof window&&window.Vue&&window.Vue.use(Y),t.exports=Y},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{}},computed:{},ready:function(){},attached:function(){},methods:{},components:{}}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(15),i=o(r);e.default={data:function(){return{}},computed:{},ready:function(){},attached:function(){},methods:{},components:{list:i.default}}},,,function(t,e){},function(t,e){},,,function(t,e){t.exports=" <section class=list> I am list vue; </section> "},function(t,e){t.exports=" Auth views app start! <br> Test by fei auto load!!! <br> Test again!!!--afei!!!xxx <br> Very cool! <list></list> "},,function(t,e,n){var o,r;n(9),o=n(4),r=n(12),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports.default),r&&(("function"==typeof t.exports?t.exports.options:t.exports).template=r)},function(t,e,n){var o,r;n(8),o=n(5),r=n(13),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports.default),r&&(("function"==typeof t.exports?t.exports.options:t.exports).template=r)}]);