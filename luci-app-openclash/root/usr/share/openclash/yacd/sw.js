var e=Object.defineProperty,t=Object.defineProperties,s=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,i=(t,s,n)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n;try{self["workbox:core:6.2.4"]&&_()}catch(ce){}const c=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class o extends Error{constructor(e,t){super(c(e,t)),this.name=e,this.details=t}}const h=new Set;const l={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[l.prefix,e,l.suffix].filter((e=>e&&e.length>0)).join("-"),d=e=>e||u(l.precache),f=e=>e||u(l.runtime);function p(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}let g;function m(e){e.then((()=>{}))}class w{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function y(e,t){const s=t();return e.waitUntil(s),s}async function b(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new o("cross-origin-copy-response",{origin:s});const n=e.clone(),a={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(a):a,i=function(){if(void 0===g){const t=new Response("");if("body"in t)try{new Response(t.body),g=!0}catch(e){g=!1}g=!1}return g}()?n.body:await n.blob();return new Response(i,r)}let v,R;const C=new WeakMap,x=new WeakMap,E=new WeakMap,L=new WeakMap,q=new WeakMap;let D={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return x.get(e);if("objectStoreNames"===t)return e.objectStoreNames||E.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return T(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function U(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(R||(R=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(N(this),t),T(C.get(this))}:function(...t){return T(e.apply(N(this),t))}:function(t,...s){const n=e.call(N(this),t,...s);return E.set(n,t.sort?t.sort():[t]),T(n)}}function k(e){return"function"==typeof e?U(e):(e instanceof IDBTransaction&&function(e){if(x.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)}));x.set(e,t)}(e),t=e,(v||(v=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,D):e);var t}function T(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(T(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&C.set(t,e)})).catch((()=>{})),q.set(t,e),t}(e);if(L.has(e))return L.get(e);const t=k(e);return t!==e&&(L.set(e,t),q.set(t,e)),t}const N=e=>q.get(e);const I=["get","getKey","getAll","getAllKeys","count"],O=["put","add","delete","clear"],P=new Map;function K(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(P.get(t))return P.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=O.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!I.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return P.set(t,r),r}D=(e=>{return c=((e,t)=>{for(var s in t||(t={}))a.call(t,s)&&i(e,s,t[s]);if(n)for(var s of n(t))r.call(t,s)&&i(e,s,t[s]);return e})({},e),t(c,s({get:(t,s,n)=>K(t,s)||e.get(t,s,n),has:(t,s)=>!!K(t,s)||e.has(t,s)}));var c})(D);try{self["workbox:expiration:6.2.4"]&&_()}catch(ce){}const M=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class S{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(()=>t())),T(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=M(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=await this.getDb();await n.put("cache-entries",s)}async getTimestamp(e){const t=await this.getDb(),s=await t.get("cache-entries",this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction("cache-entries").store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const c of a)await s.delete("cache-entries",c.id),i.push(c.url);return i}_getId(e){return this._cacheName+"|"+M(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),c=T(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(T(i.result),e.oldVersion,e.newVersion,T(i.transaction))})),s&&i.addEventListener("blocked",(()=>s())),c.then((e=>{r&&e.addEventListener("close",(()=>r())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class A{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new S(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,m(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}try{self["workbox:precaching:6.2.4"]&&_()}catch(ce){}function W(e){if(!e)throw new o("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new o("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),a=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:a.href}}class j{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class B{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}try{self["workbox:strategies:6.2.4"]&&_()}catch(ce){}function H(e){return"string"==typeof e?new Request(e):e}class F{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new w,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=H(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(r){if(r instanceof Error)throw new o("plugin-error-request-will-fetch",{thrownErrorMessage:r.message})}const a=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:a,response:e});return e}catch(i){throw n&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:n.clone(),request:a.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=H(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=H(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const a=await this.getCacheKey(s,"write");if(!t)throw new o("cache-put-with-no-response",{url:(r=a.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(t);if(!i)return!1;const{cacheName:c,matchOptions:l}=this._strategy,u=await self.caches.open(c),d=this.hasCallback("cacheDidUpdate"),f=d?await async function(e,t,s,n){const a=p(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const c of i)if(a===p(c.url,s))return e.match(c,n)}(u,a.clone(),["__WB_REVISION__"],l):null;try{await u.put(a,d?i.clone():i)}catch(g){if(g instanceof Error)throw"QuotaExceededError"===g.name&&await async function(){for(const e of h)await e()}(),g}for(const o of this.iterateCallbacks("cacheDidUpdate"))await o({cacheName:c,oldResponse:f,newResponse:i.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=H(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class ${constructor(e={}){this.cacheName=f(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new F(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,t,s){let n;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(n=await this._handle(t,e),!n||"error"===n.type)throw new o("no-response",{url:t.url})}catch(a){if(a instanceof Error)for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:a,event:s,request:t}),n)break;if(!n)throw a}for(const r of e.iterateCallbacks("handlerWillRespond"))n=await r({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(c){c instanceof Error&&(r=c)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class V extends ${constructor(e={}){e.cacheName=d(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(V.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;if(!this._fallbackToNetwork)throw new o("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s=await t.fetch(e),s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!(await t.cachePut(e,s.clone())))throw new o("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==V.copyRedirectedCacheableResponsesPlugin&&(n===V.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(V.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}V.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},V.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await b(e):e};class G{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new V({cacheName:d(e),plugins:[...t,new B({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=W(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new o("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new o("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return y(e,(async()=>{const t=new j;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return y(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new o("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let Q;const J=()=>(Q||(Q=new G),Q);try{self["workbox:routing:6.2.4"]&&_()}catch(ce){}const z=e=>e&&"object"==typeof e?e:{handle:e};class X{constructor(e,t,s="GET"){this.handler=z(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=z(e)}}class Y extends X{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class Z{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(l){o=Promise.reject(l)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:a})}catch(r){r instanceof Error&&(n=r)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,z(e))}setCatchHandler(e){this._catchHandler=z(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new o("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new o("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let ee;function te(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);n=new X((({url:e})=>e.href===a.href),t,s)}else if(e instanceof RegExp)n=new Y(e,t,s);else if("function"==typeof e)n=new X(e,t,s);else{if(!(e instanceof X))throw new o("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return(ee||(ee=new Z,ee.addFetchListener(),ee.addCacheListener()),ee).registerRoute(n),n}class se extends X{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}const ne={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var ae;self.addEventListener("activate",(()=>self.clients.claim())),function(e){J().precache(e)}([{"revision":"b2bd456a64891310deb10c927be5ea95","url":"assets/Chart.min.d34448a4.js"},{"revision":"5656fb82c4cf86206238457046bc9231","url":"assets/Config.58870520.css"},{"revision":"4363ff6a6e59773ca554f7002fcc1287","url":"assets/Config.c5d3bc7b.js"},{"revision":"92be138744eabe0a8c4b2f04b7d7387b","url":"assets/Connections.48138f3b.css"},{"revision":"069765d30baca695088ed5d4241c684c","url":"assets/Connections.ceacb570.js"},{"revision":"43261e1b96999b302a4b89b86c00dfb7","url":"assets/debounce.cc85a806.js"},{"revision":"fee69678629e061e2c62d6e75e96a9ca","url":"assets/en.f1dd5536.js"},{"revision":"331e8eec13ab6d0794a7dd6663a6c979","url":"assets/Fab.44f13fef.css"},{"revision":"23280f37f3f04c99471197e946334af9","url":"assets/Fab.5de705c1.js"},{"revision":"1b3b98ff2664f3885af6beea2e169020","url":"assets/index.28cb98f3.js"},{"revision":"c1ce03efc1bd5e5eda622ccf490d38ea","url":"assets/index.812b4086.js"},{"revision":"ea729be328772281192976e12f5437e9","url":"assets/index.dca06f82.css"},{"revision":"519f87ec3ad04159845a58f1fb6b1723","url":"assets/index.esm.023d01c8.js"},{"revision":"f8ffcce76ce1dacdb9ed8a23b9e0274c","url":"assets/index.f268908c.js"},{"revision":"5a9f52ff7559075924ce129b10c69d6f","url":"assets/Logs.0ac7be6b.css"},{"revision":"ce53a65ae5f0c7533bb2db1288fdcddf","url":"assets/logs.1fac2d96.js"},{"revision":"2765a339cffaffa322c2bb008f31b051","url":"assets/Logs.ec76f608.js"},{"revision":"f7a3e15c8576b9d3ce600021046734ba","url":"assets/Proxies.2542038b.js"},{"revision":"34c3639d5c952f7fc3a522ea64818f82","url":"assets/Proxies.568ae8cd.css"},{"revision":"535bd4976fbd24c7e059039e5a3793da","url":"assets/Rules.a609ca62.css"},{"revision":"dc91e7dd135f4e0fe308d49eb7646c8e","url":"assets/Rules.bb5bcacc.js"},{"revision":"3c9a9f9e324f37be9e74993c024a3ace","url":"assets/Select.55100629.js"},{"revision":"88f80c124258f9d6bf0b3d5a2989647e","url":"assets/Select.9a98fc65.css"},{"revision":"cfb16a402b5a499590669b96923ee796","url":"assets/TextFitler.11aeeb98.js"},{"revision":"dfbf1c0e88b7de8bc7b4304228150053","url":"assets/TextFitler.3d9182a0.css"},{"revision":"e15f79b60ba0e3371dd4dcba8a25d9e7","url":"assets/useRemainingViewPortHeight.c7e29e4e.js"},{"revision":"f266c0b7aa19fc969ff2937c2df034b6","url":"assets/vendor.3b6f54f7.js"},{"revision":"9669beeaf5005a0a62f522a60829f392","url":"assets/zh.247ad8fa.js"},{"revision":"cc02d87b785bf963e3e7acac13008a4c","url":"index.html"},{"revision":"402b66900e731ca748771b6fc5e7a068","url":"registerSW.js"},{"revision":"c0f9cb6aaf647e778bdc01c59944755b","url":"manifest.webmanifest"}]),function(e){const t=J();te(new se(t,e))}(ae);const re=new RegExp("/[^/?]+\\.[^/]+$");var ie;te((({request:e,url:t})=>"navigate"===e.mode&&(!t.pathname.startsWith("/_")&&!t.pathname.match(re))),(ie="index.html",J().createHandlerBoundToURL(ie))),te((({url:e})=>e.origin===self.location.origin&&e.pathname.endsWith(".png")),new class extends ${constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(ne)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch((()=>{}));let n,a=await t.cacheMatch(e);if(a);else try{a=await s}catch(r){r instanceof Error&&(n=r)}if(!a)throw new o("no-response",{url:e.url,error:n});return a}}({cacheName:"images",plugins:[new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);m(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){h.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===f())throw new o("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new A(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}));
