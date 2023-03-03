import styled from "styled-components";

const StyledSpinner = styled.div`
  border: 2px solid white;
  border-left: 2px solid transparent;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;
const Spinner = () => {
  return <StyledSpinner className="animate-spin"></StyledSpinner>;
};

export default Spinner;
