import { LucideIcon } from "lucide-react";
import React from "react";

type IconButtonProps = {
  icon: LucideIcon;
  onClick?: () => void;
  size?: number;
  isActive?: boolean;
  color?: string
};
const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  size = 18,
  isActive = false,
  color
}) => {
  return (
    <button type="button" onClick={onClick} className={`${isActive ? "bg-gray-200 text-black" : ""} p-2 rounded text-gray-800 transition duration-300`}>
      <Icon size={size} color={color}/>
    </button>
  );
};

export default IconButton;
