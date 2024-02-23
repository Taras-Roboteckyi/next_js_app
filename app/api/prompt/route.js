import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Створюєм маршрут в next.js
export const GET = async (request) => {
  try {
    //Підключаємось до бази даних
    await connectToDB();
    //тепер фільтруєм наші prompts
    const prompts = await Prompt.find({}).populate("creator");
    //Повертаєм нову відповідь і статус 200
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
