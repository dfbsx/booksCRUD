"use client";
import {
  Button,
  Flex,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { getBooks } from "./crud/getBooks";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { updateBook } from "./crud/updateBook";
export type newBook = {
  id: number | undefined;
  title: string | undefined;
  author: string | undefined;
  version: string | undefined;
  status: string | undefined;
};
export default function HomePage() {
  const [isRefreshing, setRefreshing] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      author: "",
      version: "",
      status: "",
    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [books, setBooks] = useState<{
    [key: string]: {
      id: number;
      title: string;
      author: string;
      version: string;
      status: string;
    };
  }>({});
  const [bookData, setBookData] = useState<newBook>();
  const handleUpdate = () => {
    let updateData: newBook = {
      id: bookData?.id,
      title: form.values?.title === "" ? bookData?.title : form.values.title,
      author:
        form.values?.author === "" ? bookData?.author : form.values.author,
      version:
        form.values.version === "" ? bookData?.version : form.values.version,
      status:
        form.values?.status === "" ? bookData?.status : form.values.status,
    };
    setRefreshing(true);
    updateBook(updateData)
      .then((resp) => {
        close();
        form.reset();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log("forrm",form.values)
    setRefreshing(false);
    getBooks()
      .then((resp) => setBooks(resp.data.books))
      .catch((err) => console.log(err));
  }, [isRefreshing, form.values]);
  const booksArray = Object.values(books);
  const rows = booksArray.map((book, i) => (
    <Table.Tr key={i}>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td>{book.author}</Table.Td>
      <Table.Td>{book.version}</Table.Td>
      <Table.Td>{book.status}</Table.Td>
      <Table.Td>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => {
            open();
            setBookData(book);
          }}
        >
          Edytuj
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  const ths = (
    <Table.Tr>
      <Table.Th>Tytuł</Table.Th>
      <Table.Th>Autor</Table.Th>
      <Table.Th>Rok wydania</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );
  return (
    <div>
      <Modal opened={opened} onClose={()=>{close(); form.reset()}} title="Edytuj książkę">
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
            <TextInput
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
              onClick={handleUpdate}
            >
              Zapisz
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
