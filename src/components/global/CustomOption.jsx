import { AiOutlineCheck } from "react-icons/ai";

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isSelected } = props;
  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="flex cursor-default items-center gap-2 p-2 hover:bg-blue-dark hover:bg-opacity-15"
    >
      <AiOutlineCheck
        className={`${
          isSelected ? "opacity-100" : "opacity-0"
        } transition-all duration-300`}
      />
      {data.label}
    </div>
  );
};

export default CustomOption;
