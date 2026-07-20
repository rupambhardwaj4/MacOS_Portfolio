import { OSProvider, useOS } from "#store/OSContext.jsx";
import { Navbar, Welcome, Desktop, Dock } from "#components/index.js";

const MainAppContent = () => {
  const { isBooted } = useOS();

  return (
    <main className="relative w-dvw h-dvh overflow-hidden select-none">
      {!isBooted ? (
        <Welcome />
      ) : (
        <div className="w-full h-full flex flex-col animate-fade-in">
          <Navbar />
          <div className="flex-1 relative">
            <Desktop />
          </div>
          <Dock />
        </div>
      )}
    </main>
  );
};

const App = () => {
  return (
    <OSProvider>
      <MainAppContent />
    </OSProvider>
  );
};

export default App;
