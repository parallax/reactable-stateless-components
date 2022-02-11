import TesterComponent from "./Tester.component";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TesterContainer = (props) => {
  const { t } = useTranslation();

  const containerFunctions = { t };

  const containerProps = {};

  return (
    <TesterComponent {...props} {...containerProps} {...containerFunctions} />
  );
};
export default TesterContainer;

TesterContainer.propTypes = {
  /**
   * This is a sample proptype used to create docs - docs are https://storybook.js.org/docs/react/writing-docs/doc-blocks
   * for more info on prop types please visit https://reactjs.org/docs/typechecking-with-proptypes.html
   */
  sample: PropTypes.string,
};

TesterContainer.defaultProps = {
  sample: "this is a sample string",
};
