import TesterComponent from "./Tester.component";

const TesterContainer = (props) => {
  const containerProps = {};
  const containerFunctions = {};
  return (
    <TesterComponent {...props} {...containerProps} {...containerFunctions} />
  );
};
export default TesterContainer;
