"use client"
import { useState } from 'react';
// import svgPaths from '../imports/svg-7i6zbro897';

interface NavBarProps {
  onNavigateToThinkLibAprovacoes?: () => void;
  onNavigateToThinkLibUsuarios?: () => void;
  onNavigateToThinkLibItens?: () => void;
  onNavigateToThinkLibAuditoria?: () => void;
}

export default function NavBar({ 
  onNavigateToThinkLibAprovacoes,
  onNavigateToThinkLibUsuarios,
  onNavigateToThinkLibItens,
  onNavigateToThinkLibAuditoria
}: NavBarProps) {
  const [isThinkLibExpanded, setIsThinkLibExpanded] = useState(false);

  const handleThinkLibClick = () => {
    setIsThinkLibExpanded(!isThinkLibExpanded);
  };

  return (
    <div className="absolute bg-white bottom-[-12px] content-stretch flex h-[726px] items-start justify-center left-0 w-[200px]" data-name="NavBar - tes">
      <div aria-hidden="true" className="absolute border-[#cdd0da] border-r border-solid inset-0 pointer-events-none" />
      
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[177px]">
        {/* Geral */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="home">
                      {/* <path d={svgPaths.p1dc9c0c0} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.5" /> */}
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Geral</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="home"></g>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auditoria */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="home"></g>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Auditoria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Itens */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="home"></g>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Itens</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suporte */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="home"></g>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Suporte</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usuário */}
        <div className="content-stretch flex items-start relative shrink-0 w-[176px]">
          <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="user">
                    <rect fill="var(--fill-0, #FEFEFE)" height="16" rx="8" width="16" />
                    <g id="Vector">
                      {/* <path d={svgPaths.p32c7fa00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
                      <path d={svgPaths.p29a85e00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" /> */}
                    </g>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                <p className="css-4hzbpn leading-[normal]">Usuário</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="chevron-down">
                  {/* <path d={svgPaths.p1cd8c200} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" /> */}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[20px] relative shrink-0 w-[177px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 177 20">
            <g id="Frame 5686">
              <line stroke="var(--stroke-0, #CDD0DA)" x1="16.5" x2="160.5" y1="9.5" y2="9.5" />
            </g>
          </svg>
        </div>

        {/* Sistemas */}
        <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center pl-[12px] py-[10px] relative size-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g clipPath="url(#clip0_1_1575)">
                      <g id="Vector">
                        {/* <path d={svgPaths.p14e7ee00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" />
                        <path d={svgPaths.p3ca15c00} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.2" /> */}
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_1575">
                        <rect fill="white" height="16" width="16" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                  <p className="css-4hzbpn leading-[normal]">Sistemas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GameTEd */}
        <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
          <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="home"></g>
                </svg>
              </div>
              <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                <p className="css-4hzbpn leading-[normal]">GameTEd</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="chevron-down">
                  {/* <path d={svgPaths.p1cd8c200} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" /> */}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ThinkLib - Expandable */}
        <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
          {/* ThinkLib Header */}
          <div 
            className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] pr-[24px] py-[16px] relative rounded-[8px] shrink-0 w-[176px]"
          >
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="home"></g>
                </svg>
              </div>
              <div className={`flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] w-[90px] ${isThinkLibExpanded ? 'text-[#1d43be]' : 'text-[rgba(13,12,11,0.8)]'}`}>
                <p className="css-4hzbpn leading-[normal]">ThinkLib</p>
              </div>
            </div>
            <div 
              className="flex items-center justify-center relative shrink-0 cursor-pointer"
              onClick={handleThinkLibClick}
            >
              <div className={`flex-none transition-transform ${isThinkLibExpanded ? 'rotate-[180deg]' : ''}`}>
                <div className="relative size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g id="chevron-down">
                      {/* <path d={svgPaths.p1cd8c200} stroke={isThinkLibExpanded ? 'var(--stroke-0, #1D43BE)' : 'var(--stroke-0, #0D0C0B)'} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={isThinkLibExpanded ? '1' : '0.8'} /> */}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ThinkLib Subitems */}
          {isThinkLibExpanded && (
            <>
              {/* Aprovações */}
              <div 
                className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[176px] cursor-pointer hover:bg-[#f8fafe]"
                onClick={onNavigateToThinkLibAprovacoes}
              >
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="home"></g>
                    </svg>
                  </div>
                  <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                    <p className="css-4hzbpn leading-[normal]">Aprovações</p>
                  </div>
                </div>
              </div>

              {/* Usuários */}
              <div 
                className="bg-white content-stretch flex gap-[12px] h-[41px] items-center overflow-clip pl-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[176px] cursor-pointer hover:bg-[#f8fafe]"
                onClick={onNavigateToThinkLibUsuarios}
              >
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="home"></g>
                    </svg>
                  </div>
                  <div className="css-g0mm18 flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)]">
                    <p className="css-ew64yg leading-[normal]">Usuários</p>
                  </div>
                </div>
              </div>

              {/* Itens */}
              <div 
                className="bg-white content-stretch flex gap-[12px] h-[41px] items-center overflow-clip pl-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[176px] cursor-pointer hover:bg-[#f8fafe]"
                onClick={onNavigateToThinkLibItens}
              >
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="home"></g>
                    </svg>
                  </div>
                  <div className="css-g0mm18 flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)]">
                    <p className="css-ew64yg leading-[normal]">Itens</p>
                  </div>
                </div>
              </div>

              {/* Auditoria */}
              <div 
                className="bg-white content-stretch flex gap-[12px] h-[41px] items-center overflow-clip pl-[30px] py-[10px] relative rounded-[8px] shrink-0 w-[176px] cursor-pointer hover:bg-[#f8fafe]"
                onClick={onNavigateToThinkLibAuditoria}
              >
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <g id="home"></g>
                    </svg>
                  </div>
                  <div className="css-g0mm18 flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)]">
                    <p className="css-ew64yg leading-[normal]">Auditoria</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ThinkTest */}
        <div className="content-stretch flex items-start relative shrink-0 w-full">
          <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="home"></g>
                </svg>
              </div>
              <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                <p className="css-4hzbpn leading-[normal]">ThinkTest</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="chevron-down">
                  {/* <path d={svgPaths.p1cd8c200} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" /> */}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* GLBoard */}
        <div className="content-stretch flex items-start relative shrink-0 w-full">
          <div className="bg-white content-stretch flex gap-[12px] h-[40px] items-center overflow-clip pl-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[176px]">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="home"></g>
                </svg>
              </div>
              <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(13,12,11,0.8)] w-[90px]">
                <p className="css-4hzbpn leading-[normal]">GLBoard</p>
              </div>
            </div>
            <div className="relative shrink-0 size-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                <g id="chevron-down">
                  {/* <path d={svgPaths.p1cd8c200} stroke="var(--stroke-0, #0D0C0B)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" /> */}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}