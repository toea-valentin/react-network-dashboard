export const menu = [
  {
    type: "ADD",
    title: "ADD IP",
    info: `Once an Ip has been added, the service catalogs it so that it is known
    if it belongs to one of the following cloud service providers: Amazon
    Web Service, Google Cloud Platform, Azure.`,
  },
  {
    type: "GET",
    title: "GET IP",
    info: `Querying the service with an IP will indicate if the 
    IP belongs to one of three cloud service providers: Amazon
    Web Services, Google Cloud Platform, Azure.`,
  },
  {
    type: "UPDATE",
    title: "UPDATE IP",
    info: `Update details about an IP because there may be a switch 
    from one cloud provider to another`,
  },
  {
    type: "DELETE",
    title: "DELETE IP",
    info: `Delete an IP from the Service`,
  },
];
