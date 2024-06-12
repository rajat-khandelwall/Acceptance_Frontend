import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import AcceptanceCriteriaForm from "./Components/SingleLocation/AcceptanceCriteriaForm";
import ResponseRecorded from "./Components/ResponseRecorded";
import FormDataService from "./Services/FormDataService";
import FormDataServiceLocation from "./Services/FormDataServiceLocation";
import AcceptanceUpdate from "./Components/SingleLocationUpdate/AcceptanceUpdate";
import Location from "./Components/MultiLocation/Location";
import LocationUpdate from "./Components/MultiLocationUpdate/LocationUpdate";

const App = () => {
  const [formData, setFormData] = useState(FormDataService.getFormData());
  const [formDataLocation, setFormDataLocation] = useState(
    FormDataServiceLocation.getFormData()
  );
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Router>
      <div>
        <Header />
        <NavigationBar handleOptionChange={handleOptionChange} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/single-location"
            element={
              <AcceptanceCriteriaForm
                formData={formData}
                setFormData={setFormData}
              />
            }
          />
          <Route path="/response-recorded" element={<ResponseRecorded />} />
          <Route
            path="/single-location-update"
            element={
              <AcceptanceUpdate formData={formData} setFormData={setFormData} />
            }
          />
          <Route
            path="/multi-location"
            element={
              <Location
                formData={formDataLocation}
                setFormData={setFormDataLocation}
              />
            }
          />
          <Route
            path="/multi-location-update"
            element={
              <LocationUpdate
                formData={formDataLocation}
                setFormData={setFormDataLocation}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
