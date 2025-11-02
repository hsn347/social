
import Home from "./pages/Home";
import { Navbar } from "./component/Navbar";
import WelcomePage from "./component/WelcomePage";
import { useAuth } from "./context/AuthContext1";

function App() {
  const { user, loading } = useAuth();

  // عرض صفحة الترحيب إذا لم يكن المستخدم مسجلاً
  if (!loading && !user) {
    return <WelcomePage />;
  }

  return (
    <>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-300 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
