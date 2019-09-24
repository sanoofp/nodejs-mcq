import React from "react";
import Chip from "@material-ui/core/Chip";
import A from "../../components/Button/A";

const links = [
  { to: "https://khanacademy.org", text: "Khan Academy" },
  { to: "https://www.topperlearning.com/", text: "Topper Learning"},
  { to: "https://byjus.com/", text: "Byjus" },
]

export default function AnalysisCard(props) {
  const { incorrectTags } = props;

  return (
    <div className="card improvements d-flex flex-column align-items-center">
      <h2>Analysis</h2>
      <div className="incorrect-tags">
        
          { 
            incorrectTags.length > 0 && 
            <h5>Based on your attended question, your weak areas are :</h5>
          }
          {
            incorrectTags.map(tag => <Chip key={tag} label={tag} className="chip" />)
          }          
        
        <div className="webpage-links">
          <h5>Useful websites for education</h5>
          {links.map(({ to, text }, i) => <A to={to} key={text} text={text} />)}
        </div>
      </div>      
    </div>
    )
} 
