function Group() {
  return (
    <div className="absolute contents inset-[0_64.29%_0_0]">
      <div className="absolute flex flex-col font-['Poppins:Medium',sans-serif] inset-[0_64.29%_23.08%_0] justify-center leading-[0] not-italic text-[#142e82] text-[20px] text-center tracking-[-0.2px]">
        <p className="css-4hzbpn leading-[normal]">Categoria</p>
      </div>
      <div className="absolute bg-[#142e82] inset-[92.31%_65.58%_0_1.3%]" />
    </div>
  );
}

export default function BarraLib() {
  return (
    <div className="relative size-full" data-name="Barra - lib">
      <div className="absolute flex flex-col font-['Poppins:Regular',sans-serif] inset-[0_40.26%_23.08%_43.51%] justify-center leading-[0] not-italic text-[#5d657f] text-[20px] text-center tracking-[-0.2px]">
        <p className="css-4hzbpn leading-[normal]">Tipo</p>
      </div>
      <div className="absolute flex flex-col font-['Poppins:Regular',sans-serif] inset-[0_0_23.08%_67.53%] justify-center leading-[0] not-italic text-[20px] text-center tracking-[-0.2px]">
        <p className="css-4hzbpn leading-[normal]">Mecânica</p>
      </div>
      <Group />
    </div>
  );
}