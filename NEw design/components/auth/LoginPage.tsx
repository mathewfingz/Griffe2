import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { ShoppingBag, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'vendor' | 'admin';
  shopifyConnected?: boolean;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Usuarios de demostración
  const demoUsers = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'vendor@demo.com',
      password: 'demo123',
      role: 'vendor' as const,
      shopifyConnected: true
    },
    {
      id: '2',
      name: 'Admin Sistema',
      email: 'admin@demo.com',
      password: 'admin123',
      role: 'admin' as const,
      shopifyConnected: false
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError('Credenciales incorrectas. Usa vendor@demo.com o admin@demo.com con contraseña demo123/admin123');
    }
    
    setLoading(false);
  };

  const handleShopifyConnect = () => {
    setLoading(true);
    // Simular OAuth flow de Shopify
    setTimeout(() => {
      const mockUser: User = {
        id: 'shopify-' + Math.random().toString(36).substr(2, 9),
        name: 'Vendedor Shopify',
        email: 'shopify@demo.com',
        role: 'vendor',
        shopifyConnected: true
      };
      onLogin(mockUser);
      setLoading(false);
    }, 2000);
  };

  const handleDemoLogin = (userEmail: string) => {
    const user = demoUsers.find(u => u.email === userEmail);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            MarketPlace SaaS
          </CardTitle>
          <CardDescription>
            Inicia sesión en tu cuenta de vendedor
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Demo buttons */}
          <div className="space-y-2">
            <Label className="text-sm">Cuentas de demostración:</Label>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDemoLogin('vendor@demo.com')}
                disabled={loading}
              >
                🏪 Entrar como Vendedor
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDemoLogin('admin@demo.com')}
                disabled={loading}
              >
                👑 Entrar como Admin
              </Button>
            </div>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
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
            {loading ? 'Conectando...' : 'Conectar con Shopify'}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={onSwitchToRegister}>
              Regístrate
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}