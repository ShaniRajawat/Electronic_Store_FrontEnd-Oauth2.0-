import { Card } from "react-bootstrap";

export default function(
    {
        icon,
        text,
        number
    }
){
    return(
        <Card className="shadow">
            <Card.Body className="text-center">
              {icon}
              <h3>{text}</h3>
              <h3>{number}+</h3>
            </Card.Body>
          </Card>
    )
}