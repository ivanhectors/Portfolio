import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Home } from './pages/Home';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="relative min-h-screen w-full overflow-hidden selection:bg-primary/30">
          {/* Background Orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          
          <Switch>
            <Route path="/" component={Home} />
            <Route>
              <div className="min-h-screen flex items-center justify-center">
                <div className="glass-panel p-8 rounded-2xl text-center">
                  <h1 className="text-2xl font-bold mb-2">404 - Not Found</h1>
                  <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </WouterRouter>
    </NextThemesProvider>
  );
}

export default App;
