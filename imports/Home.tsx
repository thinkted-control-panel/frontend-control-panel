import { useState, useRef, useEffect } from 'react';
import svgPaths from "./svg-7i6zbro897";
import InteractiveNavbarWithThinkLib from '../components/InteractiveNavbarWithThinkLib';

function Frame1() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-[calc(50%-459px)] py-[10px] top-[102px] w-[198px]">
      <div className="css-g0mm18 flex flex-col font-['Arial_Rounded_MT_Bold:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d43be] text-[22px] tracking-[-0.22px]">
        <p className="css-ew64yg leading-[normal]">Dashboard Geral</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[calc(50%-459px)] top-[154px]">
      <div className="absolute bg-white border border-[#d2d2d2] border-solid left-[calc(50%-459px)] rounded-[12px] size-[250px] top-[154px]" />
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%-133px)] not-italic text-[14px] text-center top-[178.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 1</p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[calc(50%-459px)] top-[154px]">
      <div className="absolute bg-white border border-[#d2d2d2] border-solid left-[calc(50%-179px)] rounded-[12px] size-[250px] top-[154px]" />
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%-133px)] not-italic text-[#706f6f] text-[14px] text-center top-[178.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 2</p>
      </div>
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%+141px)] not-italic text-[#706f6f] text-[14px] text-center top-[178.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 3</p>
      </div>
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[calc(50%+415.5px)] not-italic text-[#706f6f] text-[14px] text-center top-[178.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 4</p>
      </div>
      <div className="absolute bg-white border border-[#d2d2d2] border-solid left-[calc(50%+369px)] rounded-[12px] size-[250px] top-[154px]" />
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[250px] left-[calc(50%-70px)] rounded-[12px] top-[432px] w-[689px]" />
      <div className="absolute bg-white border border-[#d2d2d2] border-solid h-[250px] left-[calc(50%-459px)] rounded-[12px] top-[432px] w-[356px]" />
      <div className="absolute bg-white border border-[#d2d2d2] border-solid left-[calc(50%+95px)] rounded-[12px] size-[250px] top-[154px]" />
      <Group4 />
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[calc(50%-412.5px)] not-italic text-[#706f6f] text-[14px] text-center top-[461.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 6</p>
      </div>
      <div className="absolute css-g0mm18 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] left-[calc(50%-24px)] not-italic text-[#706f6f] text-[14px] text-center top-[461.5px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[normal]">Gráfico 5</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0e1428] text-[12px]">
        <p className="css-ew64yg leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function Frame14() {
  return <div className="h-[24px] shrink-0 w-0" />;
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex h-[24px] items-center left-[calc(50%-459px)] top-[66px] w-[171px]">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="home">
          <path d={svgPaths.p1dc9c0c0} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Geral</p>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <g id="Vector"></g>
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
          <Frame2 />
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Home1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <LayoutDashboard size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home1 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d43be] text-[14px] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Dashboard</p>
      </div>
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] pr-[24px] py-[16px] relative size-full">
          <Frame4 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <ChevronDown1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <FileSearch size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home2 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Auditoria</p>
      </div>
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar2() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
          <Frame3 />
          <ChevronDown2 />
        </div>
      </div>
    </div>
  );
}

function Home3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <Package size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home3 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Itens</p>
      </div>
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar3() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
          <Frame5 />
          <ChevronDown3 />
        </div>
      </div>
    </div>
  );
}

function Home4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <HelpCircle size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home4 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Suporte</p>
      </div>
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down"></g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar4() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
          <Frame6 />
          <ChevronDown4 />
        </div>
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="user">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="user">
          <rect fill="var(--fill-0, #FEFEFE)" height="16" rx="8" width="16" />
          <g id="Vector">
            <path d={svgPaths.p32c7fa00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
            <path d={svgPaths.p29a85e00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <User />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Usuário</p>
      </div>
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path d={svgPaths.p1cd8c200} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar5() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]" data-name="Componente principal - navbar">
      <Frame7 />
      <ChevronDown5 />
    </div>
  );
}

function NavbarUsuarips() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[176px]" data-name="Navbar - usuárips">
      <ComponentePrincipalNavbar5 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[177px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 177 20">
        <g id="Frame 5686">
          <line id="Line 67" stroke="var(--stroke-0, #CDD0DA)" x1="16.5" x2="160.5" y1="9.5" y2="9.5" />
        </g>
      </svg>
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="setting">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_1575)" id="setting">
          <g id="Vector">
            <path d={svgPaths.p14e7ee00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
            <path d={svgPaths.p3ca15c00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_1575">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Setting />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">Sistemas</p>
      </div>
    </div>
  );
}

function ComponentePrincipalNavbar6() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Componente principal - navbar">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Home5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <Gamepad2 size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home5 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">GameTEd</p>
      </div>
    </div>
  );
}

function ChevronDown6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path d={svgPaths.p1cd8c200} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar7() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]" data-name="Componente principal - navbar">
      <Frame9 />
      <ChevronDown6 />
    </div>
  );
}

function NavbarGameTEd() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full" data-name="Navbar GameTEd">
      <ComponentePrincipalNavbar7 />
    </div>
  );
}

function Home6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <BookOpen size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home6 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">ThinkLib</p>
      </div>
    </div>
  );
}

function ChevronDown7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path d={svgPaths.p1cd8c200} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar8() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]" data-name="Componente principal - navbar">
      <Frame10 />
      <ChevronDown7 />
    </div>
  );
}

function NavbarThinkLib() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navbar ThinkLib">
      <ComponentePrincipalNavbar8 />
    </div>
  );
}

function Home7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <FileCheck size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home7 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">ThinkTest</p>
      </div>
    </div>
  );
}

function ChevronDown8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path d={svgPaths.p1cd8c200} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar9() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]" data-name="Componente principal - navbar">
      <Frame11 />
      <ChevronDown8 />
    </div>
  );
}

function NavbarThinkTest() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navbar ThinkTest">
      <ComponentePrincipalNavbar9 />
    </div>
  );
}

function Home8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="home">
      <BarChart3 size={16} className="text-[rgba(13,12,11,0.8)]" strokeWidth={1.5} />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Home8 />
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
        <p className="css-4hzbpn leading-[normal]">GLBoard</p>
      </div>
    </div>
  );
}

function ChevronDown9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron-down">
          <path d={svgPaths.p1cd8c200} id="Vector" stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
}

function ComponentePrincipalNavbar10() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]" data-name="Componente principal - navbar">
      <Frame12 />
      <ChevronDown9 />
    </div>
  );
}

function NavbarGlBoard() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navbar - GLBoard">
      <ComponentePrincipalNavbar10 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[177px]">
      <ComponentePrincipalNavbar />
      <ComponentePrincipalNavbar1 />
      <ComponentePrincipalNavbar2 />
      <ComponentePrincipalNavbar3 />
      <ComponentePrincipalNavbar4 />
      <NavbarUsuarips />
      <Frame19 />
      <ComponentePrincipalNavbar6 />
      <NavbarGameTEd />
      <NavbarThinkLib />
      <NavbarThinkTest />
      <NavbarGlBoard />
    </div>
  );
}

function NavbarTes() {
  return (
    <div className="absolute bg-white bottom-[-12px] content-stretch flex h-[726px] items-start justify-center left-0 w-[200px]" data-name="navbar - tes">
      <div aria-hidden="true" className="absolute border-[#cdd0da] border-r border-solid inset-0 pointer-events-none" />
      <Frame16 />
    </div>
  );
}

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

function Group6() {
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
      <Group6 />
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
            <mask fill="white" id="path-6-inside-1_1_1490">
              <path d={svgPaths.p303a0780} />
            </mask>
            <path d={svgPaths.p303a0780} fill="var(--fill-0, #815F18)" />
            <path d={svgPaths.p36369700} fill="var(--stroke-0, #815F18)" mask="url(#path-6-inside-1_1_1490)" />
          </g>
          <path d={svgPaths.pb9896f} id="Vector 38" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
          <g id="Group 1548">
            <path d={svgPaths.p1207de00} id="Vector 36" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
          </g>
          <path d={svgPaths.p17bcc800} id="Vector 37" stroke="var(--stroke-0, #815F18)" strokeLinecap="round" strokeWidth="0.939395" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[normal] not-italic relative shrink-0 w-[82px]">
      <p className="css-ew64yg font-['Poppins:Medium',sans-serif] relative shrink-0 text-[#11204f] text-[14px] text-center tracking-[0.49px]">Marcela P.</p>
      <p className="css-4hzbpn font-['Poppins:Regular',sans-serif] min-w-full relative shrink-0 text-[#5d657f] text-[8px] tracking-[0.28px] w-[min-content]">Super adimin</p>
    </div>
  );
}

function ChevronDown10() {
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

function PerfilPai({ onLogout }: { onLogout?: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Perfil - pai" ref={dropdownRef}>
      <Group3 />
      <Frame17 />
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="cursor-pointer transition-opacity hover:opacity-70"
        aria-label="Menu do usuário"
      >
        <ChevronDown10 />
      </button>
      
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-[calc(100%+8px)] right-0 bg-white rounded-[8px] shadow-lg border border-[#cdd0da] min-w-[160px] z-50 overflow-hidden">
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              onLogout?.();
            }}
            className="w-full px-[16px] py-[12px] text-left font-['Poppins:Regular',sans-serif] text-[14px] text-[#5d657f] hover:bg-[#f8fafe] transition-colors duration-200 flex items-center gap-[8px]"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

function Frame18({ onLogout }: { onLogout?: () => void }) {
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
      <PerfilPai onLogout={onLogout} />
    </div>
  );
}

function NabvarPai({ onLogout }: { onLogout?: () => void }) {
  return (
    <div className="absolute bg-white content-stretch flex h-[54px] items-center justify-between left-0 px-[25px] py-[8px] top-0 w-[1366px]" data-name="Nabvar - pai">
      <div aria-hidden="true" className="absolute border-[#cdd0da] border-b border-solid inset-0 pointer-events-none" />
      <Frame />
      <Frame18 onLogout={onLogout} />
    </div>
  );
}

export default function Home9({ 
  onNavigateToThinkLibAprovacoes,
  onNavigateToThinkLibUsuarios,
  onNavigateToThinkLibItens,
  onNavigateToThinkLibAuditoria,
  onLogout
}: { 
  onNavigateToThinkLibAprovacoes?: () => void;
  onNavigateToThinkLibUsuarios?: () => void;
  onNavigateToThinkLibItens?: () => void;
  onNavigateToThinkLibAuditoria?: () => void;
  onLogout?: () => void;
}) {
  return (
    <div className="bg-[#f8fafe] relative size-full" data-name="Home">
      <Frame1 />
      <Group5 />
      <Frame15 />
      <InteractiveNavbarWithThinkLib 
        onNavigateToThinkLibAprovacoes={onNavigateToThinkLibAprovacoes}
        onNavigateToThinkLibUsuarios={onNavigateToThinkLibUsuarios}
        onNavigateToThinkLibItens={onNavigateToThinkLibItens}
        onNavigateToThinkLibAuditoria={onNavigateToThinkLibAuditoria}
      />
      <NabvarPai onLogout={onLogout} />
    </div>
  );
}