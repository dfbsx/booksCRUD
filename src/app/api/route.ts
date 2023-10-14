import {NextResponse } from "next/server";
import { prisma } from "../lib/prisma";

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
  
  export async function POST(request: Request) {
    try {
      const json = await request.json();
      const feedback = await prisma.book.create({
        data: json,
      });
      const json_response = {
        status: "success",
        data: {
          feedback,
        }
      };
      return new Response(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error:any) {
      const error_response = {
        status: "error",
        message: error.message,
      };
      return new Response(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

   export async function updateContact(request: Request,{ params }: { params: { id: any } }) {
    const id = params.id;
    try {
      const json = await request.json();
      const feedback = await prisma.book.update({
        where: {
          id:id,
        },
        data: json,
      });
      const json_response = {
        status: "success",
        data: {
          feedback,
        }
      };
      return new Response(JSON.stringify(json_response), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error:any) {
      const error_response = {
        status: "error",
        message: error.message,
      };
      return new Response(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }