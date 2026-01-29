function Frame() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#838ba4] text-[10px]">
        <p className="css-ew64yg leading-[normal]">Sistemas</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[15px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#838ba4] text-[10px]">
            <p className="css-ew64yg leading-[normal]">/</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#838ba4] text-[10px]">
        <p className="css-ew64yg leading-[normal]">ThinkLIb</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-center relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#11204f] text-[10px]">
        <p className="css-ew64yg leading-[normal]">Itens</p>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="content-stretch flex items-center relative size-full">
      <Frame />
      <Frame2 />
      <Frame3 />
      <Frame2 />
      <Frame1 />
    </div>
  );
}