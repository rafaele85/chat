import '../styles/globals.css'
import {AuthProvider} from "../components/providers/auth-provider";

const MyApp = ({ Component, pageProps }) => {

  return (
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
  );
};

export default MyApp;

