webpackJsonp([4],{Iaue:function(e,t){},N22d:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),o=n("/ocq"),r={name:"Login",data:function(){return{msg:"Welcome to Your Vue.js App",containerStyle:{},loginForm:{},form:{name:"",password:""},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,max:6,message:"长度2到6个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},mounted:function(){var e=window.innerHeight,t=window.innerWidth;e||(e=document.documentElement.clientHeight,t=document.documentElement.clientWidth),this.containerStyle={height:e+"px"},this.loginForm=t<400?{width:"100%",height:"50%",position:"fixed",top:"25%",right:"2%",opacity:"0.6"}:{width:"35%",height:"35%",position:"fixed",top:"15%",right:"4%",opacity:"0.6"},this.$route.params.originRoute&&this.$message({message:"你还未登录，登陆后才能操作哦",type:"warning"})},methods:{login:function(e){var t=this;this.$refs[e].validate(function(e){if(e){document.cookie="vuid='test'",document.cookie="vn="+t.form.name,t.$store.commit("setCurrUser",t.form.name),alert(t.$store.state.currentUser);var n=t.$route.params.originRoute;n&&(n.name="layout"),t.$router.push({name:"layout",params:{name:t.form.name}})}})},addUser:function(){}},beforeRouteLeave:function(e,t,n){"addUser"!=e.path&&this.$notify({title:"登录成功",dangerouslyUseHTMLString:!0,message:"欢迎您，用户<strong>"+this.form.name+"<strong>",type:"success",offset:60,duration:2500}),n()}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-container",[n("el-header",[n("h1",{staticStyle:{"font-style":"italic"}},[e._v("Stark")])]),e._v(" "),n("el-main",[n("div",{staticClass:"bgImg",style:e.containerStyle},[n("el-form",{ref:"form",style:e.loginForm,attrs:{model:e.form,"label-width":"80px",rules:e.rules}},[n("el-form-item",{attrs:{label:"用户名",prop:"name"}},[n("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"密码",prop:"password"}},[n("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.login("form")}}},[e._v("登录")]),e._v(" "),n("el-button",{on:{click:e.addUser}},[e._v("注册")])],1)],1)],1)])],1)],1)},staticRenderFns:[]};var s=n("VU/8")(r,a,!1,function(e){n("Iaue")},"data-v-f98347ae",null).exports,l={data:function(){return{defaultOpen:["1"],containerStyle:{},name:""}},methods:{routeTo:function(e,t){this.defaultOpen=[t],this.$router.push(e)}},mounted:function(){var e=window.innerHeight;e||(e=document.documentElement.clientHeight),this.containerStyle={height:e-60+"px"},this.name=this.$route.params.name}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",[n("el-row",[n("el-col",{attrs:{span:1}},[n("h1",[e._v("Stark")])]),e._v(" "),n("el-col",{attrs:{span:2,offset:21}},[n("h4",[e._v(e._s(e.name))])])],1)],1),e._v(" "),n("el-container",{style:e.containerStyle},[n("el-aside",{attrs:{width:"200px"}},[n("el-menu",{attrs:{"default-openeds":e.defaultOpen,"background-color":"#2b2b2f","text-color":"#fff"}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),e._v("导航一")]),e._v(" "),n("el-menu-item",{attrs:{index:"1-1"},on:{click:function(t){e.routeTo("/koa2vue","1")}}},[e._v("选项1")]),e._v(" "),n("el-menu-item",{attrs:{index:"1-2"},on:{click:function(t){e.routeTo("/koa2vue/articlesList","1")}}},[e._v("Grid列表")]),e._v(" "),n("el-menu-item",{attrs:{index:"1-3"},on:{click:function(t){e.routeTo("/koa2vue/articlesList","1")}}},[e._v("选项3")])],2),e._v(" "),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),e._v("导航二")]),e._v(" "),n("el-menu-item",{attrs:{index:"2-1"},on:{click:function(t){e.$router.push({name:"publish"})}}},[e._v("选项1")]),e._v(" "),n("el-menu-item",{attrs:{index:"2-2"},on:{click:function(t){e.routeTo("/koa2vue/grid","2")}}},[e._v("选项2")]),e._v(" "),n("el-menu-item",{attrs:{index:"2-3"},on:{click:function(t){e.routeTo("/koa2vue/articlesList","2")}}},[e._v("选项4-1")])],2),e._v(" "),n("el-submenu",{attrs:{index:"3"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-setting"}),e._v("导航三")]),e._v(" "),n("el-menu-item",{attrs:{index:"3-1"}},[e._v("选项1")]),e._v(" "),n("el-menu-item",{attrs:{index:"3-2"}},[e._v("选项2")]),e._v(" "),n("el-menu-item",{attrs:{index:"3-3"}},[e._v("选项3")]),e._v(" "),n("el-menu-item",{attrs:{index:"3-4"}},[e._v("选项4")])],2)],1)],1),e._v(" "),n("el-main",[n("router-view")],1)],1)],1)},staticRenderFns:[]};var c=n("VU/8")(l,u,!1,function(e){n("uVVg")},"data-v-1df405b3",null).exports;i.default.use(o.a);var m=new o.a({routes:[{path:"/",name:"articlesList",component:function(e){n.e(0).then(function(){var t=[n("KMXQ")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/login",name:"login",component:s},{path:"/koa2vue",name:"layout",component:c,children:[{path:"grid",name:"grid",component:function(e){n.e(2).then(function(){var t=[n("9+e2")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"articlesList",name:"articlesList",component:function(e){n.e(0).then(function(){var t=[n("KMXQ")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"publish",name:"publish",component:function(e){return n.e(1).then(function(){var t=[n("ZFtp")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}]}),d={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var p=n("VU/8")({name:"App",data:function(){return{}},methods:{}},d,!1,function(e){n("N22d")},null,null).exports,f=n("zL8q"),v=n.n(f),h=n("NYxO");i.default.use(h.a);var g=new h.a.Store({state:{currentUser:""},mutations:{setCurrUser:function(e,t){e.currentUser=t}}});n("tvR6");i.default.config.productionTip=!1,i.default.use(v.a),new i.default({el:"#app",router:m,store:g,components:{App:p},template:"<App/>"})},tvR6:function(e,t){},uVVg:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.d2b4ac0bb84e90ae216e.js.map