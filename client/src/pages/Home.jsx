import { useDispatch, useSelector } from "react-redux"
import Header from '../components/Header';
import Herosection from '../components/Herosection';
import Showcase from '../components/Showcase';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <div style={{ backgroundColor: "#ede7d0ff" }}>
        <Header />
        <Herosection />
        <Showcase />
        <Footer/>
      </div>
    </>
  );
}

export default Home;