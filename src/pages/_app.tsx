import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={800}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      variant="info"
    >
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}
