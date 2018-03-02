webpackJsonp([4],{D26A:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o=n("/ocq"),a={name:"Login",data:function(){return{msg:"Welcome to Your Vue.js App",containerStyle:{},loginForm:{},form:{name:"",password:""},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,max:6,message:"长度2到6个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},mounted:function(){var t=this.$store.state.windowHeight,e=this.$store.state.windowWidth;this.containerStyle={height:t+"px"},this.loginForm=e<400?{width:"100%",height:"50%",position:"fixed",top:"25%",right:"2%",opacity:"0.6"}:{width:"35%",height:"35%",position:"fixed",top:"15%",right:"4%",opacity:"0.6"},this.$route.params.originRoute&&this.$message({message:"你还未登录，登陆后才能操作哦",type:"warning"})},methods:{login:function(t){var e=this;this.$refs[t].validate(function(t){if(t){document.cookie="vuid='test'",document.cookie="vn="+e.form.name,e.$store.commit("setCurrUser",e.form.name);var n=e.$route.params.originRoute;n&&(n.name="layout"),e.$router.push({name:"layout",params:{name:e.form.name}})}})},addUser:function(){}},beforeRouteLeave:function(t,e,n){"addUser"!=t.path&&this.$notify({title:"登录成功",dangerouslyUseHTMLString:!0,message:"欢迎您，用户<strong>"+this.form.name+"<strong>",type:"success",offset:60,duration:2500}),n()}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-container",[n("el-header",[n("h1",{staticStyle:{"font-style":"italic"}},[t._v("Stark")])]),t._v(" "),n("el-main",[n("div",{staticClass:"bgImg",style:t.containerStyle},[n("el-form",{ref:"form",style:t.loginForm,attrs:{model:t.form,"label-width":"80px",rules:t.rules}},[n("el-form-item",{attrs:{label:"用户名",prop:"name"}},[n("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"密码",prop:"password"}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.login("form")}}},[t._v("登录")]),t._v(" "),n("el-button",{on:{click:t.addUser}},[t._v("注册")])],1)],1)],1)])],1)],1)},staticRenderFns:[]};var r=n("VU/8")(a,s,!1,function(t){n("o8S4")},"data-v-5a865e16",null).exports,l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-header",[n("el-row",[n("el-col",{attrs:{span:1}},[n("h1",[t._v("Stark")])]),t._v(" "),n("el-col",{attrs:{span:2,offset:21}},[n("h4",[t._v(t._s(t.name))])])],1)],1),t._v(" "),n("el-container",{style:t.containerStyle},[n("el-aside",{attrs:{width:t.asideWidth}},[n("el-menu",{style:{width:t.asideWidth},attrs:{"default-openeds":t.defaultOpen,"background-color":"#2b2b2f","text-color":"#fff"}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),t._v("导航一")]),t._v(" "),n("el-menu-item",{attrs:{index:"1-1"},on:{click:function(e){t.routeTo("/koa2vue","1")}}},[t._v("选项1")]),t._v(" "),n("el-menu-item",{attrs:{index:"1-2"},on:{click:function(e){t.routeTo("/koa2vue/articlesList","1")}}},[t._v("文章列表")]),t._v(" "),n("el-menu-item",{attrs:{index:"1-3"},on:{click:function(e){t.routeTo("/koa2vue/articlesList","1")}}},[t._v("选项3")])],2),t._v(" "),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-menu"}),t._v("导航二")]),t._v(" "),n("el-menu-item",{attrs:{index:"2-1"},on:{click:function(e){t.$router.push({name:"publish"})}}},[t._v("发布文章")]),t._v(" "),n("el-menu-item",{attrs:{index:"2-2"},on:{click:function(e){t.routeTo("/koa2vue/grid","2")}}},[t._v("Grid列表")]),t._v(" "),n("el-menu-item",{attrs:{index:"2-3"},on:{click:function(e){t.routeTo("/koa2vue/articlesList","2")}}},[t._v("选项4-1")])],2),t._v(" "),n("el-submenu",{attrs:{index:"3"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-setting"}),t._v("导航三")]),t._v(" "),n("el-menu-item",{attrs:{index:"3-1"}},[t._v("选项1")]),t._v(" "),n("el-menu-item",{attrs:{index:"3-2"}},[t._v("选项2")]),t._v(" "),n("el-menu-item",{attrs:{index:"3-3"}},[t._v("选项3")]),t._v(" "),n("el-menu-item",{attrs:{index:"3-4"}},[t._v("选项4")])],2)],1)],1),t._v(" "),n("el-main",{style:{width:t.mainWidth}},[n("router-view")],1)],1)],1)},staticRenderFns:[]};var u=n("VU/8")({data:function(){return{asideWidth:"",mainWidth:"",defaultOpen:["1"],containerStyle:{},name:""}},methods:{routeTo:function(t,e){this.defaultOpen=[e],this.$router.push(t)}},mounted:function(){var t=this.$store.state.windowHeight,e=this.$store.state.windowWidth;this.containerStyle={height:t-60+"px"},this.asideWidth=e/10+"px",this.mainWidth=e/90+"px",this.name=this.$route.params.name}},l,!1,function(t){n("U+kV")},"data-v-11010ee0",null).exports;i.default.use(o.a);var c=new o.a({routes:[{path:"/login",name:"login",component:r},{path:"/koa2vue",name:"layout",component:u,children:[{path:"grid",name:"grid",component:function(t){n.e(2).then(function(){var e=[n("9+e2")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"articlesList",name:"articlesList",component:function(t){n.e(1).then(function(){var e=[n("KMXQ")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"publish",name:"publish",component:function(t){return n.e(0).then(function(){var e=[n("ZFtp")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}]}),m={name:"App",mounted:function(){var t=window.innerHeight,e=window.innerWidth;t||(t=document.documentElement.clientHeight,e=document.documentElement.clientWidth),this.$store.commit("setWindowH",t),this.$store.commit("setWindowW",e)}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var p=n("VU/8")(m,d,!1,function(t){n("D26A")},null,null).exports,h=n("zL8q"),f=n.n(h),v=n("NYxO"),g=n("mtWM"),w=n.n(g);i.default.use(v.a);var _=new v.a.Store({state:{currentUser:"",axiosInstance:{},windowWidth:"",windowHeight:""},mutations:{setCurrUser:function(t,e){t.currentUser=e},setAxiosInstance:function(t,e){t.axiosInstance=w.a.create(e)},setWindowH:function(t,e){t.windowHeight=e},setWindowW:function(t,e){t.windowWidth=e}},getters:{}});n("tvR6");i.default.config.productionTip=!1,i.default.use(f.a),new i.default({el:"#app",router:c,store:_,components:{App:p},template:"<App/>",mounted:function(){var t="";t="http://www.nodetop.top",_.commit("setAxiosInstance",{baseURL:t})}})},"U+kV":function(t,e){},o8S4:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.39750a42d82b731fd9f1.js.map