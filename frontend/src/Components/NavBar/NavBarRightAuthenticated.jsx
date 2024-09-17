import { Avatar } from "@nextui-org/avatar";
import React, { useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";
import AvatarImage from "../../assets/avatar.webp";
import { authContext } from "../../Context/AuthProvider";
import useLogout from "../../Hooks/useLogout";
import { useHandleNavigate } from "../../Hooks/useHandleNavigate";

const NavBarRightAuthenticated = () => {
  const logout = useLogout();
  const { userDetails } = useContext(authContext);
  const { handleNavigate } = useHandleNavigate();

  return (
    <div className="flex  items-center gap-6">
      <Dropdown className="bg-secondary">
        <DropdownTrigger>
          <div className="flex items-center gap-1">
            <Avatar
              src={AvatarImage}
              size="md"
              showFallback
              className="border-3 border-purple-1 bg-secondary text-white cursor-pointer"
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu">
          <DropdownSection title="User Info" showDivider variant="none">
            <DropdownItem key="email" className="text-sm hover:cursor-default">
              {userDetails?.email}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection title="Pages" showDivider variant="none">
            <DropdownItem
              onClick={() => handleNavigate("/deposit")}
              key="deposit"
              className="text-sm"
            >
              Deposit
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<LuLogOut size={20} />}
              onClick={logout}
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavBarRightAuthenticated;
