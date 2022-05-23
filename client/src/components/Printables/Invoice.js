import React from 'react';
import { renderToString } from 'react-dom/server';

import jsPDF from 'jspdf';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const Prints = () => (
  <div>
    <ul>
      <li>line 1</li>
      <li>line 2</li>
      <li>line 3</li>
    </ul>
  </div>
);

const print = () => {
  const string = renderToString(<Prints />);
  const pdf = new jsPDF();
  pdf.fromHTML(string);
  pdf.save('pdf');
};

const Invoice = () => (
  <div style={styles}>
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
    <button onClick={print}>print</button>
  </div>
);

export default Invoice;
