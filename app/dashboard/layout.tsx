import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>dashboard header</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
