import{_ as s,c as i,o as a,V as t}from"./chunks/framework.WW8f2_VW.js";const _=JSON.parse('{"title":"删除GitHub远程仓库的中某个文件夹或者文件夹文件","description":"删除GitHub远程仓库的中某个文件夹或者文件夹文件","frontmatter":{"post":true,"title":"删除GitHub远程仓库的中某个文件夹或者文件夹文件","date":"2024-02-01T00:00:00.000Z","cover":"https://i.postimg.cc/KY2TvQQV/branching-illustration-2x.png","coveross":"https://i.postimg.cc/KY2TvQQV/branching-illustration-2x.png","categories":["Git"],"tags":["Git","远程仓库"],"description":"删除GitHub远程仓库的中某个文件夹或者文件夹文件"},"headers":[],"relativePath":"posts/2024/02/03.删除GitHub远程仓库的中某个文件夹或者文件夹文件 .md","filePath":"posts/2024/02/03.删除GitHub远程仓库的中某个文件夹或者文件夹文件 .md"}'),n={name:"posts/2024/02/03.删除GitHub远程仓库的中某个文件夹或者文件夹文件 .md"},h=t(`<h2 id="问题" tabindex="-1">问题： <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题：&quot;">​</a></h2><p>在上传项目到GitHub时，忘记忽略了某个文件夹target，就直接push上去了, 最后意识到了此问题，决定删除掉远程仓库中的Photo albums文件夹。</p><p>但是在github上只能删除仓库，却无法删除文件夹或文件，所以只能通过命令来解决。</p><h2 id="具体方法如下" tabindex="-1">具体方法如下： <a class="header-anchor" href="#具体方法如下" aria-label="Permalink to &quot;具体方法如下：&quot;">​</a></h2><p>首先进入你的本地git仓库文件夹下, Git Bash Here ,打开命令窗口：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">help 帮助命令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git pull origin master 将远程仓库里面的项目拉下来</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dir  查看有哪些文件夹</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git rm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cached Photo\\ albums  删除Photo </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">albums文件夹</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(这里的文件夹名有空格命令行需要用</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">来拼接）【或者手动删除】</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> git commit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">m </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;删除了Photo albums文件夹t&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  提交,添加操作说明。</span></span></code></pre></div><h2 id="注意" tabindex="-1">注意： <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意：&quot;">​</a></h2><p>本地项目中的Photo albums文件夹不受操作影响，删除的只是远程仓库中的Photo albums，可放心删除。【因为 git rm -r --cached Photo\\ albums 命令删除的只是git暂存区中的Photo albums文件夹】</p><p>每次增加文件或删除文件，都要commit 然后直接 git push -u origin master，就可以同步到GitHub上了。</p>`,9),e=[h];function l(p,r,o,k,c,d){return a(),i("div",null,e)}const g=s(n,[["render",l]]);export{_ as __pageData,g as default};
