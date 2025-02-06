"use strict";exports.id=410,exports.ids=[410],exports.modules={671:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},3645:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}});let n=a(9929),r=a(8732),l=n._(a(2015)),s=a(2811);async function o(e){let{Component:t,ctx:a}=e;return{pageProps:await (0,s.loadGetInitialProps)(t,a)}}class i extends l.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,r.jsx)(e,{...t})}}i.origGetInitialProps=o,i.getInitialProps=o,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2294:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.d(t,{Ay:()=>m,Rs:()=>d,Ti:()=>h});var r=a(8732),l=a(2015),s=a(4822),o=a(5420),i=a(8430),c=a(5981),u=e([o,i,c]);[o,i,c]=u.then?(await u)():u;let d=(0,l.createContext)(null),h=(0,l.createContext)(null),m=function({firstCache:e,totalPages:t}){let[a,n]=(0,l.useState)({firstName:"",lastName:"",email:"",token:""}),[u,m]=(0,l.useState)([]),p=()=>{n({firstName:"",lastName:"",email:"",token:""})};return(0,r.jsx)("div",{className:"App",children:(0,r.jsx)(d.Provider,{value:a,children:(0,r.jsx)(h.Provider,{value:u,children:(0,r.jsx)(s.BrowserRouter,{children:(0,r.jsxs)(s.Routes,{children:[(0,r.jsx)(s.Route,{path:"/",element:(0,r.jsx)(o.default,{onLogin:e=>{n({firstName:e.user.firstName,lastName:e.user.lastName,email:e.user.email,token:e.Authorization})},onSignup:e=>{n({firstName:e.user.firstName,lastName:e.user.lastName,email:e.user.email,token:e.Authorization})},onLogout:p})}),(0,r.jsx)(s.Route,{path:"/main",element:(0,r.jsx)(i.default,{onLogout:p,onAddJob:e=>{m([...u,e]),console.log(u)}})}),(0,r.jsx)(s.Route,{path:"/joblist",element:(0,r.jsx)(c.default,{firstCache:e,pages:t})})]})})})})})};n()}catch(e){n(e)}})},4721:(e,t,a)=>{a.d(t,{A:()=>r});var n=a(8732);let r=({job:e})=>(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:e.title}),(0,n.jsx)("p",{children:e.description}),(0,n.jsx)("p",{children:e.pay})]})},707:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.d(t,{A:()=>c});var r=a(8732),l=a(2015),s=a(1428),o=a(4822),i=e([s]);s=(i.then?(await i)():i)[0];let c=({onLogin:e})=>{let[t,a]=(0,l.useState)({email:"",password:""}),n=(0,o.useNavigate)(),i=e=>{a({...t,[e.target.name]:e.target.value})},c=async r=>{r.preventDefault();try{console.log(t),await s.default.post("http://localhost:3001/api/login",t).then(t=>{console.log(t.data),e(t.data),n("/main"),a({email:"",password:""})})}catch(t){let e=t.response.data.error;alert(e),console.error("Error logging in:",t)}};return(0,r.jsxs)("div",{className:"login",children:[(0,r.jsx)("h1",{children:"Login"}),(0,r.jsxs)("form",{onSubmit:c,children:[(0,r.jsx)("label",{htmlFor:"email",children:"Email:"}),(0,r.jsx)("input",{type:"email",name:"email",value:t.email,onChange:i,required:!0}),(0,r.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,r.jsx)("input",{type:"password",name:"password",value:t.password,onChange:i,required:!0}),(0,r.jsx)("button",{type:"submit",children:"Login"})]})]})};n()}catch(e){n(e)}})},5082:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.d(t,{A:()=>u});var r=a(8732),l=a(1428),s=a(2294),o=a(2015),i=a(4822),c=e([l,s]);[l,s]=c.then?(await c)():c;let u=({onLogout:e})=>{let t=(0,o.useContext)(s.Rs),a=(0,i.useNavigate)(),n=async n=>{n.preventDefault();try{await l.default.post("http://localhost:3001/api/logout",{},{headers:{Authorization:`Bearer ${t.token}`}}).then(()=>{e(),a("/")})}catch(t){let e=t.response.data.error;alert(e),console.error("Error logging out:",t)}};return(0,r.jsx)("div",{className:"logout",children:(0,r.jsx)("button",{onClick:n,children:"Logout"})})};n()}catch(e){n(e)}})},2518:(e,t,a)=>{a.d(t,{A:()=>l});var n=a(8732);a(2015);var r=a(4822);let l=()=>(0,n.jsx)("nav",{children:(0,n.jsxs)("ul",{children:[(0,n.jsx)("li",{children:(0,n.jsx)(r.Link,{to:"/main",children:"Main"})}),(0,n.jsx)("li",{children:(0,n.jsx)(r.Link,{to:"/joblist",children:"Job List"})})]})})},9800:(e,t,a)=>{a.d(t,{A:()=>r});var n=a(8732);let r=({activePage:e,onPageChange:t,totalPages:a,paginationRange:r})=>(0,n.jsxs)("div",{className:"pagination",children:[(0,n.jsx)("button",{name:"first",onClick:()=>t(1),children:"First"}),(0,n.jsx)("button",{name:"previous",onClick:()=>t(e-1),children:"Previous"}),r.map(a=>(0,n.jsx)("button",{name:"page-"+a,style:{fontWeight:a===e?"bold":"normal"},onClick:()=>t(a),children:a},a)),(0,n.jsx)("button",{name:"next",onClick:()=>t(e+1),children:"Next"}),(0,n.jsx)("button",{name:"last",onClick:()=>t(a),children:"Last"})]})},4359:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.d(t,{A:()=>c});var r=a(8732),l=a(1428),s=a(2015),o=a(2294),i=e([l,o]);[l,o]=i.then?(await i)():i;let c=({onAddJob:e})=>{let t=(0,s.useContext)(o.Rs),[a,n]=(0,s.useState)({title:"",time:"",description:"",payment:"",location:""}),[i,c]=(0,s.useState)(!1),u=async e=>{n({...a,[e.target.name]:e.target.value})},d=async r=>{r.preventDefault();try{await l.default.post("http://localhost:3001/api/postjob",a,{headers:{Authorization:`Bearer ${t.token}`}}).then(t=>{let r=t.data;console.log("NEW JOB: ",r),e(r),console.log("NEW JOB: ",r),n({title:"",time:"",description:"",payment:"",location:""}),console.log("DATA: ",a),c(!1),console.log("IS POSTING: ",i)})}catch(t){let e=t.response.data.error;alert(e),console.error("Error posting job:",t),c(!1)}};return(0,r.jsxs)(r.Fragment,{children:[!i&&(0,r.jsx)("button",{onClick:()=>c(!0),children:"Post a Job"}),i&&(0,r.jsxs)("div",{className:"post-job",children:[(0,r.jsx)("h1",{children:"Post a Job"}),(0,r.jsxs)("form",{onSubmit:d,children:[(0,r.jsx)("label",{htmlFor:"title",children:"Title:"}),(0,r.jsx)("input",{type:"text",name:"title",value:a.title,onChange:u,required:!0}),(0,r.jsx)("label",{htmlFor:"time",children:"Time:"}),(0,r.jsx)("input",{type:"text",name:"time",value:a.time,onChange:u,required:!0}),(0,r.jsx)("label",{htmlFor:"description",children:"Description:"}),(0,r.jsx)("input",{type:"text",name:"description",value:a.description,onChange:u,required:!0}),(0,r.jsx)("label",{htmlFor:"payment",children:"Payment:"}),(0,r.jsx)("input",{type:"text",name:"payment",value:a.payment,onChange:u,required:!0}),(0,r.jsx)("label",{htmlFor:"location",children:"Location:"}),(0,r.jsx)("input",{type:"text",name:"location",value:a.location,onChange:u,required:!0}),(0,r.jsx)("button",{type:"submit",children:"Post"}),(0,r.jsx)("button",{onClick:e=>{e.preventDefault(),n({title:"",time:"",description:"",payment:"",location:""}),c(!1)},children:"Cancel"})]})]})]})};n()}catch(e){n(e)}})},1740:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.d(t,{A:()=>i});var r=a(8732),l=a(2015),s=a(1428),o=e([s]);s=(o.then?(await o)():o)[0];let i=({onSignup:e})=>{let[t,a]=(0,l.useState)({firstName:"",lastName:"",email:"",password:""}),n=e=>{a({...t,[e.target.name]:e.target.value})},o=async n=>{n.preventDefault();try{console.log(t),await s.default.post("http://localhost:3001/api/signup",t).then(t=>{e(t.data),a({firstName:"",lastName:"",email:"",password:""})})}catch(t){let e=t.response.data.error;alert(e),console.error("Error signing up:",t)}};return(0,r.jsxs)("div",{className:"signup",children:[(0,r.jsx)("h1",{children:"Sign Up"}),(0,r.jsxs)("form",{onSubmit:o,children:[(0,r.jsx)("label",{htmlFor:"firstName",children:"First Name:"}),(0,r.jsx)("input",{type:"text",name:"firstName",value:t.firstName,onChange:n,required:!0}),(0,r.jsx)("label",{htmlFor:"lastName",children:"Last Name:"}),(0,r.jsx)("input",{type:"text",name:"lastName",value:t.lastName,onChange:n,required:!0}),(0,r.jsx)("label",{htmlFor:"email",children:"Email:"}),(0,r.jsx)("input",{type:"email",name:"email",value:t.email,onChange:n,required:!0}),(0,r.jsx)("label",{htmlFor:"password",children:"Password:"}),(0,r.jsx)("input",{type:"password",name:"password",value:t.password,onChange:n,required:!0}),(0,r.jsx)("button",{type:"submit",children:"Signup"})]})]})};n()}catch(e){n(e)}})},5420:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{default:()=>u});var r=a(8732),l=a(2015),s=a(1740),o=a(707),i=a(2294),c=e([s,o,i]);[s,o,i]=c.then?(await c)():c;let u=({onLogin:e,onSignup:t})=>{let a=(0,l.useContext)(i.Rs);return(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"Welcome to Job-Jar!"}),!a?.email&&(0,r.jsx)(s.A,{onSignup:t}),!a?.email&&(0,r.jsx)(o.A,{onLogin:e})]})};n()}catch(e){n(e)}})},5981:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{default:()=>d});var r=a(8732),l=a(2015),s=a(4721),o=a(2294),i=a(1428),c=a(9800),u=e([o,i]);[o,i]=u.then?(await u)():u;let d=({pages:e,firstCache:t})=>{let a=(0,l.useContext)(o.Ti),[n,u]=(0,l.useState)(a),[d,h]=(0,l.useState)(1),[m,p]=(0,l.useState)(e),x=(0,l.useRef)(t);(0,l.useEffect)(()=>{let e=async e=>{try{let e=j(d,m),t={...x.current};for(let a=0;a<e.length;a++){let n=e[a];x.current[n]||await i.default.get(`http://localhost:3001/jobs?page=${n}`).then(e=>{t[n]=e.data.jobs})}x.current=t}catch(e){console.error("Error fetching jobs:",e)}};0!==m&&(x.current[d]?(u(x.current[d].jobs),e(d)):i.default.get(`http://localhost:3001/jobs?page=${d}`).then(t=>{let a=t.data.totalJobs,n=Math.ceil(a/10);p(n),u(t.data.jobs),e(d)}))},[d,m]);let j=(e,t)=>{let a=Math.max(1,e-2),n=Math.min(t,e+2);return e<3?n=Math.min(t,5):e>t-2&&(a=Math.max(1,t-5+1)),Array.from({length:n-a+1},(e,t)=>a+t)},g=j(d,m);return(0,r.jsxs)("div",{children:[n?.map(e=>r.jsx(s.A,{job:e},e.id)),(0,r.jsx)(c.A,{activePage:d,totalPages:m,onPageChange:function(e){e<1||e>m||h(e)},paginationRange:g})]})};n()}catch(e){n(e)}})},8430:(e,t,a)=>{a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{default:()=>d});var r=a(8732),l=a(2015),s=a(5082),o=a(2294),i=a(2518),c=a(4359),u=e([s,o,c]);[s,o,c]=u.then?(await u)():u;let d=({onLogout:e,onAddJob:t})=>{let a=(0,l.useContext)(o.Rs);return(0,r.jsxs)("div",{children:[(0,r.jsx)(i.A,{}),(0,r.jsxs)("h1",{children:["Hi ",a?.firstName]}),(0,r.jsx)("h1",{children:"Welcome to Job-Jar!"}),(0,r.jsx)(c.A,{onAddJob:t}),(0,r.jsx)(s.A,{onLogout:e})]})};n()}catch(e){n(e)}})},9455:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return a}});var a=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})}};