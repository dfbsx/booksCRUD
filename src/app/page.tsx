"use client";
import { Button, Flex, Modal, Select, Table, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { getBooks } from "./crud/getBooks";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import newBook from "./new/page";
export default function HomePage() {
  const form = useForm();
  type newBook = {
    id: number,
    title: string,
    author: string,
    version: string,
    status: string,
  }
  const [opened, { open, close }] = useDisclosure(false);
  const [books, setBooks] = useState<{
    [key: string]: {
      id: number,
      title: string;
      author: string;
      version: string;
      status: string;
    };
  }>({});
  const [bookData, setBookData] = useState<newBook>();
  useEffect(() => {
    getBooks()
      .then((resp) => setBooks(resp.data.books))
      .catch((err) => console.log(err));
  }, [books]);
  const booksArray = Object.values(books);
  const rows = booksArray.map((book, i) => (
    <Table.Tr key={i}>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td>{book.author}</Table.Td>
      <Table.Td>{book.version}</Table.Td>
      <Table.Td>{book.status}</Table.Td>
      <Table.Td>
        <Button variant="subtle" size="xs" onClick={() => { open(); setBookData(book) }}>
          Edytuj
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  const ths = (
    <Table.Tr>
      <Table.Th>Tytuł</Table.Th>
      <Table.Th>Autor</Table.Th>
      <Table.Th>Data wydania</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Edytuj książkę">
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
            placeholder={bookData?.title}
            {...form.getInputProps("title")}
          />
          <TextInput
            size="md"
            label="Autor"
            placeholder={bookData?.author}
            {...form.getInputProps("author")}
          />
          <DateInput
            valueFormat="DD.MM.YYYY"
            label="Data wydania"
            placeholder={bookData?.version}
            size="md"
            {...form.getInputProps("version")}
          />
          <Select
            label="Status"
            size="md"
            placeholder={bookData?.status}
            data={["Do przeczytania", "Teraz czytam", "Przeczytana"]}
            {...form.getInputProps("status")}
          />
          <Button
            variant="filled"
            color="teal"
            size="md"
          >
            Zapis
          </Button>
        </Flex>
      </form>
      </Modal>
      <Text fw={500} mb="xl">
        Twoje książki:
      </Text>
      <Table captionSide="bottom">
        <Table.Caption>To już wszystko</Table.Caption>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
