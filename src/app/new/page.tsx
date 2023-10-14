"use client";
import { Button, Flex, Select, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { addBook } from "../crud/addBook";
export type Book = {
    title: string;
    author: string;
    version: string;
    status: string;
  };
export default function newBook() {
  const form = useForm();
  const handleAddNew = () => {
    let newBook: Book = {
        title: typeof form.values.title === 'string' ? form.values.title : "",
        author: typeof form.values.author === 'string' ? form.values.author : "",
        version: typeof form.values.version === 'string' ? form.values.version : "",
        status: typeof form.values.status === 'string' ? form.values.status : "",
      };
    addBook(newBook)
    .then((resp)=>console.log(resp))
    .catch((err)=>console.log(err))
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
          />{" "}
          <DateInput
            valueFormat="DD.MM.YYYY"
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
