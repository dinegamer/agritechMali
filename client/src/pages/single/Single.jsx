import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import me from "../../Assets/me.JPG"

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Modifier</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                 src={me} // Insère ici le chemin vers ton logo
                 alt="userprofile"
                 className="itemImg"
                //  width="60px"
                //  height="60px"
                
              />
              <div className="details">
                <h2 className="itemTitle">Chamsoudine Thienta</h2>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">teenagerdine@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+223 73 44 92 30</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Addresse:</span>
                  <span className="itemValue">
                    Baguineda
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pays::</span>
                  <span className="itemValue">Mali</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
