import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={4000}
        >
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
