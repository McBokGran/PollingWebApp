import React,{PureComponent} from 'react';

import jsPDF from 'jspdf';
import { render } from 'react-dom';

export default class PdfGenerator extends PureComponent{

    constructor(props){
    super(props)
    this.state = {

    }
}
jsPdfGenerator= () =>{
    var doc = new jsPDF('p', 'pt');
    doc.
    doc.text(20,20,'This is default text');
    doc.addImage();
    doc.setFont('courier');
    doc.save('generated.pdf');
}
    render(){

        return (<button onClick ={this.jsPdfGenerator} >Generate PDF</button>);
    }
}
