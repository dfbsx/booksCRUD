"use client";
import { Button, Flex, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { addBook } from "../crud/addBook";
import { useRouter } from "next/navigation";
export type Book = {
  title: string;
  author: string;
  version: string;
  status: string;
};
export default function newBook() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      version: "",
      status: "",
    },
  });
  const handleAddNew = () => {
    let newBook: Book = {
      title: form.values.title !== "" ? form.values.title : "",
      author: form.values.author !== "" ? form.values.author : "",
      version: form.values.version !== "" ? form.values.version : "",
      status: form.values.status !== "" ? form.values.status : "",
    };
    addBook(newBook)
      .then((resp) => router.push("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Text fw={500} mb="xl">
        Nowa książka
      </Text>
      <form>
        <Flex
          gap="md"
          justify="center"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <TextInput
            size="md"
            label="Tytuł"
            placeholder="Dziady"
            {...form.getInputProps("title")}
          />{" "}
          <TextInput
            size="md"
            label="Autor"
            placeholder="Adam Mickiewicz"
            {...form.getInputProps("author")}
          />
          <TextInput
            label="Data wydania"
            placeholder="Data wydania"
            size="md"
            {...form.getInputProps("version")}
          />
          <Select
            label="Status"
            size="md"
            placeholder="Wybierz z listy"
            data={["Do przeczytania", "Teraz czytam", "Przeczytana"]}
            {...form.getInputProps("status")}
          />
          <Button
            variant="filled"
            color="teal"
            size="md"
            onClick={() => handleAddNew()}
          >
            Dodaj
          </Button>
        </Flex>
      </form>
    </div>
  );
}
