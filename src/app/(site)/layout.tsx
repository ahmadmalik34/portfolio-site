import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BackgroundFx } from "@/components/ui/background-fx";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundFx />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <WhatsAppFab />
    </>
  );
}
