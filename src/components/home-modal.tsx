import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

/* pop up with the following text
Our tech geeks are currently building the website to bring to you the best experience possible. Please don't take all the data on this website to be final and binding, we'll update it to the actual figures at the earliest. Apologies for the inconvenience.
*/
const HomeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => onOpen(), [onOpen]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody m="1rem" display="flex" flexDir="column" color="black">
            <Text>
              Our tech geeks are currently building the website to bring to you
              the best experience possible. Please don&apos;t take all the data
              on this website to be final and binding, we&apos;ll update it to
              the actual figures at the earliest. Apologies for the
              inconvenience.
            </Text>
            <Button onClick={onClose} mt="1rem">
              I agree
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomeModal;
