"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { Paper, Button, Container, PasswordInput, TextInput, Stack, Title,Text } from "@mantine/core";
import useLoginUser from "@/app/hooks/auth/useLoginUser";
import { CustomInput } from "@/app/components/Input";
import { CustomButton } from "@/app/components/Button";
import { headImage } from "@/app/constants/images";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<IFormInput>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "email invalide"),
      password: (value) => (value.length >= 8 ? null : "Mot de passe invalide"),
    },
  });

  const loginTriggered = () => {};
  const { mutate: login, isPending } = useLoginUser(loginTriggered);

  const handleSubmit = (values: IFormInput) => {
    const { email, password } = values;
    login(
      { email, password },
      {
        onSuccess(data) {
          console.log(data);
        },
        onSettled() {},
        onError() {},
      }
    );
  };
  return (
  <Container className="pt-8">
    <Paper shadow="sm" radius="md" withBorder className="">
      <div className="flex gap-2 w-full ">
          <div  className=" flex flex-col w-2/5 px-4 mt-8">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'blue', to: 'green', deg: 90 }}
             >
              Bienvenue sur e-Science
            </Text>
            <form className="flex flex-col gap-5 mt-8 items-center" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Stack className="w-full">
                <CustomInput placeholder="Email" label="Email"/>
                <CustomInput placeholder="Mot de passe" label="Mot de passe"/>
              </Stack>
              <div className=" flex flex-col gap-1 w-1/2 ">
                <CustomButton text={isPending ? ("Please wait...") : ("Login")} disabled={isPending} type="submit" variant="filled" size='lg'  />
                <div>
                  <Text size="sm" className="text-center">
                    Vous n'avez pas de compte ? 
                  </Text>
                  <Link href="/registration/signup">
                      <CustomButton variant='transparent' text="S'inscrire" size='md'/>
                    </Link>
                </div>
              </div>
              {/* <Button classNames={{root:"w-80"}} onClick={() => form.reset()}>Reset</Button> */}
          </form>
          </div>
          <div className=" relative border-2  w-3/5">
            <Image src={headImage} alt="head" className="object-cover"/>
            <div className="absolute inset-0 bg-teal-400 opacity-30 filter " /> 
          </div>
      </div>
    </Paper>
  </Container>
  );
}



{/* <TextInput
            classNames={{
              label: "bg-red-100",
              input:"focus:border-red-700 focus:border-2 outline-none"
            }}
            withAsterisk
            label="email"
            placeholder="JohnDoe@email.com"
            {...form.getInputProps("email")}
          /> */}
          {/* <PasswordInput
            classNames={{
              label: "bg-blue-100",
            }}
            withAsterisk
            label="Mot de passe"
            {...form.getInputProps("password")}
          /> */}
