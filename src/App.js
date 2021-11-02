import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';







function App() {
 
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");

  const getStudentData = async () => {
    try {
      const data = await axios.get("https://localhost:44303/api/students");
      console.log(data.data);
      setStudent(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);
    return (
    <div className="App">
      <h1>Öğrenci Listesi</h1>
      <input
        type="text"
        placeholder="Arama Kutusu..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

     


  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Öğrenci Adı</TableCell>
            <TableCell align="right">Öğrenci Soyadı</TableCell>
            <TableCell align="right">Genel Ortalama</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        
          {student.filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              }).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.surname}</TableCell>
              <TableCell align="right">{row.gradeAverage}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 




    </div>
  );
};

export default App;
