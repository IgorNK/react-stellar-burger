import PropTypes from "prop-types";

const ErrorPopup = ({ children }) => {
  return (
    <p className="text text_type_main-default text_color_inactive">
      {children}
    </p>
  );
};

ErrorPopup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ErrorPopup;
