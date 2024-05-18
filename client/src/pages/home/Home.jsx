import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import WidgetTwo from "../../components/widget/WidgetTwo";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";




const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="" />
          <WidgetTwo type="user" />
          {/* <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="🌱 🪴 Les 6 derniers mois (Rendements)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Dernières Opérations</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
