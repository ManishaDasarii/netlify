import { Provider } from "react-redux";
import { Providers } from "../../Redux/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
