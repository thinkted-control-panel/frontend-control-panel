import { TextField, InputAdornment, TextFieldProps, IconButton } from '@mui/material';
import { ReactNode, forwardRef, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface TextInputProps extends Omit<TextFieldProps, 'variant'> {
  width?: string;
  height?: string;
  type?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  textColor?: string;
  placeholderColor?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  
  showSearchIcon?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const CustomTextInput = forwardRef<HTMLInputElement, TextInputProps>(({ 
  width = '374px',
  height = '48px',
  type,
  backgroundColor = '#FFFFFF',
  borderColor = '#CDD0DA',
  borderRadius = '8px',
  textColor = '#000000',
  placeholderColor = '#838BA4',
  label,
  error = false,
  helperText,
  
  showSearchIcon = true,
  startIcon,
  endIcon,
  
  placeholder = "Texto",
  fullWidth = false,
  sx,
  InputProps,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ width: fullWidth ? '100%' : width }}>
      {label && (
        <label 
          style={{ 
            display: 'block',
            marginBottom: '8px',
            color: error ? '#d32f2f' : '#000000',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <TextField
        {...rest}
        inputRef={ref}
        placeholder={placeholder}
        fullWidth={fullWidth}
        type={inputType}
        error={error}
        helperText={helperText}
        slotProps={{
          ...InputProps,
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                {startIcon}
              </InputAdornment>
            ) : InputProps?.startAdornment,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  sx={{ color: placeholderColor }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (endIcon || showSearchIcon) ? (
              <InputAdornment position="end">
                {endIcon}
              </InputAdornment>
            ) : InputProps?.endAdornment,
          }
        }}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            height: height,
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: error ? '#d32f2f' : borderColor,
              borderWidth: '1px',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: error ? '#d32f2f' : borderColor,
            },
            '&.Mui-focused': {
              boxShadow: error ? '0 0 0 3px rgba(211, 47, 47, 0.1)' : '0 0 0 3px rgba(25, 118, 210, 0.1)',
              '& fieldset': {
                borderColor: error ? '#d32f2f' : '#1976d2',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
            color: textColor,
            '&::placeholder': {
              color: placeholderColor,
              opacity: 1,
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginTop: '4px',
          },
          ...sx,
        }}
      />
    </div>
  );
});

CustomTextInput.displayName = 'CustomTextInput';