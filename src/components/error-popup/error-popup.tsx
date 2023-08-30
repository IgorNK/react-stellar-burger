export default const ErrorPopup: React.FC<{
  children: string | React.ReactElement | React.ReactElement[]
}> = ({ children }) => {
  return (
    <p className="text text_type_main-default text_color_inactive">
      {children}
    </p>
  );
};
