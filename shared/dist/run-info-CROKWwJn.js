import{u as d,j as t}from"./use-replicant-CqlUPs9_.js";import{n}from"./emotion-styled.browser.esm-Cr9bgKEx.js";const w=n.div`
  font-size: 72px;
  font-weight: bold;
`,i=n.div`
  font-size: 48px;
`,c=n.div`
  font-size: 36px;
`,x=n.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
`,g=n(i)`
  color: #cccc00;
`,m=n(i)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
`,f=()=>{var l;const[e]=d("runDataActiveRun",{bundle:"nodecg-speedcontrol"}),[s]=d("timer",{bundle:"nodecg-speedcontrol"}),r=e==null?void 0:e.teams.flatMap(o=>o.players).map(o=>o.name),a=(s==null?void 0:s.state)==="finished"?g:i;return t.jsxs(x,{children:[t.jsx(m,{style:{gridRow:"1 / 2",gridColumn:"1 / 2"},children:(l=e==null?void 0:e.game)==null?void 0:l.split(" ").map((o,p)=>t.jsx("span",{style:{margin:"0 4px"},children:o},p))}),t.jsxs(c,{style:{gridRow:"2 / 3",gridColumn:"1 / 2"},children:[e==null?void 0:e.category," - ",e==null?void 0:e.estimate]}),t.jsxs(i,{style:{gridRow:"1 / 2",gridColumn:"2 / 3"},children:[t.jsx(c,{style:{display:"inline-block",marginRight:"8px",color:"#cccccc"},children:"r="}),r==null?void 0:r.join(" / ")]}),t.jsxs(a,{style:{gridRow:"2 / 3",gridColumn:" 2 / 3"},children:[t.jsx(c,{style:{display:"inline-block",marginRight:"8px",color:"#cccccc"},children:"t="}),s==null?void 0:s.time]})]})};export{w as G,f as R,c as T};
