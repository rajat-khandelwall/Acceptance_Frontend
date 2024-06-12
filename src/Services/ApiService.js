import axios from "axios";

export const ApiService = {
  submitFormData: async function (formData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/acceptance/create-project",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  },

  submitFormLocationData: async function (formData) {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8080/location/create-location-project",
        // "http://localhost:8080/acceptance/create-project-location",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  },

  fetchAgreementNumbers: async function (brand) {
    try {
      const response = await axios.get(
        `http://localhost:8080/acceptance/agrmntNumber?brand=${brand}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement numbers:", error);
      throw error;
    }
  },

  fetchAgreementNumbersLocation: async function (brand) {
    try {
      const response = await axios.get(
        `http://localhost:8080/location/agrmntNumber?brand=${brand}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement numbers:", error);
      throw error;
    }
  },

  fetchAgreementData: async function (agreementNumber, selectedDate) {
    try {
      const response = await axios.get(
        `http://localhost:8080/acceptance/${agreementNumber}/${selectedDate}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement data:", error);
      throw error;
    }
  },

  fetchAgreementLocationData: async function (
    agreementNumber,
    selectedDate,
    location
  ) {
    try {
      let response;
      if (selectedDate) {
        // If selectedDate is not null
        response = await axios.get(
          `
  http://localhost:8080/location/${agreementNumber}/${selectedDate}/${location}`
        );
      } else {
        // If selectedDate is null
        response = await axios.get(
          `
  http://localhost:8080/location/${agreementNumber}`
        );
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching agreement data:", error);
      throw error;
    }
  },

  updateBilling: async function (formData) {
    try {
      const response = await axios.post(
        `http://localhost:8080/acceptance/update-billing`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating billing:", error);
      throw error;
    }
  },

  updateBillingLocation: async function (formData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/location/create-location-project",
        // `http://localhost:8080/location/update-billing-location`,
        // `http://localhost:8080/acceptance/update-billing-location`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating billing:", error);
      throw error;
    }
  },

  downloadReports: async function (projectName) {
    try {
      const response = await axios.post(
        "http://localhost:8080/acceptance/downloadReports",
        projectName,
        {
          responseType: "blob", // Important for downloading binary data
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `${projectName}.zip`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading reports:", error);
    }
  },

  downloadReportsLocation: async function (formData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/location/downloadReportsLocation",
        // "http://localhost:8080/acceptance/downloadReportsLocation",
        formData.projectName,
        formData.location,
        {
          responseType: "blob", // Important for downloading binary data
        }
      );
      console.log(formData.projectName);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const month = new Date(formData.generatedDate)
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase();
      link.setAttribute(
        "download",
        `Acceptance-${formData.projectName}-${month}-2024.docx`
      );
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  },
};

export default ApiService;

// import axios from "axios";

// export const ApiService = {
//   submitFormData: async function (formData) {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/acceptance/create-project",
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       throw error;
//     }
//   },

//   submitFormLocationData: async function (formData) {
//     try {
//       console.log(formData);
//       const response = await axios.post(
//         // "http://localhost:8080/location/create-location-project",
//         "http://localhost:8080/acceptance/create-project-location",
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       throw error;
//     }
//   },

//   fetchAgreementNumbers: async function (brand) {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/acceptance/agrmntNumber?brand=${brand}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching agreement numbers:", error);
//       throw error;
//     }
//   },

//   // fetchAgreementNumbersLocation: async function (brand) {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:8080/location/agrmntNumber?brand=${brand}`
//   //     );
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Error fetching agreement numbers:", error);
//   //     throw error;
//   //   }
//   // },

//   fetchAgreementData: async function (agreementNumber, selectedDate) {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/acceptance/${agreementNumber}/${selectedDate}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching agreement data:", error);
//       throw error;
//     }
//   },

//   fetchAgreementLocationData: async function (
//     agreementNumber,
//     selectedDate,
//     location
//   ) {
//     try {
//       const response = await axios.get(
//         // `http://localhost:8080/location/${agreementNumber}/${selectedDate}/${location}`
//         `http://localhost:8080/acceptance/${agreementNumber}/${selectedDate}/${location}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching agreement data:", error);
//       throw error;
//     }
//   },

//   updateBilling: async function (formData) {
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/acceptance/update-billing`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating billing:", error);
//       throw error;
//     }
//   },

//   updateBillingLocation: async function (formData) {
//     try {
//       const response = await axios.post(
//         // `http://localhost:8080/location/update-billing-location`,
//         `http://localhost:8080/acceptance/update-billing-location`,
//         formData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating billing:", error);
//       throw error;
//     }
//   },

//   downloadReports: async function (projectName) {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/acceptance/downloadReports",
//         projectName,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;

//       link.setAttribute("download", `${projectName}.zip`);
//       document.body.appendChild(link);
//       link.click();

//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading reports:", error);
//     }
//   },

//   downloadReportsLocation: async function (formData) {
//     try {
//       const response = await axios.post(
//         // "http://localhost:8080/location/downloadReportsLocation",
//         "http://localhost:8080/acceptance/downloadReportsLocation",
//         formData,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;

//       const month = new Date(formData.generatedDate)
//         .toLocaleString("en-US", { month: "long" })
//         .toUpperCase();
//       link.setAttribute(
//         "download",
//         `Acceptance-${formData.projectName}-${month}-${formData.location}-2024.docx`
//       );
//       document.body.appendChild(link);
//       link.click();

//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading report:", error);
//     }
//   },

//   updateReportsLocation: async function (formData) {
//     try {
//       const response = await axios.post(
//         // "http://localhost:8080/location/downloadReportsLocation",
//         "http://localhost:8080/acceptance/updateReportsLocation",
//         formData,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;

//       const month = new Date(formData.generatedDate)
//         .toLocaleString("en-US", { month: "long" })
//         .toUpperCase();
//       link.setAttribute("download", `${formData.projectName}.zip`);
//       document.body.appendChild(link);
//       link.click();

//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading report:", error);
//     }
//   },
// };

// export default ApiService;
