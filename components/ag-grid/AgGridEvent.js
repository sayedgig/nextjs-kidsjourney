import React, {  useMemo, useRef,useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import {  Button } from '@material-ui/core' 
import Router from 'next/router'
import events from '@/pages/events';
function AgGridEvent({EventsData,archieveEvent,deleteEvent}) {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const format_Id = (obj) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    //console.log(obj);
    return String(obj.value).substr(0, 6).toUpperCase();
  };
  const format_Date = (obj) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    //console.log(obj);
    return String(obj.value).slice(0,10);
  };

  const format_OrderCount = (obj) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
   // console.log(obj.value);
    return obj.value.length;
  };
  const format_OrderProfit = (obj) => {
 
    // let total = 0;
    // let ototal = 0;
    let profit = 0;
    // let TotalQuant = 0;
    // let line_quantity = [];
    // let createdBy =[];
   let orders = obj.value;
   for (const order of orders) {
    //const price = products.find(p => p === product)?.sprice || 0;
    //total += Number (order.total);
    profit += Number (order.profit);
    //createdBy.push({Id:order.createdby,qty:1})
    // for (const item of order.line_items) {
    //   TotalQuant += Number (item.quantity);
    //   line_quantity.push({
    //     Id:item.cname.toUpperCase(),
    //     qty:item.quantity
    //   });
    //}
  }
  
    return Number(profit).toLocaleString();
  };

  const columnDefs = [
    {
      headerName: "Actions", field: "_id" ,filter: false,flex: 2, cellRendererFramework: (params) => <div>
        
        
        <Button variant="contained" color="primary"  
        onClick={()=>{Router.push(`/Eorders/${params.data._id}`);  } } >
         
        Orders
        </Button>

        <Button variant="outlined" color="success"  onClick={()=>{
         // Router.push(`/staffVisit/${params.data.id}`);
          archieveEvent(params.data);
          
          } } >
        
        Active
        </Button>
        <Button variant="contained" color="secondary"  
        onClick={()=>{ 
          // handleClickOpenPrint(params.data)
          deleteEvent(params.data)
          } } >
  
        Delete
        </Button>
    
      </div>
    },
    { headerName: "Event Id", field: "_id" ,sort: 'desc' , valueFormatter: format_Id},

    { headerName: "Event name", field: "name",flex: 1.5 },
    { headerName: "Event Date", field: "date" , valueFormatter: format_Date},
    { headerName: "Orders", field: "orders" , valueFormatter: format_OrderCount},
    // { headerName: "Profit", field: "orders" , valueFormatter: format_OrderProfit},



   
  ]

  
  const defaultColDef = {
    sortable: true,
    flex: 1, 
    filter: true,
    floatingFilter: true,
    resizable: true,
  }

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    
      gridRef.current.columnApi.getColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    
    
  }, []);

  const sortBy_id = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: '_id', sort: 'desc', sortIndex: 0 },
       
      ],
      defaultState: { sort: null },
    });
  }, []);


  const onExportClick=()=>{
    gridRef.current.api.exportDataAsCsv(getParams());
  }
  const getParams = () => {
    return {
      allColumns: getBoolean('allColumns'),
    };
  }
  function getBoolean(id) {
    var field = document.querySelector('#' + id);
  
    return !!true;
  }


  
  

  return (
    <div className="App">
      <div style={containerStyle}>
          <div style={gridStyle} className="ag-theme-alpine">
          <div style={{display: 'flex',justifyContent: 'space-around'}}>
               
               <Button color="primary"  variant="contained" onClick={() => autoSizeAll(false)} style={{ marginBottom: '5px', fontWeight: 'bold' }}>
               Auto-Size All</Button>
               
               {/* <Button  color="primary"  variant="contained" style={{ marginBottom: '5px', fontWeight: 'bold' }} 
                onClick={()=>onExportClick()}>
                Export to Excel             
                </Button> */}

           

            </div>
            <br/>
         
              <div className="ag-theme-alpine" style={{ height: `calc(100vh - 150px)`  }}>
                <AgGridReact
                  ref={gridRef}
                  rowData={EventsData}
                  
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                />
            </div>

         </div>
      </div>
    </div>
  );
}

export default AgGridEvent;