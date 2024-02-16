// // PdfDocument.js
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     margin: 10,
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// const PdfDocument = ({ data }) => (
//   // <Document>
//   //   <Page size="A4" style={styles.page}>
//   //     <View style={styles.section}>
//   //       <Text>Transaction ID: {data[0].TRANSACTIONID}</Text>
//   //       <Text>Project Number: {data[0].PROJECTNUMBER}</Text>
//   //       <Text>Project Name (EN): {data[0].PROJECTNAME_EN}</Text>
//   //       <Text>Project Name (AR): {data[0].PROJECTNAME_AR}</Text>
//   //       <Text>Project Description: {data[0].PROJECTDESCRIPTION}</Text>
//   //       <Text>Project Start Date: {data[0].PROJECTSTARTDATE}</Text>
//   //       <Text>Project End Date: {data[0].PROJECTENDDATE}</Text>
//   //       {/* Add more text elements for other properties as needed */}
//   //     </View>
//   //   </Page>
//   // </Document>
// );

// export default PdfDocument;


//this is my PdfDocument.js

import html2canvas from "html2canvas";


html2canvas(document.querySelector("#capture")).then(canvas => {
  document.body.appendChild(canvas)
});