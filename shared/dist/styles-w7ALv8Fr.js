import{R as c,u as p,a as l,j as e}from"./use-replicant-CqlUPs9_.js";import{n as t}from"./emotion-styled.browser.esm-Cr9bgKEx.js";const h=t.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 8px 1fr 8px;
  grid-template-rows: 8px 1fr 8px;
`,i=t.div`
  background-color: #654321;
`,u=t.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  background-color: #004400;
`,m=t.div`
  position: absolute;
  top: 64px;
  right: 24px;
  display: grid;
  grid-template-rows: repeat(8, 64px);
  justify-items: center;
  font-size: 48px;
  color: #cccccc;
`,j=t.div`
  writing-mode: vertical-rl;
  margin-top: 36px;
`,f=t.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 240px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`,y=new Date(2026,4,5,0,0,0),v=new Date(2026,4,6,0,0,0),x={1:{char:"四",dayOfWeek:"月"},2:{char:"五",dayOfWeek:"火"},3:{char:"六",dayOfWeek:"水"}},R=()=>{const[n,r]=c.useState(1),[s]=p("assets:logo"),[a,g]=c.useState(null);return l.useEffect(()=>{const o=setInterval(()=>{const d=new Date;d.getTime()>=v.getTime()?r(3):d.getTime()>=y.getTime()?r(2):r(1)},1e3);return()=>{clearInterval(o)}},[]),l.useEffect(()=>{if(s&&s.length>0){const o=s[0];g(o.url)}},[s]),e.jsxs(h,{children:[e.jsx(i,{style:{gridColumn:"1 / 4",gridRow:"1 / 2"}}),e.jsx(i,{style:{gridColumn:"1 / 2",gridRow:"2 / 3"}}),e.jsx(i,{style:{gridColumn:"3 / 4",gridRow:"2 / 3"}}),e.jsx(i,{style:{gridColumn:"1 / 4",gridRow:"3 / 4"}}),e.jsx(u,{}),e.jsxs(m,{children:[e.jsx("div",{children:"五"}),e.jsx("div",{children:"月"}),e.jsx("div",{}),e.jsx("div",{children:x[n].char}),e.jsx("div",{children:"日"}),e.jsx("div",{}),e.jsxs("div",{children:["(",x[n].dayOfWeek,")"]}),e.jsx("div",{}),e.jsx("div",{children:"日直"}),e.jsx(j,{children:e.jsx("br",{})})]}),e.jsx(f,{children:a&&e.jsx("img",{src:a,alt:"Logo",style:{maxWidth:"100%",maxHeight:"100%"}})})]})};export{R as B};
