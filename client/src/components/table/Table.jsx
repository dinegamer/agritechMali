import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Engrais Bio",
      img: "https://images.pexels.com/photos/6913399/pexels-photo-6913399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      customer: "Moctar Komé",
      date: "1 Mars",
      amount: 785,
      method: "Paiement à la livraison",
      status: "Approuvé",
    },
    {
      id: 2235235,
      product: "Graines de Maïs",
      img: "https://images.pexels.com/photos/14933847/pexels-photo-14933847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      customer: "Khalid Dembélé",
      date: "15 Février",
      amount: 650,
      method: "Paiement en ligne",
      status: "En attente",
    },
    {
      id: 2342353,
      product: "Pesticides Naturels",
      img: "https://images.pexels.com/photos/19985013/pexels-photo-19985013/free-photo-of-pink-dahlia-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      customer: "Niele Sissoko",
      date: "5 Avril",
      amount: 420,
      method: "Paiement à la livraison",
      status: "Approuvé",
    },
    {
      id: 2357741,
      product: "Fertilisant Organique",
      img: "https://images.pexels.com/photos/7125434/pexels-photo-7125434.jpeg",
      customer: "Aissata Traoré",
      date: "22 Mars",
      amount: 300,
      method: "Paiement en ligne",
      status: "En attente",
    },
    {
      id: 2342355,
      product: "Semences de Tomates",
      img: "https://images.pexels.com/photos/1192045/pexels-photo-1192045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      customer: "Abdoulaye Samaké",
      date: "10 Avril",
      amount: 180,
      method: "Paiement en ligne",
      status: "Approuvé",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="tableau des transactions">
      <TableHead>
        <TableRow>
          <TableCell>Identifiant de suivi</TableCell>
          <TableCell>Produit</TableCell>
          <TableCell>Client</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Montant</TableCell>
          <TableCell>Méthode de paiement</TableCell>
          <TableCell>Statut</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>
              <div className="cellWrapper">
                <img src={transaction.img} alt="" className="image" />
                {transaction.product}
              </div>
            </TableCell>
            <TableCell>{transaction.customer}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.method}</TableCell>
            <TableCell>
              <span className={`status ${transaction.status}`}>{transaction.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default List;
