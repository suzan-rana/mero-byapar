
import Sidebar from "@/components/Sidebar";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <main className="flex sm:gap-6 max-h-screen  overflow-hidden">
          <Sidebar />
          <div className="pt-20 sm:pt-6 overflow-y-scroll overflow-x-hidden  grow pr-8 pb-20">
            {" "}
            {children}
          </div>
        </main>

  );
}
