"use client";

import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Paper,
  Button,
  Container,
  PasswordInput,
  TextInput,
  Stack,
  Title,
  Text,
  Space,
  Loader,
} from "@mantine/core";
import useLoginUser from "@/app/hooks/auth/useLoginUser";
import { CustomInput, CustomPasswordInput } from "@/app/components/Input";
import { CustomButton } from "@/app/components/Button";
import { headImage } from "@/app/constants/images";
import { LoadingOverlay } from "@mantine/core";
import { successToast } from "@/app/lib/toast";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
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

  const loginTriggered = () => {
    router.push("/dashboard");
  };
  const { mutate: login, isPending, isSuccess } = useLoginUser(loginTriggered);

  const handleSubmit = (values: IFormInput) => {
    const { email, password } = values;
    login(
      { email, password },
      {
        onSuccess(data) {
          successToast("Connexion réussie");
        },
        onSettled() {},
        onError(err) {
          form.setErrors({
            email: "Email ou mot de passe incorrect",
            password: "Email ou mot de passe incorrect",
          });
        },
      }
    );
  };
  return (
    <Container className="pt-8">
      <LoadingOverlay
        visible={isSuccess}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Paper shadow="sm" radius="md" withBorder className="">
        <div className="flex gap-2 w-full ">
          <div className="flex flex-col m-auto sm:w-2/3 md:w-2/5 w-4/5 px-4 mt-8">
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: "blue", to: "green", deg: 90 }}
            >
              Bienvenue sur e-Science
            </Text>
            <form
              className="flex flex-col gap-5 mt-8 items-center"
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
              <Stack className="w-full">
                <CustomInput
                  placeholder="Email"
                  label="Email"
                  {...form.getInputProps("email")}
                />
                <CustomPasswordInput
                  placeholder="Mot de passe"
                  label="Mot de passe"
                  {...form.getInputProps("password")}
                />
              </Stack>
              <div className=" flex flex-col gap-1 w-1/2 ">
                <CustomButton
                  disabled={isPending}
                  type="submit"
                  variant="filled"
                  size="lg"
                >
                  {" "}
                  {isPending ? (
                    <Loader color="teal.4" type="bars" size="sm" />
                  ) : (
                    "Se connecter"
                  )}
                </CustomButton>
                <div>
                  <Text size="sm" className="text-center">
                    Vous n&apos;avez pas de compte ?
                    <Text
                      fs="italic"
                      td="underline"
                      ml={2}
                      c="teal.4"
                      component={Link}
                      className="underline-offset-1"
                      href="/registration/signup"
                    >
                      S&apos;inscrire
                    </Text>
                  </Text>
                </div>
              </div>
            </form>
          </div>
          <div className=" relative border-2 hidden md:block w-3/5">
            <Image src={headImage} alt="head" className="object-cover" />
            <div className="absolute inset-0 bg-teal-400 opacity-30 filter " />
          </div>
        </div>
      </Paper>
    </Container>
  );
}
