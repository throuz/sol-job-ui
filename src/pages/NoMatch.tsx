import { Link } from "react-router-dom";
import styled from "styled-components";

const NoMatch = () => {
  return (
    <Container>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </Container>
  );
};

export default NoMatch;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
