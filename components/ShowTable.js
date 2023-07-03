import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

export default function ShowTable({Events,editEvent,deleteEvent}) {
    const [data, setData] = useState(Events);
    const [filter, setFilter] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://127.0.0.1:5000/pr'
    //         );
    //         setData(result.data);
    //         setFilter(result.data);
    //     }
    //     fetchData()
        
    // }, []);

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
            return row.name.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        if (searchedVal.length < 1) {
            setFilter(data)
        }
        else {
            setFilter(filteredRows)
        }
      };
    
  

    const [searchedVal, setSearchedVal] = useState("");

    return (
      <div>
        <div>
          {/* simply set the query text here instead of triggering requestSearch */}
          <TextField onChange={(e) => setSearchedVal(e.target.value)} />
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>EVENT ID</TableCell>
                <TableCell>EVENT NAME</TableCell>
                <TableCell>EVENT DATE</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((row) =>
                  // note that I've incorporated the searchedVal length check here
                  !searchedVal.length || row.name
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase()) 
                )
                .map((item) => (
                  <TableRow key={item._id}>
                    
                    <TableCell>{item._id.substr(0, 6).toUpperCase()}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{String(item.date).slice(0,10)}</TableCell>
                
                    <TableCell>
                    <Link className="btn-default" href={'/Eorders/'+item._id}>
                    <EditIcon />
                    Orders
                    </Link>
                    <button
                    onClick={() => editEvent(item)}
                    className="btn-default mr-1"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => deleteEvent(item)}
                    className="btn-red">Archieve
                    </button>
                
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
}