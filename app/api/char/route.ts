import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Char from "@/models/Char";

export const POST = async (request: any): Promise<NextResponse> => {
  const { name, x, y } = await request.json();

  try {
    await connect(); // Call your database connection function

    const charData = new Char({ name, x, y });
    await charData.save();

    return new NextResponse(JSON.stringify({ charData }), { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Saving error" }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const query = request.url.split("?")[1];
  console.log(query);
  try {
    await connect();

    const data = await Char.findOne({ name: query });

    if (!data) {
      return NextResponse.json({ error: "No such data" }, { status: 404 });
    }
    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
