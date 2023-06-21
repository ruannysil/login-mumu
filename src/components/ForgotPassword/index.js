import { Text, Flex, Input, Image, Button, Center, useToast, Link, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSignOutAlt} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import logo from '../../images/logo.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const savedEmail = localStorage.getItem('email'); // Move it here

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

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
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        if (email === savedEmail) {
          navigate("/");
        } else {
          toast({
            title: "Erro!",
            description: "Email incorreto.",
            status: "error",
            duration: 5000,
            position: 'top-right',
            isClosable: true,
          });
        }
      }, 2000);
    }
  }, [email, loading, navigate, savedEmail, toast]);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  return (
    <Flex h="100vh" align="center" justify="center">
      <Flex w="700px" flexDirection="column" m="1.5" background="#b83232" p="4" borderRadius={6} boxShadow="2px 2px 10px #000;">
        <Link
          href="/"
          transform="scaleX(1)"
          transition="transform 0.3s"
          _hover={{
            transform: "scale(1.5)",
            color: "#ffd903"
          }}
          position={"absolute"}
          right={"1rem"}
        >
          <FaSignOutAlt  size={20}  />
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

          <Button w="100%" bg={"#fff"} _hover={{bg: "#ffd903", color: "#fff"}}  onClick={handleRedefined} disabled={loading}>
            {loading ? (
              <Spinner size="md" color="#070101" />
            ) : (
              " Redefinir senha"
            )}
          </Button>

        </Flex>
      </Flex>
    </Flex>
  );
}

export default ForgotPassword;
