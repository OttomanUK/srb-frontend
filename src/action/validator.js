export function validateParameters(id="None", ntn="None", page="None", anomaly="None", date="None", location="None") {
    const isIdValid = id === "None" || id === "all" ||  (!isNaN(id) && !isNaN(parseFloat(id)));
    const isNtnValid = ntn === "None" || ntn === "all" ||   (!isNaN(ntn) && !isNaN(parseFloat(ntn)));
    const isPageValid = !isNaN(page) && Number.isInteger(page) && page > 0 || page=="None" || page==null;
    const isAnomalyValid = !isNaN(anomaly) && anomaly >= 0 || anomaly=="None";
    const isDateValid = date === "None" ||  /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isLocationValid = typeof location === "string";
  
    if (!isIdValid || !isNtnValid || !isPageValid || !isAnomalyValid || !isDateValid || !isLocationValid) {
      throw new Error("Invalid parameters");
    }
  }
  