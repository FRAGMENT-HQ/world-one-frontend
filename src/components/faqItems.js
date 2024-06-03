import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

function FaqItems({
  number = "01",
  small = "Lorem ipsum dolor sit amet consectetur. Quisque nec mattis congue cursus velit habitasse ",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  oppen = false,
}) {
  return (
    <div>
      <Accordion
      defaultExpanded={oppen}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: "1px solid #ccc",
          "&:last-child": {
            borderBottom: "2px solid #ccc",
            width: "93vw",
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <img
              className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
              alt=""
              src="/eiarrowright-4@2x.png"
            />
          }
          
          id="panel1-header"
        >
          <div className="flex justify-start items-center  gap-5">
            {" "}
            <div className="text-5xl text-[#828282] ">{number}</div>{" "}
            <div className="text-5xl"> {small} </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FaqItems;
