import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography } from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from '@/hooks/use-translation';
import { useZodErrorTranslation } from '@/utils/zod-i18n';
import { loginSchema, type LoginFormData } from '../schemas/auth.schemas';

interface LoginFormProps {
  onToggleForm?: () => void;
}

export const LoginForm = ({ onToggleForm }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();
  const { t } = useTranslation();
  const { translateError } = useZodErrorTranslation();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t('auth.login.email')}
            type="email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={translateError(errors.email)}
            placeholder={t('auth.login.emailPlaceholder')}
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
            label={t('auth.login.password')}
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={translateError(errors.password)}
            placeholder={t('auth.login.passwordPlaceholder')}
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
        disabled={isLoggingIn}
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
        {isLoggingIn ? t('auth.login.signingIn') : t('auth.login.signIn')}
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
            {t('auth.login.noAccountLink')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
