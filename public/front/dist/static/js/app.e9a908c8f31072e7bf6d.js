webpackJsonp([4],{"+CLg":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("//Fk"),i=n.n(o),a=n("7+uW"),r=n("/ocq"),s={name:"Login",data:function(){return{msg:"Welcome to Your Vue.js App",loginForm:{},loading:!1,form:{userName:"",password:""},rules:{userName:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:2,max:6,message:"长度2到6个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},computed:{containerStyle:function(){var t=window.localStorage.getItem("windowHeight");window.localStorage.getItem("windowWidth");return{height:t+"px"}}},mounted:function(){this.$alert("体验账号:test，密码：test","提示",{confirmButtonText:"确定"});var t=window.localStorage.getItem("windowHeight"),e=window.localStorage.getItem("windowWidth");this.containerStyle.height=t+"px",this.loginForm=e<400?{width:"100%",height:"50%",position:"fixed",top:"25%",right:"2%",opacity:"0.6"}:{width:"35%",height:"35%",position:"fixed",top:"15%",right:"4%",opacity:"0.6"},this.$route.params.originRoute&&this.$message({message:"你还未登录，登陆后才能操作哦",type:"warning"})},methods:{login:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.loading=!0,e.$store.state.axiosInstance({method:"post",url:"/koa2vue/publicService/login",data:e.form}).then(function(t){if("S"==t.data.code){e.loading=!1,e.$store.commit("setCurrUser",t.data.user.userName);var n=e.$route.params.originRoute,o="/";n&&(o=n.toPage),e.$router.push(o)}else e.loading=!1,e.$message({message:t.data.msg,type:"error"})}))})},register:function(){}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{height:"100%"}},[n("el-container",{staticStyle:{height:"100%"}},[n("el-header",[n("h1",{staticStyle:{"font-style":"italic"}},[t._v("i Note")])]),t._v(" "),n("el-main",{staticStyle:{height:"100%"}},[n("div",{staticClass:"bgImg",staticStyle:{height:"100%"}},[n("el-form",{ref:"form",style:t.loginForm,attrs:{model:t.form,"label-width":"80px",rules:t.rules}},[n("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[n("el-input",{model:{value:t.form.userName,callback:function(e){t.$set(t.form,"userName",e)},expression:"form.userName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"密码",prop:"password"}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.login("form")}}},[t._v("登录")]),t._v(" "),n("el-button",{on:{click:t.register}},[t._v("注册")])],1)],1)],1)])],1)],1)},staticRenderFns:[]};var c=n("VU/8")(s,l,!1,function(t){n("+CLg")},"data-v-a57cffa2",null).exports,u={data:function(){return{activeIndex:"",containerStyle:{},name:""}},watch:{$route:function(){this.activeIndex=this.$route.path}},methods:{handleSelect:function(t,e){console.log(t,e),this.$router.push({path:t})},handleCommand:function(t){this.$options.methods[t].call(this)},logout:function(){var t=this;this.loading=!0,this.$store.state.axiosInstance.put("/koa2vue/publicService/logout").then(function(e){t.loading=!1,"S"==e.data.code?(t.$store.commit("setCurrUser",""),t.$router.push("/login")):t.$message({message:""+e.data.msg,type:"error"})}).catch(function(e){console.log(e),t.loading=!1,t.$message({message:""+e,type:"error"})})}},mounted:function(){this.activeIndex=this.$route.path,this.name=window.localStorage.getItem("username")}},d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-header",[n("el-row",[n("el-col",{attrs:{span:2}},[n("h1",[t._v("iNote")])]),t._v(" "),n("el-col",{attrs:{span:19}},[n("el-menu",{attrs:{mode:"horizontal","default-active":t.activeIndex,"background-color":"#191c1f","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:t.handleSelect}},[n("el-menu-item",{attrs:{index:"/koa2vue/articlesList"}},[t._v("All Notes")]),t._v(" "),n("el-menu-item",{attrs:{index:"/koa2vue/myArticlesList"}},[t._v("My Notes")]),t._v(" "),n("el-menu-item",{attrs:{index:"/koa2vue/publish"}},[t._v("Publish Note")]),t._v(" "),n("el-submenu",{attrs:{index:"4"}},[n("template",{slot:"title"},[t._v("Demo")]),t._v(" "),n("el-menu-item",{attrs:{index:"/koa2vue/grid"}},[t._v("Grid列表")]),t._v(" "),n("el-menu-item",{attrs:{index:"4-2"}},[t._v("选项4-1")])],2)],1)],1),t._v(" "),n("el-col",{staticStyle:{"text-align":"center"},attrs:{span:2,offset:1}},[n("el-dropdown",{staticStyle:{height:"60px",width:"70%"},on:{command:t.handleCommand}},[n("span",{staticClass:"el-dropdown-link"},[n("h1",[t._v(t._s(t.name)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})])]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"logout"}},[t._v("退出")])],1)],1)],1)],1)],1),t._v(" "),n("el-main",[n("router-view")],1)],1)},staticRenderFns:[]};var m=n("VU/8")(u,d,!1,function(t){n("tLtE")},"data-v-4253bb83",null).exports;a.default.use(r.a);var p=new r.a({routes:[{path:"/",redirect:"/koa2vue/articlesList"},{path:"/login",name:"login",component:c},{path:"/koa2vue",name:"layout",component:m,children:[{path:"articleDetail",name:"articleDetail",component:function(){return n.e(0).then(n.bind(null,"zvDi"))}},{path:"grid",name:"grid",component:function(t){n.e(2).then(function(){var e=[n("9+e2")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"articlesList",name:"articlesList",props:{publicFlag:!0},component:function(){return n.e(0).then(n.bind(null,"gntg"))}},{path:"myArticlesList",name:"myArticlesList",props:{publicFlag:!1},component:function(){return n.e(0).then(n.bind(null,"gntg"))}},{path:"publish",name:"publish",component:function(t){return n.e(1).then(function(){var e=[n("ZFtp")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}]}),g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"100%"},attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var h=n("VU/8")({name:"App",mounted:function(){}},g,!1,function(t){n("zZ5b")},null,null).exports,f=n("zL8q"),v=n.n(f),w=n("mvHQ"),x=n.n(w),_=n("NYxO");a.default.use(_.a);var b=new _.a.Store({state:{currentUser:"",axiosInstance:{},windowWidth:"",windowHeight:"",curArticle:{}},mutations:{setCurrUser:function(t,e){window.localStorage.setItem("username",e),t.currentUser=e},setAxiosInstance:function(t,e){t.axiosInstance=e},setWindowH:function(t,e){t.windowHeight=e,window.localStorage.setItem("windowHeight",e)},setWindowW:function(t,e){t.windowWidth=e,window.localStorage.setItem("windowWidth",e)},setCurArticle:function(t,e){var n=x()(e);window.localStorage.setItem("curArticle",n),t.curArticle=e}},getters:{}}),y=n("mtWM"),S=n.n(y);n("tvR6");a.default.config.productionTip=!1,a.default.use(v.a),new a.default({el:"#app",router:p,store:b,components:{App:h},template:"<App/>",mounted:function(){var t=this;var e=S.a.create();e.interceptors.response.use(function(e){return"E"==e.data.code&&"login"==e.data.redirect?(t.$router.push({name:"login"}),i.a.reject({message:e.data.msg,status:500,statusText:e.data.msg})):e},function(t){return this.$message({message:t,type:"error"}),i.a.reject(t)}),b.commit("setAxiosInstance",e)}})},tLtE:function(t,e){},tvR6:function(t,e){},zZ5b:function(t,e){}},["NHnr"]);