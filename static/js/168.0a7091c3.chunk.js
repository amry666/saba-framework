(this["webpackJsonpsaba-react-framework"]=this["webpackJsonpsaba-react-framework"]||[]).push([[168],{826:function(e,s,t){"use strict";t.r(s);var a=t(2),c=t(36),n=t(12),i=t.n(n),m=t(560),r=t(458),l=t(579),d=t(5),j=t(0);s.default=function(e){return e.data.map((function(e){return Object(j.jsx)(d.l,{className:"post",children:Object(j.jsxs)(d.m,{children:[Object(j.jsxs)("div",{className:"d-flex justify-content-start align-items-center mb-1",children:[Object(j.jsx)(c.a,{className:"me-1",img:e.avatar,imgHeight:"50",imgWidth:"50"}),Object(j.jsxs)("div",{className:"profile-user-info",children:[Object(j.jsx)("h6",{className:"mb-0",children:e.username}),Object(j.jsx)("small",{className:"text-muted",children:e.postTime})]})]}),Object(j.jsx)(d.r,{children:e.postText}),e.postImg?Object(j.jsx)("img",{src:e.postImg,alt:e.username,className:"img-fluid rounded mb-75"}):e.postVid?Object(j.jsx)("iframe",{src:"https://www.youtube.com/embed/6stlCkUDG_s",className:"w-100 rounded height-250 mb-50 border-0"}):null,Object(j.jsxs)(d.U,{className:"d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions",children:[Object(j.jsxs)(d.t,{className:"d-flex justify-content-between justify-content-sm-start mb-2",sm:"6",children:[Object(j.jsxs)("div",{className:"d-flex align-items-center text-muted text-nowrap cursor-pointer",children:[Object(j.jsx)(m.a,{size:18,className:i()("me-50",{"profile-likes":!0===e.youLiked})}),Object(j.jsx)("span",{children:e.likes})]}),Object(j.jsxs)("div",{className:"d-flex align-items-center",children:[Object(j.jsx)("div",{className:"avatar-group ms-1",children:e.likedUsers.map((function(e){return Object(j.jsxs)(a.Fragment,{children:[Object(j.jsx)(c.a,{className:"pull-up",img:e.avatar,id:e.username.toLowerCase().split(" ").join("-"),imgHeight:"26",imgWidth:"26"}),Object(j.jsx)(d.db,{target:e.username.toLowerCase().split(" ").join("-"),placement:"top",children:e.username})]},e.username)}))}),Object(j.jsxs)("a",{href:"/",className:"text-muted text-nowrap ms-50",onClick:function(e){return e.preventDefault()},children:["+",e.likedCount," more"]})]})]}),Object(j.jsxs)(d.t,{className:"d-flex justify-content-between justify-content-sm-end align-items-center mb-2",sm:"6",children:[Object(j.jsxs)("a",{href:"/",className:"text-nowrap",onClick:function(e){return e.preventDefault()},children:[Object(j.jsx)(r.a,{size:18,className:"text-body me-50"}),Object(j.jsx)("span",{className:"text-muted me-1",children:e.comments})]}),Object(j.jsxs)("a",{href:"/",className:"text-nowrap share-post",onClick:function(e){return e.preventDefault()},children:[Object(j.jsx)(l.a,{size:18,className:"text-body mx-50"}),Object(j.jsx)("span",{className:"text-muted me-1",children:e.share})]})]})]}),e.detailedComments.map((function(e){return Object(j.jsxs)("div",{className:"d-flex align-items-start mb-1",children:[Object(j.jsx)(c.a,{img:e.avatar,className:"mt-25 me-75",imgHeight:"34",imgWidth:"34"}),Object(j.jsxs)("div",{className:"profile-user-info w-100",children:[Object(j.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[Object(j.jsx)("h6",{className:"mb-0",children:e.username}),Object(j.jsxs)("a",{href:"/",onClick:function(e){return e.preventDefault()},children:[Object(j.jsx)(m.a,{size:18,className:i()("text-body",{"profile-likes":!0===e.youLiked})}),Object(j.jsx)("span",{className:"align-middle ms-25 text-muted",children:e.commentsLikes})]})]}),Object(j.jsx)("small",{children:e.comment})]})]},e.username)})),Object(j.jsxs)("fieldset",{className:"form-label-group mb-50",children:[Object(j.jsx)(d.E,{className:"form-check-label",for:"add-comment-".concat(e.username),children:"Add Comment"}),Object(j.jsx)(d.B,{id:"add-comment-".concat(e.username),type:"textarea",rows:"3",placeholder:"Add Comment"})]}),Object(j.jsx)(d.i,{color:"primary",size:"sm",children:"Post Comment"})]})},e.username)}))}}}]);