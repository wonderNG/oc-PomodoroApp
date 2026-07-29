import { Edit } from "lucide-react";

export function SelectInput({defDuration, name="Option", onClick}){
  return(
    <div className="select-input" onClick={onClick}>
      <div>
        <Edit className="select-icon"/>
      </div>
      <div className="select-text">
        <span>
            {name}
        </span>
        {defDuration}m
      </div>
    </div>
  );
};

