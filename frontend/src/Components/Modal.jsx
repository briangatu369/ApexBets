import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Modal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return <div>Modal</div>;
};
