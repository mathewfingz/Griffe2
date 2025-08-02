import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ShoppingBag, AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'vendor' | 'admin';
  shopifyConnected?: boolean;
}

interface RegisterPageProps {
  onRegister: (user: User) => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onRegister, onSwitchToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    phone: '',
    acceptTerms: false,
    connectShopify: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Validación de contraseña
  const passwordValidation = {
    length: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasLetter: /[a-zA-Z]/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!isPasswordValid) {
      setError('La contraseña no cumple con los requisitos');
      setLoading(false);
      return;
    }

    if (!doPasswordsMatch) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: 'vendor',
      shopifyConnected: formData.connectShopify
    };

    onRegister(newUser);
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShopifyConnect = () => {
    setLoading(true);
    // Simular OAuth flow de Shopify durante el registro
    setTimeout(() => {
      const newUser: User = {
        id: 'shopify-' + Math.random().toString(36).substr(2, 9),
        name: 'Vendedor Shopify',
        email: 'nuevo-shopify@demo.com',
        role: 'vendor',
        shopifyConnected: true
      };
      onRegister(newUser);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            MarketPlace SaaS
          </CardTitle>
          <CardDescription>
            Crea tu cuenta de vendedor
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del negocio *</Label>
              <Input
                id="businessName"
                placeholder="Mi Tienda Online"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessType">Tipo de negocio</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Moda y Accesorios</SelectItem>
                    <SelectItem value="electronics">Electrónicos</SelectItem>
                    <SelectItem value="home">Hogar y Jardín</SelectItem>
                    <SelectItem value="beauty">Belleza y Cuidado</SelectItem>
                    <SelectItem value="sports">Deportes</SelectItem>
                    <SelectItem value="books">Libros y Medios</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Validación visual de contraseña */}
              {formData.password && (
                <div className="text-xs space-y-1">
                  <div className={`flex items-center gap-1 ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    Al menos 8 caracteres
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidation.hasLetter ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.hasLetter ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    Al menos una letra
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    Al menos un número
                  </div>
                  <div className={`flex items-center gap-1 ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidation.hasSpecial ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    Al menos un carácter especial
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {formData.confirmPassword && (
                <div className={`flex items-center gap-1 text-xs ${doPasswordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {doPasswordsMatch ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  Las contraseñas coinciden
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="connectShopify" 
                  checked={formData.connectShopify}
                  onCheckedChange={(checked) => handleInputChange('connectShopify', checked as boolean)}
                />
                <Label htmlFor="connectShopify" className="text-sm">
                  Conectar con mi tienda Shopify existente
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  Acepto los <Button variant="link" className="p-0 h-auto text-sm">términos y condiciones</Button> y la <Button variant="link" className="p-0 h-auto text-sm">política de privacidad</Button>
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !isPasswordValid || !doPasswordsMatch || !formData.acceptTerms}
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          <Separator />

          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleShopifyConnect}
            disabled={loading}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {loading ? 'Conectando...' : 'Registrarse con Shopify'}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={onSwitchToLogin}>
              Inicia sesión
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}