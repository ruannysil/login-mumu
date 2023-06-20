import { Text, Flex, Input, Image, Button, Center, useToast, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FaSignOutAlt} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import logo from '../../images/logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // const handleRedefined = () => {
  //   if (email.trim() === '') {
  //     toast({
  //       title: "Erro!",
  //       description: "Preencha o campo de email.",
  //       status: "error",
  //       duration: 5000,
  //       position: 'top-right',
  //       isClosable: true,
  //     });
  //   } else if (!validateEmail(email)) {
  //     toast({
  //       title: "Erro!",
  //       description: "Email inválido. Por favor, insira um email válido.",
  //       status: "error",
  //       duration: 5000,
  //       position: 'top-right',
  //       isClosable: true,
  //     });
  //   } else {
  //     toast({
  //       title: "Sucesso!",
  //       description: "Email enviado para redefinição de senha.",
  //       status: "success",
  //       duration: 5000,
  //       position: 'top-right',
  //       isClosable: true,
  //     });

  //     // Verifica se o email está correto antes de navegar
  //     const emailDomain = email.slice("@")[1].toLocaleLowerCase();
  //     const allowedDomains = ["mail.com", "prontonmail", "outlook", "@gmail.com"]
  //     if(allowedDomains.includes(emailDomain)) {
  //       navigate("/")
  //     }
  //   }
  // };

//   const handleRedefined = () => {
//   if (email.trim() === '') {
//     toast({
//       title: "Erro!",
//       description: "Preencha o campo de email.",
//       status: "error",
//       duration: 5000,
//       position: 'top-right',
//       isClosable: true,
//     });
//   } else if (!validateEmail(email)) {
//     toast({
//       title: "Erro!",
//       description: "Email inválido. Por favor, insira um email válido.",
//       status: "error",
//       duration: 5000,
//       position: 'top-right',
//       isClosable: true,
//     });
//   } else {
//     toast({
//       title: "Sucesso!",
//       description: "Email enviado para redefinição de senha.",
//       status: "success",
//       duration: 5000,
//       position: 'top-right',
//       isClosable: true,
//     });

//     // Verifica se o email está correto antes de navegar
//     const emailDomain = email.split('@')[1].toLowerCase();
//     const allowedDomains = ["mail.com", "protonmail", "outlook", "gmail.com"];

//     if (allowedDomains.includes(emailDomain)) {
//       navigate("/");
//     }
//   }
// };

const handleRedefined = () => {
  if (email.trim() === '') {
    toast({
      title: "Erro!",
      description: "Preencha o campo de email.",
      status: "error",
      duration: 5000,
      position: 'top-right',
      isClosable: true,
    });
  } else if (!validateEmail(email)) {
    toast({
      title: "Erro!",
      description: "Email inválido. Por favor, insira um email válido.",
      status: "error",
      duration: 5000,
      position: 'top-right',
      isClosable: true,
    });
  } else {
    const savedEmail = localStorage.getItem('email');

    if (savedEmail && savedEmail === email) {
      toast({
        title: "Sucesso!",
        description: "Email enviado para redefinição de senha.",
        status: "success",
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });

      navigate("/");
    } else {
      toast({
        title: "Erro!",
        description: "Email não corresponde ao cadastrado.",
        status: "error",
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }
};


  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Flex w="700px" flexDirection="column" m="1.5" background="#ffac00" p="4" borderRadius={6} boxShadow="2px 2px 10px #000;">
        <Link href="/">
            <FaSignOutAlt  size={20} />
        </Link>
        <Flex maxW={700} flex={1} gap={5} direction="column" alignItems="center">
          <Center w="100%">
            <Image src={logo} alt="logo mumu" w="20rem" />
          </Center>

          <Text fontWeight={700} textAlign={"center"}>
            Esqueceu sua senha? Sem problemas.
          </Text>

          <Text as={"span"}>
            Enviaremos um email com instruções de como redefinir sua senha.
          </Text>

          <Input
            type="email"
            placeholder="Email"
            _placeholder={{ color: "#fff" }}
            value={email}
            onChange={handleInputChange}
            focusBorderColor={"#fff"}
          />
          <Button w="100%" onClick={handleRedefined}>Redefinir senha</Button>

        </Flex>
      </Flex>
    </Flex>
  );
}

export default ForgotPassword;
