import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: number;
  isLoading?: boolean;
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      variant = 'outline',
      fullWidth = false,
      width = '376px',
      height = '48px',
      backgroundColor,
      textColor,
      borderColor,
      borderRadius = '6px',
      fontSize = '18.569px',
      fontWeight = 400,
      isLoading = false,
      className = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: backgroundColor || '#1d43be',
            textColor: textColor || '#ffffff',
            borderColor: borderColor || '#1d43be',
          };
        case 'secondary':
          return {
            backgroundColor: backgroundColor || '#838BA4',
            textColor: textColor || '#ffffff',
            borderColor: borderColor || '#838BA4',
          };
        case 'outline':
        default:
          return {
            backgroundColor: backgroundColor || '#ffffff',
            textColor: textColor || '#1d43be',
            borderColor: borderColor || '#1d43be',
          };
      }
    };

    const variantStyles = getVariantStyles();
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`relative transition-all duration-200 cursor-pointer ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
        } ${className}`}
        style={{
          width: fullWidth ? '100%' : width,
          height: height,
          backgroundColor: variantStyles.backgroundColor,
          border: `1px solid ${variantStyles.borderColor}`,
          borderRadius: borderRadius,
          fontFamily: "'Poppins', sans-serif",
          fontSize: fontSize,
          fontWeight: fontWeight,
          color: variantStyles.textColor,
          letterSpacing: '0.6499px',
        }}
        {...rest}
      >
        <div className="flex items-center justify-center h-full">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Carregando...</span>
            </div>
          ) : (
            children
          )}
        </div>
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';
