import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Створюєм маршрути в next.js
///GET

export const GET = async (request, { params }) => {
  try {
    //Підключаємось до бази даних
    await connectToDB();

    //тепер шукаєм prompt по id-шніку
    const prompt = await Prompt.findById(params.id).populate("creator");

    //Робимо перевірку на наявність prompta
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    //Повертаєм нову відповідь і статус 200
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

///Patch (update)

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    //Підключаємось до бази даних
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    //Робимо перевірку на наявність існуючого prompta
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    //Оновлюємо дані
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    //Зберігаєм оновлені дані
    await existingPrompt.save();

    //Повертаєм нову відповідь і статус 200
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

///Delete

export const DELETE = async (request, { params }) => {
  try {
    //Підключаємось до бази даних
    await connectToDB();

    //Шукаєм необхідний Prompt по id і видаляєм його
    await Prompt.findByIdAndRemove(params.id);

    //Повертаєм нову відповідь і статус 200
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
