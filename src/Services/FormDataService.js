export const FormDataService = {
  formData: {
    projectId: "",
    department: "",
    subDeprtmt: "",
    projectName: "",
    brand: "",
    generatedDate: "",
    fromDate: "",
    toDate: "",
    agrmntNumber: "",
    ordrNumber: "",
    respPersonal: "",
    srvcProvider: "",
    srvcReceiver: "",
    prjctDesc: "",
    srvcCost: "",
    srvcMonthlyCost: "",
    srvcRemainBdgt: "",
    miscCost: "",
    miscPricing: "",
    miscMonthlyBdgt: "",
    miscRemainBdgt: "",
    totalCost: "",
    totalMonthlyBdgt: "",
    totalRemainBdgt: "",
    mngrName: "",
    clientName: "",
    justification: "",
    levelInfo: [],
  },
  getFormData: function () {
    return this.formData;
  },
};

export default FormDataService;
