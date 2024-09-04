(this["webpackJsonpsaba-react-framework"]=this["webpackJsonpsaba-react-framework"]||[]).push([[21,27],{368:function(e,t,a){"use strict";a.r(t),a.d(t,"pageTitle",(function(){return o})),a.d(t,"storeName",(function(){return l})),a.d(t,"endpointName",(function(){return p})),a.d(t,"serverSideGrid",(function(){return f})),a.d(t,"detailFromGrid",(function(){return m})),a.d(t,"getAlwaysGrid",(function(){return g})),a.d(t,"getApiAfterPut",(function(){return y})),a.d(t,"getApiAfterPost",(function(){return b})),a.d(t,"getApiAfterDelete",(function(){return v})),a.d(t,"getApiSummaryData",(function(){return D})),a.d(t,"detailPage",(function(){return j})),a.d(t,"getSummaryData",(function(){return h})),a.d(t,"getDataList",(function(){return L})),a.d(t,"getDataById",(function(){return A})),a.d(t,"resetSelectedData",(function(){return O})),a.d(t,"postData",(function(){return S})),a.d(t,"putData",(function(){return x})),a.d(t,"deleteData",(function(){return C})),a.d(t,"deleteSelectedRowData",(function(){return E})),a.d(t,"setDataById",(function(){return w})),a.d(t,"resetData",(function(){return k})),a.d(t,"StoreSlice",(function(){return U}));var r=a(10),n=a(7),d=a.n(n),s=a(18),u=a(43),i=a(53),c=u.a.ssoAxiosInterceptor,o="Role",l="apps_role",p="api/role",f=!1,m=!1,g=!1,y=!0,b=!0,v=!0,D=!0,j=!0,h=Object(s.b)("".concat(p,"/getSummaryData"),function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(t).forEach((function(e){null!==t[e]&&""!==t[e]||delete t[e]})),e.next=3,c.get("/".concat(p,"/summary"),{params:t});case 3:return a=e.sent,e.abrupt("return",{params:t,data:a.data.data});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L=Object(s.b)("".concat(p,"/getDataList"),function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(t).forEach((function(e){null!==t[e]&&""!==t[e]||delete t[e]})),e.next=3,c.get("/".concat(p),{params:t});case 3:return a=e.sent,e.abrupt("return",{params:t,data:a.data.data,total:a.data.total});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),A=Object(s.b)("".concat(p,"/getDataById"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.rejectWithValue,e.prev=1,e.next=4,c.get("/".concat(p,"/").concat(t));case 4:return n=e.sent,e.abrupt("return",n.data.data);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",r(e.t0.response.data));case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a){return e.apply(this,arguments)}}()),O=Object(s.b)("".concat(p,"/resetSelectedData"),function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.rejectWithValue,e.abrupt("return",a({}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),S=Object(s.b)("".concat(p,"/postData"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,e.prev=1,e.next=4,c.post("/".concat(p),t);case 4:return u=e.sent,r(O({})),b&&r(L(n()[l].params)),r(Object(i.resetData)({})),e.abrupt("return",u.data);case 11:return e.prev=11,e.t0=e.catch(1),e.abrupt("return",s(e.t0.response.data));case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t,a){return e.apply(this,arguments)}}()),x=Object(s.b)("".concat(p,"/putData"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,u,o,f;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.dispatch,s=a.getState,u=a.rejectWithValue,o=null!==(r=t.id)&&void 0!==r?r:s()[l].selectedData.id,t.name=s()[l].selectedData.name,e.prev=3,e.next=6,c.put("/".concat(p,"/").concat(o),t);case 6:return f=e.sent,n(O({})),y&&(n(L(s()[l].params)),D&&n(h({}))),n(Object(i.resetData)({})),e.abrupt("return",f.data);case 13:return e.prev=13,e.t0=e.catch(3),e.abrupt("return",u(e.t0.response.data));case 16:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(t,a){return e.apply(this,arguments)}}()),C=Object(s.b)("".concat(p,"/deleteData"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,e.prev=1,e.next=4,c.delete("/".concat(p,"/").concat(t));case 4:if(u=e.sent,!v){e.next=9;break}return e.next=8,r(L(n()[l].params));case 8:D&&r(h({}));case 9:return r(Object(i.resetData)({})),e.abrupt("return",u.data);case 13:return e.prev=13,e.t0=e.catch(1),e.abrupt("return",s(e.t0.response.data));case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,a){return e.apply(this,arguments)}}()),E=Object(s.b)("".concat(p,"/deleteSelectedRowData"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,u;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,e.prev=1,e.next=4,c.delete("/".concat(p),{data:t});case 4:if(u=e.sent,!v){e.next=9;break}return e.next=8,r(L(n()[l].params));case 8:D&&r(h({}));case 9:return r(Object(i.resetData)({})),e.abrupt("return",u.data);case 13:return e.prev=13,e.t0=e.catch(1),e.abrupt("return",s(e.t0.response.data));case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,a){return e.apply(this,arguments)}}()),w=Object(s.b)("".concat(p,"/setDataById"),function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.rejectWithValue,e.abrupt("return",r(t));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),k=Object(s.b)("".concat(p,"/resetData"),function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.rejectWithValue,e.abrupt("return",a({}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),U=Object(s.c)({name:l,initialState:{pageTitle:o,statusSummary:0,isLoadingSummary:!1,errorSummary:0,dataSummary:[],status:0,isLoading:!1,error:0,data:[],total:1,params:{},selectedData:null,dataDropdown:[],statusDetail:0,isLoadingDetail:!1,errorDetail:0,statusAddEdit:0,isLoadingAddEdit:!1,errorAddEdit:0,statusDelete:0,isLoadingDelete:!1,errorDelete:0},reducers:{},extraReducers:function(e){e.addCase(h.pending,(function(e){e.statusSummary="loading",e.isLoadingSummary=!0})).addCase(h.fulfilled,(function(e,t){e.statusSummary="succeeded",e.isLoadingSummary=!1,e.dataSummary=t.payload.data})).addCase(h.rejected,(function(e,t){e.statusSummary="failed",e.isLoadingSummary=!1,e.errorSummary=t.error.message})).addCase(L.pending,(function(e){e.status="loading",e.isLoading=!0})).addCase(L.fulfilled,(function(e,t){e.status="succeeded",e.isLoading=!1,t.payload.data.length>0&&(e.data=t.payload.data,e.dataDropdown=t.payload.data.map((function(e){return{value:e.id,label:"".concat(e.name)}})),e.selectedData={value:t.payload.data[0].id,label:"".concat(t.payload.data[0].name)}),e.params=t.payload.params,e.total=t.payload.total})).addCase(L.rejected,(function(e,t){var a;e.status="failed",e.isLoading=!1,e.error=null===(a=t.error.payload)||void 0===a?void 0:a.message})).addCase(x.pending,(function(e){e.statusAddEdit="loading",e.isLoadingAddEdit=!0})).addCase(x.fulfilled,(function(e){e.statusAddEdit="succeeded",e.isLoadingAddEdit=!1})).addCase(x.rejected,(function(e,t){var a;e.statusAddEdit="failed",e.isLoadingAddEdit=!1,e.errorAddEdit=null===(a=t.payload)||void 0===a?void 0:a.message})).addCase(S.pending,(function(e){e.statusAddEdit="loading",e.isLoadingAddEdit=!0})).addCase(S.fulfilled,(function(e){e.statusAddEdit="succeeded",e.isLoadingAddEdit=!1})).addCase(S.rejected,(function(e,t){var a;e.statusAddEdit="failed",e.isLoadingAddEdit=!1,e.errorAddEdit=null===(a=t.payload)||void 0===a?void 0:a.message})).addCase(C.pending,(function(e){e.statusDelete="loading",e.isLoadingDelete=!0})).addCase(C.fulfilled,(function(e){e.statusDelete="succeeded",e.isLoadingDelete=!1})).addCase(C.rejected,(function(e,t){var a;e.statusDelete="failed",e.isLoadingDelete=!1,e.errorDelete=null===(a=t.payload)||void 0===a?void 0:a.message})).addCase(E.pending,(function(e){e.statusDelete="loading",e.isLoadingDelete=!0})).addCase(E.fulfilled,(function(e){e.statusDelete="succeeded",e.isLoadingDelete=!1})).addCase(E.rejected,(function(e,t){var a;e.statusDelete="failed",e.isLoadingDelete=!1,e.errorDelete=null===(a=t.payload)||void 0===a?void 0:a.message})).addCase(A.pending,(function(e){e.statusDetail="loading",e.isLoadingDetail=!0})).addCase(A.fulfilled,(function(e,t){e.statusDetail="succeeded",e.isLoadingDetail=!1,e.selectedData=t.payload})).addCase(A.rejected,(function(e,t){var a;e.statusDetail="failed",e.isLoadingDetail=!1,e.selectedData=null,e.errorDetail=null===(a=t.payload)||void 0===a?void 0:a.message})).addCase(O.rejected,(function(e){e.selectedData=null})).addCase(w.rejected,(function(e,t){e.selectedData=t.payload})).addCase(k.rejected,(function(e){e.data=[],e.dataSummary=[]}))}});t.default=U.reducer},370:function(e,t,a){"use strict";a.r(t),a.d(t,"getSummaryData",(function(){return c})),a.d(t,"getData",(function(){return o})),a.d(t,"getUser",(function(){return l})),a.d(t,"addUser",(function(){return p})),a.d(t,"updateUser",(function(){return f})),a.d(t,"deleteUser",(function(){return m})),a.d(t,"getDataEmployee",(function(){return g})),a.d(t,"appUsersSlice",(function(){return y}));var r=a(10),n=a(7),d=a.n(n),s=a(18),u=a(43),i=a(368),c=Object(s.b)("appUsers/getSummaryData",function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(t).forEach((function(e){null!==t[e]&&""!==t[e]||delete t[e]})),e.next=3,u.a.ssoAxiosInterceptor.get("/api/user/summary",{params:t});case 3:return a=e.sent,e.abrupt("return",{params:t,data:a.data.data});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),o=Object(s.b)("appUsers/getData",function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(t).forEach((function(e){null!==t[e]&&""!==t[e]||delete t[e]})),e.next=3,u.a.ssoAxiosInterceptor.get("/api/user",{params:t});case 3:return a=e.sent,e.abrupt("return",{params:t,data:a.data.data,totalPages:a.data.total});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),l=Object(s.b)("appUsers/getUser",function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.ssoAxiosInterceptor.get("/api/user/".concat(t));case 2:return a=e.sent,e.abrupt("return",a.data.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p=Object(s.b)("appUsers/addUser",function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,e.prev=1,e.next=4,u.a.ssoAxiosInterceptor.post("/api/user",t);case 4:return e.sent,e.next=7,r(o(n().users.params));case 7:return r(Object(i.resetData)({})),e.abrupt("return",t);case 11:return e.prev=11,e.t0=e.catch(1),e.abrupt("return",s(e.t0.response.data));case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t,a){return e.apply(this,arguments)}}()),f=Object(s.b)("appUsers/updateUser",function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,p,f;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,p=t.id,delete t.id,e.prev=3,e.next=6,u.a.ssoAxiosInterceptor.put("/api/user/".concat(p),t);case 6:return f=e.sent,r(l(p)),r(o(n().users.params)),r(c({})),r(Object(i.resetData)({})),e.abrupt("return",f.data);case 14:return e.prev=14,e.t0=e.catch(3),e.abrupt("return",s(e.t0.response.data.errors));case 17:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(t,a){return e.apply(this,arguments)}}()),m=Object(s.b)("appUsers/deleteUser",function(){var e=Object(r.a)(d.a.mark((function e(t,a){var r,n,s,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.dispatch,n=a.getState,s=a.rejectWithValue,e.prev=1,e.next=4,u.a.ssoAxiosInterceptor.delete("/api/user/".concat(t));case 4:return l=e.sent,e.next=7,r(o(n().users.params));case 7:return r(c({})),r(Object(i.resetData)({})),e.abrupt("return",l.data);case 12:return e.prev=12,e.t0=e.catch(1),e.abrupt("return",s(e.t0.response.data));case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t,a){return e.apply(this,arguments)}}()),g=Object(s.b)("appUsers/getDataEmployee",function(){var e=Object(r.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Object.keys(t).forEach((function(e){null!==t[e]&&""!==t[e]||delete t[e]})),e.next=3,u.a.hrAxiosInterceptor.get("/Employee",{params:t});case 3:return a=e.sent,e.abrupt("return",{params:t,data:a.data.data,totalPages:a.data.total});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),y=Object(s.c)({name:"appUsers",initialState:{crudTitle:"User",statusSummary:0,isLoadingSummary:!1,errorSummary:0,dataSummary:[],status:0,isLoading:!1,error:0,data:[],total:1,params:{},status_employee:0,isLoading_employee:!1,error_employee:0,data_employee:[],total_employee:1,params_employee:{},statusDetail:0,isLoadingDetail:!1,errorDetail:0,selectedUser:null,statusAddEdit:0,isLoadingAddEdit:!1,errorAddEdit:0,statusDelete:0,isLoadingDelete:!1,errorDelete:0},reducers:{},extraReducers:function(e){e.addCase(c.pending,(function(e){e.statusSummary="loading",e.isLoadingSummary=!0})).addCase(c.fulfilled,(function(e,t){e.statusSummary="succeeded",e.isLoadingSummary=!1,e.dataSummary=t.payload.data})).addCase(c.rejected,(function(e,t){e.statusSummary="failed",e.isLoadingSummary=!1,e.errorSummary=t.error.message})).addCase(o.pending,(function(e){e.status="loading",e.isLoading=!0})).addCase(o.fulfilled,(function(e,t){e.status="succeeded",e.isLoading=!1,e.data=t.payload.data,e.params=t.payload.params,e.total=t.payload.totalPages})).addCase(o.rejected,(function(e,t){e.status="failed",e.isLoading=!1,e.error=t.error.message})).addCase(g.pending,(function(e){e.status_employee="loading",e.isLoading_employee=!0})).addCase(g.fulfilled,(function(e,t){e.status_employee="succeeded",e.isLoading_employee=!1,e.data_employee=t.payload.data,e.params_employee=t.payload.params,e.total_employee=t.payload.totalPages})).addCase(g.rejected,(function(e,t){e.status_employee="failed",e.isLoading_employee=!1,e.error_employee=t.error.message})).addCase(f.pending,(function(e){e.statusAddEdit="loading",e.isLoadingAddEdit=!0})).addCase(f.fulfilled,(function(e){e.statusAddEdit="succeeded",e.isLoadingAddEdit=!1})).addCase(f.rejected,(function(e,t){e.statusAddEdit="failed",e.isLoadingAddEdit=!1,"object"===typeof t.payload?e.errorAddEdit=JSON.stringify(t.payload):e.errorAddEdit=t.payload.message})).addCase(p.pending,(function(e){e.statusAddEdit="loading",e.isLoadingAddEdit=!0})).addCase(p.fulfilled,(function(e){e.statusAddEdit="succeeded",e.isLoadingAddEdit=!1})).addCase(p.rejected,(function(e,t){console.log(t),t.payload.errors?e.errorAddEdit=Object.values(t.payload.errors):t.payload.error_reason&&(e.errorAddEdit=t.payload.message),e.statusAddEdit="failed",e.isLoadingAddEdit=!1})).addCase(m.pending,(function(e){e.statusDelete="loading",e.isLoadingDelete=!0})).addCase(m.fulfilled,(function(e){e.statusDelete="succeeded",e.isLoadingDelete=!1})).addCase(m.rejected,(function(e,t){e.statusDelete="failed",e.isLoadingDelete=!1,e.errorDelete=t.payload.message})).addCase(l.pending,(function(e){e.statusDetail="loading",e.isLoadingDetail=!0,e.selectedUser=null})).addCase(l.fulfilled,(function(e,t){e.statusDetail="succeeded",e.isLoadingDetail=!1,e.selectedUser=t.payload})).addCase(l.rejected,(function(e,t){e.statusDetail="failed",e.isLoadingDetail=!1,e.selectedUser=null,e.errorDetail=t.error.message}))}});t.default=y.reducer}}]);