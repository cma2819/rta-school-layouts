import{n as s,R as n,u as g,a as d,j as t}from"./use-replicant-Dt5n20As.js";const p=s.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 8px 1fr 8px;
  grid-template-rows: 8px 1fr 8px;
`,i=s.div`
  background-color: #654321;
`,u=s.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  background-color: #004400;
`,j=s.div`
  position: absolute;
  top: 64px;
  right: 24px;
  display: grid;
  grid-template-rows: repeat(8, 64px);
  justify-items: center;
  font-size: 48px;
`,h=s.div`
  writing-mode: vertical-rl;
  margin-top: 36px;
`,m=s.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 240px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`,v=new Date(2025,4,5,0,0,0),f=()=>{const[l,a]=n.useState(!1),[e]=g("assets:logo"),[r,c]=n.useState(null);return d.useEffect(()=>{const o=setInterval(()=>{const x=new Date;a(v.getTime()<=x.getTime())},1e3);return()=>{clearInterval(o)}},[]),d.useEffect(()=>{if(e&&e.length>0){const o=e[0];c(o.url)}},[e]),t.jsxs(p,{children:[t.jsx(i,{style:{gridColumn:"1 / 4",gridRow:"1 / 2"}}),t.jsx(i,{style:{gridColumn:"1 / 2",gridRow:"2 / 3"}}),t.jsx(i,{style:{gridColumn:"3 / 4",gridRow:"2 / 3"}}),t.jsx(i,{style:{gridColumn:"1 / 4",gridRow:"3 / 4"}}),t.jsx(u,{}),t.jsxs(j,{children:[t.jsx("div",{children:"五"}),t.jsx("div",{children:"月"}),t.jsx("div",{}),t.jsx("div",{children:l?"五":"四"}),t.jsx("div",{children:"日"}),t.jsx("div",{}),t.jsx("div",{children:"(木)"}),t.jsx("div",{}),t.jsx("div",{children:"日直"}),t.jsxs(h,{children:["とよ",t.jsx("br",{}),"おふじ"]})]}),t.jsx(m,{children:r&&t.jsx("img",{src:r,alt:"Logo",style:{maxWidth:"100%",maxHeight:"100%"}})})]})};export{f as B};
