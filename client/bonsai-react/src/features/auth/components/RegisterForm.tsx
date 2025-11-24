import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography } from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import { useZodErrorTranslation } from '@/utils/zod-i18n';
import { maskCPFCNPJ, maskPhone } from '@/utils/input-masks';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schemas';

interface RegisterFormProps {
  onToggleForm?: () => void;
}

export const RegisterForm = ({ onToggleForm }: RegisterFormProps) => {
  const { register: registerUser, isRegistering } = useAuth();
  const { t } = useTranslation();
  const { translateError } = useZodErrorTranslation();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RegisterFormData) => {
    const cleanData = {
      ...data,
      cpfCnpj: data.cpfCnpj.replaceAll(/\D/g, ''),
      phone: data.phone ? data.phone.replaceAll(/\D/g, '') : undefined,
    };
    registerUser(cleanData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t('auth.register.name')}
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={translateError(errors.name)}
            placeholder={t('auth.register.namePlaceholder')}
            slotProps={{
              htmlInput: {
                'aria-required': 'true'
              }
            }}
          />
        )}
      />

      <Controller
        name="cpfCnpj"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            value={value}
            onChange={(e) => {
              const maskedValue = maskCPFCNPJ(e.target.value);
              onChange(maskedValue);
            }}
            label={t('auth.register.cpfCnpj')}
            variant="outlined"
            fullWidth
            error={!!errors.cpfCnpj}
            helperText={translateError(errors.cpfCnpj)}
            placeholder={t('auth.register.cpfCnpjPlaceholder')}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                maxLength: 18
              }
            }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value, ...rest } }) => (
          <TextField
            {...rest}
            value={value}
            onChange={(e) => {
              const maskedValue = maskPhone(e.target.value);
              onChange(maskedValue);
            }}
            label={t('auth.register.phone')}
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={translateError(errors.phone)}
            placeholder={t('auth.register.phonePlaceholder')}
            slotProps={{
              htmlInput: {
                maxLength: 15
              }
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t('auth.register.email')}
            type="email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={translateError(errors.email)}
            placeholder={t('auth.register.emailPlaceholder')}
            slotProps={{
              htmlInput: {
                'aria-required': 'true'
              }
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t('auth.register.password')}
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={translateError(errors.password)}
            placeholder={t('auth.register.passwordPlaceholder')}
            slotProps={{
              htmlInput: {
                'aria-required': 'true'
              }
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={isRegistering}
        sx={{
          marginTop: '1.5rem',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 600,
          borderRadius: '8px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'var(--primary-dark)',
          },
        }}
      >
        {isRegistering ? t('auth.register.registering') : t('auth.register.signUp')}
      </Button>

      {onToggleForm && (
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography
            component="button"
            type="button"
            onClick={onToggleForm}
            sx={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-color)',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            {t('auth.register.hasAccountLink')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
