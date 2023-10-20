"use client";
import {
  Button,
  Flex,
  Group,
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
import { deleteBook } from "./crud/deteteBook";
/*Strona główna aplikacji*/

//tworzenie typu książki
export type newBook = {
  id: number | undefined;
  title: string | undefined;
  author: string | undefined;
  version: string | undefined;
  status: string | undefined;
};

//funkcja główna
export default function HomePage() {
  const [isRefreshing, setRefreshing] = useState(false); //stan umożliwiający rerender
  
  const form = useForm({ //form (z biblioteki Mantine) umożliwiający kontrolę pracy formularza
    initialValues: { //inicjalizacja początkowych wartości obiektu
      title: "",
      author: "",
      version: "",
      status: "",
    },
  });
  const [opened, { open, close }] = useDisclosure(false); //kontrola modalu
  const [opened2, handlers] = useDisclosure(false); //kontrola drugiego modalu
  const [books, setBooks] = useState<{ //stworzenie stanu przechowującego pobrane książki
    [key: string]: {
      id: number;
      title: string;
      author: string;
      version: string;
      status: string;
    };
  }>({});
  const [bookData, setBookData] = useState<newBook>(); //stan mający na celu przechowywanie dane WYBRANEJ książki
  const handleUpdate = () => { //funkcja obsługująca aktualizację obiektu
    let updateData: newBook = { //dane typu newBook, jeżeli wartość w formularzu jest pusta, bierzemy dane wczytane z bazy, jeśli nie - z formularza
      id: bookData?.id,
      title: form.values?.title === "" ? bookData?.title : form.values.title,
      author:
        form.values?.author === "" ? bookData?.author : form.values.author,
      version:
        form.values.version === "" ? bookData?.version : form.values.version,
      status:
        form.values?.status === "" ? bookData?.status : form.values.status,
    };
    setRefreshing(true); //stan renderowania
    updateBook(updateData) //wywołanie funckji, która przekaże dane do serwera
      .then((resp) => {
        close();//zamknięcie modalu
        form.reset();//wyczyczenie wartości formularza
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = () => { //obsługa usuwania
    if (bookData?.id !== undefined) {
      deleteBook(bookData?.id) //jeżeli książka ma id wywołujemy funkcję przekazującą id do serwera
        .then((resp) => {
          setRefreshing(true); //zmiana stanu odświeżania
          handlers.close(); //zamknięcie modalu
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => { //useEffect uruchamiany zgodnie z tablicą zależności
    setRefreshing(false);//stan odświeżania 
    getBooks()//pobranie książek z serwera
      .then((resp) => setBooks(resp.data.books)) //zapisanie pobranych książek do stanu
      .catch((err) => console.log(err));
  }, [isRefreshing, form.values]);//wartości obserwowane przez hook
  const booksArray = Object.values(books);
  const rows = booksArray.map((book, i) => (//iteracja tablicy, przypisanie wartości do komórek w tablicy
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
            open();//otwarcie modalu
            setBookData(book);//ustawienie stanu na dane wybranej książki
          }}
        >
          Edytuj
        </Button>
      </Table.Td>
      <Table.Td>
        <Button
          variant="subtle"
          color="red"
          size="xs"
          onClick={() => {
            handlers.open();//otwarcie modalu
            setBookData(book);//ustawienie stanu na dane wybranej książki
          }}
        >
          Usuń
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  const ths = ( //nagłówek tabeli
    <Table.Tr>
      <Table.Th>Tytuł</Table.Th>
      <Table.Th>Autor</Table.Th>
      <Table.Th>Rok wydania</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          close();//zamknięcie modalu
          form.reset();//reset danych forma
        }}
        title="Edytuj książkę"
      >
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
              {...form.getInputProps("title")} //onChange i value
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
      <Modal
        opened={opened2}
        onClose={() => {
          handlers.close();//zakmnięcie modalu
        }}
        title="Czy na pewno chcesz usunąć książkę?"
      >
        <Group grow>
          <Button
            variant="subtle"
            color="dark"
            onClick={() => handlers.close()}
          >
            Anuluj
          </Button>
          <Button variant="filled" color="red" onClick={() => handleDelete()}>
            Usuń
          </Button>
        </Group>
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
