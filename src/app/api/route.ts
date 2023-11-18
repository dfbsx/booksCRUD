import {NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

//fukcja zwracająca status i wiadoomość błędu
const createErrorResponse = (s: string, m: string) => {
  let status = s;
  let message = m;

  const errorResponse = {
    status: status,
    message: message,
  };

  return errorResponse;
};


//funkcja zwracająca odpowiedź z serwera
const createApiResponse = (resp : {}, status: number, headers: {}) =>{
  const json_response = {
    data: resp,
  };

  return new Response(JSON.stringify(json_response), {
    status: status,
    headers: headers,
  });

}

//funkcja, która umożliwia pobranie wszystkich książek zapisanych w bazie
export async function GET() {  
    const books = await prisma.book.findMany({
    });
    let json_response = {
      status: "success",
      results: books.length,
      books,
    };
    return NextResponse.json(json_response);
  }
  

  //funkcja, która obsługuje zarówno dodawanie, jak i aktualizację obiektu w bazie,
  //jeżeli znalezione zostaje id - wtedy obiekt jest aktualizowany,
  //w przypadku braku przekazania id - tworzony jest nowy obiekt
  export async function POST(request: Request) {
    try {
      const json = await request.json();
      let feedback;
      if (json.id) {
        const id = json.id;
        feedback = await prisma.book.update({
          where: {
            id: id,
          },
          data: json,
        });
      } else {
        feedback = await prisma.book.create({
          data: json,
        });
      }
      const json_response = {
        status: "success",
        data: {
          feedback,
        },
      };
      return createApiResponse(json_response,201,{ "Content-Type": "application/json"});
    } catch (error: any) {
      const error_response = createErrorResponse("error",error.message);
      return createApiResponse(error_response,500,{"Content-Type": "application/json"});
    }
  }

  //funkcja, do której przekazywane jest id obiektu, umożliwia usunięcie obiektu o tym id z bazy
  export async function DELETE(request: Request) {
    try {
      const json = await request.json();
      if (json.id) {
        const id = json.id;
        const feedback = await prisma.book.delete({
          where: {
            id: id,
          },
        });
  
        if (feedback) {
          const json_response = {
            status: "success",
            data: {
              feedback,
            },
          };
          return createApiResponse(json_response,201,{"Content-Type": "application/json"});
        } else {
          const error_response = createErrorResponse("error","Deletion failed or the book does not exist")
          return createApiResponse(error_response,500,{"Content-Type": "application/json"});
        }
      } else {
        const error_response = createErrorResponse("error","Invalid request. 'id' is required in the JSON data.")
        return createApiResponse(error_response,400,{"Content-Type": "application/json"});
      }
    } catch (error: any) {
      const error_response = createErrorResponse("error",error.message)
      return createApiResponse(error_response,500,{"Content-Type": "application/json"});
    }
  }
  
  