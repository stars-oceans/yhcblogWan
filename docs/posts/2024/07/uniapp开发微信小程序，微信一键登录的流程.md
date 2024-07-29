---
post: true
title: uniapp开发微信小程序，微信一键登录的流程
date: 2024-07-16
cover: https://th.bing.com/th/id/R.08a3af2a4085b50b5a21895639b70341?rik=o8G9X9ZgmGT%2fxg&riu=http%3a%2f%2fwww.info110.com%2fwp-content%2fuploads%2f2020%2f12%2f20201218_5fdc67f249d56.jpg&ehk=%2bErY5hIYUFFPHCO4TE5rtdgbpn%2fNoICThdsblukwTHs%3d&risl=&pid=ImgRaw&r=0
coveross: https://th.bing.com/th/id/R.08a3af2a4085b50b5a21895639b70341?rik=o8G9X9ZgmGT%2fxg&riu=http%3a%2f%2fwww.info110.com%2fwp-content%2fuploads%2f2020%2f12%2f20201218_5fdc67f249d56.jpg&ehk=%2bErY5hIYUFFPHCO4TE5rtdgbpn%2fNoICThdsblukwTHs%3d&risl=&pid=ImgRaw&r=0
# 分类
categories:
 - Uniapp
tags:
 - uniapp开发微信小程序，微信一键登录的流程
description: uniapp开发微信小程序，微信一键登录的流程
---


## uniapp开发微信小程序，微信一键登录的流程


### 直接上代码
```vue
<template>
	<view class="login">
		<button class="wxq-btn loginWx" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<button class="wxq-btn goback">取消登录</button>
		<button open-type=""></button>
	</view>
	
</template>

<script>
	 import {  
	        // mapState,  
	        mapMutations  
	    } from 'vuex';  
	export default{
		  // computed: {  
		  //           ...mapState(['userInfo'])
		  //       },
		data(){
			return{
				code:'',//微信临时登录凭证
			}
		},
		onLoad:function(){
			uni.login({
				success: (res) => {
					if (res.errMsg == "login:ok") {
						this.code = res.code; 
					} else {
						uni.showToast({
							title: '系统异常，请联系管理员!'
						})
					}
				}
			})
		},
		methods:{
			...mapMutations(['login']),
			//微信授权登录
			getUserInfo(e){
				// 转移了 this 为 that
				let that = this;
				var p = this.getSetting();
				p.then(function(isAuth) {
					console.log('是否已经授权', isAuth);
					if (isAuth) {
						console.log('用户信息，加密数据', e);
						//eData  包括//微信头像//微信名称 还有加密的数据.
						let eData = JSON.parse(e.detail.rawData);
						console.log(eData,'包括//微信头像//微信名称 还有加密的数据.');
						console.log('code' , that.code);
						//接下来就是访问接口.
						uni.request({
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							url: '', //你的接口地址
							method: 'POST',//接口类型 
							data: '', //接口需要的数据
							success: function(res) {
								console.log(res);
								if (res.data.Success) {
									that.login(res.data); //将接口返回的数据保存在全局变量中.
									//登录成功跳转首页或者你想跳转的地方... 
									//注意：如果时导航页 请用uni.switchTab
									// 		其他页面建议使用uni.reLaunch
								} else {
									uni.showToast({
										title: '授权登录失败！',
										mask: true,
										icon: 'none'
									})
								}
				
				
							}
				
						})
					} else {
						uni.showToast({
							title: '授权失败，请确认授权已开启',
							mask: true,
							icon: 'none'
						})
					}
				});
			},
			//获取用户的当前设置
			getSetting() {
				return new Promise(function(resolve, reject) {
					uni.getSetting({
						success: function(res) {
							if (res.authSetting['scope.userInfo']) {
								console.log('存在');
								resolve(true);
							} else {
								console.log('不存在');
								resolve(false);
							}
						}
					})
				}).catch((e) => {
					console.log(e)
				});;
			},
		},
		
	}
</script>

<style>
	.login{
		width: 750rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.goback{
		width: 90%;
		background:#eee;
		color: #333;
		margin-bottom: 24rpx;
	}
	.loginWx{
		width: 90%;
		background: #04BE02;
		margin-bottom: 24rpx;
	}
</style>



```

