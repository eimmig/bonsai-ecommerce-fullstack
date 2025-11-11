import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography } from '@mui/material';

import { useAuth } from '@/hooks/use-auth';
import { registerSchema, type RegisterFormData } from '../schemas/auth.schemas';

interface RegisterFormProps {
  onToggleForm?: () => void;
}

export const RegisterForm = ({ onToggleForm }: RegisterFormProps) => {
  const { register: registerUser, isRegistering } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
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
            label="Nome completo"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            placeholder="Digite seu nome completo"
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
        render={({ field }) => (
          <TextField
            {...field}
            label="CPF/CNPJ"
            variant="outlined"
            fullWidth
            error={!!errors.cpfCnpj}
            helperText={errors.cpfCnpj?.message}
            placeholder="Digite seu CPF ou CNPJ"
            slotProps={{
              htmlInput: {
                'aria-required': 'true'
              }
            }}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Telefone"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
            placeholder="Digite seu telefone"
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
            label="E-mail"
            type="email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="seu.email@exemplo.com"
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
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Mínimo 6 caracteres"
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
        {isRegistering ? 'Cadastrando...' : 'Cadastrar'}
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
            Já tem conta? Entrar
          </Typography>
        </Box>
      )}
    </Box>
  );
};
