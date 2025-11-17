import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/pages/dashboardPatient.css';
import SideBare from '../../../components/dashboard/Patient/SideBare';
import Header from '../../../components/dashboard/Patient/Header';
import Statistique from '../../../components/dashboard/Patient/Statistique';
import MainContent from '../../../components/dashboard/Patient/MainContent';

const PatientDashboard = () => {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <SideBare />
      <div className="main-content">
        <Header />
        <Statistique />
        <MainContent />
      </div>
    </>
  );
};

export default PatientDashboard;