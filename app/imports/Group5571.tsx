import svgPaths from "./svg-daottrk12n";

function Group() {
  return (
    <div className="absolute inset-[56.34%_0_22.54%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 338.474 43.1134">
        <g id="Group">
          <path d={svgPaths.p1b222900} fill="var(--fill-0, #142E82)" id="Vector" />
          <path d={svgPaths.p7fd2b80} fill="var(--fill-0, #142E82)" id="Vector_2" />
          <path d={svgPaths.p1ee54d00} fill="var(--fill-0, #142E82)" id="Vector_3" />
          <path d={svgPaths.pcf94600} fill="var(--fill-0, #142E82)" id="Vector_4" />
          <path d={svgPaths.p83b19f0} fill="var(--fill-0, #142E82)" id="Vector_5" />
          <path d={svgPaths.p2d75b780} fill="var(--fill-0, #142E82)" id="Vector_6" />
          <path d={svgPaths.p1234de80} fill="var(--fill-0, #142E82)" id="Vector_7" />
          <path d={svgPaths.p2c678100} fill="var(--fill-0, #142E82)" id="Vector_8" />
          <path d={svgPaths.p22c3c8f0} fill="var(--fill-0, #142E82)" id="Vector_9" />
          <path d={svgPaths.p2b759a80} fill="var(--fill-0, #142E82)" id="Vector_10" />
          <path d={svgPaths.p7dc1200} fill="var(--fill-0, #142E82)" id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[56.34%_0_22.54%_0]" data-name="Group">
      <Group />
    </div>
  );
}

function Camada() {
  return (
    <div className="absolute contents inset-[56.34%_0_22.54%_0]" data-name="Camada 1">
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[89px] top-[174.11px]">
      <div className="absolute css-g0mm18 flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-[168.5px] not-italic text-[#5d657f] text-[20px] text-center top-[189.11px] tracking-[-0.2px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Seja bem-vindo</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-[115px]">
      <Camada />
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0.02%_0_0.05%_-0.04%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.033 90.9381">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p38ab8a00} fill="var(--fill-0, #136DA5)" id="Vector" />
            <path d={svgPaths.p186f9600} fill="var(--fill-0, white)" id="Vector_2" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p1a8e40f0} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.pfda5800} fill="var(--fill-0, white)" id="Vector_4" />
          </g>
          <g id="Group_4">
            <path d={svgPaths.p282bde72} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p1248ee80} fill="var(--fill-0, white)" id="Vector_6" />
          </g>
          <path d={svgPaths.p1dab2e70} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p397cf000} fill="var(--fill-0, #D83941)" id="Vector_8" />
          <g id="Group_5">
            <path d={svgPaths.p1c8cfd00} fill="var(--fill-0, white)" id="Vector_9" />
            <path d={svgPaths.p7d4f9f0} fill="var(--fill-0, #4BB239)" id="Vector_10" />
          </g>
          <g id="Group_6">
            <path d={svgPaths.p5cb6bf0} fill="var(--fill-0, #5F38D6)" id="Vector_11" />
            <path d={svgPaths.pe93fe00} fill="var(--fill-0, white)" id="Vector_12" />
          </g>
          <g id="Group_7">
            <path d={svgPaths.p2b5ecff0} fill="var(--fill-0, #FFB024)" id="Vector_13" />
            <path d={svgPaths.p167c4440} fill="var(--fill-0, #FFB024)" id="Vector_14" />
            <path d={svgPaths.p1034a00} fill="var(--fill-0, #FFB024)" id="Vector_15" />
            <path d={svgPaths.p29f7a300} fill="var(--fill-0, #FFB024)" id="Vector_16" />
            <path d={svgPaths.p167d3d00} fill="var(--fill-0, #FFB024)" id="Vector_17" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Camada1() {
  return (
    <div className="absolute contents inset-[0.02%_0_0.05%_-0.04%]" data-name="Camada 1">
      <Group2 />
    </div>
  );
}

function Ativo() {
  return (
    <div className="absolute h-[91px] left-[133px] overflow-clip top-0 w-[88px]" data-name="Ativo 4 1">
      <Camada1 />
    </div>
  );
}

export default function Group5() {
  return (
    <div className="relative size-full">
      <Group4 />
      <Ativo />
    </div>
  );
}