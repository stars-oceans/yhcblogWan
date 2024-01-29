import{_ as s,c as a,o as i,V as e}from"./chunks/framework.WW8f2_VW.js";const E=JSON.parse('{"title":"vue3 侦听路由的 route.params.id 的变化","description":"vue3 侦听路由的 route.params.id 的变化","frontmatter":{"post":true,"title":"vue3 侦听路由的 route.params.id 的变化","date":"2024-01-26T00:00:00.000Z","cover":"https://i.postimg.cc/hvbmkVps/Vue-for-React-Devs-Similarities.jpg","coveross":"https://i.postimg.cc/hvbmkVps/Vue-for-React-Devs-Similarities.jpg","categories":["Vue"],"tags":["路由","侦听","vue3"],"description":"vue3 侦听路由的 route.params.id 的变化"},"headers":[],"relativePath":"posts/2024/01/8.Vue3 侦听路由的 route.params.id 的变化 .md","filePath":"posts/2024/01/8.Vue3 侦听路由的 route.params.id 的变化 .md"}'),t={name:"posts/2024/01/8.Vue3 侦听路由的 route.params.id 的变化 .md"},r=e('<h1 id="vue" tabindex="-1">Vue <a class="header-anchor" href="#vue" aria-label="Permalink to &quot;Vue&quot;">​</a></h1><p>在Vue 3中，可以使用<code>watch</code>函数来监听路由地址的变化。首先，你需要使用<code>useRoute</code>函数从<code>vue-router</code>中获取<code>route</code>对象。然后，使用<code>watch</code>函数来观察<code>route</code>对象中的<code>params</code>属性的变化。下面是一个示例：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { watch, useRoute } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue-router&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> route</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    watch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> route.params, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">newParams</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">oldParams</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 监听$route.params的变化</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;路由参数已更改&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;新的参数:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, newParams.id);</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;旧的参数:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, oldParams.id);</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 执行其他逻辑...</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    });</span></span></code></pre></div><p>在上面的示例中，我们使用<code>watch</code>函数来观察<code>route.params</code>的变化。<code>route.params</code>对象包含当前路由的参数，例如<code>{ id: 1 }</code>。当<code>route.params</code>发生变化时，回调函数将被触发，你可以在其中执行你需要的逻辑。</p><p>注意：上述示例假设你已经安装并配置了Vue Router 4，并在适当的位置引入和使用了<code>useRoute</code>函数。</p><h1 id="为什么侦听的是-route-params" tabindex="-1">为什么侦听的是 () =&gt; route.params <a class="header-anchor" href="#为什么侦听的是-route-params" aria-label="Permalink to &quot;为什么侦听的是 () =&gt; route.params&quot;">​</a></h1><p>在Vue 3中，<code>watch</code>函数接受两个参数：一个侦听的源（source）和一个回调函数（callback）。源可以是一个响应式对象、一个计算属性、一个ref对象或一个函数，用于返回一个响应式对象。</p><h4 id="在这种情况下-我们想要侦听的是-route-params对象的变化。然而-route-params本身是一个对象-而不是一个响应式对象。如果我们直接将-route-params作为源传递给watch函数-它将无法侦听到其中属性的变化。" tabindex="-1">在这种情况下，我们想要侦听的是<code>$route.params</code>对象的变化。然而，<code>$route.params</code>本身是一个对象，而不是一个响应式对象。如果我们直接将<code>$route.params</code>作为源传递给<code>watch</code>函数，它将无法侦听到其中属性的变化。 <a class="header-anchor" href="#在这种情况下-我们想要侦听的是-route-params对象的变化。然而-route-params本身是一个对象-而不是一个响应式对象。如果我们直接将-route-params作为源传递给watch函数-它将无法侦听到其中属性的变化。" aria-label="Permalink to &quot;在这种情况下，我们想要侦听的是`$route.params`对象的变化。然而，`$route.params`本身是一个对象，而不是一个响应式对象。如果我们直接将`$route.params`作为源传递给`watch`函数，它将无法侦听到其中属性的变化。&quot;">​</a></h4><h4 id="为了解决这个问题-我们可以传递一个函数作为源-并在函数体内返回-route-params对象。这样-每当-route-params对象发生变化时-函数都会重新执行-并将新值作为侦听的源。这样-watch函数就能正确侦听到-route-params的变化了。" tabindex="-1">为了解决这个问题，我们可以传递一个函数作为源，并在函数体内返回<code>$route.params</code>对象。这样，每当<code>$route.params</code>对象发生变化时，函数都会重新执行，并将新值作为侦听的源。这样，<code>watch</code>函数就能正确侦听到<code>$route.params</code>的变化了。 <a class="header-anchor" href="#为了解决这个问题-我们可以传递一个函数作为源-并在函数体内返回-route-params对象。这样-每当-route-params对象发生变化时-函数都会重新执行-并将新值作为侦听的源。这样-watch函数就能正确侦听到-route-params的变化了。" aria-label="Permalink to &quot;为了解决这个问题，我们可以传递一个函数作为源，并在函数体内返回`$route.params`对象。这样，每当`$route.params`对象发生变化时，函数都会重新执行，并将新值作为侦听的源。这样，`watch`函数就能正确侦听到`$route.params`的变化了。&quot;">​</a></h4><p>因此，<code>() =&gt; route.params</code>是一个函数，用于返回<code>$route.params</code>对象作为侦听的源。这样做可以确保<code>watch</code>函数能够侦听到<code>$route.params</code>对象内部属性的变化。</p>',10),p=[r];function o(h,n,l,d,c,k){return i(),a("div",null,p)}const m=s(t,[["render",o]]);export{E as __pageData,m as default};
