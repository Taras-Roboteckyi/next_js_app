import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Створюєм маршрут в next.js
export const GET = async (request, { params }) => {
  try {
    //Підключаємось до бази даних
    await connectToDB();
    //тепер фільтруєм наші prompts і знаходимо лише коенкретні prompts по id-шнику
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    //Повертаєм нову відповідь і статус 200
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
