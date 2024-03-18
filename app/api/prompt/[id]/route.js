import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Створюєм маршрут в next.js
export const GET = async (request, { params }) => {
  try {
    //Підключаємось до бази даних
    await connectToDB();

    //тепер шукаєм prompt по id-шніку
    const prompt = await Prompt.findById(params.id).populate("creator");

    //Робимо перевірку на наявність prompta
    if (!prompt) new Response("Prompt not found", { status: 404 });

    //Повертаєм нову відповідь і статус 200
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
