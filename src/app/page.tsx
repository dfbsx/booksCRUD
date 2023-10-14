"use client";
import { Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { getBooks } from "./crud/getBooks";
export default function HomePage() {
  const [books, setBooks] = useState<{
    [key: string]: {
      title: string;
      author: string;
      version: string;
      status: string;
    };
  }>({});
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
    </Table.Tr>
  ));
  const ths = (
    <Table.Tr>
      <Table.Th>Tytuł</Table.Th>
      <Table.Th>Autor</Table.Th>
      <Table.Th>Data wydania</Table.Th>
      <Table.Th>Status</Table.Th>
    </Table.Tr>
  );
  return (
    <div>
      <Text fw={500} mb="xl">Twoje książki:</Text>
      <Table captionSide="bottom">
        <Table.Caption>To już wszystko</Table.Caption>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
