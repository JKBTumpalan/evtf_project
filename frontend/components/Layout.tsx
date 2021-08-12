import { Navbar } from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
};

export default Layout;
