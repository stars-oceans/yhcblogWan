import{_ as s,c as a,o as n,V as p}from"./chunks/framework.WW8f2_VW.js";const b=JSON.parse('{"title":"性能优化2 篇章","description":"性能优化2 篇章","frontmatter":{"post":true,"title":"性能优化2 篇章","date":"2023-12-26T00:00:00.000Z","cover":"https://i.postimg.cc/6pXSVxGw/cloud-vps04.jpg","coveross":"https://i.postimg.cc/6pXSVxGw/cloud-vps04.jpg","categories":["资料"],"tags":["资料"],"description":"性能优化2 篇章"},"headers":[],"relativePath":"posts/2023/12/14.性能优化2.md","filePath":"posts/2023/12/14.性能优化2.md"}'),e={name:"posts/2023/12/14.性能优化2.md"},l=p(`<h1 id="_14-性能优化2" tabindex="-1">14.性能优化2 <a class="header-anchor" href="#_14-性能优化2" aria-label="Permalink to &quot;14.性能优化2&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>Vue 框架通过数据双向绑定和虚拟 DOM 技术，帮我们处理了前端开发中最脏最累的 DOM 操作部分， 我们不再需要去考虑如何操作 DOM 以及如何最高效地操作 DOM；但 Vue 项目中仍然存在项目首屏优化、Webpack 编译配置优化等问题，所以我们仍然需要去关注 Vue 项目性能方面的优化，使项目具有更高效的性能、更好的用户体验。本文是作者通过实际项目的优化实践进行总结而来，希望读者读完本文，有一定的启发思考，从而对自己的项目进行优化起到帮助。本文内容分为以下三部分组成：</p><p>Vue 代码层面的优化；</p><p>webpack 配置层面的优化；</p><p>基础的 Web 技术层面的优化。</p><h2 id="一、代码层面的优化" tabindex="-1">一、代码层面的优化 <a class="header-anchor" href="#一、代码层面的优化" aria-label="Permalink to &quot;一、代码层面的优化&quot;">​</a></h2><p><strong>1.1、v-if 和 v-show 区分使用场景</strong></p><p>v-if 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。</p><p>v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。</p><p>所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。</p><p><strong>1.2、computed 和 watch 区分使用场景</strong></p><p>computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；</p><p>watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；</p><p>运用场景：</p><p>当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；</p><p>当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。</p><p><strong>1.3、v-for 遍历必须为 item 添加 key，且避免同时使用 v-if</strong></p><p>（1）v-for 遍历必须为 item 添加 key</p><p>在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 。</p><p>（2）v-for 遍历避免同时使用 v-if</p><p>v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性。</p><p>推荐：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in activeUsers&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>    {{ user.name }}</span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span>
<span class="line"><span>computed: {</span></span>
<span class="line"><span>  activeUsers: function () {</span></span>
<span class="line"><span>    return this.users.filter(function (user) {</span></span>
<span class="line"><span>   return user.isActive</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>不推荐：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in users&quot;</span></span>
<span class="line"><span>    v-if=&quot;user.isActive&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>    {{ user.name }}</span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre></div><p><strong>1.4、长列表性能优化</strong></p><p>Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  data: () =&gt; ({</span></span>
<span class="line"><span>    users: {}</span></span>
<span class="line"><span>  }),</span></span>
<span class="line"><span>  async created() {</span></span>
<span class="line"><span>    const users = await axios.get(&quot;/api/users&quot;);</span></span>
<span class="line"><span>    this.users = Object.freeze(users);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p><strong>1.5、事件的销毁</strong></p><p>Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。如果在 js 内</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>created() {</span></span>
<span class="line"><span>  addEventListener(&#39;click&#39;, this.click, false)</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>beforeDestroy() {</span></span>
<span class="line"><span>  removeEventListener(&#39;click&#39;, this.click, false)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>1.6、图片资源懒加载</strong></p><p>对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 vue-lazyload 插件：</p><p>（1）安装插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>npm install vue-lazyload --save-dev</span></span></code></pre></div><p>（2）在入口文件 man.js 中引入并使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>import VueLazyload from &#39;vue-lazyload&#39;</span></span></code></pre></div><p>然后再 vue 中直接使用</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>Vue.use(VueLazyload)</span></span></code></pre></div><p>或者添加自定义选项</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>Vue.use(VueLazyload, {</span></span>
<span class="line"><span>preLoad: 1.3,</span></span>
<span class="line"><span>error: &#39;dist/error.png&#39;,</span></span>
<span class="line"><span>loading: &#39;dist/loading.gif&#39;,</span></span>
<span class="line"><span>attempt: 1</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>（3）在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示：</p><p>[<img src="" alt="img" data-fancybox="gallery">](<a href="https://blog.xiaoadai.com/2022/08/25/14" target="_blank" rel="noreferrer">https://blog.xiaoadai.com/2022/08/25/14</a> vue项目的性能优化/)以上为 vue-lazyload 插件的简单使用，如果要看插件的更多参数选项，可以查看 vue-lazyload 的 github 地址。</p><p><strong>1.7、路由懒加载</strong> Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。</p><p>路由懒加载：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>const Foo = () =&gt; import(&#39;./Foo.vue&#39;)</span></span>
<span class="line"><span>const router = new VueRouter({</span></span>
<span class="line"><span>  routes: [</span></span>
<span class="line"><span>    { path: &#39;/foo&#39;, component: Foo }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>})</span></span></code></pre></div><p><strong>1.8、第三方插件的按需引入</strong></p><p>我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 babel-plugin-component ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 element-ui 组件库为例：</p><p>（1）首先，安装 babel-plugin-component ：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>npm install babel-plugin-component -D</span></span></code></pre></div><p>（2）然后，将 .babelrc 修改为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [[&quot;es2015&quot;, { &quot;modules&quot;: false }]],</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>      &quot;component&quot;,</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;libraryName&quot;: &quot;element-ui&quot;,</span></span>
<span class="line"><span>        &quot;styleLibraryName&quot;: &quot;theme-chalk&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>（3）在 main.js 中引入部分组件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import { Button, Select } from &#39;element-ui&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> Vue.use(Button)</span></span>
<span class="line"><span> Vue.use(Select)</span></span></code></pre></div><p><strong>1.9、优化无限列表性能</strong></p><p>如果你的应用存在非常长或者无限滚动的列表，那么需要采用 窗口化 的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间。你可以参考以下开源项目 vue-virtual-scroll-list 和 vue-virtual-scroller 来优化这种无限列表的场景的。</p><p><strong>1.10、服务端渲染 SSR or 预渲染</strong></p><p>服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。</p><p>（1）服务端渲染的优点：</p><p>更好的 SEO：因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；</p><p>更快的内容到达时间（首屏加载更快）：SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；</p><p>（2）服务端渲染的缺点：</p><p>更多的开发条件限制：例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；</p><p>更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。</p><p>如果你的项目的 SEO 和 首屏渲染是评价项目的关键指标，那么你的项目就需要服务端渲染来帮助你实现最佳的初始加载性能和 SEO，具体的 Vue SSR 如何实现，可以参考作者的另一篇文章《Vue SSR 踩坑之旅》。如果你的 Vue 项目只需改善少数营销页面（例如 /， /about， /contact 等）的 SEO，那么你可能需要预渲染，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点，具体你可以使用 prerender-spa-plugin 就可以轻松地添加预渲染 。</p><h2 id="二、webpack-层面的优化" tabindex="-1">二、Webpack 层面的优化 <a class="header-anchor" href="#二、webpack-层面的优化" aria-label="Permalink to &quot;二、Webpack 层面的优化&quot;">​</a></h2><p><strong>2.1、Webpack 对图片进行压缩</strong></p><p>在 vue 项目中除了可以在 webpack.base.conf.js 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式，其余的不做操作。所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 image-webpack-loader来压缩图片：</p><p>（1）首先，安装 image-webpack-loader ：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>npm install image-webpack-loader --save-dev</span></span></code></pre></div><p>（2）然后，在 webpack.base.conf.js 中进行配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  test: /\\.(png|jpe?g|gif|svg)(\\?.*)?$/,</span></span>
<span class="line"><span>  use:[</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>    loader: &#39;url-loader&#39;,</span></span>
<span class="line"><span>    options: {</span></span>
<span class="line"><span>      limit: 10000,</span></span>
<span class="line"><span>      name: utils.assetsPath(&#39;img/[name].[hash:7].[ext]&#39;)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      loader: &#39;image-webpack-loader&#39;,</span></span>
<span class="line"><span>      options: {</span></span>
<span class="line"><span>        bypassOnDebug: true,</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2.2、减少 ES6 转为 ES5 的冗余代码 Babel 插件会在将 ES6 代码转换成 ES5 代码时会注入一些辅助函数，例如下面的 ES6 代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>class HelloWebpack extends Component{...}</span></span></code></pre></div><p>这段代码再被转换成能正常运行的 ES5 代码时需要以下两个辅助函数：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>babel-runtime/helpers/createClass  // 用于实现 class 语法</span></span>
<span class="line"><span>babel-runtime/helpers/inherits  // 用于实现 extends 语法</span></span></code></pre></div><p>在默认情况下， Babel 会在每个输出文件中内嵌这些依赖的辅助函数代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会出现很多次，造成代码冗余。为了不让这些辅助函数的代码重复出现，可以在依赖它们时通过 require(‘babel-runtime/helpers/createClass’) 的方式导入，这样就能做到只让它们出现一次。babel-plugin-transform-runtime 插件就是用来实现这个作用的，将相关辅助函数进行替换成导入语句，从而减小 babel 编译出来的代码的文件大小。</p><p>（1）首先，安装 babel-plugin-transform-runtime ：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>npm install babel-plugin-transform-runtime --save-dev</span></span></code></pre></div><p>（2）然后，修改 .babelrc 配置文件为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>&quot;plugins&quot;: [</span></span>
<span class="line"><span>    &quot;transform-runtime&quot;</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>如果要看插件的更多详细内容，可以查看babel-plugin-transform-runtime 的 详细介绍。</p><p><strong>2.3、提取公共代码</strong></p><p>如果项目中没有去将每个页面的第三方库和公共模块提取出来，则项目会存在以下问题：</p><p>相同的资源被重复加载，浪费用户的流量和服务器的成本。</p><p>每个页面需要加载的资源太大，导致网页首屏加载缓慢，影响用户体验。</p><p>所以我们需要将多个页面的公共代码抽离成单独的文件，来优化以上问题 。Webpack 内置了专门用于提取多个Chunk 中的公共部分的插件 CommonsChunkPlugin，我们在项目中 CommonsChunkPlugin 的配置如下：</p><p>// 所有在 package.json 里面依赖的包，都会被打包进 vendor.js 这个文件中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>  name: &#39;vendor&#39;,</span></span>
<span class="line"><span>  minChunks: function(module, count) {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      module.resource &amp;&amp;</span></span>
<span class="line"><span>      /\\.js$/.test(module.resource) &amp;&amp;</span></span>
<span class="line"><span>      module.resource.indexOf(</span></span>
<span class="line"><span>        path.join(__dirname, &#39;../node_modules&#39;)</span></span>
<span class="line"><span>      ) === 0</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}),</span></span>
<span class="line"><span>// 抽取出代码模块的映射关系</span></span>
<span class="line"><span>new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>  name: &#39;manifest&#39;,</span></span>
<span class="line"><span>  chunks: [&#39;vendor&#39;]</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>如果要看插件的更多详细内容，可以查看 CommonsChunkPlugin 的 详细介绍。</p><p><strong>2.4、模板预编译</strong></p><p>当使用 DOM 内模板或 JavaScript 内的字符串模板时，模板会在运行时被编译为渲染函数。通常情况下这个过程已经足够快了，但对性能敏感的应用还是最好避免这种用法。</p><p>预编译模板最简单的方式就是使用单文件组件——相关的构建设置会自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串。</p><p>如果你使用 webpack，并且喜欢分离 JavaScript 和模板文件，你可以使用 vue-template-loader，它也可以在构建过程中把模板文件转换成为 JavaScript 渲染函数。</p><p><strong>2.5、提取组件的 CSS</strong></p><p>当使用单文件组件时，组件内的 CSS 会以 style 标签的方式通过 JavaScript 动态注入。这有一些小小的运行时开销，如果你使用服务端渲染，这会导致一段 “无样式内容闪烁 (fouc) ” 。将所有组件的 CSS 提取到同一个文件可以避免这个问题，也会让 CSS 更好地进行压缩和缓存。</p><p>查阅这个构建工具各自的文档来了解更多：</p><p>webpack + vue-loader ( vue-cli 的 webpack 模板已经预先配置好)</p><p>Browserify + vueify</p><p>Rollup + rollup-plugin-vue</p><p><strong>2.6、优化 SourceMap</strong></p><p>我们在项目进行打包后，会将开发中的多个文件代码打包到一个文件中，并且经过压缩、去掉多余的空格、babel编译化后，最终将编译得到的代码会用于线上环境，那么这样处理后的代码和源代码会有很大的差别，当有 bug的时候，我们只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，对于开发来说不好调式定位问题，因此 sourceMap 出现了，它就是为了解决不好调式代码问题的。</p><p>SourceMap 的可选值如下（+ 号越多，代表速度越快，- 号越多，代表速度越慢, o 代表中等速度 ）</p><p>开发环境推荐：cheap-module-eval-source-map</p><p>生产环境推荐：cheap-module-source-map</p><p>原因如下：</p><p>cheap：源代码中的列信息是没有任何作用，因此我们打包后的文件不希望包含列相关信息，只有行信息能建立打包前后的依赖关系。因此不管是开发环境或生产环境，我们都希望添加 cheap 的基本类型来忽略打包前后的列信息；</p><p>module ：不管是开发环境还是正式环境，我们都希望能定位到bug的源代码具体的位置，比如说某个 Vue 文件报错了，我们希望能定位到具体的 Vue 文件，因此我们也需要 module 配置；</p><p>soure-map ：source-map 会为每一个打包后的模块生成独立的 soucemap 文件 ，因此我们需要增加source-map 属性；</p><p>eval-source-map：eval 打包代码的速度非常快，因为它不生成 map 文件，但是可以对 eval 组合使用 eval-source-map 使用会将 map 文件以 DataURL 的形式存在打包后的 js 文件中。在正式环境中不要使用 eval-source-map, 因为它会增加文件的大小，但是在开发环境中，可以试用下，因为他们打包的速度很快。</p><p><strong>2.7、构建结果输出分析</strong></p><p>Webpack 输出的代码可读性非常差而且文件非常大，让我们非常头疼。为了更简单、直观地分析输出结果，社区中出现了许多可视化分析工具。这些工具以图形的方式将结果更直观地展示出来，让我们快速了解问题所在。接下来讲解我们在 Vue 项目中用到的分析工具：webpack-bundle-analyzer 。</p><p>我们在项目中 webpack.prod.conf.js 进行配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>if (config.build.bundleAnalyzerReport) {</span></span>
<span class="line"><span>  var BundleAnalyzerPlugin =   require(&#39;webpack-bundle-analyzer&#39;).BundleAnalyzerPlugin;</span></span>
<span class="line"><span>  webpackConfig.plugins.push(new BundleAnalyzerPlugin());</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>执行 $ npm run build –report 后生成分析报告如下：</p><p><strong>2.8、Vue 项目的编译优化</strong></p><p>如果你的 Vue 项目使用 Webpack 编译，需要你喝一杯咖啡的时间，那么也许你需要对项目的 Webpack 配置进行优化，提高 Webpack 的构建效率。具体如何进行 Vue 项目的 Webpack 构建优化，可以参考作者的另一篇文章《 Vue 项目 Webpack 优化实践》</p><h2 id="三、基础的-web-技术优化" tabindex="-1">三、基础的 Web 技术优化 <a class="header-anchor" href="#三、基础的-web-技术优化" aria-label="Permalink to &quot;三、基础的 Web 技术优化&quot;">​</a></h2><p><strong>3.1、开启 gzip 压缩</strong></p><p>gzip 是 GNUzip 的缩写，最早用于 UNIX 系统的文件压缩。HTTP 协议上的 gzip 编码是一种用来改进 web 应用程序性能的技术，web 服务器和客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome，firefox，IE等都支持该协议。常见的服务器如 Apache，Nginx，IIS 同样支持，gzip 压缩效率非常高，通常可以达到 70% 的压缩率，也就是说，如果你的网页有 30K，压缩之后就变成了 9K 左右</p><p>以下我们以服务端使用我们熟悉的 express 为例，开启 gzip 非常简单，相关步骤如下：</p><p>安装：</p><p>npm install compression –save 添加代码逻辑：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>CODE</span></span>
<span class="line"><span>var compression = require(&#39;compression&#39;);</span></span>
<span class="line"><span>var app = express();</span></span>
<span class="line"><span>app.use(compression())</span></span></code></pre></div><p>重启服务，观察网络面板里面的 response header，如果看到如下红圈里的字段则表明 gzip 开启成功 ：</p><p><strong>3.2、浏览器缓存</strong></p><p>为了提高用户加载页面的速度，对静态资源进行缓存是非常必要的，根据是否需要重新向服务器发起请求来分类，将 HTTP 缓存规则分为两大类（强制缓存，对比缓存），如果对缓存机制还不是了解很清楚的，可以参考作者写的关于 HTTP 缓存的文章《深入理解HTTP缓存机制及原理》，这里不再赘述。</p><p><strong>3.3、CDN 的使用</strong></p><p>浏览器从服务器上下载 CSS、js 和图片等文件时都要和服务器连接，而大部分服务器的带宽有限，如果超过限制，网页就半天反应不过来。而 CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN 具有更好的可用性，更低的网络延迟和丢包率 。</p><p><strong>3.4、使用 Chrome Performance 查找性能瓶颈</strong></p><p>Chrome 的 Performance 面板可以录制一段时间内的 js 执行细节及时间。使用 Chrome 开发者工具分析页面性能的步骤如下。</p><p>打开 Chrome 开发者工具，切换到 Performance 面板</p><p>点击 Record 开始录制</p><p>刷新页面或展开某个节点</p><p>点击 Stop 停止录制</p>`,136),i=[l];function t(o,c,r,u,d,g){return n(),a("div",null,i)}const m=s(e,[["render",t]]);export{b as __pageData,m as default};
