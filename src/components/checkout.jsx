import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Close,
  CreditCard,
  QrCode,
  Receipt,
  LocationOn,
  Person,
  Email,
  Phone,
  ArrowBack,
  CheckCircle
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useForm } from 'react-hook-form';

export function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState('address');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const shipping = 15.90;
  const total = cartTotal + shipping;

  const getActiveStep = () => {
    switch (step) {
      case 'address': return 0;
      case 'payment': return 1;
      case 'confirmation': return 2;
      default: return 0;
    }
  };

  const onSubmitAddress = () => {
    setStep('payment');
  };

  const onSubmitPayment = async (data) => {
    setLoading(true);
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newOrderNumber = `ELLE-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setStep('confirmation');
    setLoading(false);
  };

  const handleClose = () => {
    setStep('address');
    setPaymentMethod('credit');
    setOrderNumber('');
    onClose();
  };

  const handleFinish = () => {
    clearCart();
    handleClose();
  };

  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const PaymentMethodCard = ({ method, icon: Icon, title, description, selected }) => (
    <Card
      sx={{
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'grey.300',
        backgroundColor: selected ? 'primary.light' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.light'
        }
      }}
      onClick={() => setPaymentMethod(method)}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            backgroundColor: selected ? 'primary.main' : 'grey.200',
            color: selected ? 'white' : 'grey.600',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          {step !== 'address' && step !== 'confirmation' && (
            <IconButton onClick={() => setStep('address')}>
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" component="h2">
            {step === 'address' && 'Dados de Entrega'}
            {step === 'payment' && 'Pagamento'}
            {step === 'confirmation' && 'Pedido Confirmado'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Stepper activeStep={getActiveStep()} sx={{ mb: 4 }}>
          {['Endereço', 'Pagamento', 'Confirmação'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {step === 'address' && (
              <Box component="form" onSubmit={handleSubmit(onSubmitAddress)}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Informações Pessoais
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nome Completo"
                          {...register('fullName', { required: 'Nome é obrigatório' })}
                          error={!!errors.fullName}
                          helperText={errors.fullName?.message}
                          InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="E-mail"
                          type="email"
                          {...register('email', { 
                            required: 'E-mail é obrigatório', 
                            pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' } 
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          InputProps={{
                            startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Telefone"
                          {...register('phone', { required: 'Telefone é obrigatório' })}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          InputProps={{
                            startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="CPF"
                          {...register('cpf', { required: 'CPF é obrigatório' })}
                          error={!!errors.cpf}
                          helperText={errors.cpf?.message}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                      <LocationOn color="primary" />
                      Endereço de Entrega
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="CEP"
                          {...register('zipCode', { required: 'CEP é obrigatório' })}
                          error={!!errors.zipCode}
                          helperText={errors.zipCode?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          label="Endereço"
                          {...register('address', { required: 'Endereço é obrigatório' })}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Número"
                          {...register('number', { required: 'Número é obrigatório' })}
                          error={!!errors.number}
                          helperText={errors.number?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          label="Complemento"
                          {...register('complement')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Bairro"
                          {...register('neighborhood', { required: 'Bairro é obrigatório' })}
                          error={!!errors.neighborhood}
                          helperText={errors.neighborhood?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Cidade"
                          {...register('city', { required: 'Cidade é obrigatória' })}
                          error={!!errors.city}
                          helperText={errors.city?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={!!errors.state}>
                          <InputLabel>Estado</InputLabel>
                          <Select
                            {...register('state', { required: 'Estado é obrigatório' })}
                            label="Estado"
                            defaultValue=""
                          >
                            <MenuItem value=""><em>Selecione</em></MenuItem>
                            <MenuItem value="SP">SP</MenuItem>
                            <MenuItem value="RJ">RJ</MenuItem>
                            <MenuItem value="MG">MG</MenuItem>
                            <MenuItem value="RS">RS</MenuItem>
                            <MenuItem value="PR">PR</MenuItem>
                            <MenuItem value="SC">SC</MenuItem>
                          </Select>
                          {errors.state && (
                            <Typography variant="caption" color="error">
                              {errors.state.message}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Continuar para Pagamento
                </Button>
              </Box>
            )}

            {step === 'payment' && (
              <Box component="form" onSubmit={handleSubmit(onSubmitPayment)}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Método de Pagamento
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <PaymentMethodCard
                        method="credit"
                        icon={CreditCard}
                        title="Cartão de Crédito"
                        description="Parcele em até 3x sem juros"
                        selected={paymentMethod === 'credit'}
                      />
                      <PaymentMethodCard
                        method="pix"
                        icon={QrCode}
                        title="PIX"
                        description="Aprovação imediata"
                        selected={paymentMethod === 'pix'}
                      />
                      <PaymentMethodCard
                        method="boleto"
                        icon={Receipt}
                        title="Boleto Bancário"
                        description="Vencimento em 3 dias"
                        selected={paymentMethod === 'boleto'}
                      />
                    </Box>
                  </CardContent>
                </Card>

                {paymentMethod === 'credit' && (
                  <Card sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Dados do Cartão
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Número do Cartão"
                            {...register('cardNumber', { required: paymentMethod === 'credit' ? 'Número do cartão é obrigatório' : false })}
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Nome no Cartão"
                            {...register('cardName', { required: paymentMethod === 'credit' ? 'Nome é obrigatório' : false })}
                            error={!!errors.cardName}
                            helperText={errors.cardName?.message}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Validade"
                            {...register('cardExpiry', { required: paymentMethod === 'credit' ? 'Validade é obrigatória' : false })}
                            error={!!errors.cardExpiry}
                            helperText={errors.cardExpiry?.message}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="CVV"
                            {...register('cardCvv', { required: paymentMethod === 'credit' ? 'CVV é obrigatório' : false })}
                            error={!!errors.cardCvv}
                            helperText={errors.cardCvv?.message}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}

                {(paymentMethod === 'pix' || paymentMethod === 'boleto') && (
                  <Card sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Instruções
                      </Typography>
                      {paymentMethod === 'pix' && (
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <QrCode color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="QR Code para pagamento" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CreditCard color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Código PIX copia e cola" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Email color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Instruções no seu e-mail" />
                          </ListItem>
                        </List>
                      )}
                      {paymentMethod === 'boleto' && (
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <Receipt color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Boleto será enviado por e-mail" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CreditCard color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Vencimento em 3 dias úteis" />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <LocationOn color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Pagamento em qualquer banco" />
                          </ListItem>
                        </List>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Processando...' : 'Finalizar Pedido'}
                </Button>
              </Box>
            )}

            {step === 'confirmation' && (
              <Box textAlign="center" py={4}>
                <Box display="flex" justifyContent="center" mb={3}>
                  <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
                </Box>

                <Typography variant="h4" gutterBottom color="success.main">
                  Pedido Confirmado!
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Número do pedido: <Box component="span" color="primary.main">{orderNumber}</Box>
                </Typography>

                <Card sx={{ mt: 4, textAlign: 'left' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Próximos passos
                    </Typography>
                    <List>
                      {paymentMethod === 'credit' && (
                        <>
                          <ListItem>
                            <Chip label="1" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Pagamento processado com sucesso" />
                          </ListItem>
                          <ListItem>
                            <Chip label="2" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Pedido será separado em até 2 dias úteis" />
                          </ListItem>
                          <ListItem>
                            <Chip label="3" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Acompanhe o envio pelo e-mail cadastrado" />
                          </ListItem>
                        </>
                      )}
                      {paymentMethod === 'pix' && (
                        <>
                          <ListItem>
                            <Chip label="1" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Faça o pagamento via PIX (enviado no e-mail)" />
                          </ListItem>
                          <ListItem>
                            <Chip label="2" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Confirmação em até 2 horas" />
                          </ListItem>
                          <ListItem>
                            <Chip label="3" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Envio após confirmação do pagamento" />
                          </ListItem>
                        </>
                      )}
                      {paymentMethod === 'boleto' && (
                        <>
                          <ListItem>
                            <Chip label="1" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Boleto enviado para seu e-mail" />
                          </ListItem>
                          <ListItem>
                            <Chip label="2" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Pague em até 3 dias úteis" />
                          </ListItem>
                          <ListItem>
                            <Chip label="3" size="small" sx={{ mr: 2 }} />
                            <ListItemText primary="Envio após confirmação bancária" />
                          </ListItem>
                        </>
                      )}
                    </List>
                  </CardContent>
                </Card>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleFinish}
                >
                  Continuar Comprando
                </Button>
              </Box>
            )}
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumo do Pedido
                </Typography>

                <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                  {cart.map((item) => (
                    <Box key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} display="flex" gap={2} mb={2}>
                      <Box position="relative" width={64} height={64} flexShrink={0}>
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                        />
                        <Chip
                          label={item.quantity}
                          size="small"
                          color="primary"
                          sx={{ position: 'absolute', top: -8, right: -8, minWidth: 20, height: 20 }}
                        />
                      </Box>
                      <Box flex={1} minWidth={0}>
                        <Typography variant="body2" noWrap>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.selectedColor} • {item.selectedSize}
                        </Typography>
                        <Typography variant="body2" color="primary.main">
                          {formatCurrency(item.price)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexDirection="column" gap={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body2">
                      {formatCurrency(cartTotal)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Frete
                    </Typography>
                    <Typography variant="body2">
                      {formatCurrency(shipping)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">
                      Total
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {formatCurrency(total)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}