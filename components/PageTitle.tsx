import React from 'react';

interface PageTitleProps {
  title?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title = "Gerenciar usuários administradores",
}) => {
  return (
    <h1 className="font-poppins font-medium text-[20px] text-[#142E82] tracking-wide antialiased">
      {title}
    </h1>
  );
};
