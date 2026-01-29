import svgPaths from "./svg-14830wliev";

function Group() {
  return (
    <div className="col-1 h-[15.586px] ml-0 mt-0 relative row-1 w-[122.358px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 122.358 15.5857">
        <g id="Group">
          <path d={svgPaths.pa28dd80} fill="var(--fill-0, #142E82)" id="Vector" />
          <path d={svgPaths.p26413000} fill="var(--fill-0, #142E82)" id="Vector_2" />
          <path d={svgPaths.p10d60400} fill="var(--fill-0, #142E82)" id="Vector_3" />
          <path d={svgPaths.p2bf97780} fill="var(--fill-0, #142E82)" id="Vector_4" />
          <path d={svgPaths.p35c86400} fill="var(--fill-0, #142E82)" id="Vector_5" />
          <path d={svgPaths.p29670d80} fill="var(--fill-0, #142E82)" id="Vector_6" />
          <path d={svgPaths.p149cc100} fill="var(--fill-0, #142E82)" id="Vector_7" />
          <path d={svgPaths.p3e174780} fill="var(--fill-0, #142E82)" id="Vector_8" />
          <path d={svgPaths.p23aa1500} fill="var(--fill-0, #142E82)" id="Vector_9" />
          <path d={svgPaths.p22af8180} fill="var(--fill-0, #142E82)" id="Vector_10" />
          <path d={svgPaths.p2cb5ccf0} fill="var(--fill-0, #142E82)" id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1" data-name="Group">
      <Group />
    </div>
  );
}

function Camada() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[17.72%] mt-[6.87%] relative row-1" data-name="Camada 1">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 h-[19.727px] ml-0 mt-0 relative row-1 w-[19.096px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0956 19.7257">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p139c6340} fill="var(--fill-0, #136DA5)" id="Vector" />
            <path d={svgPaths.p23ed0200} fill="var(--fill-0, white)" id="Vector_2" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p34e91000} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.pdd65500} fill="var(--fill-0, white)" id="Vector_4" />
          </g>
          <g id="Group_4">
            <path d={svgPaths.p3c430a70} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p3196e850} fill="var(--fill-0, white)" id="Vector_6" />
          </g>
          <path d={svgPaths.padee080} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p2af50500} fill="var(--fill-0, #D83941)" id="Vector_8" />
          <g id="Group_5">
            <path d={svgPaths.p27993d00} fill="var(--fill-0, white)" id="Vector_9" />
            <path d={svgPaths.p21cf3200} fill="var(--fill-0, #4BB239)" id="Vector_10" />
          </g>
          <g id="Group_6">
            <path d={svgPaths.p15982000} fill="var(--fill-0, #5F38D6)" id="Vector_11" />
            <path d={svgPaths.p1cc37700} fill="var(--fill-0, white)" id="Vector_12" />
          </g>
          <g id="Group_7">
            <path d={svgPaths.pa332600} fill="var(--fill-0, #FFB024)" id="Vector_13" />
            <path d={svgPaths.p36980f80} fill="var(--fill-0, #FFB024)" id="Vector_14" />
            <path d={svgPaths.p2ff77780} fill="var(--fill-0, #FFB024)" id="Vector_15" />
            <path d={svgPaths.p1c3a3700} fill="var(--fill-0, #FFB024)" id="Vector_16" />
            <path d={svgPaths.p1ab5ec00} fill="var(--fill-0, #FFB024)" id="Vector_17" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Camada1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1" data-name="Camada 1">
      <Group2 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Camada />
      <Camada1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-white content-stretch flex h-[33.412px] items-center relative shrink-0 w-[151px]">
      <Group4 />
    </div>
  );
}

function Notificacao() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Notificação">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="NotificaÃ§Ã£o">
          <g id="bell">
            <path d={svgPaths.p22a65280} id="Vector" stroke="var(--stroke-0, #838BA4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
          <circle cx="17" cy="7" fill="var(--fill-0, #58B24D)" id="Ellipse 250" r="3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[31px] relative shrink-0 w-[29.92px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9197 31">
        <g id="Group 4632">
          <ellipse cx="14.9599" cy="15.5" fill="var(--fill-0, #EAAE31)" id="Ellipse 125" rx="14.9598" ry="15.5" />
          <path d={svgPaths.p28839d40} fill="var(--fill-0, #815F18)" id="Ellipse 71" />
          <path d={svgPaths.p1bcf61f0} fill="var(--fill-0, #815F18)" id="Ellipse 72" />
          <rect fill="var(--fill-0, #815F18)" height="0.301224" id="Rectangle 349" rx="0.150612" stroke="var(--stroke-0, #815F18)" strokeWidth="0.301224" width="4.61977" x="18.6541" y="13.2045" />
          <rect fill="var(--fill-0, #815F18)" height="0.903673" id="Rectangle 352" rx="0.451836" stroke="var(--stroke-0, #815F18)" strokeWidth="0.903673" width="4.01732" x="18.9553" y="10.6933" />
          <g id="Rectangle 350">
            <mask fill="white" id="path-6-inside-1_2_5195">
              <path d={svgPaths.p303a0780} />
            </mask>
            <path d={svgPaths.p303a0780} fill="var(--fill-0, #815F18)" />
            <path d={svgPaths.p36369700} fill="var(--stroke-0, #815F18)" mask="url(#path-6-inside-1_2_5195)" />
          </g>
          <path d={svgPaths.pb9896f} id="Vector 38" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
          <g id="Group 1548">
            <path d={svgPaths.p2fd09f80} id="Vector 36" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
          </g>
          <path d={svgPaths.p17bcc800} id="Vector 37" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 w-[82px]">
      <p className="css-ew64yg font-['Poppins:Medium',sans-serif] relative shrink-0 text-[#11204f] text-[14px] text-center tracking-[0.49px]">Marcela P.</p>
      <p className="css-4hzbpn font-['Poppins:Regular',sans-serif] min-w-full relative shrink-0 text-[#5d657f] text-[8px] tracking-[0.28px] w-[min-content]">Super adimin</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="chevron-down">
          <path d={svgPaths.p3bda5610} id="Vector" stroke="var(--stroke-0, #706F6F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
        </g>
      </svg>
    </div>
  );
}

function PerfilPai() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Perfil - pai">
      <Group3 />
      <Frame1 />
      <ChevronDown />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Notificacao />
      <div className="flex h-[24px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[24px]" data-name="Vector">
            <div className="absolute inset-[-0.5px_-2.08%]" style={{ "--stroke-0": "rgba(205, 208, 218, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 1">
                <path d="M0.5 0.5H24.5" id="Vector" stroke="var(--stroke-0, #CDD0DA)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <PerfilPai />
    </div>
  );
}

export default function NabvarPai() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[25px] py-[8px] relative size-full" data-name="Nabvar - pai">
      <div aria-hidden="true" className="absolute border-[#cdd0da] border-b border-solid inset-0 pointer-events-none" />
      <Frame />
      <Frame2 />
    </div>
  );
}