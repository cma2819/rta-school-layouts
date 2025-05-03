import{u as a,j as t}from"./use-replicant-CqlUPs9_.js";import{n}from"./emotion-styled.browser.esm-Cr9bgKEx.js";const w=n.div`
  font-size: 72px;
  font-weight: bold;
`,r=n.div`
  font-size: 48px;
`,l=n.div`
  font-size: 36px;
`,x=n.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
`,g=n(r)`
  color: #cccc00;
`,m=n(r)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
`,f=()=>{var d;const[e]=a("runDataActiveRun",{bundle:"nodecg-speedcontrol"}),[s]=a("timer",{bundle:"nodecg-speedcontrol"}),o=e==null?void 0:e.teams.flatMap(i=>i.players).map(i=>i.name),c=(s==null?void 0:s.state)==="finished"?g:r;return t.jsxs(x,{children:[t.jsx(m,{style:{gridRow:"1 / 2",gridColumn:"1 / 2"},children:(d=e==null?void 0:e.game)==null?void 0:d.split(" ").map((i,p)=>t.jsx("span",{style:{margin:"0 4px"},children:i},p))}),t.jsxs(l,{style:{gridRow:"2 / 3",gridColumn:"1 / 2"},children:[e==null?void 0:e.category," - ",e==null?void 0:e.estimate]}),t.jsxs(r,{style:{gridRow:"1 / 2",gridColumn:"2 / 3"},children:[t.jsx(l,{style:{display:"inline-block",marginRight:"8px"},children:"r="}),o==null?void 0:o.join(" / ")]}),t.jsxs(c,{style:{gridRow:"2 / 3",gridColumn:" 2 / 3"},children:[t.jsx(l,{style:{display:"inline-block",marginRight:"8px"},children:"t="}),s==null?void 0:s.time]})]})};export{w as G,f as R,l as T};
