import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { ProductManagement } from './components/vendor/ProductManagement';
import { OrderManagement } from './components/vendor/OrderManagement';
import { CommissionSettings } from './components/vendor/CommissionSettings';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { MarketingHub } from './components/marketing/MarketingHub';
import { CRMDashboard } from './components/crm/CRMDashboard';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { UserManagement } from './components/users/UserManagement';
import { ShopifyIntegration } from './components/integrations/ShopifyIntegration';
import { HelpCenter } from './components/help/HelpCenter';
import { CSVImporter } from './components/vendor/CSVImporter';
import { FloatingAIChat } from './components/chat/FloatingAIChat';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Bell,
  Users,
  Settings,
  HelpCircle,
  Store
} from 'lucide-react';

type Route = 
  | 'login' 
  | 'register' 
  | 'vendor-dashboard' 
  | 'products' 
  | 'csv-import'
  | 'orders' 
  | 'analytics'
  | 'marketing'
  | 'crm'
  | 'commissions' 
  | 'notifications'
  | 'users'
  | 'shopify'
  | 'help'
  | 'admin';

type UserRole = 'vendor' | 'admin' | 'staff' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shopifyConnected?: boolean;
  permissions?: string[];
  tier?: 'bronce' | 'plata' | 'oro' | 'platino';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('login');
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  // Simular autenticación persistente
  useEffect(() => {
    const savedUser = localStorage.getItem('saas-user');
    const savedTheme = localStorage.getItem('saas-theme') as 'light' | 'dark';
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentRoute('vendor-dashboard');
    }
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Cerrar sidebar en cambios de ruta en mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [currentRoute]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('saas-user', JSON.stringify(userData));
    setCurrentRoute(userData.role === 'admin' ? 'admin' : 'vendor-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('saas-user');
    setCurrentRoute('login');
    setSidebarOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('saas-theme', newTheme);
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentRoute('register')} />;
      case 'register':
        return <RegisterPage onRegister={handleLogin} onSwitchToLogin={() => setCurrentRoute('login')} />;
      case 'vendor-dashboard':
        return <VendorDashboard user={user!} />;
      case 'products':
        return <ProductManagement user={user!} />;
      case 'csv-import':
        return <CSVImporter user={user!} />;
      case 'orders':
        return <OrderManagement user={user!} />;
      case 'analytics':
        return <AnalyticsDashboard user={user!} />;
      case 'marketing':
        return <MarketingHub user={user!} />;
      case 'crm':
        return <CRMDashboard user={user!} />;
      case 'commissions':
        return <CommissionSettings user={user!} />;
      case 'notifications':
        return <NotificationCenter user={user!} />;
      case 'users':
        return <UserManagement user={user!} />;
      case 'shopify':
        return <ShopifyIntegration user={user!} />;
      case 'help':
        return <HelpCenter user={user!} />;
      case 'admin':
        return <AdminDashboard user={user!} />;
      default:
        return <VendorDashboard user={user!} />;
    }
  };

  if (!user) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background">
          <div className="absolute top-4 right-4 z-10">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
          {renderCurrentPage()}
        </div>
      </ThemeProvider>
    );
  }

  const vendorNavItems = [
    { 
      id: 'vendor-dashboard', 
      label: 'Dashboard', 
      icon: '📊',
      description: 'KPIs y resumen'
    },
    { 
      id: 'products', 
      label: 'Catálogo', 
      icon: '📦',
      description: 'Gestión de productos'
    },
    { 
      id: 'csv-import', 
      label: 'Importar CSV', 
      icon: '📥',
      description: 'Importación masiva'
    },
    { 
      id: 'orders', 
      label: 'Pedidos', 
      icon: '📋',
      description: 'Gestión de pedidos'
    },
    { 
      id: 'analytics', 
      label: 'Análisis', 
      icon: '📈',
      description: 'Business Intelligence'
    },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: '🎯',
      description: 'Campañas y promociones'
    },
    { 
      id: 'crm', 
      label: 'CRM', 
      icon: '👥',
      description: 'Gestión de clientes'
    },
    { 
      id: 'commissions', 
      label: 'Finanzas', 
      icon: '💰',
      description: 'Comisiones y pagos'
    }
  ];

  const adminNavItems = [
    { id: 'admin', label: 'Panel Admin', icon: '👑', description: 'Administración' },
    { id: 'users', label: 'Usuarios', icon: '👥', description: 'Gestión de usuarios' },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Análisis global' }
  ];

  const settingsItems = [
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'shopify', label: 'Shopify', icon: Store },
    { id: 'help', label: 'Ayuda', icon: HelpCircle }
  ];

  const navItems = user.role === 'admin' ? adminNavItems : vendorNavItems;

  const getTierBadge = (tier?: string) => {
    if (!tier) return null;
    
    const tierColors = {
      'bronce': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
      'plata': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      'oro': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'platino': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };

    return (
      <Badge className={`text-xs ${tierColors[tier] || tierColors.bronce}`}>
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b sticky top-0 bg-background z-40">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-lg font-semibold truncate">MarketPlace SaaS</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setCurrentRoute('notifications')}
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex min-h-screen lg:min-h-[calc(100vh-0px)]">
          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r transform transition-transform duration-300 ease-in-out
            lg:translate-x-0 lg:static lg:inset-0 lg:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex flex-col h-full">
              {/* Logo header - hidden on mobile, shown on desktop */}
              <div className="hidden lg:flex items-center justify-between p-4 border-b">
                <div>
                  <h1 className="text-xl font-semibold text-sidebar-foreground">MarketPlace SaaS</h1>
                  <p className="text-xs text-sidebar-foreground/70">Centro de comando</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative"
                    onClick={() => setCurrentRoute('notifications')}
                  >
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Main Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-1">
                  <div className="text-xs font-medium text-sidebar-foreground/70 mb-3 uppercase tracking-wider">
                    Principal
                  </div>
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentRoute === item.id ? "secondary" : "ghost"}
                      className="w-full justify-start text-sidebar-foreground hover:text-sidebar-accent-foreground group"
                      onClick={() => setCurrentRoute(item.id as Route)}
                    >
                      <span className="mr-3 text-base">{item.icon}</span>
                      <div className="flex flex-col items-start min-w-0 flex-1">
                        <span className="text-sm truncate">{item.label}</span>
                        <span className="text-xs text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground/70 truncate w-full">
                          {item.description}
                        </span>
                      </div>
                    </Button>
                  ))}
                </nav>

                {/* Settings Section */}
                <div className="px-4 mt-6">
                  <div className="text-xs font-medium text-sidebar-foreground/70 mb-3 uppercase tracking-wider">
                    Configuración
                  </div>
                  <div className="space-y-1">
                    {settingsItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.id}
                          variant={currentRoute === item.id ? "secondary" : "ghost"}
                          className="w-full justify-start text-sidebar-foreground hover:text-sidebar-accent-foreground"
                          onClick={() => setCurrentRoute(item.id as Route)}
                        >
                          <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                          <span className="text-sm truncate flex-1">{item.label}</span>
                          {item.id === 'notifications' && notifications > 0 && (
                            <Badge className="ml-auto h-5 w-5 flex items-center justify-center text-xs flex-shrink-0">
                              {notifications}
                            </Badge>
                          )}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-4 border-t">
                <div className="p-3 bg-sidebar-accent rounded-lg mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-sidebar-accent-foreground truncate flex-1 mr-2">
                      {user.name}
                    </p>
                    {getTierBadge(user.tier)}
                  </div>
                  <p className="text-xs text-sidebar-accent-foreground/70 mb-2 truncate">
                    {user.email}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {user.shopifyConnected && (
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-xs text-sidebar-accent-foreground/70">Shopify</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <main className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
              {renderCurrentPage()}
            </main>
          </div>
        </div>

        {/* Floating AI Chat */}
        <FloatingAIChat user={user} />
      </div>
    </ThemeProvider>
  );
}