import { Text, Flex, Input, Image, InputGroup, InputRightElement, Button, Center, Checkbox, Link, useMediaQuery, useToast, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from './images/logo.png';

function App() {
  const [show, setShow] = useState(false);
  const handleButton = () => setShow(!show);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorFields, setErrorFields] = useState({
    email: false,
    password: false
  });
  const [isMobile] = useMediaQuery("(max-width: 375px)");
  const [isChecked, setIsChecked] = useState(false); // Estado do checkbox
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const savedCheckbox = localStorage.getItem('isChecked'); // Obter valor do localStorage

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }

    setIsChecked(savedCheckbox === 'true'); // Definir o estado do checkbox com base no valor do localStorage
  }, []);

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (email === savedEmail && password === savedPassword) {
          window.location.href = "https://llanding-pagemm.vercel.app/"; // Redirecionar para a página desejada
        } else {
          toast({
            title: "Erro!",
            description: "Email ou senha incorretos.",
            status: "error",
            duration: 5000,
            position: 'top-right',
            isClosable: true,
          });
        }
      }, 2000);
    }
  }, [email, loading, password, toast]);

  function handleRegister() {
    const regEx = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

    let errorFields = {
      email: false,
      password: false
    };

    if (email === "" || !regEx.test(email)) {
      errorFields.email = true;
    }

    if (password === "") {
      errorFields.password = true;
    }

    if (email === "" && password === "") {
      toast({
        title: "Erro!",
        description: "Preencha o email e a senha corretamente.",
        status: "error",
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      return;
    }

    if (Object.values(errorFields).some(field => field)) {
      toast({
        title: "Erro!",
        description: "Preencha os campos corretamente.",
        status: "error",
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    } else {
      const savedEmail = localStorage.getItem('email');
      const savedPassword = localStorage.getItem('password');

      if (email === savedEmail && password === savedPassword) {
        toast({
          title: "Sucesso!",
          description: "Email e senha já estão salvos.",
          status: "success",
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });
      } else {
        toast({
          title: "Sucesso!",
          description: "Dados preenchidos corretamente.",
          status: "success",
          duration: 5000,
          position: 'top-right',
          isClosable: true,
        });

        if (isChecked) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      }
    }

    setErrorFields(errorFields);
    setLoading(true);
  }

  function handleInputChange(field, value) {
    if (field === 'email') {
      setEmail(value);
      setErrorFields({ ...errorFields, email: false });
    } else if (field === 'password') {
      setPassword(value);
      setErrorFields({ ...errorFields, password: false });
    }
  }

  function handleFieldFocus(field) {
    setErrorFields({ ...errorFields, [field]: false });
  }

  function handleCheckboxChange() {
    setIsChecked(!isChecked); // Inverte o estado do checkbox quando ele é alterado
    localStorage.setItem('isChecked', !isChecked); // Salva o valor do checkbox no localStorage
  }

  return (
    <Flex h="100vh" align="center" justify="center">
      <Flex w="700px" flexDirection="column" m="1.5" background="#b83232" p="4" borderRadius={6} boxShadow="0px 0px 15px #000;">
        <Flex maxW={700} flex={1} gap={5} direction="column" alignItems="center">
          <Center w="100%">
            <Image src={logo} alt="logo mumu" w="20rem" />
          </Center>
          <Input
            type="email"
            placeholder="Email"
            _placeholder={{ color: "#fff" }}
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            focusBorderColor={errorFields.email ? "#ff0303" : "#fff"}
            onFocus={() => handleFieldFocus('email')}
            isDisabled={isChecked && email !== ''}
          />

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Senha"
              _placeholder={{ color: '#fff' }}
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              focusBorderColor={errorFields.password ? "#ff0303" : "#fff"}
              onFocus={() => handleFieldFocus('password')}
              isDisabled={isChecked && password !== ''}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="lg" bg="transparent" color="white" _hover={{ bg: 'none' }} onClick={handleButton}>
                {show ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button w="100%" bg={"#fff"} _hover={{bg: "#ffd903", color: "#fff"}}  onClick={handleRegister} disabled={loading}>
            {loading ? (
              <Spinner size="md" color="#070101" />
            ) : (
              "Entrar"
            )}
          </Button>

          <Flex w="100%" justifyContent="space-evenly" align="center">
            <Checkbox
              id="checkbox-remember"
              isChecked={isChecked}
              onChange={handleCheckboxChange}
            >
              <Text as="span" fontSize={isMobile ? "12px" : "16px"}>Continuar conectado.</Text>
            </Checkbox>
            <Link href="/forgot-password" _hover={{ color: "#ffd903" }} fontSize={isMobile ? "12px" : "16px"}>
              Esqueceu a senha?
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
