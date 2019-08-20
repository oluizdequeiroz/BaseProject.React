import React, { PureComponent } from 'react';
import { Button } from 'react';

import jsPDF from 'jspdf'

export default class pdfGenerate extends PureComponent {
    constructor(props){
        super(props)
        this.state ={}
    }
  
    // JSpdf Generator For generating the PDF
    jsPdfGenerator = () => {

        // Example From https://parall.ax/products/jspdf
       
    }
  
    render(){
      return(
         <Button onClick={this.jsPdfGenerator} type="primary"> Generate PDF </Button> 
        )
     }
  
  
}
// import React, { Component } from 'react'
//  import jsPDF from 'jspdf'
// import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
 
// const styleH1 = {
//   fontSize: '15px',
//   textAlign: 'center',
//   color: 'red'
// };
 
// const invisibleStyle = {
// };
 
// export default class App extends Component {
//    crender () {
//     const cliente = 'Nome do cliente';
//     const properties = { header: 'Acme' }
//     const headReceita = [["", "Name", "Country"]]
//     const bodyReceita = [
//         [1, "Shaw", "Tanzania"],
//         [2, "Nelson", "Kazakhstan"],
//         [3, "Garcia", "Madagascar"],
//     ]

//     const headServico = [["ID", "Name", "Country"]]
//     const bodyServico = [
//         [1, "Shaw", "Tanzania"],
//         [2, "Nelson", "Kazakhstan"],
//         [3, "Garcia", "Madagascar"],
//     ]
//     return (
//         <React.Fragment>
//         <PDF
//           properties={properties}
//           preview={true}
//         >
//             <Html sourceById='page'/>
//             <Table
//                 head={headReceita}
//                 body={bodyReceita}
//             />
//             <Table
//                 head={headServico}
//                 body={bodyServico}
//             />
//         </PDF>
//         <div id="page" style={invisibleStyle}>
//             <div className="col-md-3 colcliente" >
//                 Cliente:
//             </div>
//             <div className="col-md-9">
//                 {cliente}
//             </div>
//         </div>
//       </React.Fragment>
//     )
//   }
// }