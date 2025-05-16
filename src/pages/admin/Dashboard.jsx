
import Navbar from "@/components_admin/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import CategoryModal from "@/components_admin/CategoryModal.jsx";


const Dashboard = () => {
    return (
        <>
       <Navbar />
        <div className="p-6">
            <h1 className="h-auto">Panel de Administración</h1>
      {/*      <UserList />*/}
            <CategoryModal />
        </div>
            <Footer />
        </>
    );
};

export default Dashboard;