import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import "../styles/services.css"; // New CSS file for improved styles

// Import images
import tpmSensorMachine from "../assets/images/equipment/tpm sensor machine.png";
import batteryTestingMachine from "../assets/images/equipment/battery test.png";
import videoInspectionScopeDevice from "../assets/images/equipment/video inspection scope.png";
import coolingSystemKit from "../assets/images/equipment/coolingSystemKit.png";
import fuelPumpTestingKit from "../assets/images/equipment/Fuel pump test.png";
import oilPressureGauge from "../assets/images/equipment/Oil pressure gauge Set.png";
import brakeServiceMachine from "../assets/images/equipment/Brake services machine.png";
import acChargeMachineR1234yf from "../assets/images/equipment/AC charge machine R1234yf.png";
import exhaustWeldingMachine from "../assets/images/equipment/Exhaust welding machine titanium.png"
import lyft from "../assets/images/machine.png";
import wheelBalancing from "../assets/images/equipment/wheelBalancing.jpg"
import scanningDiagnosticTool from "../assets/images/equipment/scanningDiagnostic.png"
import DiagnosticMobileWorkcenter from "../assets/images/equipment/DiagnosticMobileWorkcenter.png"


const OurServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Overall Electric Inspection",
      description:
        "Comprehensive complete electric diagnostic",
      equipment: ["Video Inspection Scope", "Fuel Pump Testing Kit", "Oil Pressure Gauge"],
      image: scanningDiagnosticTool, // Image of related equipment
    },

    {
      name: "Diagnostic Mobile Workcenter",
      description:
        "Comprehensive complete electric diagnostic",
      equipment: ["Video Inspection Scope", "Fuel Pump Testing Kit", "Oil Pressure Gauge"],
      image: DiagnosticMobileWorkcenter, // Image of related equipment
    },

    // duplicate
    {
      name: "Wheel Balancing",
      description:
        "Prevent vibrations for added safety on the road",
      equipment: ["Video Inspection Scope", "Fuel Pump Testing Kit", "Oil Pressure Gauge"],
      image: wheelBalancing, // Image of related equipment
    },
  
    {
      name: "Wheel Alignment & Suspension",
      description:
        "Advanced alignment and suspension solutions to ensure stability, smoother rides, and extended tire life.",
      equipment: ["Hunter Wheel Alignment and Balancing", "Suspension Tools"],
      image: lyft,
    },
    {
      name: "Battery Testing & Alternator Services",
      description:
        "Diagnose and test batteries, alternators, and starters to ensure optimal performance and prevent breakdowns.",
      equipment: ["Battery Testing Kit", "Alternator Testing Tools"],
      image: batteryTestingMachine,
    },
    {
      name: "Engine video inspection",
      description:
        "Comprehensive diagnostics and expert repairs to restore your engine's performance.",
      equipment: ["Video Inspection Scope", "Fuel Pump Testing Kit", "Oil Pressure Gauge"],
      image: videoInspectionScopeDevice, // Image of related equipment
    },
    {
      name: "Air Conditioning",
      description:
        "AC services, including recharging, leak detection, and performance maintenance for R134 and R1234yf systems.",
      equipment: ["AC Charge Machine R134", "AC Charge Machine R1234yf", "AC Nitrogen Leak Test"],
      image: acChargeMachineR1234yf,
    },
    {
      name: "Brake Services",
      description:
        "Precision brake repairs and maintenance, including pad replacement and rotor resurfacing.",
      equipment: ["Brake Service Machine", "Vacuum Pump Testing Kit"],
      image: brakeServiceMachine,
    },
    {
      name: "Engine and transmission oil pressure test",
      description:
        "Quick and efficient oil pressure verification.",
      equipment: ["Oil Pressure Gauge", "Fluid Pumps"],
      image: oilPressureGauge,
    },
    {
      name: "Heating and Cooling System",
      description:
        "Diagnose and repair heating and cooling systems, including radiator issues and thermostat replacements.",
      equipment: ["Cooling System Pressure Test Kit", "Radiator Leak Testing Kit"],
      image: coolingSystemKit,
    },
    {
      name: "TPM Sensor Test",
      description:
        "State-of-the-art computerized diagnostics and tune-ups to improve vehicle efficiency and resolve hidden issues.",
      equipment: ["OBD-II Scanner", "Tune-Up Tools"],
      image: tpmSensorMachine,
    },
    {
      name: "Exhaust System",
      description:
        "Inspection and repair of the exhaust system to reduce emissions, improve fuel efficiency, and eliminate leaks.",
      equipment: ["Exhaust Pressure Testing Kit"],
      image: exhaustWeldingMachine,
    },
    // {
    //   name: "Clutch Services",
    //   description:
    //     "Comprehensive clutch inspections, adjustments, and replacements to ensure smooth gear shifting and driving comfort.",
    //   equipment: ["Clutch Alignment Tools", "Pressure Plate Testing Tools"],
    //   image: oilPressureGauge,
    // },
    // {
    //   name: "Traction Control & ABS",
    //   description:
    //     "Repair and maintenance of Anti-Lock Braking Systems (ABS) and traction control for enhanced safety and control.",
    //   equipment: ["Brake Service Machine", "ABS Scanner"],
    //   image: brakeServiceMachine,
    // },
    // {
    //   name: "Lights & Electrical Systems",
    //   description:
    //     "Inspection, repair, and replacement of all vehicle lights and electrical components, including fuses and wiring.",
    //   equipment: ["Electrical Testing Tools", "Lighting Fixtures"],
    //   image: batteryTestingMachine,
    // },
    {
      name: "Preventive Maintenance",
      description:
        "General preventive maintenance to keep your car running smoothly, including fuil pump, fuil filter, and filter replacements.",
      equipment: ["Preventive Maintenance Kit"],
      image: fuelPumpTestingKit,
    },
  ];
  

  return (
    <>
      <Header className="blackHeader" />
      <div className="contentContainer">
        <article className="session">
          <h2 className="pageTitle">/Our Services</h2>
          <h1>Our Services</h1>
          <p>
            Our range of services combines expertise, advanced tools, and a
            customer-focused approach to ensure the highest quality and satisfaction.
          </p>

          {/* Services Section */}
          <div className="servicesGrid">
            {services.map((service, index) => (
              <div key={index} className="serviceCard">
                <img
                  src={service.image}
                  alt={service.name}
                  className="serviceImage"
                />
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                {/* <h3>Equipment Used:</h3> */}
                {/* <ul>
                  {service.equipment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
        </article>

        {/* Contact Button */}
        <div className="contactButtonContainer">
          <button
            onClick={() => navigate("/contact-us")}
            className="contactButton"
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

export default OurServices;
